const Theme = () => {
  const button = document.querySelector('.btn-theme');

  if (!button) return;

  const handleTheme = () => {
    const currentScheme = document.documentElement.style.getPropertyValue('color-scheme');
    if (currentScheme.includes('dark')) {
      document.documentElement.style.setProperty('color-scheme', 'light');
    } else {
      document.documentElement.style.setProperty('color-scheme', 'dark');
    }
  };

  button.addEventListener('click', handleTheme);
};
Theme();
