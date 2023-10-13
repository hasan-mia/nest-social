/* eslint-disable no-unused-vars */
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { setUserId } from "../store/slice/authSlice";

export default function useDecode() {
  const accestoken = Cookies.get("token");
  const [token, setToken] = useState();
  useEffect(() => {
    if (token) {
      const [headerBase64, payloadBase64, signature] = token.split(".");
      const decodedPayload = atob(payloadBase64);
      const jsonData = JSON.parse(decodedPayload);
      setUserId(jsonData.id);
    }
  }, [token]);

  useEffect(() => {
    if (accestoken) {
      const [headerBase64, payloadBase64, signature] = accestoken.split(".");
      const decodedPayload = atob(payloadBase64);
      const jsonData = JSON.parse(decodedPayload);
      setUserId(jsonData.id);
    }
  }, [accestoken]);
  return { token, setToken };
}
