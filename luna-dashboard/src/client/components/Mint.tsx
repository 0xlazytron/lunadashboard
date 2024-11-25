const Mint = () => {
  return (
    <div className="text-white relative p-4 md:p-8">
      <div className="absolute top-0 left-0 w-[100%] h-[100%] bgballs"></div>
      <div className="absolute top-0 left-0 w-[100%] bg2 z-[-1]  h-[100%] "></div>
      <div className="gradient z-[-1] right-[-30%] hidden md:block absolute top-40 w-[500px] rounded-full blur-[220px] h-[500px]"></div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Left side: Wallet Image and Mint Now Section */}
        <div className="flex flex-col p-5 flex-[.4] items-center lg:items-start gap-4">
          <div className="w-[200px] flex justify-center">
            <img
              src={"/assets/wallet.svg"} // Using img tag for local SVG
              alt="Wallet Illustration"
              className="mx-auto "
            />
          </div>
          <div className="w-full flex flex-col justify-center items-center lg:items-start">
            <p className="text-6xl jack w-full text-white lg:text-7xl mb-4 text-center lg:text-left">
              LET&rsquo;S START <br />
              <span className="text-[#85CD4F]">MINTING!</span>
              <img src={"/assets/wallet.svg"} alt="" className="" />
            </p>
            <p className="mb-6 text-center lg:text-left">
              Use Phantom, Solflare or any
              <br />
              wallet to connect to the Lunalotto website.
            </p>
            <button className="bg-[#85CD4F] transform lg:w-1/2 hover:scale-105 transition-all duration-300 text-white px-10 py-4 rounded-full font-semibold hover:bg-red-600">
              Coming Soon!
            </button>
          </div>
        </div>

        {/* Right side: Cards Section */}
        <div className="grid-cols-1 hidden md:grid flex-[.6] sm:grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Card 1: Connect Wallet */}
          <div className="flex flex-col gap-4">
            <div className="bg-white/5 p-6 transform hover:scale-105 transition-all duration-300 rounded-[20px]">
              <div className="text-[#85CD4F] text-3xl mb-4">
                <img src={"/assets/mn1.svg"} alt="Connect Wallet" />
              </div>
              <h3 className="text-xl py-4 font-semibold uppercase mb-2">
                Download and install phantom wallet
              </h3>
              <p className="text-gray-400">
                Before minting nfts you need to install phantom wallet and load
                some usdc or usdt.{" "}
                <a
                  href="https://phantom.app/"
                  className="text-blue-500 hover:underline"
                >
                  phantom wallet
                </a>
              </p>
            </div>

            {/* Card 2: Create Artwork */}
            <div className="bg-white/5 p-6 transform hover:scale-110 transition-all duration-300 rounded-[20px]">
              <div className="text-[#85CD4F] text-3xl mb-4">
                <img src={"/assets/mn3.svg"} alt="Create Artwork" />
              </div>
              <h3 className="text-xl py-4 font-semibold mb-2">Mint NFT</h3>
              <p className="text-gray-400">
                Click on Mint button to mint your selected NFT.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:mt-20 gap-4">
            <div className="bg-white/5 transform hover:scale-105 transition-all duration-300 p-6 rounded-[20px]">
              <div className="text-[#85CD4F] text-3xl mb-4">
                <img src={"/assets/mn2.svg"} alt="Buy Your NFT" />
              </div>
              <h3 className="text-xl py-4 font-semibold mb-2">
                CHOOSE YOUR NFT
              </h3>
              <p className="text-gray-400 lowercase">
                CHOOSE YOUR LUNA FOUNDER NFT THERE are various NFTs.you can
                choose from luna founder 100 to 1000.
              </p>
            </div>

            {/* Card 4: List Them for Sale */}
            <div className="bg-white/5 transform hover:scale-105 transition-all duration-300 p-6 rounded-[20px]">
              <div className="text-[#85CD4F] text-3xl mb-4">
                <img src={"/assets/mn4.svg"} alt="List Them for Sale" />
              </div>
              <h3 className="text-xl py-4 font-semibold mb-2">Confirm TRX</h3>
              <p className="text-gray-400">
                Confirm The Transaction from Your Phantom wallet to complete the
                mint process
              </p>
            </div>
          </div>
        </div>

        {/* Mobile version of the Cards */}
        <div className="grid grid-cols-1 lg:hidden flex-[.6] sm:grid-cols-1 lg:grid-cols-2 gap-4 mt-12">
          {/* Card 1: Connect Wallet */}
          <div className="bg-white/5 p-6 rounded-lg">
            <div className="text-[#85CD4F] text-3xl mb-4">
              <img src={"/assets/mn4.svg"} alt="Connect Wallet" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Download and install phantom wallet
            </h3>
            <p className="text-gray-400">
              Before minting nfts you need to install phantom wallet and load
              some usdc or usdt.{" "}
              <a
                href="https://phantom.app/"
                className="text-blue-500 hover:underline"
              >
                phantom wallet
              </a>
            </p>
          </div>

          {/* Card 2: Buy Your NFT */}
          <div className="bg-white/5 p-6 rounded-lg">
            <div className="text-[#85CD4F] text-3xl mb-4">
              <img src={"/assets/mn1.svg"} alt="Buy Your NFT" />
            </div>
            <h3 className="text-xl font-semibold mb-2">MINT NFT</h3>
            <p className="text-gray-400">
              Click on Mint button to mint your selected NFT.
            </p>
          </div>

          {/* Card 3: Create Artwork */}
          <div className="bg-white/5 p-6 rounded-lg">
            <div className="text-[#85CD4F] text-3xl mb-4">
              <img src={"/assets/mn2.svg"} alt="Create Artwork" />
            </div>
            <h3 className="text-xl font-semibold mb-2">CHOOSE YOUR NFT</h3>
            <p className="text-gray-400">
              CHOOSE YOUR LUNA FOUNDER NFT, THERE are various NFTs.you can
              choose from luna founder 100 to 1000.
            </p>
          </div>

          {/* Card 4: List Them for Sale */}
          <div className="bg-white/5 p-6 rounded-lg">
            <div className="text-[#85CD4F] text-3xl mb-4">
              <img src={"/assets/mn3.svg"} alt="List Them for Sale" />
            </div>
            <h3 className="text-xl font-semibold mb-2">CONFIRM TRX</h3>
            <p className="text-gray-400">
              Confirm The Transaction from Your Phantom wallet to complete the
              mint process
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mint;
