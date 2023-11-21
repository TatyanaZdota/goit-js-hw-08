import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeEl = document.querySelector('#vimeo-player');
const player = new Player(iframeEl);
const STORAGE_KEY = 'videoplayer-current-time';

player.setCurrentTime(localStorage.getItem(STORAGE_KEY));

const savedTime = function (data) {
  localStorage.setItem(STORAGE_KEY, data.seconds);
};
const throttleSavedTime = throttle(savedTime, 1000);
player.on('timeupdate', throttleSavedTime);
