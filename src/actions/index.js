export const currsong = (data) => {
  return {
    type: "currsong",
    payload: data,
  };
};
export const queue = (data) => {
  return {
    type: data.type,
    payload: data,
  };
};
