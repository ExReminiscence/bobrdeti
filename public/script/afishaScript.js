$(".afishaPage__content__posts__item__content__content").text(function(i, text) {
    if (text.length >= 220) {
      text = text.substring(0, 220);
      var lastIndex = text.lastIndexOf(" ");
      text = text.substring(0, lastIndex) + ' ...';
    }
    $(this).text(text);
  });
