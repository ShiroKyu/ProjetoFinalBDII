import Student from '../models/Student';
import User from '../models/User';
import Curso from '../models/Curso';

class StudentController {
  async index(req, res) {
    try {
      const students = await Student.findAll({
        attributes: ['id', 'nome', 'matricula', 'situacao', 'municipio'],
        order: [['id', 'ASC']],
        include: [
          { model: User, attributes: ['email'] },
          { model: Curso, attributes: ['nome'] },
        ],
      });

      if (!students)
        return res
          .status(400)
          .json({ msg: 'Não existem registros de estudantes.' });

      return res.status(200).json(students);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  }
}

export default new StudentController();
