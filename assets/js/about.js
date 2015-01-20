$(function() {

  function setDimensions(){
     var windowsHeight = $(window).height();
     $('.about-header').css('height', windowsHeight + 'px');
  }

  setDimensions();

  $(window).resize(function() {
      setDimensions();
  });

  $( '.bio' )
  .mouseenter(function() {
    $( '.about-header' ).css( 'background', '#EDEBED url(http://www.dannyglu.nz/images/look.jpg) no-repeat center center fixed').css('background-size', 'cover' );
  })
  .mouseleave(function() {
    $( '.about-header' ).css( 'background', '#EDEBED url(http://www.dannyglu.nz/images/away.jpg) no-repeat center center fixed').css('background-size', 'cover' );
  });

  var lastScrollTop = 0;
  $(window).scroll(function(event){
      var st = $(this).scrollTop();
      if (st > lastScrollTop){
       $( '.about-header' ).css( 'background', 'url(http://www.dannyglu.nz/images/look.jpg) no-repeat center center fixed').css('background-size', 'cover' );
      } else {
       $( '.about-header' ).css( 'background', 'url(http://www.dannyglu.nz/images/away.jpg) no-repeat center center fixed').css('background-size', 'cover' );
      }
      lastScrollTop = st;
   });

});
