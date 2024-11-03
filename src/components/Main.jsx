import PropTypes from "prop-types";

export default function Main({ children }) {
  return <main className="hero base_container ">{children}</main>;
}
Main.propTypes = {
  children: PropTypes.node,
};