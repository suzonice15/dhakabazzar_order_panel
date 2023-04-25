import react ,{memo,useEffect} from 'react'
 import { WEBSITEURL } from '../AppUrl'
  import Image from 'next/image'

const ProductImage=({featured_image,image,feturedImageUpdate})=> {
    const hasWindow = typeof window !== 'undefined';
      const width = hasWindow ? window.innerWidth : null;
    
    useEffect(()=>{
       setTimeout(()=>{      
         $('.bxslider').bxSlider({
            mode: 'horizontal',
            moveSlides: 1,
            slideMargin: 0,
            infiniteLoop: true,
            slideWidth:200,
            minSlides: 6,
            maxSlides: 6,
            speed: 800,
            pager: false,
         });
         $('#lightSlider').lightSlider({
            gallery: true,
            item: 1,
            loop:true,
            slideMargin: 0,
            thumbItem: 9
        });         

       },500)
     
   },[featured_image])
  
  return (
    <>
     
    { (width > 800 && featured_image.length > 0) ? 
         <div id="desktop_picture" className="col-sm-4 images">
               <Image src={`${featured_image}`} width={800} height={800} alt="Dhaka bazar" />
                  {image.length > 3 ?
                  <ul className="bxslider">
                     <li><a href="javascript:void(0)" className="elevatezoom-gallery">
                                 {/* <img  onClick={()=>feturedImageUpdate(featured_image)} src={`${featured_image}`} width="100" /> */}
                                 <Image  src={`${featured_image}`}
                                 onClick={()=>feturedImageUpdate(featured_image)} 
                                 width={800}
                                 height={800}
                                 alt ="Product Image"
                                 />
                           </a>
							 </li> 
                    {image.map((image_row,index)=>                  
                       <li key={index}>								
								 <a  className="elevatezoom-gallery">
                         <img onClick={()=>feturedImageUpdate(WEBSITEURL+image_row.media_path)} 
                         src={`${WEBSITEURL+image_row.media_path}`} width="100"  alt="Single Dhaka" />
                         </a>
							</li> 
                        )}
						</ul>
                  :
                  <div id="gallery_09" style={{maxWidth:'1200px'}}> 
                    <a   className="elevatezoom-gallery">
                      <img onClick={()=>feturedImageUpdate(featured_image)} 
                      src={`${featured_image}`} width="200" alt="Single Dhaka" />
                     </a>
                  {image.length > 0 ?
                     image.map((image_row,index)=>    
                  <a  key={index}  className="elevatezoom-gallery">
                      <img onClick={()=>feturedImageUpdate(WEBSITEURL+image_row.media_path)}
                       src={`${WEBSITEURL+image_row.media_path}`} width="200"  alt="Single Dhaka"/>
                     </a>
                     ) :null }
                     </div>
                  }	 
               </div>: 
               <div id="mobile_picture" className="col-sm-4 images" >
                  <div className="demo">
                  <ul id="lightSlider">
                        <li data-thumb={`${featured_image}`} >                             
                              <Image
                               src={`${featured_image}`} 
                                alt="Single Dhaka"
                                width={800}
                                height={800}                                
                             />
                        </li>
                   {image.length > 0 ?
                           image.map((image_row,index)=>  
                           <li key={index} data-thumb={`${WEBSITEURL+image_row.media_path}`}>                          
                             <Image
                                src={`${WEBSITEURL+image_row.media_path}`} 
                                alt="Single Dhaka"
                                width={800}
                                height={800}                                
                             />
                           </li>
                     ) :null }
                                   
                      </ul>
                  </div>
               </div> 
               
               }
    </>
  )
}
export default memo(ProductImage);
