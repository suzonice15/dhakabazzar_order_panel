import React,{ createContext, useReducer, useEffect, useState } from 'react'
import { api_base_url } from '../components/AppUrl';
import Slider from '../components/home/slider';
import SliderBottom from '../components/home/sliderBottom';
import HomeProduct from '../components/home/homeProduct';
import axios from 'axios'
   
export default function Home() { 
   const [products,setProduct]=useState([]) 
   useEffect(() => {         
      getCategory(); 
   },[])

   const getCategory=()=>{     
      //     let local_sliders_bottom_cat=  JSON.parse(localStorage.getItem('local_slider_bottom_category'));
      //     if(local_sliders_bottom_cat){
      //         console.log(local_sliders_bottom_cat)
      //         setSliderBottomCategory(local_sliders_bottom_cat)         
      //    }else{
             let menu_category_url=api_base_url+"homeCategoryProducts";   
             axios.get(menu_category_url).then(response=>{                   
              setProduct(response.data)
                // localStorage.setItem("local_slider_bottom_category",JSON.stringify(response.data));
              }).catch(error => {
                  setProduct([])
                console.log("slider_api_error",error)                
             })  
  
         //}
         } 
  return (
    <>  
  <Slider /> 
  <SliderBottom />
  <HomeProduct products={products} /> 
    </>
  )
}
