import Estado from '../models/Estado';

class EstadoController {
  async index(req, res) {
    try {
      const estados = await Estado.findAll({
        attributes: ['id', ['nm_uf', 'nome']],
      });

      return res.status(200).json(estados);
    } catch (e) {
      return res.status(400).json({ error: e });
    }
  }
}

export default new EstadoController();
