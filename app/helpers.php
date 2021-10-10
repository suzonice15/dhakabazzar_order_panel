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