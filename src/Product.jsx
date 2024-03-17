import { Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import { SelectValue } from "./Operation";
import { yellow } from "@mui/material/colors";

export default function Product({ object, updateItemFunc }) {
  let mouseStyle = {
    backgroundColor: "#008DDA",
  };
  return (
    <>
      {
        /* creating card for items */
        <div
          className={`product item${object.id} 
            align-items-between p-2 d-flex flex-column justify-content-between`}
        >
          <div className="title-rating d-flex justify-content-between p-2">
            <h4 className="m-0 title">
              <b>{object.title}</b>
            </h4>
            <div className="d-flex align-items-center">
              <h6
                className="rateNumber m-0 p-0"
                style={{
                  color: object.rating > 3.5 ? "green" : "red",
                }}
              >
                {object.rating}
              </h6>
              <div className="rating d-flex align-items-center">
                {/* rating show via mui element */}
                <Rating
                  className="ml-2 rating"
                  name="half-rating-read"
                  defaultValue={object.rating}
                  precision={0.2}
                  readOnly
                  size="small"
                />
              </div>
              <div
                className="rating2"
                style={{
                  color: "rgb(234, 249, 71)",
                  fontSize: "25px",
                }}
              >
                <span>★</span>
              </div>
            </div>
          </div>
          <p className="description mt-2 mb-2">{object.description}</p>
          <div className="money-cart">
            <h4 className="m-2">{`₹ ${object.price}`}</h4>
            <div
              className="drop-cart m-2 d-flex 
                    align-items-center justify-content-between"
            >
            {/* to select number of items to add to cart */}
              <select id={`select${object.id}`}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
              <button
                className="button-addCart"
                style={mouseStyle}
                /* onclicking the items from select will be added to the cart*/
                onClick={() => {
                  const sRun = SelectValue(`select${object.id}`);
                  updateItemFunc(object.id, sRun, "add");
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      }
    </>
  );
}
