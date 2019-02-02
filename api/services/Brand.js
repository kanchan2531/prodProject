var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Brand', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    // getOneBrand: function (name, callback) {

    //     Brand.findOne({
    //         "name": name
    //     }).exec(callback);
    // },
    getAllFind: function (name, callback) {
        Brand.find({

        }).exec(callback);
    },
    getoneByBrandId: function (name, id, callback) {
        Brand.findOne({
            "name": name,
            "_id": id
        }).exec(callback);
    },

    getoneandUpdate: function (name, id, callback) {
        Brand.findByIdAndUpdate(id, {
            $set: {
                name: 'jason bourne'
            }
        }, options, callback)
    }

};



module.exports = _.assign(module.exports, exports, model);