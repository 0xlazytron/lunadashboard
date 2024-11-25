import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "What is LunaLotto, and how does it work?",
    answer:
      "*LunaLotto* is a blockchain-based lottery where each purchased ticket is minted as an NFT and secured in your wallet. Every participant has an equal chance to win fantastic prizes, and all draws are transparent and verifiable on the blockchain.",
  },
  {
    question: "How can I play at LunaCasino?",
    answer:
      "After registering, you can play with cryptocurrencies at *LunaCasino*. Our casino offers classic games like slots, blackjack, roulette, and more. All transactions and games are secured and transparent, thanks to blockchain technology.",
  },
  {
    question: "When do LunaLotto and LunaCasino launch?",
    answer:
      "*LunaLotto* launches on *December 1, 2024*, while *LunaCasino* will go live in *June 2025*. You can look forward to exciting games and exclusive chances to win!",
  },
  {
    question: "What are LunaFounder NFTs, and what are the benefits?",
    answer:
      "The *LunaFounder NFTs* offer exclusive benefits such as monthly revenue distributions from casino profits and automatic participation in special lotteries. The sale starts on *December 1, 2024*, so don’t miss your chance!",
  },
  {
    question: "How do I participate in the lottery?",
    answer:
      "You can easily buy a ticket through the *LunaLotto* system. Each ticket is minted as an NFT and stored in your wallet. Prizes are transparently recorded on the blockchain, and winnings can be withdrawn in cryptocurrency.",
  },
  {
    question: "Which cryptocurrencies are accepted?",
    answer:
      "At launch, we will accept *USDC* and *USDT* on the *Solana blockchain*. More cryptocurrencies may be added later to provide users with more flexibility.",
  },
  {
    question: "Is there an affiliate program?",
    answer:
      "Yes! Both *LunaLotto* and *LunaCasino* offer a generous *Affiliate Program*. You can earn commissions over 10 levels with LunaLotto and over 5 levels with LunaCasino, based on the purchases and losses of the players you refer.",
  },
];

function Faqs() {
  const [openItem, setOpenItem] = useState(0); // No item is open by default

  const handleToggle = (index: number) => {
    setOpenItem(openItem === index ? -1 : index); // Toggle logic
  };

  return (
    <div className="lg:h-screen xl:h-auto relative text-white p-4 overflow-hidden  lg:p-8">
      <div className="absolute top-0 left-0 w-[100%] h-[100%] bgballs"></div>
      <div className="absolute top-0 left-0 w-[100%] h-[100%] z-[-1] bg6"></div>
      <div className="max-w-6xl relative mx-auto">
        <div className="gradient z-[-1] left-[-60%] absolute hidden lg:block bottom-40 w-[900px] rounded-full blur-[220px] h-[900px]"></div>
        <h1 className="text-6xl jack lg:text-6xl text-center mb-12">
          YOUR QUESTIONS <span className="text-[#85CD4F]">ANSWERED!</span>
        </h1>
        <div className="flex flex-col text-[20px] lg:flex-row gap-8">
          <div className="flex-[.7] border bg-white/5 border-[#393c39] p-5 rounded-[30px] shadow-lg">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b-[1px] border-b-[#393c386c]">
                <button
                  className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
                  onClick={() => handleToggle(index)}
                >
                  <span className="text-white">{faq.question}</span>
                  {openItem === index ? (
                    <FaChevronUp className="w-3 h-3 text-[#e7e9e5] transform hover:scale-150 transition-transform duration-300" />
                  ) : (
                    <FaChevronDown className="w-3 h-3 text-[#e7e9e5] transform hover:scale-150 transition-transform duration-300" />
                  )}
                </button>
                {openItem === index && (
                  <div className="pb-4 text-[18px] text-gray-400">
                    <p>{faq.answer}</p>
                    {/* <p className="py-6">{faq.p2}</p> */}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex-1 flex justify-center items-center">
            <img
              src={"/assets/wallet.svg"}
              alt="Rocket on coins"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faqs;
