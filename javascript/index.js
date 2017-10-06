require('../styles/index');

if (process.env.NODE_ENV != "production") {
  require('../index.html');
}

import $ from 'jquery';

$().ready(function() {
  $('.synopsis a').each(function(i, el) {
    $(el).click(function(e) {
      e.stopPropagation();
    });
  });

  $('.synopsis').each(function(i, el) {
    $(el).click(function(e) {
      $(this).toggleClass("show");
    });
  });
})
