const moment = require("moment");
module.exports = {
  truncate: (str, len) => {
    if (str.length > len) {
      return str.substr(0, len) + "...";
    }
    return str;
  },
  stripTags: str => str.replace(/(<([^>]+)>)/gi, ""),
  formatDate: (date, format) => moment(date).format(format),
  select: function(selected, options) {
    return options
      .fn(this)
      .replace(
        new RegExp(' value="' + selected + '"'),
        '$& selected="selected"'
      )
      .replace(
        new RegExp(">" + selected + "</option>"),
        ' selected="selected"$&'
      );
  }
};
