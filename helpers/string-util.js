/**
 * 
 * @param {*} string                Text containing unnecessary characters
 * @param {*} charsToBeReplaced     Array with (Named) Character References 
 * @param {*} replacementsArr       Array with the symbol of these characters
 * 
 * Example: string="foo&nbsp;" => string now will be "foo "
 */
// Check if its needed to be deleted
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

/**
 * 
 * @param {*} str Input data into materialize text field from user
 */
function strip_html_tags(str)
{
   if ((str===null) || (str===''))
       return false;
  else
   str = str.toString();
  return str.replace(/<[^>]*>/g, '');
}

// Check if its needed to be deleted
function replaceHtmlTags(string, pattern) {
    var re = new RegExp(pattern,"ig"), 
        newString;
    
    newString = string.replace(re, "");
    return newString;
}

module.exports = { allReplace, replaceHtmlTags, strip_html_tags };