const APIUtil = require('./api_util.js');

class FollowToggle {
  constructor($el) {
    this.userId = $el.attr("data-user-id");
    this.following = $el.attr("data-initial-follow-state");
    this.$el = $el;
    this.render();
    this.handleClick();
  }

  render() {
    // debugger
    console.log(this.following);
    if (this.following === "true") {
      this.$el.text("Unfollow!");
      this.$el.removeAttr('disabled');
      this.$el.removeClass("loader");


    } else if (this.following === "false"){
      this.$el.text("Follow!");
      this.$el.removeAttr('disabled');
      this.$el.removeClass("loader");


    }
  }

  handleClick() {
    this.$el.on("click", e => {
      e.preventDefault();

      if (this.following === "true") {
        APIUtil.unfollowUser.call(this, this.userId);
      } else if (this.following === "false"){
        APIUtil.followUser.call(this, this.userId);
      }
    });
  }

  toggleFollowState() {
    if (this.following === "true") {
      this.following = "false";
    } else {
      this.following = "true";
    }
  }
}

module.exports = FollowToggle;
