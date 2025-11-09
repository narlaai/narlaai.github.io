# 个人主页

一个美观、现代的个人主页，使用纯 HTML、CSS 和 JavaScript 构建，可以轻松部署到 GitHub Pages。

## 功能特点

- 🎨 现代化的设计风格
- 📱 完全响应式布局，支持移动端
- ✨ 平滑滚动和动画效果
- 🚀 快速加载，无需框架依赖
- 🎯 SEO 友好

## 页面结构

- **首页** - 欢迎区域和个人介绍
- **关于我** - 个人简介和统计数据
- **技能** - 技术栈展示
- **项目** - 作品集展示
- **联系** - 联系方式和联系表单

## 如何部署到 GitHub Pages

### ⚠️ 重要：仓库命名规则

为了直接通过 `https://你的用户名.github.io` 访问你的个人主页（而不是 `https://你的用户名.github.io/仓库名`），**仓库名称必须严格遵循以下格式：**

**仓库名 = `你的用户名.github.io`**

例如：
- 如果你的 GitHub 用户名是 `zhangsan`，仓库名必须是 `zhangsan.github.io`
- 如果你的 GitHub 用户名是 `lisi`，仓库名必须是 `lisi.github.io`

### 方法一：通过 GitHub 网页界面创建仓库

1. **登录 GitHub**，点击右上角的 **+** 号，选择 **New repository**（新建仓库）

2. **设置仓库信息**：
   - **Repository name**（仓库名）：输入 `你的用户名.github.io`（例如：`zhangsan.github.io`）
   - **Description**（描述）：可选，例如 "我的个人主页"
   - 选择 **Public**（公开）
   - ⚠️ **不要**勾选 "Add a README file"（因为我们已经有了）
   - ⚠️ **不要**添加 .gitignore 或 license（因为我们已经有了）

3. 点击 **Create repository**（创建仓库）

4. **上传文件到仓库**：
   - 在仓库页面，点击 **uploading an existing file**（上传现有文件）
   - 将本地的所有文件（`index.html`、`styles.css`、`script.js`、`README.md`、`.gitignore`）拖拽上传
   - 在页面底部输入提交信息，例如："Initial commit: 个人主页"
   - 点击 **Commit changes**（提交更改）

5. **启用 GitHub Pages**：
   - 进入仓库的 **Settings**（设置）
   - 在左侧菜单中找到 **Pages**
   - 在 **Source** 部分，选择 **main** 分支（或你的主分支）
   - 在 **Folder** 部分，选择 `/ (root)`（根目录）
   - 点击 **Save**（保存）

6. **等待部署**：
   - 几分钟后（通常 1-2 分钟），你的网站将在 `https://你的用户名.github.io` 上可用
   - 你可以在仓库的 **Settings → Pages** 页面看到部署状态和网站链接

### 方法二：通过 Git 命令行

```bash
# 1. 初始化 Git 仓库
git init

# 2. 添加所有文件
git add .

# 3. 提交更改
git commit -m "Initial commit: 个人主页"

# 4. 添加远程仓库（⚠️ 仓库名必须是：你的用户名.github.io）
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git

# 5. 推送到 GitHub（如果是第一次推送）
git branch -M main
git push -u origin main

# 6. 然后在 GitHub 仓库设置中启用 Pages：
#    进入仓库 Settings → Pages → Source 选择 main 分支 → Save
```

### 验证部署

部署成功后，访问 `https://你的用户名.github.io` 应该能看到你的个人主页。

**提示**：
- 如果网站显示 404，请等待几分钟后刷新
- 确保仓库名完全匹配 `你的用户名.github.io`（区分大小写）
- 确保 `index.html` 文件在仓库的根目录

## 自定义内容

### 修改个人信息

1. **名字和标题**：编辑 `index.html` 中的以下部分：
   ```html
   <span class="name">你的名字</span>
   <p class="hero-subtitle">一名充满热情的程序员 / 设计师 / 开发者</p>
   ```

2. **关于我部分**：修改 `index.html` 中 `#about` 部分的文本内容

3. **统计数据**：修改 `index.html` 中的数字：
   ```html
   <div class="stat-number">50+</div>
   <div class="stat-number">100+</div>
   <div class="stat-number">5+</div>
   ```

4. **技能**：在 `index.html` 的 `#skills` 部分修改技能卡片

5. **项目**：在 `index.html` 的 `#projects` 部分添加或修改项目卡片

6. **联系方式**：修改 `index.html` 中 `#contact` 部分的联系信息

### 修改颜色主题

编辑 `styles.css` 文件中的 CSS 变量：

```css
:root {
    --primary-color: #6366f1;    /* 主色调 */
    --secondary-color: #8b5cf6;  /* 次要色调 */
    /* ... 其他颜色变量 */
}
```

### 添加个人照片

1. 将你的照片放在项目根目录（例如：`photo.jpg`）
2. 在 `index.html` 中找到：
   ```html
   <div class="image-placeholder">
       <i class="fas fa-user"></i>
   </div>
   ```
3. 替换为：
   ```html
   <img src="photo.jpg" alt="我的照片" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
   ```

## 浏览器支持

- Chrome（最新版本）
- Firefox（最新版本）
- Safari（最新版本）
- Edge（最新版本）

## 许可证

MIT License - 你可以自由使用和修改这个项目。

## 贡献

欢迎提交 Issue 和 Pull Request！

---

**祝你使用愉快！** 🎉

