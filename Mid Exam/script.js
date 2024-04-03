window.onload = function(){
    imageURL = document.getElementById("bigImageID");
    imageURL.addEventListener('click', function(){
        console.log(imageURL.src);
        var firstListItem = document.querySelector(".liNavBar ul li:first-child");
        firstListItem.innerHTML = imageURL.src;
    })
}

