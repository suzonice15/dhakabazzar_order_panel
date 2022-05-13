import React,{ createContext, useReducer, useEffect, useState } from 'react'
import axios from 'axios'
import { api_base_url ,base_url} from '../components/AppUrl' 
export const DataContext = createContext() 
export const DataProvider = ({children}) => { 
     const [menuCategoryList,setMenuCategoryList]=useState([])  
     const [sliders,setSlider]=useState([])  
     const [sliderBottomCategory,setSliderBottomCategory]=useState([])  

    useEffect(() => { 
        deleteItems();  

        getMenu();   
        getSlider();        
        getSliderBottom();     
   
    },[])



    const getSliderBottom=()=>{     
        let local_sliders_bottom_cat=  JSON.parse(localStorage.getItem('local_slider_bottom_category'));
        if(local_sliders_bottom_cat){
            console.log(local_sliders_bottom_cat)
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
        <DataContext.Provider value={{sliderBottomCategory,menuCategoryList,sliders}}>
            {children}
        </DataContext.Provider>
    )
}