import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { queue } from "../actions/index";
import { BiX } from "react-icons/bi";
const Queue = () => {
  const dispatch = useDispatch();
  const [queuearray, setqueuearray] = useState([]);

  const currqueue = useSelector((state) => state.queue);

  useEffect(() => {
    setqueuearray(currqueue);
    console.log(queuearray);
  }, [currqueue]);

  return (
    <div className="queue">
      <div className="queuearea">
        <div className="flex name">Queue</div>
        <div className="song_list flex">
          {queuearray.map((ele, index) => {
            return (
              <div className="song_item flex">
                <div className="names">
                  <p className="index">{index + 1}</p>

                  <p className="text">{ele.name}</p>
                </div>

                <div className="remove">
                  <BiX
                    onClick={() => {
                      dispatch(
                        queue({
                          type: "remove",
                          id: ele.id,
                        })
                      );
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Queue;
