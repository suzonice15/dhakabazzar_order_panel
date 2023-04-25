import React,{useContext,useState,useEffect  } from 'react'
 import { DataContext } from '../../store/GlobalState';
 import Link from 'next/link'
 import {  useRouter } from 'next/router';
 import Image from 'next/image';
 export default function HeaderNavBar() {    
 const {menuCategoryList}=useContext(DataContext);
  const router = useRouter(); 

  const [display,setDisplay]=useState("displayBlock");
 
  const [windowSize, setWindowSize] = useState({
   width: global?.window && window.innerWidth ,
   
 });
  const menuHideByClick=()=>{ 
   if(windowSize.width < 776) {

   setDisplay("displayNone")
    setTimeout(()=>{setDisplay("displayBlock")},2500)
   }

 }
 const FathermenuHideByClick=()=>{ 
 
   if(windowSize.width < 776) {
   setDisplay("displayNone")
    setTimeout(()=>{setDisplay("displayBlock")},2500)
   }

 }

 useEffect(() => {
   window.onresize = () => {
     setWindowSize({
       width: window.innerWidth,
     
     });
   };
 }, []);
 
   return (   
    <div className="category-menu">
    <a   className="view-all-cats">
       <span className="glyphicon glyphicon-menu-hamburger cat_span_bar"></span>
       <h5 className="Categories_heading">Categories</h5>
    </a>
    <ul className="catnavul">
       <a   className="close_category_menu">
          <button type="button" className="close" aria-label="Close"> 
          <span className="z_close_btn" aria-hidden="true">×</span> </button></a>
       <div  className={`list_all ${display}`}> 
       <li className="blazer" onClick={()=>FathermenuHideByClick()} ><Link href={`/allProduct`}>All Products</Link> </li>
       {menuCategoryList.map((cat_1,index_1)=>                 
         
          <li  key={index_1} className="winter-collection">
             <a    onClick={()=>{FathermenuHideByClick();router.push(`/${cat_1.category_name}`) }} >
             <Image
                                src={"https://www.dhakabaazar.com/uploads/22-08-2019-02-06-16-22-08-2019-10-19-41-brand-quartz-watch-luxury-creative-waterproof-date-casual-men-watches-relogio-masculino--3360n-min-150x150.jpg"}
                                alt="Single Dhaka"
                                width={15}
                                height={15}
                                                                
                             />
                
                 {cat_1.category_title}
                <p className="dropdown_indicator"><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></p>
             </a>
             <div  className={`dropdown-menu ${display}`}>
                <ul  className={`parentcat ${display}`}>
                   {cat_1.sub.map((cat_2,index_2)=>{
                   if((typeof cat_2.child === 'object' && Object.keys(cat_2.child).length > 0) ){
                 return (
                 <li onClick={()=>menuHideByClick()}  key={index_2} className="jacket ">
                      <Link href={`/${cat_2.category_name}`}>{cat_2.category_title}</Link> 
                      <ul className="childcat">
                      {cat_2.child.map((cat_3,index_3)=>
                         <li onClick={()=>menuHideByClick()}  key={index_3} className="Denim"><Link href={`/${cat_3.category_name}`}>{cat_3.category_title}</Link></li>
                      )}
                        </ul>
                   </li>
                 )
                   }else{
                     return  <li onClick={()=>menuHideByClick()}  key={index_2}  className="blazer"><Link href={`/${cat_2.category_name}`}>{cat_2.category_title}</Link> </li>

                   } 
               })}
                </ul>

             </div>

          </li>
             )}
          </div>
    </ul>
 </div>
  )
}
