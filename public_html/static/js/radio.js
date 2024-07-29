import * as mm from 'https://cdn.jsdelivr.net/npm/music-metadata@10.0.0/+esm';

document.addEventListener('DOMContentLoaded', () => {
    const songSelect = document.getElementById('songSelect');
    const audioPlayer = document.getElementById('audioPlayer');
    const coverImage = document.getElementById('cover');
    const songTitle = document.getElementById('songTitle');
    const artist = document.getElementById('artist');
    const album = document.getElementById('album');

    function decodeURIComponentSafe(str) {
        try {
            return decodeURIComponent(str);
        } catch (e) {
            console.error('Error decoding URI component:', e);
            return str;
        }
    }

    function fetchSongs() {
        fetch('/songs/')
            .then(response => response.text())
            .then(text => {
                const songFiles = text.match(/href="([^"]+\.mp3)"/g)?.map(item => item.replace(/href="([^"]+\.mp3)"/, '$1')) || [];

                songFiles.forEach(song => {
                    const decodedSong = decodeURIComponentSafe(song);
                    const option = document.createElement('option');
                    option.value = decodedSong;
                    option.textContent = decodedSong.replace('.mp3', '').replace(/%20/g, ' ');
                    songSelect.appendChild(option);
                });

                if (songFiles.length > 0) {
                    songSelect.value = songFiles[0];
                    updatePlayer(songFiles[0]);
                }
            })
            .catch(error => console.error('Error fetching songs:', error));
    }

    async function updatePlayer(song) {
        const decodedSong = decodeURIComponentSafe(song);
        audioPlayer.src = `/songs/${decodedSong}`;
        audioPlayer.play();

        // Fetch metadata using music-metadata
        try {
            const response = await fetch(audioPlayer.src);
            const arrayBuffer = await response.arrayBuffer();
            const metadata = await mm.parseBlob(new Blob([arrayBuffer]));

            const { common } = metadata;
            coverImage.src = common.picture?.[0]?.data ? URL.createObjectURL(new Blob([common.picture[0].data])) : '';
            songTitle.textContent = common.title || 'Unknown Title';
            artist.textContent = common.artist || 'Unknown Artist';
            album.textContent = common.album || 'Unknown Album';
        } catch (error) {
            console.error('Error fetching metadata:', error);
            coverImage.src = '';
            songTitle.textContent = 'Unknown Title';
            artist.textContent = 'Unknown Artist';
            album.textContent = 'Unknown Album';
        }
    }

    songSelect.addEventListener('change', () => {
        const song = songSelect.value;
        updatePlayer(song);
    });

    fetchSongs();
});
