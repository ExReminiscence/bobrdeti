var articlePage__left__content=document.querySelector('.articlePage__left__content');
var articlePage__left__menuDiv__menu__item__a = document.querySelectorAll('.ARTICLE__HREF');
var articlePage__left__menuDiv__menu__item__a__h2=document.querySelectorAll('.ARTICLE__HREF__h2');
var article__choiceMenu =document.querySelector('.articlePage-ChoiceMenu');

$(".articlePage__left__content__item__desc").text(function (i, text) {
    if (text.length >= 220) {
        text = text.substring(0, 220);
        var lastIndex = text.lastIndexOf(" ");
        text = text.substring(0, lastIndex) + ' ...';
    }
    $(this).text(text);
});

$(".article p").text(function (i, text) {
    if (text.length >= 120) {
        text = text.substring(0, 120);
        var lastIndex = text.lastIndexOf(" ");
        text = text.substring(0, lastIndex) + ' ...';
    }
    $(this).text(text);
});

$('.ARTICLE__HREF:eq(0)').click(function(e){
    $('.articlePage-ChoiceMenu').slideToggle(100);
})
