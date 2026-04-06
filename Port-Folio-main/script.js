// Apparition progressive
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.2
  });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  
  // Navbar cachée si scroll bas, affichée si scroll haut
  let lastScrollTop = 0;
  let scrollDownCounter = 0;
  const header = document.getElementById("header");
  const scrollHideThreshold = 5; // nombre de scrolls vers le bas avant de cacher
  
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  
    if (currentScroll > lastScrollTop) {
      // On descend
      scrollDownCounter++;
      if (scrollDownCounter >= scrollHideThreshold) {
        header.style.transform = "translateY(-100%)";
        scrollDownCounter = scrollHideThreshold; // limite
      }
    } else {
      // On monte
      header.style.transform = "translateY(0)";
      scrollDownCounter = 0;
    }
  
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
  
  // Toggle des expériences et intérêts
document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
  });
  // Toggle cartes expériences / centres d’intérêt
document.querySelectorAll('.card-toggle').forEach(card => {
    const btn = card.querySelector('.card-btn');
    const content = card.querySelector('.card-content');
  
    card.querySelector('.card-header').addEventListener('click', () => {
        const isActive = card.classList.contains('active');
        document.querySelectorAll('.card-toggle').forEach(c => {
          c.classList.remove('active');
          c.querySelector('.card-btn').classList.remove('rotate');
        });
      
        if (!isActive) {
          card.classList.add('active');
          btn.classList.add('rotate');
        }
      });      
  });
  // Blocs de compétences cliquables avec description flottante

document.querySelectorAll('.skill-block').forEach(block => {
    block.addEventListener('click', () => {
      block.classList.toggle('active');
    });
});
  
const track = document.getElementById('carousel-track');
const originalItems = Array.from(document.querySelectorAll('.carousel-item'));
const descBox = document.getElementById('carousel-description');
const btnLeft = document.querySelector('.carousel-btn.left');
const btnRight = document.querySelector('.carousel-btn.right');

let currentIndex = 0;
let items = [];

// 1. Clonage des éléments pour créer un effet d'infini
function cloneItems() {
  track.innerHTML = ''; // Vider le track
  originalItems.forEach(item => {
    const clone = item.cloneNode(true);
    clone.classList.remove('active');
    track.appendChild(clone);
    items.push(clone);
  });
  originalItems.forEach(item => {
    const clone = item.cloneNode(true);
    clone.classList.remove('active');
    track.appendChild(clone);
    items.push(clone);
  });
  originalItems.forEach(item => {
    const clone = item.cloneNode(true);
    clone.classList.remove('active');
    track.appendChild(clone);
    items.push(clone);
  });
}

cloneItems();
currentIndex = originalItems.length; // On commence au centre

function updateCarousel(scroll = true) {
  const itemWidth = items[0].offsetWidth + 20;
  const visibleCount = 3;
  const centerOffset = Math.floor(visibleCount / 2);
  const translateX = -((currentIndex - centerOffset) * itemWidth);

  if (scroll) {
    track.style.transition = 'transform 0.4s ease';
  } else {
    track.style.transition = 'none';
  }

  track.style.transform = `translateX(${translateX}px)`;

  items.forEach(item => item.classList.remove('active'));
  const actualIndex = ((currentIndex % originalItems.length) + originalItems.length) % originalItems.length;
  items[currentIndex].classList.add('active');
  descBox.textContent = originalItems[actualIndex].dataset.description;
}

// 2. Ajustement instantané en cas de dépassement
function checkLoopBounds() {
  if (currentIndex < originalItems.length) {
    currentIndex += originalItems.length;
    updateCarousel(false);
  } else if (currentIndex >= originalItems.length * 2) {
    currentIndex -= originalItems.length;
    updateCarousel(false);
  }
}

// 3. Navigation
function nextItem() {
  currentIndex++;
  updateCarousel();
  checkLoopBounds();
}
function prevItem() {
  currentIndex--;
  updateCarousel();
  checkLoopBounds();
}
function goToIndex(index) {
  currentIndex = originalItems.length + index;
  updateCarousel();
  checkLoopBounds();
}

// 4. Clic sur les blocs
items.forEach((item, i) => {
  item.addEventListener('click', () => {
    const relativeIndex = i % originalItems.length;
    goToIndex(relativeIndex);
    resetAutoScroll();
  });
});

// 5. Flèches
btnLeft.addEventListener('click', () => {
  prevItem();
  resetAutoScroll();
});
btnRight.addEventListener('click', () => {
  nextItem();
  resetAutoScroll();
});

// 6. Auto-scroll
let autoScroll = setInterval(nextItem, 4000);
function resetAutoScroll() {
  clearInterval(autoScroll);
  autoScroll = setInterval(nextItem, 4000);
}

// 7. Pause au hover
document.querySelector('.carousel-wrapper').addEventListener('mouseenter', () => clearInterval(autoScroll));
document.querySelector('.carousel-wrapper').addEventListener('mouseleave', () => resetAutoScroll());

// Initialisation
updateCarousel(false);
function animateProjetsTimeline() {
    const items = document.querySelectorAll('.projets-item');
    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        item.style.opacity = 1;
        item.style.transform = "translateY(0)";
      }
    });
  }
  
  window.addEventListener('scroll', animateProjetsTimeline);
  window.addEventListener('load', animateProjetsTimeline);
  
  document.querySelectorAll('.projets-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    const liste = toggle.nextElementSibling;
    liste.classList.toggle('active');
  });
});
document.querySelectorAll('.projets-filtre').forEach(btn => {
  btn.addEventListener('click', () => {
    const cat = btn.getAttribute('data-cat');
    document.querySelectorAll('.projets-filtre').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.projets-card').forEach(card => {
      if (cat === 'all' || card.getAttribute('data-cat') === cat) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
const filtreBtns = document.querySelectorAll(".projets-filtre");
const cards = document.querySelectorAll(".projets-card");

filtreBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filtreBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filtre = btn.getAttribute("data-cat");

    cards.forEach(card => {
      const cat = card.getAttribute("data-cat");
      const show = (filtre === "tous" || filtre === cat);

      if (show) {
        card.style.display = "flex"; // car `.projets-grid` utilise flex
        card.style.animation = "none";
        void card.offsetWidth;
        card.style.animation = "fadeInScaleKikou 0.5s ease-out forwards";
      } else {
        card.style.display = "none";
      }
    });
  });
});
