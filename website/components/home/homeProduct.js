import React from 'react'
import Link from 'next/link'
import { WEBSITEURL } from '../AppUrl'
import Image from 'next/image'
export default function homeProduct({products}) { 
     
  return (
    <>   
 <div className="container remove_class" style={{"marginTop": "23px","marginBottom": "-70px"}}>
     {products.map((product,index)=>{

    return (<>
    
    <div className="category-tabs" style={{"marginTop": "9px","marginLeft": "-14px"}}>
       <Link href={`category/${product.products[0].category_name}`}  ><a className="parent homparent">{product.products[0].category_title}</a></Link>
    </div>

    <div id="demos" className="row">
       <div className="large-12 columns">
          <div className="owl-carousel owl-theme owl-loaded owl-drag">
             <div className="owl-stage-outer">
                <div className="owl-stage"  > 
                {product.products.map((product,index2)=>
                   <div className="owl-item "  >
                      <div className="item pro-box">
                         <div className="pboxall">                    
                         <Image
                                src={`${WEBSITEURL+product.featured_image}`}
                                alt={`${product.product_title}`}
                                width={200}
                                height={200}
                                
                             />
                 <div className="pro-desc">
                               <div className="pro-name"> 
                               <a target="_blank" 
                               href={`/products/${product.product_name}`}>{product.product_title.substring(0, 25)}</a> 
                               </div>
                                <div  className="clearfix">
                                  <div  style={{"marginBottom":"-1px"}} className="price bn"> <del> ৳ 900.00 </del> ৳ 450.00 </div>
                             
                               </div>
                            </div>
                          </div>
                      </div>
                   </div>
)}

                   
                </div>
             </div>            
             
          </div>
       </div>
    </div>
    </>
    )
     })}
 </div>
 
    </>
  )
}
