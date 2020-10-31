$(function() {
    getUserInfo();
    var layer = layui.layer;
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {

            //do something
            localStorage.removeItem('token');
            location.href = "/login.html";
            layer.close(index);
        });
    })




});

function getUserInfo() {

    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvator(res.data);
        },
        // complete: function(res) {
        //         console.log(res.responseText);
        //         if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //             localStorage.removeItem('token');
        //             location.href = "/login.html";
        //         }
        //     }
    });
};

function renderAvator(data) {
    var name = data.nickname || data.username;
    $('.welcom').html('欢迎&nbsp;&nbsp;' + name);

    if (data.user_pic !== null) {
        $('.text-avator').hide();
        $('.layui-nav-img').attr('src', data.user_pic)
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        console.log(first);
        $('.text-avator').html(first)
    }

}