import React from 'react'
import Navigation from '../../Components/Navigation/Navigation'
import MiniCard from '../../Components/MiniCard/MiniCard'
import { useGetTrackQuery } from '../../reduxToolkit/queryApi/tracksJamendo'
import './home.scss'

export default function Home() {
  const { data } = useGetTrackQuery()
  console.log(data)
  return (
    <div className="wrapper">
      <div className="homePage">
        <div className="homePage-recentlyPlayed">
          <div className="homePage-titleBox">
            <div className="homePage-title">Good morning!</div>
            <div className="homePage-settings">
              <svg width="17.000000" height="19.000000" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs />
                <path id="Vector" d="M8.5 19C9.14 19 9.76 18.74 10.21 18.3C10.67 17.85 10.92 17.25 10.92 16.62L6.07 16.62C6.07 17.25 6.32 17.85 6.78 18.3C7.23 18.74 7.85 19 8.5 19ZM8.5 2.27L7.53 2.46C6.43 2.68 5.44 3.27 4.73 4.11C4.03 4.96 3.64 6.03 3.64 7.12C3.64 7.87 3.48 9.73 3.08 11.56C2.89 12.47 2.62 13.42 2.28 14.25L14.71 14.25C14.37 13.42 14.11 12.48 13.91 11.56C13.51 9.73 13.35 7.87 13.35 7.12C13.35 6.03 12.96 4.96 12.26 4.12C11.55 3.27 10.56 2.68 9.46 2.47L8.5 2.27L8.5 2.27ZM16.05 14.25C16.32 14.78 16.63 15.2 17 15.43L0 15.43C0.36 15.2 0.67 14.78 0.94 14.25C2.04 12.11 2.42 8.17 2.42 7.12C2.42 4.25 4.51 1.85 7.29 1.3C7.27 1.14 7.29 0.97 7.34 0.81C7.39 0.65 7.48 0.51 7.59 0.39C7.71 0.26 7.85 0.16 8 0.1C8.16 0.03 8.33 0 8.5 0C8.66 0 8.83 0.03 8.99 0.1C9.14 0.16 9.28 0.26 9.4 0.39C9.51 0.51 9.6 0.65 9.65 0.81C9.7 0.97 9.72 1.14 9.7 1.3C11.08 1.57 12.31 2.3 13.2 3.36C14.08 4.42 14.57 5.75 14.57 7.12C14.57 8.17 14.96 12.11 16.05 14.25Z" fill="#FFFFFF" fill-opacity="1.000000" fill-rule="nonzero" />
              </svg>
              <svg width="19.000000" height="20.000000" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs />
                <rect id="icons/control center/orientation lock" width="19.237818" height="19.844612" transform="matrix(-0.999966 -0.00821519 -0.00821519 0.999966 18.4152 -0.841797)" fill="#FFFFFF" fill-opacity="0" />
                <path id="Orientation Lock" d="M11.7328 0.748291C8.06458 -0.230469 4.28455 1.72705 2.76111 5.20068L4.33752 5.62134L1.17419 8.771L0.000366211 4.46411L1.71704 4.92212C3.40674 0.860352 7.77734 -1.44824 12.017 -0.316895C16.6508 0.919434 19.3733 5.79663 18.0979 10.5764C16.8226 15.3564 12.0322 18.229 7.39844 16.9927C5.14368 16.3911 3.27539 14.9045 2.14246 12.8757C1.99597 12.613 2.08594 12.2759 2.34302 12.1216C2.60022 11.9675 2.92712 12.0547 3.07324 12.3164C4.0675 14.0972 5.70459 15.3997 7.68274 15.9275C11.7462 17.0117 15.9469 14.4927 17.0653 10.301C18.1837 6.10938 15.7963 1.83252 11.7328 0.748291Z" clip-rule="evenodd" fill="#FFFFFF" fill-opacity="1.000000" fill-rule="evenodd" />
                <rect id="Rectangle 17" x="8.777710" y="2.550293" rx="0.443764" width="0.887527" height="5.768934" transform="rotate(0.941437 8.777710 2.550293)" fill="#FFFFFF" fill-opacity="1.000000" />
                <rect id="Rectangle 18" x="8.777710" y="8.037842" rx="0.443764" width="0.887529" height="5.547053" transform="rotate(44.033 8.777710 8.037842)" fill="#FFFFFF" fill-opacity="1.000000" />
              </svg>

              <svg width="24.000000" height="24.000000" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <defs>
                  <clipPath id="clip156_1643">
                    <rect id="Icon/Settings" width="24.000000" height="24.000000" fill="white" fill-opacity="0" />
                  </clipPath>
                </defs>
                <rect id="Icon/Settings" width="24.000000" height="24.000000" fill="#FFFFFF" fill-opacity="0" />
                <g clip-path="url(#clip156_1643)">
                  <path id="Vector" d="M13.67 4.31C13.73 4.58 13.86 4.82 14.04 5.03C14.21 5.23 14.43 5.39 14.69 5.5C14.94 5.6 15.21 5.65 15.48 5.62C15.75 5.6 16.01 5.52 16.24 5.38C17.79 4.44 19.55 6.2 18.61 7.75C18.47 7.98 18.39 8.24 18.37 8.51C18.35 8.78 18.39 9.05 18.49 9.3C18.6 9.56 18.76 9.78 18.96 9.95C19.17 10.13 19.41 10.26 19.68 10.32C21.43 10.75 21.43 13.24 19.68 13.67C19.41 13.73 19.17 13.86 18.96 14.04C18.76 14.21 18.6 14.43 18.49 14.69C18.39 14.94 18.34 15.21 18.37 15.48C18.39 15.75 18.47 16.01 18.61 16.24C19.55 17.79 17.79 19.55 16.24 18.61C16.01 18.47 15.75 18.39 15.48 18.37C15.21 18.35 14.94 18.39 14.69 18.49C14.44 18.6 14.21 18.76 14.04 18.96C13.86 19.17 13.73 19.41 13.67 19.68C13.24 21.43 10.75 21.43 10.32 19.68C10.26 19.41 10.13 19.17 9.95 18.96C9.78 18.76 9.56 18.6 9.3 18.49C9.05 18.39 8.78 18.34 8.51 18.37C8.24 18.39 7.98 18.47 7.75 18.61C6.2 19.55 4.44 17.79 5.38 16.24C5.52 16.01 5.6 15.75 5.62 15.48C5.64 15.21 5.6 14.94 5.5 14.69C5.39 14.43 5.23 14.21 5.03 14.04C4.82 13.86 4.58 13.73 4.31 13.67C2.56 13.24 2.56 10.75 4.31 10.32C4.58 10.26 4.82 10.13 5.03 9.95C5.23 9.78 5.39 9.56 5.5 9.3C5.6 9.05 5.65 8.78 5.62 8.51C5.6 8.24 5.52 7.98 5.38 7.75C4.44 6.2 6.2 4.44 7.75 5.38C8.75 5.98 10.04 5.45 10.32 4.31C10.75 2.56 13.24 2.56 13.67 4.31Z" stroke="#FFFFFF" stroke-opacity="1.000000" stroke-width="1.000000" stroke-linejoin="round" />
                  <path id="Vector" d="M12 15C10.34 15 9 13.65 9 12C9 10.34 10.34 9 12 9C13.65 9 15 10.34 15 12C15 13.65 13.65 15 12 15Z" stroke="#FFFFFF" stroke-opacity="1.000000" stroke-width="1.000000" stroke-linejoin="round" />
                </g>
              </svg>
            </div>
          </div>
          <div className="homePage-recentlyPlayed-results">
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
          </div>
        </div>
        <div className="homePage-editorsPicks">
          <div className="homePage-editorsPicks-title">Made for You</div>
          <div className="homePage-editorsPicks-results">
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
          </div>
        </div>
        <div className="homePage-editorsPicks">
          <div className="homePage-editorsPicks-title">Your Playlists</div>
          <div className="homePage-editorsPicks-results">
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
          </div>
        </div>
        <div className="homePage-editorsPicks">
          <div className="homePage-editorsPicks-title">Editor's Picks</div>
          <div className="homePage-editorsPicks-results">
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
            <MiniCard />
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  )
}
