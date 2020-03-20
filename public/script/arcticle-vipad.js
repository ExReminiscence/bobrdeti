$(document).ready(function(){

    var openBtn=$('.vipad');
    var heder_menu_articleMenu=$('.header-menu-articleMenu');
    openBtn.click(function(e){
        e.preventDefault();
        if(heder_menu_articleMenu.is(':visible')){
            openBtn.css("transform", "rotateX(0deg)");
        }else if(heder_menu_articleMenu.is(':hidden')){
            openBtn.css("transform", "rotateX(180deg)");
        }
        heder_menu_articleMenu.slideToggle(100);

    });





  });
