import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password)
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        errors: ['O usuário não existe'],
      });
    }
    const { id } = user;

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Senha incorreta'],
      });
    }

    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res
      .status(200)
      .json({ token, user: { name: user.name, email: user.email } });
  }

  async validate(req, res) {
    const { token, email: reqEmail } = req.body;

    if (!token && !reqEmail)
      return res.status(401).json({
        errors: ['Token de autenticação ou email não incluso'],
      });

    try {
      const dados = jwt.verify(token, process.env.TOKEN_SECRET);

      const { id, email } = dados;

      const user = await User.findOne({
        where: { id, email },
      });

      if (!user)
        return res.status(401).json({
          errors: ['O usuário não existe'],
        });

      if (email === reqEmail) return res.status(401).json({ msg: 'Validado' });

      return res.status(401).json({ errors: ['Token expirado ou inválido'] });
    } catch (e) {
      return res.status(401).json({
        errors: ['Token expirado ou inválido'],
      });
    }
  }
}

export default new TokenController();
