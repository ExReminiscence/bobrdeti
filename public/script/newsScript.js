$(".minNewsBlockDesc").text(function(i, text) {
    if (text.length >= 125) {
      text = text.substring(0, 125);
      var lastIndex = text.lastIndexOf(" ");
      text = text.substring(0, lastIndex) + ' ...';
    }
    $(this).text(text);
  });


  $(".newsPage__popular__item__desc").text(function(i, text) {
    if (text.length >= 150) {
      text = text.substring(0, 150);
      var lastIndex = text.lastIndexOf(" ");
      text = text.substring(0, lastIndex) + ' ...';
    }
    $(this).text(text);
  });



  $(".newsPage__events__item__content__name a").text(function (i, text) {
      if (text.length >= 55) {
          text = text.substring(0, 55);
          var lastIndex = text.lastIndexOf(" ");
          text = text.substring(0, lastIndex) + ' ...';
      }
      $(this).text(text);
  });

  $(".newsPage__events__item__content__desc").text(function(i, text) {
    if (text.length >= 150) {
      text = text.substring(0, 150);
      var lastIndex = text.lastIndexOf(" ");
      text = text.substring(0, lastIndex) + ' ...';
    }
    $(this).text(text);
  });
