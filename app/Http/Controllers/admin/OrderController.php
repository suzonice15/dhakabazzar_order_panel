<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Session;
use Cache;
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
        ->orderBy('staff_id','desc')
        ->paginate(10);   
        $data['']=
        $users = Cache::remember('users', 36000, function () {
          return DB::table('users')->select('user_id','user_name')->where('user_type','=','office-staff')->get();
      });
      $data['users']=  $users;   
        return view('admin.order.index',$data); 
    }

    public function orderExchange(Request $request){
        $count=count($request->order_id);
        if($count > 0){
          foreach($request->order_id as $order_id){
            $data['staff_id']=$request->staff_id;
            DB::table('order')->where('order_id','=',$order_id)->update($data);
          }
        }


    }
}
