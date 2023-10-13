/* eslint-disable no-unused-vars */
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useToken() {
  const accestoken = Cookies.get("token");
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (accestoken) {
      navigate('/', {replace:false})
    }
  }, [accestoken, navigate]);
  return { token, setToken };
}
