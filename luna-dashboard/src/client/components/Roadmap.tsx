import { useState } from "react";
import { db } from "../../lib/firebase";
import { addDoc, collection } from "firebase/firestore";

const phases = [
  {
    time: "August 2024",
    t1: "Idea and ",
    t2: "preparations",
    description:
      "Concept development and planning phase for LunaLotto and LunaCasino. Creation of the technical foundations and first partnerships.",
  },
  {
    time: "December 2024",
    t1: "Start of NFT sale & ",
    t2: "LunaLotto Beta",
    description:
      "Start of NFT sale & LunaLotto Beta. LunaFounder NFTs are offered for sale. LunaLotto starts the beta phase with first raffles.",
  },
  {
    time: "March 2025",
    t1: "Completion of ",
    t2: "NFT sale",
    description:
      "The sale of LunaFounder NFTs ends. All NFTs are sold, and the funds are used to further develop the platform.",
  },
  {
    time: "JUNE 2025",
    t1: "LunaCasino launch & major ",
    t2: "advertising measures",
    description:
      "LunaCasino will officially go online, 1 month after the end of the NFT sale. Major advertising campaigns start in parallel to attract new players.",
  },
];

const logos = ["/assets/sol.svg", "/assets/trust.svg", "/assets/phantom.svg"];

export default function Roadmap() {
  const [email, setEmail] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please enter a correct email.");
      return;
    }

    try {
      await addDoc(collection(db, "subscribers"), { email });
      setPopupMessage("Thank you for subscribing!");
      setShowPopup(true);
      setEmail(""); // Clear email input
      setErrorMessage(""); // Clear any error message
    } catch (error) {
      setErrorMessage("Error subscribing. Please try again.");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div
      id="roadmap"
      className="relative min-h-screen flex flex-col items-center justify-center text-white p-4 lg:p-8"
    >
      <div className="absolute top-0 left-0 w-[100%] h-[100%] z-[-5] bgballs"></div>
      <div className="absolute top-0 left-0 w-[100%] h-[100%] z-[-5] bg4"></div>
      <div className="gradient z-[-1] right-1/3 absolute top-[20%] w-[700px] rounded-full blur-[420px] h-[700px]"></div>
      <h1 className="text-6xl jack lg:text-6xl text-center mb-12">
        LUNALOTTO&apos;S <span className="text-[#85CD4F]">ROADMAP</span>
      </h1>
      <div className="grid grid-cols-1 lg:w-[70%] md:grid-cols-2 lg:grid-cols-2 gap-10">
        {phases.map((phase, index) => (
          <div
            key={index}
            className="bg-white/5 p-8 transform hover:scale-110 space-y-8 transition-transform duration-300 rounded-[20px] shadow-md border border-gray-700"
          >
            <div className="flex justify-between items-center mb-">
              <h2 className="text-[#85CD4F] text-[18px] font-bold">
                {phase.time}
              </h2>
            </div>
            <div className="flex flex-col gap-1 space-y-0">
              <p className="md:text-3xl text-2xl jack">{phase.t1}</p>
              <p className="md:text-3xl text-2xl jack">{phase.t2}</p>
            </div>
            <p className="text-gray-400 text-[18px] mb-4">
              {phase.description}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center lg:mt-20 gap-5">
        <p className="text-center text-gray-500">POWERED BY AMAZING PARTNERS</p>
        <div className="flex flex-wrap justify-center items-center mt-10">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`logo-${index}`}
              className="h-16 lg:h-[100px] transform hover:scale-110 delay-100 transition-transform duration-300 mx-2"
            />
          ))}
        </div>
      </div>

      <div className="bg-white/5 my-10 lg:mt-20 rounded-[40px] md:w-[70%] mx-auto p-4 lg:pl-20 flex flex-col gap-4 sm:flex-row items-center justify-between">
        <div className="flex flex-col gap-5">
          <div>
            <h3 className="text-6xl jack md:text-6xl mb-2">
              NEVER <span className="text-[#85CD4F]">MISS A DROP!</span>
            </h3>
            <p className="text-gray-400 text-start mb-4 sm:mb-0">
              Subscribe to our super-rare and exclusive drops & collectibles.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-5 items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-white/10 text-white px-4 py-2 rounded-full w-[300px] focus:outline-none focus:ring-2 focus:ring-[#85CD4F]"
            />
            <button
              onClick={handleSubscribe}
              className="bg-[#85CD4F] px-6 py-2 hover:bg-red-600 text-white rounded-full font-semibold transition duration-300"
            >
              Subscribe
            </button>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
        </div>
        <img src={"/assets/bag.svg"} alt="Money bag" />
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-[40px] text-center w-[80%] max-w-md shadow-lg border border-gray-300">
            <img
              src={"/assets/logo.svg"}
              alt="Logo"
              className="h-20 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-white mb-4">
              {popupMessage}
            </h2>
            <button
              onClick={closePopup}
              className="bg-[#85CD4F] px-4 py-2 rounded-full text-white font-semibold hover:bg-red-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
