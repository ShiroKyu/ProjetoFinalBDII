import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const user = await User.create(req.body);

      return res.status(200).json(user);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ err: 'Houve um problema' });
    }
  }
}

export default new UserController();
