(() => {
  try {
    const stored = window.localStorage.getItem('np-theme')
    const theme =
      stored === 'light' || stored === 'dark'
        ? stored
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    metaThemeColor?.setAttribute('content', theme === 'dark' ? '#17120F' : '#F5EDE1')
  } catch {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    document.documentElement.dataset.theme = 'light'
    document.documentElement.style.colorScheme = 'light'
    metaThemeColor?.setAttribute('content', '#F5EDE1')
  }
})()
