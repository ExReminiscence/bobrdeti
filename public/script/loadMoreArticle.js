var article = document.querySelectorAll('.article');
var loadMore__href = document.querySelector('.loadMore__href__container');

for (var i = 0; i < article.length; i++) {
    if (24 <= i) {
        article[i].style.display = 'none';
    }
}

$('.loadMore__href__container').click(function(e) {
  e.preventDefault();
  $('.article:hidden').eq(0).fadeIn(300);
    $('.article:hidden').eq(0).fadeIn(300);
    $('.article:hidden').eq(0).fadeIn(300);
    if ($('.article:hidden').length<1) {
        $('.loadMore__href__container').hide();
        $('.loadMore__href__container__link').css('display','flex');
    }
});
