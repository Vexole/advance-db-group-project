"use strict";

$(document).ready(function () {
  // Move the page back to the top when user clicks on the "Go To Top" icon.
  $("#go_to_top").click(() => {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });

  const breakPoint = window.matchMedia("(min-width: 768px)");

  /**
   * The "Go To Top" button is initially hidden and displayed only when user scrolls.
   * If user returns to top of the screen, hide the button.
   */
  let goToTopBtn = document.getElementById("go_to_top");
  window.onscroll = () => {
    if (
      (document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20) &&
      breakPoint.matches
    ) {
      goToTopBtn.style.display = "block";
    } else {
      goToTopBtn.style.display = "none";
    }
  };
});
