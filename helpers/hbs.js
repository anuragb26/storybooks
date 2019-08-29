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
  },
  editIcon: (storyUser, loggedInUser, storyId, floating = true) => {
    if (storyUser === loggedInUser) {
      if (floating) {
        return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab red">
        <i class="fa fa-pencil"> </i>
        </a>`;
      } else {
        return `<a href="/stories/edit/${storyId}">
        <i class="fa fa-pencil"> </i>
        </a>`;
      }
    } else {
      return "";
    }
  }
};
