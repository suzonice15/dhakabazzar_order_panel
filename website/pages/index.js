import React,{  useContext, useEffect, useState } from 'react'
import { api_base_url } from '../components/AppUrl';
import Slider from '../components/home/slider';
import SliderBottom from '../components/home/sliderBottom';
import HomeProduct from '../components/home/homeProduct';
import axios from 'axios'
import { DataContext } from '../store/GlobalState';
   
export default function Home() { 
   const [products,setProduct]=useState([]) 
   useEffect(() => {         
     
    let menu_category_url=api_base_url+"homeCategoryProducts";   
    axios.get(menu_category_url).then(response=>{                   
     setProduct(response.data.products)
     
     }).catch(error => {
         setProduct([])
       console.log("slider_api_error",error)                
    })  
   },[])

   const {carts}=useContext(DataContext);
   console.log(carts)

  return (
    <>  
  <Slider /> 
  <SliderBottom />
  <HomeProduct products={products} /> 
    </>
  )
}
