const currsong = (
  state = {
    source: "jio",
    name: "Tum Mile",
    id: "QFLyDVyf",
    imgurl:
    "https://c.saavncdn.com/316/Tum-Mile-Hindi-2009-20190617160526-500x500.jpg",
    artist: "Pritam, Neeraj Shridhar",
    durl: "https://aac.saavncdn.com/316/658fd36a66f95f13227a04dfa848c9b9_48.mp4"
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
