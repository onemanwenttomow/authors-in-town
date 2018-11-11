// window.addEventListener('load', function(){
//     new Glider(document.querySelector('.glider'), {
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         duration: .75,
//         // easeInQuad
//         easing: function (x, t, b, c, d) {
//             return c*(t/=d)*t + b;
//         },
//         arrows: {
//             prev: '.glider-prev',
//             next: '.glider-next'
//         },
//         dots: '#dots',
//         responsive: [{
//             breakpoint: 900,
//             settings: {
//                 slidesToShow: 3,
//                 slidesToScroll: 3,
//             }
//         },{
//             breakpoint: 575,
//             settings: {
//                 slidesToShow: 2,
//                 slidesToScroll: 2,
//             }
//         }]
//     });
// });

/// jQuery is required to run this code
  $( document ).ready(function() {
    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');

    $(window).on('resize', function() {
      scaleVideoContainer();
      scaleBannerVideoSize('.video-container .poster img');
      scaleBannerVideoSize('.video-container .filter');
      scaleBannerVideoSize('.video-container video');
    });
  });

  function scaleVideoContainer() {
    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);
  }

  function initBannerVideoSize(element){
    $(element).each(function(){
      $(this).data('height', $(this).height());
      $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);
  }

  function scaleBannerVideoSize(element) {

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    // console.log(windowHeight);

    $(element).each(function(){
      var videoAspectRatio = $(this).data('height')/$(this).data('width');

      $(this).width(windowWidth);

      if(windowWidth < 1000){
          videoHeight = windowHeight;
          videoWidth = videoHeight / videoAspectRatio;
          $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

          $(this).width(videoWidth).height(videoHeight);
      }

      $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
  }
