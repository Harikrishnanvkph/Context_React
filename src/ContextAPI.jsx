import { createContext, useReducer, useEffect } from "react";

const jString = `{
    "products": [
        {
            "id": 1,
            "title": "iPhone 9",
            "description": "An apple mobile which is nothing like apple",
            "price": 549,
            "discountPercentage": 12.96,
            "rating": 4.69,
            "stock": 94,
            "brand": "Apple",
            "category": "smartphones",
            "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
            "images": [
                "https://i.dummyjson.com/data/products/1/1.jpg",
                "https://i.dummyjson.com/data/products/1/2.jpg",
                "https://i.dummyjson.com/data/products/1/3.jpg",
                "https://i.dummyjson.com/data/products/1/4.jpg",
                "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
            ]
        },
        {
            "id": 2,
            "title": "iPhone X",
            "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
            "price": 899,
            "discountPercentage": 17.94,
            "rating": 4.44,
            "stock": 34,
            "brand": "Apple",
            "category": "smartphones",
            "thumbnail": "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
            "images": [
                "https://i.dummyjson.com/data/products/2/1.jpg",
                "https://i.dummyjson.com/data/products/2/2.jpg",
                "https://i.dummyjson.com/data/products/2/3.jpg",
                "https://i.dummyjson.com/data/products/2/thumbnail.jpg"
            ]
        },
        {
            "id": 3,
            "title": "Samsung Universe 9",
            "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
            "price": 1249,
            "discountPercentage": 15.46,
            "rating": 4.09,
            "stock": 36,
            "brand": "Samsung",
            "category": "smartphones",
            "thumbnail": "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
            "images": [
                "https://i.dummyjson.com/data/products/3/1.jpg"
            ]
        },
        {
            "id": 4,
            "title": "OPPOF19",
            "description": "OPPO F19 is officially announced on April 2021.",
            "price": 280,
            "discountPercentage": 17.91,
            "rating": 4.3,
            "stock": 123,
            "brand": "OPPO",
            "category": "smartphones",
            "thumbnail": "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
            "images": [
                "https://i.dummyjson.com/data/products/4/1.jpg",
                "https://i.dummyjson.com/data/products/4/2.jpg",
                "https://i.dummyjson.com/data/products/4/3.jpg",
                "https://i.dummyjson.com/data/products/4/4.jpg",
                "https://i.dummyjson.com/data/products/4/thumbnail.jpg"
            ]
        },
        {
            "id": 5,
            "title": "Huawei P30",
            "description": "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
            "price": 499,
            "discountPercentage": 10.58,
            "rating": 4.09,
            "stock": 32,
            "brand": "Huawei",
            "category": "smartphones",
            "thumbnail": "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
            "images": [
                "https://i.dummyjson.com/data/products/5/1.jpg",
                "https://i.dummyjson.com/data/products/5/2.jpg",
                "https://i.dummyjson.com/data/products/5/3.jpg"
            ]
        }
    ]
}`;

export const CartContext = createContext();

function CartContextProvider({ children }) {
  // Converting JSON into Object
  const jObject = JSON.parse(jString);

  // Using useReducer hook to store and update state 
  const [state, dispatch] = useReducer(
    (state, action) => {
      // ...
      switch (action.type) {
        //updating total cart items
        case "updateCart":
          return {
            ...state,
            cartItems: action.value,
          };
        
        // Updating total by mutiplying quantity and price
        case "updateTotal":
          return {
            ...state,
            totalAmount:
              state.items.I1 * jObject.products[0].price +
              state.items.I2 * jObject.products[1].price +
              state.items.I3 * jObject.products[2].price +
              state.items.I4 * jObject.products[3].price +
              state.items.I5 * jObject.products[4].price,
          };

        //updates items I value as per key passed
        case "updateItem":
          const newItems = { ...state.items };
          
          Object.entries(newItems).forEach(([key, _]) => {
            if (action.value[0] == key.slice(-1)) {
              if(action.value[2] === "add"){
                newItems[key] = parseInt(newItems[key]) + parseInt(action.value[1]);
              }else{
                if(newItems[key] > 0){
                  newItems[key] = parseInt(newItems[key]) - 1;
                }
              }
            }
          });
          return {
            ...state,
            items: newItems,
          };
        case "reset":
          const resetItem = {...state.items};
          Object.entries(resetItem).map(([key,_])=>{
            resetItem[key] = 0;
          });
          return {
            ...state,
            items : resetItem
          }
      }
    },
    {
      items: {
        I1: 0,
        I2: 0,
        I3: 0,
        I4: 0,
        I5: 0,
      },
      cartItems: 0,
      totalAmount: 0,
    }
  );

  // using useEffect hook to update useReducer via dispatch whenever any change in state.items
  useEffect(() => {
    dispatch({
      type: "updateCart",
      value: Object.values(state.items).reduce((a, b) => parseInt(a)+parseInt(b), 0),
    });
    dispatch({ type: "updateTotal" });
  }, [state.items]);

  // Updating state.items.I* values
  const updateItemFunc = (k, v, o) => {
    dispatch({ type: `updateItem`, value: [k, v, o] });
  };

  const resetValue = ()=>{
    dispatch({type : "reset"})
  }

  return (
    <>
      <CartContext.Provider value={{ state, updateItemFunc, jObject,resetValue }}>
        {children}
      </CartContext.Provider>
    </>
  );
}

export default CartContextProvider;
