import React,{useState,useEffect,useContext } from 'react'
 import { DataContext } from '../../store/GlobalState';
 import Link from 'next/link'
import { WEBSITEURL } from '../AppUrl';
import Image from 'next/image'
import { useRouter } from 'next/router'; 
export default function LogoPart() {  

 const {menuCategoryList,cart}=useContext(DataContext);
 const router=useRouter();  
  return (   
    <div className="row">
    <div className="col-sm-3 logo-area">
       <div className="logo" style={{cursor:"pointer"}}> 
       <Link href={`/`}>
             <Image
              src={`${WEBSITEURL}uploads/logogif.gif`} 
                                           
               width={157}
               height={40}
               alt="Dhaka Bazar"  
               />
       </Link>
            </div>
    </div>
    <div className="col-sm-9">
       <div className="row row5">
          <div className="col-sm-5 others pull-right">
             <div className="pull-right"> 
                <div className="hotline"> 
                 <Image
              src={`${WEBSITEURL}images/phone.gif`} 
                                           
               width={30}
               height={30}
               alt="Dhaka Bazar"  
               />

                <a href="tel: +8801970778457">+8801750445553</a> </div>
                <div className="hidden-xs hidden-sm" style={{marginTop:'9px'}}>
                <Link href={`/trackorder`}>
                <a > <span className="glyphicon glyphicon-search"></span>
                       Track Order</a>
                       </Link>
                 </div>
                <div   style={{marginTop:'9px'}} className="cartbtn crtb">
                <Link href={`/cart`}>
                   <a   className="cart-button"> <div className="items">
                   <span className="glyphicon glyphicon-shopping-cart"> 
                   {cart.length > 0 && <div className="itemcount item_1"> 
                   <span className="itemno">{cart.length }</span> 
                   </div> }
                   </span>   

                   </div>
                   </a>
                  
                   </Link>
                </div>
                <div className="wishlistbtn">                                
                </div>
             </div>
          </div>
          <div className="col-sm-7 search-area">
             <form   method="get"> 
             <input
              onChange={(e)=>{
               let search=e.target.value;
               if(search.trim().length >0){
               router.push(`/search/${search}`)
               }else{
                  router.push(`/`)
               }
            } }

             type="text" name="q" id="search_query2" placeholder="Search for products..." />
              <button type="button"><span className="glyphicon glyphicon-search"></span></button> 
              </form>
          </div>
       </div>
    </div>
 </div>
  )
}
