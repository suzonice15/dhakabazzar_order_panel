import React ,{useContext} from 'react'
 import { DataContext } from '../../store/GlobalState';
import { WEBSITEURL } from '../AppUrl';
import Link from 'next/link';
import Image from 'next/image'

export default function SliderBottom() {
    const {sliderBottomCategory}=useContext(DataContext);

  return (
    <div className="container remove_class " style={{"backgroundColor": "#f2f2f2"}}>
    <div className="row" style={{"marginTop": "21px",cursor:"pointer"}}>
         
        {sliderBottomCategory.map((category,index)=>
       <div  key={index} style={{"backgroundColor":"rgb(255, 255, 255)","padding":"5px","border":"1px solid #ddd","textAlign":"center"}} className="col-md-1 col-sm-4 col-xs-4">
           <Link href={`/${category.category_name}`}>
                <Image  src={`${WEBSITEURL+category.media_path}`} 
                                width={100}
                                height={100} 
                                alt={`${category.category_title}`}
                                 
                             />
           </Link>
          <h4 style={{"fontSize":"12px","textAlign":"center"}}>{category.category_title}</h4>
       </div>
      
       )}
        
    </div>
 </div>
  )
}
