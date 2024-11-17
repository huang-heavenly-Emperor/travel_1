// 轮播图逻辑
let slideIndex = 0;
const slides = document.getElementsByClassName("slider-item");
const dots = document.getElementsByClassName("dot");

function showSlides() {
    // 隐藏所有幻灯片
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    
    setTimeout(showSlides, 3000); // 每3秒切换
}

// 初始化轮播
showSlides();

// 点击切换
document.querySelector('.slider-prev').onclick = () => {
    slideIndex -= 2;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    showSlides();
}

document.querySelector('.slider-next').onclick = () => {
    showSlides();
}

document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
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
}); 