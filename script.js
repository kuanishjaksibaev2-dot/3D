// 1. Конфигурация и массив картинок
const IMAGES = [
    "https://picsum.photos/id/21/600/600",
    "https://picsum.photos/id/22/600/600",
    "https://picsum.photos/id/23/600/600",
    "https://picsum.photos/id/24/600/600",
    "https://picsum.photos/id/25/600/600"
];
const TOTAL_FRAMES = IMAGES.length;
const SENSITIVITY = 25; // Шаг чувствительности (в пикселях)

// 2. DOM Элементы
const container = document.getElementById('rotate-container');
const img = document.getElementById('product-image');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

// 3. Состояние вращения и плавности (GSAP)
let isDragging = false;
let startX = 0;
let baseFrame = 0;
let targetFrame = 0;  // Целевой кадр, к которому стремится анимация
let currentFrame = 0; // Текущий дробный кадр на экране

// Предзагрузка картинок в кэш браузера (чтобы не было мигания)
IMAGES.forEach(src => { const i = new Image(); i.src = src; });

// Функция обновления картинки в DOM
function updateDOM() {
    let frameIndex = Math.round(currentFrame) % TOTAL_FRAMES;
    if (frameIndex < 0) frameIndex += TOTAL_FRAMES;
    img.src = IMAGES[frameIndex];
}

// Рендер-петля GSAP (работает на частоте монитора, создавая инерцию)
gsap.ticker.add(() => {
    // Формула плавного замедления (lerp). 0.15 — скорость доводки
    currentFrame += (targetFrame - currentFrame) * 0.15;
    updateDOM();
});

// 4. Логика авто-вращения товара при старте
let autoRotateInterval = setInterval(() => {
    targetFrame += 1; // Сдвигаем на 1 кадр каждые 2 секунды
}, 2000);

// Функция полной остановки авто-вращения при действии пользователя
function stopAutoRotate() {
    if (autoRotateInterval) {
        clearInterval(autoRotateInterval);
        autoRotateInterval = null;
    }
}

// 5. Обработчики кликов по кнопкам стрелок
btnPrev.addEventListener('click', () => {
    stopAutoRotate();
    targetFrame -= 1;
});
btnNext.addEventListener('click', () => {
    stopAutoRotate();
    targetFrame += 1;
});

// Получение X координат для мыши и тача
const getX = (e) => e.touches ? e.touches[0].clientX : e.clientX;

// 6. Логика Drag & Drop и Touch свайпов
function startDrag(e) {
    stopAutoRotate(); // Останавливаем авто-крутилку при первом касании
    isDragging = true;
    startX = getX(e);
    baseFrame = targetFrame;
    container.style.cursor = 'grabbing';
}

function moveDrag(e) {
    if (!isDragging) return;
    const currentX = getX(e);
    const deltaX = currentX - startX;
    
    // Вычисляем смещение кадров
    const frameOffset = Math.floor(deltaX / SENSITIVITY);
    targetFrame = baseFrame - frameOffset; // Минус инвертирует вращение под палец
}

function stopDrag() {
    isDragging = false;
    container.style.cursor = 'grab';
}

// Регистрация событий мыши
container.addEventListener('mousedown', startDrag);
window.addEventListener('mousemove', moveDrag);
window.addEventListener('mouseup', stopDrag);

// Регистрация событий тачскрина для смартфонов
container.addEventListener('touchstart', startDrag, { passive: true });
window.addEventListener('touchmove', moveDrag, { passive: true });
window.addEventListener('touchend', stopDrag);

// Предотвращение зависания при потере фокуса окна
window.addEventListener('blur', stopDrag);
