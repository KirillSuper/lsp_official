import { magicCity } from './data/albums/magicCity.js';
import { tragicCity } from './data/albums/tragicCity.js';
import { oneMoreCity } from './data/albums/oneMoreCity.js';
import { viselitsa } from './data/albums/viselitsa.js';
import { yop } from './data/albums/yop.js';
import { konditerskaya } from './data/albums/konditerskaya.js';
import { neschastnyeLyudi } from './data/albums/neschastnyeLyudi.js';
import { videtTsvetnyeSny } from './data/albums/videtTsvetnyeSny.js';
import { svinoeRylo } from './data/albums/svinoeRylo.js';
import { romanticColegtion } from './data/albums/romanticColegtion.js';

const tracks = [
    ...magicCity,
    ...tragicCity,
    ...oneMoreCity,
    ...viselitsa,
    ...yop,
    ...konditerskaya,
    ...neschastnyeLyudi,
    ...videtTsvetnyeSny,
    ...svinoeRylo,
    ...romanticColegtion
];

let currentTrackItem = null;

// Функция для отображения треков
function displayTracks(trackList, isTopTracks = false) {
    const resultsContainer = document.querySelector('.search-results');
    if (!resultsContainer) return;

    resultsContainer.innerHTML = '';

    if (trackList.length === 0) {
        const noResults = document.createElement('p');
        noResults.classList.add('no-results');
        noResults.textContent = 'Треки не найдены';
        resultsContainer.appendChild(noResults);
        return;
    }

    const tracksToShow = isTopTracks ? trackList.slice(0, 3) : trackList;

    if (isTopTracks) {
        resultsContainer.classList.add('top-tracks');
    } else {
        resultsContainer.classList.remove('top-tracks');
    }

    tracksToShow.forEach(track => {
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

        resultsContainer.appendChild(trackItem);
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

    // Скрываем плеер
    player.classList.remove('show');
    player.classList.remove('minimized');
}

function toggleMinimize() {
    const player = document.getElementById('audioPlayer');

    player.classList.toggle('minimized');
}

document.getElementById('closePlayer').addEventListener('click', closePlayer);
document.getElementById('minimizePlayer').addEventListener('click', toggleMinimize);

function sortTracks(trackList, sortCriteria) {
    let sortedTracks = [...trackList];

    sortCriteria.forEach(criterion => {
        switch (criterion) {
            case 'popularity-desc':
                sortedTracks.sort((a, b) => b.popularity - a.popularity);
                break;
            case 'popularity-asc':
                sortedTracks.sort((a, b) => a.popularity - b.popularity);
                break;
            case 'album-asc':
                sortedTracks.sort((a, b) => a.album.localeCompare(b.album));
                break;
            case 'album-desc':
                sortedTracks.sort((a, b) => b.album.localeCompare(a.album));
                break;
            case 'year-asc':
                sortedTracks.sort((a, b) => a.year - b.year);
                break;
            case 'year-desc':
                sortedTracks.sort((a, b) => b.year - a.year);
                break;
            case 'mood-sad':
                sortedTracks = sortedTracks.filter(track => track.mood === 'sad');
                break;
            case 'mood-happy':
                sortedTracks = sortedTracks.filter(track => track.mood === 'happy');
                break;
            default:
                break;
        }
    });

    return sortedTracks;
}

function searchTracks(query, sortCriteria) {
    const lowerQuery = query.toLowerCase().trim();
    let filteredTracks = tracks.filter(track => {
        return (
            track.title.toLowerCase().includes(lowerQuery) ||
            track.artist.toLowerCase().includes(lowerQuery)
        );
    });

    filteredTracks = sortTracks(filteredTracks, sortCriteria);

    displayFilteredTracks(filteredTracks);
}

function displayFilteredTracks(trackList) {
    const resultsContainer = document.querySelector('.search-results');
    if (!resultsContainer) return;

    resultsContainer.innerHTML = '';

    if (trackList.length === 0) {
        const noResults = document.createElement('p');
        noResults.classList.add('no-results');
        noResults.textContent = 'Треки не найдены';
        resultsContainer.appendChild(noResults);
        return;
    }

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

        resultsContainer.appendChild(trackItem);
    });
}

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

export function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const sortSelects = document.querySelectorAll('.sort-tracks');
    const filterToggleButton = document.querySelector('.filter-toggle-button');
    const filterContainer = document.querySelector('#filterContainer');

    if (!searchInput || !searchButton || sortSelects.length === 0 || !filterToggleButton || !filterContainer) return;

    const defaultSortCriteria = ['popularity-desc'];

    const updateButtonState = () => {
        if (searchInput.value.trim() === '') {
            searchButton.textContent = 'Найти';
            searchButton.classList.remove('clear-button');
        } else {
            searchButton.textContent = 'Очистить';
            searchButton.classList.add('clear-button');
        }
    };

    let filtersVisible = false;
    let isFiltered = false;

    filterToggleButton.addEventListener('click', () => {
        filtersVisible = !filtersVisible;
        if (filtersVisible) {
            filterContainer.style.display = 'block';
            filterToggleButton.textContent = 'Скрыть фильтры';
        } else {
            filterContainer.style.display = 'none';
            filterToggleButton.textContent = 'Фильтры';
            // Сбрасываем значения фильтров
            sortSelects.forEach(select => {
                select.value = '';
            });
            if (!searchInput.value.trim()) {
                const topTracks = sortTracks(tracks, defaultSortCriteria);
                displayTracks(topTracks, true);
                isFiltered = false;
            } else {
                searchTracks(searchInput.value, []);
            }
        }
    });

    const debouncedSearch = debounce((query) => {
        const currentSortCriteria = Array.from(sortSelects)
            .map(select => select.value)
            .filter(value => value !== '');
        if (query.trim() || currentSortCriteria.length > 0) {
            isFiltered = true;
            searchTracks(query, currentSortCriteria);
        } else {
            isFiltered = false;
            const topTracks = sortTracks(tracks, defaultSortCriteria);
            displayTracks(topTracks, true);
        }
        updateButtonState();
    }, 300);

    searchInput.addEventListener('input', (e) => {
        debouncedSearch(e.target.value);
    });

    searchButton.addEventListener('click', () => {
        if (searchInput.value.trim() === '') {
            const currentSortCriteria = Array.from(sortSelects)
                .map(select => select.value)
                .filter(value => value !== '');
            if (currentSortCriteria.length > 0) {
                const sortedTracks = sortTracks(tracks, currentSortCriteria);
                displayTracks(sortedTracks);
            } else {
                const topTracks = sortTracks(tracks, defaultSortCriteria);
                displayTracks(topTracks, true);
                isFiltered = false;
            }
        } else {
            searchInput.value = '';
            const currentSortCriteria = Array.from(sortSelects)
                .map(select => select.value)
                .filter(value => value !== '');
            if (currentSortCriteria.length > 0) {
                const sortedTracks = sortTracks(tracks, currentSortCriteria);
                displayTracks(sortedTracks);
            } else {
                const topTracks = sortTracks(tracks, defaultSortCriteria);
                displayTracks(topTracks, true);
                isFiltered = false;
            }
        }
        updateButtonState();
    });

    sortSelects.forEach(select => {
        select.addEventListener('change', () => {
            const query = searchInput.value;
            const currentSortCriteria = Array.from(sortSelects)
                .map(select => select.value)
                .filter(value => value !== '');
            if (query.trim() || currentSortCriteria.length > 0) {
                isFiltered = true;
                searchTracks(query, currentSortCriteria);
            } else {
                isFiltered = false;
                const topTracks = sortTracks(tracks, defaultSortCriteria);
                displayTracks(topTracks, true);
            }
        });
    });

    updateButtonState();
}