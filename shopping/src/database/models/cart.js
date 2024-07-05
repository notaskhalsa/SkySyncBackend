const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CartSchema = new schema({
    customerId: {type:String},
    items:[
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
        transform(doc, ret) {
        delete ret._v;
    },
    timestamps: true
    }
});
module.exports = mongoose.model('cart', CartSchema);

