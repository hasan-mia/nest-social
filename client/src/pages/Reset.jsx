import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../store/api/authApi";

export default function Signin({ handleSwitch }) {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const [active, setActive] = useState(false);
    const [type, setType] = useState('password');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [loading, setLoading] = useState(false);
    const credentialHandler = (name, data) => {
        if (name === 'email') {
            setEmail(data);
        } else if (name === 'password') {
            setPass(data);
        }
    };
    // handle  singin
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            email,
            password: pass,
        };
        const res = await authApi.updatePass(data);
        if (res.status === 200) {
            // toast.success(`${res.data.message}`);
            localStorage.setItem('session', res.data.token);
            const [headerBase64, payloadBase64, signature] = res.data.token.split('.');
            const decodedPayload = atob(payloadBase64);
            // dispatch(setAuth(JSON.parse(decodedPayload)));
            setLoading(false);
            navigate(-1, { replace: false });
        } else if (res.status === 406) {
            // toast.error(`${res.data.error}`);
            setLoading(false);
        } else if (res.status === 401) {
            // toast.error(`${res.data.error}`);
            setLoading(false);
        } else if (res.status === 404) {
            // toast.error(`${res.data.error}`);
            setLoading(false);
        } else if (res.status === 412) {
            // toast.error(`${res.data.error}`);
            setLoading(false);
        } else {
            // toast.success(`something went wrong`);
            setLoading(false);
        }
    };
    const activeHandler = () => {
        if (active) {
            setType('text');
        } else {
            setType('password');
        }
        setActive(!active);
    };
  return (
    <div className="flex items-center justify-center w-full py-5">
      <div className="card w-96 text-primary-content flex justify-center border shadow-md">
        <div className="card-body text-slate-700">
          <h2 className="font-bold uppercase text-xl text-center text-blue-500">
            Reset Password
          </h2>
          <form className="grid grid-cols-1 gap-2" onSubmit={handleUpdate}>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered input-md w-full max-w-xs"
              name="password"
              onChange={(e) => credentialHandler(e.target.name, e.target.value)}
              onClick={activeHandler}
            />
            <input
              type="password"
              placeholder="Confirm"
              className="input input-bordered input-md w-full max-w-xs"
              name="password"
              onChange={(e) => credentialHandler(e.target.name, e.target.value)}
              onClick={activeHandler}
            />
            <div className="flex flex-col justify-center">
              <button
                className="btn py-2 bg-blue-600 text-white hover:bg-blue-500"
                type="submit" 
                disabled={loading}
              >
               {loading? 'Please wait...': 'Update'}
              </button>
              <div className="text-sm text-center mt-2">
                <Link to="/" className="hover:text-blue-500 no-underline border bg-gray-100 mt-2 py-1 px-2 rounded-sm">
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
