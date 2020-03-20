$(".readAlso__item").text(function (i, text) {
    if (text.length >= 200) {
        text = text.substring(0, 200);
        var lastIndex = text.lastIndexOf(" ");
        text = text.substring(0, lastIndex) + ' ...';
    }
    $(this).text(text);
});