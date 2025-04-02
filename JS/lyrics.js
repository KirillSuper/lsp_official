// Массив цитат
const lyrics = [
    "Монетка упала — решай, чья беда",
    "Я пью коктейль из виски и дождя",
    "Ты мой маленький Токио",
    "Всё, что нужно — это свет в конце туннеля",
    "Мы летим над городом, как птицы в ночи",
    "Ты мой рай, ты мой ад, ты мой каждый день",
    "Коктейль в руке, а в глазах — огонь",
    "Сквозь шум улиц слышу твой голос",
    "Танцуй, пока не упадёшь, это наш ритм",
    "Мир — это сцена, а мы — актёры в нём",
    "Дым над городом, как воспоминания",
    "Ты мой магнит, притягиваешь в хаос"
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

export { initLyrics };