import { useState } from "react";
import { registerUser } from "../api/auth.api";

interface Props {
  onRegister: (profile: { id: string; username: string; email: string }) => void;
  switchToLogin: () => void;
}

const RegisterPage = ({ onRegister, switchToLogin }: Props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }

    try {
      setError("");
      setLoading(true);
      const result = await registerUser({ username, email, password });
      onRegister(result.data);
    } catch (registerError) {
      setError(
        registerError instanceof Error
          ? registerError.message
          : "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
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
        <p className="mt-2 text-slate-500">Register to join the chat room.</p>

        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-2xl border p-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border p-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border p-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <button
            onClick={switchToLogin}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-700 transition hover:bg-slate-50"
          >
            Already have an account
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
