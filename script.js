// 导航数据（增加了 category 字段，可删减或修改）
const navData = [
    { name: "注塑冲公差表", url: "https://wiki.ijguo.cn/lib/exe/fetch.php?media=%E5%B8%B8%E7%94%A8%E5%85%AC%E5%B7%AE%E8%A1%A8.pdf", desc: "查询相关标准", category: "标准资料" },
    { name: "Baidu", url: "https://www.baidu.com", desc: "中文搜索", category: "搜索" },
    { name: "GitHub", url: "https://github.com", desc: "代码托管", category: "开发" },
    { name: "Weibo", url: "https://www.weibo.com", desc: "社交媒体", category: "社交" },
    { name: "Zhihu", url: "https://www.zhihu.com", desc: "知识社区", category: "社交" },
    { name: "Bilibili", url: "https://www.bilibili.com", desc: "视频平台", category: "娱乐" }
];

// 渲染导航项
function renderNavItems(data) {
    const navGrid = document.getElementById("navGrid");
    navGrid.innerHTML = "";
    data.forEach(item => {
        const div = document.createElement("div");
        div.className = "nav-item";
        div.innerHTML = `
            <a href="${item.url}" target="_blank">${item.name}</a>
            <p>${item.desc}</p>
        `;
        navGrid.appendChild(div);
    });
}

// 渲染分类按钮
function renderCategories() {
    const categoryBar = document.getElementById("categoryBar");
    const categories = ["全部", ...new Set(navData.map(item => item.category))]; // 提取唯一分类
    categoryBar.innerHTML = "";
    categories.forEach(category => {
        const btn = document.createElement("button");
        btn.className = "category-btn";
        btn.textContent = category;
        btn.addEventListener("click", () => {
            document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const filteredData = category === "全部" 
                ? navData 
                : navData.filter(item => item.category === category);
            renderNavItems(filteredData);
            document.getElementById("search").value = ""; // 清空搜索框
        });
        categoryBar.appendChild(btn);
    });
    // 默认选中“全部”
    categoryBar.querySelector(".category-btn").classList.add("active");
}

// 搜索功能
function setupSearch() {
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const activeCategory = document.querySelector(".category-btn.active").textContent;
        let filteredData = navData;
        if (activeCategory !== "全部") {
            filteredData = navData.filter(item => item.category === activeCategory);
        }
        filteredData = filteredData.filter(item =>
            item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)
        );
        renderNavItems(filteredData);
    });
}

// 初始化
renderNavItems(navData);
renderCategories();
setupSearch();

