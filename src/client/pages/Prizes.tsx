import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Array of prizes with Tailwind CSS class mappings for the image
const prizes = [
  {
    img: "/assets/p1.svg",
    title: "WIN A BITCOIN",
    description: "Participate and win a Bitcoin.",
    tailwindClass: "w-32 h-32", // Example Tailwind class for the image
  },
  {
    img: "/assets/p2.svg",
    title: "WIN A XBOX",
    description: "Participate and win a XBOX.",
    tailwindClass: "w-36 h-36",
  },
  {
    img: "/assets/p3.svg",
    title: "WIN A CAR",
    description: "Participate and win a CAR.",
    tailwindClass: "w-40 h-40",
  },
  {
    img: "/assets/p4.svg",
    title: "WIN A HOUSE",
    description: "Participate and win a HOUSE.",
    tailwindClass: "w-32 h-32",
  },
  {
    img: "/assets/p5.svg",
    title: "WIN A TRIP TO SPACE",
    description: "Participate and win a Trip to Space.",
    tailwindClass: "w-36 h-36",
  },
  {
    img: "/assets/ps5.png",
    title: "WIN A PlayStation 5",
    description: "Participate and win a PlayStation 5.",
    tailwindClass: "w-[100px] h-[100px]",
  },
  {
    img: "/assets/goldd.png",
    title: "WIN 100 grams GOLD",
    description: "Participate and win 100 grams gold.",
    tailwindClass: "w-[100px] h-[100px]",
  },
  {
    img: "/assets/svich.png",
    title: "WIN 100 A SWITCH",
    description: "Participate and win a switch.",
    tailwindClass: "w-[120px] h-[120px]",
  },
];

export function Prizes() {
  // Slick slider settings
  const settings = {
    dots: false, // Show dots navigation
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Number of slides to show at once
    slidesToScroll: 1,
    arrows: true, // Enable left and right arrows
    responsive: [
      {
        breakpoint: 1024, // On screens <= 1024px
        settings: {
          slidesToShow: 4,
          arrows: true,
        },
      },
      {
        breakpoint: 768, // On screens <= 768px
        settings: {
          slidesToShow: 2,
          arrows: false, // Hide arrows on mobile for better UX
          dots: true,
        },
      },
      {
        breakpoint: 640, // On screens <= 640px
        settings: {
          slidesToShow: 1,
          arrows: false, // Hide arrows on mobile
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="text-white relative py-16 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-0 w-full h-full z-[-1] bgballs"></div>
      <div className="absolute top-0 left-0 w-full h-full z-[-1] bg4"></div>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl text-white jack md:text-6xl text-center mb-2">
          LUNA <span className="text-[#85CD4F]">PRIZES</span>
        </h2>
        <p className="text-gray-400 text-center px-5 md:px-0 mb-8">
          Multiple Chains, One Home. Stack up all your NFTs from across
          blockchains.
        </p>

        {/* Slick Slider for the prizes */}
        <Slider {...settings} className="prize-slider relative">
          {prizes.map((prize, index) => (
            <div key={index} className="p-4">
              <div className="bg-white/5 rounded-lg p-4 flex flex-col gap-2 items-center text-center h-full min-h-[300px]  max-h-[400px]">
                <img
                  src={prize.img}
                  alt={`${prize.title} image`}
                  className={`${prize.tailwindClass} flex-[.4]  `} // Apply Tailwind classes from array
                />
                <h3 className="text-lg font-semibold  ">{prize.title}</h3>
                <p className="text-sm text-gray-400 max-h-fit  flex-[.3] mb-  flex-grow">
                  {prize.description}
                </p>
                <button className="bg-[#85CD4F] flex-[.2] text-white px-4 mt-2 h-[30px] rounded-full text-sm font-semibold hover:bg-red-600 transition duration-300">
                  Coming Soon!
                </button>
              </div>
            </div>
          ))}
        </Slider>

        {/* Winners Leaderboard Section */}
        <div className="flex flex-col gap-10 py-6">
          <div className="flex flex-col gap-2 items-center">
            <h2 className="text-6xl jack md:text-6xl text-center">
              Winners <span className="text-[#85CD4F]">LEADERBOARD</span>
            </h2>
            <p className="text-gray-400 text-center">
              List of our recent prize winners. Buy tickets now, you have a
              great chance to win.
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-max rounded-lg overflow-hidden">
              {/* Table Headers */}
              <div className="flex bg-[#1E2E1E] border-b border-b-[#ffffff] text-white font-bold">
                <div className="w-1/6 p-3">Winners</div>
                <div className="w-1/6 p-3">Wallet Address</div>
                <div className="w-1/6 p-3">Transaction</div>
                <div className="w-1/6 p-3">Date</div>
                <div className="w-1/6 p-3">Time</div>
                <div className="w-1/6 p-3">Prize</div>
              </div>

              {/* No winners yet message */}
              <div className="flex justify-center items-center p-4 bg-white/5 text-gray-400">
                No winners yet
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
