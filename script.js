  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  function closeMobile() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Today's hours
  const hoursMap = {
    0: { day: 'Sunday',    hours: '09:00 AM – 12:30 PM' },
    1: { day: 'Monday',    hours: '06:00 AM – 11:30 PM' },
    2: { day: 'Tuesday',   hours: '09:00 AM – 06:30 PM' },
    3: { day: 'Wednesday', hours: '08:00 AM – 08:00 PM' },
    4: { day: 'Thursday',  hours: '09:00 AM – 07:30 PM' },
    5: { day: 'Friday',    hours: '09:00 AM – 05:00 PM' },
    6: { day: 'Saturday',  hours: '06:00 AM – 11:00 PM' },
  };
  const todayEl = document.getElementById('todayHours');
  if (todayEl) {
    const { day, hours } = hoursMap[new Date().getDay()];
    todayEl.innerHTML = `<span style="color:var(--dusty-rose);font-size:11px;letter-spacing:0.1em;">${day}</span><br>${hours}`;
  }

  // Countdown timer (to 2PM cutoff)
  function updateCountdown() {
    const now = new Date();
    const cutoff = new Date(now);
    cutoff.setHours(14, 0, 0, 0);
    if (now >= cutoff) cutoff.setDate(cutoff.getDate() + 1);
    const diff = cutoff - now;
    document.getElementById('cd-h').textContent = String(Math.floor(diff / 3600000)).padStart(2, '0');
    document.getElementById('cd-m').textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    document.getElementById('cd-s').textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Animated stat counters on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.textContent.replace(/,/g, ''));
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { el.textContent = target.toLocaleString(); clearInterval(timer); }
        else { el.textContent = Math.floor(current).toLocaleString(); }
      }, 20);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num').forEach(n => observer.observe(n));