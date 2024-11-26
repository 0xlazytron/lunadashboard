export function About() {
  return (
    <div className="px-10 py-10 relative pt-40">
      <div className="absolute top-0 left-0 w-full h-full bgballs"></div>
      <div className="absolute top-0 left-0 w-full h-full z-[-1] bg4"></div>

      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="text-6xl md:text-6xl jack">About Us</div>

        <div className="">
          <h1 className="jack text-4xl text-[#85CD4F] uppercase">
            Our Commitment
          </h1>
          <p className="text-[18px] leading-1 text-white">
            At LunaCasino, we are committed to offering an exceptional gaming
            experience. Our platform is designed to provide a secure,
            transparent, and user-friendly environment for all our players.
          </p>
        </div>

        <div className="">
          <h1 className="jack text-4xl text-[#85CD4F] uppercase">
            Licensing and Regulation
          </h1>
          <p className="text-[18px] leading-1 text-white">
            LunaCasino is fully licensed and operates under the regulatory
            oversight of the government of Curaçao, ensuring compliance with
            international gaming standards.
          </p>
        </div>

        <div className="">
          <h1 className="jack text-4xl text-[#85CD4F] uppercase">
            Business Address
          </h1>
          <p className="text-[18px] leading-1 text-white">
            Our registered business address is:
            <strong className="strong">
              {" "}
              Emancipatie Boulevard Dominico F. "Don" Martina 29, Willemstad,
              Curaçao.
            </strong>
          </p>
        </div>

        <div className="">
          <h1 className="jack text-4xl text-[#85CD4F] uppercase">
            Customer Service
          </h1>
          <p className="text-[18px] leading-1 text-white">
            We strive to maintain the highest standards of customer service,
            fairness, and responsible gaming. Join us and experience a world of
            exciting games, enticing bonuses, and opportunities to win big.
          </p>
        </div>

        <div className="">
          <h1 className="jack text-4xl text-[#85CD4F] uppercase">
            Our Mission
          </h1>
          <p className="text-[18px] leading-1 text-white">
            At LunaCasino, your satisfaction and entertainment are our top
            priorities.
          </p>
        </div>
      </div>
    </div>
  );
}
