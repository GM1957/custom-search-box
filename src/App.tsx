import { SearchBox } from "@/components";
import searchList from "./list.json";

function App() {
  return (
    <div className="flex justify-center mt-60">
      <SearchBox list={searchList} />
    </div>
  );
}

export default App;
