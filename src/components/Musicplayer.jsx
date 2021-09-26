import React, { useRef, useState } from "react";

import {
  FiSkipForward,
  FiSkipBack,
  FiPauseCircle,
  FiPlayCircle,
} from "react-icons/fi";
const Musicplayer = () => {
  const [isplay, setisplay] = useState(false);
  const audio = useRef();
  const progress = useRef();
  const progressContainer = useRef();

  function setProgress(e) {
    const width = progressContainer.current.clientWidth;

    const clickX = e.nativeEvent.offsetX;
    const duration = audio.current.duration;
    const currtime = (clickX / width) * duration;
    audio.current.currentTime = currtime;
  }

  function updateProgress() {
    const { duration, currentTime } = audio.current;
    const progressPercent = (currentTime / duration) * 100;
    progress.current.style.width = `${progressPercent}%`;
  }

  return (
    <div className="music-container">
      <div className="music-plyr">
        <img
          className="plyr-img"
          src="http://c.saavncdn.com/600/Barsaat-Ki-Dhun-Hindi-2021-20210720121009-500x500.jpg"
          alt=""
        />
        <div className="plyr-name">
          <div className="song-name">
            <h2>Tum hi ho</h2>
          </div>
          <div className="song-artist">
            <h5>Arijit Singh</h5>
          </div>
        </div>
        <div className="plyr-controls">
          <div className="plyr-btn">
            <FiSkipBack />
            {isplay ? (
              <FiPauseCircle
                onClick={() => {
                  setisplay(false);
                  audio.current.pause();
                }}
              />
            ) : (
              <FiPlayCircle
                onClick={() => {
                  setisplay(true);
                  audio.current.play();
                }}
              />
            )}
            <FiSkipForward />
          </div>
          <audio
            onTimeUpdate={() => {
              updateProgress();
            }}
            ref={audio}
            src="https://jiosaavn-ankit.netlify.app/downloadapi/ankit/cloud/proxy/music/downloads/aac.saavncdn.com/993/c5c39665d8894e32ac08f40b04d2e69c_160.mp4"
          ></audio>
          <div
            onClick={(e) => {
              setProgress(e);
            }}
            ref={progressContainer}
            className="progress-container"
            id="progress-container"
          >
            <div ref={progress} className="progress" id="progress"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Musicplayer;
