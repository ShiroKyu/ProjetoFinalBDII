/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Student from '../models/Student';
import Curso from '../models/Curso';

import redisClient from '../database/redis';

class LoginController {
  async checkLogin(req, res) {
    try {
      redisClient.get('user', async (err, reply) => {
        if (reply !== null) {
          const user = JSON.parse(reply.toString());

          return res.status(200).json(user);
        }

        return res.status(401).json({ err: 'Não existe usuário' });
      });
    } catch (e) {
      throw new Error(e);
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

      const {
        id,
        user_tem_matricula: { nome, matricula, situacao, cota, curso_id },
      } = user;

      const curso = await Curso.findByPk(curso_id);

      const { nome: nomeCurso } = curso;

      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      redisClient.setex(
        'user',
        86400,
        JSON.stringify({
          nome,
          email,
          password,
          token,
          matricula,
          situacao,
          cota,
          curso: nomeCurso,
        })
      );

      return res.status(200).json({
        id,
        user_tem_matricula: {
          email,
          nome,
          matricula,
          situacao,
          cota,
          nomeCurso,
        },
      });
    } catch (e) {
      throw new Error(e);
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
      throw new Error(e);
    }
  }

  async logout(req, res) {
    try {
      redisClient.del('user');

      return res.status(200).json({ msg: 'Sucesso ao deletar' });
    } catch (e) {
      return res.status(401).json({ err: e });
    }
  }
}

export default new LoginController();
