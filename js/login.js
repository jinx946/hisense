$(() => {

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
        $('.error-text').html('')
        passwordout = false;
        $('.passbox>.Error-text').css('display', 'none');
        $('.passbox .text').css({
            top: 0,
            'font-size': '14px'
        })
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
                //有值
                if (/^(?![0-9]+$)(?![A-Za-z]+$)(.+$)/.test($('.password').val()) && $('.password').val().length >= 6 && $('.password').val().length <= 20) {
                    passwordout = true;
                    return;
                }
                $('.passbox .Error-text2').css('display', 'block');
            }
        })
        // 点击注册
    $('.select2').on('click', function(e) {
        e.stopPropagation();
        open('./sign.html', '_self');
    });
    // 点击登录 
    $('.select-input').on('click', function(e) {
        e.stopPropagation();
        let delayTime = setTimeout(() => {
            if (userout == true && passwordout == true) {
                $.post({
                    url: '../api/php/login.php',
                    data: { username: `${$('.username').val()}`, password: `${$('.password').val()}` },
                    success: function(res) {
                        let reslogin = JSON.parse(res);
                        if (reslogin.message == false) {
                            $('.error-text').html('<i class="iconfont icon-round_close_light"></i> 用户名或者密码错误')
                        } else {
                            console.log(`${reslogin.message},欢迎你`);
                            // 如果cookeie已经存在，判断是否一样;
                            setCookie('login', `${reslogin.message}`);
                            open('./cart.html', '_self');
                        }
                    }
                });
            }

        }, 10);
    });
});