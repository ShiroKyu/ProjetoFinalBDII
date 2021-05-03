import pool from '../database/pool';

class MunicipioController {
  async getSvg(req, res) {
    const { municipio } = req.params;

    pool.query(
      'SELECT ST_AsSVG(geom) FROM municipios WHERE nome ilike $1',
      [municipio],
      (e, results) => {
        if (e) {
          return res.status(400).json({ error: e });
        }
        return res.status(200).json(results.rows);
      }
    );
  }

  async getViewBox(req, res) {
    const { municipio } = req.params;

    pool.query(
      'SELECT getViewBox(nome) FROM municipios WHERE nome ilike $1',
      [municipio],
      (e, results) => {
        if (e) {
          return res.status(400).json({ error: e });
        }
        return res.status(200).json(results.rows);
      }
    );
  }
}

export default new MunicipioController();
