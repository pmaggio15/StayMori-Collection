// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { facilityIcons, roomCommonData, roomsDummyData } from '../assets/assets'
// import StarRating from '../components/StarRating'
// import { assets } from '../assets/assets'

// const RoomDetails = () => {
//     const {id} = useParams()
//     const [room, setRoom] = useState(null)
//     const [mainImage, setMainImage] = useState(null)

//     useEffect(() => {
//         const room = roomsDummyData.find(room => room._id === id)
//         room && setRoom(room)
//         room && setMainImage(room.images[0])
//     }, [])

//   return room && (
//     <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
//         {/*Room Details */}
//         <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
//             <h1 className='text-3xl md:text-4xl font-playfair'>{room.hotel.name} <span className='font-inter text-sm'>({room.roomType})</span></h1>
//             <p className='text-xs font-inter py-1.5 px-3 text-white bg-gray-700 rounded-full'>20% OFF</p>
//         </div>

//         {/*Room Raiting*/}
//         <div className='flex items-center gap-1 mt-2'>
//             <StarRating />
//             <p className='ml-2'>200+ Reviews</p>
//         </div>

//         {/*Room address*/}
//         <div className='flex items-center gap-1 text-gray-500 mt-2'>
//             <img src={assets.locationIcon} alt="location-icon" />
//             <span>{room.hotel.address}</span>
//         </div>

//         {/*Room images */}
//         <div className='flex flex-col lg:flex-row mt-6 gap-6'>
//             <div className='lg:w-1/2 w-full'>
//                 <img src={mainImage} alt="Room Image" className='w-full rounded-xl shadow-lg object-cover' />
//             </div>
//             <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
//                 {room?.images.length > 1 && room.images.map((image,index) => (
//                     <img onClick={() => setMainImage(image)} 
//                         src={image} 
//                         alt="Room Image" 
//                         key={index} 
//                         className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image && 'outline-3 outline-gray-700'}`} />
//                 ))}
//             </div>
//         </div>

//         {/*Room Highlights*/}
//         <div className='flex flex-col md:flex-row md:justify-between mt-10'>
//             <div className='flex flex-col'>
//                 <h1 className='text-3xl md:text-4xl font-playfair'>Uncover Luxury Beyond Imagination</h1>
//                 <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
//                     {room.amenities.map((item, index) => (
//                         <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
//                             <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />
//                             <p className='text-xs'>{item}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             {/*Room Price*/}
//             <p className='text-2xl font-medium'>${room.pricePerNight} /night</p>
//         </div>

//         {/* CheckIn Checkout Form*/}
//         <form className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'>
//             <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-600'>
                
//                 <div className='flex flex-col'>
//                     <label htmlFor="checkInDate" className='font-medium'>Check-In</label>
//                     <input type="date" id='checkInDate' placeholder='Check-In' className='w-full roudned border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
//                 </div>
//                 <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
//                 <div className='flex flex-col'>
//                     <label htmlFor="checkOutDate" className='font-medium'>Check-Out</label>
//                     <input type="date" id='checkOutDate' placeholder='Check-Out' className='w-full roudned border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
//                 </div>
//                 <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
//                  <div className='flex flex-col'>
//                     <label htmlFor="guests" className='font-medium'>Guests</label>
//                     <input type="number" id='guests' placeholder='0' className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
//                 </div>

//             </div>
//             <button type='submit' className='bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py4 text-base cursor-pointer' required>
//                 Check Availability
//             </button>
//         </form>

//         {/* Common Specifications */}

//         <div className='mt-25 space-y-4'>
//             {roomCommonData.map((spec, index) => (
//                 <div key={index} className='flex items-start gap02'>
//                     <img src={spec.icon} alt={`${spec.title}-icon`} className='w-6.5' />
//                     <div>
//                         <p className='text-base'>{spec.title}</p>
//                         <p className='text-gray-600'>{spec.description}</p>
//                     </div>
//                 </div>
//             ))}
//         </div>

//         <div>
//             <p className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>Guests will be placed on the ground floor depending on availability. Indulge in a stylish two-bedroom apartment offering true metropolitan charm. The listed rate is for two guests; please select the number of guests during booking to ensure correct group pricing. Accommodations remain subject to ground floor availability. Relax in a refined two-bedroom apartment designed to reflect the spirit and sophistication of modern city living.</p>
//         </div>

//         {/*Hosted By*/}
//         <div className='flex flex-col items-start gap-4'>
//             <div className='flex gap-4'>
//                 <img src={room.hotel.owner.image} alt="Host" className='h-14 w-14 md:h-18 md:w-18 rounded-full' />
//                 <div>
//                     <p className='text-lg md:text-xl'>Hosted by {room.hotel.name}</p>
//                     <div className='flex items-center mt-1'>
//                         <StarRating />
//                         <p className='ml-2'>200+ reviews</p>
//                     </div>
//                 </div>
//             </div>
//             <button className='bg-gray-800 hover:bg-gray-900 active:scale-95 transition-all duration-300 text-white rounded-xl shadow-lg hover:shadow-xl max-md:w-full max-md:mt-6 md:px-8 py-3 md:py-4 text-base font-semibold cursor-pointer'>Contact Now</button>
//         </div>

//     </div>
//   )
// }

// export default RoomDetails

import React, { useMemo, useState } from 'react'
import { assets, facilityIcons, roomsDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import StarRating from '../components/StarRating';

const CheckBox = ({ label, value, selected = false, onChange = () => {} }) => {
  return (
    <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, value)}
      />
      <span className='font-light select-none'>{label}</span>
    </label>
  )
}

const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
      <input
        type="radio"
        name='sortOption'
        checked={selected}
        onChange={() => onChange(label)}
      />
      <span className='font-light select-none'>{label}</span>
    </label>
  )
}

const AllRooms = () => {
  const navigate = useNavigate();
  const [openFilters, setOpenFilters] = useState(false)

  // Filter options
  const roomTypes = [
    "Single Bed",
    "Double Bed",
    "Luxury Room",
    "Fanatsy Suite", // note: not in dummy data
  ];

  const priceRanges = [
    "0-500",
    "500-1000",
    "1000-2000",
    "2000-3000",
  ];

  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Newest First",
  ];

  // Filter state
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [sortOption, setSortOption] = useState("");

  // Handlers
  const toggleType = (checked, value) => {
    setSelectedTypes(prev => checked ? [...prev, value] : prev.filter(v => v !== value));
  };

  const toggleRange = (checked, value) => {
    setSelectedRanges(prev => checked ? [...prev, value] : prev.filter(v => v !== value));
  };

  const handleSortChange = (label) => setSortOption(label);

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedRanges([]);
    setSortOption("");
  };

  // Helpers
  const rangeToTuple = (r) => {
    const [min, max] = r.split("-").map(n => Number(n.trim()));
    return { min, max };
  };

  // Derived: filtered + sorted list
  const filteredRooms = useMemo(() => {
    let list = [...roomsDummyData];

    if (selectedTypes.length > 0) {
      list = list.filter(r => selectedTypes.includes(r.roomType));
    }

    if (selectedRanges.length > 0) {
      list = list.filter(r =>
        selectedRanges.some(rg => {
          const { min, max } = rangeToTuple(rg);
          return r.pricePerNight >= min && r.pricePerNight <= max;
        })
      );
    }

    if (sortOption === "Price Low to High") {
      list.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortOption === "Price High to Low") {
      list.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (sortOption === "Newest First") {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return list;
  }, [selectedTypes, selectedRanges, sortOption]);

  return (
    <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>

      {/* LEFT: Results */}
      <div className='flex-1 lg:pr-10'>
        <div className='flex flex-col items-start text-left mb-6'>
          <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
          <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-2xl'>
            Unlock special offers and limited-time packages that enhance every moment of your journey with unforgettable experiences.
          </p>

          {(selectedTypes.length > 0 || selectedRanges.length > 0 || sortOption) && (
            <div className='mt-3 text-sm text-gray-600'>
              <span className='font-medium'>Filters: </span>
              {selectedTypes.length > 0 && <span>Type: {selectedTypes.join(", ")}. </span>}
              {selectedRanges.length > 0 && <span>Price: {selectedRanges.join(", ")}. </span>}
              {sortOption && <span>Sort: {sortOption}.</span>}
            </div>
          )}
        </div>

        {filteredRooms.length === 0 ? (
          <div className="w-full py-16 text-center border border-gray-200 rounded-xl">
            <p className="text-gray-700 font-medium">No rooms match your filters.</p>
            <button
              onClick={clearFilters}
              className="mt-3 inline-flex items-center px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          filteredRooms.map((room) => (
            <div key={room._id} className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0'>
              <img
                onClick={() => { navigate(`/rooms/${room._id}`); scrollTo(0, 0) }}
                src={room.images[0]}
                alt="hotel-img"
                title='View Room Details'
                className='max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer'
              />
              <div className='md:w-1/2 flex flex-col gap-2'>
                <p className='text-gray-500'>{room.hotel.city}</p>
                <p
                  onClick={() => { navigate(`/rooms/${room._id}`); scrollTo(0, 0) }}
                  className='text-gray-800 text-3xl font-playfair cursor-pointer'
                >
                  {room.hotel.name}
                </p>
                <div className='flex items-center'>
                  <StarRating />
                  <p className='ml-2'>200+ reviews</p>
                </div>
                <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                  <img src={assets.locationIcon} alt="location-icon" />
                  <span>{room.hotel.address}</span>
                </div>

                {/* Amenities */}
                <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                  {room.amenities.map((item, index) => (
                    <div key={index} className='flex items-center gap-3 px-3 py-2 rounded-lg bg-[#F5F5FF]/70'>
                      <img src={facilityIcons[item]} alt={item} className='w-5 h-5'/>
                      <p className='text-xs'>{item}</p>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <p className='text-xl font-medium text-gray-700'>${room.pricePerNight} /night</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* RIGHT: Filters */}
      <div className='bg-white w-full lg:w-80 border border-gray-300 text-gray-600 max-lg:mb-8 lg:mt-16 rounded-lg overflow-hidden'>
        <div className='flex items-center justify-between px-5 py-2.5 border-b border-gray-300'>
          <p className='text-base font-medium text-gray-800'>FILTERS</p>
          <div className='text-xs cursor-pointer flex items-center gap-4'>
            <span onClick={() => setOpenFilters(!openFilters)} className='lg:hidden'>
              {openFilters ? 'HIDE' : 'SHOW'}
            </span>
            <button onClick={clearFilters} className='hidden lg:inline text-gray-700 hover:underline'>CLEAR</button>
          </div>
        </div>

        <div className={`${openFilters ? 'h-auto' : 'h-0 lg:h-auto'} overflow-hidden transition-all duration-500`}>
          {/* Room Type */}
          <div className='px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>Room Type</p>
            {roomTypes.map((type, index) => (
              <CheckBox
                key={index}
                label={type}
                value={type}
                selected={selectedTypes.includes(type)}
                onChange={toggleType}
              />
            ))}
          </div>

          {/* Price Range */}
          <div className='px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>Price Range</p>
            {priceRanges.map((range, index) => (
              <CheckBox
                key={index}
                label={`$ ${range}`}
                value={range}  // value used in logic; label is just display
                selected={selectedRanges.includes(range)}
                onChange={toggleRange}
              />
            ))}
          </div>

          {/* Sort */}
          <div className='px-5 pt-5 pb-7'>
            <p className='font-medium text-gray-800 pb-2'>Sort By</p>
            {sortOptions.map((option, index) => (
              <RadioButton
                key={index}
                label={option}
                selected={sortOption === option}
                onChange={handleSortChange}
              />
            ))}
          </div>

          {/* Mobile Clear */}
          <div className='px-5 pb-5 lg:hidden'>
            <button
              onClick={clearFilters}
              className='w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition'
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllRooms
