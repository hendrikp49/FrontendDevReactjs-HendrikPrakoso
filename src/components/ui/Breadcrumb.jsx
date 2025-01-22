import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Breadcrumb = ({ children, ...props }) => {
  return (
    <ul className={`flex items-center gap-1 ${props.className}`}>
      <li>
        <Link
          to="/"
          className="text-sm font-medium text-gray-600 hover:text-gray-700"
        >
          Restaurants
        </Link>
      </li>
      <li>
        <span className="text-sm font-medium text-gray-500">/</span>
      </li>
      <li>
        <span className="text-sm font-medium text-gray-400">{children}</span>
      </li>
    </ul>
  );
};

Breadcrumb.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Breadcrumb;
