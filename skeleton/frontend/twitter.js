const FollowToggle = require("./follow_toggle");
const UsersSearch = require("./users_search");

$(() => {
  let $followToggleList = $(".follow-toggle");
  $followToggleList.each((index, el) => {
    new FollowToggle($(el));
  });

  let $nav = $(".users-search");
  let usersSearch = new UsersSearch($nav);
});
