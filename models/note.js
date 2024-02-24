import { Schema, model, models } from 'mongoose';

const noteSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Note's title is required."],
  },
  Content: {
    type: String,
    required: [true, "Note's content is required."],
  },
});

const Note = models.Note || model('Note', noteSchema);

export default Note;