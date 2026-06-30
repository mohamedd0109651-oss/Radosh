/* Inline-style early theme application to avoid flash of wrong theme.
   Loaded as a tiny blocking script placed in <head> before CSS. */
(function () {
  try {
    var saved = localStorage.getItem('site-theme');
    var theme = saved === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
