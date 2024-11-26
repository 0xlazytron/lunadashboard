import { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const collections: Collection[] = [
  {
    number: "100",
    video: "/assets/webm/100.webm",
    placeholder: "/assets/posters/100.png",
    tailwindClass: "w-full lg:h-[300px]",
  },
  {
    number: "500",
    video: "/assets/webm/500.webm",
    placeholder: "/assets/posters/500.png",
    tailwindClass: "w-full lg:h-[300px] rounded-lg",
  },
  {
    number: "1000",
    video: "/assets/webm/1000.webm",
    placeholder: "/assets/posters/1000.png",
    tailwindClass: "w-full lg:h-[300px] shadow-lg",
  },
  {
    number: "5000",
    video: "/assets/webm/5000.webm",
    placeholder: "/assets/posters/5000.png",
    tailwindClass: "w-full lg:h-[300px]",
  },
  {
    number: "10000",
    video: "/assets/webm/10000.webm",
    placeholder: "/assets/posters/10000.png",
    tailwindClass: "w-full lg:h-[300px] rounded-xl",
  },
  {
    number: "25000",
    video: "/assets/webm/25000.webm",
    placeholder: "/assets/posters/25000.png",
    tailwindClass: "w-full lg:h-[300px] shadow-2xl",
  },
  {
    number: "500000",
    video: "/assets/webm/500000.webm",
    placeholder: "/assets/posters/500000.png",
    tailwindClass: "w-full lg:h-[300px]",
  },
];

const Collections = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, slidesToScroll: 1, dots: true },
      },
    ],
  };

  return (
    <section
      id="collection"
      className="text-white relative py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 z-[-5] bg-[#052035]"></div>
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">
        <header className="text-center">
          <h2 className="text-6xl jack lg:text-6xl mb-4">
            LUNA <span className="text-[#85CD4F]">COLLECTIONS</span>
          </h2>
          <p className="text-gray-400 mb-6">
            Multiple Chains, One Home. Stack up all your NFTs from across
            blockchains.
          </p>
        </header>

        {/* Slick Slider */}
        <Slider {...settings} className="w-full">
          {collections.map((collection, index) => (
            <VideoCard key={index} collection={collection} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

// VideoCard Component for each slide
// eslint-disable-next-line react/prop-types
const VideoCard = ({ collection }: { collection: Collection }) => {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // @ts-ignore
            videoRef!.current!.load();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="p-2">
      <div className="flex flex-col gap-2">
        <div className="flex justify-center items-center">
          {!videoLoaded && (
            <img
              // eslint-disable-next-line react/prop-types
              src={collection.placeholder}
              // eslint-disable-next-line react/prop-types
              alt={`Placeholder for ${collection.number}`}
              // eslint-disable-next-line react/prop-types
              className={collection.tailwindClass}
            />
          )}
          <video
            ref={videoRef}
            // eslint-disable-next-line react/prop-types
            src={collection.video}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            // eslint-disable-next-line react/prop-types
            className={`${collection.tailwindClass} ${
              videoLoaded ? "block" : "hidden"
            }`}
            onCanPlay={() => setVideoLoaded(true)}
          />
        </div>
        <button className="bg-[#85CD4F] mx-auto px-3 py-2 rounded-full max-w-fit font-semibold hover:bg-red-600 duration-300 transition-colors">
          Coming Soon!
        </button>
      </div>
    </div>
  );
};

export default Collections;
