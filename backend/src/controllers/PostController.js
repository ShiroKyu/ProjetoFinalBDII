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

  async delete(req, res) {
    try {
      const { id } = req.params;

      await Post.deleteOne({ _id: id });

      return res.status(200).json({ msg: 'Post deletado com sucesso.' });
    } catch (e) {
      return res.status(400).json({
        error: e.errors,
      });
    }
  }
}

export default new PostController();
