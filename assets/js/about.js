$(function() {
  function setDimensions(){
     var windowsHeight = $(window).height();
     $('.about-header').css('height', windowsHeight + 'px');
  }

  setDimensions();

  //when resizing the site, we adjust the heights of the sections
  $(window).resize(function() {
      setDimensions();
  });

  $( '.bio' )
  .mouseenter(function() {
    $( '.about-header' ).css( 'background', 'url(http://localhost:4000/images/look.jpg) no-repeat center center fixed').css('background-size', 'cover' );
  })
  .mouseleave(function() {
    $( '.about-header' ).css( 'background', 'url(http://localhost:4000/images/away.jpg) no-repeat center center fixed').css('background-size', 'cover' );
  });
});
