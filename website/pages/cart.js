import React,{ useContext,} from 'react' 
import Link from 'next/link'
import { DataContext } from '../store/GlobalState';
import Image from 'next/image'

export default function Cart() { 
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

  const Delete=(index)=>{
    const newItems = [...cart]; // clone the array    
          newItems.splice(index, 1);
          localStorage.setItem("set_cart_data",JSON.stringify( newItems));
          setCart(newItems); // set new state     
  }
  return (
    <>  
    <div className='container' style={{marginTop:140}}>
        <div className='row'>
            <div className='col-md-12'>
            <div className="panel panel-default mt-5">
   <div className="panel-heading">Order Review </div>
  <div className="panel-body">
  <div className="table-responsive">
                                    <table className="table table-striped table-bordered">
                                        <tbody>
                                        <tr>
                                        <th className="text-center" width="5%">Delete</th>
                                            <th className="text-center" width="5%">Picture</th>
                                            <th className="name" width="25%">Name</th>
                                            <th className="text-center" width="10%">Code</th>
                                            <th className="text-center" width="5%">Quantity</th>
                                            <th className="text-center" width="10%">Price</th>
                                            <th className="text-center" width="15%">Total</th>
                                          
                                        </tr>

{cart.map((product,index)=>
                                           <tr key={index} >
                                                <td onClick={() => Delete(index)} className="text-center">          
                                                <span style={{"fontSize":"14px","cursor":"pointer"}} className="label label-danger">x</span>

                                                </td>

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
            <div className='col-md-7' style={{textAlign:'right'}}>
                </div>
            <div className='col-md-5' style={{textAlign:'right'}}>
            <div className="panel panel-default mt-5">
   
  <div className="panel-body">
  <div className="table-responsive">
                                    <table className="table table-striped table-bordered">
                                         
<tbody>
                                            <tr  >
                                                 <td className="text-right">          
                                                <span >Total</span>
                                                </td>
                                                <td className="text-center">          
                                                {sumation()}
                                                </td>
                                                 
                                                 </tr>
                                                <tr  >
                                                 <td colSpan={2} className="text-right">   
                                                 <Link href={`/checkout`}><a href='' style={{background:"#074488",border:"none",color:"white"}} className='btn btn-success'> Place Order</a></Link>
                                                </td>
                                                 
                                                 
                                                </tr>
                                                </tbody>
                                         
                                    </table>

</div>
  </div>

            </div>
            </div>
        </div>

    </div>
  
    </>
  )
}
