# GitHub Pages 部署检查清单

## 问题：页面样式未加载

如果上传到 GitHub Pages 后页面没有样式，请按以下步骤检查：

## ✅ 检查步骤

### 1. 确认所有文件都已上传

确保以下文件都在 GitHub 仓库的**根目录**下：
- ✅ `index.html`
- ✅ `styles.css`
- ✅ `script.js`
- ✅ `README.md`（可选）

**检查方法：**
1. 进入你的 GitHub 仓库页面
2. 查看文件列表，确认所有文件都在根目录（不在任何子文件夹中）

### 2. 检查文件路径

确保 `index.html` 中的路径引用正确：
- CSS: `href="./styles.css"` 或 `href="styles.css"`
- JS: `src="./script.js"` 或 `src="script.js"`

### 3. 检查 GitHub Pages 设置

1. 进入仓库的 **Settings**（设置）
2. 点击左侧的 **Pages**
3. 确认：
   - **Source** 选择的是 **main** 分支（或你的主分支）
   - **Folder** 选择的是 **/ (root)**
   - 状态显示为 "Your site is live at..."

### 4. 等待部署完成

GitHub Pages 部署通常需要 1-5 分钟。如果刚上传文件，请等待几分钟后刷新页面。

### 5. 清除浏览器缓存

- **Chrome/Edge**: 按 `Ctrl + Shift + Delete`，清除缓存
- **Firefox**: 按 `Ctrl + Shift + Delete`，清除缓存
- 或者使用**无痕模式**（Incognito/Private）打开网站

### 6. 检查浏览器控制台

1. 打开网站
2. 按 `F12` 打开开发者工具
3. 切换到 **Console**（控制台）标签
4. 查看是否有红色错误信息
5. 切换到 **Network**（网络）标签
6. 刷新页面，查看 `styles.css` 和 `script.js` 是否成功加载
   - 如果显示 404，说明文件路径有问题
   - 如果显示 200，说明文件已加载，可能是缓存问题

### 7. 检查文件大小写

GitHub 在某些情况下对文件名大小写敏感。确保文件名完全匹配：
- `styles.css`（小写）
- `script.js`（小写）
- `index.html`（小写）

### 8. 直接访问 CSS 文件

在浏览器中直接访问：
```
https://你的用户名.github.io/styles.css
```

如果能看到 CSS 代码，说明文件已上传。如果显示 404，说明文件未上传或路径错误。

## 🔧 常见问题解决

### 问题 1：CSS 文件显示 404

**解决方法：**
1. 确认 `styles.css` 文件在仓库根目录
2. 检查文件名是否正确（大小写）
3. 重新上传文件

### 问题 2：页面显示但无样式

**解决方法：**
1. 清除浏览器缓存
2. 等待 GitHub Pages 部署完成（1-5分钟）
3. 使用无痕模式测试

### 问题 3：部分样式加载，部分未加载

**解决方法：**
1. 检查浏览器控制台的错误信息
2. 确认 Font Awesome CDN 链接可访问
3. 检查网络连接

## 📝 快速验证命令

在浏览器控制台（F12）中运行以下代码，检查文件是否存在：

```javascript
// 检查 CSS 文件
fetch('./styles.css')
  .then(r => r.ok ? console.log('✅ CSS 文件存在') : console.log('❌ CSS 文件不存在'))
  .catch(e => console.log('❌ 错误:', e));

// 检查 JS 文件
fetch('./script.js')
  .then(r => r.ok ? console.log('✅ JS 文件存在') : console.log('❌ JS 文件不存在'))
  .catch(e => console.log('❌ 错误:', e));
```

## 🚀 重新部署步骤

如果以上方法都不行，尝试重新部署：

1. 在 GitHub 仓库中，进入 **Settings → Pages**
2. 将 **Source** 改为 **None**，保存
3. 等待几秒
4. 再将 **Source** 改回 **main** 分支，保存
5. 等待 1-5 分钟
6. 清除浏览器缓存后刷新页面

---

如果问题仍然存在，请检查：
- 仓库是否为公开（Public）仓库
- 是否使用了正确的仓库名（`用户名.github.io`）
- 文件是否在正确的分支上

