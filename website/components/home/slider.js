import React,{useContext } from 'react'
 import { DataContext } from '../../store/GlobalState';
  import {  useRouter } from 'next/router';
import { WEBSITEURL } from '../AppUrl';

export default function Slider() {    
 const {sliders}=useContext(DataContext);
 const router = useRouter(); 
  return (   
    <section id="content" className="main desktop">
    <div className="container">
       <div className="row">           
          <div className="col-md-12 col-xs-12 remove_class maincnt">
             <section className="banner-slider">
                <div className="innerbox">
                   <div id="bannerSlider" className="carousel slide" data-ride="carousel">
                      <div className="carousel-inner" role="listbox">
                          {sliders.map((slider,index)=>
                         <div key={index} className={`${index==0 ? "item active" :"item"}`}> <img src={`${WEBSITEURL+slider.homeslider_banner}`} alt="Dhaka Image Slider" /> </div>
                          )}
                            <ol className="carousel-indicators">    
                            {sliders.map((slider,index)=>                    
                            <li key={index} data-target="#bannerSlider" data-slide-to={`${++index}`} className={`${index==0 ? "active" :""}`}>&nbsp;</li>
                            )} 
                         </ol>
                      </div>
                   </div>
                </div>
             </section>
           </div>
       </div>
    </div>
 </section>
  )
}
