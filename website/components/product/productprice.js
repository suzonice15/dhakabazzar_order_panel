import react,{memo} from "react";
import { WEBSITEURL } from "../AppUrl";
import { GenerateSinglePrice } from "../common/Helper";
import Image from 'next/image'
import {  useRouter } from 'next/router';
 
 
function Productprice({product}) {
   const router=useRouter();
   const phoneImageUrl=WEBSITEURL+'images/phone-order-bg.png';

  return (
    <>     
    <div className="col-sm-5 mt40column">
                  <h1 className="headinglefttitle">{product.product_title}</h1>
                  <p className="sku">Product Code: {product.sku}</p>
                  <div className="price-and-cart">
                     <div className="prices">
                        {/* <div className="addreview"> 
                            <a className="clkaddreview" >Write a Review</a> 
                        </div> */}
                        <GenerateSinglePrice sell_price={product.sell_price} discount_price={product.discount_price} discount_type={product.discount_type} />

                     </div>                      
                     <div className="prices">
                        <form action="" method="POST" id="" encType="multipart/form-data">
                          
                           <div className="btns">
                              <div className="cell-qty text-center">
                                 <div className="input-group">
                                    <div className="input-group-btn"> 
                                    <button type="button" id="btnMinus" className="btn btn-gray minus">-</button> 
                                    </div>
                                    <div className="quantity">
                                    <input  onChange={(e)=>console.log(e)} type="text" name="product_qty" id="product_qty" value="1" className="input-text qty text" width="25" /> 
                                         </div>
                                    <div className="input-group-btn">
                                        <button type="button" id="btnPlus" className="btn btn-gray plus">+</button> 
                                        </div>
                                 </div>
                              </div>
                           </div>

                        </form>
                     </div>
                  </div>
                  <div className="phone-order bn" style={{"background":`url(${phoneImageUrl}) no-repeat left`,"width":"100%","height":"60px","backgroundSize":"300px auto","paddingTop":"27px","paddingLeft":"71px","fontSize":"20px","fontWeight":"bold","color":"#ef3f23","paddingBottom":"15px","marginBottom":"15px"}}>

                     <a style={{"color":"red","fontSize":"17px"}} href="tel: +8801750-445553"> ☎ 01750-445553 </a> 
                     <a style={{"color":"red","fontSize":"17px"}}  href="tel: +8801916-524306">☎ 01916-524306</a>
                      <a style={{"color":"red","fontSize":"17px"}}  href="tel: +8801784-472014">☎ 01784-472014</a> 
                      <a style={{"color":"red","fontSize":"17px"}}  href="tel: +8801797-313046">☎ 01797-313046</a> 
                       <div className="imowhatsapp">
                        <a    
                        onClick={()=>router.push(`https://api.whatsapp.com/send?phone=8801970778457`)}>
                     <Image
                           style={{"background":"#ededed"}}  
                           src={`${WEBSITEURL}images/social/wa.svg.webp`}
                           alt="LinkedInShare"
                           width={35}
                           height={35}
                         />
                          <span style={{"position":"relative","top":"-10px"}}>  +8801970778457 </span> 
                        </a> 
                        <a> 
                         
                         <Image
                           style={{"background":"#ededed"}}  
                           src={`${WEBSITEURL}images/imo-logo.jpg`}
                           alt="LinkedInShare"
                           width={35}
                           height={35}
                         />
                      <span style={{"position":"relative","top":"-10px"}}>  +8801970778457 </span>

                        
                         </a> 
                     </div>  
                  </div>
               </div>
              
    </>
  )
}
export default memo(Productprice)
