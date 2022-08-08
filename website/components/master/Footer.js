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
                 <Image src={`${WEBSITEURL+"images/free-shipping.png"}`} alt="dhaka Bazar"  
                   width={50}
                   
                   height={50}  
                    />
                <div className="text" style={{"marginTop":"-34px","marginLeft":"42px"}}>
                   <strong>Free Home Delivery</strong> 
                   <p>On Order Over ৳10000</p>
                </div>
             </div>
          </div>
          <div className="col-sm-4">
             <div className="boxinner item2">
             <Image   src={`${WEBSITEURL+"images/secured-payment.png"}`}    width={50}
                                height={50}   alt="dhaka Bazar"/>
                 <div className="text" style={{"marginTop":"-34px","marginLeft":"42px"}}>
                   <strong>100% Secure Payment</strong> 
                   <p>bKash, uCash, Dutch Bangla Bank </p>
                </div>
             </div>
          </div>
          <div className="col-sm-4">
             <div className="boxinner item3">
             <Image    width={50}
                                height={50}    src={`${WEBSITEURL+"images/cash-on-delivery.png"}`} alt="dhaka Bazar" />

                 <div className="text" style={{"marginTop":"-34px","marginLeft":"42px"}}>
                   <strong>Cash On Delivery</strong> 
                   <p>Safe &amp; Convenient Shopping</p>
                </div>
             </div>
          </div>
       </div>
    </section>
 </div>
 <div style={{background:'#24a3b5',color: 'white',fontWeight:'bold',padding:2,}} className='copyright bg-dark text-center' >
 <p style={{verticalAlign:'middle'}}>Copyright 2018</p> 
 </div> 
    </footer>
  );
}
