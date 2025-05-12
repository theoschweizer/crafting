import { useEffect } from "react";
import { RuntimeMessage } from "../../types";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { PopupStyles } from "../styles";

export function Profile() {
  const [showSidebar, setShowSidebar] = useLocalStorage<boolean>('show_sidebar', true);

  useEffect(() => {
    chrome.runtime.sendMessage({
      type: "show_sidebar",
      data: showSidebar,
    } as RuntimeMessage);
  }, [showSidebar]);

  return (
    <div id='crafting-sidebar' style={PopupStyles.container}>
      <img src="./../Logo_48.png" alt="Logo" style={PopupStyles.logo} />
      <h4 style={PopupStyles.title}>Crafting</h4>
      <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <p>Show Crafting sidebar</p>
        <input type="checkbox" id="toggle" checked={showSidebar} onChange={(e) => setShowSidebar(e.target.checked)} />
      </div>
    </div>
  );
}