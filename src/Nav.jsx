import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import App from "./App";
import DisplayScreen from "./HomePage";
import CartPage from "./CartPage";
import { useContext } from "react";
import { CartContext } from "./ContextAPI";
import ProductList from "./ProductList";

export default function Nav() {
  // Using Context for get current state
  const { state } = useContext(CartContext);

  //used to navigate between pages
  const navigate = useNavigate();

  return (
    <>
      {/* creating Home page with pages to navigate between */}
      <div className="Shop">
        <nav className="nav d-flex align-items-center justify-content-between p-4">
          <div
            className="home d-flex justify-content-between"
            onClick={() => {
              navigate("/");
            }}
          >
            <Link to="/">
              <b>Products</b>
            </Link>
          </div>
          <div
            className="Cart d-flex align-items-center"
            onClick={() => {
              navigate("/Cart");
            }}
          >
            <p className="m-0 pr-3 cartLabel">
              <b>Cart</b>
            </p>
            <div>
              {/* it will show number of CartItems */}
              <Badge badgeContent={state.cartItems} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </div>
          </div>
        </nav>
        {/* using Routes to route through pages to the path */}
        <Routes>
          <Route element={<CartPage />} path="/Cart"></Route>
          <Route element={<ProductList />} path="/"></Route>
        </Routes>
      </div>
    </>
  );
}
