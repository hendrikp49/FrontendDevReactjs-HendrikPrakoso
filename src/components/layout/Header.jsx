import PropTypes from "prop-types";

const Header = ({ children }) => {
  return (
    <header className="px-10 py-5 bg-[#2962FF] text-white text-center space-y-4 max-w-sm md:max-w-xl rounded-b-3xl lg:max-w-4xl mx-auto">
      {children}
    </header>
  );
};

Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
