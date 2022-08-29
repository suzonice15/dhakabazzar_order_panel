import React,{useContext,useState } from 'react'
 import { DataContext } from '../../store/GlobalState';
 import Link from 'next/link'
 import {  useRouter } from 'next/router';
 import Image from 'next/image';
 export default function HeaderNavBar() {    
 const {menuCategoryList}=useContext(DataContext);
 const [menuShow,setMenuShow]=useState(false);
 const router = useRouter(); 
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
       <div className="list_all"> 
       <li className="blazer"><Link href={`/allProduct`}>All Products</Link> </li>
       {menuCategoryList.map((cat_1,index_1)=>                 
         
          <li  key={index_1} className="winter-collection">
             <a onClick={()=>{router.push(`/${cat_1.category_name}`) }} >
             <Image
                                src={"https://www.dhakabaazar.com/uploads/22-08-2019-02-06-16-22-08-2019-10-19-41-brand-quartz-watch-luxury-creative-waterproof-date-casual-men-watches-relogio-masculino--3360n-min-150x150.jpg"}
                                alt="Single Dhaka"
                                width={100}
                                height={100}
                                                                
                             />
                
                 {cat_1.category_title}
                <p className="dropdown_indicator"><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></p>
             </a>
             <div className="dropdown-menu">
                <ul className="parentcat">
                   {cat_1.sub.map((cat_2,index_2)=>{
                   if((typeof cat_2.child === 'object' && Object.keys(cat_2.child).length > 0) && menuShow){
                 return (
                 <li onClick={()=>setMenuShow(false)}  key={index_2} className="jacket">
                      <Link href={`/${cat_2.category_name}`}>{cat_2.category_title}</Link> 
                      <ul className="childcat">
                      {cat_2.child.map((cat_3,index_3)=>
                         <li onClick={()=>setMenuShow(false)}  key={index_3} className="Denim"><Link href={`/${cat_3.category_name}`}>{cat_3.category_title}</Link></li>
                      )}
                        </ul>
                   </li>
                 )
                   }else{
                     return  <li onClick={()=>setMenuShow(false)}  key={index_2}  className="blazer"><Link href={`/${cat_2.category_name}`}>{cat_2.category_title}</Link> </li>

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
