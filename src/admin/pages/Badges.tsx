const badges = [
  {
    name: "Lucky Star",
    description: "Achieved $50,000 in team sales",
    image: "/badges/lucky-star.png",
  },
  {
    name: "High Roller",
    description: "Reached $100,000 in team sales",
    image: "/badges/high-roller.png",
  },
  {
    name: "Jackpot Master",
    description: "Surpassed $250,000 in team sales",
    image: "/badges/jackpot-master.png",
  },
  {
    name: "Royal Ace",
    description: "Attained $500,000 in team sales",
    image: "/badges/royal-ace.png",
  },
  {
    name: "Casino Tycoon",
    description: "Exceeded $1,000,000 in team sales",
    image: "/badges/casino-tycoon.png",
  },
];

const BadgeCard = ({
  badge,
}: {
  badge: { name: string; image: string; description: string };
}) => {
  return (
    <div className="bg-white/10 rounded-xl p-6 backdrop-blur-lg flex flex-col items-center">
      <img src={badge.image} alt={badge.name} className="w-fit h-32 mb-4" />
      <h3 className="krona text-xl font-bold text-white mb-2 font-['Press_Start_2P'] nft-text">
        {badge.name}
      </h3>
      <p className="poppins-regular text-gray-300 text-center" id="lexend">
        {badge.description}
      </p>
    </div>
  );
};

const Badges = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className=" krona text-3xl font-bold text-white mb-6 font-['Press_Start_2P'] nft-text">
        Achievement Badges
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {badges.map((badge, index) => (
          <BadgeCard key={index} badge={badge} />
        ))}
      </div>
    </div>
  );
};

export default Badges;
