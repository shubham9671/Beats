import React from "react";
import Musicplayer from "./Musicplayer";
import Nav from "./Nav";
import Queue from "./Queue";
import Search from "./Search";
const Home = () => {
  return (
    <div className="container">
      <Nav />
      <div className="box">
        <Musicplayer />
        <Queue />
        <Search />
      </div>
    </div>
  );
};

export default Home;
