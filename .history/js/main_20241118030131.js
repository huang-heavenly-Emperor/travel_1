document.addEventListener('DOMContentLoaded', function() {
    // 获取元素
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    // 切换菜单
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('no-scroll'); // 防止背景滚动
    });

    // 点击导航链接时关闭菜单
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    });

    // 点击外部区域关闭菜单
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('no-scroll');
        }
    });

    // 添加图片加载错误处理
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = '../assets/images/placeholder.jpg'; // 设置默认占位图
            this.alt = '图片加载失败';
        });
    });



    lazyImages.forEach(img => imageObserver.observe(img));

    // 添加滚动显示动画
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.5
    });
    
    timelineItems.forEach(item => observer.observe(item));

    // 客户评价轮播功能
    const slider = document.querySelector('.testimonials-slider');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    
    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateSlider();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = Math.min(currentIndex + 1, cards.length - 1);
        updateSlider();
    });
    
    // 自动轮播
    setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateSlider();
    }, 5000);

    // 合作伙伴标签切换功能
    const tabBtns = document.querySelectorAll('.tab-btn');
    const partnerGrids = document.querySelectorAll('.partners-grid');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有活动状态
            tabBtns.forEach(b => b.classList.remove('active'));
            partnerGrids.forEach(grid => grid.classList.remove('active'));
            
            // 添加当前活动状态
            btn.classList.add('active');
            const category = btn.dataset.category;
            document.getElementById(category).classList.add('active');
        });
    });
    
    // 添加图片加载动画
    const partnerCards = document.querySelectorAll('.partner-card');
    partnerCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // FAQ 展开/收起功能
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            // 关闭其他展开的项目
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // 切换当前项目
            item.classList.toggle('active');
        });
    });
    
    // 新闻卡片hover效果
    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // 添加图片加载错误处理
    const allImages = document.getElementsByTagName('img');
    
    for(let img of allImages) {
        img.onerror = function() {
            this.src = '/assets/images/placeholder.png';
        };
    }

    // 添加懒加载处理
    const lazyImages = document.querySelectorAll('img.lazy');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));

    // 图片预加载函数
    function preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    // 预加载关键图片
    const criticalImages = [
        'assets/images/placeholders/destination-lg.png',
        'assets/images/placeholders/default.png',
        'assets/images/logo.png'
    ];

    Promise.all(criticalImages.map(preloadImage))
        .then(() => console.log('Critical images preloaded'))
        .catch(error => console.error('Error preloading images:', error));
}); 