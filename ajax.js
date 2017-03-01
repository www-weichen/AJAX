var $ = {
	// 格式化数据
	params: function (obj) {

		var s = '';
		for(var key in obj) {
			s += key + '=' + obj[key] + '&';
		}

		// 第一个参数代表截取的起始 第二个参数代表终止位置
		s = s.slice(0, -1);
		return s;

	},
	ajax: function (obj) {

		// 设置请求方式
		var type = obj.type || 'get';

		// 设置请求地址
		var url = obj.url || location.pathname;

		// 格式化数据
		var data = this.params(obj.data);

		// 设置回调方法
		var success = obj.success;

		// 实例化
		var xhr = new XMLHttpRequest;

		if(type == 'get') {
			// 将参数拼凑到url上面
			url = url + '?' + data;
			data = null;
		}

		// 请求行
		xhr.open(type, url);

		// post需要设置一个请求头(mime类型)
		if(type == 'post') {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		}

		// 发送
		xhr.send(data);


		// 处理响应
		xhr.onreadystatechange = function () {
			if(xhr.readyState == 4 && xhr.status == 200) {
				// console.log(xhr.responseText);

				// 将JSON转化成一个JS的对象
				var result = JSON.parse(xhr.responseText);

				// 将接收到数据传递给回调方法
				success(result);
			}
		}