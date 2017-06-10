$(function(){
	
	$("#submits").click(function(){
//		alert(1234)
		var username=$("#username").val();
	    var password=$("#password").val();
	
//		validationlogin();
	if(username==""){
		openAlert();
		document.getElementsByName("username")[0].focus();
        return false;
	}
	if(password==""){
		openAlert();
		document.getElementsByName("password")[0].focus();
        return false;
	}
	if (username.length > 0 && password.length > 0) {
            //setlogin();
            location.href="../html/task-home.html";
        }
	});
	
	function setlogin() {
        var body =
                {
                    userName: username,
                    passWord: password
                };
            //将json对象转换成json对符串并发送
            let url="http://192.168.30.17:8080/rest/file-distribution/v1/authentication/login";
            // console.log(url);
            this.service.postDataByFullUrl(url,JSON.stringify(body)).subscribe(data=>{
                //  console.log(data);
                 var access_token = data.access_token;
                 this.logTime = new Date(); 
                 console.log(this.logTime)
                //  new cookie().setCookie("token", access_token, 30, "/");
                document.cookie='token= '+access_token+'';
                document.cookie='username= '+this.username+'';
                document.cookie='logTime= '+this.logTime+'';
                
                console.log(this.username)
                
                // 从cookie字符串获取token字符串
                var strCookie=document.cookie;
                //将多cookie切割为多个名/值对
                var arrCookie=strCookie.split("; ");
                var token;
                //遍历cookie数组，处理每个cookie对
                for(var i=0;i<arrCookie.length;i++){
                            var arr=arrCookie[i].split("=");
                            //找到名称为userId的cookie，并返回它的值
                            if("token"==arr[0]){
                                    token=arr[1];
                                    break;
                            }
                }
                console.log(token);                
                // 将token放入localstorage
                // localStorage.setItem("token", access_token);
                // document.getElementById('demo3').innerHTML = "login响应：" + JSON.stringify(data);
                //向routing 路由配置中/index传参UserID，并跳转
                let link = ['/task'];
                this.router.navigate(link);
            })
    }
	
	function validationlogin() {
        if (this.username == '') {
            this.error = "请输入用户名.";
            this.openAlert();
            document.getElementsByName("username")[0].focus();
            return false;
        }
        if (this.password == '') {
            this.error = "请输入密码.";
            this.openAlert();
            document.getElementsByName("password")[0].focus();
            return false;
        }

        if (this.username.length > 0 && this.password.length > 0) {
            this.setlogin();
        }
    }
	function closeAlert() {
        var alertInfo = document.getElementsByClassName("alert alert-danger");
        //this.renderer.setElementStyle(alertInfo[0], "display", "none");
    }
    function openAlert() {
        var alertInfo = document.getElementsByClassName("alert alert-danger");
        
        $(".acc").removeClass("displsy-hide");
//      this.renderer.setElementStyle(alertInfo[0], "display", "");
    }
})
