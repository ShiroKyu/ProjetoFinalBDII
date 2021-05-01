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

        const { email } = req.body;

        const user = await User.findOne(
          { where: { email } },
          {
            include: {
              model: Foto,
            },
          }
        );

        const { id: user_id } = user;

        const foto = await Foto.create({ originalname, filename, user_id });

        return res.json(foto);
      } catch (e) {
        return res.status(400).json({
          errors: e,
        });
      }
    });
  }
}

export default new FotoController();
