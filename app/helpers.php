<?php
function totalOrder($order_status){
  $staff_id=  Session::get('admin_id');
  $status=  Session::get('status');
  if($status=='office-staff'){
    return DB::table('order')
    ->where('staff_id','=',$staff_id)
    ->where('order_status','=',$order_status)
    ->count();
  }
  return DB::table('order') 
  ->where('order_status','=',$order_status)
  ->count();
}

function officeStaffName($id){
   
    return DB::table('users') 
    ->where('user_id','=',$id)
    ->value('user_name');
  
   
  }
function single_product_information($product_id)
{
  $result=DB::table('product')->select('sku','product_name','product_title')->where('product_id',$product_id)->first();

  if($result){
    return $result;

  }
}