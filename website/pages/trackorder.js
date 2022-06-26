import React,{  useContext, useEffect, useState } from 'react'
import { api_base_url } from '../components/AppUrl';
import axios from 'axios'
import { DataContext } from '../store/GlobalState';
   
export default function TrackOrder() { 
    const {cart,setCart}=useContext(DataContext); 
     
 
  return (
    <>  
    <div className='container' style={{marginTop:140}}>
    <section id="content" class="aboutpage"> <div class="container"> 
    <div class="row"> <div class="col-sm-3"> 
    <div class="adsbox"> </div> </div> <div class="col-sm-6">
         <div class="subheader"> 
         <ul class="breadcrumb"> <li><h2>
            <a href="https://www.dhakabaazar.com/">Home</a></h2></li>
             <li class="active"><h5>অর্ডার ট্র্যাক করুন</h5></li> </ul> </div> <article class="txt"> 
             <p style={{"boxSizing":"border-box","margin":"0px","padding":"0px","fontFamily":"SolaimanLipi, Helvetica, Verdana, sans-serif !important","textAlign":"justify !important","color":"gray !important"}}>১। পণ্যের ডেলিভারী আপডেট পেতে আপনার Mobile Number নাম্বার দিয়ে অর্ডার ট্র্যাক করুন।</p> <p style={{"boxSizing":"border-box","margin":"0px","padding":"0px","fontFamily":"SolaimanLipi, Helvetica, Verdana, sans-serif !important","textAlign":"justify !important","color":"gray !important"}}>২। আপনার অর্ডার করা পণ্যের ডেলিভারীর বর্তমান অবস্থা জানতে নিম্নের “টেক্সট বক্স” এ Mobile নাম্বার টি প্রদান করুন এবং “ট্র্যাক অর্ডার” বাটনে ক্লিক করুন।</p><hr class="break break30" />
              <form method="post"> 
              <div class="row row5" style={{"marginLeft":"-15px","height":"55px"}}> 
              <div class="col-sm-8 col-xs-12">
                 <div class="form-group">
                     <input type="text" style={{"backgroundColor":"#d1d1db","borderColor":"rebeccapurple","borderRadius":"13px"}} class="form-control" name="mobile_id" placeholder="Enter Mobile Number" /> 
                     </div> </div> 
                     <div class="col-sm-4 col-xs-12">
                         <div class="form-group">
                             <button type="button" id="trackOrder" class="btn btn-primary form-control">Send </button> </div>
                              </div> </div> </form> </article>
                               </div> </div> </div> </section>

    </div>
  
    </>
  )
}
