import axios from "axios";

const BASE_URL =
  "https://678f5d0a49875e5a1a9184b5.mockapi.io/api/v1/restaurants";

const getRestaurant = async () => {
  const response = await axios.get(BASE_URL);
  return response;
};

const getDetailRestaurant = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response;
};

const filterRestaurantsByCategory = async (category) => {
  const response = await axios.get(`${BASE_URL}?category=${category}`);
  return response;
};

export { getRestaurant, getDetailRestaurant, filterRestaurantsByCategory };
