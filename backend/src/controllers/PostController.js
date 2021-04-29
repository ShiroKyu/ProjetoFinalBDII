/* eslint-disable consistent-return */
import Post from '../models/Post';

class PostController {
  async store(req, res) {
    try {
      const { titulo, descricao, email } = req.body;

      const post = Post({
        titulo,
        descricao,
        data: new Date(),
        email,
      });

      await post.save((err, postSalvo) => {
        if (err) return res.status(400).json(err);
        return res.status(200).json(postSalvo);
      });
    } catch (e) {
      return res.status(400).json({ err: e });
    }
  }

  async index(req, res) {
    try {
      await Post.find((err, pedidos) => res.status(200).json(pedidos));
    } catch (e) {
      return res.status(400).json({ err: 'Ops, algo deu errado' });
    }
  }

  // async show(req, res) {
  //   try {

  //     return res.status(200).json(user);
  //   } catch (e) {
  //     return res.status(400).json({ err: 'Houve um problema' });
  //   }
  // }

  // async update(req, res) {
  //   try {

  //     return res.status(200).json({ id, name, email });
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }

  // async delete(req, res) {
  //   try {

  //     return res.status(200).json({ msg: 'Usuário deletado com sucesso.' });
  //   } catch (e) {
  //     return res.status(400).json({
  //       error: e.errors,
  //     });
  //   }
  // }
}

export default new PostController();
