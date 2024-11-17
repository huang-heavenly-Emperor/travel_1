// 轮播图逻辑
function initSlider() {
    const slides = document.getElementsByClassName("slider-item");
    const dots = document.getElementsByClassName("dot");
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    // 如果页面没有轮播图元素，直接返回
    if (!slides.length) return;
    
    let slideIndex = 0;
    
    function showSlides() {
        // 隐藏所有幻灯片
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            dots[i]?.className = dots[i]?.className?.replace(" active", "");
        }
        
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}
        
        slides[slideIndex-1].style.display = "block";
        if (dots[slideIndex-1]) {
            dots[slideIndex-1].className += " active";
        }
        
        setTimeout(showSlides, 3000); // 每3秒切换
    }

    // 初始化轮播
    showSlides();

    // 如果存在切换按钮，添加事件监听
    if (prevBtn) {
        prevBtn.onclick = () => {
            slideIndex -= 2;
            if (slideIndex < 0) slideIndex = slides.length - 1;
            showSlides();
        }
    }

    if (nextBtn) {
        nextBtn.onclick = () => {
            showSlides();
        }
    }
}

// 时间轴动画逻辑
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // 如果页面没有时间轴元素，直接返回
    if (!timelineItems.length) return;
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    function showVisibleItems() {
        timelineItems.forEach(item => {
            if (isElementInViewport(item)) {
                item.classList.add('show');
            }
        });
    }
    
    // 初始检查
    showVisibleItems();
    
    // 滚动时检查
    window.addEventListener('scroll', showVisibleItems);
}

// 等待DOM加载完成后初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    initSlider();
    initTimeline();
}); 