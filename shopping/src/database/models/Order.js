const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    orderId: String,
    customerId: String,
    amount: Number,
    status: String,
    txnId: String,
    items: [
        { 
            products:{
                _id:{type:String, require:true},
                name:{type: String},
                desc:{type: String},
                category:{type: String},
                unit: {type: Number},
                supplier:{type: String},
                img: [String],
                price: {type: Number}
            },
            unit: {type: Number, require: true}
        }
    ]
},
{
    toJSON: {
        transform(doc, ret){
            delete ret.__v;
        }
    },
    timestamps: true
});
mongoose.pluralize(null);
module.exports =  mongoose.model('order', OrderSchema);