const currsong = (state = "kaise hua", action) => {
  switch (action.type) {
    case "currsong":
      // const { data } = action.payload;
      return action.payload;
    default:
      return state;
  }
};
export default currsong;
