// import React from 'react'
// import { assets, cities } from '../assets/assets'

// const HotelReg = () => {
//   return (
//     <div className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70'>
//         <form className='flex bg-white rounded-xl max-w-4xl max-md:mx-2'>
//             <img src={assets.regImage} alt="reg-image" className='w-1/2 rounded-xl hidden md:block' />
//         </form>

//         <div className='relative flex flex-col items-center md:w-1/2 p-8 md:p-10'>
//             <img src={assets.closeIcon} alt="close-icon" className='absolute top-4 right-4 h-4 w-4 cursor-pointer'/>
//             <p className='text-2xl font-semibold mt-6'>Register Your Hotel</p>

//                 {/*Hotel Name*/}
//             <div className='w-full mt-4'>
//                 <label htmlFor="name" className='font-medium text-gray-500'>
//                     Hotel Name
//                 </label>
//                 <input id='name' type="text" placeholder='Type here' className='border border-gray-200 rounded w-ful px-3 py-2.5 mt-1 outline-indigo-500 font-light' required/>
//             </div>
//                 {/* Phone*/}
//             <div className='w-full mt-4'>
//                 <label htmlFor="contact" className='font-medium text-gray-500'>
//                     Phone
//                 </label>
//                 <input id='contact' type="text" placeholder='Type here' className='border border-gray-200 rounded w-ful px-3 py-2.5 mt-1 outline-indigo-500 font-light' required/>
//             </div>
//             {/* Address*/}
//             <div className='w-full mt-4'>
//                 <label htmlFor="address" className='font-medium text-gray-500'>
//                     Address
//                 </label>
//                 <input id='address' type="text" placeholder='Type here' className='border border-gray-200 rounded w-ful px-3 py-2.5 mt-1 outline-indigo-500 font-light' required/>
//             </div>
//             {/* Select City Dropdown*/}
//             <div className='w-full mt-4 max-w-60 mr-auto'>
//                 <label htmlFor="city" className='font-medium text-gray-500'>City</label>
//                 <select  id="city" className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required>
//                     <option value="">Select City</option>
//                     {cities.map((city) => (
//                         <option key={city} value={city}>{city}</option>
//                     ))}
//                 </select>
//             </div>
//             <button className='bg-indigo-500 hover:bg-indigo-600 transition-all text-white mr-auto px-6 py02 rounded cursor-pointer mt-6'>Register</button>
//         </div>

//     </div>
//   )
// }

// export default HotelReg


import React from 'react'
import { assets, cities } from '../assets/assets'

const HotelReg = ({ onClose }) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'>
        <div className='bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden animate-fadeIn'>
            <div className='flex flex-col md:flex-row'>
                
                {/* Image Section */}
                <div className='md:w-1/2 relative overflow-hidden'>
                    <img 
                        src={assets.regImage} 
                        alt="Luxury hotel registration" 
                        className='w-full h-64 md:h-full object-cover' 
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent'></div>
                </div>

                {/* Form Section */}
                <div className='md:w-1/2 p-8 md:p-12 relative'>
                    
                    {/* Close Button */}
                    <button 
                        onClick={onClose}
                        className='absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200'
                        aria-label="Close modal"
                    >
                        <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Header */}
                    <div className='mb-8'>                        
                        <h2 className='font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-3'>
                            Register Your Hotel
                        </h2>
                        
                        <p className='text-gray-600 text-base leading-relaxed'>
                            Join the StayMori Collection and showcase your property to luxury travelers worldwide.
                        </p>
                    </div>

                    {/* Form */}
                    <form className='space-y-6'>
                        
                        {/* Hotel Name */}
                        <div>
                            <label htmlFor="name" className='block text-sm font-semibold text-gray-700 mb-2'>
                                Hotel Name *
                            </label>
                            <input 
                                id='name' 
                                type="text" 
                                placeholder='Enter your hotel name' 
                                className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-light text-gray-900 placeholder-gray-400' 
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="contact" className='block text-sm font-semibold text-gray-700 mb-2'>
                                Phone Number *
                            </label>
                            <input 
                                id='contact' 
                                type="tel" 
                                placeholder='Enter phone number' 
                                className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-light text-gray-900 placeholder-gray-400' 
                                required
                            />
                        </div>

                        {/* Address */}
                        <div>
                            <label htmlFor="address" className='block text-sm font-semibold text-gray-700 mb-2'>
                                Full Address *
                            </label>
                            <input 
                                id='address' 
                                type="text" 
                                placeholder='Enter complete address' 
                                className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-light text-gray-900 placeholder-gray-400' 
                                required
                            />
                        </div>

                        {/* City Dropdown */}
                        <div>
                            <label htmlFor="city" className='block text-sm font-semibold text-gray-700 mb-2'>
                                City *
                            </label>
                            <select 
                                id="city" 
                                className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-light text-gray-900 bg-white' 
                                required
                            >
                                <option value="" className='text-gray-400'>Select your city</option>
                                {cities.map((city) => (
                                    <option key={city} value={city} className='text-gray-900'>{city}</option>
                                ))}
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div className='pt-4'>
                            <button 
                                type='submit'
                                className='w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50'
                            >
                                Register Hotel
                            </button>
                            
                            <p className='text-xs text-gray-500 mt-3 text-center leading-relaxed'>
                                By registering, you agree to our Terms of Service and Privacy Policy. 
                                We'll review your application within 2-3 business days.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <style jsx>{`
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            .animate-fadeIn {
                animation: fadeIn 0.2s ease-out;
            }
        `}</style>
    </div>
  )
}

export default HotelReg