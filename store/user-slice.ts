import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    token: "",
    id: "",
    name: "",
    storeName: "",
    storeLink: "",
    email: "",
    role: "",
    image: "",
    phone: "",
    sallaToken: "",
    aliExpressToken: "",
    country: "",
    createdAt: "",
    planName: "",
    subscriptionStart: "",
    subscriptionExpiry: "",
    subscriptionOrdersLimit: 0,
    subscriptionProductsLimit: 0,
    totalOrdersLimit:0,
    totalProductsLimit:0,
    uniqueId:''
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.name = action.payload.name;
      state.uniqueId = action.payload.uniqueId;
      state.storeName = action.payload.storeName;
      state.storeLink = action.payload.storeLink;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.image = action.payload.image;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.phone = action.payload.phone;
      state.sallaToken = action.payload.sallaToken;
      state.aliExpressToken = action.payload.aliExpressToken;
      state.country = action.payload.country;
      state.createdAt = action.payload.createdAt;
      state.planName = action.payload.planName;
      state.subscriptionStart = action.payload.subscriptionStart;
      state.subscriptionExpiry = action.payload.subscriptionExpiry;
      state.subscriptionOrdersLimit = action.payload.subscriptionOrdersLimit;
      state.subscriptionProductsLimit = action.payload.subscriptionProductsLimit;
      state.totalOrdersLimit = action.payload.totalOrdersLimit;
      state.totalProductsLimit = action.payload.totalProductsLimit;
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.name = "";
      state.storeName = "";
      state.storeLink = "";
      state.email = "";
      state.role = "";
      state.image = "";
      state.token = "";
      state.id = "";
      state.phone = "";
      state.sallaToken = "";
      state.aliExpressToken = "";
      state.country = "";
      state.createdAt = "";
      state.planName = "";
      state.subscriptionStart = "";
      state.subscriptionExpiry = "";
      state.subscriptionOrdersLimit = 0;
      state.subscriptionProductsLimit = 0;
      state.totalProductsLimit = 0
      state.totalOrdersLimit = 0
      state.uniqueId = '';
      
    },
    updateToken(state, action) {
      const { tokenType, token,storeLink ,storeName} = action.payload;

      if (tokenType === "Salla") {
        state.sallaToken = token;
        state.storeLink = storeLink
        state.storeName = storeName
      } else if (tokenType === "AliExpress") {
        state.aliExpressToken = token;
      }
    },
    updateData (state,action){
      state.isLoggedIn = true;
      state.name = action.payload.name;
      state.uniqueId = action.payload.uniqueId;
      state.storeName = action.payload.storeName;
      state.storeLink = action.payload.storeLink;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.image = action.payload.image;
      state.token = localStorage.getItem("token")!;
      state.id = action.payload.id;
      state.phone = action.payload.phone;
      state.sallaToken = action.payload.sallaToken;
      state.aliExpressToken = action.payload.aliExpressToken;
      state.country = action.payload.country;
      state.createdAt = action.payload.createdAt;
      state.planName = action.payload.planName;
      state.subscriptionStart = action.payload.subscriptionStart;
      state.subscriptionExpiry = action.payload.subscriptionExpiry;
      state.subscriptionOrdersLimit = action.payload.subscriptionOrdersLimit;
      state.subscriptionProductsLimit = action.payload.subscriptionProductsLimit;
      state.totalOrdersLimit = action.payload.totalOrdersLimit;
      state.totalProductsLimit = action.payload.totalProductsLimit;
    },
    changeSubscription: (state, action) => {
      const { planName ,subscriptionStart ,subscriptionExpiry ,subscriptionOrdersLimit ,subscriptionProductsLimit ,totalOrdersLimit ,totalProductsLimit } = action.payload;
      state.planName = planName;
      state.subscriptionStart = subscriptionStart;
      state.subscriptionExpiry = subscriptionExpiry;
      state.subscriptionOrdersLimit = subscriptionOrdersLimit;
      state.subscriptionProductsLimit = subscriptionProductsLimit;
      state.totalOrdersLimit = totalOrdersLimit;
      state.totalProductsLimit = totalProductsLimit;
    },
    resetSallaToken : (state) => {
      state.sallaToken = ""
    },
    updatePersonal:(state,action)=>{
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.country = action.payload.country;
    }
    


  },
});

export const userActions = userSlice.actions;
export default userSlice;
