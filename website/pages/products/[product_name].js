 
 import React ,{ useEffect ,useState}from 'react'
 import axios from 'axios'
  import {  useRouter } from 'next/router';
  import ProductImage from '../../components/product/ProductImage'
  import ProductPrice from '../../components/product/Productprice'
  import RelatedProduct from '../../components/product/RelatedProduct'
  import HotDealProduct from '../../components/product/HotDeal'
  import ProductDescription from '../../components/product/ProductDescription'
import { api_base_url, WEBSITEURL } from '../../components/AppUrl';
import ProductRightCategory from '../../components/product/ProductRightCategory';

export default function Product() {

  let router=useRouter();
   let product_name=router.query.product_name;
   const [featured_image_data,setFeaturedImage]=useState("")
   const [categories,setCategory]=useState({})
   const [product,setProduct]=useState({
         product_row:{},
         relatedProducts:[],
         hotProducts:[],
         image:[],
          
   }) 

   useEffect(() => {         
      let product_url=api_base_url+"product/"+product_name;   
      axios.get(product_url).then(response=>{  
       setFeaturedImage(WEBSITEURL+response.data.original.product.featured_image)
       let updatedState={...product}
       
       updatedState.product_row=response.data.original.product;
       updatedState.relatedProducts=response.data.original.related_product;
       updatedState.hotProducts=response.data.original.hot_product;
       updatedState.image=response.data.original.image;      
        setProduct(updatedState)
        setCategory(response.data.original.product_right_category)
      
        }).catch(error => { 
        //   setProduct([])
         console.log("product_error",error)                
      }) 
   },[product_name])
   const feturedImageUpdate=image=>{
      setFeaturedImage(image)
   }

  return ( 

   <section id="mpart" className="singleproduct remove_class" style={{marginTop:100}}   >
   <div className="container">
      <div className="row mt40">
         <div className="col-sm-12">
            <div className="row">
               {featured_image_data.length > 0 && <ProductImage  image={product.image}
                                                      feturedImageUpdate={feturedImageUpdate} 
                                                      featured_image={featured_image_data}
                                                    /> }

              <ProductPrice  product={product.product_row} />
              {typeof categories !='undefined' && 
            <ProductRightCategory   categories={categories} /> }
            
            </div>
         </div>
      </div>
     
     <ProductDescription />
     <RelatedProduct  relatedProducts={product.relatedProducts}/>
     <HotDealProduct  hotProducts={product.hotProducts} />  
 
   
   </div>
</section>
                  )
                  }
                 