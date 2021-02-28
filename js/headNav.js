$(() => {
    // 渲染头部和尾部
    rendernav();
    if (getCookie('login')) {
        $('#person').html(`<i class="iconfont icon-my"></i>` + getCookie('login'));
        $('#sign').html('退出');
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
            }
        });
        $('.shop-car').on('click', function(e) {
            e.stopPropagation();
            window.open('./cart.html', '_self');
        });
        $('#car').on('click', function(e) {
            e.stopPropagation();
            window.open('./cart.html', '_self');
        });
        $('#person').on('click', function(e) {
            e.stopPropagation();
            open('./cart.html', '_self');
        });
        $('#sign').on('click', function(e) {
            e.stopPropagation();
            delCookie('login');
            open('../index.html', '_self');
        });
    } else {
        $('#person').on('click', function(e) {
            e.stopPropagation();
            open('./login.html', '_self');
        });
        $('#sign').on('click', function(e) {
            e.stopPropagation();
            open('./sign.html', '_self');
        });
        $('.shop-car').on('click', function(e) {
            e.stopPropagation();
            open('./login.html', '_self');
            alert('未登陆');
        });
        $('#car').on('click', function(e) {
            open('./login.html', '_self');
            e.stopPropagation();
            alert('未登陆');
        });
    }
    // 渲染头部
    function rendernav() {
        $('.topNav').html(` <div class="Nav">
        <ul class="navl">
            <li class="nav-li"><a href="../index.html">海信官网</a> </li>
            <li class="nav-li"> <i class="iconfont icon-notificationfill"></i> </li>
        </ul>
        <ul class="navr">
            <li id="person" class="login nav-li nav-lia">登录</li>
            <li id='sign' class="sign nav-li nav-lia">注册</li>
            <li class="nav-li"><a href="#">消息中心</a> </li>
            <li class="nav-li"><a href="#">帮助中心</a> </li>
            <li class="nav-li"><a href="#">门店查询</a> </li>
            <li class="nav-li"><a href="#">外部合作</a> </li>
            <li class="nav-li nav-app">
                <a href="#" target="_block" class=>下载APP
                <div class="app"><div class="app-img"><img src="https://img.shop.hisense.com/2018/11/09/40759e0a-87c2-43c4-87dd-17df128c452b.png" alt=""></div>
                <p>海信商城APP</p>  
                </div>
            </a> </li>
            <li class="nav-li nav-daohang">
                <a href="#">网址导航  </a>
                <ul class="daohang">
                    <li>
                        <i>服务指南</i>
                        <p>
                            <a href="#">帮助中心</a>
                            <a href="#">在线客服</a>
                            <a href="#">会员中心</a>
                            <a href="#">电子发票</a>

                        </p>
                    </li>
                    <li>
                        <i>海信简介</i>
                        <p>
                            <a href="#">企业简介</a>
                            <a href="#">海信历史</a>
                            <a href="#">企业荣誉</a>
                            <a href="#">校园招聘</a>
                            <a href="#">社会招聘</a>
                        </p>
                    </li>
                    <li>
                        <i>商城特色</i>
                        <p>
                            <a href="./list.html?search=telve" >ULED新品上市</a>
                            <a href="./list.html?search=air" target="_block">科龙专区</a>
                            <a href="./list.html?search=ice" target="_block">容声专区</a>
                        </p>
                    </li>
                </ul>
            </li>
            <li class="nav-li"><a href="javascript:void(0);;" target="_block"><span id="car"><i class="iconfont icon-cart"></i> 购物车(<strong>0</strong>)</span> </a></li>
        </ul>
    </div>`);
        $('.mainnav').html(`
        <div class="mainnav-mid">
                <div class="logol">
                    <a href="../index.html" ></a>
                </div>
                <!-- 中间标题 -->
                <ul class="nav-title">
                    <li class="nav-title-child" index="home"><a href="#" >官网</a> </li>
                    <li class="nav-title-child nian" index="home"><a href="#"  class="">和年货一起到家</a><span>HOT</span> </li>
                    <li class="nav-title-child nav-hover" index="telev"><a href="#"  title="电视">电视</a> </li>
                    <li class="nav-title-child nav-hover" index="laser"><a href="#"  title="激光">激光</a> </li>
                    <li class="nav-title-child nav-hover" index="air"><a href="#" >空调</a> </li>
                    <li class="nav-title-child nav-hover" index="ice"><a href="#" >冰箱</a> </li>
                    <li class="nav-title-child nav-hover" index="wash"><a href="#" >洗衣机</a></li>
                    <li class="nav-title-child nav-hover" index="cool"><a href="#" >冷柜</a> </li>
                    <li class="nav-title-child nav-hover" index="kitchen"><a href="#" >厨卫</a> </li>
                    <li class="nav-title-child nav-hover" index="airclean"><a href="#" >空净</a> </li>
                    <li class="nav-title-child nav-hover" index="phone"><a href="#" >手机</a> </li>
                    <li class="nav-title-child nav-hover" index="homer"><a href="#" >聚享家</a> </li>
                    <li class="nav-title-child nav-hover" index="enterprise"><a href="#" >政企乐购</a></li>
                    <!-- 鼠标移入后显示 -->
                    <div class="mouse-box">
                        <div class="mouse-box-mid">
                            <!-- 鼠标移入后的左边盒子 -->
                            <ul class="mainnav-le">
                            </ul>
                            <!-- 鼠标移入后的右边盒子 -->
                            <ul class="mainnav-ri">
                            </ul>
                        </div>

                    </div>
                </ul>
                <!-- 搜索栏 -->
                <div class="search">
                    <button class="open iconfont icon-search"></button>
                    <input type="text" class="input" id="look" placeholder="和年货一起到家 1月31日-2月8日 瓜分10000元新年礼"><button class="close iconfont  icon-close"></button>
                </div>
                <!-- 右边搜索栏按钮 -->
                <div class="search-big"><i class="iconfont icon-search"></i></div>
            </div>
        `);
        $('.side').html(` <li title="在线客服"><i class="iconfont icon-service"></i><span>在线客服</span>
        </li>
        <li title="购物车" class="shop-car"><i class="iconfont icon-cart"></i><span>购物车</span>
            <div class="car-count">0</div>
        </li>
        <li class="move-app"><i class="iconfont icon-goods"></i><span>移动商城</span>
            <div class="move">
                <div class="move-img">
                    <p>扫一扫</p>
                    <p>使用手机购买</p><img src="https://img.shop.hisense.com/2018/11/09/40759e0a-87c2-43c4-87dd-17df128c452b.png" alt="">
                </div>

            </div>
        </li>
        <li><i class="iconfont icon-footprint"></i><span>足迹</span>
        </li>
        <li class="goTop"><i class="iconfont icon-down_light"></i><span>回到顶部</span>
        </li>`);
        $('#whole>.footer').html(`
       <div class="footer-un">
           <div class="footer-un-limi">
               <div class="footer-un-box">
                   <img src="https://img.shop.hisense.com/2020/03/11/aa77b712-aa12-4822-ad14-97a8aa20a381.png" alt="">
               </div>
               <div class="footer-un-box">
                   <img src="https://img.shop.hisense.com/2020/03/11/cbdd09c3-0f13-49ed-a6a3-75e0008e997d.png" alt="">
               </div>
               <div class="footer-un-box">
                   <img src="https://img.shop.hisense.com/2020/03/11/2d850478-5a51-4724-a54f-d64ddff0a1cc.png" alt="">
               </div>
               <div class="footer-un-box">
                   <img src="https://img.shop.hisense.com/2020/03/11/21f0013e-2220-45fb-9dc7-b9eae8936ffd.png" alt="">
               </div>
           </div>

       </div>
       
       <div class="footer-under">
           <div class="footer-under-limi">
               <ul class="footer-under-le">
                   <li>
                       <h3>企业简介</h3>
                       <a href="#">
                           <p>企业简介</p>
                       </a>
                       <a href="#">
                           <p>企业历史</p>
                       </a>
                       <a href="#">
                           <p>企业荣誉</p>
                       </a>
                       <a href="#">
                           <p>全球布局</p>
                       </a>
                   </li>
                   <li>
                       <h3>人才招聘</h3>
                       <a href="#">
                           <p>校园招聘</p>
                       </a>
                       <a href="#">
                           <p>社会招聘</p>
                       </a>
                       <a href="#">
                           <p>培训发展</p>
                       </a>

                   </li>
                   <li>
                       <h3>商城服务</h3>
                       <a href="#">
                           <p>售后政策</p>
                       </a>
                       <a href="#">
                           <p>价格保护</p>
                       </a>
                       <a href="#">
                           <p>退款说明</p>
                       </a>
                       <a href="#">
                           <p>退换货说明</p>
                       </a>
                   </li>
                   <li>
                       <h3>购物指南</h3>
                       <a href="#">
                           <p>购物流程</p>
                       </a>
                       <a href="#">
                           <p>常见问题</p>
                       </a>
                       <a href="#">
                           <p>在线支付</p>
                       </a>
                       <a href="#">
                           <p>找人代付</p>
                       </a>
                   </li>
                   <li>
                       <h3>物流配送</h3>
                       <a href="#">
                           <p>送货范围</p>
                       </a>
                       <a href="#">
                           <p>送装一体</p>
                       </a>

                   </li>
                   <li>
                       <h3>有情链接</h3>
                       <a href="#">
                           <p>腾讯视频</p>
                       </a>
                       <a href="#">
                           <p>TV官网</p>
                       </a>

                   </li>
               </ul>
               <div class="footer-under-ri">
                   <h2> 4006-111-111</h2>
                   <p>周一至周日 24小时 </p>
                   <img src="https://img.shop.hisense.com/2018/11/02/c9a48d65-8e01-4687-803b-53e95aa910fd.png" alt="">
                   <p> 扫一扫，免费送延保+会员积分</p>
               </div>
           </div>
       </div>`);
        $('.tail').html(` <div class="tail-limi">
       <img src="https://img.shop.hisense.com/2018/11/09/6351cf70-7934-4429-b304-69c30368aeba.jpg" alt="">
       <img src="https://img.shop.hisense.com/2018/11/09/0678d559-49e9-4666-a5cf-56f6951c115c.jpg" alt="">
       <div class="permit">
           <a href="#">
               <p>网站备案/许可证号</p>
           </a>
           <a href="#">
               <p>鲁ICP备05027830 </p>
           </a>
       </div>
       <div class="copyright">
           <p>青岛海信营销管理有限公司版权所有</p>
           <p>隐私政策&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为获得最佳操作体验，建议您使用不低于IE11版本的浏览器访问商城</p>

       </div>


   </div>`);
    };
    console.log('通用js');
    // 鼠标移入
    let midLimi = $('.mainnav-mid');
    let nav = $('.nav-title');
    let search_btn = $('.search-big');
    let search = $('.search');
    let navLe = $('.mouse-box-mid .mainnav-le');
    let navRi = $('.mouse-box-mid .mainnav-ri');

    fun1();
    // 登录/注册页面跳转

    // 建立一个请求数据完成后的异步函数
    async function fun1() {
        // 请求数据，返回promise
        let res = await pAjax({
            url: '../api/json/title-right.json'
        });
        nav.on('mouseover', function(e) {
            // console.log(1);
            // e.stopPropagation();
            // 查找index值对应的东西;
            let wa = $(e.target).parent().attr('index') || $(e.target).attr('index');
            // 如果为前两个，不显示
            if (wa == 'home') {
                $('.mouse-box').hide();
                return;
                // 打断
            }
            if (wa) {
                let ov = wa;

                let jie = JSON.parse(res);
                render(jie, `${ov}`);

            }
            $('.mouse-box').show();
        }).on('mouseout', function(e) {
            $('.mouse-box').hide()
        }).on('click', function(e) {
            // 点击头部按钮
            //  点击跳转
            e.stopPropagation();
            let reg = /\S+/;
            let searchUrl = '';
            // console.log(window.location.search);
            // 判断有无参数
            // console.log(window.location.search.split('?')[1]);
            if (!reg.test(window.location.search)) {
                searchUrl = 'telev';
            } else {
                searchUrl = window.location.search.split('?')[1].split('=')[1];
            }
            let eparent = $(e.target).parent()
            if (eparent.hasClass('nav-hover')) {
                if (eparent.attr('index') != searchUrl) {
                    console.log(eparent.attr('index'));
                    // 跳转详情页
                    //  '_blank'
                    open(`./list.html?search=${eparent.attr('index')}`, '_self');

                } else {
                    window.open(`./list.html?search=${eparent.attr('index')}`, '_self')
                }

            } else if (eparent.hasClass('nav-title-child')) {
                console.log('跳转首页');
                window.open('../index.html', '_self');
            }
        });
    };


    // 点击搜索按钮
    search_btn.on('click', function(e) {
        midLimi.css('overflow', 'hidden');
        nav.hide();
        // 延时
        let timer = setTimeout(() => {
            search.css('right', 0);
        }, 1);
        search.show();
        search_btn.hide();
    });
    // 点击关闭按钮
    $('.close').on('click', function(e) {
        midLimi.css('overflow', 'hidden')
        nav.show();
        search.css('right', -945);
        let timer = setTimeout(() => {
            midLimi.css('overflow', 'visible');
            search.hide();
            search_btn.show();
        }, 1000);
    });
    // 搜索框
    search.on('click', function(e) {
        console.log(e.target.className);
        // 如果点击open
        if (e.target.classList.contains('open')) {
            console.log("open");
        }
        if (e.target.className == 'input') {
            console.log(1);

        }
    });
    // 渲染
    function render(jie, classn) {

        navRi.html(' ');
        let dataa = jie[classn];
        let str1 = '';
        let str2 = '';
        for (let i = 0; i < jie[classn][0].length; i++) {
            let price = jie[classn][0][i].lowPrice.toString().slice(0, -2);
            let name = jie[classn][0][i].name
            let inde = name.indexOf('】');
            name = name.slice(inde + 1)
            inde = name.indexOf('】');
            name = name.slice(inde + 1)
            let listMainImage = jie[classn][0][i].listMainImage
            str1 += `<li>
                <a href="./list.html?search=${classn}"><img src="${listMainImage}" alt="">
                    <p>${name}</p>
                    <span>￥ ${price}</span></a>
            </li>`
        }
        navRi.html(str1);

        let child = navRi.children();
        // 判断数据长度，改变height
        if (jie[classn][0].length == 4) {
            child.css('height', '45%');
        }
        if (jie[classn][0].length == 2) {
            child.css('height', '80%');
        }
        if (dataa.length == 2) {
            navLe.html(' ');
            for (let i = 0; i < jie[classn][1].length; i++) {
                let name = jie[classn][1][i].name;
                let url1 = jie[classn][1][i].url;
                str2 += `<li>
                <a href="./list.html?search=${classn}" ><img src="${url1}" alt="" ><span>${name}</span></a>
            </li>`
            }
            str2 += ` <li class=" mainnav-last">
            <a href="./list.html?search=${classn}" ><span>进入频道</span><i class="iconfont  icon-icon-test7"></i></a>
        </li>`;
            navLe.html(str2);
        } else if (dataa.length == 8) {
            // 判断最后长度 不同渲染,最后的样式
            navLe.html(' ');
            for (let i = 0; i < dataa.length; i++) {
                let name1 = dataa[i].name;
                let url1 = dataa[i].url;
                str2 += `<li>
                <a href="./list.html?search=${classn}" ><img src="${url1}" alt=""><span>${name1}</span></a>
            </li>`
            }
            str2 += ` <li class=" mainnav-last">
                <a href="./list.html?search=${classn}" ><img src="${url1}" alt=""><span>${name1}</span></a>
            <a href="./list.html?search=${classn}" ><span>进入频道</span><i class="iconfont  icon-icon-test7"></i></a>
        </li>`;
            navLe.html(str2);

        }
    };
    //滚动条滚动事件
    window.onscroll = function() {
        // 滚动到一定高度，导航栏置顶
        if (scrollY < 500) {
            $('.side').css({
                bottom: 0,
                right: 10
            });
        } else {
            $('.side').css({
                bottom: 200,
                right: 10,
            });

        }
        if (scrollY < 1000) {
            $('.goTop').hide();
        } else {
            $('.goTop').show();
            $('.goTop').css('display', 'flex')
        }
    };
    // 置顶操作
    $('.goTop').on('click', function(e) {
        scrollTo({
            top: 0
        })
    });
});