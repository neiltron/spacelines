var tweens;

(function ($) {
  var timeline = new TimelineMax(),
      lines = '',
      lineTotal = 0;

      setup = function () {
        var tweens = [];

        lines = $('.line'),
        lineTotal = lines.length;

        lines.each(function (i, el) {
          var scale = Math.round((i - 6) / 12) * .1,
              props = {
                scale: scale,
                opacity: scale,
                rotation: (i + 1) * 30,
                ease: Elastic.easeIn,
                delay: i * .01
              };

          if (i == lineTotal - 1) {
            props.onComplete = resetSpans;
          }

          tweens.push(
            TweenMax.to(el, 3, props)
          );
        });

        return tweens;
      },
      clockTweens = function () {
        var tweens = [],
            date = new Date();

        lines.each(function (i, line) {
          var span = $(line).find('span'),
              delay = (i * .25) - date.getSeconds(),
              delay = delay < 0 ? i * .025 : delay,
              props = {
                'background-color': 'rgba(50, 50, 50, .5)',
                left: 20,
                delay: delay
              };

          if (i == lineTotal - 1) {
            props.onComplete = function () {
              $(this.target).addClass('dropped');

              resetSpans();
            }
          } else {
            props.onComplete = function () {
              $(this.target).addClass('dropped');
            }
          }

          tweens.push(TweenMax.to(span, .5, props));
        });

        return tweens;
      },
      resetSpans = function () {
        timeline.clear();

        $('.line span.dropped').each(function (i, span) {
          TweenMax.to(span, .5, { height: 1, left: $(span).data('left'), background: 'transparent' })
        });

        timeline.add(clockTweens());
      };

  for (var i = 0; i < 240; i++) {
    var line = $('<div class="line"><span></span></div>').appendTo('main'),
        span = line.find('span');

    span.data('left', (i + 1) * 2);
    TweenMax.set(line.find('span'), { xPercent: 50, yPercent: 50, transform: 'rotate(0)', left: span.data('left'), z: 0.1 })
  }

  timeline.add(setup());

  $('body').on('click', function (e) {
    e.preventDefault();

    resetSpans();
  });
})(jQuery);