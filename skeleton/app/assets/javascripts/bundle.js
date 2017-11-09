/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(2);
const UsersSearch = __webpack_require__(3);

$(() => {
  let $followToggleList = $(".follow-toggle");
  $followToggleList.each((index, el) => {
    new FollowToggle($(el));
  });

  let $nav = $(".users-search");
  let usersSearch = new UsersSearch($nav);
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(0);

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(0);
const FollowToggle = __webpack_require__(2);

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map