import app from './app';

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

app.listen(process.env.PORT, () =>
  console.log(`Ouvindo na porta ${process.env.PORT}`)
);
