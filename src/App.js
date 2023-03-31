import  {React}  from "react";
import "./App.css";
import Banner from "./Components/Banner/Banner";
import { originals,actions, horror,romance } from "./Urls";
import Navbar from "./Components/Navbar/navbar";
import RowPost from "./Components/RowPost/RowPost";
function App() {
  return (
    <div className="App">
    <Navbar />
    <Banner />
    <RowPost url={originals} title='Netflix Originals' />
    <RowPost url={actions} title='Action' isSmall />
    <RowPost url={horror} title='Horror' isSmall />
    <RowPost url={romance} title='Romance' isSmall />
    </div>
  );
}

export default App;
