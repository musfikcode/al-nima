// Hero section hospital finder functionality
document.addEventListener('DOMContentLoaded', function() {
    const findHospitalsBtn = document.querySelector('.select-area-down .rts-btn.btn-primary');
    
    if (findHospitalsBtn) {
        findHospitalsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get selected values
            const serviceSelect = document.querySelector('select[name="my_select"]');
            const hospitalSelect = document.querySelector('select[name="my_select2"]');
            
            const selectedService = serviceSelect ? serviceSelect.value : '';
            const selectedHospital = hospitalSelect ? hospitalSelect.value : '';
            
            // Build URL with query parameters
            let url = 'hospitals.html';
            const params = new URLSearchParams();
            
            if (selectedService) {
                params.append('department', selectedService);
            }
            
            if (selectedHospital) {
                params.append('hospital', selectedHospital);
            }
            
            // Navigate to hospitals page with filters
            if (params.toString()) {
                url += '?' + params.toString();
            }
            
            window.location.href = url;
        });
    }
});
