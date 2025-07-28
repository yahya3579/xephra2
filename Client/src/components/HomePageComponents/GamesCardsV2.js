// import React from 'react';
// import { Link } from 'react-router-dom';

// const GamesCardsV2 = ({ dark }) => {
//   const games = [
//     {
//       id: 1,
//       title: "PUBG: Battlegrounds",
//       image: "https://static-cdn.jtvnw.net/ttv-boxart/493057-285x380.jpg"
//     },
//     {
//       id: 2,
//       title: "Fortnite",
//       image: "https://static-cdn.jtvnw.net/ttv-boxart/33214-285x380.jpg"
//     },
//     {
//       id: 3,
//       title: "Call of Duty: Warzone",
//       image: "https://static-cdn.jtvnw.net/ttv-boxart/512710-285x380.jpg"
//     },
//     {
//       id: 4,
//       title: "Minecraft",
//       image: "https://static-cdn.jtvnw.net/ttv-boxart/27471-285x380.jpg"
//     },
//     {
//       id: 5,
//       title: "League of Legends",
//       image: "https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg"
//     },
//     {
//       id: 6,
//       title: "Apex Legends",
//       image: "https://static-cdn.jtvnw.net/ttv-boxart/511224-285x380.jpg"
//     },
//     {
//       id: 7,
//       title: "Valorant",
//       image: "https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg"
//     },
//     {
//       id: 8,
//       title: "Cyberpunk 2077",
//       image: "https://static-cdn.jtvnw.net/ttv-boxart/491931-285x380.jpg"
//     },
//     {
//       id: 9,
//       title: "Roblox",
//       image: "https://static-cdn.jtvnw.net/ttv-boxart/460630-285x380.jpg"
//     },
//     {
//       id: 10,
//       title: "The Legend of Zelda: Breath of the Wild",
//       image: "https://static-cdn.jtvnw.net/ttv-boxart/491158-285x380.jpg"
//     }
//   ];

//   return (
//     <div className={`m-16 p-4 rounded shadow-2xl shadow-gray-950 pb-10 backdrop-blur-sm ${
//               dark ? "bg-[#69363f18] bg-opacity-[.06]" : "bg-[#2321225d]"
//             }`}>
//       {/* Main container */}
//       <div className="container mx-auto px-8 py-16">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <h1 className="font-bold mb-4 font-montserrat drop-shadow-[2px_2px_3px_rgba(0,0,0,0.6)] bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent text-center lg:text-6xl md:text-5xl text-4xl" style={{
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             backgroundClip: 'text'
//           }}>
//             Games
//           </h1>
//           <p className="bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent lg:text-3xl md:text-2xl text-lg mb-8">
//             Explore the most popular games and their amazing features
//           </p>
//           <Link
//             to="/userdashboard/allranking"
//             className={`px-8 py-3 rounded-md font-medium text-white transition-all duration-300 hover:opacity-9 ${
//               dark
//                 ? "bg-[#854951] hover:bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] text-white hover:text-black"
//                 : "bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] hover:bg-[#854951]"
//             }`}
//           >
//             Get Started
//           </Link>
//         </div>

//         {/* Games Grid */}
//         <div className="grid grid-cols-5 gap-4 max-w-6xl mx-auto">
//           {games.map((game, index) => (
//             <div
//               key={game.id}
//               className="group relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
//               style={{
//                 background: 'linear-gradient(145deg, #1e1b4b, #312e81)',
//                 boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
//               }}
//             >
//               {/* Game Image */}
//               <div className="aspect-[4/3] overflow-hidden">
//                 <img
//                   src={game.image}
//                   alt={game.title}
//                   className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
//                 />
//                 {/* Dark overlay */}
//                 <div className="absolute inset-0 bg-black bg-opacity-30"></div>
//               </div>
              
//               {/* Game Title */}
//               <div className="absolute bottom-0 left-0 right-0 p-3">
//                 <h3 className="text-white font-medium text-sm group-hover:text-yellow-300 transition-colors duration-300">
//                   {game.title}
//                 </h3>
//               </div>

//               {/* Hover border effect */}
//               <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-purple-400 transition-all duration-300"></div>
              
//               {/* Subtle glow on hover */}
//               <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" 
//                    style={{background: 'linear-gradient(45deg, #8b5cf6, #a855f7)'}}></div>
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// };

// export default GamesCardsV2;




import React from 'react';
import { Link } from 'react-router-dom';

const GamesCardsV2 = ({ dark }) => {
  const games = [
    {
      id: 1,
      title: "PUBG: Battlegrounds",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/493057-285x380.jpg"
    },
    {
      id: 2,
      title: "Fortnite",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/33214-285x380.jpg"
    },
    {
      id: 3,
      title: "Call of Duty: Warzone",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/512710-285x380.jpg"
    },
    {
      id: 4,
      title: "Minecraft",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/27471-285x380.jpg"
    },
    {
      id: 5,
      title: "League of Legends",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg"
    },
    {
      id: 6,
      title: "Apex Legends",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/511224-285x380.jpg"
    },
    {
      id: 7,
      title: "Valorant",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg"
    },
    {
      id: 8,
      title: "Cyberpunk 2077",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/491931-285x380.jpg"
    },
    {
      id: 9,
      title: "Roblox",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/460630-285x380.jpg"
    },
    {
      id: 10,
      title: "The Legend of Zelda: Breath of the Wild",
      image: "https://static-cdn.jtvnw.net/ttv-boxart/491158-285x380.jpg"
    }
  ];

  return (
    <div className={`m-4 sm:m-8 lg:m-16 p-4 sm:p-6 lg:p-8 rounded-md shadow-2xl shadow-gray-950 pb-8 sm:pb-10 backdrop-blur-sm ${
              dark ? "bg-[#854951] bg-opacity-[0.4]" : "bg-[#2321225d]"
            }`}>
      {/* Main container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h1 className="font-bold mb-3 sm:mb-4 font-montserrat drop-shadow-[2px_2px_3px_rgba(0,0,0,0.6)] bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent text-center text-3xl sm:text-3xl md:text-4xl lg:text-5xl" style={{
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Games
          </h1>
          <p className="bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] bg-clip-text text-transparent text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-6 sm:mb-8 px-4">
            Explore the most popular games and their amazing features
          </p>
          <Link
          to="/signup"
            className={`inline-block px-6 sm:px-8 py-2.5 sm:py-3 rounded-md font-medium text-white transition-all duration-300 hover:opacity-90 text-sm sm:text-base ${
              dark
                ? "bg-[#854951] hover:bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] text-white hover:text-black"
                : "bg-gradient-to-r from-[#D19F43] via-[#d1a759] to-[#eb9a0d] hover:bg-[#854951]"
            }`}
          >
            Get Started
          </Link>
        </div>

        {/* Games Grid - Responsive grid columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 max-w-7xl mx-auto">
          {games.map((game, index) => (
            <div
              key={game.id}
              className="group relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(145deg, #D19F43, #d1a759)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Game Image */}
              <div className="aspect-[4/4] overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              </div>
              
              {/* Game Title */}
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
                <h3 className="text-white font-medium text-xs sm:text-sm lg:text-base group-hover:text-yellow-300 transition-colors duration-300 leading-tight">
                  {game.title}
                </h3>
              </div>

              {/* Hover border effect */}
              <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:text-yellow-400 transition-all duration-300"></div>
              
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" 
                   style={{background: 'linear-gradient(45deg, #D19F43, #d1a759)'}}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamesCardsV2;