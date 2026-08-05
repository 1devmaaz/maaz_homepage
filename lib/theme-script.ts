/** Inline FOUC-prevention script — keep out of "use client" modules for Server Components. */
export const STORAGE_KEY = "maaz-theme";

/** Default to light (brand theme). Only restore an explicit saved choice. */
export const themeInitScript = `(function(){try{var k=${JSON.stringify(STORAGE_KEY)};var t=localStorage.getItem(k);if(t!=='light'&&t!=='dark'){t='light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

