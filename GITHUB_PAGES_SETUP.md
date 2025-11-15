# GitHub Pages 设置指南

## ✅ 确保网站正常显示的步骤

### 1. 仓库命名（最重要！）

你的仓库名**必须**是：`yourname.github.io`

- ✅ 正确：`yourname.github.io`
- ❌ 错误：`my-homepage`、`portfolio`、`yourname.github.io-main` 等

### 2. 文件结构

所有文件必须在仓库的**根目录**下：

```
yourname.github.io/
├── index.html
├── styles.css
├── script.js
├── README.md (可选)
└── 其他文件...
```

**不要**放在任何子文件夹中！

### 3. GitHub Pages 设置

1. 进入你的仓库：`https://github.com/yourname/yourname.github.io`
2. 点击 **Settings**（设置）
3. 在左侧菜单中找到 **Pages**
4. 设置：
   - **Source**: 选择 `main` 分支（或你的主分支名）
   - **Folder**: 选择 `/ (root)`
5. 点击 **Save**（保存）

### 4. 等待部署

- GitHub Pages 通常需要 **1-5 分钟** 完成部署
- 部署完成后，访问 `https://yourname.github.io/` 即可看到你的网站

### 5. 验证文件是否可访问

在浏览器中直接访问以下链接，确认文件存在：

- ✅ `https://yourname.github.io/styles.css` - 应该显示 CSS 代码
- ✅ `https://yourname.github.io/script.js` - 应该显示 JavaScript 代码
- ✅ `https://yourname.github.io/index.html` - 应该显示 HTML 页面

如果显示 404，说明文件未上传或路径错误。

### 6. 清除浏览器缓存

如果样式仍未加载：

1. **方法一**：使用无痕模式（Incognito/Private）访问
2. **方法二**：按 `Ctrl + Shift + Delete` 清除缓存
3. **方法三**：硬刷新页面（`Ctrl + F5` 或 `Ctrl + Shift + R`）

## 🔍 排查问题

### 检查浏览器控制台

1. 访问 `https://yourname.github.io/`
2. 按 `F12` 打开开发者工具
3. 切换到 **Console**（控制台）标签
4. 查看是否有红色错误信息
5. 切换到 **Network**（网络）标签
6. 刷新页面（`F5`）
7. 查看 `styles.css` 和 `script.js` 的状态：
   - ✅ **200** = 文件加载成功
   - ❌ **404** = 文件不存在或路径错误
   - ❌ **Failed** = 网络问题

### 常见错误及解决方法

#### 错误 1：CSS 文件 404

**原因**：`styles.css` 文件未上传或路径错误

**解决**：
1. 确认 `styles.css` 在仓库根目录
2. 确认文件名完全匹配（大小写敏感）
3. 重新上传文件

#### 错误 2：页面显示但无样式

**原因**：浏览器缓存或 GitHub Pages 未完成部署

**解决**：
1. 等待 2-3 分钟
2. 清除浏览器缓存
3. 使用无痕模式测试

#### 错误 3：仓库名不正确

**原因**：仓库名不是 `yourname.github.io`

**解决**：
1. 创建新仓库，命名为 `yourname.github.io`
2. 上传所有文件到新仓库
3. 在 Settings → Pages 中启用 Pages

## 📝 快速检查清单

- [ ] 仓库名是 `yourname.github.io`
- [ ] `index.html` 在根目录
- [ ] `styles.css` 在根目录
- [ ] `script.js` 在根目录
- [ ] GitHub Pages 已启用（Settings → Pages）
- [ ] Source 选择的是 `main` 分支
- [ ] 等待了 1-5 分钟让部署完成
- [ ] 清除了浏览器缓存
- [ ] 在浏览器控制台检查了文件加载状态

## 🚀 如果还是不行

1. **重新部署**：
   - Settings → Pages → Source 改为 None → Save
   - 等待 10 秒
   - Source 改回 main → Save
   - 等待 5 分钟

2. **检查文件内容**：
   - 确认 `styles.css` 文件不为空
   - 确认 `script.js` 文件不为空

3. **联系支持**：
   - 提供浏览器控制台的错误信息
   - 提供 Network 标签中文件的加载状态

---

**记住**：访问 `https://yourname.github.io/` 时，GitHub Pages 会自动查找根目录下的 `index.html` 文件。确保所有文件都在根目录，路径使用相对路径（如 `styles.css` 而不是 `./styles.css` 或 `/styles.css`）。


