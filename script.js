// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active', 'bg-blue-600', 'text-white'));
                filterButtons.forEach(btn => btn.classList.add('bg-gray-200', 'hover:bg-gray-300'));
                this.classList.add('active', 'bg-blue-600', 'text-white');
                this.classList.remove('bg-gray-200', 'hover:bg-gray-300');
                
                // Filter projects
                const filter = this.dataset.filter;
                const projects = document.querySelectorAll('.project-item');
                
                projects.forEach(project => {
                    if (filter === 'all' || project.dataset.category === filter) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });
    }

    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitText = document.getElementById('submitText');
            const spinner = document.getElementById('spinner');
            
            submitText.textContent = 'Enviando...';
            spinner.classList.remove('hidden');
            
            // Simulate form submission
            setTimeout(() => {
                submitText.textContent = 'Mensaje enviado';
                spinner.classList.add('hidden');
                
                // Reset form after 2 seconds
                setTimeout(() => {
                    this.reset();
                    submitText.textContent = 'Enviar mensaje';
                }, 2000);
            }, 1500);
        });
    }

    // Load header and footer components with correct relative paths
    loadComponent('header-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');
});

function loadComponent(placeholderId, filePath) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;

    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            placeholder.outerHTML = data;
        })
        .catch(error => {
            console.error('Error loading component:', error);
        });
}