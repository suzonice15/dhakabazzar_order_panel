import React ,{memo} from 'react'
import ProductRow from '../common/ProductRow';
const RelatedProduct=({relatedProducts})=> { 
  return (
    <>
         <section id="related-products" className="mt70 remove_class">
         <h2 className="heading3">related Products</h2>
         <ul className="products row">
         {relatedProducts.length >0 && relatedProducts.map(product=> <ProductRow key={product.product_name+ Math.random()} {...product} />)}
            </ul>
      </section>
    </>
  )
}
export default memo(RelatedProduct);
