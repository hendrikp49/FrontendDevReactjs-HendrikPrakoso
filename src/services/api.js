import axios from "axios";

const BASE_URL =
  "https://678f5d0a49875e5a1a9184b5.mockapi.io/api/v1/restaurants";

const getRestaurants = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getDetailRestaurant = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const filterRestaurantsByCategory = async (category) => {
  const response = await axios.get(`${BASE_URL}?category=${category}`);
  return response.data;
};

export { getRestaurants, getDetailRestaurant, filterRestaurantsByCategory };
