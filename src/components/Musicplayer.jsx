import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AudioSpectrum from "react-audio-spectrum2";
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

  const audio = useRef();
  const progress = useRef();
  const progressContainer = useRef();
  const dispatch = useDispatch();
  const song = useSelector((state) => state.currsong);
  console.log(song);
  const currqueue = useSelector((state) => state.queue);
  useEffect(() => {
    audio.current.play();
    setisplay(true);
    setimg("rotate");
  }, [song]);

  useEffect(() => {
    audio.current.pause();
    setisplay(false);
    setimg("");
  }, []);

  function setProgress(e) {
    const width = progressContainer.current.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const duration = audio.current.duration;
    const currtime = (clickX / width) * duration;
    audio.current.currentTime = currtime;
  }

  function updateProgress() {
    const { duration, currentTime } = audio.current;
    // setcurrtime((currentTime / 60).toFixed(2));
    // settotaltime((duration / 60).toFixed(2));
    const progressPercent = (currentTime / duration) * 100;
    progress.current.style.width = `${progressPercent}%`;
  }

  function getsong(btn) {
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

      dispatch(
        queue({
          type: "remove",
          id: currqueue[0].id,
        })
      );
    } else {
      if (btn !== "btn") {
        setisplay(false);
        setimg("");
      }
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
            <FiSkipBack className="changebtn-0" />
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

            <FiSkipForward
              onClick={() => {
                getsong("btn");
              }}
              className="changebtn-1"
            />
          </div>
          {/* <AudioSpectrum
            id="audio-canvas"
            height={200}
            width={1520}
            audioId={"audio-element"}
            capColor={"white"}
            capHeight={2}
            meterWidth={2}
            meterCount={512}
            meterColor={[
              { stop: 0, color: "#f00" },
              { stop: 0.5, color: "#0CD7FD" },
              { stop: 1, color: "red" },
            ]}
            gap={4}
          /> */}
          <audio
            id="audio-element"
            crossOrigin="anonymous"
            onTimeUpdate={() => {
              updateProgress();
            }}
            onEnded={() => {
              getsong("other");
              // audio.current.play();
            }}
            ref={audio}
            src={
              "https://square-pine-3f5d.ankit-drive.workers.dev/?link=" +
              encodeURIComponent(song.durl) +
              "&naming=" +
              song.name
            }
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
