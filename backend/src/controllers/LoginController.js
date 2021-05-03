import jwt from 'jsonwebtoken';
import { ValidationError } from 'sequelize';
import User from '../models/User';
import Student from '../models/Student';

import redisClient from '../database/redis';

class LoginController {
  async checkLogin(req, res) {
    try {
      const { token: reqToken, email: reqEmail } = req.body;

      redisClient.get(reqEmail, async (err, reply) => {
        if (reply !== null) {
          const { token } = JSON.parse(reply.toString());

          if (reqToken !== token)
            return res.status(401).json({ valido: false });

          const dados = jwt.verify(token, process.env.TOKEN_SECRET);
          const { email } = dados;

          if (req.body.email === email)
            return res.status(200).json({ valido: true });
        }
      });
    } catch (e) {
      return res.status(401).json({ errors: e });
    }
  }

  async login(req, res) {
    try {
      const { email = '', password = '' } = req.body;

      if (!email || !password)
        return res.status(401).json({
          error: 'Credenciais inválidas',
        });

      const user = await User.findOne({
        where: { email },
        include: {
          model: Student,
        },
      });

      if (!user) {
        return res.status(401).json({
          error: 'O usuário não existe',
        });
      }

      if (!(await user.passwordIsValid(password))) {
        return res.status(401).json({
          error: 'Senha incorreta',
        });
      }

      const token = jwt.sign({ email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      redisClient.setex(email, 604800, JSON.stringify({ token }));

      return res.status(200).json({ token });
    } catch (e) {
      return res.status(401).json({ error: e });
    }
  }

  async register(req, res) {
    try {
      const { email = '', password = '', matricula = '' } = req.body;

      if (!email || !password)
        return res.status(401).json({
          error: 'Credenciais inválidas',
        });

      const student = await Student.findOne({
        where: { matricula },
      });
      if (!student)
        return res.status(401).json({ error: 'A matrícula não existe' });

      const { id } = student;

      const user = await User.create({
        matricula,
        email,
        password,
        student_id: id,
      });

      return res.status(200).json(user);
    } catch (e) {
      if (e instanceof ValidationError) {
        if (e.errors[0].path === 'email')
          return res.status(401).json({ error: 'O email já existe' });

        if (e.errors[0].path === 'student_id')
          return res
            .status(401)
            .json({ error: 'O usuário com essa matrícula já existe' });
      }

      return res.status(401).json({ err: e });
    }
  }

  async logout(req, res) {
    try {
      redisClient.del(req.body.email);

      return res.status(200).json({ msg: 'Sucesso ao deletar' });
    } catch (e) {
      return res.status(401).json({ err: e });
    }
  }
}

export default new LoginController();
