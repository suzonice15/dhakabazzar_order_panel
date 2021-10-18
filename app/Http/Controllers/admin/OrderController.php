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
    public function pagination(Request $request)
    {
     
       
            $status = $request->get('status');
            $orders = DB::table('order')
            ->where('order_status', $status)
            ->orderBy('order_id', 'desc')
             ->paginate(10);
             $data['orders']=  $orders;  
            return view('admin.order.pagination',$data);
         
    }

    public function pagination_search_by_phone(Request $request)
    {

        if ($request->ajax()) {
            $query = $request->get('query');
            $query = str_replace(" ", "%", $query);
            $orders = DB::table('order')
                ->where('billing_mobile', 'LIKE', '%' . $query . '%')
                ->orderBy('order_id', 'desc')
                ->paginate(5);
            return view('admin.order.pagination', compact('orders'));
        }

    }
    public function pagination_search_by_order_id(Request $request)
    {

        if ($request->ajax()) {
            $query = $request->get('query');
            $query = str_replace(" ", "%", $query);
            $orders = DB::table('order')
                ->where('order_id', '=',$query)
                ->orderBy('order_id', 'desc')
                ->paginate(1);
            return view('admin.order.pagination', compact('orders'));
        }

    }

    public function create (){
      $data['products']=DB::table('product')->select('product_id','sku','product_title')->get();
      return view('admin.order.create',$data);  
    }
    public function order_status (){
      
      return view('admin.order.order_status');  
    }
 
   public function newProductSelectionChange(Request $request)
   {
       $product_ids = explode(",", $request->product_id);
       //$qty = $this->input->post('product_quantity');
       $data['qty'] = $request->product_quantity;
       $data['shipping_charge'] = $request->shipping_charge;
       $data['order_id'] = $request->order_id;

       $data['products']= DB::table('product')->whereIn('product_id',$product_ids)->get();
       $data['order']= DB::table('order')->where('order_id', $request->order_id)->first();

       return view('admin.order.new_ajax_order',$data);

   }

   public function convertOrder()
   {
    ini_set('max_execution_time', 5555555555);

    $orders= DB::table('order')->where('order_id', '<=','33935')->get();
    foreach($orders as $order){
      $order_row= DB::table('ordermeta')->where('order_id', '=',$order->order_id)->count();
      if($order_row >0){
        $data['billing_name']= DB::table('ordermeta')->where('order_id', '=',$order->order_id)->where('meta_key','=','billing_name')->value('meta_value');
        $data['billing_mobile']= DB::table('ordermeta')->where('order_id', '=',$order->order_id)->where('meta_key','=','billing_phone')->value('meta_value');
        $data['shipping_address1']= DB::table('ordermeta')->where('order_id', '=',$order->order_id)->where('meta_key','=','shipping_address1')->value('meta_value');
       if(strlen($data['shipping_address1']) <450){
        DB::table('order')->where('order_id', '=',$order->order_id)->update($data);

       } else {
         continue;
       }
   
      }
    
   }


    }
    

       

 

   
    

}
