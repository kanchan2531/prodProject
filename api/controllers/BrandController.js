module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    // getOneBrand: function (req, res) {
    //     Brand.getOneBrand(req.body.name, res.callback);
    // },

    getAllFind: function (req, res) {
        Brand.getAllFind(req.body, res.callback);
    },

    getoneByBrandId: function (req, res) {
        Brand.getoneByBrandId(req.body, res.callback);
    },
    getoneandUpdate: function (req, res) {
        Brand.getoneandUpdate(req.body, res.callback);
    },


};
module.exports = _.assign(module.exports, controller);