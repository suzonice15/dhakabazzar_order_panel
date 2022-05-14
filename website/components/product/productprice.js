 
export default function Productprice({product}) {
  return (
    <> <div className="col-sm-5 mt40column">
                  <h1 className="headinglefttitle">{product.product_title}</h1>
                  <p className="sku">Product Code: {product.sku}</p>
                  <div className="price-and-cart">
                     <div className="prices">
                        <div className="addreview"> 
                            <a className="clkaddreview" >Write a Review</a> 
                        </div>
                        <span className="bn">৳ 1,199.00</span> 
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
                  <div className="phone-order bn">
                     <a style={{"color":"red","fontSize":"17px"}} href="tel: +8801750-445553"> ☎ 01750-445553 </a> 
                     <a style={{"color":"red","fontSize":"17px"}}  href="tel: +8801916-524306">☎ 01916-524306</a>
                      <a style={{"color":"red","fontSize":"17px"}}  href="tel: +8801784-472014">☎ 01784-472014</a> 
                      <a style={{"color":"red","fontSize":"17px"}}  href="tel: +8801797-313046">☎ 01797-313046</a> 
                     <div className="imowhatsapp">
                        <a href="https://api.whatsapp.com/send?phone=8801970778457"   
                        onClick="window.open('https://api.whatsapp.com/send?phone=8801970778457"> 
                        <img style={{"width":"42px","background":"#ededed"}} src="https://www.dhakabaazar.com/images/social/wa.svg.webp" alt="LinkedInShare" /> +8801970778457 
                        </a> 
                        <a> 
                         <img style={{"width":"42px","background":"#ededed"}} 
                         src="https://dummytech.com/wp-content/uploads/2017/12/imo-logo.jpg" 
                         alt="LinkedInShare" /> 
                         +8801970778457
                         </a> 
                     </div>
                  </div>
               </div>
               <div className="col-sm-3 col-optional">
                  <div className="vertical-menu"> 
                  <a className="active"  href="https://www.dhakabaazar.com/kitchen-dining"> Kitchen &amp; Dining </a>
                   <a   href="https://www.dhakabaazar.com/slicer-cutter">Slicer &amp; Cutter </a>
                </div>
               </div>
    </>
  )
}
