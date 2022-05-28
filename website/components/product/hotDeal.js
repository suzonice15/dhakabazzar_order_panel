import React from 'react'
import ProductRow from '../common/ProductRow';

export default function HotDeal({hotProducts}) {    

  return (
    <>
         <section id="related-products" style={{marginTop:'-25'}}>
         <h2 className="heading3">Hotdeals</h2>
         <ul className="products row">
         {hotProducts.length >0 && hotProducts.map(product=> <ProductRow key={product.product_name+ Math.random()} {...product} />)}
            </ul>
      </section>
    </>
  )
}
