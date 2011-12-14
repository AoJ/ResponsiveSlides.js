/*! ResponsiveSlides.js v1.03. (c) 2011 Viljami Salminen. MIT License. http://responsive-slides.viljamis.com  */
(function ($) {
  $.fn.responsiveSlides = function (opts) {
    // Settings
    var settings = {
      'speed' : 4000,
      'fade' : 1000,
      'maxwidth' : 'none',
      'namespace' : 'rs'
    };

    return this.each(function () {
      var $this = $(this);
      if (opts) {
        $.extend(settings, opts);
      }

      var slideshow = function () {

        var $slide = $this.find('img'),
          namespace = settings.namespace,
          activeClass = namespace + '_here',
          visibleClass = namespace + '_on',
          slideClassPrefix = namespace + '_s',
          tabsClass = namespace + '_tabs',
          $pagination = $('<ul class="' + tabsClass + '" />'),
          fadetime = parseFloat(settings.fade),
          visible = { 'position': 'relative', 'float': 'left' },
          hidden = { 'position': 'absolute', 'float': 'none' };

        // Don't run if there's only one slide
        if ($this.find($slide).length <= 1) {
          return;
        }

        $slide.each(function (i) {
          this.id = slideClassPrefix + i;
        });

        $slide.css({
          'top': 0,
          'left': 0,
          'width': '100%',
          'height': 'inherit',
          'position': 'absolute'
        });

        $this.css({
          'max-width': parseFloat(settings.maxwidth),
          'width': '100%',
          'overflow': 'hidden',
          'position': 'relative'
        });

        $this.find(':first-child').css(visible);
        $this.find($slide + ':gt(0)').hide();

        // Auto: true
        if (settings.auto === true) {
          setInterval(function () {
            $this.find(':first-child').fadeOut(fadetime, function () {
              $(this).css(hidden);
            }).next($slide).fadeIn(fadetime, function () {
              $(this).css(visible);
            }).end().appendTo($this);
          }, parseFloat(settings.speed));

        }
      };

      // Fallback to make IE6 support CSS max-width
      var widthSupport = function () {
        var maxwidth = parseFloat(settings.maxwidth);
        if (opts.maxwidth) {
          if (typeof document.body.style.maxHeight === 'undefined') {
            $this.each(function () {
              $this.css('width', '100%');
              if ($this.width() > maxwidth) {
                $this.css('width', maxwidth);
              } else if ($this.width() < maxwidth) {
                $this.css('width', '100%');
              }
            });
          }
        }
      };

      // Call once
      slideshow();
      widthSupport();
      // Call on resize
      $(window).resize(function () {
        widthSupport();
      });
    });
  };
})(jQuery);