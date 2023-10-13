import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useDecode from "../../hooks/useDecode";
import authApi from "../../store/api/authApi";

export default function Signin({ handleSwitch }) {
  const { setToken } = useDecode();
  const [active, setActive] = useState(false);
  const [type, setType] = useState("password");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const credentialHandler = (name, data) => {
    if (name === "email") {
      setEmail(data);
    } else if (name === "password") {
      setPass(data);
    }
  };
  // handle  singin
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      email,
      password: pass,
    };
    const res = await authApi.signinUser(data);
    if (res.status === 201) {
      toast.success(`${res.data.message}`);
      Cookies.set("token", res.data.token, { expires: 30 });
      setToken(res.data.token);
      setLoading(false);
    } else if (res.data.statusCode === 400) {
      toast.error(`${res.data.message}`);
      setLoading(false);
    } else {
      toast.success(`something went wrong`);
      setLoading(false);
    }
  };
  const activeHandler = () => {
    if (active) {
      setType("text");
    } else {
      setType("password");
    }
    setActive(!active);
  };

  return (
    <div className="card w-96 text-primary-content flex justify-center border shadow-md">
      <div className="card-body text-slate-700">
        <h2 className="font-bold uppercase text-xl text-center text-blue-500">
          Signin
        </h2>
        <form className="grid grid-cols-1 gap-2" onSubmit={handleSignIn}>
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered input-md w-full max-w-xs"
            name="email"
            onChange={(e) => credentialHandler(e.target.name, e.target.value)}
          />
          <input
            type={type}
            placeholder="Password"
            className="input input-bordered input-md w-full max-w-xs"
            name="password"
            onChange={(e) => credentialHandler(e.target.name, e.target.value)}
            onClick={activeHandler}
          />
          <div className="flex items-center gap-2 text-sm my-2">
            <input
              type="checkbox"
              checked="checked"
              className="checkbox checkbox-sm checkbox-primary"
            />
            <p>Accept terms & condition</p>
          </div>
          <div className="flex flex-col justify-center">
            <button
              className="btn py-2 bg-blue-600 text-white hover:bg-blue-500"
              type="submit"
              disabled={loading}
            >
              {loading ? "Please wait" : "Signin"}
            </button>
            <div className="text-sm text-center mt-2">
              <p>
                Allready have account ?
                <span
                  onClick={handleSwitch}
                  className="hover:text-blue-500 cursor-pointer"
                >
                  Signup
                </span>
              </p>
              <p>
                Forgot you password?
                <Link to="/reset" className="hover:text-blue-500 no-underline">
                  Reset
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
