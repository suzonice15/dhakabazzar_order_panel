import React,{ useContext,} from 'react' 
import Link from 'next/link'
import { DataContext } from '../store/GlobalState';
import Image from 'next/image';
   
export default function Checkout() { 
    const {cart,setCart}=useContext(DataContext); 
    

    const sumation=()=>{
      const result = cart.reduce((total, currentValue) => total = total + currentValue.price*currentValue.quantity,0);
      return result;
  }
    
  const quantityHandler = (action, index) => {
    const newItems = [...cart]; // clone the array 
    let currentQty = newItems[index]['quantity'];
    if (action == 'more') {
      newItems[index]['quantity'] = parseInt(currentQty) + 1;
    } else if (action == 'less') {
      newItems[index]['quantity'] = currentQty > 1 ? currentQty - 1 : 1;
  
    }
    localStorage.setItem("set_cart_data",JSON.stringify( newItems));

    setCart(newItems); // set new state
  }

  
  return (
    <>  
    <div className='container' style={{marginTop:140}}>
        <div className='row'>
            <div className='col-md-4 col-sm-12'>
            <div className="panel panel-default mt-5">
   <div className="panel-heading">Customer Information </div>
  <div className="panel-body">
  <div className="form-group"> 
  <label htmlFor="billing_name">Name<span className="required"></span></label> 
  <input type="text" name="billing_name" className="form-control" required="" id="billing_name" /> </div> <div className="form-group"> <label htmlFor="billing_phone">Phone<span className="required"></span></label> <input type="text" name="billing_phone" required="" className="form-control" id="billing_phone" /> </div> <div className="form-group shipping-address-group"> <label htmlFor="shipping_address1">Delivery Address<span className="required"></span></label> <textarea className="form-control" rows="5" name="shipping_address1" id="shipping_address1"></textarea> </div> <div className="form-group"> <select id="order_area" required="" name="order_area" className="form-control" style={{"border":"1px solid #ccc","borderRadius":"5px !important"}}> <option value="">Select Your Area</option> <option selected="" value="inside_dhaka">Inside Dhaka</option> <option value="outside_dhaka">Outside Dhaka</option> </select> </div> </div> 
             </div>
            </div>
            <div className='col-md-8 col-sm-12'>
            <div className="panel panel-default mt-5">
   <div className="panel-heading">Order Review  </div>
  <div className="panel-body">
  <div className="table-responsive">
                                    <table className="table table-striped table-bordered">
                                        <tbody>
                                        <tr>
                                        
                                            <th className="text-center" width="5%">Picture</th>
                                            <th className="name" width="25%">Name</th>
                                            <th className="text-center" width="10%">Code</th>
                                            <th className="text-center" width="5%">Quantity</th>
                                            <th className="text-center" width="10%">Price</th>
                                            <th className="text-center" width="15%">Total</th>
                                          
                                        </tr>

{cart.map((product,index)=>
                                           <tr key={index} >
                                                

                                                <td>
                                                    
                                                       <picture>
        <source srcSet={product.picture}  type="image/webp" />
        
        <Image
                                src={product.picture}
                                alt="Single Dhaka"
                                width={800}
                                height={800}                                
                             />
      </picture>
                                                </td>
                                                <td>{product.product_title}</td>
                                                <td style={{textAlign:"center"}} >
                                                {product.sku}                               
                                                  </td>  
                                                  <td> 
                                                  <span  style={{"fontSize":"14px","cursor":"pointer"}} onClick={() => quantityHandler('more', index)} className="label label-success">+</span>
                                                  <span style={{"background":"none","color":"black"}} className="label label-default">{product.quantity}</span>
                                                  <span style={{"fontSize":"14px","cursor":"pointer"}} onClick={() => quantityHandler('less', index)}  className="label label-danger">-</span>
                                                  
                                               </td> 
                                                <td className="text-center"> {product.price} </td>
                                                <td className="text-center"> 
                                        {product.price * product.quantity } 
                                                </td>
                                                
                                            </tr>
                                            )}
                                          
                                        </tbody>
                                    </table>

</div>
  </div>

            </div>
            </div>   
            <div className="col-sm-12 col-md-12"> <div className="checkout-box order-confirmation"> <div className="submit-btns"> <button type="submit" className="btn btn-default confirm_order">Confirm Order</button> <a href="https://www.dhakabaazar.com/" className="btn btn-primary mr10">Continue Shopping</a> </div> </div> </div>         
        </div>

    </div>
  
    </>
  )
}
