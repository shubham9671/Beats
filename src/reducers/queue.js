const queue = (state = [], action) => {
  console.log(state);
  switch (action.type) {
    case "queue":
      return [...state, action.payload];
    case "remove":
      return (state = state.filter((value) => {
        return action.payload.id !== value.id;
      }));
    default:
      return state;
  }
};
export default queue;
