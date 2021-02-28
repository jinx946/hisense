$(() => {
    console.log(/^(?![0-9]+$)(?![A-Za-z]+$)(.+$)/.test('aa*aa'));
    $('.username').html('');
    $('.username').val('');
    let userout = false;
    let passwordout = false;
    // 点击用户;
    $('.username').on('click', function(e) {
        e.stopPropagation();
        //初始值
        userout = false;
        $('.error-text').html('')
        $('.userbox .Error-text').css('display', 'none');
        $('.userbox .text').css({
            top: 0,
            'font-size': '14px'
        })
    });
    // 失去焦点
    $('.username').on('blur', function(e) {
        // 没值
        if (!$('.username').val()) {
            $('.userbox .text').css({
                top: 30,
                'font-size': '16px'
            });
            return;
        } else {
            //有值为纯数字
            if (!/^1[356789]\d{9}$/.test($('.username').val())) {
                $('.userbox .Error-text').css('display', 'block');
                return;
            } else {
                userout = true;
            }
        }
    });
    // 点击密码
    $('.password').on('click', function(e) {
        e.stopPropagation();
        passwordout = false;
        $('.error-text').html('')
        $('.passbox>.Error-text').css('display', 'none');
        console.log($('.passbox .text'));
        $('.passbox .text').css({
            top: 0,
            'font-size': '14px'
        })
        console.log('点击了密码');
    })
    $('.password').on('blur', function(e) {
            // 没值
            if (!$('.password').val()) {
                $('.passbox .text').css({
                    top: 30,
                    'font-size': '16px'
                });
                $('.passbox .Error-text1').css('display', 'block');
                return;
            } else {
                console.log($('.password').val().length);
                //有值
                if (/^(?![0-9]+$)(?![A-Za-z]+$)(.+$)/.test($('.password').val()) && $('.password').val().length >= 6 && $('.password').val().length <= 20) {
                    passwordout = true;
                    console.log('用户输入了密码');
                    return;
                }
                $('.passbox .Error-text2').css('display', 'block');

            }
        })
        // 点击注册
    $('.select-input').on('click', function(e) {
        e.stopPropagation();
        let delayTime = setTimeout(() => {
            if (userout == true && passwordout == true) {
                console.log(1);
                $.post({
                    url: '../api/php/sign.php',
                    data: { username: `${$('.username').val()}`, password: `${$('.password').val()}` },
                    success: function(res) {
                        console.log('接收数据成功');
                        res = JSON.parse(res);
                        console.log(res);
                        if (res.code == 0) {
                            console.log(1111);
                            $('.error-text').html('<i class="iconfont icon-round_close_light"></i> 手机号已注册')
                        } else {
                            alert('创建账号成功');
                            open('./login.html', '_self');
                        }
                    }
                })
            }
        }, 10)
    });
    // 点击跳转登录
    $('.qiye').on('click', function(e) {
        e.stopPropagation();
        open('./login.html', '_self')
    });
});