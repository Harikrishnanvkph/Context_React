import React, {useContext} from "react";
import CartContextProvider from "./ContextAPI";
import { CartContext } from "./ContextAPI";
import { Route, Routes } from "react-router-dom";
import Nav from "./Nav";

function DisplayScreen() {
  return (
    <>
    {/* importing Context Provider to use Context*/}
      <CartContextProvider>
        <Nav />
      </CartContextProvider>
    </>
  );
}

export default DisplayScreen;
