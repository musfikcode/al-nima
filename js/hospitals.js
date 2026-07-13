let hospitalsData = [];
let allDepartments = new Set();

// Load hospital data
async function loadHospitals() {
    try {
        const response = await fetch('data/hospitals-data.json');
        hospitalsData = await response.json();
        
        // Extract all unique departments
        hospitalsData.forEach(hospital => {
            hospital.departments.forEach(dept => allDepartments.add(dept));
        });
        
        populateDepartmentFilter();
        
        // Check for URL parameters and apply filters
        applyUrlFilters();
        
        displayHospitals(hospitalsData);
        
    } catch (error) {
        console.error('Error loading hospitals:', error);
        document.getElementById('hospitalsList').innerHTML = 
            '<div class="alert alert-danger">Error loading hospital data. Please try again later.</div>';
    }
}

// Apply filters from URL parameters
function applyUrlFilters() {
    const urlParams = new URLSearchParams(window.location.search);
    const department = urlParams.get('department');
    const hospitalId = urlParams.get('hospital');
    
    if (department) {
        const departmentFilter = document.getElementById('departmentFilter');
        if (departmentFilter) {
            departmentFilter.value = department;
        }
    }
    
    if (hospitalId) {
        const searchInput = document.getElementById('searchInput');
        const hospital = hospitalsData.find(h => h.id === hospitalId);
        if (searchInput && hospital) {
            searchInput.value = hospital.name;
        }
    }
    
    // Trigger filter if any parameters were set
    if (department || hospitalId) {
        setTimeout(filterHospitals, 100);
    }
}

// Populate department filter dropdown
function populateDepartmentFilter() {
    const departmentFilter = document.getElementById('departmentFilter');
    const sortedDepartments = Array.from(allDepartments).sort();
    
    sortedDepartments.forEach(dept => {
        const option = document.createElement('option');
        option.value = dept;
        option.textContent = dept;
        departmentFilter.appendChild(option);
    });
}

// Display hospitals
function displayHospitals(hospitals) {
    const hospitalsList = document.getElementById('hospitalsList');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.getElementById('resultsCount');
    
    if (hospitals.length === 0) {
        hospitalsList.innerHTML = '';
        noResults.style.display = 'block';
        resultsCount.textContent = '';
        return;
    }
    
    noResults.style.display = 'none';
    resultsCount.textContent = `Showing ${hospitals.length} hospital${hospitals.length !== 1 ? 's' : ''}`;
    
    hospitalsList.innerHTML = hospitals.map(hospital => `
        <div class="hospital-card">
            <h3>${hospital.name}</h3>
            <div class="hospital-meta">
                <span><i class="fa-light fa-location-dot"></i> ${hospital.city}</span>
                <span><i class="fa-light fa-bed"></i> ${hospital.beds} Beds</span>
                <span><i class="fa-light fa-calendar"></i> Est. ${hospital.established}</span>
                <span><i class="fa-light fa-hospital"></i> ${hospital.type}</span>
            </div>
            <p class="hospital-description">${truncateText(hospital.description, 200)}</p>
            <div class="department-tags">
                ${hospital.departments.slice(0, 5).map(dept => 
                    `<span class="department-tag">${dept}</span>`
                ).join('')}
                ${hospital.departments.length > 5 ? 
                    `<span class="department-tag">+${hospital.departments.length - 5} more</span>` : ''}
            </div>
            <a href="hospital-details.html?id=${hospital.id}" class="view-details-btn">
                View Details <i class="fa-light fa-arrow-right"></i>
            </a>
        </div>
    `).join('');
}

// Truncate text
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

// Filter hospitals
function filterHospitals() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const cityFilter = document.getElementById('cityFilter').value;
    const departmentFilter = document.getElementById('departmentFilter').value;
    
    const filtered = hospitalsData.filter(hospital => {
        const matchesSearch = hospital.name.toLowerCase().includes(searchTerm) ||
                            hospital.description.toLowerCase().includes(searchTerm);
        const matchesCity = !cityFilter || hospital.city === cityFilter;
        const matchesDepartment = !departmentFilter || 
                                 hospital.departments.includes(departmentFilter);
        
        return matchesSearch && matchesCity && matchesDepartment;
    });
    
    displayHospitals(filtered);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadHospitals();
    
    document.getElementById('searchInput').addEventListener('input', filterHospitals);
    document.getElementById('cityFilter').addEventListener('change', filterHospitals);
    document.getElementById('departmentFilter').addEventListener('change', filterHospitals);
});
