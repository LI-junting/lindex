// 导航数据（可删减或修改）
const navData = [
    { name: "Google", url: "https://www.google.com", desc: "搜索引擎" },
    { name: "GitHub", url: "https://github.com", desc: "代码托管" },
    { name: "Baidu", url: "https://www.baidu.com", desc: "中文搜索" },
    { name: "Weibo", url: "https://www.weibo.com", desc: "社交媒体" },
    { name: "Zhihu", url: "https://www.zhihu.com", desc: "知识社区" },
    { name: "Bilibili", url: "https://www.bilibili.com", desc: "视频平台" }
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

// 搜索功能
function setupSearch() {
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filteredData = navData.filter(item =>
            item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)
        );
        renderNavItems(filteredData);
    });
}

// 初始化
renderNavItems(navData);
setupSearch();