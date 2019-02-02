var imgurl = adminurl + "upload/";

var imgpath = imgurl + "readFile";
var uploadurl = imgurl;



myApp.factory('NavigationService', function ($http) {
    var navigation = [{
            name: "Brand",
            classis: "active",
            sref: "#!/brandtable",
            icon: "phone"
        },
        {
            name: "Product",
            classis: "active",
            sref: "#!/producttable",
            icon: "phone"
        }
    ];

    return {
        getnav: function () {
            return navigation;
        },

        parseAccessToken: function (data, callback) {
            if (data) {
                $.jStorage.set("accessToken", data);
                callback();
            }
        },
        removeAccessToken: function (data, callback) {
            $.jStorage.flush();
        },
        profile: function (callback, errorCallback) {
            var data = {
                accessToken: $.jStorage.get("accessToken")
            };
            $http.post(adminurl + 'user/profile', data).then(function (data) {
                data = data.data;
                if (data.value === true) {
                    $.jStorage.set("profile", data.data);
                    callback();
                } else {
                    errorCallback(data.error);
                }
            });
        },
        makeactive: function (menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },

        search: function (url, formData, i, callback) {
            $http.post(adminurl + url, formData).then(function (data) {
                data = data.data;
                callback(data, i);
            });
        },
        delete: function (url, formData, callback) {
            $http.post(adminurl + url, formData).then(function (data) {
                data = data.data;
                callback(data);
            });
        },
        countrySave: function (formData, callback) {
            $http.post(adminurl + 'country/save', formData).then(function (data) {
                data = data.data;
                callback(data);

            });
        },

        apiCall: function (url, formData, callback) {
            $http.post(adminurl + url, formData).then(function (data) {
                data = data.data;
                callback(data);

            });
        },



        getBrands: function (callback) {
            $http.post(adminurl + "brand/search").then(function (data) {
                callback(data.data);
            });
        },
        getProducts: function (callback) {
            $http.post(adminurl + "product/search").then(function (data) {
                callback(data.data);
            });
        },


        createTable: function (formData, callback) {
            $http.post(adminurl + 'brand/save', formData).then(function (data) {
                data = data.data;
                callback(data);

            });
        },

        createproductTable: function (formData, callback) {
            $http.post(adminurl + 'product/save', formData).then(function (data) {
                data = data.data;
                callback(data);

            });
        },




        getOnedelete: function (formData, callback) {
            $http.post(adminurl + 'brand/delete', formData).then(function (data) {
                data = data.data;
                callback(data);

            });
        },

        getproductDelete: function (formData, callback) {
            $http.post(adminurl + 'product/delete', formData).then(function (data) {
                data = data.data;
                callback(data);

            });
        },




        getOne: function (formData, callback) {
            $http.post(adminurl + "brand/getOne", formData).then(function (data) {
                callback(data.data);
            });
        },



        getOneProduct: function (formData, callback) {
            $http.post(adminurl + "product/getOne", formData).then(function (data) {
                callback(data);
            });
        },





        searchCall: function (url, formData, i, callback) {
            $http.post(adminurl + url, formData).then(function (data) {
                data = data.data;
                callback(data, i);
            });
        },

        getOneCountry: function (id, callback) {
            $http.post(adminurl + 'country/getOne', {
                _id: id
            }).then(function (data) {
                data = data.data;
                callback(data);

            });
        },
        getLatLng: function (address, i, callback) {
            $http({
                url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyC62zlixVsjaq4zDaL4cefNCubjCgxkte4",
                method: 'GET',
                withCredentials: false,
            }).then(function (data) {
                data = data.data;
                callback(data, i);
            });
        },
        uploadExcel: function (form, callback) {
            $http.post(adminurl + form.model + '/import', {
                file: form.file
            }).then(function (data) {
                data = data.data;
                callback(data);

            });

        },

    };
});