// 商品js
$(() => {
    // 判断传过来的参数
    let reg = /\id=\d+/;
    let getUrl = '';
    let obj = {};
    if (!reg.test(window.location.search)) {
        // alert('参数错误，为你跳转商城首页');
        open('../index.html', '_self');
        return;
    } else if (window.location.search.split('?')[1].split('&')) {
        getUrl = window.location.search.split('?')[1].split('&');
    }
    getUrl.forEach(function(item) {
        obj[item.split('=')[0]] = item.split('=')[1];
    });
    // 商品种类和商品id
    let items = obj.item;
    let goodsId = obj.id * 1;
    $.get({
            url: '../api/json/all.json',
            success: function(res) {

                let getItem = res[items][0][items].filter(function(item) {
                    return item.id == goodsId;
                });
                renderDetals(getItem[0]);
                // 渲染结束
                // 左边小图标换色
                $('.little-boxs img').on('click', function(e) {
                    for (let i = 0; i < $('.little-boxs').length; i++) {
                        $($('.little-boxs')[i]).removeClass('little-boxs-active')
                    }
                    $(e.target).parent().addClass('little-boxs-active')
                });
                // 分享
                $('.share>.share-lian').on('click', function(e) {
                    e.stopPropagation();
                    if ($('.share-box').css('display') == 'none') {
                        $('.share-box').css('display', 'flex');
                    } else {
                        $('.share-box').css('display', 'none');
                    }
                });
                // 承诺框
                $('.promise .promise-r').on('click', function(e) {
                    e.stopPropagation();
                    $('.promise-cont').toggle();
                });
                $('.promise-cont').on('click', function(e) {
                    e.stopPropagation();
                })
                $(document).on('click', function(e) {
                    $('.promise-cont').hide();
                });
                // 点击添加或者减少按钮
                $('.but-count button').on('click', function(e) {
                    let goodsnum = $('.but-count input').val() * 1;
                    if ($(e.target).hasClass('reduce')) {
                        if (goodsnum > 1) {
                            $('.but-count input').html($('.but-count input').val(goodsnum - 1))
                        } else {
                            return;
                        }
                    }
                    if ($(e.target).hasClass('add')) {
                        if (goodsnum < 5) {
                            $('.but-count input').html($('.but-count input').val(goodsnum + 1))
                        } else {
                            return;
                        }
                    }
                });
                // 添加购物车按钮
                $('.car-add').on('click', function(e) {
                    let goodsnum = $('.but-count input').val();
                    // 先判断是否是number
                    if (/^[1-5]{1}$/.test(goodsnum)) {
                        // 先判断cookie 
                        if (!getCookie('login')) {
                            if (confirm('未登陆，是否去登陆')) {
                                open('./login.html', '_self');
                                return;
                            } else {
                                return;
                            }
                        } else {
                            if ($(e.target).hasClass("but-buy")) {
                                $.post({
                                    url: '../api/php/addCar.php',
                                    data: { username: getCookie('login'), goods_id: goodsId, goods_num: goodsnum, goods_type: items },
                                    success: function(res) {
                                        open('./cart.html', '_self');
                                    }
                                })
                            }
                            if ($(e.target).hasClass('but-add')) {
                                $.post({
                                    url: '../api/php/addCar.php',
                                    data: { username: getCookie('login'), goods_id: goodsId, goods_num: goodsnum, goods_type: items },
                                    success: function(res) {
                                        $.post({
                                            url: '../api/php/getCar.php',
                                            data: { username: getCookie('login') },
                                            success: function(res) {
                                                let resNum = JSON.parse(res);
                                                let carNum = 0;
                                                resNum.forEach(item => {
                                                    carNum += (item.goods_num) * 1;
                                                });
                                                $('#car strong').html(carNum);
                                                $('.shop-car .car-count').html(carNum);
                                                alert('添加购物车成功');
                                            }
                                        });

                                    }
                                })
                            }
                        }
                    } else {
                        $('.but-count input').html($('.but-count input').val(1))
                    }

                });
            }
        })
        // 渲染数据
    function renderDetals(resItems) {
        let strDetail = '';
        // 上边图片
        strDetail = `<div class="detail-cont">
        <!-- 左边放大镜 -->
        <div class="detail-le">
            <!--引入swiper插件  -->
            <!-- Swiper -->
            <div class="swiper-container gallery-top banner-top  ">
                <div class="swiper-wrapper">
<div class="swiper-slide"><img src="${resItems.mainImage}" alt="">
</div>
<div class="swiper-slide"><img src="https://img.shop.hisense.com/2020/01/03/2a840d88-dce9-4852-9f2a-43fd602f519e.png" alt=""></div>
<div class="swiper-slide"><img src="https://img.shop.hisense.com/2020/01/03/cb70421c-448c-43d7-a83e-66388995ce96.png" alt=""></div>
<div class="swiper-slide"><img src="https://img.shop.hisense.com/2020/01/03/9e2b015d-4ea1-4c3f-90bd-386860d8b2e8.png" alt=""></div>
<div class="swiper-slide"><img src="https://img.shop.hisense.com/2020/01/03/1fe02d8e-22d7-4965-b125-cd88c7275cc1.png" alt=""></div>
<div class="swiper-slide"><img src="https://img.shop.hisense.com/2020/01/03/ce61c0b9-c163-4566-8376-ad78a65a6bdc.png" alt=""></div>
<div class="swiper-slide"><img src="https://img.shop.hisense.com/2020/01/03/715024a4-a09f-48a4-ab7c-6662fc5ecebd.png" alt=""></div>
<div class="swiper-slide"><img src="https://img.shop.hisense.com/2020/01/03/1c816c61-82d4-4dee-9085-e9b6a211f477.png" alt=""></div>
<div class="swiper-slide little-box"><img src="https://img.shop.hisense.com/2020/12/23/0c6bcfe8-9611-4708-92f0-7a4ada93544f.jpg" alt="" srcset=""></div>
</div>
                <!-- Add Arrows -->
            </div>
            <div class="banner-out">
                <div class="swiper-button-next swiper-button-white"></div>
                <div class="swiper-container gallery-thumbs banner-thumbs">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide little-box ">
<div class="little-boxs  little-boxs-active">
 <img src="${resItems.mainImage}" alt="" srcset="">
</div>
</div><div class="swiper-slide little-box "><div class="little-boxs"><img src="https://img.shop.hisense.com/2020/01/03/2a840d88-dce9-4852-9f2a-43fd602f519e.png" alt="" srcset=""></div></div><div class="swiper-slide little-box "><div class="little-boxs  "> <img src="https://img.shop.hisense.com/2020/01/03/cb70421c-448c-43d7-a83e-66388995ce96.png" alt="" srcset=""></div></div>  <div class="swiper-slide little-box "> <div class="little-boxs  "> <img src="https://img.shop.hisense.com/2020/01/03/9e2b015d-4ea1-4c3f-90bd-386860d8b2e8.png" alt="" srcset=""></div> </div> <div class="swiper-slide little-box "><div class="little-boxs  "><img src="https://img.shop.hisense.com/2020/01/03/1fe02d8e-22d7-4965-b125-cd88c7275cc1.png" alt="" srcset=""></div></div><div class="swiper-slide little-box "><div class="little-boxs  "><img src="https://img.shop.hisense.com/2020/01/03/ce61c0b9-c163-4566-8376-ad78a65a6bdc.png" alt="" srcset=""></div></div><div class="swiper-slide little-box "><div class="little-boxs  "><img src="https://img.shop.hisense.com/2020/01/03/715024a4-a09f-48a4-ab7c-6662fc5ecebd.png" alt="" srcset=""> </div></div><div class="swiper-slide little-box "><div class="little-boxs "><img src="https://img.shop.hisense.com/2020/01/03/1c816c61-82d4-4dee-9085-e9b6a211f477.png" alt="" srcset=""></div></div>
                        <div class="swiper-slide little-box "><div class="little-boxs "><img src="https://img.shop.hisense.com/2020/12/23/0c6bcfe8-9611-4708-92f0-7a4ada93544f.jpg" alt="" srcset=""></div></div>

                    </div>
                </div>

                <div class="swiper-button-prev swiper-button-white"></div>
            </div>

            <!-- Initialize Swiper -->
            <script>
                var galleryThumbs = new Swiper('.gallery-thumbs', {
                    spaceBetween: 10,
                    slidesPerView: 5,
                    loop: true,
                    freeMode: true,
                    loopedSlides: 5, //looped slides should be the same
                    // 禁止手动切换
                    touchRatio: 0,
                    stopTouchMove: true,
                    watchSlidesVisibility: true,
                    watchSlidesProgress: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                });
                var galleryTop = new Swiper('.gallery-top', {
                    touchRatio: 0,
                    spaceBetween: 10,
                    loop: true,
                    loopedSlides: 5, //looped slides should be the same

                    thumbs: {
                        swiper: galleryThumbs,
                    },
                });
            </script>
        </div>
        <!-- 右边内容 -->
        <div class="detail-ri">
            <div class="details-all">
                <!-- 分享链接 -->
                <div class="share-tilte">
                    <div class="share">
                        <i class="iconfont icon-share share-lian"></i>
                        <!-- 分享盒子 -->
                        <div class="share-box">
                            <a href="#" class="share-way1"><i class="iconfont icon-logo-wechat-fill"></i><span>微信好友</span></a>
                            <a href="#" class="share-way1"><i class="iconfont icon-logo-sina"></i><span>新浪微博</span></a>
                            <a href="#" class="share-way1"><i class="iconfont icon-logo-qq-fill
                                "></i><span>QQ好友</span></a>
                            <a href="#" class="share-way1"><i class="iconfont icon-logo-alipay-fill"></i><span>支付宝</span></a>
                        </div>

                    </div>
                </div>
                <!-- 渲染主体 -->
                <div class="detail-render">
                    <h1 class="detail-render-title" title="${resItems.name}">${resItems.name}</h1>
                    <div class="detail-render-box">
                    ${resItems.advertise}
                    </div>
                </div>
                <!-- 减价框 -->
                <div class="price-box">
                    <div class="price-all">
                        <span class="price-new"> ${resItems.price.toString().slice(0, -2)}</span>
                        <div class="price-ri">
                            <span class="price-old">￥${resItems.price.toString().slice(0, -2)*1+200}</span>
                            <span class="sell-count">已售${resItems.saleQuantity}台</span>
                        </div>
                    </div>
                    <a href="#" class="price-redu"> <i class="iconfont">&#xe69c;</i>降价通知</a>
                </div>
                <!-- 承诺 -->
                <div class="promise">
                    <span class="promise-title">承诺</span>
                    <div class="promise-r">
                        <div class="promise-r-title">
                            <div class="promise-single"><img src="../images/day30.png" alt=""><span>30天保价</span></div>
                            <div class="promise-single"><img src="../images/day7.png" alt=""><span>七天无理由</span></div>
                            <div class="promise-single"><img src="../images/baoyou.png" alt=""><span>全场包邮</span></div>
                            <div class="promise-single"><img src="../images/lianbao.png" alt=""><span>全国联保</span></div>
                        </div>
                        <div class="promise-lit"><i class="iconfont">&#xe679;</i></div>
                        <!-- 详细承诺 -->
                        <div class="promise-cont">
                            <div class="promise-cont-title ">30天保价</div>
                            <div class="promise-content">
                                由于网络购物的商品价格会随市场价格的波动而波动，每天都会有涨价、降价和促销优惠等变化。鉴于以上特点，商城向买家提供价格保护政策，即：买家成功提交订单后30日内（提交订单当天为第一天），如订单内商品降价，买家可通过商城在线客服申请价格保护。具体规则详见帮助中心“价格保护30天”。
                            </div>
                            <div class="promise-cont-title ">七天无理由退货</div>
                            <div class="promise-content">
                                为保障您的消费权益，海信商城将严格按国家工商行政管理总局颁布的《网络购买商品七日无理由退货暂行办法》依法履行七日无理由退货义务。具体规则详见帮助中心“7天无理由退货保障”。
                            </div>
                            <div class="promise-cont-title">全场包邮</div>
                            <div class="promise-content">
                                海信商城所售商品全国免费包邮。部分偏远地区除外，如新疆、西藏等偏远、物流不发达地区除外。详情可在帮助中心“物流配送”中查询。 </div>
                            <div class="promise-cont-title">全国联保</div>
                            <div class="promise-content">
                                海信商城的所有商品都支持全国联保服务。如您想查询海信的售后网点、产品三包政策与相关收费标准，可通过“海信在线”微信公众号进行查询或拨打海信售后热线4006-111-111进行咨询。 </div>
                            <div class="promise-cont-title">电子发票</div>
                            <div class="promise-content">
                                电子发票是由电子发票服务平台生成的数字证明信息，是经过税务系统认证的，与传统纸质发票具有同等法律效应，可做为用户报销，维权，保修的有效凭证；同时还具有易保存、易查找的优点。电子发票相关说明详见帮助中心“支付/发票”中查询。
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 收货地址 -->
                <div class="details-area-all">
                    <!-- 地址 -->
                    <div class="details-area">
                        <div class="cart-song">
                            <div class="cart-cont-title">
                                <div class="title-le iconfont">&#xe651;
                                </div>
                                <div class="carry">
                                    <!-- 头地址 -->
                                    <div class="carry-detail">
                                        <span class="carry1">广州市</span><span class="carry2">天河区</span><span class="carry3">元岗路</span>
                                        <a href="#" class="carry-change">修改</a>
                                    </div>
                                    <!-- 详细 -->
                                    <div class="carry-arr">
                                        <ul class="carry-arr-title">
                                            <li class="fenji1"><a href="#">湖北加快两地分居拉克的 </a><i class="iconfont icon-icon-test6"></i></li>
                                            <li class="fenji2 carry-active"><a href="#"> 请选择</a> <i class="iconfont icon-icon-test6"></i></li>
                                            <li class="fenji3"><a href="#">空白 </a><i class="iconfont icon-icon-test6"></i></li>
                                        </ul>
                                        <ul class="little">
                                            <li class="little-so"><a href="#">北京 </a></li>
                                            <li class="little-so"><a href="#">天津 </a></li>
                                            <li class="little-so"><a href="#">广东 </a></li>
                                            <li class="little-so"><a href="#">上海 </a></li>
                                            <li class="little-so"><a href="#">湖北加快两地分居拉克的 </a></li>
                                            <li class="little-so"><a href="#">和别 </a></li>
                                            <li class="little-so"><a href="#">湖南 </a></li>
                                            <li class="little-so"><a href="#">北京 </a></li>
                                            <li class="little-so"><a href="#">天津 </a></li>
                                            <li class="little-so"><a href="#">广东 </a></li>
                                            <li class="little-so"><a href="#">上海 </a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 现货 -->
                    <span class="goods-now">现货</span>
                </div>
                <!-- 添加购物车 -->
                <div class="buy">
                    <h3 class="addcar-ti">选择数量</h3>
                    <div class="but-count">
                        <button class="reduce">-</button><input type="text" class="little-count" value="1"><button class="add">+</button>
                    </div>
                    <!-- 购买按钮 -->
                    <div class='car-add'>
                        <button class="but-buy">立即购买</button>
                        <button class="but-add">添加购物车</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
        $('.detail-cont-out').html(strDetail);
        $('.good-imges-box').html(`<img src="${resItems.mainImage}" alt="">`);
    }
})