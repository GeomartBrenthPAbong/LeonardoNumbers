function import_test(name, path){
    describe(name, function () {
        require(path);
    });
}

describe("Leonardo Number generation", function(){
    import_test("leonardo numbers", "./features_tests/leonardo_numbers_test.js");
    import_test("leonardo iterators", "./features_tests/leonardo_iterators_test.js");
    import_test("leonardo tree", "./features_tests/leonardo_tree_test.js");
    import_test("leonardo array", "./features_tests/leonardo_array_test.js");
});