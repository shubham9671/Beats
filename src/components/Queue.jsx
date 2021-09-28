import React from "react";

const Queue = () => {
  const arr = [
    "fgtrtgbr",
    "fgrrgtr",
    "vrgtrt",
    "fvrg",
    "grwfvrg",
    "wrtgrtgt",
    "fgrrgtr",
    "vrgtrt",
    "fvrg",
    "grwfvrg",
    "wrtgrtgt",
  ];

  return (
    <div className="queue">
      <div className="queuearea">
        <div className="flex name">Queue</div>
        <div className="song_list flex">
          {arr.map((ele, index) => {
            return (
              <div className="song_item flex">
                <p>{index + 1}</p>
                <p>{ele}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Queue;
