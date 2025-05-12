
import { useEffect, useState } from 'react';
import { Login } from './components/Login';
import { Profile } from './components/Profile';

function Popup() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "authenticated") {
        setIsAuthenticated(message.data);
      }
    });
  }, []);

  return (
    <>
    {
      isAuthenticated ? (<Profile />) : (<Login />)
    }
    </>
  );
}

export default Popup;
