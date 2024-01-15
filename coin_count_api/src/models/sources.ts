import mongoose from "mongoose";

interface ISource {
  url: string;
  active: boolean;
  name: string;
  slug: string;
}

const sourceSchema = new mongoose.Schema({
  slug:{
    type: String,
    unique: true,
  },
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

sourceSchema.pre("save", async function (next) {
  if (!this.isModified("url")) return next();
  const domainMatch = this.url.match(/:\/\/(www\.)?([^\/]+)/);
  this.slug = domainMatch ? domainMatch[2] : this.url;
  next();
});



const Source = mongoose.model<ISource>("Source", sourceSchema);



export default Source;
