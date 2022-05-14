import Image from 'next/image';
import { WEBSITEURL } from '../AppUrl';

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
                 <Image src={`${WEBSITEURL+"images/free-shipping.png"}`} alt="dhaka Bazar"    width={100}
                                height={54}   />
                <div className="text">
                   <strong>Free Home Delivery</strong> 
                   <p>On Order Over ৳10000</p>
                </div>
             </div>
          </div>
          <div className="col-sm-4">
             <div className="boxinner item2">
             <Image   src={`${WEBSITEURL+"images/secured-payment.png"}`}    width={100}
                                height={54}   alt="dhaka Bazar"/>
                 <div className="text">
                   <strong>100% Secure Payment</strong> 
                   <p>bKash, uCash, Dutch Bangla Bank </p>
                </div>
             </div>
          </div>
          <div className="col-sm-4">
             <div className="boxinner item3">
             <Image    width={100}
                                height={54}    src={`${WEBSITEURL+"images/cash-on-delivery.png"}`} alt="dhaka Bazar" />

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
