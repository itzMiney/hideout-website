const audioPlayer = document.getElementById('audio-player');
const songSelect = document.getElementById('song-select');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const coverImage = document.getElementById('cover-image');
const playButton = document.getElementById('play-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const progressBar = document.getElementById('progress-bar');

let songs = [];
let currentIndex = 0;
let isPlaying = false;

// Function to fetch songs metadata
async function fetchSongs() {
    const response = await fetch('/media/songs');
    songs = await response.json();
    populateSongSelect();
}

// Populate the song select dropdown
function populateSongSelect() {
    songs.forEach((song, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = song.title;
        songSelect.appendChild(option);
    });
}

// Load a song
function loadSong(index) {
    const song = songs[index];
    audioPlayer.src = `/songs/${song.file}`;
    songTitle.textContent = song.title;
    songArtist.textContent = `${song.artist} • ${song.album || ''}`;
    coverImage.src = song.cover || '/media/images/default-cover.jpg';
    currentIndex = index;
}

// Play or pause the song
function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
        playButton.textContent = '▶️';
    } else {
        audioPlayer.play();
        playButton.textContent = '⏸️';
    }
    isPlaying = !isPlaying;
}

// Play the previous song
function playPrev() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    if (isPlaying) audioPlayer.play();
}

// Play the next song
function playNext() {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    if (isPlaying) audioPlayer.play();
}

// Update progress bar
function updateProgress() {
    const { duration, currentTime } = audioPlayer;
    progressBar.value = (currentTime / duration) * 100;
}

// Seek the song
function seek(event) {
    const { value } = event.target;
    audioPlayer.currentTime = (value / 100) * audioPlayer.duration;
}

// Event listeners
playButton.addEventListener('click', togglePlay);
prevButton.addEventListener('click', playPrev);
nextButton.addEventListener('click', playNext);
audioPlayer.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('input', seek);
songSelect.addEventListener('change', (event) => {
    loadSong(event.target.value);
    if (isPlaying) audioPlayer.play();
});

// Initial load
fetchSongs();