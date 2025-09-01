// import React from 'react'
// import { cities, assets } from '../assets/assets'
// import heroImage from "../assets/heroImage.png"; 

// const Hero = () => {
//   return (
//     <div className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 
//     xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen '>
//         <p className='bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20'>The Ultimate Hotel Experience</p>
//         <h1 className='font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4'>Discover Your Perfect Gateway Destination</h1>
//         <p className='max-w-130 mt-2 text-sm md:text-base'>Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. Start your journey today.</p>
//         <form className='bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'>

//             <div>
//                 <div className='flex items-center gap-2'>
//                     <img src={assets.calenderIcon} alt="" className='h-4' />
//                     <label htmlFor="destinationInput">Destination</label>
//                 </div>
//                 <input list='destinations' id="destinationInput" type="text" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" required />
//                 <datalist id='destinations'>
//                     {cities.map((city, index) => (
//                         <option value={city} key={index} />
//                     ))}
//                 </datalist>
//             </div>

//             <div>
//                 <div className='flex items-center gap-2'>
//                     <img src={assets.calenderIcon} alt="" className='h-4'/>
//                     <label htmlFor="checkIn">Check in</label>
//                 </div>
//                 <input id="checkIn" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
//             </div>

//             <div>
//                 <div className='flex items-center gap-2'>
//                     <img src={assets.calenderIcon} alt="" className='h-4'/>
//                     <label htmlFor="checkOut">Check out</label>
//                 </div>
//                 <input id="checkOut" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
//             </div>

//             <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
//                 <label htmlFor="guests">Guests</label>
//                 <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
//             </div>

//             <button className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
//                 <img src={assets.searchIcon} alt="searchIcon" className='h-7'/>
//                 <span>Search</span>
//             </button>
//         </form>
//     </div>
//   )
// }

// export default Hero

import React from 'react'
import { cities, assets } from '../assets/assets'
import heroImage from "../assets/heroImage.png"; 

const Hero = () => {
  return (
    <div className='relative flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center h-screen'>
        {/* Gradient overlay for better text readability */}
        {/* <div className='absolute inset-0 bg-gradient-to-r from-gray-200/0 via-gray-500/30 to-gray-600/40'></div> */}
        
        {/* Content - positioned above overlay */}
        <div className='relative z-10'>
            {/* Badge */}
            <div className='inline-flex items-center bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mt-40 border border-white/30'>
                <span className='text-sm font-medium text-white'>The Ultimate Hotel Experience</span>
            </div>
            
            {/* Main heading */}
            <h1 className='font-playfair text-3xl md:text-6xl lg:text-7xl font-bold max-w-4xl mt-6 leading-tight text-white drop-shadow-xl'>
                Discover Your Perfect 
                <span className='block text-white/90'>Gateway Destination</span>
            </h1>
            
            {/* Subtitle */}
             <p className="max-w-xl mt-6 text-lg md:text-xl text-white font-light leading-relaxed bg-gray-900/80 p-4 rounded-lg">
                Unparalleled luxury and comfort await at the world's most exclusive hotels and resorts. 
                Start your journey today.
            </p>

        </div>

        {/* Search form - positioned at bottom */}
        <div className='relative z-10 w-full mt-12 mb-16'>
            <form className='bg-white/95 backdrop-blur-lg text-gray-700 rounded-2xl p-6 shadow-2xl border border-white/20 max-w-6xl'>
                <div className='grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 gap-4 items-end'>
                    
                    {/* Destination */}
                    <div className='space-y-2'>
                        <div className='flex items-center gap-2 text-gray-600'>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <label htmlFor="destinationInput" className='text-sm font-medium'>Destination</label>
                        </div>
                        <input 
                            list='destinations' 
                            id="destinationInput" 
                            type="text" 
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                            placeholder="Where to?" 
                            required 
                        />
                        <datalist id='destinations'>
                            {cities.map((city, index) => (
                                <option value={city} key={index} />
                            ))}
                        </datalist>
                    </div>

                    {/* Check in */}
                    <div className='space-y-2'>
                        <div className='flex items-center gap-2 text-gray-600'>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <label htmlFor="checkIn" className='text-sm font-medium'>Check in</label>
                        </div>
                        <input 
                            id="checkIn" 
                            type="date" 
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                        />
                    </div>

                    {/* Check out */}
                    <div className='space-y-2'>
                        <div className='flex items-center gap-2 text-gray-600'>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <label htmlFor="checkOut" className='text-sm font-medium'>Check out</label>
                        </div>
                        <input 
                            id="checkOut" 
                            type="date" 
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                        />
                    </div>

                    {/* Guests */}
                    <div className='space-y-2'>
                        <div className='flex items-center gap-2 text-gray-600'>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                            </svg>
                            <label htmlFor="guests" className='text-sm font-medium'>Guests</label>
                        </div>
                        <input 
                            min={1} 
                            max={8} 
                            id="guests" 
                            type="number" 
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                            placeholder="2" 
                        />
                    </div>

                    {/* Search button */}
                    <div className='md:col-span-4 xl:col-span-1'>
                        <button 
                            type="submit"
                            className='w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2'
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span>Search Hotels</span>
                        </button>
                    </div>

                </div>
            </form>
        </div>
    </div>
  )
}

export default Hero