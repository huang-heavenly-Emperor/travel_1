// 等待DOM加载完成后初始化功能
document.addEventListener('DOMContentLoaded', function() {
    initSlider();
    initLazyLoading();
});

// 轮播图逻辑
function initSlider() {
    const slides = document.getElementsByClassName("slider-item");
    const dots = document.getElementsByClassName("dot");
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (!slides.length) return;
    
    let slideIndex = 0;
    let slideTimer = null;
    
    function showSlides() {
        // 清除之前的定时器
        if (slideTimer) {
            clearTimeout(slideTimer);
        }

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
        
        // 预加载下一张幻灯片的图片
        const nextIndex = slideIndex % slides.length;
        if (slides[nextIndex]) {
            const nextImg = slides[nextIndex].querySelector('img[data-src]');
            if (nextImg) {
                loadImage(nextImg);
            }
        }
        
        slideTimer = setTimeout(showSlides, 3000);
    }

    // 初始化轮播
    showSlides();

    // 按钮事件监听
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

// 懒加载初始化
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        // 获取所有需要懒加载的图片
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        lazyImages.forEach(img => {
            // 如果图片在轮播图中，立即加载
            if (img.closest('.slider-item')) {
                loadImage(img);
            } else {
                // 非轮播图的图片使用懒加载
                img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
                img.classList.add('loading');
                imageObserver.observe(img);
            }
        });
    } else {
        loadAllImages();
    }
}

// 加载单张图片
function loadImage(img) {
    if (!img || !img.dataset.src || img.classList.contains('loaded')) return;

    const tempImage = new Image();
    
    tempImage.onload = function() {
        img.src = img.dataset.src;
        img.classList.remove('loading');
        img.classList.add('loaded');
        
        // 如果图片在轮播图中，添加淡入效果
        if (img.closest('.slider-item')) {
            img.style.opacity = 0;
            requestAnimationFrame(() => {
                img.style.transition = 'opacity 0.5s ease-in';
                img.style.opacity = 1;
            });
        }
        
        img.removeAttribute('data-src');
    };

    tempImage.onerror = function() {
        img.src = '../assets/images/fallback.jpg'; // 设置默认的替代图片
        img.classList.remove('loading');
        img.classList.add('error');
    };

    tempImage.src = img.dataset.src;
}

// 降级处理：加载所有图片
function loadAllImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(loadImage);
}

// 全局错误处理
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = '../assets/images/fallback.jpg';
        e.target.classList.remove('loading');
        e.target.classList.add('error');
    }
}, true);
</file>