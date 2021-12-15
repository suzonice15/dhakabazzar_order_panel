<?php

function totalOrder($order_status)
{
    $staff_id = Session::get('admin_id');
    $status = Session::get('status');
    if ($status == 'office-staff') {
        return DB::table('order')
            ->where('staff_id', '=', $staff_id)
            ->where('order_status', '=', $order_status)
            ->count();
    }
    return DB::table('order')
        ->where('order_status', '=', $order_status)
        ->count();
}

function orderStatusReport($order_status,$start_date,$ending_date)
{
    
        return DB::table('order')
            ->where('order_date', '>=', $start_date)
            ->where('order_date', '<=', $ending_date)
            ->where('order_status', '=', $order_status)
            ->count();
    
}
function getOrderStatus($order_status,$staff_id)
{
    $start_date = date('Y-m-01');
    $ending_date  = date('Y-m-31');
      return DB::table('order')
            ->where('staff_id', '=', $staff_id)
            ->where('order_status', '=', $order_status)
          ->where('order_date', '>=', $start_date)
          ->where('order_date', '<=', $ending_date)
            ->count();
    
}

function getPrint($staff_id)
{
    $start_date = date('Y-m-01');
    $ending_date  = date('Y-m-31');
    return DB::table('order')
        ->where('staff_id', '=', $staff_id)
        ->where('order_print_status', '=', 1)
        ->where('order_date', '>=', $start_date)
        ->where('order_date', '<=', $ending_date)
        ->count();

}


function officeStaffName($id)
{
    return DB::table('users')
        ->where('user_id', '=', $id)
        ->value('user_name');


}

function get_option($option_name)
{
    return DB::table('options')
        ->select('option_value')
        ->where('option_name', $option_name)
        ->value('option_value');

}

function single_product_information($product_id)
{
    $result = DB::table('product')->select('sku', 'product_name', 'product_title')->where('product_id', $product_id)->first();

    if ($result) {
        return $result;

    }
}