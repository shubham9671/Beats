const queue = (state = [], action) => {
  switch (action.type) {
    case "queue":
      return action.payload;
    default:
      return state;
  }
};
export default queue;
