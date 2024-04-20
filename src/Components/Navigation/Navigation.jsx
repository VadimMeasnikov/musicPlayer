import { NavLink } from "react-router-dom";
import "./navigation.scss";
import { Link } from "react-router-dom";
export default function Navigation() {
  return (
    <nav className="nav">
      <Link to="/">
        <div className="nav__item">
          <svg
            width="20.000000"
            height="20.000000"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <defs />
            <path
              id="Vector"
              d="M9 1.16L0.94 6.08L0.94 19L6.04 19L6.04 12.03L11.99 12.03L11.99 19L17.05 19L17.05 6.04L9 1.16ZM9 0L18 5.28L18 20L11.04 20L11.04 13.02L6.99 13.02L6.99 20L0 20L0 5.33L9 0Z"
              fill="#B3B3B3"
              fill-opacity="1.000000"
              fill-rule="nonzero"
            />
          </svg>
          <span>Home</span>
        </div>
      </Link>
      <Link to="/search">
        <div className="nav__item">
          <svg
            width="20.000000"
            height="20.000000"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <defs />
            <path
              id="Vector"
              d="M19.69 18.21L14.76 13.26C16.03 11.81 16.72 9.98 16.72 8.07C16.72 3.62 12.97 0 8.36 0C3.75 0 0 3.62 0 8.07C0 12.52 3.75 16.14 8.36 16.14C10.09 16.14 11.74 15.64 13.15 14.68L18.12 19.67C18.33 19.88 18.61 20 18.9 20C19.19 20 19.46 19.89 19.66 19.7C20.09 19.3 20.11 18.63 19.69 18.21ZM8.36 2.1C11.77 2.1 14.54 4.78 14.54 8.07C14.54 11.36 11.77 14.04 8.36 14.04C4.95 14.04 2.18 11.36 2.18 8.07C2.18 4.78 4.95 2.1 8.36 2.1Z"
              fill="#777777"
              fill-opacity="1.000000"
              fill-rule="nonzero"
            />
          </svg>
          <span>Search</span>
        </div>
      </Link>
      <Link to='/library'>
        <div className="nav__item">
          <svg
            width="22.000000"
            height="22.000000"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <clipPath id="clip5_1853">
                <rect
                  id="Library small"
                  width="22.000000"
                  height="22.000000"
                  fill="white"
                  fill-opacity="0"
                />
              </clipPath>
            </defs>
            <rect
              id="Library small"
              width="22.000000"
              height="22.000000"
              fill="#FFFFFF"
              fill-opacity="0"
            />
            <g clip-path="url(#clip5_1853)">
              <path
                id="Vector"
                d="M12.61 0.9L21.44 20.74L20.42 21.2L11.59 1.36L12.61 0.9ZM0.54 21.18L0.54 0.79L1.68 0.79L1.68 21.18L0.54 21.18ZM7.34 21.18L7.34 0.79L8.47 0.79L8.47 21.18L7.34 21.18Z"
                fill="#777777"
                fill-opacity="1.000000"
                fill-rule="nonzero"
              />
            </g>
          </svg>

          <span>Your Library</span>
        </div>
      </Link>
    </nav>
  );
}
