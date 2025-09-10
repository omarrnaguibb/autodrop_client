'use client';

import Image from "next/image";
import { useSelector } from "react-redux";
import MotionWrapper from "../../_components/shared/MotionWrapper";
import { RootState } from "@/store";
import { Input } from "@/components/ui/input";
import "./settings.css";
import { useState } from "react";
import axios from "axios";
import axiosInstance from "../../_components/shared/AxiosInstance";

import { useToast } from "@chakra-ui/react"
import { useDispatch } from "react-redux";
import { userActions } from "@/store/user-slice";

interface AccountDetails {
  settings: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  saveChanges: string;
  changePassword: string;
  changeAccountDetails: string;
  merchantID: string;
  name: string;
  marketName: string;
  marketLink: string;
  email: string;
  phone: string;
  country: string;
  locale?: string;
}

export default function AccountDetails(props: AccountDetails) {
  const user = useSelector((state: RootState) => state.user);
  const toast = useToast()
  const dispatch = useDispatch()
  let userName = user.name;
let {storeName,storeLink} = user
  let userId = user.id;
  let uniqueId = user.uniqueId;
  let userEmail = user.email;
  const [phoneVal,setPhone]  = useState(user.phone)
  const [countryVal,setCountry]  = useState(user.country)
  const [nameVal,setName]  = useState(user.name)
  let userPhone = user.phone;
  let userCountry = user.country;
  let userImage = user.image;
  const {
    locale,
    name,
    marketName,
    marketLink,
    country,
    merchantID,
    email,
    phone,
  } = props;
  const saveUserData = async ()=>{
    await axiosInstance.patch('/settings/user',{phone:phoneVal,country:countryVal,name:nameVal}).then(({data})=>{
      dispatch(userActions.updatePersonal({
        phone:data.user.phone,
        country:data.user.country,
        name:data.user.name
      }))
      toast({
        title:'Setting Saved',
        description:'Changed Data Has Been  Saved',
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
    });
    console.log(user)
    })
    
  }
  return (
    <>
      <MotionWrapper locale={locale}>
        <div className="ms:text-sm flex flex-col space-y-3 tab:space-y-6 mt-3">
          <div className="flex justify-center tab:justify-end  max-w-[90%] tab:max-w-[60%] ">
            <div className="relative ">
              <Image
                src={userImage}
                width={168}
                height={168}
                alt="user"
                className="mx-auto tab:ml-[4rem] "
              />
              <div className="absolute bottom-6 right-6 bg-black rounded-full px-[3px] py-[5px] border-4 border-white">
                <Image
                  src={"/client/settings/Camera.svg"}
                  alt="camera"
                  width={19}
                  height={15}
                />{" "}
              </div>
            </div>
          </div>
          <div className="formFieldWrapper   ">
            <div>{merchantID}</div>
            <Input
              className="inputField"
              defaultValue={uniqueId}
              disabled
            />
          </div>
          <div className="formFieldWrapper  ">
            <div>{name}</div>
            <Input className="inputField" value={nameVal} onChange={(e)=>setName(e.target.value)}  />
          </div>
          <div className="formFieldWrapper  ">
            <div>{marketName}</div>
            <Input className="inputField" value={storeName} disabled/>
          </div>
          <div className="formFieldWrapper  ">
            <div>{marketLink}</div>
            <Input className="inputField" value={storeLink} disabled/>
          </div>
          <div className="formFieldWrapper  ">
            <div>{email}</div>
            <Input className="inputField" value={userEmail}  disabled />
          </div>
          <div className="formFieldWrapper  ">
            <div>{phone}</div>
            <Input className="inputField" value={phoneVal} onChange={(e)=>setPhone(e.target.value)} />
          </div>
          <div className="formFieldWrapper  ">
            <div>{country}</div>
            <Input className="inputField" value={countryVal} onChange={(e)=>setCountry(e.target.value)} />
          </div>
        </div>
        <div className="w-full flex items-center justify-center my-8 p-2">
            <button className="bg-white text-teal-800 font-bold md:w-1/4 w-2/3 py-2 rounded-md" onClick={async()=>await saveUserData()} >Save</button>
        </div>
      </MotionWrapper>
    </>
  );
}
