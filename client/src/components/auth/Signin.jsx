import React from "react";
import { Link } from "react-router-dom";

export default function Signin({ handleSwitch }) {
  return (
    <div className="card w-96 text-primary-content flex justify-center border shadow-md">
      <div className="card-body text-slate-700">
        <h2 className="font-bold uppercase text-xl text-center text-blue-500">
          Signin
        </h2>
        <form className="grid grid-cols-1 gap-2">
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered input-md w-full max-w-xs"
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered input-md w-full max-w-xs"
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
              type="button"
            >
              Signin
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
