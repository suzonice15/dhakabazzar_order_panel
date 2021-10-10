<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Session;
class OrderController extends Controller
{
    public  function index(){


      $staff_id=  Session::get('admin_id');
      $status=  Session::get('status');
      if($status=='office-staff'){        
        $data['orders']= DB::table('order')
        ->where('order_status','=','new')
        ->where('staff_id','=',$staff_id)
        ->orderBy('order_id','desc')->paginate(10);      
        return view('admin.order.index',$data);
      }
      $data['orders']= DB::table('order')
        ->where('order_status','=','new')       
        ->orderBy('order_id','desc')->paginate(50);      
        return view('admin.order.index',$data); 
    }
}
