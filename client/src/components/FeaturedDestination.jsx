import React from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets.js'
import React, { useState, useEffect } from 'react'

const FeaturedDestination = () => {
    const navigate = useNavigate()

    const [featuredRooms, setFeaturedRooms] = useState([]);

        useEffect(() => {
            fetchFeaturedRooms();
        }, []);

    const fetchFeaturedRooms = async () => {
        try {
            const response = await fetch('/api/amadeus/hotels?cityCode=NYC');
            const data = await response.json();
            const convertedRooms = data.data.slice(0, 4).map(hotel => ({
                _id: hotel.hotel.hotelId,
                hotel: {
                    name: hotel.hotel.name,
                    address: hotel.hotel.address?.cityName || 'Featured Location'
                },
                pricePerNight: hotel.offers?.[0]?.price?.total || 200,
                images: ['/assets/hotel-placeholder.jpg']
            }));
            setFeaturedRooms(convertedRooms);
        } catch (error) {
            console.error('Failed to fetch featured rooms:', error);
            setFeaturedRooms([]);
        }
    };


    return (
        <section className='relative py-24 md:py-32 bg-gradient-to-b from-white to-gray-50/50 overflow-hidden'>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-400 rounded-full filter blur-3xl"></div>
            </div>

            <div className='relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12'>
                {/* Header Section */}
                <div className='text-center mb-16 md:mb-20'>                    
                    <h2 className='font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight'>
                        Featured Destinations
                    </h2>
                    
                    <p className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light'>
                        Discover our curated portfolio of luxury hotels worldwide, offering timeless elegance, refined comfort, and unforgettable stays.
                    </p>
                </div>

                {/* Hotels Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16'>
                    {featuredRooms.slice(0, 4).map((room, index) => (
                        <div 
                            key={room._id} 
                            className="group transform transition-all duration-300 hover:scale-105 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl animate-fadeInUp"
                            style={{
                                animationDelay: `${index * 100}ms`
                            }}
                        >
                            <HotelCard room={room} index={index} />
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className='text-center'>
                    <div className='inline-flex flex-col items-center'>
                        <button 
                            onClick={() => {
                                navigate('/rooms'); 
                                window.scrollTo(0, 0);
                            }} 
                            className='group relative px-8 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-semibold transition-all duration-300 hover:border-gray-800 hover:bg-gray-800 hover:text-white shadow-sm hover:shadow-xl'
                        >
                            <span className='flex items-center gap-2'>
                                View All Destinations
                                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </button>
                        
                        <p className='text-sm text-gray-500 mt-3 max-w-md'>
                            Explore our complete collection of luxury properties worldwide
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeaturedDestination
