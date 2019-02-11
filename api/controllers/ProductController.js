module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    getOneProduct: function (req, res) {
        Product.getOneProduct(req.body.Productname, res.callback);
    },

    getAllFind: function (req, res) {
        Product.getAllFind(req.body, res.callback);
    },


    getoneByBrandId: function (req, res) {
        Product.getoneByBrandId(req.body.brands, res.callback);
    },


    getoneByIdandName: function (req, res) {
        Product.getoneByIdandName(req.body.brands, req.body.Productname, res.callback);
    },


    getoneandUpdate: function (req, res) {
        Product.getoneandUpdate(req.body._id, req.body.Productname, res.callback);
    },

    getsort: function (req, res) {
        Product.getsort(res.callback);
    },
    addcol: function (req, res) {
        Product.addcol(res.callback);
    },


    checklimit: function (req, res) {
        Product.checklimit(res.callback);
    },
    checkproject: function (req, res) {
        Product.checkproject(res.callback);
    },

    checklookup: function (req, res) {
        Product.checklookup(res.callback);
    },
    checkunwind: function (req, res) {
        Product.checkunwind(res.callback);
    },
    checkmatch: function (req, res) {
        Product.checkmatch(res.callback);
    },
    checkskip: function (req, res) {
        Product.checkskip(res.callback);
    },
    checkcount: function (req, res) {
        Product.checkcount(res.callback);
    },
    checkgroup: function (req, res) {
        Product.checkgroup(req.body._id, res.callback);
    },
    getcond: function (req, res) {
        Product.getcond(res.callback);
    },
    aggregateDemo: function (req, res) {
        Product.aggregateDemo(req.body, res.callback);
    },
    aggregateDemo1: function (req, res) {
        Product.aggregateDemo1(res.callback);
    },
    addcoll: function (req, res) {
        Product.addcoll(res.callback);
    },

    createpage: function (req, res) {
        Product.createpage(res.callback);
    },
    createpage1: function (req, res) {
        Product.createpage1(req.body, res.callback);
    },
    createpage2: function (req, res) {
        Product.createpage2(req.body, res.callback);
    },
    getloadsh: function (req, res) {
        Product.getloadsh(res.callback);
    },



};
module.exports = _.assign(module.exports, controller);