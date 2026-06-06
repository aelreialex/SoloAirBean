import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
    prodId: {
        type: String,
        unique: true,
        required: true,
    },
    title: {
        type: String,
        unique: true,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date
    }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
