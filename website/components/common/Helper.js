import React, { useContext } from 'react'
import { DataContext } from '../../store/GlobalState';

export  const GeneratePrice=({sell_price,discount_price,discount_type})=> {
    var product_price =  sell_price;
    var product_discount = discount_price;
    var discount_type;
    var oldPrice='';
    if(product_discount != 0)
    { 
        var discount_type =discount_type;
          oldPrice='৳ '+sell_price;
        let save_money;
         save_money = product_discount;

        if(discount_type == 'fixed')
        {
            sell_price = product_price - product_discount;
        }else if(discount_type == 'percent')
        {
            save_money = (product_discount / 100) * product_price;
           sell_price = product_price - save_money;
        }
    }
   return  <> <del>{oldPrice}</del> ৳ {sell_price} </> 
} 

export  const GenerateSinglePrice=({sell_price,discount_price,discount_type})=> {
  var product_price =  sell_price;
  var product_discount = discount_price;
  var discount_type;
  var oldPrice='';
  if(product_discount != 0)
  { 
      var discount_type =discount_type;
        oldPrice='৳ '+sell_price;
      let save_money;
       save_money = product_discount;

      if(discount_type == 'fixed')
      {
          sell_price = product_price - product_discount;
      }else if(discount_type == 'percent')
      {
          save_money = (product_discount / 100) * product_price;
         sell_price = product_price - save_money;
      }
  }
 
 return  <> <del className="bn">{oldPrice}</del><span className="bn"> ৳ {sell_price}</span> </> 
} 



export  const DiscountPrice=({sell_price,discount_price,discount_type})=> {
  var product_price =  sell_price;
  var product_discount = discount_price;
  var discount_type;
  var discountPrice='';
  if(product_discount != 0)
  { 
      var discount_type =discount_type;
       
      let save_money;
       save_money = product_discount;

      if(discount_type == 'fixed')
      {
          sell_price =  product_discount;
      }else if(discount_type == 'percent')
      {
        sell_price = (product_discount / 100) * product_price;
          
      }
     
        sell_price = Math.round(sell_price); 
      discountPrice =<div className="freepeoduct">৳ {sell_price} ছাড়</div>;
  }
 return  <> {discountPrice}</> 
} 


export  const AddToCartComponent=(props)=> {
      const {AddToCart}=useContext(DataContext);
      let sell_price_amount=0;
      var product_price =  props.sell_price;
      var product_discount = props.discount_price;
      
     
      if(product_discount != 0)
      { 
          var discount_type =props.discount_type;
           
          let save_money;
           save_money = product_discount;
    
          if(discount_type == 'fixed')
          {
            sell_price_amount = product_price - product_discount;
          }else if(discount_type == 'percent')
          {
              save_money = (product_discount / 100) * product_price;
              sell_price_amount = product_price - save_money;
          }
      }

    

   return ( <div className = "add-btn-box" >
        <a onClick = {
            () => AddToCart(props.product_id,props.product_title,props.sku,props.featured_image,sell_price_amount) }
        className = "buy_now" >
        Order < span > Now </span> </a> 
        </div>  )
  
} 


