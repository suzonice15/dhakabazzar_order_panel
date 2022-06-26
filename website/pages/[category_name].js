import React ,{ useEffect ,useState,Suspense}from 'react'  
  import axios from 'axios'
  import {  useRouter } from 'next/router'; 
import { api_base_url } from '../components/AppUrl';

const ProductRow = React.lazy(() => import('../components/common/ProductRow'));
 export default function Category() {

   let router=useRouter();
  let category_name=router.query.category_name;
  const [products,setProduct]=useState([])  
   useEffect(() => {         
               let menu_category_url=api_base_url+"category/"+category_name;   
                  axios.get(menu_category_url).then(response=>{                   
                  setProduct(response.data)
                     }).catch(error => {
                        setProduct([])
                     console.log("slider_api_error",error)                
                  }) 
   },[category_name]) 

  return (   
    <Suspense fallback={<div style={{marginTop:200}}>Loading...</div>}>
 <div className="container remove_class" style={{marginTop:120}}> 
             <ul className="products row row5 mt30">
            <div className="col-sm-12">
            {products.map(product=> <ProductRow key={product.product_name+ Math.random()} {...product} />)}
               </div>          
         </ul>        
           </div>
           </Suspense>
    )
   }
                 