<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Session;
use Cache;

class OrderController extends Controller
{
    public function index()
    {
        $staff_id = Session::get('admin_id');
        $status = Session::get('status');
        if ($status == 'office-staff') {
            $data['orders'] = DB::table('order')
                ->where('order_status', '=', 'new')
                ->where('staff_id', '=', $staff_id)
                ->orderBy('order_id', 'desc')->paginate(10);
            return view('admin.order.index', $data);
        }
        $data['orders'] = DB::table('order')
            ->where('order_status', '=', 'new')
            //->orderBy('staff_id', 'desc')
            ->orderBy('order_id', 'desc')
            ->paginate(500);

        $users = Cache::remember('users', 36000, function () {
            return DB::table('users')->select('user_id', 'user_name')->where('user_type', '=', 'office-staff')->get();
        });
        $data['users'] = $users;
        return view('admin.order.index', $data);
    }

    public function orderExchange(Request $request)
    {
        $count = count($request->order_id);
        if ($count > 0) {
            foreach ($request->order_id as $order_id) {
                $data['staff_id'] = $request->staff_id;
                $data['order_status'] = $request->order_status;
                DB::table('order')->where('order_id', '=', $order_id)->update($data);
            }
        }
    }

    public function editHistory(Request $request, $order_id)
    {


        $data['orders'] = DB::table('order_edit_track')
            ->where('order_id', $order_id)
            ->orderBy('id', 'desc')
            ->get();

        return view('admin.order.orderEditHistory', $data);

    }

    public function pagination(Request $request)
    {
        $role_status = Session::get('status');
        $status = $request->get('status');
        $staff_id = Session::get('admin_id');
        if ($role_status == 'office-staff') {
            if($status=='ready_to_deliver' || $status=='invoice'){
                $orders = DB::table('order')
                    ->where('order_status', $status)
                   // ->where('staff_id', '=', $staff_id)
                    ->orderBy('order_id', 'desc')
                    ->paginate(10);
            }else{
                $orders = DB::table('order')
                    ->where('order_status', $status)
                    ->where('staff_id', '=', $staff_id)
                    ->orderBy('order_id', 'desc')
                    ->paginate(10);
            }

        } else {
            $orders = DB::table('order')
                ->where('order_status', $status)
                ->orderBy('order_id', 'desc')
                ->paginate(500);
        }


        $data['orders'] = $orders;
        return view('admin.order.pagination', $data);

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
                ->where('order_id', '=', $query)
                ->orderBy('order_id', 'desc')
                ->paginate(1);
            return view('admin.order.pagination', compact('orders'));
        }

    }

    public function create()
    {
        $data['products'] = DB::table('product')->select('product_id', 'sku', 'product_title')->get();
        return view('admin.order.create', $data);
    }

    public function edit($order_id)
    {
        $data['products'] = DB::table('product')->select('product_id', 'sku', 'product_title')->get();
        $data['order'] = DB::table('order')->where('order_id', '=', $order_id)->first();
        $data['orderTrackInfo']=DB::table('order_edit_track')->where('order_id',$order_id)->orderBy('id','desc')->get();
        return view('admin.order.edit', $data);
    }

    public function update(Request $request, $order_id)
    {
        date_default_timezone_set("Asia/Dhaka");
        $data['order_status'] = $request->order_status;
        $order_status = $request->order_status;
        $data['shipping_charge'] = $request->shipping_charge;
      //  $data['created_time'] = date("Y-m-d H:i:s");
        $data['modified_time'] = date("Y-m-d");
        $data['order_date'] = date("Y-m-d");
        $data['order_total'] = $request->order_total;
        $data['products'] = serialize($request->products);
        $data['billing_name'] = $request->billing_name;
        $data['billing_mobile'] = $request->billing_mobile;
        $data['shipping_address1'] = $request->shipping_address1;
        $data['courier_service'] = $request->courier_service;
        $data['shipping_charge'] = $request->shipping_charge;
        $data['discount_price'] = $request->discount_price;
        $data['advabced_price'] = $request->advabced_price;
        $data['order_note'] = $request->order_note;
        $data['order_area'] = $request->order_area;
        if ($request->shipment_time) {
            $data['shipment_time'] = date('Y-m-d H:i:s', strtotime($request->shipment_time));
        }

        if ($request->order_status == 'on_courier') {
            //   order_date
            $existingOrderID = DB::table('product_order_report')->where('order_id', '=', $order_id)->value('order_id');
            if ($existingOrderID) {
            } else {
                $order_items = unserialize($data['products']);
                if (is_array($order_items['items'])) {
                    foreach ($order_items['items'] as $product_id => $item) {
                        $sku = DB::table('product')->where('product_id', $product_id)->value('sku');
                        $newArray[] = array(
                            'order_id' => $order_id,
                            'product_id' => $product_id,
                            'product_code' => $sku,
                            'order_date' => $data['order_date']
                        );
                    }
                    DB::table('product_order_report')->insert($newArray);

                }
            }

        }
        $result = DB::table('order')->where('order_id', '=', $order_id)->update($data);

        /// order edit track
        $order_track['status'] = $order_status;
        $order_track['user_id'] = Session::get('admin_id');
        $order_track['order_id'] = $order_id;
        $order_track['updated_date'] = date('Y-m-d H:i:s');
        $order_track['user_name'] = Session::get('name');
        $order_track['order_note'] = $request->order_note;
        DB::table('order_edit_track')->insert($order_track);
        if ($result) {
            return back()->with('success', 'Updated successfully.');
        } else {
            return  back()->with('error', 'Error to Update this order');
        }

    }

    public function order_status()
    {

        return view('admin.order.order_status');
    }

    public function store(Request $request)
    {
        date_default_timezone_set("Asia/Dhaka");
        $data['order_status'] = $request->order_status;
        $order_status = $request->order_status;
        $data['shipping_charge'] = $request->shipping_charge;
        $data['created_time'] = date("Y-m-d H:i:s");
        $data['created_by'] = Session::get('name');
        $data['modified_time'] = date("Y-m-d");
        $data['order_date'] = date("Y-m-d");
        $data['order_total'] = $request->order_total;
        $data['products'] = serialize($request->products);
        $data['billing_name'] = $request->billing_name;
        $data['billing_mobile'] = $request->billing_mobile;
        $data['shipping_address1'] = $request->shipping_address1;
        $data['courier_service'] = $request->courier_service;
        $data['staff_id'] = Session::get('admin_id');
        $data['shipping_charge'] = $request->shipping_charge;
        $data['discount_price'] = $request->discount_price;
        $data['advabced_price'] = $request->advabced_price;
        $data['order_note'] = $request->order_note;
        $data['order_area'] = $request->order_area;
        if ($request->shipment_time) {

            $data['shipment_time'] = date('Y-m-d H:i:s', strtotime($request->shipment_time));
        }
        $orderID = DB::table('order')->insertGetId($data);

        if ($request->order_status == 'on_courier') {


            $order_items = unserialize($data['products']);
            if (is_array($order_items['items'])) {
                foreach ($order_items['items'] as $product_id => $item) {
                    $sku = DB::table('product')->where('product_id', $product_id)->value('sku');
                    $newArray[] = array(
                        'order_id' => $orderID,
                        'product_id' => $product_id,
                        'product_code' => $sku,
                        'order_date' => $data['order_date']
                    );
                }
                DB::table('product_order_report')->insert($newArray);
            }

        }

        /// order edit track
        $order_track['status'] = $order_status;
        $order_track['user_id'] = Session::get('admin_id');
        $order_track['order_id'] = $orderID;
        $order_track['updated_date'] = date('Y-m-d H:i:s');
        $order_track['user_name'] = Session::get('name');
        $order_track['order_note'] = $request->order_note;
        DB::table('order_edit_track')->insert($order_track);

        if ($orderID) {
            return redirect('admin/order')->with('success', "Order ID $orderID Created successfully.");
        } else {
            return redirect('admin/order')->with('error', 'Error to Create this order');
        }

    }


    public function newProductSelectionChange(Request $request)
    {
        $product_ids = explode(",", $request->product_id);
        $data['qty'] = $request->product_quantity;
        $data['shipping_charge'] = $request->shipping_charge;
        $data['order_id'] = $request->order_id;
        $data['products'] = DB::table('product')->whereIn('product_id', $product_ids)->get();
        $data['order'] = DB::table('order')->where('order_id', $request->order_id)->first();
        return view('admin.order.new_ajax_order', $data);
    }

    public function newProductEditSelectionChange(Request $request)
    {
        $product_ids = explode(",", $request->product_id);
        $data['qty'] = $request->product_quantity;
        $data['shipping_charge'] = $request->shipping_charge;
        $data['order_id'] = $request->order_id;
        $data['products'] = DB::table('product')->whereIn('product_id', $product_ids)->get();
        $data['order'] = DB::table('order')->where('order_id', $request->order_id)->first();
        return view('admin.order.new_ajax_order_edit', $data);
    }


    public function newProductUpdateChange(Request $request)
    {


        $product_ids = explode(",", $request->product_ids);
        $product_qtys = explode(",", $request->product_qtys);
        $data['shipping_charge'] = $request->shipping_charge;
        $data['order_id'] = $request->order_id;
      $data['order'] = DB::table('order')->where('order_id', $request->order_id)->first();
        $pqty = array_combine($product_ids, $product_qtys);
        $data['pqty'] = $pqty;
        $data['products'] = DB::table('product')->whereIn('product_id', $product_ids)->get();
        return view('admin.order.newProductUpdateChange', $data);
    }
    public function ProductUpdateChangeOfNewOrder(Request $request)
    {


        $product_ids = explode(",", $request->product_ids);
        $product_qtys = explode(",", $request->product_qtys);
        $data['shipping_charge'] = $request->shipping_charge;
        $data['order_id'] = $request->order_id;
      $data['order'] = DB::table('order')->where('order_id', $request->order_id)->first();
        $pqty = array_combine($product_ids, $product_qtys);
        $data['pqty'] = $pqty;
        $data['products'] = DB::table('product')->whereIn('product_id', $product_ids)->get();
        return view('admin.order.ProductUpdateChangeOfNewOrder', $data);
    }


    


    public function convertOrder()
    {
        ini_set('max_execution_time', 5555555555);

        $orders = DB::table('order')->select('order_id')->whereBetween('order_id', [28000, 33935])->get();
        foreach ($orders as $order) {
            $order_row = DB::table('ordermeta')->where('order_id', '=', $order->order_id)->first();
            if ($order_row) {
                $data['billing_name'] = DB::table('ordermeta')->where('order_id', '=', $order->order_id)->where('meta_key', '=', 'billing_name')->value('meta_value');
                $data['billing_mobile'] = DB::table('ordermeta')->where('order_id', '=', $order->order_id)->where('meta_key', '=', 'billing_phone')->value('meta_value');
                $data['shipping_address1'] = DB::table('ordermeta')->where('order_id', '=', $order->order_id)->where('meta_key', '=', 'shipping_address1')->value('meta_value');
                if (strlen($data['shipping_address1']) < 450) {
                    DB::table('order')->where('order_id', '=', $order->order_id)->update($data);

                }
            }

        }


    }

    public function productReport(Request $request)
    {

        if ($request->order_date_start || $request->order_date_end || $request->product_code) {

            
            if ($request->product_code) {
                $start_date = date("Y-m-d");
               
                $data['searchDateStart'] = $start_date;
                $data['searchDateEnd'] = $start_date;
                $data['searchText'] = $request->product_code;

                $data['orders'] = DB::table('product_order_report')
                    ->select('sku', 'product_title', 'product_code', 'product_order_report.product_id', DB::raw('count(*) as total'))
                    ->join('product', 'product.product_id', '=', 'product_order_report.product_id')
                    ->where('product_code', '=', $request->product_code)
                    ->groupBy('product_order_report.product_id')->get();
            } else if ($request->order_date_start && $request->order_date_end ) {
                $start_date = date("Y-m-d", strtotime($request->order_date_start));
                $ending_date = date("Y-m-d", strtotime($request->order_date_end));
                $data['searchDateStart'] = $start_date;
                $data['searchDateEnd'] = $ending_date;
                $data['orders'] = DB::table('product_order_report')
                    ->select('sku', 'product_title', 'product_code', 'product_order_report.product_id', DB::raw('count(*) as total'))
                    ->join('product', 'product.product_id', '=', 'product_order_report.product_id')
                    ->whereBetween('order_date', [$start_date, $ending_date])->groupBy('product_order_report.product_id')->get();

            } else {
                $start_date = date("Y-m-d", strtotime($request->order_date_start));
                $ending_date = date("Y-m-d", strtotime($request->order_date_end));
                $data['searchDateStart'] = $start_date;
                $data['searchDateEnd'] = $ending_date;
                $data['searchText'] = $request->product_code;
                $data['orders'] = DB::table('product_order_report')
                    ->select('sku', 'product_title', 'product_code', 'product_order_report.product_id', DB::raw('count(*) as total'))
                    ->join('product', 'product.product_id', '=', 'product_order_report.product_id')
                    ->where('product_code', '=', $request->product_code)
                    ->whereBetween('order_date', [$start_date, $ending_date])
                    ->groupBy('product_order_report.product_id')->get();

            }


        } else {
            $start_date = date("Y-m-d");
            $ending_date = date("Y-m-d");
            $data['searchDateStart'] = $start_date;
            $data['searchDateEnd'] = $start_date;
            $data['orders'] = DB::table('product_order_report')
                ->select('sku', 'product_title', 'product_code', 'product_order_report.product_id', DB::raw('count(*) as total'))
                ->join('product', 'product.product_id', '=', 'product_order_report.product_id')
                ->whereBetween('order_date', [$start_date, $ending_date])->groupBy('product_order_report.product_id')->get();

        }


        return view('admin.order.productReport', $data);

    }

    public function single_order_invoice($orderID)
    {
        $data['products'] = DB::table('order')->where('order_id', '=', $orderID)->value('products');
        $order_items = unserialize($data['products']);
        if (is_array($order_items['items'])) {
            foreach ($order_items['items'] as $product_id => $item) {
                $existingOrderID = DB::table('product_order_report')->where('order_id', '=', $orderID)->value('order_id');
                if ($existingOrderID) {
                }else{ 
                $sku = DB::table('product')->where('product_id', $product_id)->value('sku');
                $newArray[] = array(
                    'order_id' => $orderID,
                    'product_id' => $product_id,
                    'product_code' => $sku,
                    'order_date' => date("Y-m-d")
                );
                DB::table('product_order_report')->insert($newArray);
            }


            }
          
        }
        $name = Session::get('name');
        $row_data['order_status']='invoice';
        $row_data['order_print_status']=1;
        DB::table('order')->where('order_id', '=', $orderID)->update($row_data);
        return redirect("https://dhakabaazar.com/order/single_order_invoice/{$orderID}?name={$name}");

    }

    public function orderStatusReport(Request $request)
    {


        date_default_timezone_set("Asia/Dhaka");
        $data['start_date']=date("Y-m-d");
        $data['ending_date']=date("Y-m-d");
        $data['orders']=array();
        if($request->order_status && $request->starting_date && $request->ending_date){

            $data['start_date']=date("Y-m-d",strtotime($request->starting_date));
            $data['ending_date']=date("Y-m-d",strtotime($request->ending_date));

            $data['orderStatus']=$request->order_status;
            $data['orders']= DB::table('order')
                ->where('order_date', '>=',  $data['start_date'])
                ->where('order_date', '<=', $data['ending_date'])
                ->where('order_status', '=', $request->order_status)
                ->orderBy('order_id','desc')
                ->get();



        }else if($request->starting_date && $request->ending_date){
            $data['orderStatus']="";
            $data['start_date']=date("Y-m-d",strtotime($request->starting_date));
            $data['ending_date']=date("Y-m-d",strtotime($request->ending_date));
            $data['orders']= DB::table('order')
                ->where('order_date', '>=',  $data['start_date'])
                ->where('order_date', '<=', $data['ending_date'])
          //      ->where('order_status', '=', $request->order_status)
          ->orderBy('order_id','desc')
                ->get();
        }
        else{

            $data['orderStatus']="";
            $data['start_date']=date("Y-m-d");
            $data['ending_date']=date("Y-m-d");
            $data['orders']= DB::table('order')
                ->where('order_date', '>=',  $data['start_date'])
                ->where('order_date', '<=', $data['ending_date'])
                //      ->where('order_status', '=', $request->order_status)
                ->orderBy('order_id','desc')
                ->get();
        }


        return view('admin.order.orderStatusReport', $data);

 
    }

    public  function currentMonthStaffReport(){
        $start_date = date("Y-m-01");
        $ending_date  = date("Y-m-31");

        $data['orders']=  DB::table('order')->select('staff_id',DB::raw('count(order_id) as total'))

            ->groupBy('staff_id')
            ->where('order_date', '>=', $start_date)
            ->where('order_date', '<=', $ending_date)
            ->get();

        return view('admin.order.currentMonthStaffReport', $data);
    }




}
