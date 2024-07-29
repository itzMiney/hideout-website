const express = require('express');
const fs = require('fs');
const path = require('path');
const ID3Reader = require('id3-reader');

const app = express();
const port = 3000; // Adjust the port as needed

const songsDirectory = path.join(__dirname, 'songs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/media/songs', (req, res) => {
  fs.readdir(songsDirectory, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan directory.');
    }

    const mp3Files = files.filter(file => file.endsWith('.mp3'));
    const songDataPromises = mp3Files.map(file => {
      return new Promise((resolve, reject) => {
        const filePath = path.join(songsDirectory, file);
        ID3Reader.read(filePath, (err, tags) => {
          if (err) return reject(err);
          resolve({
            url: `/songs/${file}`,
            title: tags.title || file,
            artist: tags.artist || 'Unknown Artist',
            album: tags.album || 'Unknown Album',
            cover: tags.picture ? `data:${tags.picture.format};base64,${tags.picture.data.toString('base64')}` : null
          });
        });
      });
    });

    Promise.all(songDataPromises)
      .then(songs => res.json({ songs }))
      .catch(err => res.status(500).send('Error reading song metadata.'));
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
