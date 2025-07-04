// script.js
let audio = document.getElementById("audio");
let playlist = document.getElementById("playlist");
let upload = document.getElementById("upload");
let playBtn = document.getElementById("play");
let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");
let volumeSlider = document.getElementById("volume");
let searchInput = document.getElementById("search");
let toggleTheme = document.getElementById("toggle-theme");

let tracks = [];
let currentTrack = 0;

// Upload music files
upload.addEventListener("change", (e) => {
  const files = Array.from(e.target.files);
  files.forEach(file => {
    const url = URL.createObjectURL(file);
    tracks.push({ name: file.name, url });
  });
  renderPlaylist();
});

// Render playlist
function renderPlaylist() {
  playlist.innerHTML = "";
  tracks.forEach((track, index) => {
    const li = document.createElement("li");
    li.textContent = track.name;
    li.addEventListener("click", () => playTrack(index));
    playlist.appendChild(li);
  });
}

// Play selected track
function playTrack(index) {
  currentTrack = index;
  audio.src = tracks[index].url;
  audio.play();
}

// Controls
playBtn.addEventListener("click", () => {
  if (audio.paused) audio.play();
  else audio.pause();
});

nextBtn.addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  playTrack(currentTrack);
});

prevBtn.addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  playTrack(currentTrack);
});

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// Search functionality
searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = tracks.filter(t => t.name.toLowerCase().includes(keyword));
  playlist.innerHTML = "";
  filtered.forEach((track, index) => {
    const li = document.createElement("li");
    li.textContent = track.name;
    li.addEventListener("click", () => playTrack(tracks.indexOf(track)));
    playlist.appendChild(li);
  });
});

// Theme toggle
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
