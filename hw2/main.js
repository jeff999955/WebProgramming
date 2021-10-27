todos = []
done = []
mode = 0
const txt_input = document.getElementById("txt_input")
const footer = document.getElementById("todo-footer");
const todo_list = document.getElementById("todo_list");
const counter = document.getElementById("todo_counter");
const btn_clear = document.getElementById("clear_c");

let listitem = function (str, stat) {
    this.str = str;
    this.stat = stat; // 0 for not completed, 1 for completed, neg for deleted
};

txt_input.placeholder = "What needs to be done?";
txt_input.addEventListener("keyup", function(e){
    if(e.key == "Enter"){
        if(txt_input.value){
            //alert(txt_input.value);
            todos.push(new listitem(txt_input.value, 0));
            add(todos.length - 1);
            txt_input.value = "";
        }
    }
    show();
});

let show = () => {
    let len = 0;
    len = todos.filter(x => x.stat == 0).length;
    counter.innerText = String(len) + " left";
}

let change = (input) => {
    idx = parseInt(input.id);
    lbl = input.parentNode.parentNode.lastElementChild;
    todos[idx].stat = !todos[idx].stat;
    input.checked = todos[idx].stat;
    if(input.checked) {
        lbl.style["textDecoration"] = "line-through";
        lbl.style["opacity"] = 0.5;
    } else {
        lbl.style["textDecoration"] = "";
        lbl.style["opacity"] = 1;
    }
    show();
};
// add ui to li
let add = (idx) => {
    if(todos[idx].stat < 0)
        return;
    const item = document.createElement("li");
    const chkbox = document.createElement("div");
    const lblitem = document.createElement("h1");
    const ximg = document.createElement("img");
    const zip = document.createElement("input");
    const lbl = document.createElement("label");
    item.setAttribute("class", "todo-app__item");
    chkbox.setAttribute("class", "todo-app__checkbox");
    zip.setAttribute("id", idx.toString());
    zip.classList.add("todo-item-input");
    zip.setAttribute("type", "checkbox");
    zip.checked = todos[idx].stat;
    zip.setAttribute("onchange", "change(this);");
    lbl.setAttribute("for", idx.toString());
    lblitem.innerText=todos[idx].str;
    lblitem.classList.add("todo-app__item-detail");
    if(todos[idx].stat == 1){
        lblitem.style["textDecoration"] = "line-through";
        lblitem.style["opacity"] = 0.5;
    }
    ximg.src = "./img/x.png";
    ximg.setAttribute("class", "todo-app__item-x");
    ximg.addEventListener("click",  function () {
        var idx = parseInt(this.nextElementSibling.childNodes[0].id);
        todos[idx].stat = -1;
        todo_list.removeChild(this.parentNode);
        show();
    });
    chkbox.appendChild(zip);
    chkbox.appendChild(lbl);
    item.appendChild(ximg);
    item.appendChild(chkbox);
    item.appendChild(lblitem);
    todo_list.appendChild(item);
}

let _all = () => {
    todo_list.innerHTML = "";
    todos.forEach((item, index) => {
        if(item.stat >= 0)
            add(index);
    });
    show();
}

let complete = () => {
    todo_list.innerHTML = "";
    todos.forEach((item, index) => {
        if(item.stat == 1)
            add(index);
    });
    show();
}

let active = () => {
    todo_list.innerHTML = "";
    todos.forEach((item, index) => {
        if(item.stat == 0)
            add(index);
    });
    show();
}

let clearc = () => {
    todos.forEach((item) => {
        if(item.stat == 1)
            item.stat = -1;
    })
    active();
}
