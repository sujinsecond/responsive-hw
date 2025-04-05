import { removeClass } from './helper.js';

const mobileSize = 1280;

export const navigation = () => {
  const sidebar = document.querySelector('.sidebar');
  const links = sidebar.querySelectorAll('a');
  const current = sessionStorage.getItem('src');
  const details = sidebar.querySelectorAll('details');
  const toggle = document.querySelector('.toggle');

  // dialog 열림
  sidebar.show();

  links.forEach((link) => {
    // 빈메뉴 삭제
    if (!link.getAttribute('href')) {
      link.parentElement.remove();
      return;
    }

    link.addEventListener('click', (e) => {
      if (window.innerWidth < mobileSize) {
        sidebar.close();
      }
      removeClass(links);
      e.target.classList.add('active');
      sessionStorage.setItem('src', e.target.getAttribute('href'));
    });
  });

  toggle.addEventListener('click', () => {
    if (sidebar.hasAttribute('open')) {
      sidebar.close();
    } else {
      sidebar.show();
    }
  });

  // 반응형 사이드바
  const resizeSidebar = () => {
    if (window.innerWidth < mobileSize) {
      sidebar.close();
    } else {
      sidebar.show();
    }
  };

  // 현재 위치활성화
  const currentDetails = () => {
    if (!current) return;

    const currentKeywords = current.toLowerCase().split(/[^a-z0-9]+/);

    let bestMatch = null;
    let bestMatchCount = 0;

    links.forEach((link) => {
      if (!link.getAttribute('href')) return;

      const linkWords = link.textContent.toLowerCase().split(/\s+/);
      const matchCount = linkWords.filter((word) => currentKeywords.includes(word)).length;

      if (matchCount > bestMatchCount) {
        bestMatch = link;
        bestMatchCount = matchCount;
      }
    });

    if (bestMatch) {
      details.forEach((detail) => detail.removeAttribute('open'));
      links.forEach((link) => link.classList.remove('active'));

      const parentDetail = bestMatch.closest('details');
      bestMatch.classList.add('active');

      if (parentDetail) {
        parentDetail.setAttribute('open', true);
      }
    }
  };

  currentDetails();
  resizeSidebar();
  window.addEventListener('resize', resizeSidebar);
};
