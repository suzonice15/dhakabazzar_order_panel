import React ,{ useEffect ,useState}from 'react'
   import Image from 'next/image'
  import axios from 'axios'
  import {  useRouter } from 'next/router';

import { api_base_url, WEBSITEURL } from '../../components/AppUrl';
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
    
  
 <div className="container remove_class" style={{marginTop:120}}> 
             <ul className="products row row5 mt30">
            <div className="col-sm-12">
{products.map((product,index)=>{
return (    
                <li  key={index}   className="col-xs-6 col-sm-2">
                     <div  style={{background:"white"}} className="pro-box" onClick={()=>{router.push(`/products/${product.product_name}`) }}>
                        <div  className="img-box">
                           <div className="imgbox_overflwoe">                             
                              <div className="freepeoduct">৳ 450 ছাড়</div>
                              <Image
                                src={`${WEBSITEURL+product.featured_image}`}
                                alt={`${product.product_title}`}
                                width={200}
                                height={200}                                
                             />
                           </div>
                        </div>
                        <div className="pro-desc">
                           <div className="pro-name">
                           <a  
                               href={`/products/${product.product_name}`}>{product.product_title.substring(0, 25)}
                               </a> 
                           </div>
                           <div className="clearfix">
                              <h5>Code:{product.sku}</h5>
                              <div className="price">
                              {generatePrice(product.sell_price,product.discount_price,product.discount_type)}

                                 </div>
                           </div>
                        </div>
                        <div className="add-btn-box">
                           <a   className="buy_now" data-product_id="2538" data-product_price="450" data-product_title="Tea Strainer Amazing Stainless Steel Tea Infuser Pipe Design Touch Feel Good Holder Tool Tea Spoon Infuser Filter">
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
                 