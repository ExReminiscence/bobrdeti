$(".smallNewsBlockNameA").text(function (i, text) {
    if (text.length >= 80) {
        text = text.substring(0, 80);
        var lastIndex = text.lastIndexOf(" ");
        text = text.substring(0, lastIndex) + ' ...';
    }
    $(this).text(text);
});
