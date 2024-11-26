function Tickets() {
  return (
    <div className="p-4   relative">
      <div className="absolute top-0 left-0 w-[100%] h-[100%] z-[-5] bg3"></div>
      <div className="borders/ticket mx-auto ">
        <div className="w-[95%] flex flex-col gap-4 justify-center items-center md:m-4 m-0 text-center">
          <h1 className="text-6xl jack md:text-6xl  text-wrap">
            BUY <span className="text-[#85CD4F]">LUNALOTTO</span> TICKETS
          </h1>
          <p className="text-wrap  text-[#acabb0] ">
            Every ticket has an equal chance of winning and is secured as an NFT
            in the buyer's wallet.
          </p>
        </div>
        <div className="flex md:flex-row w-[70%] items-center mx-auto   flex-col gap-6">
          <div className=" flex-[.5] flex items-center justify-center">
            {/* <video src={card} alt="card" muted loop autoPlay /> */}
            <img src={"/assets/ticket.gif"} alt="" />
          </div>
          <div className="md:text-start text-white flex-[.5] text-center space-y-8">
            <h1 className="text-wrap text-6xl md:text-6xl jack uppercase">
              Blockchain-based <span className="text-[#85CD4F]">lottery</span>
            </h1>

            <p>
              Luna Lotto uses blockchain technology to ensure absolute fairness
              and transparency.
            </p>
            <p>
              Every ticket purchased is stored as an NFT in the player's wallet,
              making participation immutable and secure.
            </p>
            <h1>
              Ticket Price:
              <span className="px-5 text-[#85CD4F] text-3xl">$5</span>
            </h1>
            <button className="w-40 border  hover:bg-red-600 transition-all hover:scale-110 duration-200 hover:text-white border-white py-3 px-2 rounded-full text-[#85CD4F]">
              Coming Soon &#8594;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tickets;
