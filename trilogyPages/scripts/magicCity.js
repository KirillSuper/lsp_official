import { magicCity } from '../../JS/data/albums/magicCity.js';

let currentTrackItem = null;


function displayTracks(trackList) {
    const tracksContainer = document.querySelector('#magicCityTracks');
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

        trackItem.addEventListener('click', () => handleTrackClick(track, trackItem));

        tracksContainer.appendChild(trackItem);
    });
}

function handleTrackClick(track, trackItem) {
    const player = document.getElementById('audioPlayer');
    const audioElement = document.getElementById('audioElement');
    const trackTitle = document.getElementById('trackTitle');

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
    "Она кричит: «Хватит!» (Хватит), но мне не хватит (Нет), я-я срываю с неё платье..",
    "Она его любит и ненавидит, но с него ест!",
    "Эта детка просто пуля, самая спросовая чикуля!",
    "Дэвид Копперфилд наших дней; Уличная магия, я Дэвид Блейн...",
    "В кругу своих друзей убиваю этот день..."
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
    displayTracks(magicCity);

    const logo = document.querySelector('#logo');
    if (logo) {
        logo.addEventListener('click', () => {
            window.location.href = './../../index.html';
        });
    }
}

init();