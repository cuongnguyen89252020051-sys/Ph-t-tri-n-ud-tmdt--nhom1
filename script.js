// ===============================
// 1) Mảng lời chúc 20/11 và màu sắc bong bóng
// ===============================
const wishes = [
  "20/11, kính chúc thầy cô luôn mạnh khỏe, hạnh phúc và sống lâu với những niềm vui đẹp mỗi ngày.",
  "Cảm ơn thầy cô đã dạy chúng em biết yêu thương, biết học hỏi và biết đứng lên sau mỗi thất bại.",
  "Thầy cô là những người thắp sáng con đường tri thức cho chúng em. Chúc thầy cô ngày 20/11 thật hạnh phúc!",
  "Mong thầy cô luôn trẻ trung, vui vẻ, tràn đầy năng lượng và tiếp tục truyền cảm hứng cho thế hệ mai sau.",
  "Nhân ngày Nhà giáo Việt Nam, kính chúc thầy cô luôn bình an, vững vàng và luôn được đón nhận niềm tin yêu của học trò.",
  "Lời dạy của thầy cô là ngọn đèn dẫn đường. Chúc thầy cô luôn được yêu thương và ngưỡng mộ như từng ngày qua."
];

const bubblePalette = [
  "#ffd7ea",
  "#c8f2ff",
  "#d7d5ff",
  "#b8f2d8",
  "#ffe8ab",
  "#ffc4bf"
];

// ===============================
// 2) DOM references cho portfolio + bubble effect
// ===============================
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const yearEl = document.getElementById('year');
const reveals = document.querySelectorAll('.reveal');
const form = document.querySelector('.contact-form');
const bubbleLayer = document.getElementById('bubblesLayer');
const burstLayer = document.getElementById('burstLayer');
const wishPopup = document.getElementById('wishPopup');
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const celebrateBtn = document.getElementById('celebrateBtn');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ===============================
// 3) Portfolio interactions
// ===============================
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

reveals.forEach((element) => revealObserver.observe(element));

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const button = form.querySelector('button[type="submit"]');
    const original = button.textContent;
    button.textContent = 'Đã gửi!';
    button.disabled = true;

    setTimeout(() => {
      button.textContent = original;
      button.disabled = false;
      form.reset();
    }, 2000);
  });
}

// ===============================
// 4) Utility functions cho hiệu ứng bong bóng
// ===============================
const randomBetween = (min, max) => Math.random() * (max - min) + min;

function createSvgShape(shape, fillColor) {
  const base = 'viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet"';

  if (shape === 'circle') {
    return `
      <svg ${base}>
        <circle cx="50" cy="50" r="34" fill="${fillColor}" opacity="0.96"></circle>
        <circle cx="50" cy="50" r="20" fill="rgba(255,255,255,0.22)"></circle>
      </svg>
    `;
  }

  if (shape === 'heart') {
    return `
      <svg ${base}>
        <path d="M50 83 C 18 64, 10 42, 18 28 C 26 16, 39 16, 45 24 C 49 20, 63 16, 72 26 C 80 36, 79 52, 50 83 Z" fill="${fillColor}" opacity="0.95"></path>
      </svg>
    `;
  }

  if (shape === 'star') {
    return `
      <svg ${base}>
        <polygon points="50,8 59,38 92,38 65,57 75,90 50,68 25,90 35,57 8,38 41,38" fill="${fillColor}" opacity="0.94"></polygon>
      </svg>
    `;
  }

  // Hình bông hoa nhỏ
  return `
    <svg ${base}>
      <g>
        <ellipse cx="50" cy="28" rx="14" ry="22" fill="${fillColor}" opacity="0.92"></ellipse>
        <ellipse cx="50" cy="72" rx="14" ry="22" fill="${fillColor}" opacity="0.92"></ellipse>
        <ellipse cx="28" cy="50" rx="14" ry="22" fill="${fillColor}" opacity="0.92" transform="rotate(-90 28 50)"></ellipse>
        <ellipse cx="72" cy="50" rx="14" ry="22" fill="${fillColor}" opacity="0.92" transform="rotate(-90 72 50)"></ellipse>
        <circle cx="50" cy="50" r="12" fill="rgba(255,255,255,0.32)"></circle>
      </g>
    </svg>
  `;
}

function showWishPopup(randomWish) {
  wishPopup.textContent = randomWish;
  wishPopup.classList.add('visible');

  clearTimeout(showWishPopup.hideTimer);
  showWishPopup.hideTimer = setTimeout(() => {
    wishPopup.classList.remove('visible');
  }, 3500);
}

function createBubble() {
  const bubble = document.createElement('button');
  bubble.type = 'button';
  bubble.className = 'bubble';
  bubble.setAttribute('aria-label', 'Chúc mừng 20/11');

  const shapes = ['circle', 'heart', 'star', 'flower'];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  const fillColor = bubblePalette[Math.floor(Math.random() * bubblePalette.length)];
  const size = randomBetween(24, 72);
  const left = randomBetween(0, 100);
  const duration = randomBetween(12, 24);
  const drift = randomBetween(-80, 80);
  const delay = randomBetween(0, 3);

  bubble.dataset.shape = shape;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${left}%`;
  bubble.style.setProperty('--duration', `${duration}s`);
  bubble.style.setProperty('--drift', `${drift}px`);
  bubble.style.setProperty('--delay', `${delay}s`);
  bubble.style.setProperty('--bubble-color', fillColor);
  bubble.innerHTML = createSvgShape(shape, fillColor);

  bubble.addEventListener('click', (event) => {
    const clickedX = event.clientX || window.innerWidth / 2;
    const clickedY = event.clientY || window.innerHeight / 2;

    createExplosion(clickedX, clickedY);
    playPopSound();

    const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
    showWishPopup(randomWish);

    bubble.remove();
  });

  bubbleLayer.appendChild(bubble);

  setTimeout(() => {
    bubble.remove();
  }, duration * 1000 + 1800);
}

function createExplosion(x, y) {
  const count = 16;

  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'particle';

    const size = randomBetween(5, 11);
    const angle = (Math.PI * 2 * i) / count + randomBetween(-0.4, 0.4);
    const distance = randomBetween(25, 80);
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.background = bubblePalette[Math.floor(Math.random() * bubblePalette.length)];
    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);

    burstLayer.appendChild(particle);

    setTimeout(() => particle.remove(), 900);
  }
}

function playPopSound() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  const audioContext = new AudioContextClass();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(580, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(120, audioContext.currentTime + 0.12);

  gainNode.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.12, audioContext.currentTime + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.2);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.22);
}

// ===============================
// 5) Nhạc nền + nút Bật/Tắt âm thanh
// ===============================
function updateMusicButton() {
  if (bgMusic.muted || bgMusic.paused) {
    musicToggle.classList.add('muted');
    musicToggle.innerHTML = '<span class="music-icon">🔇</span>';
  } else {
    musicToggle.classList.remove('muted');
    musicToggle.innerHTML = '<span class="music-icon">🔊</span>';
  }
}

async function startMusic() {
  try {
    bgMusic.volume = 0.35;
    bgMusic.muted = false;
    await bgMusic.play();
    updateMusicButton();
  } catch (error) {
    console.warn('Autoplay bị chặn bởi trình duyệt. Người dùng cần tương tác trước:', error);
  }
}

if (musicToggle) {
  musicToggle.addEventListener('click', async () => {
    bgMusic.muted = !bgMusic.muted;
    if (!bgMusic.muted) {
      await startMusic();
    }
    updateMusicButton();
  });

  window.addEventListener('pointerdown', () => {
    if (bgMusic.paused) {
      startMusic();
    }
  }, { once: true });
}

if (celebrateBtn) {
  celebrateBtn.addEventListener('click', () => {
    const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
    showWishPopup(randomWish);

    for (let i = 0; i < 3; i += 1) {
      const x = window.innerWidth * (0.3 + Math.random() * 0.4);
      const y = window.innerHeight * (0.2 + Math.random() * 0.5);
      createExplosion(x, y);
    }
  });
}

// ===============================
// 6) Vòng lặp sinh bong bóng ngẫu nhiên
// ===============================
setInterval(() => {
  if (!bubbleLayer) return;
  const spawnCount = window.innerWidth < 640 ? 1 : 2;
  for (let i = 0; i < spawnCount; i += 1) {
    createBubble();
  }
}, 900);

for (let i = 0; i < 16; i += 1) {
  setTimeout(createBubble, i * 180);
}

updateMusicButton();
