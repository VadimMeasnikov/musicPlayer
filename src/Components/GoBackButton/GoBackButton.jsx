import { useNavigate } from "react-router-dom";
import "./goBackButton.scss";

export default function GoBackButton({onClick}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    navigate("/");
  };

  return (
    <button onClick={handleClick} className="go_back__button">
      <svg
        width="20px"
        height="20px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M14.9998 19.9201L8.47984 13.4001C7.70984 12.6301 7.70984 11.3701 8.47984 10.6001L14.9998 4.08008"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{" "}
        </g>
      </svg>
    </button>
  );
}
