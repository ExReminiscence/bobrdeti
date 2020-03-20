var usefullArrow = document.querySelectorAll('.usefullPageItem-desc__content__right-href-arrow');
var usefullCategory = document.querySelectorAll('.usefullPageItemCategory');
var usefullContent = document.querySelectorAll('.usefullPageItem-desc__content');
var usefullItem=document.querySelectorAll('.usefullPageItem');
var usefullImg=document.querySelectorAll('.usefullPageItem-img');
for(let i=0; i<usefullArrow.length;i++){
    usefullArrow[i].onclick = () => {
        if(usefullCategory[i].style.display == 'block'){
            usefullCategory[i].style.display = 'none';
            usefullContent[i].style.background = "#FEFEFE";
            usefullImg[i].style.borderRight = "2px solid #F6F6F6";
            usefullImg[i].style.borderLeft = "none";
            usefullImg[i].style.borderTop = "none";
            usefullImg[i].style.borderBottom = "none";
            usefullItem.forEach(function (item, k, arr) {
                if(k==i){
                    if(usefullItem[k].style.zIndex != "30"){
                        usefullItem[k].style.zIndex = "30";
                    }

                } else {
                    if(usefullItem[k].style.zIndex != "10"){
                        usefullItem[k].style.zIndex = "10";
                    }
                }
            });
        } else{
            usefullCategory[i].style.display = 'block';
            usefullContent[i].style.background = "#FEC022";
            usefullImg[i].style.border = "2px solid #FEC022";
            usefullItem[i].classList.remove('zindex');
        }
    };
}


$(".usefullAll__item__content__desc").text(function (i, text) {
    if (text.length >= 150) {
        text = text.substring(0, 150);
        var lastIndex = text.lastIndexOf(" ");
        text = text.substring(0, lastIndex) + ' ...';
    }
    $(this).text(text);
});