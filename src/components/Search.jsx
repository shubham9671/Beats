import React from "react";
import { useDispatch } from "react-redux";
import { currsong, queue } from "../actions/index";
import { AiOutlineSearch } from "react-icons/ai";
import { BiPlayCircle, BiPlusCircle, BiDownload } from "react-icons/bi";
import logo from "./search.svg";
import { useRef, useState } from "react/cjs/react.development";
const Search = () => {
  const jio_API_URL = "https://saavn.me/search?song=";

  const [url, seturl] = useState(jio_API_URL);
  const [data1, setdata1] = useState([]);
  const [data2, setdata2] = useState([]);
  const [isdata1, setisdata1] = useState(false);
  const [isdata2, setisdata2] = useState(false);
  const dispatch = useDispatch();

  const inptext = useRef();

  async function handleSearch() {
    url === jio_API_URL ? setisdata1(false) : setisdata2(false);
    if (inptext.current.value) {
      const res = await fetch(url + encodeURIComponent(inptext.current.value));
      const result = await res.json();

      url === jio_API_URL ? setdata1(result) : setdata2(result);
      url === jio_API_URL ? setisdata1(true) : setisdata2(true);
    }
  }

  // var convertTime = function (time) {
  //   var mins = Math.floor(time / 60);
  //   if (mins < 10) {
  //     mins = "0" + String(mins);
  //   }
  //   var secs = Math.floor(time % 60);
  //   if (secs < 10) {
  //     secs = "0" + String(secs);
  //   }

  //   return mins + ":" + secs;
  // };
  function downloadURI(uri, name) {
    var link = document.createElement("a");
    // If you don't know the name or want to use
    // the webserver default set name = ''
    link.setAttribute("download", name);
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  return (
    <div className="search ">
      <div className="search-container">
        <div className="selection">SEARCH</div>
        <div className="searcharea">
          <input
            ref={inptext}
            className="search-input"
            type="text"
            placeholder="search"
          />
          <AiOutlineSearch onClick={handleSearch} className="icon" />
        </div>
        <div className="details">
          {(url === jio_API_URL ? isdata1 : isdata2) ? (
            <div className="search-items">
              {(url === jio_API_URL ? data1 : data2).map((ele, index) => {
                return (
                  <div key={index} className="search-item">
                    <div className="searchbox">
                      <div className="search-img">
                        <img
                          src={
                            url === jio_API_URL
                              ? ele.song_image
                              : ele.thumbnailUrl
                          }
                          width="30px"
                          height="30px"
                          alt=""
                        />
                      </div>
                      <div className="songName">
                        <p>{url === jio_API_URL ? ele.song_name : ele.title}</p>
                      </div>
                    </div>
                    <div className="other-opt">
                      <div className="optionsbox">
                        <BiPlusCircle
                          onClick={() => {
                            dispatch(
                              queue({
                                type: "queue",
                                id:
                                  url === jio_API_URL ? ele.song_id : ele.title,
                                name:
                                  url === jio_API_URL
                                    ? ele.song_name
                                    : ele.title,
                                durl:
                                  url === jio_API_URL
                                    ? ele.download_links[1]
                                    : ele.durl,
                                imgurl:
                                  url === jio_API_URL
                                    ? ele.song_image
                                    : ele.thumbnailUrl,
                                artist:
                                  url === jio_API_URL
                                    ? ele.song_artist
                                    : ele.artist,
                              })
                            );
                          }}
                          className="play-btn"
                        />
                        <BiPlayCircle
                          onClick={() => {
                            dispatch(
                              currsong({
                                source: url === jio_API_URL ? "jio" : "ytmusic",
                                name:
                                  url === jio_API_URL
                                    ? ele.song_name
                                    : ele.title,
                                id:
                                  url === jio_API_URL
                                    ? ele.song_id
                                    : ele.youtubeId,
                                imgurl:
                                  url === jio_API_URL
                                    ? ele.song_image
                                    : ele.thumbnailUrl,
                                artist:
                                  url === jio_API_URL
                                    ? ele.song_artist
                                    : ele.artist,
                                durl:
                                  url === jio_API_URL
                                    ? ele.download_links[1]
                                    : null,
                              })
                            );
                          }}
                          className="play-btn"
                        />
                        <BiDownload
                          onClick={() => {
                            downloadURI(
                              "https://square-pine-3f5d.ankit-drive.workers.dev/?link=" +
                                encodeURIComponent(ele.download_links[1]) +
                                `&naming=${ele.song_name}`,
                              ele.song_name
                            );
                          }}
                          className="play-btn"
                        />
                        {/* <p className="duration">
                          {convertTime(ele.song_duration)}
                        </p> */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              <div className="search-logo">
                <img src={logo} alt="" />
                <p>Waiting to Search</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
