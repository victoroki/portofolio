$(document).ready(function () {
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });
});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Projects | Portfolio Victor Mongare";
            $("#favicon").attr("href", "/assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "/assets/images/favhand.png");
        }
    });

// Project Modal functionality
const modal = document.getElementById("projectModal");
const modalImg = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalCodeLink = document.getElementById("modalCodeLink");
const notDeployedMsg = document.getElementById("notDeployedMsg");
const closeModal = document.querySelector(".close-modal");

function openModal(imgSrc, title, desc, codeLink) {
    modal.style.display = "block";
    modalImg.src = imgSrc;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;

    // Show/hide code link based on availability
    if (codeLink && codeLink !== "#") {
        modalCodeLink.href = codeLink;
        modalCodeLink.style.display = "inline-block";
    } else {
        modalCodeLink.style.display = "none";
    }

    // Always show "not deployed" message in modal since it only opens for non-live projects
    notDeployedMsg.style.display = "block";
}

closeModal.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// fetch projects start
function getProjects() {
    return fetch("projects.json")
        .then(response => response.json())
        .then(data => {
            // Sort projects: those with actual view links (not "#") come first
            return data.sort((a, b) => {
                const aHasLink = a.links.view !== "#";
                const bHasLink = b.links.view !== "#";

                if (aHasLink && !bHasLink) return -1;
                if (!aHasLink && bHasLink) return 1;
                return 0;
            });
        });
}

function showProjects(projects) {
    let projectsContainer = document.querySelector(".work .box-container");
    let projectsHTML = "";

    projects.forEach(project => {
        // Determine if project has a live view link
        const hasViewLink = project.links.view !== "#";
        const hasCodeLink = project.links.code !== "#";

        // Create the appropriate button for viewing
        const viewButton = hasViewLink
            ? `<a href="${project.links.view}" class="btn" target="_blank">
                 <i class="fas fa-external-link-alt"></i> View Live
               </a>`
            : `<a href="#" class="btn view-btn" data-img="/assets/images/projects/${project.image}.png" 
                 data-title="${project.name}" data-desc="${project.desc}" 
                 data-code="${project.links.code}">
                 <i class="fas fa-image"></i> Image
               </a>`;

        // Create the code button
        const codeButton = hasCodeLink
            ? `<a href="${project.links.code}" class="btn" target="_blank">
                 Code <i class="fas fa-code"></i>
               </a>`
            : '';

        projectsHTML += `
        <div class="grid-item ${project.category}">
          <div class="box tilt">
            <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
            <div class="content">
              <div class="tag">
                <h3>${project.name}</h3>
              </div>
              <div class="desc">
                <p>${project.desc}</p>
                <div class="btns">
                  ${viewButton}
                  ${codeButton}
                </div>
              </div>
            </div>
          </div>
        </div>`;
    });

    projectsContainer.innerHTML = projectsHTML;

    // Add click event listeners for modal view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const imgSrc = this.getAttribute('data-img');
            const title = this.getAttribute('data-title');
            const desc = this.getAttribute('data-desc');
            const codeLink = this.getAttribute('data-code');
            openModal(imgSrc, title, desc, codeLink);
        });
    });

    // Initialize Isotope after projects are loaded
    var $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        percentPosition: false,
        fitRows: {
            gutter: 35  // 3.5rem gap between items
        }
    });

    // Filter items on button click
    $('.button-group').on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });

    // Add active class to buttons
    $('.button-group').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function () {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });

}

getProjects().then(data => {
    showProjects(data);
})
// fetch projects end

// Start of Tawk.to Live Chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
// End of Tawk.to Live Chat

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}