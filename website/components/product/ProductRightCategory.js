import React from 'react'
import Link from 'next/link'

export default function ProductRightCategory({categories}) {
    let length=Object.keys(categories).length;
    if(length==0){
        return null 
    }else{
   
  return (
    <>
      <div className="col-sm-3 col-optional"> 
 
                  <div className="vertical-menu"> 
                 
                  <Link href={`/${categories.category_name}`}><a key={categories.category_name} className="active"> 
                 {categories.category_title}  </a></Link> 
                    {categories.category.map((cat_1,index)=>
                    <Link key={index} href={`/${cat_1.category_name}`}>{cat_1.category_title}</Link>  
                    )} 
                </div>   

               </div> 
        
    </>
  )
            }
}
