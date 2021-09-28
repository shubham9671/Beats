import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  FiSkipForward,
  FiSkipBack,
  FiPauseCircle,
  FiPlayCircle,
} from "react-icons/fi";
const Musicplayer = () => {
  const [isplay, setisplay] = useState(false);
  const [img, setimg] = useState("");
  const audio = useRef();
  const progress = useRef();
  const progressContainer = useRef();

  const song = useSelector((state) => state.currsong);
  useEffect(() => {
    audio.current.play();
    setisplay(true);
    setimg("rotate");
  }, [song]);

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
      <div className="music-plyr gradient-border">
        <img className={`plyr-img ${img}`} src={song.imgurl} alt="" />
        <div className="plyr-name">
          <div className="song-name">
            <h2>{song.name}</h2>
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
                  setimg("");
                }}
              />
            ) : (
              <FiPlayCircle
                onClick={() => {
                  setisplay(true);
                  audio.current.play();
                  setimg("rotate");
                }}
              />
            )}
            <FiSkipForward />
          </div>
          <audio
            onTimeUpdate={() => {
              updateProgress();
            }}
            onEnded={() => {
              audio.current.play();
            }}
            ref={audio}
            src={song.link}
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
