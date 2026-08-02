$(document).ready(function () {

  /* Open the lightbox when a gallery photo itself is clicked.
     Delegated to #album since gallery.js builds the <li> photos dynamically.
     The star and description elements are separate siblings, so clicking
     them never reaches this handler. */
  $('#album').on('click', 'li img', function () {
    $('.lightbox-backdrop').animate({ 'opacity': '.6' }, 300, 'linear').css('display', 'block');
    $('.lightbox-box').fadeIn();

    //Clear out whichever image is currently sitting in the box
    $('.lightbox-box').contents().remove('img');

    //Duplicate the clicked photo and drop it into the lightbox
    var $clonedImg = $(this).clone();
    $('.lightbox-box').append($clonedImg);
  });

  /* Click the "x" or click outside the box to close the lightbox */
  $('.lightbox-close, .lightbox-backdrop').on('click', function () {
    $('.lightbox-backdrop').animate({ 'opacity': '0' }, 300, 'linear', function () {
      $('.lightbox-backdrop').css('display', 'none');
    });
    $('.lightbox-box').fadeOut();
  });

});
