import { useEffect } from "react";
import { RuntimeMessage } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import '../main.css'

function Popup() {
  const [showSidebar, setShowSidebar] = useLocalStorage<boolean>('show_sidebar', true);

  useEffect(() => {
    chrome.runtime.sendMessage({
      type: "show_sidebar",
      data: showSidebar,
    } as RuntimeMessage);
  }, [showSidebar]);

  return (
    <div id='crafting-sidebar' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: "180px", height: "150px" }}>
      <img src="./Logo_48.png" alt="Logo" style={{width: '48px', height: '48px'}} />
      <h4 style={{marginBottom: '24px', marginTop: '8px'}}>Crafting</h4>
      <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <p>Show Crafting sidebar</p>
        <input type="checkbox" id="toggle" checked={showSidebar} onChange={(e) => setShowSidebar(e.target.checked)} />
      </div>
    </div>
  );
}

export default Popup;
