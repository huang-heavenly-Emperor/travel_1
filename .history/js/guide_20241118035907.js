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

// 图片懒加载
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        img.dataset.src = img.src;
        img.src = '';
        imageObserver.observe(img);
    });
});