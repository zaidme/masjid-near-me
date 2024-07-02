import Map from "@/components/maps/map";
import SearchBuilder from "@/components/search/search-builder";
import TopBar from "@/components/top-bar";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <TopBar/>
    <Map/>
    <SearchBuilder/>
    </>
  );
}
