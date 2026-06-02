// portfolio.js - Portfolio State, Validation, and Dynamic Rendering

document.addEventListener('DOMContentLoaded', () => {
    const projectForm = document.getElementById('project-form');
    const projectsTableBody = document.getElementById('projects-table-body');
    const totalProjectsCount = document.getElementById('total-projects-count');
    
    // Default initial projects if localStorage is empty
    const defaultProjects = [
        {
            id: 'default-1',
            name: 'CampusGuide Portal v1',
            description: 'A responsive academic platform designed for event listings, timetables, and interactive campus updates.',
            url: 'https://campusguide.example.com',
            tech: 'html',
            date: '2026-03-15',
            image: 'Windows.jpg' // Local asset
        },
        {
            id: 'default-2',
            name: 'Virtual Chatbot Agent',
            description: 'A glassmorphic AI-powered virtual helper chatbot providing student queries with micro-animations.',
            url: 'https://chatbot.example.com',
            tech: 'javascript',
            date: '2026-04-20',
            image: 'cat.jpg' // Local asset
        }
    ];

    // Load projects from localStorage
    let projects = [];
    try {
        const stored = localStorage.getItem('portfolio_projects');
        if (stored) {
            projects = JSON.parse(stored);
        } else {
            projects = [...defaultProjects];
            localStorage.setItem('portfolio_projects', JSON.stringify(projects));
        }
    } catch (e) {
        console.error('Could not load stored projects, using defaults', e);
        projects = [...defaultProjects];
    }

    // Render Table Rows
    function renderProjectsTable(highlightId = null) {
        if (!projectsTableBody) return;
        
        projectsTableBody.innerHTML = '';
        
        if (projects.length === 0) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.colSpan = 6;
            td.className = 'table-fallback-row';
            td.textContent = 'No projects added yet. Use the form to submit your first project!';
            tr.appendChild(td);
            projectsTableBody.appendChild(tr);
            
            if (totalProjectsCount) totalProjectsCount.textContent = '0';
            return;
        }

        projects.forEach(project => {
            const tr = document.createElement('tr');
            if (highlightId && project.id === highlightId) {
                tr.className = 'newly-added-row';
            }

            // 1. Thumbnail Image cell
            const tdImage = document.createElement('td');
            const img = document.createElement('img');
            img.src = project.image;
            img.alt = `${project.name} Thumbnail`;
            img.className = 'project-thumbnail';
            img.setAttribute('loading', 'lazy');
            tdImage.appendChild(img);
            tr.appendChild(tdImage);

            // 2. Project Name cell
            const tdName = document.createElement('td');
            tdName.style.fontWeight = '600';
            tdName.textContent = project.name;
            tr.appendChild(tdName);

            // 3. Description cell
            const tdDesc = document.createElement('td');
            tdDesc.textContent = project.description;
            tr.appendChild(tdDesc);

            // 4. Technology cell
            const tdTech = document.createElement('td');
            const spanTech = document.createElement('span');
            spanTech.className = `tech-badge ${project.tech}`;
            
            // Map tech slug to pretty text
            const techMap = {
                html: 'HTML5',
                css: 'CSS3',
                javascript: 'JavaScript',
                react: 'React',
                python: 'Python',
                java: 'Java',
                git: 'Git / GitHub'
            };
            spanTech.textContent = techMap[project.tech] || project.tech.toUpperCase();
            tdTech.appendChild(spanTech);
            tr.appendChild(tdTech);

            // 5. URL cell
            const tdUrl = document.createElement('td');
            const aUrl = document.createElement('a');
            aUrl.href = project.url;
            aUrl.className = 'project-link';
            aUrl.target = '_blank';
            aUrl.rel = 'noopener noreferrer';
            
            const spanIcon = document.createElement('span');
            spanIcon.ariaHidden = 'true';
            spanIcon.textContent = '🔗 ';
            
            const spanText = document.createElement('span');
            spanText.textContent = 'Visit Site';
            
            aUrl.appendChild(spanIcon);
            aUrl.appendChild(spanText);
            tdUrl.appendChild(aUrl);
            tr.appendChild(tdUrl);

            // 6. Date cell
            const tdDate = document.createElement('td');
            // Format date nicely
            try {
                const dateObj = new Date(project.date);
                tdDate.textContent = dateObj.toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
            } catch (e) {
                tdDate.textContent = project.date;
            }
            tr.appendChild(tdDate);

            projectsTableBody.appendChild(tr);
        });

        // Update total project counter
        if (totalProjectsCount) {
            totalProjectsCount.textContent = projects.length.toString();
        }
    }

    // Initialize Table
    renderProjectsTable();

    // --- Validation Rules & Live Feedback ---

    const fields = {
        name: {
            input: document.getElementById('project-name'),
            error: document.getElementById('name-error'),
            validate: (value) => {
                if (!value.trim()) return 'Project name is required.';
                if (value.trim().length < 3) return 'Project name must be at least 3 characters.';
                const namePattern = /^[A-Za-z0-9\s\-_.]+$/;
                if (!namePattern.test(value)) return 'Only letters, numbers, spaces, dashes, dots, and underscores are allowed.';
                return '';
            }
        },
        desc: {
            input: document.getElementById('project-desc'),
            error: document.getElementById('desc-error'),
            validate: (value) => {
                if (!value.trim()) return 'Project description is required.';
                if (value.trim().length < 10) return 'Description must be at least 10 characters.';
                return '';
            }
        },
        url: {
            input: document.getElementById('project-url'),
            error: document.getElementById('url-error'),
            validate: (value) => {
                if (!value.trim()) return 'Project URL is required.';
                try {
                    const url = new URL(value);
                    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
                        return 'URL must start with http:// or https://';
                    }
                } catch (_) {
                    return 'Please enter a valid absolute URL (e.g. https://domain.com)';
                }
                return '';
            }
        },
        tech: {
            input: document.getElementById('project-tech'),
            error: document.getElementById('tech-error'),
            validate: (value) => {
                if (!value) return 'Please select the primary technology used.';
                return '';
            }
        },
        date: {
            input: document.getElementById('project-date'),
            error: document.getElementById('date-error'),
            validate: (value) => {
                if (!value) return 'Completion date is required.';
                
                const selectedDate = new Date(value);
                const today = new Date();
                
                // Clear hours for accurate calendar day comparisons
                selectedDate.setHours(0,0,0,0);
                today.setHours(0,0,0,0);
                
                if (selectedDate > today) {
                    return 'Completion date cannot be in the future.';
                }
                return '';
            }
        },
        image: {
            input: document.getElementById('project-image'),
            error: document.getElementById('image-error'),
            validate: (value, fileInput) => {
                if (fileInput && fileInput.files.length === 0) {
                    return 'Please upload a project thumbnail image.';
                }
                if (fileInput && fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    if (!file.type.startsWith('image/')) {
                        return 'File must be an image (PNG, JPG, SVG, WebP, etc.).';
                    }
                    const maxSize = 2 * 1024 * 1024; // 2MB
                    if (file.size > maxSize) {
                        return 'Image size must not exceed 2MB.';
                    }
                }
                return '';
            }
        }
    };

    // Live validation listener registration
    Object.keys(fields).forEach(key => {
        const field = fields[key];
        if (!field.input) return;

        const handleValidation = () => {
            const errorMsg = field.validate(field.input.value, field.input);
            if (errorMsg) {
                showError(field, errorMsg);
            } else {
                showSuccess(field);
            }
        };

        // Attach listeners for both instant feedback (input) and focus-out (blur)
        field.input.addEventListener('input', handleValidation);
        field.input.addEventListener('blur', handleValidation);
        if (field.input.tagName === 'SELECT' || field.input.type === 'file') {
            field.input.addEventListener('change', handleValidation);
        }
    });

    function showError(field, message) {
        field.error.textContent = message;
        field.error.classList.add('visible');
        field.input.classList.add('input-error');
        field.input.classList.remove('input-success');
        field.input.setAttribute('aria-invalid', 'true');
    }

    function showSuccess(field) {
        field.error.textContent = '';
        field.error.classList.remove('visible');
        field.input.classList.remove('input-error');
        field.input.classList.add('input-success');
        field.input.setAttribute('aria-invalid', 'false');
    }

    // Reset form handler
    if (projectForm) {
        projectForm.addEventListener('reset', () => {
            Object.keys(fields).forEach(key => {
                const field = fields[key];
                if (!field.input) return;
                
                field.error.textContent = '';
                field.error.classList.remove('visible');
                field.input.classList.remove('input-error');
                field.input.classList.remove('input-success');
                field.input.removeAttribute('aria-invalid');
            });
            
            // Set focus back to first element
            setTimeout(() => {
                if (fields.name.input) fields.name.input.focus();
            }, 10);
        });

        // Form Submit Handler
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let hasErrors = false;
            let firstInvalidInput = null;

            // Trigger validation for all fields
            Object.keys(fields).forEach(key => {
                const field = fields[key];
                if (!field.input) return;

                const errorMsg = field.validate(field.input.value, field.input);
                if (errorMsg) {
                    showError(field, errorMsg);
                    hasErrors = true;
                    if (!firstInvalidInput) {
                        firstInvalidInput = field.input;
                    }
                } else {
                    showSuccess(field);
                }
            });

            // Prevent submission and shift focus to the first invalid field (a11y best practice!)
            if (hasErrors) {
                if (firstInvalidInput) {
                    firstInvalidInput.focus();
                }
                return;
            }

            // Read image file and assemble new project object
            const fileInput = fields.image.input;
            const file = fileInput.files[0];
            
            const reader = new FileReader();
            reader.onload = function(event) {
                const base64Image = event.target.result;
                
                // Construct new project
                const newProject = {
                    id: 'proj-' + Date.now(),
                    name: fields.name.input.value.trim(),
                    description: fields.desc.input.value.trim(),
                    url: fields.url.input.value.trim(),
                    tech: fields.tech.input.value,
                    date: fields.date.input.value,
                    image: base64Image
                };

                // Add to state and save
                projects.unshift(newProject); // Add at the beginning of list
                try {
                    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
                } catch (err) {
                    console.error('Could not save projects to localStorage:', err);
                }

                // Re-render and flash newly added row
                renderProjectsTable(newProject.id);

                // Reset form
                projectForm.reset();
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        });
    }
});
