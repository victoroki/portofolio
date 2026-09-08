$(document).ready(function () {
    // Mobile navigation toggle
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Scroll top button & navbar elevation
    $(window).on('scroll load', function () {
        if (window.scrollY > 60) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }

        // Dynamic scroll progress bar calculation
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        const progressEl = document.getElementById('scrollProgress');
        if (progressEl) {
            progressEl.style.width = scrolled + '%';
        }
    });

    $('#scroll-top').click(function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Quick keyboard shortcut '/' to jump to project search
    $(document).on('keydown', function (e) {
        if (e.key === '/' && !$(e.target).is('input, textarea')) {
            e.preventDefault();
            $('#projectSearch').focus().select();
        }
    });
});

// Modal Elements
const modal = document.getElementById("projectModal");
const modalImg = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalImpact = document.getElementById("modalImpact");
const modalTags = document.getElementById("modalTags");
const modalMetrics = document.getElementById("modalMetrics");
const modalCodeLink = document.getElementById("modalCodeLink");
const modalLiveLink = document.getElementById("modalLiveLink");
const closeModal = document.querySelector(".close-modal");

function openModal(imgSrc, title, desc, impact, codeLink, viewLink, tagsStr, metricsStr, role) {
    modal.style.display = "block";
    modalImg.src = imgSrc;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;

    if (modalImpact) {
        if (impact && impact.trim() !== '') {
            modalImpact.innerHTML = `<span>${impact}</span>`;
            modalImpact.style.display = "flex";
        } else {
            modalImpact.style.display = "none";
        }
    }

    if (modalTags) {
        if (tagsStr) {
            const tags = tagsStr.split(',');
            modalTags.innerHTML = tags.map(t => `<span class="project-tag-item">${t.trim()}</span>`).join('');
        } else {
            modalTags.innerHTML = '';
        }
    }

    if (modalMetrics) {
        if (metricsStr) {
            const metrics = metricsStr.split(',');
            modalMetrics.innerHTML = metrics.map(m => `<span class="metric-pill"><i class="fas fa-check-circle"></i> ${m.trim()}</span>`).join('');
            modalMetrics.style.display = "flex";
        } else {
            modalMetrics.style.display = "none";
        }
    }

    const notDeployedMsg = document.getElementById("notDeployedMsg");
    if (viewLink && viewLink !== "#") {
        modalLiveLink.href = viewLink;
        modalLiveLink.style.display = "inline-flex";
        if (notDeployedMsg) notDeployedMsg.style.display = "none";
    } else {
        modalLiveLink.style.display = "none";
        if (notDeployedMsg) notDeployedMsg.style.display = "block";
    }

    if (codeLink && codeLink !== "#") {
        modalCodeLink.href = codeLink;
        modalCodeLink.style.display = "inline-flex";
    } else {
        modalCodeLink.style.display = "none";
    }
}

if (closeModal) {
    closeModal.onclick = function () {
        modal.style.display = "none";
    };
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

function getProjects() {
    return fetch("projects.json").then(response => response.json());
}

function showProjects(projects) {
    const projectsContainer = document.querySelector(".work .box-container");
    let projectsHTML = '<div class="grid-sizer"></div>';

    projects.forEach((project, index) => {
        const hasViewLink = project.links.view && project.links.view !== "#";
        const hasCodeLink = project.links.code && project.links.code !== "#";
        const isFeatured = Boolean(project.featured);
        const tagsArr = project.tags || [];
        const metricsArr = project.metrics || [];
        const role = project.role || "Software Engineer";
        const impact = project.impact || "";

        // Action Buttons
        const viewButton = hasViewLink
            ? `<a href="${project.links.view}" class="btn" target="_blank">
                 <i class="fas fa-external-link-alt"></i> Live Preview
               </a>`
            : '';

        const codeButton = hasCodeLink
            ? `<a href="${project.links.code}" class="btn btn-secondary" target="_blank">
                 <i class="fab fa-github"></i> Repository
               </a>`
            : '';

        const detailsButton = `<button class="btn btn-secondary view-btn"
                 data-img="../assets/images/projects/${project.image}.png" 
                 data-title="${project.name}" 
                 data-desc="${project.desc}" 
                 data-impact="${impact}"
                 data-code="${project.links.code || '#'}"
                 data-view="${project.links.view || '#'}"
                 data-tags="${tagsArr.join(',')}"
                 data-metrics="${metricsArr.join(',')}"
                 data-role="${role}">
                 <i class="fas fa-file-alt"></i> Case Study
               </button>`;

        const viewOverlayBtn = hasViewLink
            ? `<a href="${project.links.view}" target="_blank" class="btn btn-accent">
                 <i class="fas fa-external-link-alt"></i> Open Live Platform
               </a>`
            : `<button class="btn btn-accent view-btn"
                 data-img="../assets/images/projects/${project.image}.png" 
                 data-title="${project.name}" 
                 data-desc="${project.desc}" 
                 data-impact="${impact}"
                 data-code="${project.links.code || '#'}"
                 data-view="${project.links.view || '#'}"
                 data-tags="${tagsArr.join(',')}"
                 data-metrics="${metricsArr.join(',')}"
                 data-role="${role}">
                 <i class="fas fa-microchip"></i> System Architecture
               </button>`;

        const tagsHTML = tagsArr.map(tag => `<span class="project-tag-item">${tag}</span>`).join('');
        const metricsHTML = metricsArr.length > 0
            ? `<div class="case-metrics-strip">${metricsArr.map(m => `<span class="metric-pill"><i class="fas fa-check"></i> ${m}</span>`).join('')}</div>`
            : '';

        const displayUrl = hasViewLink
            ? project.links.view.replace(/^https?:\/\//, '').replace(/\/$/, '')
            : `github.com/victoroki`;

        if (isFeatured) {
            // Asymmetric Bento Flagship Card
            projectsHTML += `
            <div class="grid-item featured ${project.category}">
              <div class="project-card project-card--featured" data-tilt data-tilt-max="3" data-tilt-speed="400">
                <div class="project-preview">
                  <div class="preview-browser-bar">
                    <div class="browser-dots">
                      <span class="dot red"></span>
                      <span class="dot yellow"></span>
                      <span class="dot green"></span>
                    </div>
                    <div class="browser-url"><i class="fas fa-lock"></i> ${displayUrl}</div>
                    <div class="browser-badge"><span class="pulse-dot"></span>${project.badge}</div>
                  </div>
                  <div class="project-img-wrap">
                    <img draggable="false" src="../assets/images/projects/${project.image}.png" alt="${project.name}" onError="this.src='../assets/images/cmsoon.png'" />
                    <div class="preview-overlay">
                      ${viewOverlayBtn}
                    </div>
                  </div>
                </div>

                <div class="project-case-content">
                  <div class="case-meta-header">
                    <span class="case-role"><i class="fas fa-terminal"></i> ${role}</span>
                    <span class="case-category">${project.category.toUpperCase()}</span>
                  </div>

                  <h3 class="project-title">${project.name}</h3>
                  
                  ${impact ? `<div class="case-impact"><span>${impact}</span></div>` : ''}

                  <p class="project-summary">${project.desc}</p>

                  ${metricsHTML}

                  <div class="project-tags-list">
                    ${tagsHTML}
                  </div>

                  <div class="project-actions">
                    ${viewButton}
                    ${codeButton}
                    ${detailsButton}
                  </div>
                </div>
              </div>
            </div>`;
        } else {
            // Standard Bento Modular Card
            projectsHTML += `
            <div class="grid-item ${project.category}">
              <div class="project-card project-card--standard" data-tilt data-tilt-max="4" data-tilt-speed="400">
                <div class="project-preview">
                  <div class="preview-badge-row">
                    <span class="project-badge-pill"><span class="pulse-dot"></span>${project.badge}</span>
                    <span class="case-role-mini">${role}</span>
                  </div>
                  <div class="project-img-wrap">
                    <img draggable="false" src="../assets/images/projects/${project.image}.png" alt="${project.name}" onError="this.src='../assets/images/cmsoon.png'" />
                    <div class="preview-overlay">
                      ${viewOverlayBtn}
                    </div>
                  </div>
                </div>

                <div class="project-case-content">
                  <div class="case-meta-header">
                    <span class="case-role"><i class="fas fa-code-branch"></i> ${project.category.toUpperCase()}</span>
                  </div>

                  <h3 class="project-title">${project.name}</h3>
                  
                  ${impact ? `<div class="case-impact"><span>${impact}</span></div>` : ''}

                  <p class="project-summary">${project.desc}</p>

                  ${metricsHTML}

                  <div class="project-tags-list">
                    ${tagsHTML}
                  </div>

                  <div class="project-actions">
                    ${viewButton}
                    ${codeButton}
                    ${detailsButton}
                  </div>
                </div>
              </div>
            </div>`;
        }
    });

    // Append Terminal Git Stats / Plus More Card
    projectsHTML += `
    <div class="grid-item laravel react python php basic-web">
      <div class="project-card terminal-more-card" data-tilt data-tilt-max="3">
        <div class="terminal-header">
          <div class="browser-dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <span class="terminal-title">github.com/victoroki</span>
        </div>
        <div class="terminal-body">
          <div class="terminal-prompt-line">
            <span class="prompt-user">victor@edge</span>:<span class="prompt-dir">~/repos</span>$ git status
          </div>
          <p class="terminal-output">
            &gt; 20+ public repositories active<br />
            &gt; Microservices, Dockerfiles &amp; Terraform configurations<br />
            &gt; Status: Continuous Deployment Pipeline healthy
          </p>
          <div class="terminal-cta">
            <a href="https://github.com/victoroki" target="_blank" class="btn btn-accent">
              <i class="fab fa-github"></i>
              <span>Explore GitHub Repositories</span>
            </a>
          </div>
        </div>
      </div>
    </div>`;

    projectsContainer.innerHTML = projectsHTML;

    // Attach click handlers for detail modal buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const imgSrc = this.getAttribute('data-img');
            const title = this.getAttribute('data-title');
            const desc = this.getAttribute('data-desc');
            const impact = this.getAttribute('data-impact');
            const codeLink = this.getAttribute('data-code');
            const viewLink = this.getAttribute('data-view');
            const tags = this.getAttribute('data-tags');
            const metrics = this.getAttribute('data-metrics');
            const role = this.getAttribute('data-role');
            openModal(imgSrc, title, desc, impact, codeLink, viewLink, tags, metrics, role);
        });
    });

    // Linear / Raycast Mouse Spotlight Glow
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Initialize Isotope Grid
    var $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
            columnWidth: '.grid-sizer',
            gutter: 16
        }
    });

    // Re-layout when images are loaded
    $('.box-container img').on('load', function () {
        $grid.isotope('layout');
    });

    // Category Filter Button Clicks
    $('#filters').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });

    $('#filters').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function () {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });

    // Real-Time Search Filter
    $('#projectSearch').on('keyup', function () {
        var searchTerm = $(this).val().toLowerCase().trim();
        $grid.isotope({
            filter: function () {
                if (!searchTerm) return true;
                var text = $(this).text().toLowerCase();
                return text.indexOf(searchTerm) > -1;
            }
        });
    });

    // Micro-tilt effect
    if (window.VanillaTilt) {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 5,
            speed: 400,
            glare: true,
            "max-glare": 0.08
        });
    }
}

getProjects().then(data => {
    showProjects(data);
});