import React ,{ useEffect ,useState}from 'react'
   import Image from 'next/image'
  import axios from 'axios'
  import {  useRouter } from 'next/router';
import { api_base_url } from '../components/AppUrl';

 
 export default function AllProduct() {
  let router=useRouter();
  
   const [products,setProduct]=useState([])
   useEffect(() => {         
      getCategory(); 
   },[])
   const getCategory=()=>{ 
             let url=api_base_url+"allProducts";   
             axios.get(url).then(response=>{                   
              setProduct(response.data)
               }).catch(error => {
                  setProduct([])
                console.log("slider_api_error",error)                
             }) 
         } 

         const  generatePrice=(sell_price,discount_price,discount_type)=>{
            var product_price = sell_price = sell_price;
            var product_discount = discount_price;
            var discount_type;
            var oldPrice='';
            if(product_discount != 0)
            { 
                var discount_type =discount_type;
                  oldPrice='৳ '+sell_price;
                let save_money;
             let   product_discount = save_money = product_discount;
    
                if(discount_type == 'fixed')
                {
                    sell_price = product_price - product_discount;
                }else if(discount_type == 'percent')
                {
                    save_money = (product_discount / 100) * product_price;
                   sell_price = product_price - save_money;
                }
            }
          return  <> <del>{oldPrice}</del> ৳ {sell_price} </> 
    
        }

  return (
    
  
 <div class="container remove_class" style={{marginTop:130}}> 
            <ul class="products row row5 mt30">
            <div class="col-sm-12">
{products.map((product,index)=>{
return (    
                <li    class="col-xs-6 col-sm-2">
                     <div class="pro-box" onClick={()=>{router.push(`/products/${product.product_name}`) }}>
                        <div class="img-box">
                           <div class="imgbox_overflwoe">                             
                              <div class="freepeoduct">৳ 450 ছাড়</div>
                              <Image
                                src={`${WEBSITEURL+product.featured_image}`}
                                alt={`${product.product_title}`}
                                width={200}
                                height={200}
                                
                             />
                           </div>
                        </div>
                        <div class="pro-desc">
                           <div class="pro-name">
                           <a  
                               href={`/products/${product.product_name}`}>{product.product_title.substring(0, 25)}
                               </a> 
                           </div>
                           <div class="clearfix">
                              <h5>Code:{product.sku}</h5>
                              <div class="price">
                              {generatePrice(product.sell_price,product.discount_price,product.discount_type)}

                                 </div>
                           </div>
                        </div>
                        <div class="add-btn-box">
                           <a   class="buy_now" data-product_id="2538" data-product_price="450" data-product_title="Tea Strainer Amazing Stainless Steel Tea Infuser Pipe Design Touch Feel Good Holder Tool Tea Spoon Infuser Filter">
                           Order<span> Now</span>
                           </a>
                        </div>
                     </div>
                  </li>
                  )}
)
               }
               </div>          
         </ul>        
           </div>
                  )
                  }