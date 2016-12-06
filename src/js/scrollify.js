$(function() {
  var header = $('header');
  var logo = header.find('.logo');

  $.scrollify({
    section: "section",
    sectionName: "section-name",
    interstitialSection: "footer",
    before: function(index,sections) {
      if (index === 0)
        header.removeClass("alternative");
      else
        header.addClass("alternative");

      if (index != (sections.length -1) && (index % 2) == 1)
        header.addClass("reverse");
      else
        header.removeClass("reverse");

      switch(index % 4) {
        case 0:
          logo.removeClass('alt-1 alt-2 alt-3');
          break;
        case 1:
          logo.removeClass('alt-2 alt-3');
          logo.addClass('alt-1');
          break;
        case 2:
          logo.removeClass('alt-1 alt-3');
          logo.addClass('alt-2');
          break;
        case 3:
          logo.removeClass('alt-1 alt-2');
          logo.addClass('alt-3');
      }
    }
  });

  if ($("section").length % 2 === 0)
    $("footer").addClass('reverse');
});

$(".scroll-next").click(function (e) {
  e.preventDefault();
  $.scrollify.next();
});

$(".scroll-home").click(function(e) {
  e.preventDefault();
  $.scrollify.move(0);
});
