function HandleOnClick(){

}

var left;
var count =0;
var total_item = {};
var abs_code = 0;

var isComplete =[];
var visible =[];
var exist =[];
var page_item_left=0;

function CreateNewItem(count,value){
    //var item = { node : count , isComplete : false};
    //const code = "code" + count;
    //total_item.code = item;
    //console.log(total_item);
    
    isComplete.push("false");
    visible.push("true");
    exist.push("true");

    const LIST = document.getElementById("todo_list");
    const itemNode = document.createElement("LI");
    itemNode.setAttribute("class", "todo-app__item");
    const NODEid = "NODE"+count;
    itemNode.setAttribute("id", NODEid);

    const DIV = document.createElement("DIV");
    DIV.setAttribute("class", "todo-app__checkbox");

    const INP = document.createElement("INPUT");
    const INPid = "INP"+count;
    INP.setAttribute("type", "checkbox");
    INP.setAttribute("id", INPid);
    INP.setAttribute("value", "false");

    const LAB = document.createElement("LABEL");
    const LABid = "LAB"+count;
    LAB.setAttribute("id", LABid);
    LAB.setAttribute("for", INPid);
    

    const TEX = document.createElement("H1");
    const TEXid = "TEX"+count;
    TEX.setAttribute("class", "todo-app__item-detail");
    TEX.setAttribute("id", TEXid);
    TEX.innerHTML=value;

    const IMG = document.createElement("IMG");
    IMG.setAttribute("src", "./img/x.png")
    IMG.setAttribute("class", "todo-app__item-x")
    const IMGid = "IMG"+count;
    IMG.setAttribute("id", IMGid);

    DIV.appendChild(INP);
    DIV.appendChild(LAB);
    itemNode.appendChild(DIV);
    itemNode.appendChild(TEX);
    itemNode.appendChild(IMG);
    LIST.appendChild(itemNode);
    page_item_left=0;
    for (var i=0;i<visible.length;i++){
        if(visible[i]==="true"){
            page_item_left+=1;
        }
    }
    console.log(page_item_left);
    document.getElementById("task_left").innerHTML = page_item_left + "left";

    /////delete
    document.getElementById(IMGid).addEventListener('click',function(){
        console.log(IMGid);
        exist[count]="false";
        visible[count]="false";
        console.log("delete");
        if(exist[count]==="false"){
            visible[count]="false";
            document.getElementById(NODEid).style.display="none";
        } else{
            visible[count]="true";
            document.getElementById(NODEid).style.display="";
        }
        page_item_left=0;
        for (var i=0;i<visible.length;i++){
            if(visible[i]==="true"){
                page_item_left+=1;
            }
        }
        document.getElementById("task_left").innerHTML = page_item_left + "left";
    });
    //////check
    document.getElementById(INPid).addEventListener('click', function(){
        const current_check=document.getElementById(INPid);
        if (current_check.value==="true"){
            current_check.value="false";
        }
        if (current_check.value==="false"){
            current_check.value="true";
        }
        console.log('mark');
        if (document.getElementById(INPid).value==="true"){
            const node=document.getElementById(TEXid);
            console.log('mark2');
            node.style["textDecoration"] = "line-through";
            node.style["opacity"] = 0.5;
            isComplete[count]="true";
        }
         
    });  
}


document.getElementById("btn_all").addEventListener('click', function(){
    for(var i=0; i<isComplete.length; i++){
        const NODEid = "NODE"+i;
        if(exist[i]==="true"){
            visible[i]="true";
            document.getElementById(NODEid).style.display="";  
        }  
    }
    page_item_left=0;
    for (var i=0;i<visible.length;i++){
        if(visible[i]==="true"){
            page_item_left+=1;
        }
    }
    document.getElementById("task_left").innerHTML = page_item_left + "left";
});

document.getElementById("btn_active").addEventListener('click', function(){
    for(var i=0; i<=isComplete.length; i++){
        const NN="NODE";
        const NODEid = NN+i;
        if(isComplete[i]==="false" && exist[i]==="true"){
            visible[i]="true";
            document.getElementById(NODEid).style.display="";
        }
        if(isComplete[i]==="true" && exist[i]==="true"){
            visible[i]="false";
            document.getElementById(NODEid).style.display="none";
        }   
    }
    page_item_left=0;
    for (var i=0;i<visible.length;i++){
        if(visible[i]==="true"){
            page_item_left+=1;
        }
    }
    document.getElementById("task_left").innerHTML = page_item_left + "left";
});

document.getElementById("btn_complete").addEventListener('click', function(){
    for(var i=0; i<isComplete.length; i++){
        const NODEid = "NODE"+i;
        if(isComplete[i]==="true" && exist[i]==="true"){
            visible[i]="true";
            document.getElementById(NODEid).style.display="";
        } 
        if(isComplete[i]==="false" && exist[i]==="true"){
            visible[i]="false";
            document.getElementById(NODEid).style.display="none";
        }   
    }
    page_item_left=0;
    for (var i=0;i<visible.length;i++){
        if(visible[i]==="true"){
            page_item_left+=1;
        }
    }
    document.getElementById("task_left").innerHTML = page_item_left + "left";
});

document.getElementById("btn_clear").addEventListener('click', function(){
    for(var i=0; i<isComplete.length; i++){
        const NODEid = "NODE"+i;
        if(isComplete[i]==="true" && exist[i]==="true"){
            visible[i]="false";
            exist[i]="false"
            document.getElementById(NODEid).style.display="none";
        } 
    }
    page_item_left=0;
    for (var i=0;i<visible.length;i++){
        if(visible[i]==="true"){
            page_item_left+=1;
        }
    }
    document.getElementById("task_left").innerHTML = page_item_left + "left";
});



document.getElementById("todo-input").addEventListener('keyup', event => {
    if ( event.keyCode === 13 && event.target.value !== ''){  
        CreateNewItem(abs_code,event.target.value);
        document.getElementById("todo-input").value="";
        abs_code = abs_code + 1;
    }
});

var i ;
for(i=0; i < total_item.length; i++){
    if (total_item[i].isComplete === false){
        const node = document.getElementById("TEX"+total_item[i].node);
        node.style["textDecoration"] = "line-through";
        node.style["opacity"] = 0.5;
    }
}