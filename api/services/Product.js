var schema = new Schema({
    Productname: {
        type: String,
        required: true,
        unique: true
    },
    Quantity: {
        type: Number
    },
    manufacturing: {
        type: Date
    },
    price: {
        type: Number
    },
    feature: {
        type: String,
        enum: ["camera", "RAM", "weight"]
    },
    Instock: {
        type: Boolean
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'brand'
    },
    rating: {
        type: Number
    },
    description: {
        type: String
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Product', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);