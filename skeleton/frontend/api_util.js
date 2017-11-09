const APIUtil = {
  followUser: function(id) {
    console.log(this);
    $.ajax({
      url: `/users/${id}/follow`,
      method: "post",
      dataType: 'json',
      success: (response) => {
        this.toggleFollowState();
        this.render();
      },
      error: (response) => {
        this.$el.removeAttr('disabled');
        this.$el.removeClass("loader");

      }
    });
    this.$el.attr("disabled", "disabled");
    this.$el.addClass("loader");

  },
  unfollowUser: function(id){
    console.log(this);

    $.ajax({
      url: `/users/${id}/follow`,
      method: "delete",
      dataType: 'json',
      success: (response) => {
        console.log(response);
        this.toggleFollowState();
        this.render();
      },
      error: (response) => {
        console.log(response);
        this.$el.removeAttr('disabled');
        this.$el.removeClass("loader");
      }
    });
    this.$el.attr("disabled", "disabled");
    this.$el.addClass("loader");
    
  },
  searchUsers: (queryVal, success) => {
    // debugger;
    $.ajax({
      url: '/users/search',
      method: "get",
      data: {
        query: queryVal
      },
      dataType: "json",
      success: success,
      error: (response) => {
        console.log(response);
      }
    });
  }
};

module.exports = APIUtil;
