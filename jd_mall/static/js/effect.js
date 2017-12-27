//倒计时效果
function countDown(timeA,hour,minute,second){
	var dTime = new Date().getTime();
	var sTime = new Date(timeA).getTime();
	var t = sTime - dTime;
	if(t<0){
		alert('必须输入大于现在的日期');
		document.getElementById('endtime').value = '';
		return;
	}
	run();
	setInterval(run,1000);
	function run(){
		var dTime = new Date().getTime();
		var sTime = new Date(timeA).getTime();
		var t = sTime - dTime;
		var h = Math.floor(t/1000/60/60%24);//小时
		var m = Math.floor(t/1000/60%60);//分钟
		var s = Math.floor(t/1000%60);//秒
		hour.html(setTwo(h));
		minute.html(setTwo(m));
		second.html(setTwo(s));
	}
	function setTwo(num){
		if(num < 10) {
			return '0'+num;
		}else {
			return num;
		}
	}
}

//淡入淡出轮播
function ddbanner(){
	var ban = document.getElementsByClassName('sk-special')[0];
	var lis = ban.getElementsByTagName('li');
	var arrow = ban.getElementsByTagName('span');
	var btnLe = document.getElementById('btn-le');
	var btnRi = document.getElementById('btn-ri');
	var c = 0;
	var timer;

	function animate(){
		// console.log(c);
		for(var i = 0;i < lis.length;i++){
			if(i == c){
				lis[c].className = 'curr';
				arrow[c].className = 'curr';
			}else {
				lis[i].className = '';
				arrow[i].className = '';
			}
		}
	}

	btnLe.onclick = function(){
		if(c == 0){
			c = 1;
		}else {
			c--;
		}
		animate();
	}
	btnRi.onclick = function(){
		if(c == 1){
			c = 0;
		}else {
			c++;
		}
		animate();
	}

	//自动播放
	function play(){
		timer = setTimeout(function(){
			btnRi.onclick();
			play();
		},3000);
	}
	function stop(){
		clearTimeout(timer);
	}

	//页面一打开就执行
	play();
	//划上banner时停止，划离banner时开始
	ban.onmouseover = stop;
	ban.onmouseout = play;

	//下边按钮点击时
	for(var i = 0;i < lis.length;i++){
		arrow[i].index = i;
		arrow[i].onclick = function(){
			for(var j = 0;j < lis.length;j++){
				if(j == this.index){
					c = j;
					lis[j].className = 'curr';
					arrow[j].className = 'curr';
				}else {
					lis[j].className = '';
					arrow[j].className = '';
				}
			}
		}
	}
}

//滑动轮播图
$(function(){
	//把第一个图片复制添加到最后，实现无缝
	var i = 0;
	var timer;
	var state = false;

	// console.log($('.list-wrap li').outerWidth(true));

	for(var j = 0;j < 5;j++){
		var firstC = $('.list-wrap li').eq(j).clone(true);
		$('.list-wrap ul').append(firstC).width($('.list-wrap li').length*$('.list-wrap li').outerWidth(true));
	}
	
	//右侧按钮点击
	$('.seckill .btnRi').click(function(){
		if(state){//console.log(state);
			return;
		}
		i++;
		anim();
		showBtn();
	});
	//左侧按钮点击
	$('.seckill .btnLe').click(function(){
		if(state){
			return;
		}
		i--;
		anim();
		showBtn();
	});

	//动画函数
	function anim(){
		state = true;
		if(i == parseInt($('.list-wrap li').length/5)){
			$('.list-wrap ul').css({left:0});
			i = 1;
		}
		if(i == -1){
			$('.list-wrap ul').css({left:-parseInt($('.list-wrap li').length/5)*$('.list-wrap').width()});
			i = parseInt($('.list-wrap li').length/5)-1;
		}
		$('.list-wrap ul').stop(true,true).animate({left:$('.list-wrap').width()*-i},function(){
			state = false;
		});
	}

	//自动播放
	function play(){
		timer = setInterval(function(){
			i++;
			anim();
		},3500);
	}
	//页面打开就执行
	play();
	function stop(){
		clearInterval(timer);
	}

	//划上划离时
	$('.play').hover(function(){
		stop();
	},function(){
		play();
	});
});



$(function(){
	var isLoading = false; //判断是否在向服务器发送请求中
	var initialV = 0; //从服务器文件第几个开始循环
	var displayV = 10;	//每次循环的个数
	$(window).scroll(function(){
		// console.log(2);
		var dHeight = $(document).height();
		var sHeight = $(this).scrollTop();
		var cHeight = $(window).height();
		if(dHeight - sHeight - cHeight <= 400){
			// console.log(2);
			if(isLoading) return;
			$('.loading').show();
			isLoading = true;
			$.get('json/data.json',{},function(data){
				$('.loading').fadeOut();
				for (var i = initialV; i < displayV; i++) {
					var lis = $('#bak li').clone();
					// console.log(data)
					lis.find('img').attr('src',data[i].pic);
					lis.find('.p-name').html(data[i].title);
					lis.find('.p-price').html('<i>￥</i>'+data[i].price);
					$('.notCool-inner ul').append(lis);
				}
				initialV = displayV;
				displayV += 10;
				if(displayV <= data.length){
					isLoading = false;
				}
			});
		}
	});
});

// $(function(){
// 	$(window).scroll(function(){
// 		var dHeight = $(document).height();
// 		var sHeight = $(this).scrollTop();
// 		var cHeight = $(window).height();
// 		if(dHeight - sHeight - cHeight <= 200){
// 			$.get('json/data.json',{},function(data){
// 				for(var i = 0;i < data.length;i++){
// 					console.log(data[i]);
// 				}
// 			})
// 		}
// 	});
// });


