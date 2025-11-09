



// v1 scripts: typing, nav shrink, arrows scroll, read more modal, top button, mobile menu, active nav
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- typing effect (professional) ---------- */
  const phrases = [
    "Empowering Digital Growth",
    "Innovative IT Solutions",
    "Transforming Ideas Into Code"
  ];
  const typed = document.getElementById('v1-typed');
  let pi = 0, pj = 0, deleting = false;
  function v1Type() {
    const word = phrases[pi];
    if(!deleting) {
      typed.textContent = word.slice(0, ++pj);
      if(pj === word.length) { deleting = true; setTimeout(v1Type, 1100); return; }
    } else {
      typed.textContent = word.slice(0, --pj);
      if(pj === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    // Adjust speed: slightly faster deleting, slower typing
    setTimeout(v1Type, deleting ? 50 : 90);
  }
  v1Type();

  /* ---------- navbar shrink on scroll & active nav ---------- */
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    // Nav shrink
    if (window.scrollY > 40) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');

    // Active nav link highlighting (simple logic)
    let current = '';
    document.querySelectorAll('section[id]').forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-blue-600', 'font-bold');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('text-blue-600', 'font-bold');
      }
    });
  });

  /* ---------- mobile menu toggle ---------- */
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    menuBtn.classList.toggle('active'); // for rotation effect on button
  }

  menuBtn.addEventListener('click', toggleMobileMenu);

  // Close menu when a link is clicked
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  /* ---------- top button visibility and scroll ---------- */
  const topBtn = document.getElementById('v1-topBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      topBtn.classList.remove('hidden');
    } else {
      topBtn.classList.add('hidden');
    }
  });

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- scroll arrows for cards (services, courses, contact, team) ---------- */
/* ---------- smoother scroll for all arrows (Team, Services, Courses) ---------- */
document.querySelectorAll('.v1-arrow').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const targetId = e.target.dataset.target;
    const row = document.getElementById(targetId);
    if (!row) return;

    const direction = btn.classList.contains('next') ? 1 : -1;
    const card = row.querySelector('.card');
    const cardWidth = card ? card.offsetWidth + 24 : 320;

    // Smooth scroll
    row.scrollBy({
      left: direction * cardWidth * 1.5, // scroll 1.5 cards
      behavior: 'smooth'
    });
  });
});


  /* ---------- read more modal (expanded panel) ---------- */
  const overlay = document.getElementById('v1-overlay');
  const panel = document.getElementById('v1-panel');
  const panelTitle = document.getElementById('v1-panel-title');
  const panelContent = document.getElementById('v1-panel-content');
  const closeBtn = document.getElementById('v1-close');
  const mainContent = document.querySelector('main');

  function openPanel(title, content) {
    panelTitle.textContent = title;
    panelContent.innerHTML = content; 
    overlay.classList.add('active')
    panel.classList.add('active');
    // Blur background when modal is open
    mainContent.style.filter = 'blur(6px) saturate(.95)';
  }
  function closePanel() {
    overlay.classList.remove('active');
    panel.classList.remove('active');
    mainContent.style.filter = 'none';
  }

  document.querySelectorAll('.read-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('article');
      const title = card.dataset.title || card.querySelector('h3')?.innerText || 'Details';
      const content = card.dataset.content || card.querySelector('p')?.innerText || '';
      openPanel(title, content);
    });
  });

  overlay.addEventListener('click', (e) => {
    // Check if the click is on the overlay itself or the close button
    if (e.target === overlay || e.target === closeBtn) closePanel();
  });
  closeBtn.addEventListener('click', closePanel);
  // Allow closing with Escape key
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePanel(); });

  /* ---------- team focus/blur effect ---------- */
  const teamRow = document.getElementById('team-row');
  const teamMembers = document.querySelectorAll('#team-row .team-member');

  teamMembers.forEach(member => {
    member.addEventListener('click', (e) => {
      // Prevent focus/blur if a button (like read more, if one existed) was clicked inside
      if (e.target.closest('button')) return; 

      // If the clicked member is already active, remove focus mode
      if (member.classList.contains('active-focus')) {
        member.classList.remove('active-focus');
        teamRow.classList.remove('team-focus');
        return;
      }
      
      // 1. Remove active class from all previously active cards
      teamMembers.forEach(m => m.classList.remove('active-focus'));
      
      // 2. Add active class to the clicked card
      member.classList.add('active-focus');
      
      // 3. Enable the parent focus mode, triggering the blur CSS for siblings
      teamRow.classList.add('team-focus');
    });
  });

  // Remove focus when clicking outside the team row
  document.addEventListener('click', (e) => {
      // Check if teamRow is in focus mode AND the click target is NOT inside the teamRow
      if (teamRow && teamRow.classList.contains('team-focus') && !e.target.closest('#team-row')) {
          teamRow.classList.remove('team-focus');
          teamMembers.forEach(m => m.classList.remove('active-focus'));
      }
  });
});


/* ---------- scroll reveal animation (infinite scroll) ---------- */
const sectionsToAnimate = document.querySelectorAll('#team, #services, #courses, #contact');

const infiniteObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // When entering the viewport, play the animation
      entry.target.classList.add('scroll-reveal');
    } else {
      // When leaving the viewport, reset the animation state
      entry.target.classList.remove('scroll-reveal');
    }
  });
}, {
  // Trigger when 10% of the element is visible/not visible
  threshold: 0.1
});

sectionsToAnimate.forEach(section => {
  infiniteObserver.observe(section);
});

