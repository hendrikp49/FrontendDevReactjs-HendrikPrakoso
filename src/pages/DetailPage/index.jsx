import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import Header from "../../components/layout/Header";
import CountStars from "../../components/CountStars";
import "ldrs/ring";
import { useSelector } from "react-redux";
import Breadcrumb from "../../components/ui/Breadcrumb";

const DetailPage = () => {
  const { id } = useParams();
  const { isLoading } = useSelector((state) => state.loading);
  const { detailRestaurant, fetchDetailRestaurant } = useFetch();

  useEffect(() => {
    fetchDetailRestaurant(id);
  }, []);

  return (
    <div className="max-w-sm pb-10 mx-auto md:max-w-xl lg:max-w-4xl">
      <Header>
        <h1 className="text-3xl font-bold md:text-4xl">Detail Restorant</h1>
      </Header>

      {isLoading ? (
        <p className="mt-20 text-center">
          <l-ring color="#2962FF" size={30} speed={1} />
        </p>
      ) : (
        <>
          <Breadcrumb className="pl-5 mt-10">
            {detailRestaurant?.name}
          </Breadcrumb>
          <div className="h-[300px] mt-10 border overflow-hidden rounded-br-3xl rounded-tl-3xl rounded-tr rounded-bl">
            <img
              src={detailRestaurant?.photos}
              alt={detailRestaurant?.name}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex flex-col gap-2 mt-5">
            <div>
              <p>Restaurant Name :</p>
              <h4 className="font-bold">{detailRestaurant?.name}</h4>
            </div>
            <div>
              <p>Category :</p>
              <h4 className="font-bold">{detailRestaurant?.category}</h4>
            </div>
            <div>
              <p>Rating :</p>
              <div className="flex items-center gap-1">
                <CountStars rating={detailRestaurant?.rating} />
                <span>{detailRestaurant?.rating}</span>
              </div>
            </div>
          </div>

          <div className="mt-10 space-y-5">
            <h4 className="text-lg font-semibold">Reviews</h4>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-0 place-items-center">
              {detailRestaurant?.reviews?.map((review) => (
                <div
                  key={review.id}
                  className="h-[200px] relative w-60 rounded-xl text-white bg-[#2962FF] shadow shadow-slate-400 flex flex-col justify-between p-5 text-center"
                >
                  <div className="absolute top-[-25px] left-1/2 -translate-x-1/2 rounded-full w-10 h-10 overflow-hidden">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="font-bold">{review.name}</p>
                  <blockquote>{review.text}</blockquote>
                  <div className="flex items-center justify-center gap-2 px-3 mx-auto border rounded-full w-fit">
                    <span>{review.rating}</span>
                    <CountStars rating={review.rating} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailPage;
