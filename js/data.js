(function(){
	//定义datepicker对象
	var datepicker = {};
	//为datepicker对象添加方法；
	datepicker.getMonthData = function(year,month){
		//定义存放返回数据的数组
		var ret = [];
		//当传入参数不存在时
		if(!year || !month){
			var now = new Date();
			year = now.getFullYear();
			month = now.getMonth() + 1;
		}
		var firstDay = new Date(year,month - 1,1);//本月第一天
		var firstDayWeekDay = firstDay.getDay();//第一天的礼拜几
		if(firstDayWeekDay === 0) firstDayWeekDay = 7;
		var preMonthDatCount = firstDayWeekDay - 1;//上月需要显示的天数
		var lastDayOfPrevMonth = new Date(year,month - 1,0);//上月的最后一天
		var lastDateOfPrevMonth = lastDayOfPrevMonth.getDate();//上月的最后一天日期；
		var lastDay = new Date(year,month,0);//本月的最后一天
		var lastDate = lastDay.getDate();//本月的最后一天日期
		//防止月份越界；
		year = firstDay.getFullYear();
		month = firstDay.getMonth() + 1;

		for(var i = 0;i < 6 * 7;i++){
			var date = i +1 - preMonthDatCount;//当前i的显示日期;
			var showDate = date;
			var thisMonth = month;
			//上一月
			if(date <= 0){
				thisMonth = month - 1;
				showDate = lastDateOfPrevMonth + date;
			}else if(date > lastDate){
				//下一月
				thisMonth = month + 1;
				showDate = showDate - lastDate;
			}

			if(thisMonth === 0) thisMonth = 12;
			if(thisMonth === 13) thisMonth = 1;

			ret.push({
				month:thisMonth,
				date:date,
				showDate:showDate
			});
		}
		return {
			year:year,
			month:month,
			days:ret
		};
	}
	//只暴露datepicker对象
	window.datepicker = datepicker;
})();