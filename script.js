function hasInlineSections() {
    return Boolean(document.querySelector("main section[id]"));
}

function renderLocalPreviewHint() {
    const main = document.querySelector("main");
    if (!main || main.querySelector(".local-preview-notice")) {
        return;
    }

    main.innerHTML = `
        <section class="section">
            <div class="container">
                <article class="card-surface about-story local-preview-notice">
                    <p>Module content could not be loaded in local file mode.</p>
                    <p>
                        Open <a href="preview.html" class="project-link">preview.html</a>
                        for a single-file local preview, or run a local server for the modular version.
                    </p>
                </article>
            </div>
        </section>
    `;
}

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

        return true;
    } catch (error) {
        console.error(`Error loading module ${modulePath}:`, error);
        return false;
    }
}

async function loadAllModules() {
    if (hasInlineSections()) {
        initializePage();
        return;
    }

    const modules = [
        { path: "modules/homepage.html", container: "homepage-container" },
        { path: "modules/about.html", container: "about-container" },
        { path: "modules/publications.html", container: "publications-container" },
        { path: "modules/projects.html", container: "projects-container" },
        { path: "modules/educations.html", container: "educations-container" },
        { path: "modules/skills.html", container: "skills-container" },
        { path: "modules/footer.html", container: "footer-container" }
    ];

    const results = await Promise.all(modules.map((module) => loadModule(module.path, module.container)));
    if (!results.some(Boolean)) {
        renderLocalPreviewHint();
    }

    initializePage();
}

function initializePage() {
    const navbar = document.querySelector(".navbar");
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const sidebar = document.querySelector(".sidebar");
    const sidebarToggle = document.querySelector(".sidebar-toggle");
    const sidebarClose = document.querySelector(".sidebar-close");
    const sectionLinks = document.querySelectorAll('a[href^="#"]');
    const sections = document.querySelectorAll("section[id]");
    const revealItems = document.querySelectorAll(".reveal");

    const syncMobilePanelState = () => {
        const navOpen = navMenu?.classList.contains("active") ?? false;
        const sidebarOpen = sidebar?.classList.contains("active") ?? false;
        const mobilePanelOpen = window.innerWidth <= 860 && (navOpen || sidebarOpen);

        hamburger?.classList.toggle("active", navOpen);
        sidebarToggle?.classList.toggle("active", sidebarOpen);

        if (hamburger) {
            hamburger.setAttribute("aria-expanded", String(navOpen));
        }

        if (sidebarToggle) {
            sidebarToggle.setAttribute("aria-expanded", String(sidebarOpen));
        }

        document.body.classList.toggle("mobile-panel-open", mobilePanelOpen);
    };

    const setSidebarOpen = (isOpen) => {
        sidebar?.classList.toggle("active", isOpen);
        syncMobilePanelState();
    };

    const setNavMenuOpen = (isOpen) => {
        navMenu?.classList.toggle("active", isOpen);
        syncMobilePanelState();
    };

    const closeMobilePanels = () => {
        setNavMenuOpen(false);
        setSidebarOpen(false);
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
        const nextState = !(sidebar?.classList.contains("active") ?? false);
        setSidebarOpen(nextState);
        if (nextState) {
            setNavMenuOpen(false);
        }
    });

    sidebarClose?.addEventListener("click", () => {
        setSidebarOpen(false);
    });

    hamburger?.addEventListener("click", () => {
        const nextState = !(navMenu?.classList.contains("active") ?? false);
        setNavMenuOpen(nextState);
        if (nextState) {
            setSidebarOpen(false);
        }
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
            setSidebarOpen(false);
        }

        if (!clickedNavMenu && !clickedNavButton) {
            setNavMenuOpen(false);
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
            return;
        }

        syncMobilePanelState();
    });

    syncMobilePanelState();
}

document.addEventListener("DOMContentLoaded", () => {
    loadAllModules();
});
