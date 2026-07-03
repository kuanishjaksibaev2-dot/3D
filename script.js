const images = [
    "https://picsum.photos/id/21/600/600",
    "https://picsum.photos/id/22/600/600",
    "https://picsum.photos/id/23/600/600",
    "https://picsum.photos/id/24/600/600",
    "https://picsum.photos/id/25/600/600"
];

let currentIndex = 0;
const totalImages = images.length;

const imgElement = document.getElementById('product-image');
const container = document.getElementById('rotate-container');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

function updateImage(index) {
    imgElement.src = images[index];
}

btnNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalImages;
    updateImage(currentIndex);
});

btnPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateImage(currentIndex);
});

const SENSITIVITY = 25;
let isDragging = false;
let startX = 0;

function rotate(difference) {
    if (Math.abs(difference) < SENSITIVITY) return false;
    if (difference > 0) {
        currentIndex = (currentIndex + 1) % totalImages;
    } else {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    }
    updateImage(currentIndex);
    return true;
}

container.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
});
window.addEventListener('mouseup', () => {
    isDragging = false;
});
container.addEventListener('mouseleave', () => {
    isDragging = false;
});
container.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const difference = startX - currentX;
    if (rotate(difference)) {
        startX = currentX;
    }
});

container.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
}, { passive: true });

window.addEventListener('touchend', () => {
    isDragging = false;
});

container.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const difference = startX - currentX;
    if (rotate(difference)) {
        startX = currentX;
    }
}, { passive: true });