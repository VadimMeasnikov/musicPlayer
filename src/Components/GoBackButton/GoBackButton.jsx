import { useNavigate } from 'react-router-dom';

import arrow from '../../img/Chevron left.png'

import './goBackButton.scss'

export default function GoBackButton() {

  const navigate = useNavigate()

  const goBack = () => navigate('/')

  return (
    <button onClick={goBack} className='go_back__button'>
        <img className='arrow_img' src={arrow} alt="" />
    </button>
  )
}
