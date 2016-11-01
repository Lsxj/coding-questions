/**
 extensions is an Array and each item has such format:
 {firstName: 'xxx', lastName: 'xxx', ext: 'xxx', extType: 'xxx'}
 lastName, ext can be empty, extType can only has "DigitalUser", "VirtualUser","FaxUser","Dept","AO".
 **/

/**
 Question : sort extensions by "firstName" + "lastName" + "ext" ASC
 **/
function sortExtensionsByName(extensions) {
    extensions.sort(function(a, b){
        var result = equal(a.firstName, b.firstName);

        if(result !== 0) return result;
        result = equal(a.lastName, b.lastName);

        if(result !== 0) return result;
        result = equal(a.ext, b.ext);

        return result;

    });

    function equal(a, b){
        if(a === undefined || a < b)
            return -1;
        if(b === undefined || a > b)
            return 1;
        return 0;
    }
}


/**
 Question : sort extensions by extType follow these orders ASC
 DigitalUser < VitrualUser < FaxUser < AO < Dept.
 **/
function sortExtensionsByExtType(extensions) {

    extensions.sort(function(a,b){
        return equal(a.extType, b.extType);
    });

    function equal(x, y){
        var types = ["DigitalUser", "VitrualUser", "FaxUser", "AO", "Dept"];
        return types.indexOf(x) - types.indexOf(y);
    }
}

