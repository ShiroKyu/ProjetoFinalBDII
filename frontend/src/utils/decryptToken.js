import jwt from 'json';

export default () => {
  const dados = jwt.verify(token, process.env.TOKEN_SECRET);
};
