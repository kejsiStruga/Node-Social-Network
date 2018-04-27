/**
 * 
 * @param {*} string                Text containing unnecessary characters
 * @param {*} charsToBeReplaced     Array with (Named) Character References 
 * @param {*} replacementsArr       Array with the symbol of these characters
 * 
 * Example: string="foo&nbsp;" => string now will be "foo "
 */
function allReplace(string, charsToBeReplacedArr, replacementsArr) {
    var arrLength = charsToBeReplacedArr.length,    
        newString, 
        regex,
        charToBeReplaced,
        replacement,
        i;
    
    for(i=0; i<arrLength; i++) {
        regex = new RegExp(charsToBeReplacedArr[i], "ig");

        newString = string.replace(regex, replacementsArr[i]);
    }
    return newString;
}

function replaceHtmlTags(string, pattern) {
    var re = new RegExp(pattern,"ig"), 
        newString;
    
    newString = string.replace(re, "");
    return newString;
}

module.exports = { allReplace, replaceHtmlTags };