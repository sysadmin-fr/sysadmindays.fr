require('../styles/index');

if (process.env.NODE_ENV != "production") {
  require('../index.html');
}

import $ from 'jquery';

$().ready(function() {
  $('.synopsis').each(function(i, e) {
    var el = $(e);
    el.on('click', function() {
      $(this).toggleClass("show");
    })
  });
})
