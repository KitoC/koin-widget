import "./App.scss";
import api from "./_config/api";
import "rsuite/dist/styles/rsuite-dark.css";
// @import '~rsuite/lib/styles/themes/dark/index.less';

import Screens from "./screens";

function App() {
  return (
    <div className="App flex-column">
      <Screens />
    </div>
  );
}

export default App;
