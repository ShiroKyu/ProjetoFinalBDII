import Curso from '../models/Curso';

class CursoController {
  async index(req, res) {
    try {
      const cursos = await Curso.findAll();

      if (!cursos)
        return res
          .status(400)
          .json({ error: 'Não existem registros de cursos.' });

      return res.status(200).json(cursos);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  }
}

export default new CursoController();
