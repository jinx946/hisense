$(() => {
    console.log(getCookie('login'));
    // 判断传过来的参数
    let reg = /\S+/;
    let reg1 = /&+/;
    let searchUrl = '';
    let getUrl = '';
    let pages = 0;
    // 判断有无参数
    if (!reg.test(window.location.search)) {
        getUrl = 'search=telev&page=1';
    } else if (!reg1.test(window.location.search)) {
        if (!/search+/.test(window.location.search)) {
            alert('地址出错,为你重新加载列表页');
            open('./list.html', '_self');
            return;
        } else {
            getUrl = `${window.location.search.split('?')[1]}&page=1`;
        }

    } else {
        getUrl = window.location.search.split('?')[1];
    }
    getUrl.split('&');
    let obj = {};
    getUrl.split('&').forEach(function(item) {
        obj[item.split('=')[0]] = item.split('=')[1];
    });
    // 获取商品标和页数
    searchUrl = obj.search;
    pages = obj.page * 1;
    // 获取需要用到的元素
    $('.list-sort');
    $('.list-goods-in');
    // 请求数据库
    $.get({
        url: '../api/json/all.json',
        success: (res) => {
            let resList = res[searchUrl][0];
            renderlist(resList, searchUrl, pages);
            // 商品跳转
            $('.single-good').on('click', function(e) {
                    window.open(`./details.html?item=${searchUrl}&id=${$(e.target).attr('listindex')}`, '_self')
                })
                // 分页加hover状态
                // 分页上下切换
            if (pages <= 1) {
                $('.pagepre').addClass('page-i-active');
            } else {
                $('.pagepre').removeClass('page-i-active');
                $('.pagepre').on('click', function(e) {
                    e.stopPropagation();
                    window.open(`./list.html?search=${searchUrl}&page=${pages-1}`, '_self')
                });
            }
            if (pages >= $('.pages-span').length) {
                $('.pagenext').addClass('page-i-active');
            } else {
                $('.pagenext').removeClass('page-i-active');
                $('.pagenext').on('click', function(e) {
                    e.stopPropagation();
                    window.open(`./list.html?search=${searchUrl}&page=${pages+1}`, '_self')
                });
            }
            for (let i = 0; i < $('.pages-span').length; i++) {
                $($('.pages-span')[pages - 1]).removeClass('page-span-active');
            }
            $($('.pages-span')[pages - 1]).addClass('page-span-active');

        }
    });

    // 渲染数据
    function renderlist(resList, searchUrl, pages) {
        // 左边分类渲染  
        //    如果有分类
        if (resList.attributes) {
            let strlist2 = '';
            for (let ilist = 0; ilist < resList.attributes.length; ilist++) {
                // 外循环 
                // 先清空内容
                let strlist3 = '';
                for (let jlist = 0; jlist < resList.attributes[ilist].nameAndCounts.length; jlist++) {
                    // 内循环
                    strlist3 += `<li>${resList.attributes[ilist].nameAndCounts[jlist].name}</li>`
                        // console.log(resList.attributes[ilist].nameAndCounts[jlist].name);
                }
                strlist2 += `<dl><dt>${resList.attributes[ilist].group}</dt><dd><ul>${strlist3} </ul></dd></dl> `
            }
            $('.list-sort').html(strlist2);
        }
        // 右边渲染
        // 分页器渲染
        let limit = parseInt(resList[searchUrl].length / 20)
        if (resList[searchUrl].length % 20) {
            limit += 1;
        }
        let strlistP = '';
        for (let i = 0; i < limit; i++) {
            strlistP += `<a href="./list.html?search=${searchUrl}&page=${i+1}"><span class="pages-span">${i+1}</span></a>`
        }
        $('.goods-paging').html(`<div class="goods-paging-limi">
        <div class="goods-paging-title">共${resList[searchUrl].length}条：</div>
        <a href="javascript:void(0)"><i class="iconfont icon-icon-test6 pagepre"></i></a>
        ${strlistP}<a href="javascript:void(0)"><i class="iconfont icon-icon-test7  pagenext" ></i></a>
    </div>`)
        let strlistR = '';
        // 判断最后一页
        let pagesRudece = pages;
        if (limit == pages) {
            for (let ilistR = (pages - 1) * 20; ilistR < resList[searchUrl].length; ilistR++) {
                strlistR += `<li class="single-good" listIndex ="${resList[searchUrl][ilistR].id}" >
                    <div class="goods-img" listIndex ="${resList[searchUrl][ilistR].id}">
                        <img src="${resList[searchUrl][ilistR].mainImage}    " alt="" listIndex ="${resList[searchUrl][ilistR].id}">
                    </div>
                    <p class="goods-title" listIndex ="${resList[searchUrl][ilistR].id}">
                        <a href="#" listIndex ="${resList[searchUrl][ilistR].id}">${resList[searchUrl][ilistR].name}</a>
                    </p>
                    <p class="goods-price" listIndex ="${resList[searchUrl][ilistR].id}"><span class="sell-price" listIndex ="${resList[searchUrl][ilistR].id}">￥${resList[searchUrl][ilistR].price.toString().slice(0, -2)}</span><span class="sell-count" listIndex ="${resList[searchUrl][ilistR].id}">已售${resList[searchUrl][ilistR].saleQuantity}台</span></p>
                    <div class="price-reduce" listIndex ="${resList[searchUrl][ilistR].id}"></div>
                </li> `
            }
        } else {
            for (let ilistR = (pages - 1) * 20; ilistR < pages * 20; ilistR++) {
                strlistR += `<li class="single-good" listIndex ="${resList[searchUrl][ilistR].id}" >
                    <div class="goods-img" listIndex ="${resList[searchUrl][ilistR].id}">
                        <img src="${resList[searchUrl][ilistR].mainImage}    " alt="" listIndex ="${resList[searchUrl][ilistR].id}">
                    </div>
                    <p class="goods-title" listIndex ="${resList[searchUrl][ilistR].id}">
                        <a href="#" listIndex ="${resList[searchUrl][ilistR].id}">${resList[searchUrl][ilistR].name}</a>
                    </p>
                    <p class="goods-price" listIndex ="${resList[searchUrl][ilistR].id}"><span class="sell-price" listIndex ="${resList[searchUrl][ilistR].id}">￥${resList[searchUrl][ilistR].price.toString().slice(0, -2)}</span><span class="sell-count" listIndex ="${resList[searchUrl][ilistR].id}">已售${resList[searchUrl][ilistR].saleQuantity}台</span></p>
                    <div class="price-reduce" listIndex ="${resList[searchUrl][ilistR].id}"></div>
                </li> `
            }
        }
        $('.list-goods-in').html(strlistR);
    }
})