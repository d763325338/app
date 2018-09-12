$(function() {
    $('.lift a').on('click', function(event) {
        event.preventDefault();
        var top = $('#' + $(this).attr('title')).offset().top - 50;
        console.log(top)
        $('body,html').animate({
            scrollTop: top
        }, 1000)
    })
    $(document).scroll(function() {
        var top = $('.topbar').height() + $('.header').height();
        if ($(document).scrollTop() >= top) {
            $('.nav_fixed').css('display', 'block');
        } else if ($(document).scrollTop() < top) {
            $('.nav_fixed').css('display', 'none');
        }
    });
})