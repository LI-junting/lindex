// 导航数据（增加了 category 字段，可删减或修改）
const navData = [
    { name: "注塑冲公差表", url: "https://wiki.ijguo.cn/lib/exe/fetch.php?media=%E5%B8%B8%E7%94%A8%E5%85%AC%E5%B7%AE%E8%A1%A8.pdf", desc: "查询相关标准", category: "标准资料" },
    { name: "标准下载", url: "https://wiki.ijguo.cn/doku.php?id=%E6%A0%87%E5%87%86%E4%B8%8B%E8%BD%BD", desc: "标准下载站点", category: "标准资料" },
    { name: "弹簧计算", url: "http://www.leidream.com/yasuotanhuang.html", desc: "在线计算工具", category: "实用工具" },
    { name: "色卡查询", url: "https://www.qtccolor.com/secaiku/", desc: "在线色卡工具", category: "实用工具" },
    { name: "标准件查询", url: "https://www.164580.com/biaozhun/", desc: "标准件查询工具", category: "实用工具" },
    { name: "百度脑图", url: "https://naotu.baidu.com/home", desc: "在线脑图工具", category: "实用工具" }
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


