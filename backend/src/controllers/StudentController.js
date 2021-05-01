import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    try {
      const students = await Student.findAll();

      if (!students)
        return res
          .status(400)
          .json({ msg: 'Não existem registros de estudantes.' });

      return res.status(200).json(students);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  }

  // async show(req, res) {
  //   try {
  //     const user = await User.findOne({
  //       where: { email: req.params.email },
  //       attributes: ['id', 'email', 'student_id'],
  //       include: [
  //         {
  //           association: 'user_tem_matricula',
  //           attributes: ['nome', 'matricula', 'situacao', 'cota', 'curso_id'],
  //         },
  //         {
  //           model: Foto,
  //         },
  //       ],
  //     });

  //     if (!user) return res.status(400).json({ err: 'Usuário não encontrado' });

  //     const {
  //       email,
  //       user_tem_matricula: { nome, matricula, situacao, cota, curso_id },
  //       Fotos,
  //     } = user;

  //     if (Fotos.length !== 0) {
  //       const foto = Fotos[Fotos.length - 1];
  //       const { url, filename } = foto;

  //       const curso = await Curso.findByPk(curso_id);

  //       const { nome: nome_curso } = curso;

  //       const posts = await Post.find({ email });

  //       return res.status(200).json({
  //         nome,
  //         email,
  //         matricula,
  //         situacao,
  //         cota,
  //         nome_curso,
  //         posts,
  //         Foto: { url, filename },
  //       });
  //     }

  //     const curso = await Curso.findByPk(curso_id);

  //     const { nome: nome_curso } = curso;

  //     const posts = await Post.find({ email });

  //     return res.status(200).json({
  //       nome,
  //       email,
  //       matricula,
  //       situacao,
  //       cota,
  //       nome_curso,
  //       posts,
  //     });
  //   } catch (e) {
  //     return res.status(400).json({ error: e });
  //   }
  // }
}

export default new StudentController();
