// ==UserScript==
// @name         隐藏国际版csp素材商店已下载的素材
// @namespace    https://github.com/asteltis/Hide-clip-studio-assets-purchased-materials
// @version      0.1
// @description  隐藏国际版csp素材商店已下载的素材|Hide clip-studio assets purchased materials
// @author       asteltis
// @match        https://assets.clip-studio.com/*
// @grant        none
// @license      GPL-3.0
// @supportURL   https://github.com/asteltis/Hide-clip-studio-assets-purchased-materials/issues
// ==/UserScript==

(function() {
    'use strict';

    // 用于隐藏已购买的材料卡片
    function hidePurchasedCards() {
        // 查找材料卡片容器
        var cardPanel = document.querySelector('.layput__cardPanel');
        if (!cardPanel) return; // 如果未找到容器，则返回

        // 查找所有未隐藏的材料卡片
        var materialCards = cardPanel.querySelectorAll('.materialCard');
        Array.from(materialCards).forEach(function(card) { // 将NodeList转换为数组，并遍历卡片
            // 检查卡片是否有表示已购买的子元素
            var isPurchased = card.querySelector('.fa-check-circle');
            if (isPurchased) {
                // 隐藏卡片
                card.style.display = 'none';
            }
        });
    }

    // 创建一个MutationObserver实例，用于监听DOM变化
    var observer = new MutationObserver(function(mutations) {
        // 再次查找材料卡片容器，以确保它在DOM中仍然存在
        var cardPanel = document.querySelector('.layput__cardPanel');
        if (cardPanel) {
            // 遍历所有MutationRecord对象
            mutations.forEach(function(mutation) {
                // 如果发生了子节点变化
                if (mutation.type === 'childList') {
                    // 调用函数隐藏已购买的材料卡片
                    hidePurchasedCards();
                }
            });
        }
    });

    // 查找材料卡片容器
    var cardPanel = document.querySelector('.layput__cardPanel');
    if (cardPanel) {
        // 配置MutationObserver以监听材料卡片容器的子节点和子树变化
        observer.observe(cardPanel, { childList: true, subtree: true });
    }

    // 当页面加载完成时，调用函数隐藏已购买的材料卡片
    window.addEventListener('load', hidePurchasedCards);
})();