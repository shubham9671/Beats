const currsong = (
  state = {
    source: "jio",
    name: "Tum Hi Ho",
    durl: "http://aac.saavncdn.com/430/5c5ea5cc00e3bff45616013226f376fe_160.mp4",
    imgurl: "http://c.saavncdn.com/430/Aashiqui-2-Hindi-2013-500x500.jpg",
    artist: "Arijit Singh",
  },
  action
) => {
  switch (action.type) {
    case "currsong":
      // const { data } = action.payload;
      return action.payload;
    default:
      return state;
  }
};
export default currsong;
