(function () {

    var translate = function (text) {
        var xlate = translateLookup(text);

        if (typeof xlate == "function") {
            xlate = xlate.apply(this, arguments);
        }
        else if (arguments.length > 1) {
            var aps = Array.prototype.slice;
            var args = aps.call(arguments, 1);

            xlate = formatter(xlate, args);
        }

        return xlate;
    };

    // I want it available explicity as well as via the object
    translate.translate = translate;

    //from https://gist.github.com/776196 via http://davedash.com/2010/11/19/pythonic-string-formatting-in-javascript/
    var defaultFormatter = (function () {
        var re = /\{([^}]+)\}/g;
        return function (s, args) {
            return s.replace(re, function (_, match) {
                return args[match];
            });
        }
    }());
    var formatter = defaultFormatter;
    translate.setFormatter = function (newFormatter) {
        formatter = newFormatter;
    };

    translate.format = function () {
        var aps = Array.prototype.slice;
        var s = arguments[0];
        var args = aps.call(arguments, 1);

        return formatter(s, args);
    };

    var dynoTrans = null;
    translate.setDynamicTranslator = function (newDynoTrans) {
        dynoTrans = newDynoTrans;
    };

    var translation = null;
    translate.setTranslation = function (newTranslation) {
        translation = newTranslation;
    };

    function translateLookup(target) {
        if (translation == null || target == null) {
            //addMissingTranslation(target);
            return target;
        }

        if (target in translation == false) {
            if (dynoTrans != null) {
                return dynoTrans(target);
            }
            //addMissingTranslation(target);
            return target;
        }

        var result = translation[target];
        if (result == null) {
            //addMissingTranslation(target);
            return target;
        }

        return result;
    }


     function in_array(haystack, needle) {
     for(var i = 0; i < haystack.length; i++) {
     if(haystack[i] === needle) {
     return true;
     }
     }
     return false;
     }

     function addMissingTranslation(string) {
     if(!in_array(window.missing_trans, string)) {
     console.log("missing translation", string);
     window.missing_trans.push(string);
     }
    }
     //*/

    window._ = translate;

})();
