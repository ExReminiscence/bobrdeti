var openGalleryBtn = document.querySelectorAll('.openGallery');
var galleryBlock = document.querySelectorAll('.showGallery');

openGalleryBtn.forEach(function (item, i, arr){
    item.onclick = () => {
        if(galleryBlock[i].style.display == "none"){
            galleryBlock[i].style.display = "block";
        } else {
            galleryBlock[i].style.display = "none";
        }
    }
});
