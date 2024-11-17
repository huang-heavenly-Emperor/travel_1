// 季节标签切换增强
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // 移除所有active类
        document.querySelectorAll('.tab').forEach(t => {
            t.classList.remove('active');
            t.style.transform = 'scale(1)';
        });
        
        // 添加active类和缩放效果
        tab.classList.add('active');
        tab.style.transform = 'scale(1.05)';
        
        // 内容切换动画
        document.querySelectorAll('.season-content').forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        });
        
        const season = tab.dataset.season;
        const targetContent = document.getElementById(season);
        
        // 显示新内容
        setTimeout(() => {
            targetContent.style.display = 'block';
            setTimeout(() => {
                targetContent.classList.add('active');
            }, 50);
        }, 300);
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
    if (!img || !img.dataset.src) return;
    
    // 添加加载效果
    img.classList.add('lazy-image');
    
    const tempImage = new Image();
    tempImage.onload = function() {
        img.src = img.dataset.src;
        img.classList.add('loaded');
        
        // 添加入场动画
        img.style.animation = 'fadeIn 0.5s ease forwards';
    };
    
    tempImage.src = img.dataset.src;
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

// 滚动显示动画
document.addEventListener('DOMContentLoaded', function() {
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    scrollRevealElements.forEach(element => {
        observer.observe(element);
    });
});

// 标签页切换动画
function switchTab(tabId) {
    const allContents = document.querySelectorAll('.tab-content');
    allContents.forEach(content => {
        content.classList.add('hidden');
    });
    
    const selectedContent = document.getElementById(tabId);
    setTimeout(() => {
        selectedContent.classList.remove('hidden');
    }, 300);
}

// 卡片动画
document.querySelectorAll('.destination-card, .tip-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
        const image = card.querySelector('img');
        if (image) {
            image.style.transform = 'scale(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        const image = card.querySelector('img');
        if (image) {
            image.style.transform = 'scale(1)';
        }
    });
});

// 搜索框焦点效果
const searchInput = document.querySelector('.search-box input');
if (searchInput) {
    searchInput.addEventListener('focus', () => {
        searchInput.parentElement.style.transform = 'scale(1.02)';
    });
    
    searchInput.addEventListener('blur', () => {
        searchInput.parentElement.style.transform = 'scale(1)';
    });
}

// 标签云动画
document.querySelectorAll('.tag-cloud a').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'translateY(0) scale(1)';
    });
});