import mongoose from 'mongoose';
const bcrypt = require('bcryptjs');

const watchlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Watchlist name is required'],
    trim: true,
    maxlength: [50, 'Watchlist name must be less than 50 characters']
  },
  cryptos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Crypto'
    }
  ]
});

const socialAccountSchema = new mongoose.Schema({
  provider: String,
  providerAccountId: String
});



const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username must be less than 30 characters']
  },
  password: {
    type: String,
    minlength: [6, 'Password must be at least 6 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  socialAccounts: [socialAccountSchema],
  watchlists: [watchlistSchema],
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);

export default User;

