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

async function loadAllModules() {
    const modules = [
        { path: "modules/homepage.html", container: "homepage-container" },
        { path: "modules/about.html", container: "about-container" },
        { path: "modules/publications.html", container: "publications-container" },
        { path: "modules/projects.html", container: "projects-container" },
        { path: "modules/educations.html", container: "educations-container" },
        { path: "modules/skills.html", container: "skills-container" },
        { path: "modules/footer.html", container: "footer-container" }
    ];

    await Promise.all(modules.map((module) => loadModule(module.path, module.container)));
    initializePage();
}

function initializePage() {
    const navbar = document.querySelector(".navbar");
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const sidebar = document.querySelector(".sidebar");
    const sidebarToggle = document.querySelector(".sidebar-toggle");
    const sectionLinks = document.querySelectorAll('a[href^="#"]');
    const sections = document.querySelectorAll("section[id]");
    const revealItems = document.querySelectorAll(".reveal");

    const closeMobilePanels = () => {
        navMenu?.classList.remove("active");
        hamburger?.classList.remove("active");
        sidebar?.classList.remove("active");
    };

    sectionLinks.forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const targetId = anchor.getAttribute("href");
            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const target = document.querySelector(targetId);
            if (!target) {
                return;
            }

            event.preventDefault();
            const offsetTop = target.getBoundingClientRect().top + window.scrollY - 96;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
            closeMobilePanels();
        });
    });

    sidebarToggle?.addEventListener("click", () => {
        sidebar?.classList.toggle("active");
    });

    hamburger?.addEventListener("click", () => {
        navMenu?.classList.toggle("active");
        hamburger.classList.toggle("active");
    });

    document.addEventListener("click", (event) => {
        if (window.innerWidth > 860) {
            return;
        }

        const target = event.target;
        const clickedInsideSidebar = sidebar?.contains(target);
        const clickedSidebarButton = sidebarToggle?.contains(target);
        const clickedNavButton = hamburger?.contains(target);
        const clickedNavMenu = navMenu?.contains(target);

        if (!clickedInsideSidebar && !clickedSidebarButton && !clickedNavButton) {
            sidebar?.classList.remove("active");
        }

        if (!clickedNavMenu && !clickedNavButton) {
            navMenu?.classList.remove("active");
            hamburger?.classList.remove("active");
        }
    });

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.16
        }
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    const activeSectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const activeId = entry.target.getAttribute("id");
                document.querySelectorAll(".nav-menu a").forEach((link) => {
                    const isActive = link.getAttribute("href") === `#${activeId}`;
                    link.classList.toggle("active", isActive);
                });
            });
        },
        {
            rootMargin: "-35% 0px -45% 0px",
            threshold: 0
        }
    );

    sections.forEach((section) => activeSectionObserver.observe(section));

    window.addEventListener("scroll", () => {
        navbar?.classList.toggle("scrolled", window.scrollY > 24);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 860) {
            closeMobilePanels();
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadAllModules();
});
