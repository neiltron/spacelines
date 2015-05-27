var tweens;

(function ($) {
  var timeline = new TimelineMax(),
      firstRun = 1,
      rotation = function () { return (360 / 60) * new Date().getMinutes(); },
      hours = function () {
        var hours = new Date().getHours();

        return hours > 12 ? hours - 13 : hours;
      },
      seconds = function () { return firstRun ? 0 : 60 - new Date().getSeconds(); },
      tween = function () {
        return [
          TweenMax.staggerTo($('.line'), 1, { scale: 1, rotation: rotation(), transformOrigin: 'bottom left', ease: Elastic.easeInOut, delay: seconds() }, .1),
          TweenMax.to($('.line span').eq(hours()), .5, { scale: 1.4, height: 2, repeat: -1, yoyo: true, ease: Circ.easeOut })
        ];
      };

  for (var i = 0; i <= 12; i++) {
    var line = $('<div class="line"><span></span></div>').appendTo('main');
    TweenMax.set(line.find('span'), { 'left': (i + 4) * 10 + 'px' });
  }

  timeline.add(tween());
  timeline.eventCallback('onComplete', function () {
    firstRun = 0;

    timeline.add(tween());
  });
})(jQuery);