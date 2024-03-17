import { useContext } from "react"
import { CartContext } from "./ContextAPI"
import Product from "./Product";

export default function ProductList(){
    // Using Context for state
    const {updateItemFunc,jObject} = useContext(CartContext);

    return<>
        <div className="product-show">
            <div className="row product-row">
            {
                //Looping through Object via key, value
                Object.entries(jObject).map(([_,value])=>(
                    //Since object has only one key its looping value array to pass props
                    value.map((it,index)=>(
                        <Product key={index} object={it} updateItemFunc={updateItemFunc} />
                    ))
                ))
            }
            </div>
        </div>
    </>
}