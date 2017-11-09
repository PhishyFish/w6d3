const APIUtil = require("./api_util.js");
const FollowToggle = require('./follow_toggle.js');

class UsersSearch {
  constructor($el) {
    this.$el = $el;
    this.$input = $($el.find("input")[0]);
    this.$ul = $($el.find("ul.users")[0]);
    this.handleInput();
  }

  handleInput() {
    this.$input.on("keyup", e => {
      let inputVal = this.$input.val();
      console.log(inputVal);
      APIUtil.searchUsers(inputVal, this.renderResults.bind(this));
    });
  }

  renderResults(result) {
    console.log(result);
    this.$ul.find("li").remove();
    for (let i = 0; i < result.length; i++) {
      let $li = $("<li></li>");
      let $button = $("<button></button>");
      let $p = $("<p></p>").text(result[i].username);
      $li.append($p);
      $button.attr("data-user-id", result[i].id);
      $button.attr("data-initial-follow-state", result[i].followed);
      $button.css("margin-left", "15px");
      $button.css("height", "20px");
      $li.css("width", "200px");
      $li.css("display", "flex");
      $li.css("justify-content", "space-between");
      $li.css("align-items", "center");
      $li.append($button);
      new FollowToggle($button);
      this.$ul.append($li);
    }
  }
}

module.exports = UsersSearch;
