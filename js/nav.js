"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $mainNav.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

// show add-story form on click
$body.on('click', '.add-story', function () {
  console.debug("showAddStoriesForm");
  $addStoryForm.show();
  console.log(currentUser);
});

// createStory builds story object and runs addStory

function createStory() {
  const author = $('#author-input').val();
  const title = $('#title-input').val();
  const url = $('#url-input').val();
  const newStory = {
    author,
    title,
    url
  }
  console.log(currentUser);
  storyList.addStory(currentUser, newStory);
}

// run createStory when add-story submit button is clicked
$addStoryForm.on('submit', createStory);


