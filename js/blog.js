// 博客页面脚本

document.addEventListener('DOMContentLoaded', function() {
    initBlogSearch();
    initCategoryFilter();
});

// 初始化搜索功能
function initBlogSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('keyup', filterBlogs);
}

// 初始化分类过滤
function initCategoryFilter() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有按钮的 active 类
            categoryBtns.forEach(b => b.classList.remove('active'));
            // 添加当前按钮的 active 类
            this.classList.add('active');
            filterBlogs();
        });
    });
}

// 过滤博客
function filterBlogs() {
    const searchInput = document.getElementById('searchInput');
    const activeCategory = document.querySelector('.category-btn.active');
    const blogItems = document.querySelectorAll('.blog-item');
    const emptyState = document.querySelector('.empty-state');
    
    const searchText = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedCategory = activeCategory ? activeCategory.getAttribute('data-category') : 'all';
    
    let visibleCount = 0;
    
    blogItems.forEach(item => {
        const title = item.querySelector('h2').textContent.toLowerCase();
        const excerpt = item.querySelector('.excerpt').textContent.toLowerCase();
        const category = item.getAttribute('data-category');
        
        // 检查是否匹配搜索文本和分类
        const matchesSearch = title.includes(searchText) || excerpt.includes(searchText);
        const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
        
        if (matchesSearch && matchesCategory) {
            item.style.display = 'block';
            item.style.animation = 'fadeInUp 0.5s ease';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });
    
    // 显示或隐藏空状态
    if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
    }
}

// 添加动画
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);