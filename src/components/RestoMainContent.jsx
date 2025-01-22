import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import CountStars from "./CountStars";
import { useSelector } from "react-redux";
import "ldrs/ring";
import { ring } from "ldrs";

const RestoMainContent = () => {
  const { restaurants, fetchDataRestaurants, fetchRestaurantsByCategory } =
    useFetch();
  const { isLoading } = useSelector((state) => state.loading);

  const [originalData, setOriginalData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  // Filter states
  const [filters, setFilters] = useState({
    open: "",
    price: "",
    category: "",
  });

  const dataOpen = ["Open", "Closed"];
  const dataPrice = ["$", "$$", "$$$"];
  const dataCategory = ["Indonesian", "Chinese", "Japanese"];

  const handleClientSideFilters = () => {
    let results = [...originalData];

    if (filters.open) {
      results = results.filter((item) =>
        filters.open === "Open" ? item.isOpen : !item.isOpen
      );
    }

    if (filters.price) {
      results = results.filter((item) => item.priceRange === filters.price);
    }

    setFilteredResults(results);
  };

  const handleServerSideFilter = async () => {
    try {
      if (filters.category) {
        const data = await fetchRestaurantsByCategory(filters.category);
        const filteredData = data.filter(
          (item) =>
            item.isOpen === filters.open && item.priceRange === filters.price
        );
        setOriginalData(filteredData);
        setFilteredResults(filteredData);
      } else {
        const data = await fetchDataRestaurants();
        setOriginalData(data);
        setFilteredResults(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChangeOpen = (event) => {
    setFilters({ ...filters, open: event.target.value });
  };

  const handleChangePrice = (event) => {
    setFilters({ ...filters, price: event.target.value });
  };

  const handleChangeCategory = (event) => {
    setFilters({ ...filters, category: event.target.value });
  };

  const clearFilters = async () => {
    setFilters({
      open: "",
      price: "",
      category: "",
    });

    const data = await fetchDataRestaurants();
    setOriginalData(data);
    setFilteredResults(data);
  };

  // Effect filter category (server-side)
  useEffect(() => {
    handleServerSideFilter();
  }, [filters.category]);

  // Effect filter client-side
  useEffect(() => {
    if (
      originalData?.length > 0 &&
      (filters.open !== "" || filters.price !== "")
    ) {
      handleClientSideFilters();
    }
  }, [filters.open, filters.price, originalData]);

  // Inisialisasi data
  useEffect(() => {
    if (restaurants?.length > 0) {
      setOriginalData(restaurants);
      setFilteredResults(restaurants);
    }
  }, [restaurants]);

  // Initial data fetch
  useEffect(() => {
    fetchDataRestaurants();
    ring.register();
  }, []);

  return (
    <div className="max-w-sm px-5 py-10 mx-auto md:max-w-xl lg:max-w-4xl">
      {/* filter features */}
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
        {/* Filter */}
        <div className="flex flex-col gap-2 md:items-center lg:gap-4 md:flex-row md:justify-center">
          <p className="font-medium">Filter by:</p>

          <div className="flex flex-col gap-4 md:flex-row">
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Open</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Open"
                value={filters.open}
                onChange={handleChangeOpen}
              >
                {dataOpen.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Price</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Price"
                value={filters.price}
                onChange={handleChangePrice}
              >
                {dataPrice.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                value={filters.category}
                onChange={handleChangeCategory}
              >
                {dataCategory.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        {/* Clear */}
        <button
          onClick={clearFilters}
          className="bg-[#FFD600] rounded-md px-4 py-2 lg:w-32"
        >
          Clear All
        </button>
      </div>

      {/* card */}
      <main className="pt-14">
        {isLoading && (
          <p className="text-center">
            <l-ring color="#2962FF" size={30} speed={1}></l-ring>
          </p>
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 place-items-center">
          {filteredResults?.length === 0 ? (
            <p className="col-span-3 text-center">
              Data Restaurant Tidak Ditemukan
            </p>
          ) : (
            filteredResults?.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-2 justify-between p-2 bg-[#2962FF] w-60 text-white rounded-2xl h-80"
              >
                {/* image */}
                <div className="relative max-w-full overflow-hidden rounded-xl h-3/5">
                  <img
                    src={item?.photos[0]}
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                  <span
                    className={`absolute text-sm top-1 right-1 ${
                      item.isOpen ? "bg-green-500" : "bg-red-500"
                    } px-2 py-0.5 rounded-full`}
                  >
                    {item.isOpen ? "Open" : "Closed"}
                  </span>
                </div>

                {/* desc */}
                <div className="leading-tight">
                  {/* category and price */}
                  <div className="flex justify-between text-sm font-thin text-slate-200">
                    <p>{item.category}</p>
                    <p>{item.priceRange}</p>
                  </div>

                  {/* name, rating */}
                  <div className="">
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="flex items-center gap-2">
                      <CountStars rating={item.rating} />
                      <p className="text-sm text-slate-300">{item.rating}</p>
                    </div>
                  </div>
                </div>

                {/* button detail */}
                <Link to={`/detail-restaurant/${item.id}`}>
                  <button className="bg-[#FFD600] px-4 py-1 rounded-md w-full">
                    Learn More
                  </button>
                </Link>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default RestoMainContent;
