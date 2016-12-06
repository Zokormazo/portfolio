$(function() {
  if (Cookies.get('cookie-bar') != 'accepted') {
    $('body').append('<div class="cookie-bar"><p>This website makes use of ' +
                     'cookies to enhance browsing experience and provide ' +
                     'additional functionality.</p><a id="cookie-bar-ok">Ok, ' +
                     'I understand</a></div>');
  }

  $('#cookie-bar-ok').click(function() {
    Cookies.set('cookie-bar', 'accepted', {expires: 30});
    $('.cookie-bar').remove();
  });
});
