import { oneMoreCity } from '../../JS/data/albums/oneMoreCity.js';

let currentTrackItem = null; // Переменная для хранения текущей активной карточки


function displayTracks(trackList) {
    const tracksContainer = document.querySelector('#oneMoreCityTracks');
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

    if (currentTrackItem) {
        currentTrackItem.classList.remove('active');
    }

    trackItem.classList.add('active');
    currentTrackItem = trackItem;

    trackTitle.textContent = `${track.title} - ${track.artist}`;

    audioElement.src = track.audio;

    player.classList.add('show');

    audioElement.play();

    audioElement.addEventListener('ended', () => {
        if (currentTrackItem) {
            currentTrackItem.classList.remove('active');
            currentTrackItem = null;
        }
        trackTitle.textContent = 'Выберите трек';
    });
}

function closePlayer() {
    const player = document.getElementById('audioPlayer');
    const audioElement = document.getElementById('audioElement');
    const trackTitle = document.getElementById('trackTitle');

    audioElement.pause();
    audioElement.currentTime = 0;

    if (currentTrackItem) {
        currentTrackItem.classList.remove('active');
        currentTrackItem = null;
    }

    trackTitle.textContent = 'Выберите трек';

    player.classList.remove('show');
    player.classList.remove('minimized');
}

function toggleMinimize() {
    const player = document.getElementById('audioPlayer');

    player.classList.toggle('minimized');
}

document.getElementById('closePlayer').addEventListener('click', closePlayer);
document.getElementById('minimizePlayer').addEventListener('click', toggleMinimize);

const lyrics = [
    "Прохожу по пасеке, собираю соты мятые...",
    "Как сильно ты мне нужна, не понимал...",
    "Я-Т-Е-Б-Я-Л-Ю-Б-Л-Ю наверно... пароль не верный :(",
    "Хочу забыть боль, я хочу на танцпол!",
    "Хоть иногда вспоминай меня, вдруг и увидимся... "
];

let isLyricAnimating = false;

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
    displayTracks(oneMoreCity);

    const logo = document.querySelector('#logo');
    if (logo) {
        logo.addEventListener('click', () => {
            window.location.href = './../../index.html';
        });
    }
}

init();