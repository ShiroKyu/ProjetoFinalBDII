import multer from 'multer';
import multerConfig from '../config/multerConfig';

import Foto from '../models/Foto';
import User from '../models/User';

const upload = multer(multerConfig).single('foto');

class FotoController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { user_id } = req.body;

        const foto = await Foto.create({ originalname, filename, user_id });
        console.log(foto);
        const user = await User.findByPk(user_id, {
          include: {
            model: Foto,
          },
        });

        return res.json(user);
      } catch (e) {
        return res.status(400).json({
          erros: ['Aluno não existe'],
        });
      }
    });
  }
}

export default new FotoController();
