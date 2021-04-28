import mongoose from '../database/mongodb';

const postSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
  data: Date,
});

const Post = mongoose.model('Post', postSchema);

export default Post;
