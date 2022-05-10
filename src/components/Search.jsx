import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { currsong, queue } from "../actions/index";
import { AiOutlineSearch } from "react-icons/ai";
import { BiPlayCircle, BiPlusCircle, BiDownload } from "react-icons/bi";
import logo from "./search.svg";
import { useRef, useState } from "react";
function Search() {
  const jio_API_URL = "https://saavn.me/search/songs?query=";

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
setdata1(result.results);
setTimeout(() => {
  console.log(data1);
  setisdata1(true);
}, 2000);
 
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
            onKeyPress={(e) => {
              if (e.code === "Enter") {
                handleSearch();
              }
            }}
            className="search-input"
            type="text"
            placeholder="search"
          />
          <AiOutlineSearch onClick={handleSearch} className="icon" />
        </div>
        <div className="details">
          {isdata1 ? (
            <div className="search-items">
              {console.log(data1)}
              {data1.map((ele, index) => {
                console.log(ele);
                return (
                  <div key={index} className="search-item">
                    <div className="searchbox">
                      <div className="search-img">
                        <img
                          src={
                            url === jio_API_URL
                              ? ele.image[2].link
                              : ele.thumbnailUrl
                          }
                          width="30px"
                          height="30px"
                          alt=""
                        />
                      </div>
                      <div className="songName">
                        <p>{url === jio_API_URL ? ele.name : ele.title}</p>
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
                                  url === jio_API_URL ? ele.id : ele.title,
                                name:
                                  url === jio_API_URL
                                    ? ele.name
                                    : ele.title,
                                durl:
                                  url === jio_API_URL
                                    ? ele.downloadUrl[4].link
                                    : ele.durl,
                                imgurl:
                                  url === jio_API_URL
                                    ? ele.image[2].link
                                    : ele.thumbnailUrl,
                                artist:
                                  url === jio_API_URL
                                    ? ele.artist
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
                                    ? ele.name
                                    : ele.title,
                                id:
                                  url === jio_API_URL
                                    ? ele.id
                                    : ele.youtubeId,
                                imgurl:
                                  url === jio_API_URL
                                    ? ele.image[2].link
                                    : ele.thumbnailUrl,
                                artist:
                                  url === jio_API_URL
                                    ? ele.artist
                                    : ele.artist,
                                durl:
                                  url === jio_API_URL
                                    ? ele.downloadUrl[4].link
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
                                encodeURIComponent(ele.downloadUrl[4].link) +
                                `&naming=${ele.name}`,
                              ele.name
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
}

export default Search;
