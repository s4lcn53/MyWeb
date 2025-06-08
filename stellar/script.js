document.addEventListener('DOMContentLoaded', function() {
    // Navigation between sections
    const navButtons = document.querySelectorAll('.nav-button');
    const contentSections = document.querySelectorAll('.content-section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Hide all sections
            contentSections.forEach(section => section.classList.add('hidden'));
            // Show the selected section
            const sectionId = `${button.dataset.section}-section`;
            document.getElementById(sectionId).classList.remove('hidden');
        });
    });
    
    // Task completion toggle
    const taskCheckboxes = document.querySelectorAll('.task-item input[type="checkbox"]');
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            this.parentElement.classList.toggle('completed');
        });
    });
    
    // Modal functionality
    const addButtons = document.querySelectorAll('.add-button');
    const modal = document.getElementById('task-modal');
    const cancelButton = document.querySelector('.cancel-button');
    
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });
    });
    
    cancelButton.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
    
    // Initialize calendar
    initializeCalendar();
});

function initializeCalendar() {
    const calendarGrid = document.querySelector('.calendar-grid');
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Add day headers
    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.textContent = day;
        dayHeader.style.fontWeight = '600';
        dayHeader.style.color = 'var(--text-light)';
        calendarGrid.appendChild(dayHeader);
    });
    
    // Get current date info
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const today = currentDate.getDate();
    
    // Get first day of month
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    
    // Get days in month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('calendar-day');
        calendarGrid.appendChild(emptyCell);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('calendar-day');
        dayCell.textContent = day;
        
        if (day === today) {
            dayCell.classList.add('today');
        }
        
        calendarGrid.appendChild(dayCell);
    }
}