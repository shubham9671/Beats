import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { currsong, queue } from "../actions";
import {
  FiSkipForward,
  FiSkipBack,
  FiPauseCircle,
  FiPlayCircle,
} from "react-icons/fi";
const Musicplayer = () => {
  const [isplay, setisplay] = useState(false);
  const [img, setimg] = useState("");
  // const [currtime, setcurrtime] = useState("");
  // const [totaltime, settotaltime] = useState(50);
  const audio = useRef();
  const progress = useRef();
  const progressContainer = useRef();
  const dispatch = useDispatch();

  const song = useSelector((state) => state.currsong);
  const currqueue = useSelector((state) => state.queue);
  console.log(currqueue);
  // console.log(song);
  useEffect(() => {
    if (!song.name.includes("Tum")) {
      console.log("changed");
      audio.current.play();
      // setsurl(song.durl);
      setisplay(true);
      setimg("rotate");
    }
  }, [song]);

  useEffect(() => {
    audio.current.pause();
    setisplay(false);
    setimg("");
  }, []);

  function setProgress(e) {
    console.log(audio);
    const width = progressContainer.current.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const duration = audio.current.duration;
    const currtime = (clickX / width) * duration;
    console.log(currtime);
    audio.current.currentTime = currtime;
  }

  function updateProgress() {
    const { duration, currentTime } = audio.current;
    // setcurrtime((currentTime / 60).toFixed(2));
    // settotaltime((duration / 60).toFixed(2));
    const progressPercent = (currentTime / duration) * 100;
    progress.current.style.width = `${progressPercent}%`;
  }

  function getsong() {
    if (currqueue.length) {
      dispatch(
        currsong({
          source: "jio",
          name: currqueue[0].name,
          id: currqueue[0].id,
          durl: currqueue[0].durl,
          imgurl: currqueue[0].imgurl,
          artist: currqueue[0].artist,
        })
      );
      console.log(currqueue);
      dispatch(
        queue({
          type: "remove",
          id: currqueue[0].id,
        })
      );
    } else {
      setisplay(false);
      setimg("");
    }
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
            <h5>{song.artist}</h5>
          </div>
        </div>
        <div className="plyr-controls">
          <div className="plyr-btn">
            <FiSkipBack className="changebtn" />
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
                  console.log(audio);
                  setisplay(true);
                  audio.current.play();
                  setimg("rotate");
                }}
              />
            )}
            <FiSkipForward className="changebtn" />
          </div>
          <audio
            preload="none"
            onTimeUpdate={() => {
              updateProgress();
            }}
            onEnded={() => {
              getsong();
              // audio.current.play();
            }}
            ref={audio}
            src={song.durl}
          ></audio>
          {/* <div className="time">
            <div className="currtime">{currtime}</div>
            <div className="totaltime">{totaltime}</div>
          </div> */}
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
