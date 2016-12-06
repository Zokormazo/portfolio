$(function() {
  var persistentNavigation = $('.persistent-navigation');
  var toggleNavigation = $('.toggle-navigation');

  toggleNavigation.click(function() {
    persistentNavigation.toggleClass('in');
    toggleNavigation.toggleClass('active');
  });
});
