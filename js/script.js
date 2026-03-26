/* ===================== SHOW MENU ===================== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Hide menu */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/* ===================== REMOVE MENU MOBILE ===================== */
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* ===================== CHANGE BACKGROUND HEADER ===================== */
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/* ===================== TYPED.JS CONFIGURATION ===================== */
if (document.querySelector('.typed-text')) {
    var typed = new Typed('.typed-text', {
        strings: ['Frontend Developer', 'UI/UX Enthusiast', 'Web Designer', 'Tech Explorer'],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 1500,
        loop: true,
        showCursor: true,
        cursorChar: '|',
    });
}

/* ===================== EXPERIENCE TABS ===================== */
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent =>{
            tabContent.classList.remove('experience__active')
        })
        target.classList.add('experience__active')

        tabs.forEach(tab =>{
            tab.classList.remove('experience__active')
        })
        tab.classList.add('experience__active')
    })
})

/* ===================== PROJECT FILTERING ===================== */
const filterItems = document.querySelectorAll('.project__item');
const projectCards = document.querySelectorAll('.project__card');

filterItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all items
        filterItems.forEach(i => i.classList.remove('active-project'));
        // Add active class to clicked item
        this.classList.add('active-project');

        const filterValue = this.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all') {
                card.style.display = 'block';
                // Trigger animation reflow
                card.style.animation = 'none';
                card.offsetHeight; /* trigger reflow */
                card.style.animation = null; 
            } else {
                if (card.classList.contains(filterValue.substring(1))) { // Remove the dot from the filter criteria (.frontend -> frontend)
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

/* ===================== SCROLL SECTIONS ACTIVE LINK ===================== */
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/* ===================== SHOW SCROLL UP ===================== */ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 350) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/* ===================== DARK LIGHT THEME ===================== */ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark'
const iconTheme = 'fa-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the data-theme attribute
const getCurrentTheme = () => document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'fa-sun' : 'fa-moon'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.setAttribute('data-theme', selectedTheme === 'dark' ? 'dark' : 'light')
  themeButton.classList[selectedIcon === 'fa-sun' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    let currentTheme = document.body.getAttribute('data-theme');
    let newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.body.setAttribute('data-theme', newTheme);
    themeButton.classList.toggle('fa-sun');
    themeButton.classList.toggle('fa-moon');
    
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/* ===================== SCROLL REVEAL ANIMATION ===================== */
if(typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 1000,
        delay: 200,
        // reset: true
    })

    sr.reveal(`.hero__data, .projects__container, .experience__container, .footer__container`)
    sr.reveal(`.hero__image-wrapper`, {delay: 500})
    sr.reveal(`.about__img-wrapper, .contact__info`, {origin: 'left'})
    sr.reveal(`.about__data, .contact__form`, {origin: 'right'})
    sr.reveal(`.skills__content, .backend-summary`, {interval: 100})
}