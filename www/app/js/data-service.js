categoryService = (function () {

    var baseURL = "";

    return {
        findByName: function(searchKey) {
            return $.ajax({url: baseURL + "/api/category/name/" + searchKey});
        }
     };

}());