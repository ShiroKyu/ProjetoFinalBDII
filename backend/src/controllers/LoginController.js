/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import { ValidationError } from 'sequelize';
import User from '../models/User';
import Student from '../models/Student';
// import Curso from '../models/Curso';

import redisClient from '../database/redis';

class LoginController {
  async checkLogin(req, res) {
    try {
      const { token, email: reqEmail } = req.body;

      if (!token && !reqEmail)
        return res.status(401).json({ error: 'Email e token não inclusos' });

      const dados = jwt.verify(token, process.env.TOKEN_SECRET);
      const { email } = dados;

      if (reqEmail === email) return res.status(200).json({ valido: true });

      return res.status(401).json({ errors: ['Token expirado ou inválido'] });
    } catch (e) {
      // redisClient.get(reqEmail, async (err, reply) => {
      //   if (reply !== null) {
      //     const token = JSON.parse(reply.toString());
      //     return res.status(200).json(token);
      //   }

      //   return res.status(401).json({ msg: 'Nenhum usuário no cache' });
      // });
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
          association: 'user_tem_matricula',
          attributes: ['nome', 'matricula', 'situacao', 'cota', 'curso_id'],
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

      // const {
      //   id,
      //   user_tem_matricula: { nome, matricula, situacao, cota, curso_id },
      // } = user;

      // const curso = await Curso.findByPk(curso_id);

      // const { nome: nomeCurso } = curso;

      const token = jwt.sign({ email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      redisClient.setex(email, 604800, JSON.stringify({ token }));

      return res.status(200).json({ token });
    } catch (e) {
      console.log(e);
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
        return res.status(401).json({ err: 'A matrícula não existe' });

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
