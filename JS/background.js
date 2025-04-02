// Массив фонов
const backgrounds = [
    './images/fons/fon1.jpg',
    './images/fons/fon2.jpg',
    './images/fons/fon3.jpg'
];

let currentIndex = 0;

// Предварительная загрузка изображений
function preloadImages(urls) {
    return Promise.all(
        urls.map(url => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = () => resolve(url);
                img.onerror = () => {
                    console.error(`Failed to load image: ${url}`);
                    reject(url);
                };
            });
        })
    );
}

// Функция смены фона с двумя слоями
function changeBackground(bg1, bg2) {
    const nextIndex = (currentIndex + 1) % backgrounds.length;

    const frontLayer = bg1.style.opacity === '1' ? bg1 : bg2;
    const backLayer = bg1.style.opacity === '0' ? bg1 : bg2;

    backLayer.style.backgroundImage = `url('${backgrounds[nextIndex]}')`;

    frontLayer.classList.add('fade-out');
    backLayer.classList.add('fade-in');

    setTimeout(() => {
        frontLayer.style.opacity = '0';
        backLayer.style.opacity = '1';
        frontLayer.classList.remove('fade-out');
        backLayer.classList.remove('fade-in');

        currentIndex = nextIndex;

        setTimeout(() => changeBackground(bg1, bg2), 5000);
    }, 2000);
}

// Инициализация фонов
async function initBackground() {
    try {
        await preloadImages(backgrounds);
        console.log('All background images loaded successfully');
    } catch (error) {
        console.error('Some background images failed to load:', error);
    }

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const background1 = document.createElement('div');
        background1.classList.add('hero-background');
        background1.style.position = 'absolute';
        background1.style.top = '0';
        background1.style.left = '0';
        background1.style.width = '100%';
        background1.style.height = '100%';
        background1.style.backgroundImage = `url('${backgrounds[0]}')`;
        background1.style.backgroundSize = 'cover';
        background1.style.backgroundPosition = 'center';
        background1.style.zIndex = '-1';
        background1.style.opacity = '1';

        const background2 = document.createElement('div');
        background2.classList.add('hero-background');
        background2.style.position = 'absolute';
        background2.style.top = '0';
        background2.style.left = '0';
        background2.style.width = '100%';
        background2.style.height = '100%';
        background2.style.backgroundSize = 'cover';
        background2.style.backgroundPosition = 'center';
        background2.style.zIndex = '-1';
        background2.style.opacity = '0';

        heroSection.appendChild(background1);
        heroSection.appendChild(background2);

        setTimeout(() => changeBackground(background1, background2), 7000);
    }
}

export { initBackground };