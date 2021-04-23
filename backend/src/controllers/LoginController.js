// import jwt from 'jsonwebtoken';
import User from '../models/User';
import Student from '../models/Student';

class LoginController {
  async login(req, res) {
    try {
      const { email = '', password = '' } = req.body;
      // console.log(email, password);

      if (!email || !password)
        return res.status(401).json({
          error: 'Credenciais inválidas',
        });

      const user = await User.findOne({ where: { email } });

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

      return res.status(200).json(user);
    } catch (e) {
      throw new Error(e);
    }
  }

  async register(req, res) {
    try {
      const { email = '', password = '', matricula = '' } = req.body;
      // console.log(email, password, matricula);

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
}

export default new LoginController();
