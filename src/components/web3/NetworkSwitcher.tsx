// import { useState } from "react";
// import { useNetworkConfiguration } from "../../providers/NetworkConfigurationProvider";

export const NetworkSwitcher = () => {
  // const { networkConfiguration, setNetworkConfiguration } =
  //   useNetworkConfiguration();
  // const [isOpen, setIsOpen] = useState(false);

  // const options = [
  //   { value: "mainnet-beta", label: "Main" },
  //   { value: "devnet", label: "Dev" },
  //   { value: "testnet", label: "Test" },
  // ];

  // const handleOptionSelect = (value: string) => {
  //   setNetworkConfiguration!(value);
  //   setIsOpen(false);
  // };

  return (
    <></>
    // <div className="relative bg-transparent z-20 rounded-[10px] px-1 text-white">
    //   <div
    //     className="flex items-center py-[0.8rem] rounded-[10px] px-4 text-[14px] h-[50px] cursor-pointer"
    //     onClick={() => setIsOpen(!isOpen)}
    //   >
    //     {options.find((opt) => opt.value === networkConfiguration)?.label ||
    //       "Main"}
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       className={`h-4 w-4 ml-2 ${isOpen ? "transform rotate-180" : ""}`}
    //       viewBox="0 0 20 20"
    //       fill="currentColor"
    //     >
    //       <path
    //         fillRule="evenodd"
    //         d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 111.414-1.414L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3A1 1 0 0110 12z"
    //         clipRule="evenodd"
    //       />
    //     </svg>
    //   </div>

    //   {isOpen && (
    //     <div className="rounded-md bg-white text-black z-20 absolute top-[56px] right-0 w-full shadow-md rounded-b-lg">
    //       {options.map((option) => (
    //         <div
    //           key={option.value}
    //           className="px-4 py-2 cursor-pointer hover:bg-black"
    //           onClick={() => handleOptionSelect(option.value)}
    //         >
    //           {option.label}
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>
  );
};
