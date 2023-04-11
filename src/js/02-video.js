import Player from "@vimeo/player";
import _ from "lodash";

const iframe = document.querySelector("iframe");
const player = new Player(iframe);
const timeCurr = "videoplayer-current-time";

player.setCurrentTime(localStorage.getItem(timeCurr) || 0);

const updateTime = (data) => {
  localStorage.setItem(timeCurr, Math.floor(data.seconds));
};

player.on(
  "timeupdate",
  _.throttle((data) => updateTime(data), 1000)
);
