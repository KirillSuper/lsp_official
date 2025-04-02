import { svinoeRylo } from './../../JS/data/albums/svinoeRylo.js';

let currentTrackItem = null; // Переменная для хранения текущей активной карточки

function displayTracks(trackList) {
    const tracksContainer = document.querySelector('#svinoeRyloTracks');
    if (!tracksContainer) return;

    tracksContainer.innerHTML = '';

    trackList.forEach(track => {
        const trackItem = document.createElement('div');
        trackItem.classList.add('track-item');

        trackItem.innerHTML = `
            <img src="${track.image}" alt="${track.album}">
            <div class="track-info">
                <h3>${track.title}</h3>
                <p class="artist">${track.artist}</p>
            </div>
        `;

        // Добавляем обработчик клика на карточку
        trackItem.addEventListener('click', () => handleTrackClick(track, trackItem));

        tracksContainer.appendChild(trackItem);
    });
}

function handleTrackClick(track, trackItem) {
    const player = document.getElementById('audioPlayer');
    const audioElement = document.getElementById('audioElement');
    const trackTitle = document.getElementById('trackTitle'); // Элемент для названия трека

    // Убираем класс active с предыдущей карточки
    if (currentTrackItem) {
        currentTrackItem.classList.remove('active');
    }

    // Добавляем класс active к текущей карточке
    trackItem.classList.add('active');
    currentTrackItem = trackItem;

    // Обновляем название трека
    trackTitle.textContent = `${track.title} - ${track.artist}`;

    // Загружаем выбранный трек
    audioElement.src = track.audio;

    // Показываем плеер
    player.classList.add('show');

    // Начинаем воспроизведение
    audioElement.play();

    // Слушаем событие окончания трека
    audioElement.addEventListener('ended', () => {
        // Убираем класс active после завершения воспроизведения
        if (currentTrackItem) {
            currentTrackItem.classList.remove('active');
            currentTrackItem = null;
        }
        // Очищаем название трека
        trackTitle.textContent = 'Выберите трек';
    });
}

// Функция для закрытия плеера
function closePlayer() {
    const player = document.getElementById('audioPlayer');
    const audioElement = document.getElementById('audioElement');
    const trackTitle = document.getElementById('trackTitle');

    // Останавливаем воспроизведение
    audioElement.pause();
    audioElement.currentTime = 0;

    // Убираем класс active с текущей карточки
    if (currentTrackItem) {
        currentTrackItem.classList.remove('active');
        currentTrackItem = null;
    }

    // Очищаем название трека
    trackTitle.textContent = 'Выберите трек';

    // Скрываем плеер
    player.classList.remove('show');
    player.classList.remove('minimized');
}

// Функция для сворачивания/разворачивания плеера
function toggleMinimize() {
    const player = document.getElementById('audioPlayer');

    // Переключаем класс minimized
    player.classList.toggle('minimized');
}

// Инициализация кнопок управления плеером
document.getElementById('closePlayer').addEventListener('click', closePlayer);
document.getElementById('minimizePlayer').addEventListener('click', toggleMinimize);






const lyrics = [
    "Свиное рыло, я в этом мире (Свиное рыло)",
    "Подельник мой, мы в этом вместе (Подельник)",
    "Стиморол в кармане, я свеж, как утро (Стиморол)",
    "Нежный зверь, но сердце из стали (Нежный зверь)",
    "Убийца свин, я иду на охоту (Убийца свин)"
];

let isLyricAnimating = false;

// Функция смены цитаты
function getRandomLyric() {
    if (isLyricAnimating) return;

    const lyricElement = document.querySelector('.random-lyric');
    if (!lyricElement) return;

    isLyricAnimating = true;
    lyricElement.classList.add('fade');

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * lyrics.length);
        lyricElement.textContent = lyrics[randomIndex];
        lyricElement.classList.remove('fade');
        isLyricAnimating = false;
    }, 500);
}

// Инициализация цитат
function initLyrics() {
    getRandomLyric();
    setInterval(getRandomLyric, 10000);

    const footer = document.querySelector('footer');
    if (footer) {
        footer.addEventListener('click', getRandomLyric);
    }
}

initLyrics();

function init() {
    displayTracks(svinoeRylo);
    
    document.getElementById('closePlayer').addEventListener('click', closePlayer);
    document.getElementById('minimizePlayer').addEventListener('click', toggleMinimize);

    const logo = document.querySelector('#logo');
    if (logo) {
        logo.addEventListener('click', () => {
            window.location.href = './../../index.html';
        });
    }
}

init();