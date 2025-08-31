// import React from 'react'
// import { Link } from 'react-router-dom';
// import { assets } from '../assets/assets';

// const Navbar = () => {
//     const navLinks = [
//         { name: 'Home', path: '/' },
//         { name: 'Hotels', path: '/rooms' },
//         { name: 'Experience', path: '/' },
//         { name: 'About', path: '/' },
//     ];


//     const [isScrolled, setIsScrolled] = React.useState(false);
//     const [isMenuOpen, setIsMenuOpen] = React.useState(false);

//     React.useEffect(() => {
//         const handleScroll = () => {
//             setIsScrolled(window.scrollY > 10);
//         };
//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     return (
//             <nav className={`fixed top-0 left-0 bg-indigo-500 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>

//                 {/* Logo */}
//                 <Link to='/'>
//                     <img src={assets.logo} alt="logo" className={`h-12 ${isScrolled && "invert opacity-80"}`} />
//                 </Link>

//                 {/* Desktop Nav */}
//                 <div className="hidden md:flex items-center gap-4 lg:gap-8">
//                     {navLinks.map((link, i) => (
//                         <a key={i} href={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
//                             {link.name}
//                             <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
//                         </a>
//                     ))}
//                     <button className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-black' : 'text-white'} transition-all`}>
//                         Dashboard
//                     </button>
//                 </div>

//                 {/* Desktop Right */}
//                 <div className="hidden md:flex items-center gap-4">
//                     <img src={assets.searchIcon} alt="search" className={`${isScrolled && 'invert'} h-7 transition-all duration-500`} />
//                     <button className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${isScrolled ? "text-white bg-black" : "bg-white text-black"}`}>
//                         Login
//                     </button>
//                 </div>

//                 {/* Mobile Menu Button */}
//                 <div className="flex items-center gap-3 md:hidden">
//                     <img onClick={()=> setIsMenuOpen(!isMenuOpen)} src={assets.menuIcon} alt="" className={`${isScrolled && "invert"} h-4`} />
//                 </div>

//                 {/* Mobile Menu */}
//                 <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
//                     <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
//                         <img src={assets.closeIcon} alt="close-menu" className='h-6.5' />
//                     </button>

//                     {navLinks.map((link, i) => (
//                         <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
//                             {link.name}
//                         </a>
//                     ))}

//                     <button className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">
//                         Dashboard
//                     </button>

//                     <button className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
//                         Login
//                     </button>
//                 </div>
//             </nav>
//     );
// }

// export default Navbar


import React from 'react'
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/rooms' },
        { name: 'Experience', path: '/experience' },
        { name: 'About', path: '/about' },
    ];

    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when clicking outside
    React.useEffect(() => {
        const handleClickOutside = () => {
            if (isMenuOpen) setIsMenuOpen(false);
        };
        
        if (isMenuOpen) {
            document.addEventListener('click', handleClickOutside);
        }
        
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMenuOpen]);

    return (
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 md:px-8 lg:px-16 xl:px-24 transition-all duration-300 z-50 ${
            isScrolled 
                ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 py-3" 
                : "bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm py-4 md:py-5"
        }`}>

            {/* Logo */}
            <Link to='/' className="flex items-center space-x-2 group">
                <div className={`p-2 rounded-xl transition-all duration-300 ${
                    isScrolled ? 'bg-blue-50' : 'bg-white/10'
                }`}>
                    <img 
                        src={assets.logo} 
                        alt="Hotel Logo" 
                        className={`h-12 w-24 transition-all duration-300 ${
                            isScrolled ? 'opacity-90' : 'brightness-0 invert'
                        }`} 
                    />
                </div>
                {/* <span className={`hidden sm:block text-xl font-bold font__playfair transition-colors duration-300 ${
                    isScrolled ? 'text-gray-800' : 'text-white'
                }`}>
                    StayMori Collection
                </span> */}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
                {navLinks.map((link, i) => (
                    <Link 
                        key={i} 
                        to={link.path} 
                        className={`relative group py-2 px-1 text-sm font-medium transition-colors duration-300 ${
                            isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-white'
                        }`}
                    >
                        {link.name}
                        <div className={`absolute bottom-0 left-0 w-0 h-0.5 rounded-full transition-all duration-300 group-hover:w-full ${
                            isScrolled ? 'bg-blue-600' : 'bg-white'
                        }`} />
                    </Link>
                ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
                {/* Search Button */}
                <button 
                    className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-105 ${
                        isScrolled 
                            ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-800' 
                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                    aria-label="Search hotels"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>

                {/* Dashboard Link */}
                <Link 
                    to="/dashboard"
                    className={`px-4 py-2 text-sm font-medium rounded-xl border transition-all duration-300 hover:scale-105 ${
                        isScrolled 
                            ? 'border-gray-300 text-gray-700 hover:bg-gray-50' 
                            : 'border-white/30 text-white hover:bg-white/10'
                    }`}
                >
                    Dashboard
                </Link>

                {/* Login Button */}
                <button className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg ${
                    isScrolled 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/25' 
                        : 'bg-white text-gray-900 hover:bg-gray-100 shadow-white/25'
                }`}>
                    Sign In
                </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-3 lg:hidden">
                {/* Mobile Search */}
                <button 
                    className={`p-2 rounded-lg transition-colors duration-300 ${
                        isScrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                    }`}
                    aria-label="Search"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>

                {/* Hamburger Menu */}
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsMenuOpen(!isMenuOpen);
                    }}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                        isScrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                    }`}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    <div className="relative w-5 h-5">
                        <span className={`absolute block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                            isMenuOpen ? 'rotate-45 top-2' : 'top-1'
                        }`} />
                        <span className={`absolute block w-5 h-0.5 bg-current top-2 transition-opacity duration-300 ${
                            isMenuOpen ? 'opacity-0' : 'opacity-100'
                        }`} />
                        <span className={`absolute block w-5 h-0.5 bg-current transform transition-all duration-300 ${
                            isMenuOpen ? '-rotate-45 top-2' : 'top-3'
                        }`} />
                    </div>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" 
                     onClick={() => setIsMenuOpen(false)} />
            )}

            {/* Mobile Menu */}
            <div className={`fixed top-0 right-0 w-80 max-w-[85vw] h-screen bg-white shadow-2xl transform transition-transform duration-300 z-50 lg:hidden ${
                isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}>
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div className="flex items-center space-x-2">
                        <div className="p-2 bg-blue-50 rounded-xl">
                            <img src={assets.logo} alt="Hotel Logo" className="h-6 w-6" />
                        </div>
                        <span className="text-lg font-bold font__playfair text-gray-800">Luxe Stay</span>
                    </div>
                    <button 
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Close menu"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu Content */}
                <div className="flex flex-col h-full">
                    <div className="flex-1 py-6">
                        {navLinks.map((link, i) => (
                            <Link 
                                key={i} 
                                to={link.path} 
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200 font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                        
                        <Link 
                            to="/dashboard"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center px-6 py-4 mx-6 mt-4 text-center text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                        >
                            Dashboard
                        </Link>
                    </div>

                    {/* Mobile Menu Footer */}
                    <div className="p-6 border-t border-gray-100">
                        <button 
                            onClick={() => setIsMenuOpen(false)}
                            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar