
import mongoose from 'mongoose';

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    official_url: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});

const Crypto = mongoose.model('Crypto', cryptoSchema);

export default Crypto;
