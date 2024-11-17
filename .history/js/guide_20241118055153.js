// 季节标签切换
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // 移除所有active类
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.season-content').forEach(c => c.classList.remove('active'));
        
        // 添加active类到当前标签
        tab.classList.add('active');
        const season = tab.dataset.season;
        document.getElementById(season).classList.add('active');
    });
});

// 目的地卡片动画
const cards = document.querySelectorAll('.destination-card');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1
});

cards.forEach(card => observer.observe(card));

// 游记轮播
// ... 轮播逻辑代码 ... 

// 图片懒加载优化实现
document.addEventListener('DOMContentLoaded', function() {
    // 检查浏览器是否支持 Intersection Observer
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
            // 配置项
            rootMargin: '50px 0px', // 提前50px开始加载
            threshold: 0.1 // 只要显示10%就开始加载
        });

        // 获取所有需要懒加载的图片
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        lazyImages.forEach(img => {
            // 添加加载占位图
            img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            // 添加loading类用于显示加载效果
            img.classList.add('loading');
            // 观察图片
            imageObserver.observe(img);
        });
    } else {
        // 降级处理：如果浏览器不支持 Intersection Observer
        loadAllImages();
    }
});

// 加载单张图片
function loadImage(img) {
    if (img.dataset.src) {
        const tempImage = new Image();
        
        tempImage.onload = function() {
            img.src = img.dataset.src;
            img.classList.remove('loading');
            img.classList.add('loaded');
            // 清理 data-src
            img.removeAttribute('data-src');
        };

        tempImage.onerror = function() {
            // 加载失败时显示默认图片
            img.src = 'path/to/fallback-image.jpg';
            img.classList.remove('loading');
            img.classList.add('error');
        };

        tempImage.src = img.dataset.src;
    }
}

// 降级处理：直接加载所有图片
function loadAllImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    });
}

// 添加错误处理
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'path/to/fallback-image.jpg';
        e.target.classList.remove('loading');
        e.target.classList.add('error');
    }
}, true);