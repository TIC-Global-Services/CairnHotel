import Hero from "@/components/home/Hero";
import FindYourWay from "@/components/home/findyourway";
import Elegant from "@/components/home/elengent";
import ElevatedStay from "@/components/home/elevatedstay";
import NatureWithSoul from "@/components/home/naturewithsoul";
import Discover from "@/components/home/discover";
import StoryByStone from "@/components/home/storybystone";
import BookNow from "@/components/home/booknow";
import Grounded from "@/components/home/grounded";
import GetInTouch from "@/components/home/getintouch";
import Map from "@/components/home/map";

export default function Home() {
  return (
    <main>
      <Hero />
      <FindYourWay />
      <Elegant />
      <ElevatedStay />
      <StoryByStone />
      <BookNow />
      <Discover />
      <Grounded />
      <GetInTouch/>
      <Map/>
      {/* <NatureWithSoul /> */}
    </main>
  );
}


