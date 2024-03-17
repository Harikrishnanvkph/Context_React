import { useContext, useEffect, useState } from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { CartContext } from "./ContextAPI";

export default function CartPage() {
  const { state, updateItemFunc, jObject, resetValue } =
    useContext(CartContext);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    const setArray = () => {
      const jb = jObject["products"];
      let newArr = [];
      setArr([]);
      for (const a in state.items) {
        if (parseInt(state.items[a]) > 0) {
          const nuu = jb[parseInt(a.slice(-1)) - 1];
          let obj = {};
          obj["id"] = nuu.id;
          obj["Name"] = nuu.title;
          obj["Price"] = nuu.price;
          obj["Quantity"] = state.items[a];
          newArr.push(obj);
          console.log(arr);
        }
      }
      setArr([...newArr]);
    };
    setArray();
  }, [state.items]);

  return (
    <>
      <div className="container">
        {arr.length == 0 ? (
          <div className="d-none-cart">No Item to display</div>
        ) : (
          <>
            {" "}
            <div className="row cart-title p-2">
              <div className="col-3 d-flex justify-content-center">
                <b>Name</b>
              </div>
              <div className="col-2 d-flex justify-content-center">
                <b>Price</b>
              </div>
              <div className="col-2 d-flex justify-content-center">
                <b>Quantity</b>
              </div>
              <div className="col-3 d-flex justify-content-center">
                <b>ItemsPrice</b>
              </div>
              <div className="col-2 d-flex justify-content-center"></div>
            </div>
            {arr.map((it, index) => (
              <div
                key={index}
                className="row cart-item p-2
            d-flex align-items-center"
              >
                <div className="col-3 d-flex justify-content-center">
                  {it.Name}
                </div>
                <div className="col-2 d-flex justify-content-center">
                  ₹{it.Price}
                </div>
                <div className="col-2 d-flex justify-content-center">
                  {it.Quantity}
                </div>
                <div className="col-3 d-flex justify-content-center">
                  ₹{parseInt(it.Quantity) * parseInt(it.Price)}
                </div>
                <div className="col-2 removeIcon">
                  <RemoveCircleIcon
                    onClick={() => {
                      updateItemFunc(it.id, 1, "sub");
                    }}
                  />
                </div>
              </div>
            ))}
          </>
        )}
        <div id="footer" className="row">
          <p className="m-0 pr-2">
            <b>{`Total Amount = ₹${state.totalAmount}`}</b>
          </p>
          {/* button used to reset items in card and shows a alert*/}
          <button
            onClick={() => {
              alert(state.totalAmount > 0 ? `
              Payment Successfull
              Created by Hari Krishnan V K` :
              `Cart Empty, Add some Item to Order`);
              resetValue();
            }}
          >
            Order Now
          </button>
        </div>
      </div>
    </>
  );
}
