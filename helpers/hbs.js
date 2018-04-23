// helpers dedicated to handlebars
const moment = require('moment');

module.exports = {
    truncate: function(str, len) {
        if (str.length > len && str.length > 0){
            var newStr = str + " ";
            newStr = str.substr(0, len);
            newStr = str.substr(0, newStr.lastIndexOf(" "));
            newStr = (newStr.length > 0) ? newStr : str.substr(0, len);
            return newStr + '...';
        }
        return str;
    },
    stripTags: function(input){
        return input.replace(/<(?:.|\n)*?>/gm,'');
    },
    formatDate: function(date, format) {
        return moment(date).format(format);
    },
    select: function(selected, options){
        return options.fn(this).replace( new RegExp(' value=\"' + selected + '\"'), '$& selected="selected"')
                .replace( new RegExp('>' + selected + '</option>'), ' selected="selected"$&');
    },
    editIcon: function(paperUser, loggedUser, paperId, floating = true) {
        if(paperUser == loggedUser) {
            if (floating) {
                return `<a href="/papers/edit/${paperId}" class="btn-floating halfway-fab red"><i class="fa fa-pencil"></i></a>`;
            } else {
                return `<a href="/papers/edit/${paperId}"><i class="fa fa-pencil"></i></a>`;
            }
        } else {
            return '';
        }
    }
}