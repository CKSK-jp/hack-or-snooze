# hack-or-snooze
Section I Final Project

## Changelog 2023-12-14
- Implementation of addStory function in StoryList class
- POST requests to API using user input in order to build a new Story instance
- UI, nav bar changes to allow users to submit their stories

## Changelog 2023-12-16
- Implementation of favorite story functionality
- Users can now click a star on the title to add the story to their favorites list
- UI, nav bar addition of favorites list

## Changelog 2023-12-18
- Refactoring of User class to remove repetitive code
- Implementation of updateUserInstance() to agglomerate changes to current user class
- Improved handling of updating favorited stories and removing from favorited
- Nav bar functionality when user logs out and what changes and gets saved
- completion of remove story function
- css styling based on mock-up

## Changelog 2023-12-20
- Fixed issue where additional html container structure messed up storyId selector
- Optimized user added favorite stories to use the currentUser instance instead of calling a static async user method
- refactored removal logic to use filter instead

### Hotfixes:
- fixed issue where removed stories persisted until page reload
- fixed issue where adding user story would not appear on main page until reload