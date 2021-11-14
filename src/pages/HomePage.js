import Navbar from "../components/Navbar";
import NotepadEditor from "../components/NotepadEditor";
import NotepadList from "../components/NotepadList";

const HomePage = () => {
  console.log("HomePage");

  return <>
    <div className="d-flex vw-100 vh-100 flex-column">
      <Navbar />
      <div className="d-flex">
        <NotepadList />
        <NotepadEditor />
      </div>
    </div>
  </>
}

export default HomePage;