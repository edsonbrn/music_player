"use strict";

const imgEl = document.getElementById("bg_img");
const imgCoverEl = document.getElementById("cover");
const musicTitleEL = document.getElementById("music_title");
const musicArtistEl = document.getElementById("music_artist");
const playerProgressEl = document.getElementById("player_progress");
const progressEl = document.getElementById("progress");
const currentTimeEl = document.getElementById("current_time");
const durationEl = document.getElementById("duration");

const prevBtnEl = document.getElementById("prev");
const playvBtnEl = document.getElementById("play");
const nextBtnEl = document.getElementById("next");

const songs = [

    {
        path: "audio/song.ogg",
        displayName: "Dark Side",
        cover: "img/album.jpg",
        artist: "Blind Channel",
        background: "fondo/fondo1.jpg",
    },
    {
        path: "audio/song2.ogg",
        displayName: "Snake",
        cover: "img/album2.jpg",
        artist: "Blind Channel",
        background: "fondo/fondo4.jpg",
    },
    {
        path: "audio/song3.mp3",
        displayName: "Feel Good",
        cover: "img/album3.jpg",
        artist: "Gorillaz",
        background: "fondo/fondo3.jpg",
    },
];


const music = new Audio();

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    playvBtnEl.classList.replace("fa-play", "fa-pause");
    playvBtnEl.setAttribute("title", "pause");
    music.play();
}


function pauseMusic() {
    isPlaying = false;
    playvBtnEl.classList.replace("fa-pause", "fa-play");
    playvBtnEl.setAttribute("title", "pause");
    music.pause();
}

function loadMusic(songs) {
    music.src = songs.path;
    musicTitleEL.textContent = songs.displayName;
    musicArtistEl.textContent = songs.artist;
    imgCoverEl.src = songs.cover;
    imgEl.src = songs.background;
}

function changeMusic (direction) {
    musicIndex = musicIndex + direction + (songs.length % songs.length);
    loadMusic(songs[musicIndex]);
    playMusic();
}

function setProgressBar(e) {
    const width = playerProgressEl.clientWidth;
    const xValue = e.offsetX;
    music.currentTime = (xValue / width) * music.duration;

}


function updateProgressBar () {
    const {duration, currentTime} = music;
    const ProgressPercent = (currentTime / duration) * 100;
    progressEl.style.width = `${ProgressPercent}%`;


    const formattime = (TimeRanges) => String(Math.floor(TimeRanges)).padStart(2, "0"); 

    durationEl.textContent = `${formattime(duration / 60)}: ${formattime(duration % 60)}`;

    currentTimeEl.textContent = `${formattime(currentTime / 60)}: ${formattime(currentTime % 60)}`;
}


const btnEvents = () => {
    playvBtnEl.addEventListener("click", togglePlay);
    nextBtnEl.addEventListener("click", () => changeMusic(1));
    prevBtnEl.addEventListener("click", () => changeMusic(-1));

    playerProgressEl.addEventListener("click", setProgressBar);
    music.addEventListener("ended", ()=> changeMusic(1))
    music.addEventListener("timeupdate", updateProgressBar)
};

document.addEventListener("DOMContentLoaded", btnEvents);


loadMusic(songs[musicIndex]);