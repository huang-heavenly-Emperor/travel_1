let slideIndex = 0;
showSlides();

function showSlides() {
    const slides = document.getElementsByClassName("slider-item");
    const dots = document.getElementsByClassName("dot");
    
    // 隐藏所有幻灯片
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    
    setTimeout(showSlides, 3000); // 每3秒切换一次
}

// 点击切换
document.querySelector('.slider-prev').onclick = () => {
    slideIndex -= 2;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    showSlides();
}

document.querySelector('.slider-next').onclick = () => {
    showSlides();
} 