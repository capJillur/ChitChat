import { useState } from "react";
import { loginUser } from "../api/auth.api";

interface Props {
  onLogin: (profile: { id: string; username: string; email: string }) => void;
  switchToRegister: () => void;
}

const LoginPage = ({ onLogin, switchToRegister }: Props) => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!emailOrUsername.trim() || !password.trim()) {
      setError("Enter email/username and password.");
      return;
    }

    try {
      setError("");
      setLoading(true);
      const result = await loginUser({ emailOrUsername, password });
      onLogin(result.data);
    } catch (loginError) {
      setError(
        loginError instanceof Error ? loginError.message : "Sorry, your password was incorrect. Please double-check your password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4">
      
      {/* Main Login Card */}
      <div className="w-full max-w-[350px] bg-white border border-[#DBDBDB] py-10 px-10 mb-3 flex flex-col items-center">
        
        
<h1 
  className="text-4xl mb-8" 
  style={{ 
    fontFamily: "Georgia, serif", 
    fontStyle: "italic", 
    fontWeight: "bold",
    color: "#262626" 
  }}
>
  ChitChat
</h1>

        <div className="w-full space-y-2">
          <input
            type="text"
            placeholder="Phone number, username, or email"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            className="w-full bg-[#FAFAFA] border border-[#DBDBDB] rounded-[3px] px-2 py-2 text-xs outline-none focus:border-[#A8A8A8]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#FAFAFA] border border-[#DBDBDB] rounded-[3px] px-2 py-2 text-xs outline-none focus:border-[#A8A8A8]"
          />

          {error ? <p className="text-xs text-red-500 text-center mt-4">{error}</p> : null}

          <button
            onClick={handleLogin}
            disabled={loading || !emailOrUsername || !password}
            className="w-full bg-[#0095F6] text-white font-semibold rounded-[8px] py-1.5 mt-4 text-sm transition hover:bg-[#1877F2] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </div>

        {/* OR Divider */}
        <div className="flex w-full items-center my-5">
          <div className="flex-1 h-px bg-[#DBDBDB]"></div>
          
          <div className="flex-1 h-px bg-[#DBDBDB]"></div>
        </div>

        
      </div>

      {/* Switch to Register Card */}
      <div className="w-full max-w-[350px] bg-white border border-[#DBDBDB] py-5 flex justify-center items-center">
        <p className="text-[14px] text-black">
          Don't have an account?{" "}
          <button 
            onClick={switchToRegister} 
            className="text-[#0095F6] font-semibold hover:text-[#00376B]"
          >
            Sign up
          </button>
        </p>
      </div>

    </div>
  );
};

export default LoginPage;