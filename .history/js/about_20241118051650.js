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
            if (dots[i]) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
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