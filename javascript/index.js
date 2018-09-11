require("../styles/index")

if (process.env.NODE_ENV != "production") {
  require("../html/7.html")
  require("../html/sponsoring.html")
  require("../html/index.html")
}

import $ from "jquery"

$().ready(function() {
  $(".synopsis a").each(function(i, el) {
    $(el).click(function(e) {
      e.stopPropagation()
    })
  })

  $(".synopsis").each(function(i, el) {
    $(el).click(function(e) {
      $(this).toggleClass("show")
    })
  })
})
