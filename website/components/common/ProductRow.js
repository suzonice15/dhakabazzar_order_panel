import React from 'react'
import Image from 'next/image'
import { WEBSITEURL } from '../AppUrl'
import { DiscountPrice, GeneratePrice } from './Helper'
import {  useRouter } from 'next/router';

export default function ProductRow({product_title,product_name,featured_image,sku,sell_price,discount_price,discount_type}) {
     let router=useRouter();
  return (
    <>
        <li     className="col-xs-6 col-sm-2">
                     <div className="pro-box" onClick={()=>{router.push(`/products/${product_name}`) }}>
                        <div className="img-box">
                           <div className="imgbox_overflwoe"> 
                              <DiscountPrice sell_price={sell_price} discount_price={discount_price} discount_type={discount_type} />
                              <Image
                                src={`${WEBSITEURL+featured_image}`}
                                alt={`${product_title}`}
                                width={200}
                                height={200}
                                
                             />
                           </div>
                        </div>
                        <div className="pro-desc">
                           <div className="pro-name">
                           <a  
                               href={`/products/${product_name}`}>{product_title.length > 28 ? product_title.substring(0, 28)+'....': product_title}
                               </a> 
                           </div>
                           <div className="clearfix">
                              <h5>Code:{sku}</h5>
                              <div className="price">
                              <GeneratePrice sell_price={sell_price} discount_price={discount_price} discount_type={discount_type} />
                                 </div>
                           </div>
                        </div>
                        <div className="add-btn-box">
                           <a   className="buy_now" >
                           Order<span> Now</span>
                           </a>
                        </div>
                     </div>
                  </li>
    </>
  )
}
