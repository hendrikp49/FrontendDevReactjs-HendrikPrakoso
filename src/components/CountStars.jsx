import { StarHalfIcon, StarIcon } from "lucide-react";
import PropTypes from "prop-types";

const CountStars = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        if (index < Math.floor(rating)) {
          return (
            <StarIcon key={index} strokeWidth={0.5} fill="#FFD600" size={16} />
          );
        } else if (
          (rating % 1 !== 0 && rating % 1 <= 0.5) ||
          (rating % 1 >= 0.5 && index === Math.floor(rating))
        ) {
          return (
            <StarHalfIcon
              key={index}
              strokeWidth={0.5}
              fill="#FFD600"
              size={16}
            />
          );
        }
        return <StarIcon key={index} strokeWidth={0.5} fill="none" size={16} />;
      })}
    </div>
  );
};

CountStars.propTypes = {
  rating: PropTypes.number,
};

export default CountStars;
