import { useEffect, useState } from "react";
import { loginService } from "../../services/login.service";
import { useNavigate } from "react-router-dom";
import Authentication from "./authentication";
import { ReactComponent as Spinner } from "../../assets/spinner.svg";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [error, setError] = useState<string>("");

  const handleLogin = async () => {
    if (username && password) {
      setLoading(true);
      try {
        setError("");
        const data = await loginService(username, password);
        localStorage.setItem("accessToken", data.access_token);
        navigate("/");
      } catch (error) {
        setError("Bad Credentials");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please enter both username and password");
    }
  };

  useEffect(() => {
    if (username || password) {
      setError("");
    }
  }, [username, password]);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, []);

  return (
    <Authentication>
      <div className="flex flex-col gap-3 flex-1 items-center justify-center">
        <div className="text-2xl font-semibold">Welcome Back!!</div>
        {error && (
          <div className="text-sm text-center text-red-500">{error}</div>
        )}
        <div className="w-[70%]">
          <div className="relative mb-6" data-twe-input-wrapper-init>
            <div className="text-xs mb-1 font-semibold text-slate-500">
              User name<sup>*</sup>
            </div>
            <input
              type="text"
              className="peer border-2 rounded-lg block min-h-[auto] w-full bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none focus:border-[#008EE4]"
              id="exampleFormControlInput2"
              placeholder="Enter Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="relative mb-6 " data-twe-input-wrapper-init>
            <div className="text-xs mb-1 font-semibold text-slate-500">
              Password<sup>*</sup>
            </div>
            <input
              type="password"
              className=" rounded-lg border-2 peer block min-h-[auto] w-full  bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none focus:border-[#008EE4]"
              id="exampleFormControlInput22"
              placeholder="Enter Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button
            onClick={handleLogin}
            style={{ opacity: loading ? 0.5 : 1 }}
            disabled={loading}
            className="relative items-center mb-6 rounded-lg flex w-full text-center bg-[#008EE4] text-white px-3 py-2 justify-center"
          >
            {loading && <Spinner width={20} height={20} />}
            {loading ? "Checking credentials..." : "Login"}
          </button>
          <div className="text-md">
            Don't have an account?
            <a
              className="no-underline text-[#008EE4] font-semibold cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
    </Authentication>
  );
};
export default Login;
