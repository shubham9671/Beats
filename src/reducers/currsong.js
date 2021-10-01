const currsong = (
  state = {
    source: "jio",
    name: "Kaise Hua",
    id: "SdU_RBkC",
    imgurl:
      "http://c.saavncdn.com/807/Kabir-Singh-Hindi-2019-20190614075009-500x500.jpg",
    artist: "Vishal Mishra",
    durl: "http://aac.saavncdn.com/807/9def501f3878ec28bbe740520ae48edc_160.mp4",
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
