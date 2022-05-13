import React ,{useContext} from 'react'
 import { DataContext } from '../../store/GlobalState';
import { WEBSITEURL } from '../AppUrl';
import Link from 'next/link';

export default function sliderBottom() {
    const {sliderBottomCategory}=useContext(DataContext);

  return (
    <div className="container remove_class " style={{"backgroundColor": "white"}}>
    <div className="row" style={{"marginTop": "21px"}}>
        {sliderBottomCategory.map((category,index)=>
       <div className="col-md-1 col-sm-3 col-xs-3">
           <Link href={`/category/${category.category_name}`}><img className="img-responsive" src={`${WEBSITEURL+category.media_path}`} /></Link>
          <h4 style={{"fontSize":"12px","padding":"3px 4px","textAlign":"center"}}>{category.category_title}</h4>
       </div>
       )}
    </div>
 </div>
  )
}
