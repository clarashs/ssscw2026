/**
 * 高德地图 Web 端（JS API）配置
 *
 * 部署前请填入你自己的 Key，不要提交真实 Key 到公开仓库：
 *   1. 登录 https://console.amap.com → 应用管理 → 创建新应用 → 添加 Key
 *   2. 服务平台选择「Web 端 (JS API)」
 *   3. 勾选「Web 服务 / JS API」后，会同时生成 Key 和「安全密钥 securityJsCode」
 *   4. 在该 Key 的设置里填写「域名白名单」，只允许你的站点域名访问
 *      （本地调试可加 localhost / 127.0.0.1）
 *
 * 两个值都为空时，页面不会加载地图脚本，地图区域会显示降级提示；
 * 路线卡片、地址复制、单站高德/Apple Maps 导航等功能不受影响。
 */
window.AMAP_CONFIG = {
  key: '7aed97c5e1a7e6c2f6da1eab44ae3ac7',
  securityJsCode: 'fe11f07a6608f45a237cd851a034a08f'
};

