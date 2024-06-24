let resume = {
    firstName: '',
    lastName: '',
    headline: '',
    email: '',
    website: '',
    phone: '',
    address: '',
    skills: [],
    experiences: [],
    educations: [],
    certifications: []
  };
  
  function saveResume() {
    resume.firstName = document.getElementById('firstName').value;
    resume.lastName = document.getElementById('lastName').value;
    resume.headline = document.getElementById('headline').value;
    resume.email = document.getElementById('email').value;
    resume.website = document.getElementById('website').value;
    resume.phone = document.getElementById('phone').value;
    resume.address = document.getElementById('address').value;
    resume.skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());
  
    resume.experiences = Array.from(document.querySelectorAll('.experience')).map(exp => {
        return {
            company: exp.querySelector('.company').value,    
            jobTitle: exp.querySelector('.jobTitle').value,
            fromDate: exp.querySelector('.fromDate').value,
            toDate: exp.querySelector('.toDate').value,
            responsibilities: exp.querySelector('.responsibilities').value.split('\n')
        };
    });
  
    resume.educations = Array.from(document.querySelectorAll('.education')).map(edu => {
        return {
            school: edu.querySelector('.school').value,
            degree: edu.querySelector('.degree').value,
            major: edu.querySelector('.major').value,
            fromDate: edu.querySelector('.fromDate').value,
            toDate: edu.querySelector('.toDate').value
        };
    });
  
    resume.certifications = Array.from(document.querySelectorAll('.certification')).map(cert => {
        return {
            certName: cert.querySelector('.certName').value,
            certYear: cert.querySelector('.certYear').value
        };
    });
  
    localStorage.setItem('resume', JSON.stringify(resume));
    generatePreview();  // This should update the preview directly after saving
  }
  
  function displayResume() {
    const storedResume = JSON.parse(localStorage.getItem('resume'));
    if (!storedResume) {
        // Clear all inputs and the preview if there is no stored data
        document.querySelectorAll('input, textarea').forEach(input => input.value = '');
        document.getElementById('resumePreview').innerHTML = '<p>No resume data saved.</p>';
        clearDynamicSections();  // Ensure dynamic sections are also cleared
        return;
    }
  
    // Update the resume object and load stored data into inputs
    resume = {...storedResume};
    document.getElementById('firstName').value = resume.firstName || '';
    document.getElementById('lastName').value = resume.lastName || '';
    document.getElementById('headline').value = resume.headline || '';
    document.getElementById('email').value = resume.email || '';
    document.getElementById('website').value = resume.website || '';
    document.getElementById('phone').value = resume.phone || '';
    document.getElementById('address').value = resume.address || '';
    document.getElementById('skills').value = resume.skills.join(', ');
  
    clearDynamicSections();  // Clear existing dynamic fields before adding new ones
    resume.experiences.forEach(exp => addExperience(exp));
    resume.educations.forEach(edu => addEducation(edu));
    resume.certifications.forEach(cert => addCertification(cert));
  
    generatePreview();  // Update preview based on the updated resume object
  }
  
  function addExperience(exp = {}) {
    const container = document.getElementById('experiencesContainer');
    const div = document.createElement('div');
    div.className = 'experience';
    div.innerHTML = `
        <input type="text" class="company" placeholder="Company" value="${exp.company || ''}">
        <input type="text" class="jobTitle" placeholder="Job Title" value="${exp.jobTitle || ''}">
        <input type="date" class="fromDate" placeholder="From" value="${exp.fromDate || ''}">
        <input type="date" class="toDate" placeholder="To" value="${exp.toDate || ''}">
        <textarea class="responsibilities" placeholder="Responsibilities & Accomplishments">${exp.responsibilities ? exp.responsibilities.join('\n') : ''}</textarea>
        <button onclick="this.parentNode.remove()">Remove</button>
    `;
    container.appendChild(div);
  }
  
  function addEducation(edu = {}) {
    const container = document.getElementById('educationsContainer');
    const div = document.createElement('div');
    div.className = 'education';
    div.innerHTML = `
        <input type="text" class="school" placeholder="School" value="${edu.school || ''}">
        <input type="text" class="degree" placeholder="Degree" value="${edu.degree || ''}">
        <input type="text" class="major" placeholder="Major" value="${edu.major || ''}">
        <input type="date" class="fromDate" placeholder="From" value="${edu.fromDate || ''}">
        <input type="date" class="toDate" placeholder="To" value="${edu.toDate || ''}">
        <button onclick="this.parentNode.remove()">Remove</button>
    `;
    container.appendChild(div);
  }
  
  function addCertification(cert = {}) {
    const container = document.getElementById('certificationsContainer');
    const div = document.createElement('div');
    div.className = 'certification';
    div.innerHTML = `
        <input type="text" class="certName" placeholder="Certification Name" value="${cert.certName || ''}">
        <input type="text" class="certYear" placeholder="Year Received" value="${cert.certYear || ''}">
        <button onclick="this.parentNode.remove()">Remove</button>
    `;
    container.appendChild(div);
  }
  
  function generatePreview() {
    let preview = `
        <h2>${resume.firstName} ${resume.lastName}</h2>
        <h3>${resume.headline}</h3>
        ${resume.email}<br>
        ${resume.website}<br>
        ${resume.phone}<br>
        ${resume.address}<br>
        <hr>
    `;
  
    if (resume.skills.length > 0) {
        preview += `
            <h3>Skills:</h3>
            ${resume.skills.map(skill => `<span class="skill-pill">${skill}</span>`).join(' ')}
            <hr>
        `;
    }
  
    if (resume.experiences.length > 0) {
        preview += '<h3>Experience:</h3>';
        resume.experiences.forEach(exp => {
            preview += `
                <div>
                    <strong>${exp.company}</strong><br>
                    <strong>${exp.jobTitle}</strong><br>
                    <strong>${exp.fromDate} - ${exp.toDate}</strong><br>
                    <ul>
                        ${exp.responsibilities.map(line => `<li>${line}</li>`).join('')}
                    </ul>
                </div>
            `;
        });
        preview += '<hr>';
    }
  
    if (resume.educations.length > 0) {
        preview += '<h3>Education:</h3>';
        resume.educations.forEach(edu => {
            preview += `
                <div>
                    ${edu.school}<br>
                    ${edu.degree}, ${edu.major}<br>
                    ${edu.fromDate} - ${edu.toDate}<br>
                </div>
            `;
        });
        preview += '<hr>';
    }
  
    if (resume.certifications.length > 0) {
        preview += '<h3>Certifications:</h3>';
        resume.certifications.forEach(cert => {
            preview += `<div>${cert.certName} - ${cert.certYear}</div>`;
        });
        preview += '<hr>';
    }
  
    document.getElementById('resumePreview').innerHTML = preview;
  }
  
  function clearDynamicSections() {
    document.getElementById('experiencesContainer').innerHTML = '';
    document.getElementById('educationsContainer').innerHTML = '';
    document.getElementById('certificationsContainer').innerHTML = '';
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    displayResume();
    document.getElementById('addExperience').addEventListener('click', () => addExperience());
    document.getElementById('addEducation').addEventListener('click', () => addEducation());
    document.getElementById('addCertification').addEventListener('click', () => addCertification());
    document.getElementById('saveResume').addEventListener('click', saveResume);
    document.getElementById('clearStorage').addEventListener('click', clearStorage);
    document.getElementById('openInNewTab').addEventListener('click', openResumeInNewTab);
  });
  
  function openResumeInNewTab() {
    const resumeContent = document.getElementById('resumePreview').innerHTML;
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
        <html>
            <head>
                <title>Resume</title>
                <link href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css" rel="stylesheet">
                <style>
                    #resumePreview {
                        margin-top: 20px;
                        padding: 10px;
                    }
                    .skill-pill {
                        display: inline-block;
                        padding: 5px 10px;
                        margin: 2px;
                        background-color: #007bff;
                        color: white;
                        border-radius: 5px;
                    }
                </style>
            </head>
            <body>
                <div id="resumePreview">${resumeContent}</div>
            </body>
        </html>
    `);
    newWindow.document.close();
  }
  
  function clearStorage() {
    localStorage.clear();
    location.reload();
  }