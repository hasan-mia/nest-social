import React from "react";
import { Link } from "react-router-dom";

export default function Signin({ handleSwitch }) {
  return (
    <div className="flex items-center justify-center w-full py-5">
      <div className="card w-96 text-primary-content flex justify-center border shadow-md">
        <div className="card-body text-slate-700">
          <h2 className="font-bold uppercase text-xl text-center text-blue-500">
            Reset Password
          </h2>
          <form className="grid grid-cols-1 gap-2">
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered input-md w-full max-w-xs"
            />
            <input
              type="password"
              placeholder="Confirm"
              className="input input-bordered input-md w-full max-w-xs"
            />
            <div className="flex flex-col justify-center">
              <button
                className="btn py-2 bg-blue-600 text-white hover:bg-blue-500"
                type="button"
              >
                Update
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
