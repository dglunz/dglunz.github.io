$(function() {
  $('.about-nav .svg-wrapper').hover(function(){
    $(this).find('.shape').css('stroke-dasharray', 760);
    $(this).find('.shape').css('stroke-dashoffset', 0);
  }, function(){
    $('.about-nav .svg-wrapper .shape').css('stroke-dasharray', "55 350");
    $('.about-nav .svg-wrapper .shape').css('stroke-dashoffset', -180);
  });

  checkSize();
  $(window).resize(checkSize);
});

function checkSize(){
  if ($(".breakpoint").css("float") == "right" ){
    $('.about-nav .svg-wrapper .shape').css('stroke-dasharray', 760);
    $('.about-nav .svg-wrapper .shape').css('stroke-dashoffset', 0);
  }
  else {
    $('.about-nav .svg-wrapper .shape').css('stroke-dasharray', "55 350");
    $('.about-nav .svg-wrapper .shape').css('stroke-dashoffset', -180);
  }
});
