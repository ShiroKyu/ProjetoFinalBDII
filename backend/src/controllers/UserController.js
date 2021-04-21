import User from '../models/User';
import Student from '../models/Student';

class UserController {
  async store(req, res) {
    try {
      const { email, password, matricula } = req.body;

      const student = await Student.findOne({
        where: { matricula },
      });
      if (!student)
        return res.status(400).json({ err: 'A matrícula não existe' });

      const { id } = student;

      const user = await User.create({
        email,
        password,
        matricula,
        student_id: id,
      });

      const { id: userId } = user;

      return res.status(200).json({ userId, email, matricula });
    } catch (e) {
      // throw new Error(e);
      return res.status(400).json({ err: 'Houve um problema' });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'email', 'student_id'],
        include: {
          association: 'user_tem_matricula',
          attributes: ['nome', 'matricula', 'situacao', 'cota', 'curso_id'],
        },
      });

      if (!users)
        return res
          .status(400)
          .json({ msg: 'Não existem registros de usuários.' });

      return res.status(200).json(users);
    } catch (e) {
      throw new Error(e);
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: ['id', 'email', 'student_id'],
        include: {
          association: 'user_tem_matricula',
          attributes: ['nome', 'matricula', 'situacao', 'cota', 'curso_id'],
        },
      });

      if (!user) return res.status(400).json({ err: 'Usuário não encontrado' });

      return res.status(200).json(user);
    } catch (e) {
      return res.status(400).json({ err: 'Houve um problema' });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user)
        return res.status(401).json({ errors: ['Usuário não existe'] });

      const updatedUser = await user.update(req.body);

      const { id, name, email } = updatedUser;

      return res.status(200).json({ id, name, email });
    } catch (e) {
      throw new Error(e);
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user)
        return res.status(401).json({ errors: ['Usuário não existe'] });

      await user.destroy();

      return res.status(200).json({ msg: 'Usuário deletado com sucesso.' });
    } catch (e) {
      return res.status(400).json({
        error: e.errors,
      });
    }
  }
}

export default new UserController();
