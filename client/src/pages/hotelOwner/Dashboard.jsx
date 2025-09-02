// import React, { useState } from 'react'
// import Title from '../../components/Title'
// import { assets, dashboardDummyData } from '../../assets/assets'

// const Dashboard = () => {

//     const [dashbordData, setDashboardData] = useState(dashboardDummyData) 

//   return (
//     <div>
//       <Title align='left' font='outfit' title='Dashboard' subTitle='Streamline management of rooms, bookings, and earnings with powerful tools. Unlock valuable insights that drive growth and ensure operational success.' />
//       <div className='flex gap-4 my-8'>
//         {/* Total bookings */}
//         <div className='bg-primary/3 border-primary/10 rounded flex p-4 pr-8'>
//             <img src={assets.totalBookingIcon} alt="" className='max-sm:hidden h-10' />
//             <div className='flex flex-col sm:ml-4 font-medium'>
//                 <p className='text-blue-500 text-lg'>Total Bookings</p>
//                 <p className='text-neutral-400 text-base'>{dashbordData.totalBookings}</p>
//             </div>
//         </div>
//         {/* Total Revenue */}
//        <div className='bg-primary/3 border-primary/10 rounded flex p-4 pr-8'>
//             <img src={assets.totalRevenueIcon} alt="" className='max-sm:hidden h-10' />
//             <div className='flex flex-col sm:ml-4 font-medium'>
//                 <p className='text-blue-500 text-lg'>Total Revenue</p>
//                 <p className='text-neutral-400 text-base'>$ {dashbordData.totalRevenue}</p>
//             </div>
//         </div>
//       </div>
//       {/* Recent Bookings */}
//       <h2 className='text-xl text-blue-950/70 font-medium mb-5'>Recent Bookings</h2>
//       <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll'>
//         <table className='w-full'>
//         <thead className='bg-gray-50'>
//             <tr>
//                 <th className='py-3 px-4 text-gray-800 font-medium'>User Name</th>
//                 <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Room Name</th>
//                 <th className='py-3 px-4 text-gray-800 font-medium text-center'>Total Amount</th>
//                 <th className='py-3 px-4 text-gray-800 font-medium text-center'>Payment Status</th>
//             </tr>
//         </thead>

//         <tbody className='text-sm'>
//             {dashbordData.bookings.map((item,index) => (
//                 <tr key={index}>
//                     <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>
//                         {item.user.username}
//                     </td>
//                     <td className='py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden'>
//                         {item.room.roomType}
//                     </td>
//                     <td className='py-3 px-4 text-gray-700 border-t border-gray-300 text-center'>
//                        $ {item.totalPrice}
//                     </td>
//                     <td className='py-3 px-4 border-t border-gray-300 flex'>
//                         <button
//                             className={`py-1 px-3 text-xs rounded-full mx-auto ${
//                             item.isPaid
//                                 ? "bg-green-200 text-green-600"
//                                 : "bg-amber-200 text-yellow-600"
//                             }`}
//                         >
//                             {item.isPaid ? "Completed" : "Pending"}
//                         </button> 
//                     </td>
//                 </tr>
//             ))}
//         </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default Dashboard

import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets, dashboardDummyData } from '../../assets/assets'

const Dashboard = () => {
    const [dashbordData, setDashboardData] = useState(dashboardDummyData)

    return (
        <div className='py-8 px-4 md:px-0'>
            
            {/* Header Section - Clean and Simple */}
            <div className='flex flex-col items-start text-left mb-8'>
                <h1 className='font-playfair text-4xl md:text-[40px]  text-gray-900'>Dashboard</h1>
                <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>
                    Streamline management of rooms, bookings, and earnings with powerful tools. Unlock valuable insights that drive growth and ensure operational success.
                </p>
            </div>

            {/* Stats Cards - Simple White Cards */}
            <div className='flex gap-4 my-8'>
                
                {/* Total Bookings */}
                <div className='bg-white border border-gray-300 rounded p-4 pr-8 flex items-center'>
                    <img src={assets.totalBookingIcon} alt="" className='max-sm:hidden h-10' />
                    <div className='flex flex-col sm:ml-4 font-medium'>
                        <p className='text-gray-600 text-lg'>Total Bookings</p>
                        <p className='text-neutral-400 text-base'>{dashbordData.totalBookings}</p>
                    </div>
                </div>

                {/* Total Revenue */}
                <div className='bg-white border border-gray-300 rounded p-4 pr-8 flex items-center'>
                    <img src={assets.totalRevenueIcon} alt="" className='max-sm:hidden h-10' />
                    <div className='flex flex-col sm:ml-4 font-medium'>
                        <p className='text-gray-600 text-lg'>Total Revenue</p>
                        <p className='text-neutral-400 text-base'>$ {dashbordData.totalRevenue}</p>
                    </div>
                </div>
            </div>

            {/* Recent Bookings - Clean White Container */}
            <h2 className='text-xl text-gray-600 font-medium mb-5'>Recent Bookings</h2>
            
            <div className='bg-white w-full border border-gray-300 text-gray-600'>
                
                {/* Header Row */}
                <div className='flex items-center justify-between px-5 py-2.5 border-b border-gray-300'>
                    <p className='text-base font-medium text-gray-800'>BOOKINGS</p>
                    <div className='text-xs cursor-pointer'>
                        <span className='hover:text-blue-600'>CLEAR</span>
                    </div>
                </div>

                {/* Table Content */}
                <div className='max-h-80 overflow-y-auto'>
                    
                    {/* Table Header */}
                    <div className='hidden md:grid md:grid-cols-4 px-5 py-3 bg-gray-50 border-b border-gray-300 font-medium text-sm'>
                        <div>User Name</div>
                        <div>Room Name</div>
                        <div className='text-center'>Total Amount</div>
                        <div className='text-center'>Payment Status</div>
                    </div>

                    {/* Bookings List */}
                    {dashbordData.bookings.map((item, index) => (
                        <div key={index} className='grid grid-cols-1 md:grid-cols-4 px-5 py-4 border-b border-gray-300 last:border-0 hover:bg-gray-50/50 transition-colors'>
                            
                            {/* User Name */}
                            <div className='flex flex-col gap-1'>
                                <p className='font-medium text-gray-800'>{item.user.username}</p>
                                <p className='text-xs text-gray-500'>Guest</p>
                            </div>

                            {/* Room Type */}
                            <div className='flex items-center max-md:mt-2'>
                                <span className='text-gray-700 font-light'>{item.room.roomType}</span>
                            </div>

                            {/* Amount */}
                            <div className='flex items-center md:justify-center max-md:mt-2'>
                                <span className='text-gray-700 font-medium'>${item.totalPrice}</span>
                            </div>

                            {/* Status */}
                            <div className='flex items-center md:justify-center max-md:mt-2'>
                                <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                                    item.isPaid
                                        ? "bg-green-200 text-green-600"
                                        : "bg-amber-200 text-yellow-600"
                                }`}>
                                    {item.isPaid ? "Completed" : "Pending"}
                                </span>
                            </div>
                        </div>
                    ))}

                    {/* Empty State */}
                    {dashbordData.bookings.length === 0 && (
                        <div className='text-center py-12 px-5'>
                            <p className='text-gray-500 mb-2'>No bookings found</p>
                            <p className='text-sm text-gray-400'>Your recent bookings will appear here</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}

export default Dashboard