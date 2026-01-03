const KEY = "evalData";

export const getRestaurants = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

export const saveRestaurants = (data) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};
