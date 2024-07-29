document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('audio');
  const songSelect = document.getElementById('song-select');
  const cover = document.getElementById('cover');
  const title = document.getElementById('title');
  const artist = document.getElementById('artist');
  const album = document.getElementById('album');

  // Load songs from server
  function loadSongs() {
    fetch('/media/songs')
      .then(response => response.json())
      .then(data => {
        songSelect.innerHTML = ''; // Clear previous options
        data.songs.forEach(song => {
          const option = document.createElement('option');
          option.value = song.url;
          option.text = song.title;
          songSelect.add(option);
        });
      })
      .catch(error => console.error('Error fetching songs:', error));
  }

  // Handle song selection
  songSelect.addEventListener('change', function() {
    const selectedSong = songSelect.options[songSelect.selectedIndex];
    audio.src = selectedSong.value;

    // Update player info
    const song = Array.from(songSelect.options).find(opt => opt.value === selectedSong.value);
    title.textContent = song.text;
    artist.textContent = song.dataset.artist || 'Unknown Artist';
    album.textContent = song.dataset.album || 'Unknown Album';
    cover.src = song.dataset.cover || '';
  });

  // Toggle play/pause
  function togglePlay() {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  // Seek function
  function seek(seconds) {
    if (isFinite(seconds) && seconds >= 0 && seconds <= audio.duration) {
      audio.currentTime = seconds;
    }
  }

  // Initial load
  loadSongs();
});
