// ============================================
// Awaaz MVP — Dark/Light Mode Theme Manager
// ============================================
// Persists user preference in localStorage.
// Reads on page load. Toggle from profile page.

(function () {
    'use strict';

    const STORAGE_KEY = 'awaaz-theme';

    // Apply theme immediately on page load (prevents flash)
    function applyTheme() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (saved === 'light') {
            document.documentElement.classList.remove('dark');
        } else {
            // Default: follow system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }

    // Toggle dark mode and save preference
    function toggleTheme() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
        // Sync toggle checkbox if it exists on this page
        const toggle = document.getElementById('darkModeToggle');
        if (toggle) {
            toggle.checked = isDark;
        }
    }

    // Initialize toggle checkbox state (for profile page)
    function initToggle() {
        const toggle = document.getElementById('darkModeToggle');
        if (toggle) {
            toggle.checked = document.documentElement.classList.contains('dark');
            toggle.addEventListener('change', function () {
                toggleTheme();
            });
        }
    }

    // Run on load
    applyTheme();

    // Wait for DOM to initialize toggle
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initToggle);
    } else {
        initToggle();
    }

    // Expose for manual use
    window.awaazToggleTheme = toggleTheme;
})();
