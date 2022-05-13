import React,{useState,useEffect,useContext } from 'react'
 import { DataContext } from '../../store/GlobalState';
 import Link from 'next/link'
 
export default function LogoPart() {    
 const {menuCategoryList}=useContext(DataContext);
  
  return (   
    <div className="row">
    <div className="col-sm-3 logo-area">
       <div className="logo"> 
       <Link href={`/`}>
            <img className="main-logo" src="http://www.dhakabaazar.com/uploads/logogif.gif" alt="Dhaka Bazar" /> 
       </Link>
            </div>
    </div>
    <div className="col-sm-9">
       <div className="row row5">
          <div className="col-sm-5 others pull-right">
             <div className="pull-right">
                <div className="video-tour"> <a href="https://www.youtube.com/channel/UC6hCfmCPjL7Vfj_pUdByNFA/featured?view_as=subscriber"><img src="https://www.dhakabaazar.com/images/video-tour.png" /></a> </div>
                <div className="hotline"> <img src="https://www.dhakabaazar.com/images/phone.gif" alt="#" /> <a href="tel: +8801970778457">+8801750445553</a> </div>
                <div className="hidden-xs hidden-sm" style={{marginTop:'9px'}}><a href="https://www.dhakabaazar.com/trackorder"><span className="glyphicon glyphicon-search"></span> Track Order</a></div>
                <div   style={{marginTop:'9px'}} className="cartbtn crtb">
                   <a   className="cart-button">
                      <div className="items">
                          <div className="itemcount item_0"> <span className="itemno">0</span> </div>
                      </div>
                   </a>
                </div>
                <div className="wishlistbtn">                                
                </div>
             </div>
          </div>
          <div className="col-sm-7 search-area">
             <form action="#" method="get"> 
             <input type="search" name="q" id="search_query2" placeholder="Search for products..." /> <button><span className="glyphicon glyphicon-search"></span></button> </form>
          </div>
       </div>
    </div>
 </div>
  )
}
