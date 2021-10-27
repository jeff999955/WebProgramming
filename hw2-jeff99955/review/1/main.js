//新增element 判斷是否進行修改圖示
//移除element 判斷是否進行修改圖示
//單純變換模式 絕對要改變圖示...
var init = true;
var splitStr =  'b&*%#%^w*';
var ll = {
	task:[],//id,input,是否完成,展示狀態	
	displayMode:0,//0:all,1:active,2:completed
	num:0,//所有id
	minus:function(){
		this.num--;
	},
	add:function(){
		this.num++;
	}
}
String.prototype.hashCode = function(){
	var hash = 0;
	if(this.length == 0){
		return "&"+hash;
	}
	for(i = 0; i< this.length;i++){
		var char = this.charCodeAt(i);
		hash = ((hash << 5)-hash)+char;
		hash = hash & hash;
	}
	return '&'+hash;
}
function newOneListBox(idnum,input){
	if(init){
		const list = document.createElement('ul');		
		list.setAttribute('class','todo-app__list');
		list.setAttribute('id','todo-list');
		document.getElementById('root').insertBefore(list,document.getElementById('todo-footer'));
		init=false;
	}
	const list = document.getElementById('todo-list');
	const listitem = document.createElement('li');
	const checkbox = document.createElement('div');
	const checkbox_input = document.createElement('input');
	const checkbox_label = document.createElement('label');
	const detail = document.createElement('h1');
	const delImg = document.createElement('img');
	listitem.appendChild(checkbox);
	listitem.appendChild(detail);
	listitem.appendChild(delImg);	
	list.appendChild(listitem);
	listitem.setAttribute('class','todo-app__item');
	if(ll.displayMode!==2){
		ll.task[idnum][3]=true;
		listitem.style['display']='flex';
	}
	listitem.setAttribute('id',ll.task[idnum][4]);
	checkbox.appendChild(checkbox_input);
	checkbox.appendChild(checkbox_label);
	checkbox_input.setAttribute('type','checkbox');
	checkbox_input.setAttribute('id',ll.task[idnum][4].hashCode());
	checkbox_label.setAttribute('for',ll.task[idnum][4].hashCode());
	checkbox_label.setAttribute('onclick','checkboxFunc(\''+ll.task[idnum][4]+'\')');
	checkbox.setAttribute('class','todo-app__checkbox');	
	detail.setAttribute('class','todo-app__item-detail');
	detail.innerHTML = input;	
	delImg.setAttribute('src','./img/x.png');
	delImg.setAttribute('class','todo-app__item-x');
	delImg.setAttribute('onclick','xImgBox(\''+ll.task[idnum][4]+'\')');
}
function checkboxFunc(id){
	var index = ll.task.filter(ele => ele[4] === id )[0][0];
	var ele = document.getElementById(id);
	//console.log('index = '+index);
	if(!ll.task[index][2]){
		ele.style['textDecoration']='line-through';
		ele.style['opacity']=0.5;
	}else{
		ele.style['textDecoration']='none';
		ele.style['opacity']=1;	
	}
	ll.task[index][2]=!ll.task[index][2];
	calLeft();
}
function xImgBox(id){
	var index = ll.task.filter(ele => ele[4] === id )[0][0];
	var ele = document.getElementById(id);
	ele.parentNode.removeChild(ele);
	delOneItem(id,index);
}

function newOneItem(input){
	ll.task.push([ll.num,input,false,false,(ll.num+Date()+input).hashCode()+input]);
	ll.add();
	calLeft();
	//檢查是否需要展示
	newOneListBox(ll.num-1,input);
}
function switchMode(mode){
	if(ll.displayMode === mode){
		alert('已在此模式下!!!');
		return 0;
	}
	ll.displayMode = mode;
	var eles = []
	var e0 = document.getElementById('btn0');
	var e1 = document.getElementById('btn1');
	var e2 = document.getElementById('btn2');
	if(mode === 0){	
		e0.style['border']="1px solid salmon";
		e1.style['border']="1px solid transparent";
		e2.style['border']="1px solid transparent";
		eles = ll.task.filter(ele => ele[3]===false);
		if(eles.length === 0)return 0;
		for(i=0;i<eles.length;i++){
			var ele = document.getElementById(eles[i][4]);
			ele.style['display']='flex';
			ll.task[eles[i][0]][3]=true;
		}
	}
	else if(mode===1){
		e0.style['border']="1px solid transparent";
		e1.style['border']="1px solid salmon";
		e2.style['border']="1px solid transparent";
		eles = ll.task.map(ele => ele[2]===false);
		for(i=0;i<ll.task.length;i++){
			if(eles[i] && !ll.task[i][3]){
				var ele = document.getElementById(ll.task[i][4]);
				ele.style['display']='flex';
				ll.task[i][3]=true;
			}
			else if(!eles[i] && ll.task[i][3]){
				var ele = document.getElementById(ll.task[i][4]);
				ele.style['display']='none';
				ll.task[i][3]=false;
			}
		}		
	}
	else{
		e0.style['border']="1px solid transparent";
		e1.style['border']="1px solid transparent";
		e2.style['border']="1px solid salmon";
		eles = ll.task.map(ele => ele[2]===true);
		for(i=0;i<ll.task.length;i++){
			if(eles[i] && !ll.task[i][3]){
				var ele = document.getElementById(ll.task[i][4]);
				ele.style['display']='flex';
				ll.task[i][3]=true;
			}
			else if(!eles[i] && ll.task[i][3]){
				var ele = document.getElementById(ll.task[i][4]);
				ele.style['display']='none';
				ll.task[i][3]=false;
			}
		}		
	}
	//console.log(ll.task);
}
function delOneItem(id,index){	
	ll.task=ll.task.filter(ele => ele[4] !==id );
	for(i = 0;i<ll.task.length;i++)
		if(ll.task[i][0]>index)ll.task[i][0]--;
	ll.num = ll.task.length;
	calLeft();
}
function deleteAllCompleted(){
	var delQue = ll.task.filter(ele => ele[2] === true);
	if(delQue.length === 0)
		alert('沒有處理完的事項!!!');
	for(i = 0 ;i<delQue.length;i++){
		var ele = document.getElementById(delQue[i][4]);
		ele.parentNode.removeChild(ele);	
	}
	ll.task = ll.task.filter(ele => ele[2] === false);
	for(i = 0 ;i<ll.task.length;i++)
		ll.task[i][0] = i;
	ll.num = ll.task.length;
}

//計算剩餘
function calLeft(){
	var howmanyleft=document.getElementById('howManyLeft');
	howmanyleft.innerHTML = ll.task.filter(ele => ele[2]===false).length +" left";
	//console.log(ll.task);
}
//start
const input = document.getElementById('todo-input')
input.addEventListener('keyup',event => {
	if(event.keyCode === 13 && event.target.value !== ''){
		newOneItem(event.target.value);
		document.getElementById('todo-input').value = '';//歸零inputBar
	}
});

