import React ,{useEffect} from 'react'
import Link from 'next/link'
import { WEBSITEURL } from '../AppUrl'
import Image from 'next/image'
import {  useRouter } from 'next/router';
import { GeneratePrice } from '../common/Helper';

export default function HomeProduct({products}) { 
  
   
    const router = useRouter();  
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

     useEffect(() => {
      setTimeout(()=>{ 
         $('.owl-carousel').owlCarousel({
            items: 6,
            margin: 0,
            nav: false,
            dots: false,
            autoplay: false,
            slideBy: 6,
            autoplayHoverPause: true,
            rewind: true,
            responsive: {
                0: {
                    items: 2
                },
                760: {
                    items: 4
                },
                960: {
                    items: 6
                },
                1170: {
                    items: 6
                }
            }
        });


       },500)
     
       
     }, [])
     
  return (
    <>   
 <div className="container remove_class" style={{"marginTop": "23px","marginBottom": "-70px"}}>
     {products.map((product_row,index)=>{

    return (<>
    
    <div className="category-tabs" style={{"marginTop": "-9px","marginLeft": "-14px"}}>
       <Link href={`/${product_row[0].category_name}`}  ><a className="parent homparent">{product_row[0].category_title}</a></Link>
    </div>
    <div id="demos" className="row">
       <div className="large-12 columns">
          <div className="owl-carousel owl-theme owl-loaded owl-drag">
             <div className="owl-stage-outer">
                <div className="owl-stage"  > 
                {product_row.map((product,index2)=>
                   <div  key={index2} className="owl-item " 
                   onClick={()=>{router.push(`/products/${product.product_name}`) }}
                     >
                      <div  style={{background:"white",cursor:"pointer"}} className="item pro-box">
                         <div className="pboxall">                    
                         <Image
                                src={`${WEBSITEURL+product.featured_image}`}
                                alt={`${product.product_title}`}
                                width={200}
                                height={200}
                                
                             />
                 <div className="pro-desc">
                               <div className="pro-name"> 
                                <a  
                                 onClick={()=>{router.push(`/products/${product.product_name}`) }} >{product.product_title.substring(0, 25)}
                               </a> 
                               </div>
                                <div  className="clearfix">
                                  <div  style={{"marginBottom":"-1px"}} className="price bn">
                                   <GeneratePrice sell_price={product.sell_price} discount_price={product.discount_price} discount_type={product.discount_type} />
                                  </div>
                             
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
