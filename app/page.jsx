import AlphabetTiles from "./components/AlphabetTiles";
import Partition from "./components/Partition";

export default function Home() {
  return (
    <main>
      <div className="text-center ">
        <AlphabetTiles />
      </div>
      <div>
        <Partition />
      </div>
    </main>
  );
}
