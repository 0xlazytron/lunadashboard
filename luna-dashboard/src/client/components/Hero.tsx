import { useEffect, useRef } from "react";
import { VideoComponent } from "./VideoComponent";

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Lazy load the video when it enters the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            // @ts-ignore
            videoRef.current.load(); // Start loading the video when in view
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the video is in view
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="text-white relative pt-10 min-h-screen flex items-center">
      <div className="absolute top-0 left-0 w-[100%] h-[100%] bgballs"></div>
      <div className="absolute top-0 left-0 w-[100%] h-[100%] bg-[#052035] z-[-1]"></div>
      <div className="container max-w-7xl mx-auto py-12 mt-10 lg:py-24">
        <div className="flex flex-col-reverse lg:flex-row items-center flex-[.3] justify-between gap-12">
          <div className="w-full lg:w-1/4 order-1 flex items-center justify-center lg:order-2 flex-[.4]">
            <VideoComponent
              poster={"/assets/posters/100.png"}
              card2={"/assets/webm/100.webm"}
            />
          </div>

          <div className="w-[80%] lg:py-10 flex flex-col gap-8 order-2 lg:order-1 flex-[.5]">
            <div className="mx-auto flex flex-col gap-8">
              <h1 className="text-6xl jack uppercase lg:text-7xl mb-4">
                LunaCasino and <br />
                <span className="text-[#85CD4F]">LunaLotto</span>
              </h1>
              <div className="flex flex-col gap-">
                <p className="text-[18px] text-[#B7B4BB] mb-3">
                  Connect the world of online gambling with blockchain
                  technology.
                </p>
                <p className="text-[18px] text-[#B7B4BB] mb-3">
                  Players can share in the success of the platform by owning
                  LunaFounder NFTs
                </p>
              </div>
              <p className="text-4xl jack uppercase lg:text-5xl">
                0 / 13.885 <span className="text-[#85CD4F]">Minted</span>
              </p>

              <div className="flex gap-4 mb-8">
                <button className="bg-[#85CD4F] transform hover:scale-110 transition-all duration-300 text-white lg:px-6 px-2 py-2 lg:py-3 rounded-full font-semibold hover:bg-red-600 ">
                  Coming Soon!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
