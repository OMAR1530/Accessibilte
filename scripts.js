// Fichier JavaScript pour la validation des formulaires et l'amélioration de l'accessibilité

document.addEventListener('DOMContentLoaded', function() {
    // Gestion du formulaire de contact
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        initContactForm(contactForm);
    }
    
    // Gestion du formulaire de newsletter
    const newsletterForm = document.querySelector('.newsletter form');
    if (newsletterForm) {
        initNewsletterForm(newsletterForm);
    }
});

/**
 * Initialise la validation du formulaire de contact
 * @param {HTMLFormElement} form - L'élément de formulaire
 */
function initContactForm(form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Réinitialiser les messages d'erreur
        clearErrors();
        
        // Valider le formulaire
        const isValid = validateContactForm(form);
        
        if (isValid) {
            // Simuler l'envoi du formulaire (dans un projet réel, on enverrait les données)
            showConfirmation('Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.', 'success');
            
            // Réinitialiser le formulaire après un délai
            setTimeout(() => {
                form.reset();
            }, 2000);
        }
    });
    
    // Validation en temps réel pour améliorer l'expérience utilisateur
    const formFields = form.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

/**
 * Validation du formulaire de contact
 * @param {HTMLFormElement} form - L'élément de formulaire
 * @returns {boolean} - Validité du formulaire
 */
function validateContactForm(form) {
    let isValid = true;
    
    // Nom complet
    const fullname = form.querySelector('#fullname');
    if (!fullname.value.trim()) {
        showError(fullname, 'Le nom complet est obligatoire.');
        isValid = false;
    }
    
    // Email
    const email = form.querySelector('#email');
    if (!email.value.trim()) {
        showError(email, 'L\'adresse email est obligatoire.');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Veuillez entrer une adresse email valide (exemple: nom@exemple.com).');
        isValid = false;
    }
    
    // Téléphone (optionnel mais doit être valide si renseigné)
    const phone = form.querySelector('#phone');
    if (phone.value.trim() && !isValidPhone(phone.value)) {
        showError(phone, 'Veuillez entrer un numéro de téléphone valide (exemple: 01 23 45 67 89).');
        isValid = false;
    }
    
    // Sujet
    const subject = form.querySelector('#subject');
    if (!subject.value) {
        showError(subject, 'Veuillez sélectionner un sujet.');
        isValid = false;
    }
    
    // Message
    const message = form.querySelector('#message');
    if (!message.value.trim()) {
        showError(message, 'Le message est obligatoire.');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError(message, 'Votre message doit contenir au moins 10 caractères.');
        isValid = false;
    }
    
    // Consentement
    const privacy = form.querySelector('#privacy');
    if (!privacy.checked) {
        showError(privacy, 'Vous devez accepter que vos données soient traitées.');
        isValid = false;
    }
    
    return isValid;
}

/**
 * Initialise la validation du formulaire de newsletter
 * @param {HTMLFormElement} form - L'élément de formulaire
 */
function initNewsletterForm(form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const emailInput = form.querySelector('#email');
        const consentInput = form.querySelector('#consent');
        let isValid = true;
        
        // Valider l'email
        if (!emailInput.value.trim()) {
            alert('Veuillez entrer votre adresse email.');
            emailInput.focus();
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            alert('Veuillez entrer une adresse email valide.');
            emailInput.focus();
            isValid = false;
        }
        
        // Valider le consentement
        if (!consentInput.checked) {
            alert('Vous devez accepter de recevoir des informations.');
            consentInput.focus();
            isValid = false;
        }
        
        if (isValid) {
            alert('Merci pour votre inscription à notre newsletter !');
            form.reset();
        }
    });
}

/**
 * Valide un champ spécifique du formulaire
 * @param {HTMLElement} field - Le champ à valider
 */
function validateField(field) {
    // Réinitialiser l'erreur de ce champ
    clearError(field);
    
    // Validation en fonction du type de champ
    switch (field.id) {
        case 'fullname':
            if (!field.value.trim()) {
                showError(field, 'Le nom complet est obligatoire.');
            }
            break;
            
        case 'email':
            if (!field.value.trim()) {
                showError(field, 'L\'adresse email est obligatoire.');
            } else if (!isValidEmail(field.value)) {
                showError(field, 'Veuillez entrer une adresse email valide.');
            }
            break;
            
        case 'phone':
            if (field.value.trim() && !isValidPhone(field.value)) {
                showError(field, 'Veuillez entrer un numéro de téléphone valide.');
            }
            break;
            
        case 'subject':
            if (!field.value) {
                showError(field, 'Veuillez sélectionner un sujet.');
            }
            break;
            
        case 'message':
            if (!field.value.trim()) {
                showError(field, 'Le message est obligatoire.');
            } else if (field.value.trim().length < 10) {
                showError(field, 'Votre message doit contenir au moins 10 caractères.');
            }
            break;
            
        case 'privacy':
            if (!field.checked) {
                showError(field, 'Vous devez accepter que vos données soient traitées.');
            }
            break;
    }
}

/**
 * Affiche un message d'erreur pour un champ spécifique
 * @param {HTMLElement} field - Le champ concerné par l'erreur
 * @param {string} message - Le message d'erreur à afficher
 */
function showError(field, message) {
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        field.setAttribute('aria-invalid', 'true');
        field.classList.add('invalid');
    }
}

/**
 * Efface le message d'erreur pour un champ spécifique
 * @param {HTMLElement} field - Le champ dont l'erreur doit être effacée
 */
function clearError(field) {
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        field.removeAttribute('aria-invalid');
        field.classList.remove('invalid');
    }
}

/**
 * Efface tous les messages d'erreur du formulaire
 */
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
    
    const invalidFields = document.querySelectorAll('[aria-invalid="true"]');
    invalidFields.forEach(field => {
        field.removeAttribute('aria-invalid');
        field.classList.remove('invalid');
    });
}

/**
 * Affiche un message de confirmation du formulaire
 * @param {string} message - Le message à afficher
 * @param {string} type - Le type de message ('success' ou 'error')
 */
function showConfirmation(message, type) {
    const confirmationElement = document.getElementById('form-confirmation');
    if (confirmationElement) {
        confirmationElement.textContent = message;
        confirmationElement.className = `form-confirmation ${type}`;
        confirmationElement.style.display = 'block';
        
        // Scroll jusqu'au message de confirmation
        confirmationElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

/**
 * Vérifie si une adresse email est valide
 * @param {string} email - L'adresse email à vérifier
 * @returns {boolean} - Validité de l'email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Vérifie si un numéro de téléphone est valide (format français)
 * @param {string} phone - Le numéro de téléphone à vérifier
 * @returns {boolean} - Validité du numéro
 */
function isValidPhone(phone) {
    // Format accepté: 01 23 45 67 89 ou 0123456789 ou +33 1 23 45 67 89
    const phoneRegex = /^(\+33\s?|0)[1-9](\s?\d{2}){4}$/;
    return phoneRegex.test(phone);
}

// Améliorations d'accessibilité supplémentaires
// Gestion du focus visible uniquement pour la navigation au clavier
window.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-user');
    }
});

window.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-user');
});

// Vérifier que le site est utilisable sans JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const noscriptElement = document.querySelector('noscript');
    if (noscriptElement) {
        noscriptElement.remove(); // Supprimer le message d'avertissement noscript puisque JS est activé
    }
});