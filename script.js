// Module loader function
async function loadModule(modulePath, containerId) {
    try {
        const response = await fetch(modulePath);
        if (!response.ok) {
            throw new Error(`Failed to load module: ${modulePath}`);
        }
        const html = await response.text();
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
        }
    } catch (error) {
        console.error(`Error loading module ${modulePath}:`, error);
    }
}

// Load all modules
async function loadAllModules() {
    const modules = [
        { path: 'modules/homepage.html', container: 'homepage-container' },
        { path: 'modules/about.html', container: 'about-container' },
        { path: 'modules/publications.html', container: 'publications-container' },
        { path: 'modules/projects.html', container: 'projects-container' },
        { path: 'modules/honors.html', container: 'honors-container' },
        { path: 'modules/educations.html', container: 'educations-container' },
        { path: 'modules/skills.html', container: 'skills-container' },
        { path: 'modules/footer.html', container: 'footer-container' }
    ];

    // Load all modules in parallel
    await Promise.all(modules.map(module => 
        loadModule(module.path, module.container)
    ));
    
    // Initialize events after all modules are loaded
    initializeModuleEvents();
}

// Initialize module-specific event listeners
function initializeModuleEvents() {
    // Re-attach smooth scroll to newly loaded content (only for anchor links not already bound)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Remove existing listeners to avoid duplicates
        const newAnchor = anchor.cloneNode(true);
        anchor.parentNode.replaceChild(newAnchor, anchor);
        
        newAnchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                // Close mobile menu and sidebar after clicking
                if (window.innerWidth <= 768) {
                    const navMenu = document.querySelector('.nav-menu');
                    const hamburger = document.querySelector('.hamburger');
                    const sidebar = document.querySelector('.sidebar');
                    if (navMenu) navMenu.classList.remove('active');
                    if (hamburger) hamburger.classList.remove('active');
                    if (sidebar) sidebar.classList.remove('active');
                }
            }
        });
    });
}

// Navigation scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('.sidebar-toggle');

// Sidebar toggle button
if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Mobile sidebar toggle (for small screens)
function toggleSidebar() {
    if (window.innerWidth <= 768) {
        sidebar.classList.toggle('active');
    }
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (sidebar && sidebar.classList.contains('active')) {
            if (!sidebar.contains(e.target) && 
                !sidebarToggle.contains(e.target) && 
                !hamburger.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    }
});

// Load modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadAllModules();
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        sidebar.classList.remove('active');
    }
});
