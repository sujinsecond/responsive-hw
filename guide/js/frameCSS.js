export const frameCSS = () => {
  const frame = document.querySelector('iframe');

  const html = frame.contentWindow.document.documentElement;
  const isDark = html.classList.toggle('dark');
  html.style.setProperty('color-scheme', isDark ? 'dark' : 'light');
};
