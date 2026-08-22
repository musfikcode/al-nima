import os
import glob

missing_files = [
    "appointment-form.html",
    "hospital-details.html",
    "hospitals.html",
    "service-cardiac-thoracic-and-vascular-surgery.html",
    "service-cardiology.html",
    "service-cosmetic-and-plastic-surgery.html",
    "service-dentistry.html",
    "service-dermatology-and-cosmetology.html",
    "service-ent-and-cochlear-implant.html",
    "service-gastroenterology.html",
    "service-general-and-minimally-invasive-surgery.html",
    "service-gynaecological-oncology.html",
    "service-haemato-oncology-and-bmt.html",
    "service-ivf-reproductive-medicine.html",
    "service-liver-transplant-and-gi-and-hpb-surgery.html",
    "service-medical-oncology.html",
    "service-nephrology.html",
    "service-neuro-surgery.html",
    "service-neurointerventional-surgery.html",
    "service-neurology.html",
    "service-obstetrics-and-gynaecology.html",
    "service-oncology.html",
    "service-opthamology.html",
    "service-orthopedic-and-joint-replacement.html",
    "service-paediatric-cardiac-care.html",
    "service-paediatric-surgery.html",
    "service-radiation-oncology.html",
    "service-spine-and-scoliosis-surgery.html",
    "service-surgical-oncology.html",
    "service-urology-and-kidney-transplant.html",
    "services.html"
]

scripts_to_add = """
    <script src="assets/js/plugins/jquery.js"></script>
    <script src="assets/js/plugins/jquery-ui.js"></script>
    <script src="assets/js/vendor/waw.js"></script>
    <script src="assets/js/plugins/swiper.js"></script>
    <script src="assets/js/plugins/metismenu.js"></script>
    <script src="assets/js/plugins/jarallax.js"></script>
    <script src="assets/js/plugins/smooth-scroll.js"></script>
    <script src="assets/js/plugins/magnifying-popup.js"></script>
    <script src="assets/js/vendor/bootstrap.min.js"></script>
    <!-- main js here -->
    <script src="assets/js/main.js"></script>
"""

import re

for filename in missing_files:
    with open(filename, 'r') as f:
        content = f.read()
    
    # Remove old jquery and bootstrap if they exist exactly like this
    content = content.replace('<script src="assets/js/vendor/jquery.min.js"></script>\n    <script src="assets/js/vendor/bootstrap.min.js"></script>\n', '')
    content = content.replace('<script src="assets/js/vendor/jquery.min.js"></script>\n    <script src="assets/js/vendor/bootstrap.min.js"></script>', '')
    content = content.replace('<script src="assets/js/vendor/jquery.min.js"></script>\n<script src="assets/js/vendor/bootstrap.min.js"></script>\n', '')
    
    # Replace progress area end with progress area end + scripts
    if "<!-- progress area end -->" in content:
        content = content.replace("<!-- progress area end -->", "<!-- progress area end -->\n" + scripts_to_add)
        
        with open(filename, 'w') as f:
            f.write(content)
        print(f"Fixed {filename}")
    else:
        print(f"Could not find progress area end in {filename}")

