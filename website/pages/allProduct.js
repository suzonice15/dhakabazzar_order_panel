import React ,{ useEffect ,useState,Suspense}from 'react'
   import Image from 'next/image'
  import axios from 'axios'
 
import { api_base_url, WEBSITEURL } from '../components/AppUrl';
const ProductRow = React.lazy(() => import('../components/common/ProductRow'));
import FackAllProduct from '../components/product/FackAllProduct';

 
 export default function AllProduct() {
   
   const [products,setProduct]=useState([])
   useEffect(() => {         
      let url=api_base_url+"allProducts";   
      axios.get(url).then(response=>{                   
       setProduct(response.data)
        }).catch(error => {
           setProduct([])
         console.log("slider_api_error",error)                
      }) 
   },[]) 

        
  return (
    
   <Suspense fallback={<div style={{marginTop:200}}>Loading...</div>}>

 <div className="container remove_class" style={{marginTop:130}}> 
            <ul className="products row row5 mt30">
               {products.length > 0 ? 
            <div className="col-sm-12">
{products.map(product=> <ProductRow key={product.product_name+ Math.random()} {...product} />)}
               </div>   : <FackAllProduct />}       
         </ul>        
           </div>
           </Suspense>
                  )
                  }