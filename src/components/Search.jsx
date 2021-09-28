import React from "react";
import { useDispatch } from "react-redux";
import { currsong } from "../actions/index";
import { AiOutlineSearch } from "react-icons/ai";
import { BiPlayCircle, BiPlusCircle } from "react-icons/bi";
import logo from "./search.svg";
import { useRef, useState } from "react/cjs/react.development";
const Search = () => {
  const jio_API_URL = "https://saavn.me/search?song=";
  const yt_API_URL = "https://youtube.ankit5522.repl.co/list/";
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
      console.log(result);
      url === jio_API_URL ? setdata1(result) : setdata2(result);
      url === jio_API_URL ? setisdata1(true) : setisdata2(true);
    }
  }
  return (
    <div className="search ">
      <div className="search-container">
        <div className="selection">
          <div className="tabs">
            <div className="selection-bar"></div>
            <ul className="tablist">
              <li
                onClick={() => {
                  seturl(jio_API_URL);
                }}
                className="tablist__tab is-active"
              >
                JIOSAAVN
              </li>
              <li
                onClick={() => {
                  seturl(yt_API_URL);
                }}
                className="tablist__tab"
              >
                YT MUSIC
              </li>
            </ul>
          </div>
        </div>
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
              {console.log("amkot")}
              {(url === jio_API_URL ? data1 : data2).map((ele) => {
                return (
                  <div className="search-item">
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
                    <div className="other-opt">
                      <BiPlusCircle className="play-btn" />
                      <BiPlayCircle
                        onClick={() => {
                          dispatch(
                            currsong({
                              name:
                                url === jio_API_URL ? ele.song_name : ele.title,
                              link:
                                url === jio_API_URL
                                  ? ele.download_links[1]
                                  : ele.title,
                              imgurl:
                                url === jio_API_URL
                                  ? ele.song_image
                                  : ele.thumbnailUrl,
                            })
                          );
                        }}
                        className="play-btn"
                      />
                      <p className="duration">
                        {url === jio_API_URL
                          ? (ele.song_duration / 60).toFixed(2)
                          : ele.duration.totalSeconds == null
                          ? " N-A"
                          : (ele.duration.totalSeconds / 60).toFixed(2)}
                      </p>
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
