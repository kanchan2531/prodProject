var schema = new Schema({
    Productname: {
        type: String,
        required: true,
        unique: true
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
    brands: {
        type: Schema.Types.ObjectId,
        ref: 'Brand'
    },
    description: {
        type: String
    },
    madeBy: {
        type: String
    }

});

schema.plugin(deepPopulate, {
    "populate": {
        "brands": {
            select: '_id name'
        }
    }
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Product', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "", "brands"));
var model = {
    getOneProduct: function (name, callback) {

        Product.findOne({
            "Productname": name
        }).exec(callback);
    },
    getAllFind: function (name, callback) {
        Product.find({

        }).exec(callback);
    },
    getoneByBrandId: function (id, callback) {
        Product.findOne({
            "brands": id
        }).exec(callback);
    },

    getoneByIdandName: function (id, name, callback) {
        Product.findOne({
            "brands": id,
            "Productname": name
        }).exec(callback);
    },

    getoneandUpdate: function (id, name, callback) {

        Product.findByIdAndUpdate({
            "_id": id

        }, {

            "Productname": name
        }, {
            new: true
        }).exec(callback);

    },

    getsort: function (callback) {
        Product.aggregate([{
            $sort: {
                Productname: 1
            }
        }]).exec(callback);
    },



    addcol: function (callback) {
        Product.aggregate([{
            $addFields: {
                total: {
                    $sum: "$price"
                }
            }
        }]).exec(callback);
    },
    checklimit: function (callback) {
        Product.aggregate([{
            $limit: 2
        }]).exec(callback);
    },
    checkproject: function (callback) {
        Product.aggregate([{
            $project: {
                Productname: 1
            }
        }]).exec(callback);
    },

    checklookup: function (callback) {
        Product.aggregate([{
            $lookup: {
                "from": "brands",
                "localField": "brands",
                "foreignField": "_id",
                "as": "braches"
            }
        }]).exec(callback);
    },

    checkunwind: function (callback) {
        Product.aggregate([{
            $unwind: {

                path: "$braches"
            }
        }]).exec(callback);
    },

    checkmatch: function (callback) {
        Product.aggregate([{
            $match: {
                Productname: "U"
            }
        }]).exec(callback);
    },
    checkskip: function (callback) {
        Product.aggregate([{
            $skip: 5
        }]).exec(callback);
    },
    checkcount: function (callback) {
        Product.aggregate([{
            $count: {
                price: {
                    $gt: 55
                }
            }
        }, {
            $count: "passing_scores"

        }]).exec(callback);
    },


    checkgroup: function (id, callback) {
        Product.aggregate([{
            $group: {
                _id: "$Productname",


            }
        }]).exec(callback);
    },

    getcond: function (callback) {
        Product.aggregate([{
            $project: {
                Productname: 1,
                manufacturing: 1,
                discount: {
                    $cond: {
                        if: {
                            $gte: ["$price", 250]
                        },
                        then: 30,
                        else: 20
                    }
                }

            }
        }]).exec(callback);
    },


    aggregateDemo: function (data, callback) {
        var aggText = [{
                $limit: 4
            }, {
                $unwind: {

                    path: "$braches"
                }
            },
            {
                $lookup: {
                    "from": "brands",
                    "localField": "brands",
                    "foreignField": "_id",
                    "as": "braches"
                }
            }

        ];
        Product.aggregate(aggText).exec(function (err, found) {
            if (err) {
                callback(err, null);

            } else {
                callback(null, found);
            }
        });

    },


    aggregateDemo1: function (callback) {
        Product.aggregate([{
                $limit: 4
            },


            {
                $lookup: {
                    "from": "brands",
                    "localField": "brands",
                    "foreignField": "_id",
                    "as": "braches"
                }


            },
            {
                $unwind: {
                    path: "$braches"

                }
            },
            {
                $skip: 2


            },
            {
                $project: {
                    Productname: 1,
                    braches: 1

                }
            },

        ]).exec(callback);

    },

    addcoll: function (callback) {
        Product.aggregate([{
            $addFields: {
                cats: 50


            }
        }]).exec(callback);
    },

    createpage: function (callback) {

        Product.find({}).
        skip(1).
        limit(2).
        exec(callback);

    },


    createpage1: function (data, callback) {
        var Maxno = 3;
        var page = 1;
        page = data.page;
        var options = {
            start: (page - 1) * Maxno,
            count: Maxno
        };
        Product.find().page(options, callback);


    },
    getStartCount: function (data, callback) {

        var page = 1;
        var maxlimit = 2;
        page = data.page;
        var option = {
            start: (page - 1) * maxlimit,
            count: maxlimit

        };



        Product.find().skip(option.start).limit(option.count).exec(function (err, found) {
            if (err) {
                callback(err);
            } else {
                if (_.isEmpty(found)) {
                    callback(null, []);
                } else {
                    var obj = {
                        options: option,
                        results: found
                    };

                    callback(null, obj);
                }
            }
        });
    },
    getCount: function (data, callback) {

        Product.find({}, function (err, found) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, found.length);
            }
        });

    },
    createpage2: function (data, callback) {
        async.parallel({
            dataResult: function (callback) {
                Product.getStartCount(data, callback);
            },
            count: function (callback) {
                Product.getCount(data, callback);
            }
        }, callback);
    },




    getloadsh: function (callback) {
        async.waterfall([function (callback) {
            Product.find().exec(function (err, products) {
                console.log('Length', products.length);
                _.each(products, function (product) {
                    console.log('product', product);
                    product.madeBy = 'India';
                });
                callback(null, products);
            });
        }, function (products, callback) {
            console.log('Products', products);
            async.concatLimit(products, 1, function (product, callback) {
                var updates = {
                    $set: {
                        madeBy: product.madeBy
                    }
                };
                Product.update({
                    '_id': product._id
                }, updates).exec(callback);
            }, callback);
        }], callback);





    },





    // getloadsh: function (callback) {
    //     Product.find().exec(function (err, products) {
    //         async.concatLimit(products, 1, function (product, callback) {
    //             var updates = {
    //                 $set: {
    //                     madeBy: 'Indias'
    //                 }
    //             };
    //             Product.update({
    //                 '_id': product._id
    //             }, updates).exec(callback);
    //         }, callback);
    //     });
    // },


};
module.exports = _.assign(module.exports, exports, model);