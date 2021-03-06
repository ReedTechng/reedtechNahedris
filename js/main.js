(function ($) {
"use strict";

  // TOP Menu Sticky
  $(window).on('scroll', function () {
    var scroll = $(window).scrollTop();
    if (scroll < 150) {
      $("#sticky-header").removeClass("sticky");
      $('#back-top').fadeIn(500);
    } else {
      $("#sticky-header").addClass("sticky");
      $('#back-top').fadeIn(500);
    }
  });

    //Web Share Api Button
    const title = window.document.title;
    const url = window.document.location.href;
  
    document.querySelectorAll('.share-button').forEach(item => {
      item.addEventListener('click', e => {
        if (navigator.share) {
          navigator.share({
            title: `${title} `,
            url: `${url}`,
          }).then(() => {
          console.log('Thanks for sharing our awesome recipe!');
          })
          .catch(console.error);
        }
        else {
          var $temp = $("<input>");
          var $url = $(location).attr('href');
  
          $("body").append($temp);
          $temp.val($url).select();
          document.execCommand("copy");
          $temp.remove();
          alert('URL copied to clipboard!' );
        }
      });
    });

    $(document).ready(function(){


    // Single page button 
    let addBtn = document.querySelector('#add');
    let subBtn = document.querySelector('#sub');
    let qtyBox = document.querySelector('#qtyBox');

    // console.log(addBtn, subBtn, qtyBox);

    addBtn.addEventListener('click', ()=> {
      qtyBox.value = parseInt(qtyBox.value) + 1;
    });

    subBtn.addEventListener('click', ()=> {
      if (qtyBox.value <= 0) {
          qtyBox.value = 0;
      }
      else {
        qtyBox.value = parseInt(qtyBox.value) - 1;
      }
      
    });
    // Mobile bookmark
    addToHomescreen();
    
});

    // Bookmarks

    $('.btn-bookmark').click(function (e) {
      var bookmarkTitle = document.title;
      var bookmarkUrl = window.location.href;

      if ('addToHomescreen' in window && addToHomescreen.isCompatible) {
        // Mobile browsers
        addToHomescreen({ autostart: false, startDelay: 0 }).show(true);
      } else if (/CriOS\//.test(navigator.userAgent)) {
        // Chrome for iOS
        alert('To add to Home Screen, launch this website in Safari, then tap the Share button and select "Add to Home Screen".');
      } else if (window.sidebar && window.sidebar.addPanel) {
        // Firefox <=22
        window.sidebar.addPanel(bookmarkTitle, bookmarkUrl, '');
      } else if ((window.sidebar && /Firefox/i.test(navigator.userAgent) && !Object.fromEntries) || (window.opera && window.print)) {
        // Firefox 23-62 and Opera <=14
        $(this).attr({
          href: bookmarkUrl,
          title: bookmarkTitle,
          rel: 'sidebar'
        }).off(e);
        return true;
      } else if (window.external && ('AddFavorite' in window.external)) {
        // IE Favorites
        window.external.AddFavorite(bookmarkUrl, bookmarkTitle);
      } else {
        // Other browsers (Chrome, Safari, Firefox 63+, Opera 15+)
        alert('Press ' + (/Mac/i.test(navigator.platform) ? 'Cmd' : 'Ctrl') + '+D to bookmark this page.');
      }

      return false;
    });

})(jQuery);	