"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories() {
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $mainNav.show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

// show add-story form on click
$body.on('click', '.add-story', function () {
  console.debug("showAddStoriesForm");
  hidePageComponents();
  $addStoryForm.show();
  $allStoriesList.show();
});

// show user-favorites ui on click
$body.on('click', '.favorites', function () {
  hidePageComponents();
  renderFavorites();
});

// show my-stories ui on click
$body.on('click', '.my-stories', function () {
  hidePageComponents();
  renderMyStories();
});


