import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import authApi from "../store/api/authApi";

export default function Reset({ handleSwitch }) {
  const {userInfo}=useSelector(state=>state.auth)
  const [active, setActive] = useState(false);
  const [type, setType] = useState("password");
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState("");
  const [cpass, setcPass] = useState("");
  const [loading, setLoading] = useState(false);
  const credentialHandler = (name, data) => {
    if (name === "cpassword") {
      setcPass(data);
    } else if (name === "password") {
      setPass(data);
    }else if (name === "email") {
      setEmail(data);
    }
  };
  // handle  singin
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      email: userInfo?.email || email,
      password: pass,
    };
    if (cpass === pass) {
      const res = await authApi.updatePass(data);
      if (res.status === 200) {
        toast.success(`${res.data.message}`);
        setLoading(false);
        setEmail('');
        setPass('');
        setcPass('');
      } else if (res.data.statusCode === 400) {
        toast.error(`${res.data.message}`);
        setLoading(false);
      } else {
        toast.success(`something went wrong`);
        setLoading(false);
      }
    }else{
      toast.info("Match the confirm password")
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
    <div className="flex justify-center my-5 pt-4">
      <div className="card w-96 text-primary-content flex justify-center border shadow-md">
      <div className="card-body text-slate-700">
        <h2 className="font-bold uppercase text-xl text-center text-blue-500">
          Reset Password
        </h2>
        <form className="grid grid-cols-1 gap-2" onSubmit={handleSignIn}>
          <input
            type="email"
            className="input input-bordered input-md w-full max-w-xs"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => credentialHandler(e.target.name, e.target.value)}
          />
          <input
            type={type}
            className="input input-bordered input-md w-full max-w-xs"
            name="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => credentialHandler(e.target.name, e.target.value)}
            onClick={activeHandler}
          />
          <input
            type={type}
            placeholder="Confirm password"
            className="input input-bordered input-md w-full max-w-xs"
            name="cpassword"
            value={cpass}
            onChange={(e) => credentialHandler(e.target.name, e.target.value)}
            onClick={activeHandler}
          />
          
          <div className="flex flex-col justify-center">
            <button
              className="btn py-2 bg-blue-600 text-white hover:bg-blue-500"
              type="submit"
              disabled={loading}
            >
              {loading ? "Please wait" : "Reset"}
            </button>
            <div className="text-sm text-center mt-2">
              <Link to="/auth" className="hover:text-blue-500 no-underline">
                  Back
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
