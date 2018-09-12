// JavaScript Document


 


// 焦点图
function imgChange(){
	var n = $("#pic>a").length;
	var index = 0;
	var long = $("#pic").find("img").eq(1).attr("width");
	
	$("#picNum>ul>li").mouseover(
	 function(){
		 index = $(this).index();
		 showImg(index,long);
		 }
	)
	myTime = setInterval(
	  function(){
		 showImg(index,long);
		 index++;
		 if(index == n){index=0}
	  }
	,2000)
	$("#picBox").hover(function() {
        if (myTime) {
            clearInterval(myTime)
        }
    }, function() {
        myTime = setInterval(function() {
            showImg(index,long);
            index++;
            if (index == n) { index = 0; }

        }, 2000)

    })

}

function showImg(i,long){
	$("#pic").stop(true,false).animate({ marginLeft: -long * i },1000);

	$("#picNum>ul>li").eq(i).addClass("sel").siblings().removeClass("sel");
}

 








	









