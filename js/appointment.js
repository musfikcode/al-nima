// Appointment booking system
class AppointmentSystem {
    constructor() {
        this.cities = [];
        this.hospitals = [];
        this.departments = [];
        this.doctors = [];
        this.loadData();
        this.initializeSelectors();
    }

    async loadData() {
        try {
            // Load directly from JSON files
            this.cities = await this.fetchJSON('data/cities.json');
            this.hospitals = await this.fetchJSON('data/hospitals.json');
            this.departments = await this.fetchJSON('data/departments.json');
            this.doctors = await this.fetchJSON('data/doctors.json');
            
            this.populateCities();
        } catch (error) {
            console.error('Error loading data:', error);
            alert('Error loading hospital data. Please make sure the data files are available.');
        }
    }

    async fetchJSON(url) {
        const response = await fetch(url);
        return response.json();
    }

    initializeSelectors() {
        const citySelect = document.getElementById('citySelect');
        const hospitalSelect = document.getElementById('hospitalSelect');
        const departmentSelect = document.getElementById('departmentSelect');
        const doctorSelect = document.getElementById('doctorSelect');

        if (citySelect) {
            citySelect.addEventListener('change', () => this.onCityChange());
        }
        if (hospitalSelect) {
            hospitalSelect.addEventListener('change', () => this.onHospitalChange());
        }
        if (departmentSelect) {
            departmentSelect.addEventListener('change', () => this.onDepartmentChange());
        }

        // Initialize appointment form
        const appointmentForm = document.getElementById('appointmentForm');
        if (appointmentForm) {
            appointmentForm.addEventListener('submit', (e) => this.handleAppointmentSubmit(e));
        }
    }

    populateCities() {
        const citySelect = document.getElementById('citySelect');
        if (!citySelect) return;

        citySelect.innerHTML = '<option value="">Select City</option>';
        this.cities.forEach(city => {
            citySelect.innerHTML += `<option value="${city.id}">${city.name}</option>`;
        });
    }

    onCityChange() {
        const cityId = document.getElementById('citySelect').value;
        const hospitalSelect = document.getElementById('hospitalSelect');
        
        // Clear dependent selects
        this.clearSelect('hospitalSelect');
        this.clearSelect('departmentSelect');
        this.clearSelect('doctorSelect');

        if (!cityId) return;

        // Populate hospitals for selected city
        const cityHospitals = this.hospitals.filter(h => h.cityId === cityId);
        hospitalSelect.innerHTML = '<option value="">Select Hospital</option>';
        cityHospitals.forEach(hospital => {
            hospitalSelect.innerHTML += `<option value="${hospital.id}">${hospital.name}</option>`;
        });
    }

    onHospitalChange() {
        const hospitalId = document.getElementById('hospitalSelect').value;
        const departmentSelect = document.getElementById('departmentSelect');
        
        // Clear dependent selects
        this.clearSelect('departmentSelect');
        this.clearSelect('doctorSelect');

        if (!hospitalId) return;

        // Populate departments for selected hospital
        const hospitalDepartments = this.departments.filter(d => d.hospitalId === hospitalId);
        departmentSelect.innerHTML = '<option value="">Select Department</option>';
        hospitalDepartments.forEach(department => {
            departmentSelect.innerHTML += `<option value="${department.id}">${department.name}</option>`;
        });
    }

    onDepartmentChange() {
        const departmentId = document.getElementById('departmentSelect').value;
        const doctorSelect = document.getElementById('doctorSelect');
        
        this.clearSelect('doctorSelect');

        if (!departmentId) return;

        // Populate doctors for selected department
        const departmentDoctors = this.doctors.filter(d => d.departmentId === departmentId);
        doctorSelect.innerHTML = '<option value="">Select Doctor</option>';
        departmentDoctors.forEach(doctor => {
            doctorSelect.innerHTML += `<option value="${doctor.id}">${doctor.name} - ${doctor.specialization}</option>`;
        });
    }

    clearSelect(selectId) {
        const select = document.getElementById(selectId);
        if (select) {
            select.innerHTML = '<option value="">Select...</option>';
        }
    }

    async handleAppointmentSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const appointmentData = {
            // Patient Information
            patientName: formData.get('patientName'),
            patientEmail: formData.get('patientEmail'),
            patientPhone: formData.get('patientPhone'),
            patientAge: formData.get('patientAge'),
            patientGender: formData.get('patientGender'),
            
            // Selection Information
            cityId: formData.get('cityId'),
            hospitalId: formData.get('hospitalId'),
            departmentId: formData.get('departmentId'),
            doctorId: formData.get('doctorId'),
            
            // Appointment Details
            preferredDate: formData.get('preferredDate'),
            preferredTime: formData.get('preferredTime'),
            urgency: formData.get('urgency'),
            symptoms: formData.get('symptoms'),
            medicalHistory: formData.get('medicalHistory'),
            
            // Additional Info
            submittedAt: new Date().toISOString(),
            status: 'pending'
        };

        // Add readable names for better display
        appointmentData.cityName = this.cities.find(c => c.id === appointmentData.cityId)?.name || '';
        appointmentData.hospitalName = this.hospitals.find(h => h.id === appointmentData.hospitalId)?.name || '';
        appointmentData.departmentName = this.departments.find(d => d.id === appointmentData.departmentId)?.name || '';
        appointmentData.doctorName = this.doctors.find(d => d.id === appointmentData.doctorId)?.name || '';

        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        try {
            // Show loading state
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;

            // Send directly to Google Sheets via Apps Script Web App
            await this.sendToGoogleSheets(appointmentData);
            
            // Show success message
            this.showSuccessMessage();
            e.target.reset();
            this.clearAllSelects();
            
        } catch (error) {
            console.error('Error submitting appointment:', error);
            this.showErrorMessage();
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    async sendToGoogleSheets(appointmentData) {
        // ─────────────────────────────────────────────────────────────────
        // STEP: Paste your Google Apps Script Web App URL below.
        // See GOOGLE_SHEETS_SETUP.md for step-by-step instructions.
        // ─────────────────────────────────────────────────────────────────
        const APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';

        if (APPS_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
            throw new Error('Google Apps Script URL not configured. See GOOGLE_SHEETS_SETUP.md.');
        }

        // Google Apps Script does not return CORS headers for all response types,
        // so we use 'no-cors'. The row is still written to the sheet on the server side.
        await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appointmentData)
        });
        // With no-cors, the response is opaque — we can't read it.
        // The Apps Script always writes the row; any network error will throw above.
    }

    clearAllSelects() {
        this.clearSelect('citySelect');
        this.clearSelect('hospitalSelect');
        this.clearSelect('departmentSelect');
        this.clearSelect('doctorSelect');
    }

    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'alert alert-success';
        message.innerHTML = `
            <strong>Success!</strong> Your appointment request has been submitted successfully. 
            Our team will contact you within 24 hours to confirm the appointment.
        `;
        
        const form = document.getElementById('appointmentForm');
        form.parentNode.insertBefore(message, form);
        
        setTimeout(() => message.remove(), 5000);
        
        // Scroll to top to show message
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showErrorMessage() {
        const message = document.createElement('div');
        message.className = 'alert alert-danger';
        message.innerHTML = `
            <strong>Error!</strong> There was a problem submitting your request. 
            Please try again or contact us directly.
        `;
        
        const form = document.getElementById('appointmentForm');
        form.parentNode.insertBefore(message, form);
        
        setTimeout(() => message.remove(), 5000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AppointmentSystem();
});