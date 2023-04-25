 
 import React ,{ useEffect ,useState}from 'react'
 import axios from 'axios'
  import {  useRouter } from 'next/router';
  import ProductImage from '../../components/product/productImage'
  import ProductPrice from '../../components/product/productprice'
  import RelatedProduct from '../../components/product/relatedProduct'
  import HotDealProduct from '../../components/product/hotDeal'
  import ProductDescription from '../../components/product/productDescription'
import { api_base_url, WEBSITEURL } from '../../components/AppUrl';
import ProductRightCategory from '../../components/product/productRightCategory';

export default function SingleProduct() {

  let router=useRouter();
   let parmalink=router.query.product_name;
   const [featured_image_data,setFeaturedImage]=useState("")
   const [categories,setCategory]=useState({})
   const [productInfo,setProduct]=useState({
         product_row:{},
         relatedProducts:[],
         hotProducts:[],
         image:[],
          
   }) 

   useEffect(() => {         
      let product_url=api_base_url+"product/"+parmalink;   
      axios.get(product_url).then(response=>{  
       setFeaturedImage(WEBSITEURL+response.data.original.product.featured_image)
       let updatedState={...productInfo}       
       updatedState.product_row=response.data.original.product;
       updatedState.relatedProducts=response.data.original.related_product;
       updatedState.hotProducts=response.data.original.hot_product;
       updatedState.image=response.data.original.image;      
        setProduct(updatedState)
        setCategory(response.data.original.product_right_category)      
        }).catch(error => {         
         console.log("product_error",error)                
      }) 
   },[parmalink,productInfo])

   const feturedImageUpdate=image=>{
      setFeaturedImage(image)
   }

  return ( 

   <section id="mpart" className="singleproduct remove_class" style={{marginTop:100}}   >
   <div className="container">
      <div className="row mt40">
         <div className="col-sm-12">
            <div className="row">
               {featured_image_data.length > 0 && <ProductImage  image={productInfo.image}
                                                      feturedImageUpdate={feturedImageUpdate} 
                                                      featured_image={featured_image_data}
                                                    /> }

              <ProductPrice  product={productInfo.product_row} />
              {typeof categories !='undefined' && 
            <ProductRightCategory   categories={categories} /> }
            
            </div>
         </div>
      </div>
     
     <ProductDescription />
     <RelatedProduct  relatedProducts={productInfo.relatedProducts}/>
     <HotDealProduct  hotProducts={productInfo.hotProducts} />  
 
   
   </div>
</section>
                  )
                  }
                 