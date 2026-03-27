// =====================================================
// main.js — Portfolio Muhammad Wahyuda Ilham
// =====================================================


// =====================================================
// 1. DARK / LIGHT MODE TOGGLE + localStorage
// =====================================================

const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

function applyTheme(theme) {
  body.classList.remove('dark', 'light');
  body.classList.add(theme);
  body.setAttribute('data-theme', theme);
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

themeToggle.addEventListener('click', () => {
  const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
});


// =====================================================
// 2. HAMBURGER MENU — Event: click
// =====================================================

const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});


// =====================================================
// 3. SCROLL REVEAL — Intersection Observer API
// =====================================================

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Animasikan skill bar jika ada
      const bar = entry.target.querySelector('.skill-bar-fill');
      const barWrap = entry.target.querySelector('.skill-bar');
      if (bar && barWrap) {
        bar.style.width = `${barWrap.getAttribute('data-width')}%`;
      }

      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));


// =====================================================
// 4. COUNTER ANIMASI — About Section
// =====================================================

const metaNumbers = document.querySelectorAll('.meta-number');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target, parseInt(entry.target.getAttribute('data-target')));
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

metaNumbers.forEach(num => counterObserver.observe(num));

function animateCounter(el, target) {
  const duration = 1500;
  const startTime = performance.now();

  const step = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    el.textContent = Math.floor(target * eased);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };

  requestAnimationFrame(step);
}


// =====================================================
// 5. SCROLL EVENT — Highlight active nav link
// =====================================================

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + section.offsetHeight) {
      navItems.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
});


// =====================================================
// 6. MOUSEOVER — Skill tag highlight
// =====================================================

document.querySelectorAll('.skill-tags li').forEach(tag => {
  tag.addEventListener('mouseover', () => {
    tag.style.background = 'var(--accent-soft)';
    tag.style.borderColor = 'var(--accent)';
    tag.style.color = 'var(--accent)';
  });
  tag.addEventListener('mouseout', () => {
    tag.style.background = '';
    tag.style.borderColor = '';
    tag.style.color = '';
  });
});


// =====================================================
// 7. TAB SYSTEM — Interactive Section
//    Event: click
// =====================================================

const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetTab = btn.getAttribute('data-tab');

    // Update tombol aktif
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Update konten aktif
    tabContents.forEach(content => {
      content.classList.remove('active');
      if (content.id === `tab-${targetTab}`) {
        content.classList.add('active');
      }
    });
  });
});


// =====================================================
// 8. SKILL DETAIL PANEL
//    Event: click — DOM manipulation: innerHTML
// =====================================================

// Data detail untuk setiap skill
const skillData = {
  iot: {
    icon: 'fas fa-microchip',
    title: 'IoT & Embedded Systems',
    desc: 'Pengembangan sistem monitoring real-time berbasis mikrokontroler. Berpengalaman menghubungkan sensor fisik ke platform cloud melalui protokol MQTT untuk membaca dan menampilkan data secara langsung.',
    experience: 'Proyek: Sistem Monitoring Volume Tandon Air di Pelindo Petikemas — menggunakan Wemos D1 Mini + sensor HC-SR04 + Ubidots cloud dengan alarm warna otomatis.',
    tags: ['ESP32', 'Wemos D1 Mini', 'Arduino IDE', 'MQTT', 'Ubidots', 'C/C++']
  },
  hardware: {
    icon: 'fas fa-bolt',
    title: 'Elektronika & Hardware',
    desc: 'Perancangan dan analisis rangkaian elektronika untuk kebutuhan akuisisi data. Memahami karakteristik sensor, pembagian tegangan, dan antarmuka sinyal analog/digital dengan mikrokontroler.',
    experience: 'Implementasi voltage divider pada pin ECHO sensor HC-SR04 untuk melindungi GPIO 3.3V pada Wemos D1 Mini dari tegangan 5V.',
    tags: ['HC-SR04', 'Voltage Divider', 'Sensor & Aktuator', 'Rangkaian Analog', 'PCB Design']
  },
  protokol: {
    icon: 'fas fa-network-wired',
    title: 'Protokol & Komunikasi IoT',
    desc: 'Implementasi komunikasi data antara perangkat embedded dan platform cloud menggunakan protokol IoT ringan. Memahami alur publish-subscribe dan konfigurasi broker untuk sistem monitoring.',
    experience: 'Konfigurasi MQTT pada Wemos D1 Mini untuk mengirim data jarak ultrasonik ke Ubidots secara periodik, dengan dashboard real-time dan threshold alarm.',
    tags: ['MQTT', 'Ubidots Cloud', 'Wi-Fi', 'HTTP', 'Publish-Subscribe', 'Serial Monitor']
  }
};

const skillDetailPanel = document.getElementById('skill-detail-panel');
const skillDetailBtns = document.querySelectorAll('.skill-detail-btn');

function renderSkillDetail(skillKey) {
  const { icon, title, desc, experience, tags } = skillData[skillKey];

  // Buat konten HTML dinamis menggunakan template literals (ES6)
  skillDetailPanel.innerHTML = `
    <div class="sdp-header">
      <div class="sdp-icon"><i class="${icon}"></i></div>
      <div class="sdp-title">${title}</div>
    </div>
    <p class="sdp-desc">${desc}</p>
    <div class="sdp-experience">
      <div class="sdp-experience-label">Pengalaman Nyata</div>
      <p>${experience}</p>
    </div>
    <ul class="sdp-tags">
      ${tags.map(tag => `<li>${tag}</li>`).join('')}
    </ul>
  `;
}

// Render default saat halaman load
renderSkillDetail('iot');

// Event: klik tombol skill
skillDetailBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    skillDetailBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderSkillDetail(btn.getAttribute('data-skill'));
  });
});


// =====================================================
// 9. RANDOM QUOTE GENERATOR
//    Events: click (2 tombol)
//    localStorage: simpan & baca kutipan favorit
// =====================================================

const quotes = [
  { text: "The scientist is not a person who gives the right answers, he's one who asks the right questions.", author: "Claude Lévi-Strauss" },
  { text: "Engineering is not only study of 45 subjects but it is moral studies of intellectual life.", author: "Prakhar Srivastav" },
  { text: "The road to success and the road to failure are almost exactly the same.", author: "Colin R. Davis" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" },
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "It's not that I'm so smart, it's just that I stay with problems longer.", author: "Albert Einstein" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
];

let currentQuoteIndex = -1;

const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const btnNewQuote = document.getElementById('btn-new-quote');
const savedQuotesWrap = document.getElementById('saved-quotes-wrap');
const savedQuotesList = document.getElementById('saved-quotes-list');
const btnClearQuotes = document.getElementById('btn-clear-quotes');

// Ambil kutipan tersimpan dari localStorage
let savedQuotes = JSON.parse(localStorage.getItem('savedQuotes') || '[]');

function renderSavedQuotes() {
  if (savedQuotes.length === 0) {
    savedQuotesWrap.classList.add('hidden');
    return;
  }

  savedQuotesWrap.classList.remove('hidden');

  // DOM Manipulation: bersihkan list lalu buat ulang dengan createElement
  savedQuotesList.innerHTML = '';
  savedQuotes.forEach(({ text, author }) => {
    const li = document.createElement('li');
    li.textContent = `"${text}" — ${author}`;
    savedQuotesList.appendChild(li);
  });
}

// Tampilkan kutipan tersimpan saat load
renderSavedQuotes();

// Event: tombol Kutipan Baru
btnNewQuote.addEventListener('click', () => {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * quotes.length);
  } while (newIndex === currentQuoteIndex && quotes.length > 1);

  currentQuoteIndex = newIndex;
  const { text, author } = quotes[currentQuoteIndex];

  // Animasi fade
  quoteText.style.opacity = '0';
  quoteAuthor.style.opacity = '0';

  setTimeout(() => {
    quoteText.textContent = text;
    quoteAuthor.textContent = `— ${author}`;
    quoteText.style.opacity = '1';
    quoteAuthor.style.opacity = '1';
    quoteText.style.transition = 'opacity 0.4s ease';
    quoteAuthor.style.transition = 'opacity 0.4s ease';
  }, 200);
});

// Event: hapus semua kutipan tersimpan
btnClearQuotes.addEventListener('click', () => {
  savedQuotes = [];
  localStorage.removeItem('savedQuotes');
  renderSavedQuotes();
});


// =====================================================
// 9B. FORM KOMENTAR + SECTION KOMENTAR
//     Events: keyup, submit
//     localStorage: simpan & render semua komentar
// =====================================================

const contactForm  = document.getElementById('contact-form');
const nameInput    = document.getElementById('name');
const emailInput   = document.getElementById('email');
const msgInput     = document.getElementById('message');
const formSuccess  = document.getElementById('form-success');
const commentsList = document.getElementById('comments-list');
const commentsEmpty= document.getElementById('comments-empty');
const commentCount = document.getElementById('comment-count');

// ---- Validasi ----
const showError = (input, errorId, msg) => {
  document.getElementById(errorId).textContent = msg;
  input.classList.add('invalid');
  input.classList.remove('valid');
};
const showValid = (input, errorId) => {
  document.getElementById(errorId).textContent = '';
  input.classList.remove('invalid');
  input.classList.add('valid');
};
const validateName = () => {
  if (nameInput.value.trim().length < 2) {
    showError(nameInput, 'name-error', 'Nama minimal 2 karakter.'); return false;
  }
  showValid(nameInput, 'name-error'); return true;
};
const validateEmail = () => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(emailInput.value)) {
    showError(emailInput, 'email-error', 'Format email tidak valid.'); return false;
  }
  showValid(emailInput, 'email-error'); return true;
};
const validateMsg = () => {
  if (msgInput.value.trim().length < 5) {
    showError(msgInput, 'message-error', 'Komentar minimal 5 karakter.'); return false;
  }
  showValid(msgInput, 'message-error'); return true;
};

nameInput.addEventListener('keyup', validateName);
emailInput.addEventListener('keyup', validateEmail);
msgInput.addEventListener('keyup', validateMsg);

// ---- Render komentar dari localStorage ----
let comments = JSON.parse(localStorage.getItem('comments') || '[]');

function getInitial(name) {
  return name.trim().charAt(0).toUpperCase();
}

function timeAgo(isoString) {
  const diff = Math.floor((Date.now() - new Date(isoString)) / 1000);
  if (diff < 60)    return 'Baru saja';
  if (diff < 3600)  return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  return `${Math.floor(diff / 86400)} hari lalu`;
}

function renderComments() {
  // Hapus semua komentar lama kecuali empty state
  const existing = commentsList.querySelectorAll('.comment-item');
  existing.forEach(el => el.remove());

  if (comments.length === 0) {
    commentsEmpty.classList.remove('hidden');
    commentCount.textContent = '0 komentar';
    return;
  }

  commentsEmpty.classList.add('hidden');
  commentCount.textContent = `${comments.length} komentar`;

  // Tampilkan dari terbaru ke terlama
  [...comments].reverse().forEach(({ name, email, message, time }, i) => {
    const item = document.createElement('div');
    item.className = 'comment-item';
    item.style.animationDelay = `${i * 0.08}s`;

    item.innerHTML = `
      <div class="comment-avatar">${getInitial(name)}</div>
      <div class="comment-body">
        <div class="comment-meta">
          <span class="comment-name">${name}</span>
          <span class="comment-email">${email}</span>
          <span class="comment-time">${timeAgo(time)}</span>
        </div>
        <p class="comment-text">${message}</p>
      </div>
    `;

    commentsList.appendChild(item);
  });
}

// Render saat load
renderComments();

// ---- Submit form → tambah komentar ----
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validateName() & validateEmail() & validateMsg()) {
    const newComment = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: msgInput.value.trim(),
      time: new Date().toISOString()
    };

    // Tambah ke array & simpan ke localStorage
    comments.push(newComment);
    localStorage.setItem('comments', JSON.stringify(comments));

    // Reset form
    contactForm.reset();
    [nameInput, emailInput, msgInput].forEach(i => i.classList.remove('valid', 'invalid'));

    // Tampilkan pesan sukses
    formSuccess.classList.remove('hidden');
    setTimeout(() => formSuccess.classList.add('hidden'), 4000);

    // Re-render komentar
    renderComments();

    // Scroll ke section komentar
    setTimeout(() => {
      document.getElementById('comments').scrollIntoView({ behavior: 'smooth' });
    }, 600);
  }
});

// ---- Hapus semua komentar ----
document.getElementById('btn-clear-comments').addEventListener('click', () => {
  if (confirm('Hapus semua komentar?')) {
    comments = [];
    localStorage.removeItem('comments');
    renderComments();
  }
});


// =====================================================
// 10. DYNAMIC FOOTER


// =====================================================
// 10. DYNAMIC FOOTER — DOM: createElement + appendChild
// =====================================================

const footer = document.querySelector('footer');
const dynamicNote = document.createElement('p');

dynamicNote.style.cssText = `
  margin-top: 0.5rem;
  font-size: 0.7rem;
  font-family: 'DM Mono', monospace;
  color: var(--text-muted);
  letter-spacing: 0.05em;
`;

dynamicNote.textContent = `© ${new Date().getFullYear()} Muhammad Wahyuda Ilham — Teknik Elektro, Universitas Hasanuddin`;
footer.appendChild(dynamicNote);


// =====================================================
// 11. CANVAS API — OSCILLOSCOPE / SIGNAL VISUALIZER
//     Events: click (wave, color, pause, screenshot)
//             input (sliders — frekuensi, amplitudo, speed)
//             mouseover (wave buttons)
// =====================================================

(function () {

  const canvas   = document.getElementById('oscilloscope-canvas');
  const ctx      = canvas.getContext('2d');
  const waveBtns = document.querySelectorAll('.wave-btn');
  const colorBtns= document.querySelectorAll('.color-btn');
  const freqSlider  = document.getElementById('osc-freq');
  const ampSlider   = document.getElementById('osc-amp');
  const speedSlider = document.getElementById('osc-speed');
  const freqVal     = document.getElementById('osc-freq-val');
  const ampVal      = document.getElementById('osc-amp-val');
  const speedVal    = document.getElementById('osc-speed-val');
  const pauseBtn    = document.getElementById('osc-pause-btn');
  const pauseIcon   = document.getElementById('osc-pause-icon');
  const pauseLabel  = document.getElementById('osc-pause-label');
  const screenshotBtn = document.getElementById('osc-screenshot-btn');
  const waveLabel   = document.getElementById('osc-wave-label');
  const statPeriod  = document.getElementById('stat-period');
  const statVpp     = document.getElementById('stat-vpp');
  const statWave    = document.getElementById('stat-wave');

  // State
  let waveType  = 'sine';
  let frequency = 1.5;
  let amplitude = 0.7;
  let speed     = 1.5;
  let signalColor = '#c8b89a';
  let phase     = 0;
  let paused    = false;
  let animId    = null;

  const waveNames = {
    sine:     { label: 'SINE WAVE',     display: 'Sinusoidal' },
    square:   { label: 'SQUARE WAVE',   display: 'Kotak' },
    sawtooth: { label: 'SAWTOOTH WAVE', display: 'Gigi Gergaji' },
    triangle: { label: 'TRIANGLE WAVE', display: 'Segitiga' }
  };

  // Resize canvas to match display size
  function resizeCanvas() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', () => { resizeCanvas(); });

  // --- Wave generators ---
  function getSample(x) {
    const t = x * frequency * Math.PI * 2 + phase;
    switch (waveType) {
      case 'sine':
        return Math.sin(t);
      case 'square':
        return Math.sin(t) >= 0 ? 1 : -1;
      case 'sawtooth':
        return 1 - 2 * ((t / (2 * Math.PI)) % 1);
      case 'triangle':
        return 2 * Math.abs(2 * ((t / (2 * Math.PI)) % 1) - 1) - 1;
      default:
        return Math.sin(t);
    }
  }

  // --- Draw oscilloscope ---
  function draw() {
    const W = canvas.width;
    const H = canvas.height;

    // Clear
    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = '#050a05';
    ctx.fillRect(0, 0, W, H);

    // Grid lines
    drawGrid(W, H);

    // Draw signal
    drawSignal(W, H);

    // Advance phase
    if (!paused) {
      phase += 0.025 * speed;
    }
  }

  function drawGrid(W, H) {
    const cols = 10;
    const rows = 6;
    const stepX = W / cols;
    const stepY = H / rows;

    // Major grid
    ctx.strokeStyle = 'rgba(80, 200, 80, 0.07)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= cols; i++) {
      ctx.beginPath();
      ctx.moveTo(i * stepX, 0);
      ctx.lineTo(i * stepX, H);
      ctx.stroke();
    }
    for (let j = 0; j <= rows; j++) {
      ctx.beginPath();
      ctx.moveTo(0, j * stepY);
      ctx.lineTo(W, j * stepY);
      ctx.stroke();
    }

    // Center axes
    ctx.strokeStyle = 'rgba(80, 200, 80, 0.2)';
    ctx.lineWidth = 1;
    // X axis (center)
    ctx.beginPath();
    ctx.moveTo(0, H / 2);
    ctx.lineTo(W, H / 2);
    ctx.stroke();
    // Y axis
    ctx.beginPath();
    ctx.moveTo(W * 0.05, 0);
    ctx.lineTo(W * 0.05, H);
    ctx.stroke();

    // Tick marks on center axes
    ctx.fillStyle = 'rgba(80, 200, 80, 0.25)';
    for (let i = 0; i <= cols; i++) {
      ctx.fillRect(i * stepX - 0.5, H / 2 - 4, 1, 8);
    }
    for (let j = 0; j <= rows; j++) {
      ctx.fillRect(W * 0.05 - 4, j * stepY - 0.5, 8, 1);
    }
  }

  function drawSignal(W, H) {
    const centerY = H / 2;
    const amp     = (H / 2 - 20) * amplitude;
    const steps   = W * 2;          // oversample for smooth curve

    // Glow pass (blur effect via multiple strokes)
    const hexToRgba = (hex, alpha) => {
      const r = parseInt(hex.slice(1,3),16);
      const g = parseInt(hex.slice(3,5),16);
      const b = parseInt(hex.slice(5,7),16);
      return `rgba(${r},${g},${b},${alpha})`;
    };

    // Outer glow
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * W;
      const t = i / steps;          // 0..1 across screen
      const y = centerY - amp * getSample(t);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = hexToRgba(signalColor, 0.15);
    ctx.lineWidth   = 8;
    ctx.shadowBlur  = 0;
    ctx.stroke();

    // Mid glow
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * W;
      const t = i / steps;
      const y = centerY - amp * getSample(t);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = hexToRgba(signalColor, 0.35);
    ctx.lineWidth   = 3;
    ctx.stroke();

    // Sharp line
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * W;
      const t = i / steps;
      const y = centerY - amp * getSample(t);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = signalColor;
    ctx.lineWidth   = 1.5;
    ctx.shadowColor = signalColor;
    ctx.shadowBlur  = 6;
    ctx.stroke();
    ctx.shadowBlur  = 0;
  }

  // --- Animation loop ---
  function loop() {
    draw();
    animId = requestAnimationFrame(loop);
  }
  loop();

  // --- Update stats display ---
  function updateStats() {
    const period = (1 / frequency).toFixed(2);
    const vpp    = Math.round(amplitude * 200);
    statPeriod.textContent = `${period} s`;
    statVpp.textContent    = `${vpp} mV`;
    statWave.textContent   = waveNames[waveType].display;
    waveLabel.textContent  = waveNames[waveType].label;
  }
  updateStats();

  // --- Event: Wave type buttons (click + mouseover) ---
  waveBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      waveBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      waveType = btn.getAttribute('data-wave');
      updateStats();
    });

    // Event: mouseover — preview label
    btn.addEventListener('mouseover', () => {
      const key = btn.getAttribute('data-wave');
      waveLabel.textContent = waveNames[key].label;
    });
    btn.addEventListener('mouseout', () => {
      waveLabel.textContent = waveNames[waveType].label;
    });
  });

  // --- Event: Color buttons ---
  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      colorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      signalColor = btn.getAttribute('data-color');
    });
  });

  // --- Event: Sliders (input) ---
  freqSlider.addEventListener('input', () => {
    frequency = parseFloat(freqSlider.value);
    freqVal.textContent = `${frequency.toFixed(1)} Hz`;
    updateStats();
  });

  ampSlider.addEventListener('input', () => {
    amplitude = parseInt(ampSlider.value) / 100;
    ampVal.textContent = `${ampSlider.value}%`;
    updateStats();
  });

  speedSlider.addEventListener('input', () => {
    speed = parseFloat(speedSlider.value);
    speedVal.textContent = `${speed.toFixed(1)}×`;
  });

  // --- Event: Pause / Resume ---
  pauseBtn.addEventListener('click', () => {
    paused = !paused;
    pauseIcon.className = paused ? 'fas fa-play' : 'fas fa-pause';
    pauseLabel.textContent = paused ? 'Resume' : 'Pause';
  });

  // --- Event: Screenshot (download canvas as PNG) ---
  screenshotBtn.addEventListener('click', () => {
    // Draw one still frame first
    draw();
    const link = document.createElement('a');
    link.download = `osiloskop-${waveType}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  });

})();


// =====================================================
// 8. WEATHER — OpenWeatherMap API
// =====================================================
// ⚠️  GANTI nilai di bawah dengan API key kamu!
//     Daftar gratis di https://openweathermap.org/api
const OPENWEATHER_API_KEY = 'MASUKKAN_API_KEY_KAMU_DISINI';

const WEATHER_CITY    = 'Makassar';
const WEATHER_COUNTRY = 'ID';
const WEATHER_UNITS   = 'metric';
const WEATHER_LANG    = 'id';

const elWeatherLoading  = document.getElementById('weather-loading');
const elWeatherContent  = document.getElementById('weather-content');
const elWeatherError    = document.getElementById('weather-error');
const elWeatherErrorMsg = document.getElementById('weather-error-msg');
const elApiKeyInfo      = document.getElementById('weather-apikey-info');

function showWeatherState(state) {
  elWeatherLoading.classList.add('hidden');
  elWeatherContent.classList.add('hidden');
  elWeatherError.classList.add('hidden');
  if (state === 'loading') elWeatherLoading.classList.remove('hidden');
  if (state === 'content') elWeatherContent.classList.remove('hidden');
  if (state === 'error')   elWeatherError.classList.remove('hidden');
}

async function fetchWeather() {
  // Jika API key belum diset, tampilkan demo
  if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === 'MASUKKAN_API_KEY_KAMU_DISINI') {
    showWeatherState('content');
    elApiKeyInfo.classList.remove('hidden');
    // Isi dengan data demo
    document.getElementById('weather-icon').src =
      'https://openweathermap.org/img/wn/02d@2x.png';
    document.getElementById('weather-temp').textContent    = '31';
    document.getElementById('weather-city').textContent    = 'Makassar, ID';
    document.getElementById('weather-desc').textContent    = 'Sebagian berawan';
    document.getElementById('weather-humidity').textContent = '78%';
    document.getElementById('weather-wind').textContent    = '4.2 m/s';
    document.getElementById('weather-feels').textContent   = '36°C';
    document.getElementById('weather-vis').textContent     = '10 km';
    document.getElementById('weather-updated').textContent = '⚠ Data demo — belum ada API key';
    return;
  }

  elApiKeyInfo.classList.add('hidden');
  showWeatherState('loading');

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${WEATHER_CITY},${WEATHER_COUNTRY}&units=${WEATHER_UNITS}&lang=${WEATHER_LANG}&appid=${OPENWEATHER_API_KEY}`;
    const res  = await fetch(url);

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || `HTTP ${res.status}`);
    }

    const data = await res.json();

    // Populate UI
    document.getElementById('weather-icon').src =
      `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('weather-temp').textContent =
      Math.round(data.main.temp);
    document.getElementById('weather-city').textContent =
      `${data.name}, ${data.sys.country}`;
    document.getElementById('weather-desc').textContent =
      data.weather[0].description.charAt(0).toUpperCase() +
      data.weather[0].description.slice(1);
    document.getElementById('weather-humidity').textContent =
      `${data.main.humidity}%`;
    document.getElementById('weather-wind').textContent =
      `${data.wind.speed.toFixed(1)} m/s`;
    document.getElementById('weather-feels').textContent =
      `${Math.round(data.main.feels_like)}°C`;
    document.getElementById('weather-vis').textContent =
      `${(data.visibility / 1000).toFixed(1)} km`;

    const now = new Date();
    document.getElementById('weather-updated').textContent =
      `Diperbarui: ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`;

    showWeatherState('content');
  } catch (err) {
    elWeatherErrorMsg.textContent = `Gagal: ${err.message}`;
    showWeatherState('error');
    console.error('Weather API error:', err);
  }
}

// Init
fetchWeather();

// Refresh button
document.getElementById('weather-refresh')?.addEventListener('click', fetchWeather);
document.getElementById('weather-retry')?.addEventListener('click', fetchWeather);
