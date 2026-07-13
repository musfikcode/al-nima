let currentHospital = null;

// Get hospital ID from URL
function getHospitalId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Load hospital data
async function loadHospitalDetails() {
    const hospitalId = getHospitalId();
    
    if (!hospitalId) {
        window.location.href = 'hospitals.html';
        return;
    }
    
    try {
        const response = await fetch('data/hospitals-data.json');
        const hospitals = await response.json();
        
        currentHospital = hospitals.find(h => h.id === hospitalId);
        
        if (!currentHospital) {
            window.location.href = 'hospitals.html';
            return;
        }
        
        displayHospitalDetails();
        
    } catch (error) {
        console.error('Error loading hospital details:', error);
        document.getElementById('hospitalContent').innerHTML = 
            '<div class="alert alert-danger">Error loading hospital details. Please try again later.</div>';
    }
}

// Display hospital details
function displayHospitalDetails() {
    document.title = `${currentHospital.name} - Medical & Health Care`;
    
    // Header
    document.getElementById('hospitalHeader').innerHTML = `
        <h1>${currentHospital.name}</h1>
        <div class="hospital-meta-header">
            <span><i class="fa-light fa-location-dot"></i> ${currentHospital.city}</span>
            <span><i class="fa-light fa-bed"></i> ${currentHospital.beds} Beds</span>
            <span><i class="fa-light fa-calendar"></i> Established ${currentHospital.established}</span>
            <span><i class="fa-light fa-hospital"></i> ${currentHospital.type}</span>
        </div>
    `;
    
    // Main content
    document.getElementById('hospitalContent').innerHTML = `
        ${renderAboutSection()}
        ${renderDepartmentsSection()}
        ${renderTeamSection()}
        ${renderInfrastructureSection()}
        ${renderFacilitiesSection()}
        ${renderCTASection()}
    `;
    
    // Sidebar
    document.getElementById('hospitalSidebar').innerHTML = `
        ${renderAddressCard()}
        ${renderQuickInfoCard()}
    `;
}

// Render sections
function renderAboutSection() {
    if (!currentHospital.about || currentHospital.about.length === 0) return '';
    
    // Split long text into paragraphs (every ~500 chars at sentence boundary)
    const paragraphs = splitIntoParagraphs(currentHospital.about, 500);
    
    return `
        <div class="info-card">
            <h2 class="section-title">About ${currentHospital.name}</h2>
            ${paragraphs.map(text => `<p class="about-text">${text}</p>`).join('')}
        </div>
    `;
}

// Helper function to split text into readable paragraphs
function splitIntoParagraphs(text, maxLength) {
    if (text.length <= maxLength) return [text];
    
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const paragraphs = [];
    let current = '';
    
    sentences.forEach(sentence => {
        if ((current + sentence).length > maxLength && current.length > 0) {
            paragraphs.push(current.trim());
            current = sentence;
        } else {
            current += sentence;
        }
    });
    
    if (current.trim()) {
        paragraphs.push(current.trim());
    }
    
    return paragraphs.length > 0 ? paragraphs : [text];
}

function renderDepartmentsSection() {
    if (!currentHospital.departments || currentHospital.departments.length === 0) return '';
    
    return `
        <div class="info-card">
            <h2 class="section-title">Departments & Specialties</h2>
            <div class="departments-grid">
                ${currentHospital.departments.map(dept => `
                    <div class="department-item">
                        <i class="fa-light fa-check-circle"></i> ${dept}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderTeamSection() {
    if (!currentHospital.teamInfo || currentHospital.teamInfo.length === 0) return '';
    
    const paragraphs = splitIntoParagraphs(currentHospital.teamInfo, 500);
    
    return `
        <div class="info-card">
            <h2 class="section-title">Team & Expertise</h2>
            ${paragraphs.map(text => `<p class="about-text">${text}</p>`).join('')}
        </div>
    `;
}

function renderInfrastructureSection() {
    if (!currentHospital.infrastructure || currentHospital.infrastructure.length === 0) return '';
    
    const paragraphs = splitIntoParagraphs(currentHospital.infrastructure, 500);
    
    return `
        <div class="info-card">
            <h2 class="section-title">Infrastructure & Technology</h2>
            ${paragraphs.map(text => `<p class="about-text">${text}</p>`).join('')}
        </div>
    `;
}

function renderFacilitiesSection() {
    const facilities = currentHospital.facilities;
    if (!facilities) return '';
    
    return `
        <div class="info-card">
            <h2 class="section-title">Facilities & Amenities</h2>
            
            ${renderFacilityCategory('Comfort During Stay', facilities.comfort, 'fa-bed')}
            ${renderFacilityCategory('Payment Options', facilities.money, 'fa-credit-card')}
            ${renderFacilityCategory('Food & Dining', facilities.food, 'fa-utensils')}
            ${renderFacilityCategory('Treatment Services', facilities.treatment, 'fa-stethoscope')}
        </div>
    `;
}

function renderFacilityCategory(title, items, icon) {
    if (!items || items.length === 0) return '';
    
    return `
        <div class="facility-section">
            <h4><i class="fa-light ${icon}"></i> ${title}</h4>
            <div class="facility-list">
                ${items.map(item => `
                    <div class="facility-item">
                        <i class="fa-light fa-check"></i>
                        <span>${item}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderCTASection() {
    return `
        <div class="cta-section">
            <h3>Ready to Book an Appointment?</h3>
            <p>Contact us today to schedule your visit or consultation</p>
            <a href="appoinment.html" class="btn-appointment">
                <i class="fa-light fa-calendar-check"></i> Book Appointment
            </a>
        </div>
    `;
}

function renderAddressCard() {
    return `
        <div class="info-card">
            <h3 class="section-title">Location</h3>
            <p><i class="fa-light fa-location-dot"></i> ${currentHospital.address}</p>
            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentHospital.address)}" 
               target="_blank" 
               class="btn btn-primary btn-sm mt-3">
                <i class="fa-light fa-map"></i> View on Map
            </a>
        </div>
    `;
}

function renderQuickInfoCard() {
    return `
        <div class="info-card">
            <h3 class="section-title">Quick Info</h3>
            <div style="line-height: 2;">
                <p><strong>City:</strong> ${currentHospital.city}</p>
                <p><strong>Beds:</strong> ${currentHospital.beds}</p>
                <p><strong>Established:</strong> ${currentHospital.established}</p>
                <p><strong>Type:</strong> ${currentHospital.type}</p>
                <p><strong>Departments:</strong> ${currentHospital.departments.length}</p>
            </div>
        </div>
    `;
}

// Initialize
document.addEventListener('DOMContentLoaded', loadHospitalDetails);
