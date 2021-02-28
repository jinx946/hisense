$(() => {
    $('.carry-arr').css('display', 'none');
    if (!getCookie('login')) {
        $('.panel').html(`<div class="nologin">未登录</div><a class="gologin" href="./login.html" target="_self">去登录</a>`);
    } else {
        class Car {
            constructor(ele, username) {
                // 操作的元素
                this.ele = $(ele);
                this.goods_num = '';
                this.goodsId = '';
                this.elename = username;
                this.init();
            }
            init() {
                    this.getDate();
                    this.ele.on('click', (e) => {
                        this.id = $(e.target).attr('idx');
                        // 点击删除按钮
                        if ($(e.target).hasClass('del')) {
                            e.stopPropagation();
                            this.delnum = `${$(e.target).attr('idx') * 1},`;
                            this.delDate();
                            this.getCarnum();

                        }
                        // 点击减少
                        if ($(e.target).hasClass('reduce')) {
                            e.stopPropagation();
                            this.goods_num = ($(e.target).next().val() * 1) - 1;
                            this.goodsId = $(e.target).parent().attr('idx') * 1;
                            if (this.goods_num >= 1) {
                                this.changeDate();
                                this.getCarnum();
                            }
                        }
                        // 点击添加按钮
                        if ($(e.target).hasClass('add')) {
                            e.stopPropagation();
                            this.goods_num = ($(e.target).prev().val() * 1) + 1;
                            this.goodsId = $(e.target).parent().attr('idx') * 1;
                            this.changeDate();
                            this.getCarnum();
                        }
                        // 点击全选按钮
                        if ($(e.target).hasClass('selAll')) {
                            e.stopPropagation();

                            this.res.forEach(item => {
                                item.is_select = $(e.target).prop('checked');
                            });
                            [...$('.selAll')].forEach(item => {
                                item.checked = $(e.target).prop('checked');
                            })
                            this.renderCar();
                            this.clacul();
                        }
                        // 点击商品前面选择
                        if ($(e.target).hasClass('checked')) {
                            e.stopPropagation();
                            this.res.forEach(item => {
                                if (item.goods_id == this.id) {
                                    item.is_select = $(e.target).prop('checked');
                                }
                            });

                            this.renderCar();
                        }
                        // 点击选中删除
                        if ($(e.target).hasClass('delse')) {
                            this.delnum = '';
                            e.stopPropagation();
                            if ($('.panel-cont-all').html() != '') {
                                if (confirm('确定删除选中商品么？')) {
                                    this.selectData.forEach(item => {
                                        this.delnum += `${item.goods_id},`;
                                    });
                                    this.delDate();
                                } else {
                                    return;
                                }
                            }
                        }
                        // 点击结算
                        //  
                        if ($(e.target).hasClass('set-all')) {
                            this.delnum = '';
                            e.stopPropagation();
                            if (this.res.every(item => {
                                    return item.is_select == false;
                                })) {
                                let Timerout = setTimeout(() => {
                                    $('.set-all').removeClass('set-active');
                                }, 5);
                                alert('未选中商品');
                                return;
                            }
                            this.selectData.forEach(item => {
                                this.delnum += `${item.goods_id},`
                            });
                            this.delDate();
                        }
                    });
                }
                // 获取数据 一次请求
            getCarnum() {
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
            }

            getDate() {
                pAjax({
                    url: '../api/php/getCar.php',
                    data: { username: getCookie('login') },
                    type: 'post',
                }).then(res1 => {
                    this.res = JSON.parse(res1);
                    this.res.forEach(item => {
                        item.is_select = false;
                    });
                    this.getDate2();
                })
            }
            getDate2() {
                    pAjax({
                        url: '../api/json/all.json',

                    }).then(resall => {
                        this.resall = JSON.parse(resall);

                        this.renderCar();
                    });
                }
                // 修改数据
            changeDate() {
                    pAjax({
                        url: '../api/php/changeCar.php',
                        data: { username: getCookie('login'), goods_id: this.goodsId, goods_num: this.goods_num },
                        type: 'post'
                    }).then(res => {
                        this.res.forEach(item => {
                            if (item.goods_id == this.goodsId) {
                                item.goods_num = this.goods_num;
                            }
                        });
                        this.renderCar();
                    })
                }
                // 删除数据 
            delDate() {
                    // console.log(goodsId);
                    pAjax({
                        url: '../api/php/dada.php',
                        data: {
                            username: getCookie('login'),
                            goods_id: this.delnum,

                        },
                        type: 'post'

                    }).then(res => {
                        this.getDate();
                        this.getCarnum();
                    })
                }
                // 计算价格
            clacul() {
                    this.allPrice = 0;
                    this.res.forEach(item => {

                        // item.goods_money =
                    });
                    $('.set-all').addClass('set-active');
                    this.selectData = this.res.filter(item => {
                            return item.is_select == true;
                        }) //把为true的商品选择出来
                        //计算商品总价
                        //判断商品选择按钮是否全部选上，如果全部选上，把全选按钮选上
                    this.selectData.forEach(item => {
                        this.resall[item.goods_type][0][item.goods_type].forEach(item2 => {
                            if (item2.id == item.goods_id) {
                                // item.goods_money = (item2.price / 100);
                                item.menoy = (item2.price / 100) * item.goods_num;
                            }
                        });
                        this.allPrice += item.menoy;
                    });
                    let res2 = this.res.every(item => {
                        return item.is_select == true;
                    });
                    // 把商品种类 所选商品数量 价格渲染到结构上
                    [...$('.selAll')].forEach(item => {
                        item.checked = res2;
                    }); //全选按钮选上
                    $('.panel-set span i').html(this.selectData.length);
                    $('.panel-set span em').html(this.allPrice);
                }
                // 渲染数据
            renderCar() {
                this.clacul();

                let strCar = '';
                for (let i = 0; i < this.res.length; i++) {
                    for (let j = 0; j < this.resall[this.res[i].goods_type][0][this.res[i].goods_type].length; j++) {
                        // console.log(this.res[i].goods_id);
                        let redenDate = {};
                        if (this.resall[this.res[i].goods_type][0][this.res[i].goods_type][j].id == this.res[i].goods_id) {
                            redenDate = this.resall[this.res[i].goods_type][0][this.res[i].goods_type][j];
                            strCar += ` <div class="panel-cont" lou=${this.res[i].goods_type}>
                                <input class="checked" type="checkbox" name="" id=""  ${this.res[i].is_select ? 'checked' :''}  idx=${this.res[i].goods_id}>
                                <a href="./details.html?item=${this.res[i].goods_type}&id=${this.res[i].goods_id}" class="cont-img"><img src="${redenDate.mainImage}" alt="" ></a>
                                <a href="./details.html?item=${this.res[i].goods_type}&id=${this.res[i].goods_id}" class="cont-ti">${redenDate.name}</a>
                                <ul class="panel-cont-ri" >
                                    <li> <span class="money">￥${redenDate.price/100}</span> </li>
                                    <li idx=${this.res[i].goods_id}><button class="reduce">-</button><input type="text" class="little-count" value="${this.res[i].goods_num}"><button class="add">+</button> </li>
                                    <li><span class="goods-men little-count-active">￥${(redenDate.price/100)*this.res[i].goods_num}</span></li>
                                    <li>
                                        <a href="javascript:void(0);" class="del" idx=${this.res[i].goods_id}>删除</a>
                                    </li>
                                </ul>
                            </div>`
                        }
                    }
                }
                $('.panel-cont-all').html(strCar);
            }
        }
        new Car('.panel', getCookie('login'));
    }


    // 渲染购物车

});