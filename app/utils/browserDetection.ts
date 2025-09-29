/**
 * 检测浏览器环境工具函数
 */

export interface BrowserInfo {
  isWeChat: boolean;
  isQQ: boolean;
  isInApp: boolean;
  userAgent: string;
}

/**
 * 检测当前是否在微信/QQ内置浏览器中
 */
export function detectBrowser(): BrowserInfo {
  if (typeof window === 'undefined') {
    return {
      isWeChat: false,
      isQQ: false,
      isInApp: false,
      userAgent: ''
    };
  }

  const userAgent = window.navigator.userAgent.toLowerCase();
  
  // 检测微信浏览器
  const isWeChat = userAgent.includes('micromessenger');
  
  // 检测QQ浏览器
  const isQQ = userAgent.includes('qq/') || userAgent.includes('mqqbrowser');
  
  // 是否在应用内浏览器
  const isInApp = isWeChat || isQQ;

  return {
    isWeChat,
    isQQ,
    isInApp,
    userAgent
  };
}

/**
 * 生成浏览器提示信息
 */
export function getBrowserWarningText(browserInfo: BrowserInfo): string {
  if (browserInfo.isWeChat) {
    return '检测到您正在微信中访问，请点击右上角"..."选择"在浏览器中打开"以获得最佳体验';
  }
  
  if (browserInfo.isQQ) {
    return '检测到您正在QQ中访问，请点击右上角"..."选择"在浏览器中打开"以获得最佳体验';
  }
  
  return '请在浏览器中打开本页面以获得最佳体验';
}