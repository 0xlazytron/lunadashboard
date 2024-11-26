import Hero from "../components/Hero";
import Mint from "../components/Mint";

import Roadmap from "../components/Roadmap";
import Collection from "./Collection";
import Faqs from "../components/Faqs";
import { Prizes } from "./Prizes";
import Tickets from "../components/Tickets";
export function Home() {
  return (
    <div className=" bg11 overflow-x-hidden ">
      <Hero />
      <Mint />
      <Tickets />
      <Prizes />
      <Collection />
      <Roadmap />
      <Faqs />
    </div>
  );
}
