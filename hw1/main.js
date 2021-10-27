var idx = 0;
var link = ["https://barefeetinthekitchen.com/wp-content/uploads/2018/05/Easiest-Ice-Cream-1-1-of-1.jpg",
    "https://www.seriouseats.com/recipes/images/2017/08/20170729-oreo-ice-cream-vicky-wasik-18-1500x1125.jpg",
    "https://www.wellplated.com/wp-content/uploads/2016/08/Homemade-Banana-Ice-Cream.jpg",
    "https://i1.wp.com/www.alattefood.com/wp-content/uploads/2015/05/Homemade-Strawberry-Ice-Cream-Recipe-37.jpg",
    "https://minimalistbaker.com/wp-content/uploads/2015/06/AMAZING-Vegan-Cherry-Pie-ICE-CREAM-10-ingredients-simple-methods-SO-delicious-vegan-recipe-icecream-dessert-cherry-summer-fruit-675x1024-1.jpg",
    "https://www.tasteofhome.com/wp-content/uploads/2018/01/EXPS_35621_TH1195008D7_RMS-696x696.jpg",
    "https://www.recipegirl.com/wp-content/uploads/2007/08/Blueberry-Ice-Cream-1.jpg",
    "https://www.chopstickchronicles.com/wp-content/uploads/2016/08/Matcha-Ice-Cream-16.jpg"
];

var cheque = () => {
    btn_prev = document.getElementById("btn_prev");
    if (idx == 0)
        btn_prev.classList.add("disabled");
    else
        btn_prev.classList.remove("disabled"); // remove b4 checking cuz js allowed me to do so lol
    btn_next = document.getElementById("btn_next");
    console.log(btn_next.classList);
    if (idx == link.length - 1)
        btn_next.classList.add("disabled");
    else
        btn_next.classList.remove("disabled");
}


var load = () => {
    imglink = document.getElementById("imglink");
    imglink.innerText = link[idx];
    cheque();
    imgview = document.getElementById("imgview");
    imgview.src = "./images/loading.gif"
    imgview.src = link[idx];
    var img = new Image();
    img.src = lind[idx];
    img.onload = () => {
        imgview.src = img.src;
    };
};


var loading = () => {
    imgview = document.getElementById("imgview");
    imgview.src = "./images/loading.gif";
};

var end_alert = () => {
    alert('You\'ve reached the end man...');
};

var prev_onclick = () => {
    if (idx == 0) {
        end_alert();
    } else {
        idx--;
        load();
    }
};

var next_onclick = () => {
    if (idx == link.length - 1) {
        end_alert();
    } else {
        idx++;
        load();
    }
};
