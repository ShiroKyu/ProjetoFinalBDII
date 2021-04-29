import mongoose from '../database/mongodb';

const postSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
  data: Date,
  email: String,
});

const Post = mongoose.model('Post', postSchema);

export default Post;
