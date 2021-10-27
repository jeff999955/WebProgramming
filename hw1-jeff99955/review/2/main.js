var picNum = 4;
var picName = ["2.png", "3.png", "4.png", "5.png"];
var srcName = ["https://img.ltn.com.tw/Upload/business/page/800/2018/11/26/199.jpg", "https://mms.digitimes.com/NewsImg/2019/0115/551763-1-7CTDV.jpg",
			   "https://www.twcsi.org.tw/UserFiles/image/20181010004.jpg", "https://www.1111boss.com.tw/news/images/IMG_Winner12358_1.jpg"];
var picIndex = 0;

var prevElm = document.getElementById("previous");
var nextElm = document.getElementById("next");
var displayElm = document.getElementById("display");
var srcElm = document.getElementById("source");

displayElm.style.background = "url('images/loading.gif') no-repeat center";

prevElm.addEventListener(
	"click",
	function() {
		if(picIndex == 0) {
			return ;
		}
		else if(picIndex == picNum - 1) {
			nextElm.className = "able";
		}

		picIndex -= 1;
		displayElm.src = "images/" + picName[picIndex];
		srcElm.href = srcName[picIndex];
		srcElm.innerHTML = "Source: " + srcName[picIndex];
		if(picIndex == 0) {
			prevElm.className = "disabled";
		}
	}
);

nextElm.addEventListener(
	"click",
	function() {
		if(picIndex == picNum - 1) {
			return ;
		}
		else if(picIndex == 0) {
			prevElm.className = "able";
		}
		
		picIndex += 1;
		displayElm.src = "images/" + picName[picIndex];
		srcElm.href = srcName[picIndex];
		srcElm.innerHTML = "Source: " + srcName[picIndex];
		if(picIndex == picNum - 1) {
			nextElm.className = "disabled";
		}
	}
);
