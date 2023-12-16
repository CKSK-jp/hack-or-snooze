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
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <span class="star"><i class="fa-star far"></i></span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
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
    $favoriteStories.append('<h5>No Stories Added!</h5>');
  }
  $favoriteStories.show();
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


function makeFavorite(id) {
  const selectedStory = storyList.stories.find((story) => {
    return story.storyId === id;
  });
  const listOfFavs = currentUser.favorites;
  if (listOfFavs.includes(selectedStory)) {
    const storyIndex = listOfFavs.indexOf(selectedStory);
    listOfFavs.splice(storyIndex, 1); //remove from favs
  } else {
    listOfFavs.push(selectedStory); // add to favs
  }
  console.log(listOfFavs);
}

//toggle favorite star handle
$allStoriesList.on('click', '.star', function () {
  console.log($(this).children().toggleClass('far fas'));
  const selectedStoryId = $(this).parent().attr('id');
  makeFavorite(selectedStoryId);
});
