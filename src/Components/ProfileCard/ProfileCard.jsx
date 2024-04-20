import React from 'react'
import './ProfileCard.scss'

export default function ProfileCard() {
	return (
		<div className='profile_card_container'>
			<div className='profile_card'>
				<img src='' className='card_image' />
				<div className='text_block'>
					<p className='card_title'></p>
					<p className='card_text'></p>
				</div>
			</div>
		</div>
	)
}
