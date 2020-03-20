$('#menu-button').on('click', function() {
  $(document.body).toggleClass('menu-open');
  let menu=$('.header-rightBlock');
  menu.toggleClass('showMenu');
});
