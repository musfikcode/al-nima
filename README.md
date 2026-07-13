# Al-Nima Medical Website

A comprehensive static HTML medical/healthcare website template featuring multiple page variations for different medical specialties and services.

## 🏥 Overview

Al-Nima is a modern, responsive medical website template designed for hospitals, clinics, and healthcare providers. It includes specialized pages for various medical departments, doctor profiles, appointment booking, and patient services.

## ✨ Features

- **Responsive Design**: Fully responsive layout using Bootstrap grid system
- **Multiple Specialties**: Dedicated pages for 25+ medical specialties
- **Modern UI**: Clean, professional design with FontAwesome icons
- **Appointment System**: Built-in appointment booking forms
- **Doctor Profiles**: Detailed doctor listing and profile pages
- **Blog System**: Blog listing and detail pages for medical content
- **Service Pages**: Comprehensive service descriptions for each specialty
- **Contact Forms**: Multiple contact and inquiry forms
- **Image Optimization**: WebP format support for faster loading

## 🏗️ Project Structure

```
├── assets/
│   ├── css/           # Stylesheets and plugins
│   ├── images/        # Organized by section (banner, blog, services, etc.)
│   ├── fonts/         # FontAwesome font files
│   └── js/            # JavaScript files
├── api/               # API endpoints (Vercel serverless functions)
├── data/              # Data files
├── scripts/           # Utility scripts
├── *.html             # HTML pages (60+ pages)
└── vercel.json        # Vercel deployment configuration
```

## 🩺 Medical Specialties Covered

- Cardiology
- Neurology & Neurosurgery
- Orthopedics & Joint Replacement
- Oncology (Medical, Surgical, Radiation)
- Gastroenterology
- Nephrology & Kidney Transplant
- Obstetrics & Gynaecology
- Pediatric Care & Surgery
- Dental Care & Dentistry
- Ophthalmology & Vision Care
- ENT & Cochlear Implant
- Dermatology & Cosmetology
- IVF & Reproductive Medicine
- And many more...

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- A local web server (optional, for development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/al-nima-medical-website.git
cd al-nima-medical-website
```

2. Open `index.html` in your browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

3. Visit `http://localhost:8000` in your browser

## 📄 Key Pages

- **Home Pages**: `index.html`, `index-two.html` through `index-nine.html` (9 variations)
- **About**: `about.html`
- **Services**: `services.html`, `service-[specialty].html` (25+ specialty pages)
- **Doctors**: `doctors-one.html`, `doctors-two.html`, `doctor-details.html`
- **Appointments**: `appoinment.html`, `appointment-form.html`
- **Blog**: `blog.html`, `blog-list.html`, `blog-details.html`
- **Contact**: `contactus.html`
- **Hospitals**: `hospitals.html`, `hospital-details.html`

## 🎨 Customization

### Styling
- Main stylesheet: `assets/css/style.css`
- Plugin styles: `assets/css/plugins/`
- Vendor libraries: `assets/css/vendor/`

### Images
Replace images in `assets/images/` subdirectories:
- `banner/` - Hero section images
- `about/` - About section images
- `appoinment/` - Appointment page images
- `blog/` - Blog post images
- And more...

### Content
Edit HTML files directly. The template uses:
- Bootstrap grid system for layout
- FontAwesome icons for UI elements
- Semantic HTML5 structure

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
1. Connect your GitHub repository
2. Deploy with default settings (no build command needed)

### GitHub Pages
1. Go to repository Settings > Pages
2. Select branch and root folder
3. Save and wait for deployment

## 🔧 Technologies Used

- HTML5
- CSS3
- JavaScript
- Bootstrap (Grid System)
- FontAwesome Icons
- jQuery
- Vercel (for serverless functions)

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 File Naming Conventions

- HTML files: kebab-case (`doctor-details.html`)
- Service pages: `service-[specialty].html`
- Detail pages: `[section]-details.html`
- Index variations: `index-[number].html`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is available for personal and commercial use.

## 📧 Contact

For questions or support, please open an issue in the GitHub repository.

---

**Note**: This is a static HTML template. For dynamic functionality, you may need to integrate with a backend service or CMS.
