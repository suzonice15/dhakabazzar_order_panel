import React ,{ useEffect ,useState}from 'react'
import axios from 'axios'
 import {  useRouter } from 'next/router';
import { api_base_url, WEBSITEURL } from '../../components/AppUrl';
import ProductRow from '../../components/common/ProductRow';

export default function Seach() {
    let router=useRouter();
   let search=router.query.search; 
   const [products,setProduct]=useState([]) 

   useEffect(() => {         
      let product_url=api_base_url+"productSearch?search="+search; 
      axios.get(product_url).then(response=>{           
         setProduct(response.data)     
        }).catch(error => {   
                  
      }) 
   },[search])

   return (  
    <div className="container" style={{marginTop:120}}> 
    <h3 className='text-center' style={{fontWeight:'bold',marginTop:5}}>Search result for: {search}</h3>
                <ul className="products row row5 mt30">
               <div className="col-sm-12">
               {products.map(product=> <ProductRow key={product.product_name+ Math.random()} {...product} />)}
                  </div>          
            </ul>        
              </div>
       )
}
