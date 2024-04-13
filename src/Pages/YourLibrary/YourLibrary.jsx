import React from 'react'
import './yourLibrary.scss'
import LibraryButton from '../../Components/LibraryButton/LibraryButton.jsx'
import Navigation from "../../Components/Navigation/Navigation"
import imgSort from "../../img/imgSort2.png"
import imgSort2 from "../../img/imgSort.png"
import imgSortCube from "../../img/imgSort-cube.png"
import userImg from "../../img/userImg.png"


export default function YourLibrary() {
  return (
    <>
    <div className="wrapper">
      <div className="library-page">
        <div className="library-page__box">
           <img src={userImg} alt="" /> 
          <h1 className="library-page__title">Your Library</h1>
        </div>
      </div>
      <div className="library-scroll">
        <LibraryButton/>
      </div>
      <div className="library-sort">
        <div className='library-imgs'>
        <img className='imgSort1' src={imgSort} alt="" />
        <img src={imgSort2} alt="" />
        <p>Recently played</p>
        </div>
        <img src={imgSortCube} alt="" />
      </div>
      <Navigation />
    </div>
    </>
  )
}
