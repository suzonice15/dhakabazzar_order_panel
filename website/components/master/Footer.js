import Link from 'next/link';

export default function Footer() {
  return (
    <footer> 
        <br/>      
        <br/>      
 <div className="main support-box">
    <section className="container">
       <div className="row">
          <div className="col-sm-4">
             <div className="boxinner">
                <img src="http://dhakabaazar.com/images/free-shipping.png" alt="Free Shipping" /> 
                <div className="text">
                   <strong>Free Home Delivery</strong> 
                   <p>On Order Over ৳10000</p>
                </div>
             </div>
          </div>
          <div className="col-sm-4">
             <div className="boxinner item2">
                <img src="http://dhakabaazar.com/images/secured-payment.png" alt="Secure Payment" /> 
                <div className="text">
                   <strong>100% Secure Payment</strong> 
                   <p>bKash, uCash, Dutch Bangla Bank </p>
                </div>
             </div>
          </div>
          <div className="col-sm-4">
             <div className="boxinner item3">
                <img src="http://dhakabaazar.com/images/cash-on-delivery.png" alt="Cash on Delivery" /> 
                <div className="text">
                   <strong>Cash On Delivery</strong> 
                   <p>Safe &amp; Convenient Shopping</p>
                </div>
             </div>
          </div>
       </div>
    </section>
 </div>
    </footer>
  );
}
