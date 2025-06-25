
function openMenu() {
  document.getElementById("mySideMenu").classList.add('open');
  document.body.classList.add('menu-open');
}

function closeMenu() {
  document.getElementById("mySideMenu").classList.remove('open');
  document.body.classList.remove('menu-open');
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
  closeMenu();
}

let lastScrollY = window.scrollY;
let forceShow = false;

document.addEventListener('scroll', () => {
  if (!forceShow) {
    const topBar = document.querySelector('.top-bar');
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      topBar.classList.add('hide');
    } else {
      topBar.classList.remove('hide');
    }
    lastScrollY = window.scrollY;
  }
});

// Mouse hover at top of page to force show top-bar
document.addEventListener('mousemove', function(e) {
  const topBar = document.querySelector('.top-bar');
  if (e.clientY < 50) {
    document.body.classList.add('show-top-bar');
    forceShow = true;
    topBar.classList.remove('hide');
  } else {
    document.body.classList.remove('show-top-bar');
    forceShow = false;
  }
});



document.addEventListener('DOMContentLoaded', function () {
  const intro = document.getElementById('intro');
  const sections = document.querySelectorAll('.section:not(#intro)');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.remove('hidden');
      } else {
        entry.target.classList.remove('visible');
        entry.target.classList.add('hidden');
      }
    });
    let anyVisible = entries.some(entry => entry.isIntersecting);
    if (anyVisible) {
      intro.classList.remove('blur');
    } else {
      intro.classList.add('blur');
    }
  }, {
    threshold: 0.3
  });
  sections.forEach(section => observer.observe(section));
});

const track = document.querySelector('.gallery-track');
const slides = document.querySelectorAll('.gallery-slide');
let currentIndex = 0;
let autoSlideInterval = null;

// Clone first and last slides
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

const allSlides = document.querySelectorAll('.gallery-slide'); // update the list
let totalSlides = allSlides.length;

// Set initial position
track.style.transform = `translateX(-100%)`;
currentIndex = 1;

function updateActiveSlide() {
    allSlides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentIndex) {
            slide.classList.add('active');
        }
    });
}
function showSlide(index) {
  allSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  track.style.transition = 'transform 0.8s ease';
  track.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    currentIndex++;
    track.style.transition = 'transform 0.8s ease';
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    if (currentIndex === totalSlides - 1) {
        setTimeout(() => {
            track.style.transition = 'none';
            currentIndex = 1;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateActiveSlide();
        }, 800);
    } else {
        updateActiveSlide();
    }
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 3500);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Start
startAutoSlide();
