// Кадры одной машины под разными углами для честного эффекта 360°
const IMAGES = [
    "https://cloudimg.io",
    "https://cloudimg.io",
    "https://cloudimg.io",
    "https://cloudimg.io",
    "https://cloudimg.io"
];
const TOTAL_FRAMES = IMAGES.length;
const SENSITIVITY = 20; // Высокая чувствительность для плавности

const container = document.getElementById('rotate-container');
const img = document.getElementById('product-image');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

let isDragging = false;
let startX = 0;
let baseFrame = 0;
let targetFrame = 0;  
let currentFrame = 0; 

// Кеширование картинок
IMAGES.forEach(src => { const i = new Image(); i.src = src; });

function updateDOM() {
    let frameIndex = Math.round(currentFrame) % TOTAL_FRAMES;
    if (frameIndex < 0) frameIndex += TOTAL_FRAMES;
    if (img) img.src = IMAGES[frameIndex];
}

// Рендер-петля GSAP для инерции
if (window.gsap && gsap.ticker) {
    gsap.ticker.add(() => {
        currentFrame += (targetFrame - currentFrame) * 0.12; // 0.12 дает очень масляную плавность
        updateDOM();
    });
}

// Авто-вращение
let autoRotateInterval = setInterval(() => {
    targetFrame += 1;
}, 2500);

function stopAutoRotate() {
    if (autoRotateInterval) {
        clearInterval(autoRotateInterval);
        autoRotateInterval = null;
    }
}

// Нажатия на стрелки
if (btnPrev) btnPrev.addEventListener('click', () => { stopAutoRotate(); targetFrame -= 1; });
if (btnNext) btnNext.addEventListener('click', () => { stopAutoRotate(); targetFrame += 1; });

// Обработка Drag & Touch
const getX = (e) => e.touches ? e.touches[0].clientX : e.clientX;

function startDrag(e) {
    stopAutoRotate();
    isDragging = true;
    startX = getX(e);
    baseFrame = targetFrame;
    if (container) container.style.cursor = 'grabbing';
}

function moveDrag(e) {
    if (!isDragging) return;
    const currentX = getX(e);
    const deltaX = currentX - startX;
    const frameOffset = Math.floor(deltaX / SENSITIVITY);
    targetFrame = baseFrame - frameOffset;
}

function stopDrag() {
    isDragging = false;
    if (container) container.style.cursor = 'grab';
}

if (container) {
    container.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', moveDrag);
    window.addEventListener('mouseup', stopDrag);

    container.addEventListener('touchstart', startDrag, { passive: true });
    container.addEventListener('touchmove', moveDrag, { passive: true });
    container.addEventListener('touchend', stopDrag);
}
