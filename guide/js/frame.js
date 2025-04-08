import { removeClass } from './helper.js';

export const frame = () => {
  const links = document.querySelectorAll('.sidebar a');
  const frame = document.querySelector('iframe');
  const frameSrc = sessionStorage.getItem('src');
  if (!frame) return;

  // 프레임CSS
  //background-color:light-dark(#fff, #333); 여기 시작 시작시 지운다!!
  const frameCSS = () => {
    const style = frame.contentWindow.document.createElement('style');
    style.textContent = /* css */ `
      body{ 
        // background-color:light-dark(#fff, #333); 
        &::-webkit-scrollbar {
          width: 10px;
          background-color:rgba(0, 0, 0, 0.02);
        }
        &::-webkit-scrollbar-thumb {
          width: 10px;
          border-radius: 1000px;
          background-color: rgba(0, 0, 0, 0.05);
        }
        @media (width < 1280px) {
          padding:0 20px 20px;
        }
        > h2:not([class]) {
          margin-block:40px 20px;
          font-size:20px;
          &:first-child {
            margin-top:0;
          }
        }
      }
      .guide-block {
        border:1px dashed light-dark(#7c7c7c, #fcfcfc);
        padding:10px;
        margin-block:10px;
        &.align[class*="v"] {
          height:80px;
        }
      }
    `;
    frame.contentWindow.document.head.append(style);

    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      const html = frame.contentWindow.document.documentElement;
      html.classList.add('dark');
      html.style.setProperty('color-scheme', 'dark');
    }
  };

  if (frameSrc) {
    frame.setAttribute('src', frameSrc);
    links.forEach((link) => {
      const linkText = link.textContent.toLocaleLowerCase();

      if (frameSrc.includes(linkText)) {
        removeClass(links);
        link.classList.add('active');
      }
    });
  }

  frame.onload = () => {
    frameCSS();
  };
};
