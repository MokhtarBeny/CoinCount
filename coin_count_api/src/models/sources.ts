import mongoose from "mongoose";

interface ISource {
  url: string;
  active: boolean;
  name: string;
}

const sourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
});


const Source = mongoose.model<ISource>("Source", sourceSchema);



export default Source;
