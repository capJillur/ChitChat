// App.tsx

import { useEffect, useState } from "react";
import ChatPage from "./page/ChatPage.tsx";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";

interface UserProfile {
  id: string;
  username: string;
  email: string;
}

function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("chitchat-user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("chitchat-user");
      }
    }
  }, []);

  const handleLogin = (profile: UserProfile) => {
    localStorage.setItem("chitchat-user", JSON.stringify(profile));
    localStorage.setItem("chitchat-username", profile.username);
    setUser(profile);
  };

  const handleLogout = () => {
    localStorage.removeItem("chitchat-user");
    localStorage.removeItem("chitchat-username");
    setUser(null);
    setShowRegister(false);
  };

  if (!user) {
    return showRegister ? (
      <RegisterPage
        onRegister={handleLogin}
        switchToLogin={() => setShowRegister(false)}
      />
    ) : (
      <LoginPage
        onLogin={handleLogin}
        switchToRegister={() => setShowRegister(true)}
      />
    );
  }

  return <ChatPage currentUser={user.username} onLogout={handleLogout} />;
}

export default App;