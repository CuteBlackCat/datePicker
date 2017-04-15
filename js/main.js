(function(){
	var datepicker = window.datepicker;

	var monthData;
	var $wapper;

	//渲染DOM
	datepicker.bulidUI = function(year,month){
		//保存数据
		monthData = datepicker.getMonthData(year,month);
		var html = '<div class="ui-datepicker-header">\
			<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt</a>\
			<span class="ui-datepicker-curr-month">' + monthData.year + ' - ' + monthData.month + '</span>\
			<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt</a>\
		</div>\
		<div class="ui-datepicker-body">\
			<table>\
				<thead>\
					<tr>\
						<th>一</th>\
						<th>二</th>\
						<th>三</th>\
						<th>四</th>\
						<th>五</th>\
						<th>六</th>\
						<th>日</th>\
					</tr>\
				</thead>\
				<tbody>';
		for(var i = 0;i < monthData.days.length;i++){
			var date = monthData.days[i];
			if(i % 7 === 0){
				html += '<tr>';
			}
			html += '<td data-date = "'  + date.date + '" data-showdate = "' + date.showDate + '">' + date.showDate + '</td>';
			if(i % 7 === 6){
				html += '</tr>';
			}
		}

		html += '</tbody>\
			</table>\
		</div>';
		return html;
	}
	//渲染函数
	datepicker.render = function(direction){
		var year,month;
		//第一次渲染没有数据传入
		if(monthData){
			year = monthData.year;
			month = monthData.month;
		}
		if(direction == 'prev') month--;
		if(direction == 'next') month++;
		var html = datepicker.bulidUI(year,month);
		if(!$wapper){//只创建一次wapper
			$wapper = document.createElement('div');
			$wapper.className = 'ui-datepicker-wapper';
		}

		$wapper.innerHTML = html;

		var $td = $wapper.getElementsByTagName('td');
		//将不是本月的日期透明;
		for(var i = 0;i < $td.length;i++){
			if($td[i].dataset.date != $td[i].dataset.showdate){
				$td[i].classList.add('td-show');
			}
		}

		document.body.appendChild($wapper);
	}
	//初始化函数
	datepicker.init = function(input){
		datepicker.render();

		var $input = document.querySelector(input);
		var isOpen = false;

		$input.addEventListener('click',function(){
			if(isOpen){
				//之前没有用过这个添加样式的API，用的是replace;
				$wapper.classList.remove('ui-datepicker-wapper-show');
				isOpen = false;
			}else{
				$wapper.classList.add('ui-datepicker-wapper-show');
				isOpen = true;

				var top = $input.offsetTop;
				var left = $input.offsetLeft;
				var height = $input.offsetHeight;
				$wapper.style.top = top + height + 4 + 'px';
				$wapper.style.left = left + 'px';
			}
		},false);

		//前后按钮切换功能，如果使用选取按钮来绑定事件，那么这次绑定只能绑定一次，因为DOM是每次切换都需要被渲染的，所以有两种方式来解决这个问题
		//1、每次渲染后绑定
		//2、在包裹元素上绑定事件。
		$wapper.addEventListener('click',function(e){
			var $target = e.target;//返回被点击的元素节点
			if(!$target.classList.contains('ui-datepicker-btn')){
				return;
			}
			if($target.classList.contains('ui-datepicker-prev-btn')){
				datepicker.render('prev');
			}else if($target.classList.contains('ui-datepicker-next-btn')){
				datepicker.render('next');
			}
		},false);

		//选取日期
		$wapper.addEventListener('click',function(e){
			var $target = e.target;
			if($target.tagName.toLowerCase() !== 'td') return;
			var date = new Date(monthData.year,monthData.month - 1,$target.dataset.date);
			$input.value = format(date);
			$wapper.classList.remove('ui-datepicker-wapper-show');
				isOpen = false;
		},false);
	};

	//格式化函数
	function format(date){
		ret = '';
		var padding = function(num){
			if(num <= 9){
				num = '0' + num;
			}
			return num;
		}
		ret += date.getFullYear() + '-';
		ret += padding(date.getMonth() + 1) + '-';
		ret += padding(date.getDate());
		return ret;
	}
})();