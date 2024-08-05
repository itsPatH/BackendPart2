import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const collection = 'Products';

const thumbnailSchema = new mongoose.Schema({
    mimetype: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    main: {
        type: Boolean,
        default: false,
    },
}, { _id: false });

// Esquema principal del producto
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    thumbnails: [thumbnailSchema],
}, { timestamps: true });

productSchema.plugin(mongoosePaginate); 

const productModel = mongoose.model(collection, productSchema);

export default productModel;
