// Appointment Form Handler
(function() {
    'use strict';

    // Handle form submission
    function initAppointmentForm() {
        const form = document.querySelector('.book-your-consulting form');
        
        if (!form) return;

        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get form values
            const patientName = form.querySelector('input[placeholder="Patient name"]').value;
            const phoneNumber = form.querySelector('input[placeholder="Phone Number"]').value;
            const appointmentDate = form.querySelector('#datepicker').value;
            
            // Get selected values from nice-select dropdowns
            const departmentSelect = form.querySelector('.nice-select.custom-select.one');
            const hospitalSelect = form.querySelectorAll('.nice-select.custom-select.one')[1];
            const timeSelect = form.querySelector('.nice-select.custom-select.one:last-of-type');
            
            const department = departmentSelect ? departmentSelect.querySelector('.current').textContent : '';
            const hospital = hospitalSelect ? hospitalSelect.querySelector('.current').textContent : '';
            const preferredTime = timeSelect ? timeSelect.querySelector('.current').textContent : '';

            // Validate required fields
            if (!patientName || !phoneNumber) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            // Prepare data
            const appointmentData = {
                patientName: patientName,
                phoneNumber: phoneNumber,
                department: department,
                hospital: hospital,
                appointmentDate: appointmentDate,
                preferredTime: preferredTime
            };

            // Show loading state
            const submitBtn = form.querySelector('.rts-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Submitting...';
            submitBtn.style.pointerEvents = 'none';

            try {
                // Submit to Vercel function
                const response = await fetch('/api/submit-appointment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(appointmentData)
                });

                const result = await response.json();

                if (result.success) {
                    showNotification('Appointment request submitted successfully! We will contact you soon.', 'success');
                    form.reset();
                    
                    // Reset nice-select dropdowns to default
                    const niceSelects = form.querySelectorAll('.nice-select');
                    niceSelects.forEach(select => {
                        const firstOption = select.querySelector('.list li:first-child');
                        if (firstOption) {
                            select.querySelector('.current').textContent = firstOption.textContent;
                        }
                    });
                } else {
                    showNotification('Failed to submit appointment request. Please try again.', 'error');
                }

            } catch (error) {
                console.error('Error submitting appointment:', error);
                showNotification('An error occurred. Please try again later.', 'error');
            } finally {
                // Restore button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.style.pointerEvents = 'auto';
            }
        });
    }

    // Show notification to user
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `appointment-notification ${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAppointmentForm);
    } else {
        initAppointmentForm();
    }

})();
