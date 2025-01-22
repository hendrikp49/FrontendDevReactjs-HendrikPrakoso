import { useState } from "react";
import {
  filterRestaurantsByCategory,
  getDetailRestaurant,
  getRestaurants,
} from "../services/api";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../store/loadingSlice";

const useFetch = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [detailRestaurant, setDetailRestaurant] = useState({});
  const dispatch = useDispatch();

  const fetchDataRestaurants = async () => {
    dispatch(showLoading());
    try {
      const response = await getRestaurants();
      setRestaurants(response);
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoading());
    }
  };

  const fetchRestaurantsByCategory = async (category) => {
    dispatch(showLoading());
    try {
      const response = await filterRestaurantsByCategory(category);
      setRestaurants(response);
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoading());
    }
  };

  const fetchDetailRestaurant = async (id) => {
    dispatch(showLoading());
    try {
      const response = await getDetailRestaurant(id);
      setDetailRestaurant(response);
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(hideLoading());
    }
  };

  return {
    restaurants,
    detailRestaurant,
    setRestaurants,
    fetchDataRestaurants,
    fetchDetailRestaurant,
    fetchRestaurantsByCategory,
  };
};

export default useFetch;
