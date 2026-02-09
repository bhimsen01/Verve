    const themeToggle = document.getElementById('theme-toggle');

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = 'Light Mode';
    }

    // Toggle dark mode
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = 'Light Mode';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = 'Dark Mode';
        }
    });
