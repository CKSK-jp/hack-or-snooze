"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  const hostName = story.getHostName();
  let favorited = false;
  let starTag = '';

  if (currentUser) {
    const favStoryIds = currentUser.favorites.map(story => story.storyId);
    favorited = favStoryIds.includes(story.storyId);
    starTag = favorited ?
      '<span class="star"><i class="fa-star fas"></i></span>'
      : '<span class="star"><i class="fa-star far"></i></span>';
  }

  return $(`
      <li id="${story.storyId}">
        <div id="nice-format">
          <div>
            ${starTag}
          </div>
          <div>
            <a href="${story.url}" target="a_blank" class="story-link">
              ${story.title}
            </a>
            <small class="story-hostname">(${hostName})</small>
            <p><small class="story-author">by ${story.author}</small></p>
            <small class="story-user">posted by ${story.username}</small>
          </div>
        </div>
      </li>
      <hr>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** Generates page with list of user favorite stories */

function renderFavorites() {
  $favoriteStories.empty();

  // loop through all of our stories and generate HTML for them
  if (currentUser.favorites.length > 0) {
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $favoriteStories.append($story);
    }
  } else {
    $favoriteStories.append('<h5>No Favorite Stories Added!</h5>');
  }
  $favoriteStories.show();
}

/** Generates page with list of stories user uploaded */

function renderMyStories() {
  $myStories.empty();

  // loop through all of our stories and generate HTML for them
  if (currentUser.ownStories.length > 0) {
    for (let story of currentUser.ownStories) {
      const $story = generateStoryMarkup(story);
      $story.children(":first-child").children(":first-child").prepend('<span class="trash"><i class="fas fa-trash-alt"></i></span>');
      $myStories.append($story);
    }
  } else {
    $myStories.append('<h5>No Stories Uploaded!</h5>');
  }
  $myStories.show();
}

// createStory builds story object and runs addStory
async function createStory() {
  const author = $('#author-input').val();
  const title = $('#title-input').val();
  const url = $('#url-input').val();
  const newStory = {
    author,
    title,
    url
  }
  const createdStory = await storyList.addStory(currentUser, newStory);
  storyList.stories.push(createdStory);
  hidePageComponents();
  getAndShowStoriesOnStart();
  $allStoriesList.show();
}

// run createStory when add-story submit button is clicked
$addStoryForm.on('submit', createStory);

// toggle fill in for favorited classes and call toggleFavorite()
async function handleStarClick() {
  try {
    // update UI
    $(this).children().toggleClass('far fas');
    const selectedStoryId = $(this).closest('li').attr('id');
    const favorited = $(this).children().hasClass('fas');
    const selectedStory = storyList.stories.find(story => story.storyId === selectedStoryId);

    // make API call
    (favorited)
    ? await currentUser.saveToFavorites(selectedStoryId, selectedStory)
    : await currentUser.removeFromFavorites(selectedStoryId);

  } catch (error) {
    console.error(error);
  }
}

//toggle favorite star handle
$body.on('click', '.star', handleStarClick);

// initiates the removal for selected story
async function removeUserStory() {
  const storyId = ($(this).closest('li').attr('id'));
  await storyList.removeStory(currentUser.loginToken, storyId);

  // re-render instance of User 
  currentUser = await User.loginViaStoredCredentials(currentUser.loginToken, currentUser.username);

  // re-render myStories UI
  renderMyStories();
}

//listen for click on trash
$body.on('click', '.trash', removeUserStory);
