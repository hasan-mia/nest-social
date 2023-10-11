import React, { useState } from "react";
import Signin from "../components/auth/Signin";
import Signup from "../components/auth/Signup";

export default function Auth() {
  const [isSign, setIsSign] = useState(true);
  const handleSignInUp = () => setIsSign(!isSign);

  return (
    <div className="flex items-center justify-center w-full py-5">
      {isSign ? (
        <Signin handleSwitch={handleSignInUp} />
      ) : (
        <Signup handleSwitch={handleSignInUp} />
      )}
    </div>
  );
}
