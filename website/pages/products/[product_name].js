 
 import React ,{ useEffect ,useState}from 'react'
 import axios from 'axios'
  import {  useRouter } from 'next/router';
  import ProductImage from '../../components/product/productImage'
  import ProductPrice from '../../components/product/ProductPrice'
  import RelatedProduct from '../../components/product/relatedProduct'
  import HotDealProduct from '../../components/product/hotDeal'
  import ProductDescription from '../../components/product/productDescription'
import { api_base_url, WEBSITEURL } from '../../components/AppUrl';

export default function Product() {

  let router=useRouter();
   let product_name=router.query.product_name;
   const [featured_image_data,setFeaturedImage]=useState("")
   const [product,setProduct]=useState({
         product:{},
         relatedProducts:[],
         hotProducts:[],
         image:[]
   }) 

   useEffect(() => {         
      getProduct(); 
   },[product_name])
   const feturedImageUpdate=image=>{
      setFeaturedImage(image)
   }

   const getProduct=()=>{ 
             let product_url=api_base_url+"product/"+product_name;   
             axios.get(product_url).then(response=>{  
              setFeaturedImage(WEBSITEURL+response.data.original.product.featured_image)
               setProduct({
                  ...product,
                  product:response.data.original.product,
                  relatedProducts:response.data.original.related_product,
                  hotProducts:response.data.original.hot_product,
                  image:response.data.original.image,
               })
            
               }).catch(error => { 
               //   setProduct([])
                console.log("product_error",error)                
             }) 
         } 
              
  return ( 

   <section id="mpart" className="singleproduct remove_class" style={{marginTop:100}}   >
   <div className="container">
      <div className="row mt40">
         <div className="col-sm-12">
            <div className="row">
              <ProductImage  image={product.image} feturedImageUpdate={feturedImageUpdate}  featured_image={featured_image_data}/>
              {/* <ProductPrice  product={product.product} /> */}
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
                 