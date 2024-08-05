import mongoose from 'mongoose';

const collection = 'Carts';

const productSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
}, { _id: false }); 

const cartSchema = new mongoose.Schema({
    products: [productSchema],
}, { timestamps: true });

cartSchema.pre(['find', 'findOne', 'findById'], function () {
    this.populate('products.product');
});

const cartModel = mongoose.model(collection, cartSchema);

export default cartModel;