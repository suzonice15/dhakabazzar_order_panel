import React from 'react'

export default function ProductDescription() {
  return (
    <>
         <div className="productdesc">
         <ul className="nav nav-tabs" id="myTab">
            <li className="description active"> <a href="#description">Description</a> </li>
            <li className="terms"> <a href="#terms">Terms &amp; Conditions</a> </li>
            <li className="review"> <a href="#review">Review Ratings</a> </li>
         </ul>
         <div className="tab-content">
            <div className="tab-pane active" id="description">
               <div className="tabbox-container"> 
               {/* <img src="http://www.dhakabaazar.com/uploads/cutter-mavhine-2606.1-min.jpg"   /> */}
                </div>
            </div>
            <div className="tab-pane" id="terms">
               <div className="tabbox-container">
                  <li>আমরা সারা বাংলাদেশে আপনার (নিকটস্থ) এস এ পরিবহন, জননী, সুন্দরবন ও করোতোয়া কুরিয়ারের মাধ্যমে ডেলিভারি করে থাকি।</li>
                  <li>পণ্যর সম্পূর্ণ মূল্য অথবা কুরিয়ার চার্জ 120 টাকা, আপনাকে অগ্রিম প্রদান করতে হবে।</li>
                  <li>অবশিষ্ট মূল্য কুরিয়ার অফিস থেকে পণ্য নেওয়ার সময়, কুরিয়ার আফিসে পেমেন্ট করতে হবে।</li>
                  <li>ঢাকার মধ্যে হোম ডেলিভারি চার্জ 70 টাকা, ঢাকার বাইরে 130 টাকা।</li>
                  <li>পন্যের কোয়ালিটি যাচাই করতে চাইলে আমাদের অফিসে চলে আসুন।</li>
                  <li>Call For Order 01750445553</li>
               </div>
            </div>
            <div className="tab-pane" id="review">
               <div className="row reviews">
                  <div className="col-sm-3 review-left">
                     <div className="rating-overall">
                        <div>
                           5 stars
                           <div className="track"><span style={{width:'80%'}}></span></div>
                           (0)
                        </div>
                        <div>
                           4 stars
                           <div className="track"><span style={{width:'60%'}}></span></div>
                           (0)
                        </div>
                        <div>
                           3 stars
                           <div className="track"><span style={{width:'40%'}}></span></div>
                           (0)
                        </div>
                        <div>
                           2 stars
                           <div className="track"><span style={{width:'20%'}}></span></div>
                           (&lt;0)
                        </div>
                        <div>
                           1 star
                           <div className="track one-star"><span style={{width:'5%'}}></span></div>
                           (0)
                        </div>
                     </div>
                     <h3 className="heading3 mt30">Write a Review</h3>
                     <fieldset className="field field-rating srating"> <input type="radio" id="star5" name="rating" value="5" /> <label className="full" htmlFor="star5" title="5 stars"></label> 
                     <input type="radio" id="star4" name="rating" value="4" /> <label className="full" htmlFor="star4" title="4 stars"></label> <input type="radio" id="star3" name="rating" value="3" /> <label className="full" htmlFor="star3" title="3 stars"></label> <input type="radio" id="star2" name="rating" value="2" /> <label className="full" htmlFor="star2" title="2 stars"></label> <input type="radio" id="star1" name="rating" value="1" /> <label className="full" htmlFor="star1" title="1 star"></label> </fieldset>
                     <div className="form-group"> <input type="text" name="name" className="form-control field field-name" placeholder="Name" /> </div>
                     <div className="form-group"> <input type="text" name="email" className="form-control field field-email" placeholder="Email" /> </div>
                     <div className="form-group"> <textarea rows="3" name="comment" className="form-control field field-comment" placeholder="Comments"></textarea> </div>
                      <p id="review_message"></p>
                     <button type="button" id="reviewbtn" className="btn btn-new form-control">continue</button>  
                  </div>
                  <div className="col-sm-9 review-right">
                     <div className="rating-overall-desc">
                        <div className="rating"><span style={{width:'80%'}}></span></div>
                     </div>
                     <br />
                     <h4>No reviews found!</h4>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </>
  )
}
