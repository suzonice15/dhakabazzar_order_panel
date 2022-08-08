import React,{ createContext, useReducer, useEffect, useState } from 'react'
import axios from 'axios'
import { api_base_url ,base_url, WEBSITEURL} from '../components/AppUrl' 

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';   
export const DataContext = createContext() 
import { useRouter } from 'next/router' 

export const DataProvider = ({children}) => { 
    const router = useRouter()
 
     const [cart,setCart]=useState([])  
     const [menuCategoryList,setMenuCategoryList]=useState([])  
     const [sliders,setSlider]=useState([])  
     const [sliderBottomCategory,setSliderBottomCategory]=useState([])  
 
    useEffect(() => { 
      //  deleteItems();  
        getMenu();   
        getSlider();        
        getSliderBottom(); 
    },[])

    useEffect(() => { 
        getCart(); 
     },[])   

    const getSliderBottom=()=>{     
        let local_sliders_bottom_cat=  JSON.parse(localStorage.getItem('local_slider_bottom_category'));
        if(local_sliders_bottom_cat){            
            setSliderBottomCategory(local_sliders_bottom_cat)         
       }else{
           let menu_category_url=api_base_url+"homeCategory";   
           axios.get(menu_category_url).then(response=>{        
            setSliderBottomCategory(response.data)
               localStorage.setItem("local_slider_bottom_category",JSON.stringify(response.data));
            }).catch(error => {
                setSliderBottomCategory([])
              console.log("slider_api_error",error)                
           })  
       }
       } 

       
function AddToCart(product_id,product_title,sku,picture,price) {
    
    const index = cart.findIndex((item) => item.product_id ===product_id)
    // if (index !== -1) {
    //     alert("Product Exist"); return false; 
    // }
    let cart_data={}
    cart_data.product_id=product_id
    cart_data.product_title=product_title
    cart_data.sku=sku
    cart_data.picture=WEBSITEURL+picture
    cart_data.quantity=1    
    cart_data.price=price    
    setCart(oldArray => 
        [...oldArray,cart_data]
    );
    toast.success(product_title + " Added to your cart", {autoClose:3000,  position: toast.POSITION.BOTTOM_CENTER})
    
    localStorage.setItem("set_cart_data",JSON.stringify([...cart,cart_data])); 
    router.push('/cart')
    
  }

function getCart() {
    
    let set_cart_data=  JSON.parse(localStorage.getItem('set_cart_data'));
    if(set_cart_data){
       setCart(set_cart_data)         
   }
  }

function deleteItems() {
    localStorage.clear();
  }
       

    const getSlider=()=>{     
     let local_sliders=  JSON.parse(localStorage.getItem('local_sliders'));
     if(local_sliders){
         setSlider(local_sliders)         
    }else{
        let menu_category_url=api_base_url+"sliders";   
        axios.get(menu_category_url).then(response=>{        
            setSlider(response.data)
            localStorage.setItem("local_sliders",JSON.stringify(response.data));
         }).catch(error => {
            setSlider([])
           console.log("slider_api_error",error)                
        })  
    }
    }   

    const getMenu=()=>{
        let menu_category_url=api_base_url+"menuList";   
        axios.get(menu_category_url).then(response=>{        
           setMenuCategoryList(response.data)
         }).catch(error => {
           setMenuCategoryList([])
           console.log("menu_api_error",error)                
        })   
    }
    
  
    return(
        <DataContext.Provider value={{sliderBottomCategory,menuCategoryList,sliders,cart,setCart,AddToCart}}>
            {children}
            <ToastContainer />
        </DataContext.Provider>
    )
}