//$(function() {
// var lunbo = $('.buypic li');
// var i = 0;
// var lunbo_btn = $('.lunbo_btn li');
// var timer = setInterval(function() {
//     if (i === lunbo.length) {
//         i = 0;
//     }
//     $(lunbo[i]).addClass('lunbo');
//     $(lunbo[i]).siblings().removeClass('lunbo');
//     $(lunbo[i]).fadeIn(2000).fadeOut(1000);
//     $(lunbo_btn[i]).siblings().css('background', '#dfdfdf');
//     $(lunbo_btn[i]).css('background', '#fff');
//     i++;
// }, 3000)

// $('.buycom').hover(function() {
//     clearInterval(timer);
// }, function() {
//     timer = setInterval(function() {
//         if (i === lunbo.length) {
//             i = 0;
//         }
//         $(lunbo[i]).addClass('lunbo');
//         $(lunbo[i]).siblings().removeClass('lunbo');
//         $(lunbo[i]).fadeIn(2000).fadeOut(1000);
//         $(lunbo_btn[i]).siblings().css('background', '#dfdfdf');
//         $(lunbo_btn[i]).css('background', '#fff');
//         i++;
//     }, 3000)

// })

// $(lunbo_btn).on('click', function() {
//     var index = $(this).index();
//     $(lunbo_btn[index]).siblings().css('background', '#dfdfdf');
//     $(lunbo_btn[index]).css('background', '#fff');
//     $(lunbo[index]).fadeIn(1000).fadeOut(0);
//     $(lunbo[index]).siblings().removeClass('lunbo');
//     $(lunbo[index]).addClass('lunbo');
//     console.log(index);
// })

//})
(function($) {
    $.fn.extend({
        slider: function(options) {
            var _that = this, //当前上下文对象
                main = null, //主函数
                start = null, //开始
                stop = null, //停止
                init = null, //初始化
                next = null, //下一张
                prev = null, //上一张
                timeout = null, //计时器
                elems = {}, //元素获取
                defaults = {
                    speed: 600, //动画时间
                    delay: 3000 //展示时间
                };
            options = $.extend(defaults, options);

            init = function() {
                elems._index = 1;
                elems.sliderDiv = _that.children('.lunbo');
                elems.btn = _that.children('span');
                elems.tip = _that.children('.lunbo_tip').children('ul').children('li');
                elems.sliderDiv.append(elems.sliderDiv.children('li').first().clone());
                elems.img = _that.children('.lunbo').children('li').children('a').children('img');
                elems.width = elems.img.width() * elems.img.length;
                elems.sliderDiv.css('width', elems.width + 'px');
                console.log(elems.tip[0])
                _that.hover(function() {
                    stop();
                }, function() {
                    timeout = setInterval(function() {
                        start(1);
                    }, options.delay + options.speed);
                });

                elems.btn.on('click', function() {
                    if (elems.btn.index($(this))) {
                        next();
                    } else {
                        prev();
                    }
                });
            }


            start = function(fx) {
                var t = '-=' + elems.img.width() + 'px';
                if (!fx) {
                    t = '+=' + elems.img.width() + 'px';
                    if (elems._index <= 1) {
                        var divLeft = _that.offset().left,
                            imgLeft = elems.img.last().offset().left;
                        elems._index = elems.img.length;
                        elems.sliderDiv.css('left', '-' + (imgLeft - divLeft) + 'px');
                    }
                }
                elems.sliderDiv.animate({
                    left: t
                }, options.speed, function() {
                    if (fx) elems._index++;
                    else elems._index--;

                    if (elems._index === elems.img.length) {
                        elems.sliderDiv.css('left', 0);
                        elems._index = 1;
                    }
                    elems.tip[elems._index - 1].addClass('lunbo_tip_bg');
                    console.log(elems.tip[elems._index - 1])
                });
            }


            main = function() {
                init();
                timeout = setInterval(function() {
                    start(1);
                }, options.delay + options.speed);
            }

            stop = function() {
                elems.sliderDiv.stop(true, true);
                clearInterval(timeout);
            }

            next = function() {
                stop();
                start(1);
            }

            prev = function() {
                stop();
                start(0);
            }
            main();
        }
    });


})(jQuery);
$(function() {

    $('.buypic').slider();
})