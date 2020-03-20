$('.header-search').click(function(e){
    e.preventDefault();
    $('.menuSearch').slideToggle(100);
    $('#keywords').focus();
})