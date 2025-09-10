'use client';
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { userActions } from "@/store/user-slice";
import axiosInstance from "../_components/shared/AxiosInstance";
import { useRouter } from '@/navigation'; // Correct import for Next.js

const TokenExtractor: React.FC = () => {
  const userId = useSelector((state: RootState) => state.user.id);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const sendData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get("accessToken");
      const refreshToken = urlParams.get("refreshToken");
      const tokenType = urlParams.get("tokenType");

      if (!accessToken || !refreshToken || !tokenType || !userId) {
        console.error("Missing parameters for token save operation");
        return;
      }

      try {
        const resp = await axiosInstance.post("/auth/saveToken", {
          tokenType,
          accessToken,
          refreshToken,
          userId,
        });

        console.log("resp", resp);
        console.log("tokenType", tokenType);
        console.log("data.sallaToken", resp?.data?.data?.user);
        console.log("data.aliExpressToken", resp?.data?.data?.user?.aliExpressToken);
        const {data} = await axiosInstance.get(`/auth/user/${user.id}`)
        if (tokenType === "Salla") {
          dispatch(
            userActions.updateToken({
              tokenType: "Salla",
              token: resp?.data?.data?.user?.sallaToken,
              storeName:data.user.storeName,
              storeLink:data.user.storeLink,
            })
          );
        } else if (tokenType === "AliExpress") {
          dispatch(
            userActions.updateToken({
              tokenType: "AliExpress",
              token: resp?.data?.data?.user?.aliExpressToken,
            })
          );
        }
      } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
      }
    };

    sendData();

    const timeoutId = setTimeout(() => {
      // Uncomment this line if you need to redirect after a delay
      router.push('/');
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [userId, dispatch, router]);

  return <div></div>;
};

export default TokenExtractor;
