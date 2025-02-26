const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/deaf-communication', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ConversationSchema = new mongoose.Schema({
  text: String,
  audioFilePath: String,
  timestamp: { type: Date, default: Date.now },
});

const Conversation = mongoose.model('Conversation', ConversationSchema);

// Example: Save a conversation
app.post('/save-conversation', async (req, res) => {
  const { text, audioFilePath } = req.body;
  const conversation = new Conversation({ text, audioFilePath });
  await conversation.save();
  res.json({ message: 'Conversation saved' });
});