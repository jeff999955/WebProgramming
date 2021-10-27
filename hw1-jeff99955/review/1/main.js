var images_link = [];
images_link.push("https://data.whicdn.com/images/343495968/original.jpg");
images_link.push("https://3.bp.blogspot.com/-7UENL4hhz8s/TpDULJQCZvI/AAAAAAAAEpA/yNAcHczXIuw/s1600/Healy+Pass+Goat.jpg");
images_link.push("https://64.media.tumblr.com/940ba0c7b85b81d62ab058b29f5a9361/636b5b1244c586d6-17/s540x810/a6a2afc90719e31732343e38a2c58106bf615026.jpg");
images_link.push("https://64.media.tumblr.com/423ce7f24591fbe72f714bb9c6eba019/ab8cd310df4c9cbc-b6/s640x960/f8ae68789c0db7c3e7ffd6d9cdea8372a1abdfe6.jpg");
images_link.push("https://i.pinimg.com/originals/5c/2a/e6/5c2ae6571de91125b91a6f5c69d0b8c9.jpg");


var images_source = [];
images_source.push("https://weheartit.com/entry/343495968");
images_source.push("http://www.liveacolorfullife.net/2011/10/name-game-fluffy-sheep-quilting.html");
images_source.push("https://fairy-humor.tumblr.com/post/622557005352206336/%F0%9D%97%B3%F0%9D%97%B9%F0%9D%98%82%F0%9D%97%B3%F0%9D%97%B3%F0%9D%98%86-%F0%9D%98%80%F0%9D%97%B5%F0%9D%97%B2%F0%9D%97%B2%F0%9D%97%BD-%F0%9D%97%B3%F0%9D%97%B9%F0%9D%98%82%F0%9D%97%B3%F0%9D%97%B3%F0%9D%98%86-%F0%9D%97%B0%F0%9D%97%BC%F0%9D%98%84-%F0%9D%97%B3%F0%9D%97%B9%F0%9D%98%82%F0%9D%97%B3%F0%9D%97%B3%F0%9D%98%86-%F0%9D%98%80%F0%9D%97%B5%F0%9D%97%B2%F0%9D%97%B2%F0%9D%97%BD-%F0%9D%97%B3%F0%9D%97%B9%F0%9D%98%82%F0%9D%97%B3%F0%9D%97%B3%F0%9D%98%86-%F0%9D%97%B0%F0%9D%97%BC%F0%9D%98%84");
images_source.push("https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tumblr.com%2Ftagged%2Fcows&psig=AOvVaw3dSqGIypwq3o6yWdvI83YU&ust=1601697511679000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJCR6a6ClewCFQAAAAAdAAAAABAU");
images_source.push("https://www.pinterest.co.uk/pin/193232640234241108/?autologin=true&nic_v2=1a7wmclz8");


var count = 0;
var i_link = document.getElementById("display");
i_link.src = images_link[count];

function nextImage() {
    var i_link = document.getElementById("display");
    var i_src = document.getElementById("image__link");
    var i_v_next = document.getElementById("next");
    var i_v_pre = document.getElementById("previous");

    i_link.src = "";

    if (count <= (images_link.length - 2)) {
        count++;
        i_link.src = images_link[count];
        i_src.href = images_source[count];
        i_src.innerHTML = images_source[count];

        if (count === 1) {
            i_v_pre.classList.remove("disabled");
        }

        if (count === (images_link.length - 1)) {
            i_v_next.classList.add("disabled");
        }
    } else {
        return;
    }
}

function lastImage() {
    var i_link = document.getElementById("display");
    var i_src = document.getElementById("image__link");
    var i_v_next = document.getElementById("next");
    var i_v_pre = document.getElementById("previous");

    i_link.src = "";

    if (count >= 1) {
        count--;
        i_link.src = images_link[count];
        i_src.href = images_source[count];
        i_src.innerHTML = images_source[count];

        if (count === 0) {
            i_v_pre.classList.add("disabled");
        }

        if (count === (images_link.length - 2)) {
            i_v_next.classList.remove("disabled");
        }
    } else {
        return;
    }
} 