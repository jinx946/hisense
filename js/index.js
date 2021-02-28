$(() => {
    // window.onload = function() {
    //     $('body').css('width', innerWidth);
    // }
    getDate();
    async function getDate() {
        let getall = await pAjax({
            url: './api/json/all.json'
        });
        let resDate = JSON.parse(getall);
        // 找到识别的index
        // 以‘-’截取字段
        // 在json 中找到对应数据
        // 判断专区个数
        for (let num = 0; num < $('.zone-under').length; num++) {
            let de = $($('.zone-under')[num]);
            let dis = $($('.zone-under')[num]).attr('index').split('-')[1];
            let homeDate = resDate[dis][0][dis];
            renderHome(de, homeDate, dis);
            window.onscroll = function() {
                if (scrollY < 500) {
                    $('.side').css({
                        bottom: 0,
                        right: 10
                    });
                    $('.mainnav').css({
                        position: 'relative',
                        top: 0,
                        left: 0
                    });
                } else {
                    $('.side').css({
                        bottom: 200,
                        right: 10,
                    });
                    $('.mainnav').css({
                        position: 'fixed',
                        top: 0,
                        left: 0
                    });
                }
                if (scrollY < 1000) {
                    $('.goTop').hide();
                } else {
                    $('.goTop').show();
                    $('.goTop').css('display', 'flex')
                }
                // 滚动到一定高度，导航栏置顶
            }
        }
    }
    // 首页渲染数据
    // 专区盒子
    function renderHome(classbox, item, dis) {
        let str = ``;
        for (let i = 0; i < 4; i++) {
            let titleName = item[i].name;
            str += `
        <li class="zone-under-box">
            <a href="./html/details.html?item=${dis}&id=${item[i].id}" target="_self">
                <img src="${item[i].mainImage}" alt="">
                <h2>${titleName}
                </h2>
                <p>活动价${item[i].price.toString().slice(0, -2)}元！活动页领券更优惠！详见活动规则；●22日全场10点前20单返300元 </p>
                <span>${item[i].price.toString().slice(0, -2)}</span>
            </a>
        </li>
   `;
        }
        classbox.html(`${str}`);
        str = '';
    }
})