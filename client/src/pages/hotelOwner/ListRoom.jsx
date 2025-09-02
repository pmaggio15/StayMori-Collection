import React, { useState } from 'react'
import { assets, roomsDummyData } from '../../assets/assets'
import Title from '../../components/Title'

const ListRoom = () => {

    const [rooms, setRooms] = useState(roomsDummyData)
  return (
    <div>
      <Title align='left' font='outfit' title='Room Listings' subTitle='Review, update, and organize all listed rooms. Maintain accurate details to ensure guests enjoy a seamless booking experience.' />
      <p className='text-gray-500 mt-8'>All Rooms</p>
      <div className='bg-white w-full border border-gray-300 text-gray-600'></div>
    </div>
  )
}

export default ListRoom
