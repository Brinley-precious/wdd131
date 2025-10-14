/* Data Model: Array of Project Objects */
const projects = [
    {
        id: 'proj-web1',
        title: 'Responsive Website',
        category: 'web',
        description: 'A polished, accessible portfolio built from scratch using HTML5, modern CSS Grid/Flexbox, and vanilla JavaScript for dynamic interactions. Focus on performance and mobile-first design.',
        imgLarge: 'images/project1-large.webp',
        imgSmall: 'images/project1-small.webp',
        details: ['HTML5', 'CSS Grid', 'JavaScript', 'Accessibility', 'Responsive Design']
    },
    {
        id: 'proj-write-01',
        title: 'Technical SEO Content Series',
        category: 'writing',
        description: 'Series of long-form, data-driven technical articles designed to rank highly for specific B2B keywords. This project involved extensive research and collaboration with product teams.',
        imgLarge: 'images/project2-large.webp',
        imgSmall: 'images/project2-small.webp',
        details: ['SEO', 'Long-Form Content', 'Keyword Research', 'Technical Writing']
    },
    {
        id: 'proj-web-02',
        title: 'Interactive Data Visualizer',
        category: 'web',
        description: 'A project utilizing JavaScript to fetch data from an API and render it visually on the DOM. Demonstrates proficiency in asynchronous programming and DOM manipulation.',
        imgLarge: 'images/project3-large.webp',
        imgSmall: 'images/project3-small.webp',
        details: ['JavaScript', 'APIs', 'Data Visualization', 'DOM Manipulation']
    }
];

// -------------------------------------------------------------------
// 1. UTILITY FUNCTIONS (Multiple Functions Requirement)
// -------------------------------------------------------------------

/** Sets the current year and last modified date in the footer. */
function setFooterDates() {
    // Select element and modify it (DOM Interaction)
    const currentYearEl = document.getElementById('currentyear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
    const lastModifiedEl = document.getElementById('lastModified');
    if (lastModifiedEl) {
        lastModifiedEl.textContent = document.lastModified;
    }
}

/** Handles mobile menu toggle (DOM Interaction, Event Listening) */
function wireUpNav() {
    const menuToggle = document.getElementById('menu-toggle');
    const primaryNav = document.getElementById('primary-nav');

    if (menuToggle && primaryNav) {
        // Listen for and react to events
        menuToggle.addEventListener('click', () => {
            // Modify element (toggling class) and use Conditional Branching
            const isOpen = primaryNav.classList.contains('open');
            if (isOpen) {
                primaryNav.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.textContent = '☰';
            } else {
                primaryNav.classList.add('open');
                menuToggle.setAttribute('aria-expanded', 'true');
                menuToggle.textContent = '✕';
            }
        });
    }
}

/** Highlights the current page in the navigation */
function highlightCurrentNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');

        // Conditional Branching
        if (href.endsWith(path)) {
            link.classList.add('current');
        } else {
            link.classList.remove('current');
        }
    });
}

// -------------------------------------------------------------------
// 2. PROJECT RENDERING FUNCTIONS
// -------------------------------------------------------------------

/** Creates the HTML string for a single project card (Template Literals) */
function createProjectCardHTML(project) {
    // Exclusively use template literals for output string building
    return `
        <div class="project-card" data-id="${project.id}" role="button" tabindex="0">
            <img src="${project.imgSmall}" alt="Image for ${project.title}" width="800" height="450" loading="lazy">
            <div class="card-content">
                <h3>${project.title}</h3>
                <p>${project.description.slice(0, 100)}...</p>
                <button class="button primary view-details" data-id="${project.id}">View Details</button>
            </div>
        </div>
    `;
}

/** Renders projects on the index.html page (Array methods) */
function renderFeaturedOnIndex() {
    const featuredContainer = document.getElementById('featured-projects-grid');
    if (!featuredContainer) return;

    // Use Array methods (.slice) to get only the first 3 projects
    const featuredProjects = projects.slice(0, 3);

    const html = featuredProjects.map(createProjectCardHTML).join('');

    // Modify element (DOM Interaction)
    featuredContainer.innerHTML = html;

    // Wire up event listeners for the new buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', (e) => handleProjectClick(e.target.dataset.id));
    });
}

/** Renders projects on the projects.html page with filtering (Array methods, Conditional Branching) */
function renderProjects(filter = 'all') {
    const projectsContainer = document.getElementById('all-projects-grid');
    if (!projectsContainer) return;

    let filteredProjects = projects;

    // Conditional Branching and Array Method (.filter)
    if (filter !== 'all') {
        filteredProjects = projects.filter(p => p.category === filter);
    }

    // Array Method (.map)
    const html = filteredProjects.map(createProjectCardHTML).join('');
    projectsContainer.innerHTML = html;

    // Update buttons
    document.querySelectorAll('.filter-button').forEach(btn => {
        // Conditional Branching
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Wire up event listeners
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', (e) => handleProjectClick(e.target.dataset.id));
    });

    // Update local storage for tracking visits
    incrementProjectsVisit();
}

/** Increments a visit counter using localStorage (localStorage Requirement) */
function incrementProjectsVisit() {
    const key = 'projectsPageVisits';
    // Use localStorage.getItem
    let visits = parseInt(localStorage.getItem(key) || 0) + 1;
    // Use localStorage.setItem
    localStorage.setItem(key, visits);

    const countEl = document.getElementById('visit-count');
    // Conditional Branching & DOM Interaction (Selecting and Modifying)
    if (countEl) {
        countEl.textContent = `You've viewed projects ${visits} times!`;
    }
}


/** Handles showing project details in a modal (DOM Interaction, Template Literals) */
function handleProjectClick(projectId) {
    const project = projects.find(p => p.id === projectId);
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content-body');

    if (!project || !modal || !modalContent) return;

    // Template Literals for complex output
    const detailsHtml = project.details.map(detail => `<li>${detail}</li>`).join('');

    const modalHtml = `
        <span class="close-button">&times;</span>
        <h2>${project.title}</h2>
        <img src="${project.imgLarge}" alt="Full view of ${project.title}" loading="eager">
        <p class="lead">${project.description}</p>
        
        <h3>Key Skills Demonstrated:</h3>
        <ul class="modal-details">
            ${detailsHtml}
        </ul>
        <div style="margin-top: 2rem;">
            <a href="about.html" class="button secondary">Let's Discuss This Project</a>
        </div>
    `;

    // Modify Element (DOM Interaction)
    modalContent.innerHTML = modalHtml;
    modal.style.display = 'block';

    // Event Listening for close button
    document.querySelector('.close-button').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Event Listening for outside click
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}


// -------------------------------------------------------------------
// 3. INITIALIZATION
// -------------------------------------------------------------------

/** Main initialization function */
function init() {
    setFooterDates();
    wireUpNav();
    highlightCurrentNav();

    // Check which page we are on and call the appropriate rendering function
    const path = window.location.pathname.split('/').pop();

    // Conditional Branching
    if (path === 'index.html' || path === '') {
        renderFeaturedOnIndex();
    } else if (path === 'projects.html') {
        renderProjects('all'); // Initialize with all projects

        // Event Listening for filter buttons
        document.querySelectorAll('.filter-button').forEach(button => {
            button.addEventListener('click', (e) => {
                renderProjects(e.target.dataset.filter);
            });
        });
    }
}

// Ensure init runs when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);