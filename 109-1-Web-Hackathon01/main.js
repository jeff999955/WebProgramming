var cells = document.getElementsByClassName("date")
var input = document.getElementById("cal-input")
var color = document.getElementById("cal-color")
var button = document.getElementById("cal-button")
input.value = ''
color.value = '#b0b0b0'


// td list
let tdl = document.getElementsByTagName("td");
var tdlist = Array.prototype.slice.call(tdl, 7);

let clique = function (ce) {
    for (var td of tdlist) {
        td.classList.remove("date_clicked");
        td.classList.remove("date_over");
    }
    ce.classList.add("date_clicked");
}

let over = function (ce) {

    if (!ce.classList.contains("date_clicked"))
        ce.classList.add("date_over");
}

let left = function (ce) {
    if (ce.classList.contains("date_clicked"))
        return;
    ce.classList.remove("date_over");
}
for (var td of tdlist) {
    td.setAttribute("onclick", "clique(this)");
    td.setAttribute("onmouseover", "over(this)");
    td.setAttribute("onmouseleave", "left(this)");
}

let append = function () {
    let cur = -1;
    for (var i = 0; i < 28; i++)
        if (tdlist[i].classList.contains("date_clicked")) {
            cur = i;
            break;
        }
    if(cur < 0)
        return;
    const cdiv = document.createElement("div");
    const colour = "color: " + color.value;
    cdiv.setAttribute("style", colour);
    cdiv.innerText = input.value;
    tdlist[i].innerHTML = (cur+4).toString();
    tdlist[i].appendChild(cdiv);
    input.value = "";
}

input.addEventListener("keyup", function(e){
    if(e.key == "Enter"){
        append();
    }
});






//Sets the page's theme. No need to modify
var themeButton = document.getElementsByClassName("ChooseTheme")
for (var i = 0; i < themeButton.length; ++i) {
    themeButton[i].addEventListener('click', e => {
        document.body.setAttribute('class', e.target.id)
    }, false)
}