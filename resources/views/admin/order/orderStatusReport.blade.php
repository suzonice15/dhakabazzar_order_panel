
@extends('admin.master')
@section('main',"Order Status Report")
@section('active',"Order Status Report")
@section('title',"Order Status Report")
@section('main-content')
    <style>
        .img-responsive {
            float: left;
            border: 2px solid #ddd;
        }

        .product-title {
            width: 100%;
            display: block;
            height: 30px;
            overflow: hidden;
        }

    </style>
    <section class="content">
        <div class="container-fluid">

<form action="{{url('/')}}/admin/orderStatus/report"  method="get" >
    <div class="row" style="cursor: pointer;background: white;margin-bottom: 9px;border: 2px solid #ddd;">
                <div class="col-6 col-lg-3">

                    <div class="form-group"  >
                        <label>Order Status</label>
                        <select name="order_status" id="order_status" class="form-control ">
                            <option value="">------Select----------</option>
                            <option value="new">New</option>
                            <option value="pending_payment">Pending for Payment</option>
                            <option value="pending">Pending</option>
                            <option value="on_courier"> Courier</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancled">Cancelled</option>
                            <option value="ready_to_deliver">Pending Invoice</option>
                            <option value="invoice">Invoice</option>


                        </select>
                    </div>
                </div>


                <div class="col-6 col-lg-3">

                    <div class="form-group"  >
                        <div class="form-group"  >
                            <label>Starting Date </label>
                            <input type="date" name="starting_date" value="{{date("Y-m-d",strtotime($ending_date))}}" class="form-control">
                        </div>
                    </div>
                </div>


                <div class="col-6 col-lg-3">

                    <div class="form-group"  >
                        <label>Ending Date </label>
                        <input type="date" name="ending_date" value="{{date("Y-m-d",strtotime($ending_date))}}" class="form-control">
                    </div>
                </div>

                <div class="col-6 col-lg-3">
<br>
                    <div class="form-group" >
                       <input type="submit"  style="margin-top: 8px;" value="Search" class="form-control btn btn-success">
                    </div>
                </div>

                </div>
</form>

        </div>
            <div class="row" style="cursor: pointer;">
                <div class="col-12 col-sm-6 col-md-3">
                    <div class="info-box">
                        <span class="info-box-icon bg-info elevation-1"><i class="fas fa-shopping-cart"></i></span>
                        <div class="info-box-content">
                            <span class="info-box-text">New</span>
                <span class="info-box-number">
                 {{orderStatusReport('new',$start_date,$ending_date)}}
                </span>
                        </div>
                        <!-- /.info-box-content -->
                    </div>
                    <!-- /.info-box -->
                </div>
                <!-- /.col -->
                <div class="col-12 col-sm-6 col-md-3">
                    <div class="info-box mb-3">
                        <span class="info-box-icon bg-danger elevation-1"><i class="fas fa-shopping-cart"></i></span>

                        <div class="info-box-content">
                            <span class="info-box-text">Pending</span>
                            <span class="info-box-number"> {{orderStatusReport('pending',$start_date,$ending_date)}} </span>

                        </div>
                        <!-- /.info-box-content -->
                    </div>
                    <!-- /.info-box -->
                </div>
                <!-- /.col -->

                <!-- fix for small devices only -->
                <div class="clearfix hidden-md-up"></div>

                <div class="col-12 col-sm-6 col-md-3">
                    <div class="info-box mb-3">
                        <span class="info-box-icon bg-success elevation-1"><i class="fas fa-shopping-cart"></i></span>

                        <div class="info-box-content">
                            <span class="info-box-text">   Pending Pyment</span>
                            <span class="info-box-number">{{orderStatusReport('pending_payment',$start_date,$ending_date)}} </span>
                        </div>
                        <!-- /.info-box-content -->
                    </div>
                    <!-- /.info-box -->
                </div>
                <!-- /.col -->


                <div class="col-12 col-sm-6 col-md-3">
                    <div class="info-box mb-3">
                        <span class="info-box-icon bg-warning elevation-1"><i class="fas fa-shopping-cart"></i></span>

                        <div class="info-box-content">
                            <span class="info-box-text">Invoice</span>
                            <span class="info-box-number">{{orderStatusReport('invoice',$start_date,$ending_date)}}  </span>
                        </div>
                        <!-- /.info-box-content -->
                    </div>

                </div>
                <div class="col-12 col-sm-6 col-md-3">
                    <div class="info-box mb-3">
                        <span class="info-box-icon bg-warning elevation-1"><i class="fas fa-shopping-cart"></i></span>

                        <div class="info-box-content">
                            <span class="info-box-text">Pending Invoice</span>
                            <span class="info-box-number">{{orderStatusReport('ready_to_deliver',$start_date,$ending_date)}} </span>
                        </div>
                        <!-- /.info-box-content -->
                    </div>

                </div>





                <div class="col-12 col-sm-6 col-md-3">
                    <div class="info-box mb-3">
                        <span class="info-box-icon bg-success elevation-1"><i class="fas fa-shopping-cart"></i></span>

                        <div class="info-box-content">
                            <span class="info-box-text">Courier</span>
                            <span class="info-box-number">{{orderStatusReport('on_courier',$start_date,$ending_date)}} </span>
                        </div>
                        <!-- /.info-box-content -->
                    </div>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                    <div class="info-box mb-3">
                        <span class="info-box-icon bg-success elevation-1"><i class="fas fa-shopping-cart"></i></span>

                        <div class="info-box-content">
                            <span class="info-box-text">Delivered</span>
                            <span class="info-box-number">{{orderStatusReport('delivered',$start_date,$ending_date)}} </span>
                        </div>
                        <!-- /.info-box-content -->
                    </div>

                </div>
                <div class="col-12 col-sm-6 col-md-3">
                    <div class="info-box mb-3">
                        <span class="info-box-icon bg-danger elevation-1"><i class="fas fa-shopping-cart"></i></span>

                        <div class="info-box-content">
                            <span class="info-box-text">Cancled</span>
                            <span class="info-box-number">{{orderStatusReport('cancled',$start_date,$ending_date)}} </span>
                        </div>
                        <!-- /.info-box-content -->
                    </div>

                </div>
            </div>

        <table class="table table-bordered">
@if($orderStatus !='')


                <thead>
                <tr style="text-align:center">
                    <th width="10%">
                        Order ID
                    </th>


                    <th style="width: 9%;">
                        <span style="font-size: 15px;"> Office Staff</span>
                        <br/>

                    </th>

                    <th style="width:20%;text-align:left">Customer</th>

                    <th style="text-align:left">Products</th>
                    <th> Amount</th>
                    <th> Status</th>


                </tr>
                </thead>
        @foreach($orders as $order)
            <tr>
                <td><span   class="badge badge-pill badge-danger">  {{$order->order_id}}</span>
                    {{date('d-m-Y h:i a',strtotime($order->created_time))}}
                </td>


                <td style="text-align: center" >

                    <span   data-toggle="modal" data-target="#modal-edit" onclick="orderEdit({{$order->order_id}})" class="badge badge-pill badge-primary"> {{officeStaffName($order->staff_id)}}</span>
                    <span class="badge badge-pill badge-danger" >@if($order->order_area=='outside_dhaka')  Outside Dhaka   @else Inside Dhaka @endif</span>

                </td>




                <td>
                    <span   class="badge badge-pill badge-info">   {{$order->billing_name}}</span>
                    <br>
                    <span   class="badge badge-pill badge-success">  {{$order->billing_mobile}}</span>
                    <br>
                    {{$order->shipping_address1}}
                    <br>
                    <span style="color:red;font-weight: 400">Note: {{$order->order_note}} </span>

                </td>
                <td>
                    <?php
                    $order_items = unserialize($order->products);
                    if(is_array($order_items['items'])) {
                    foreach ($order_items['items'] as $product_id => $item) {
                    $featured_image = isset($item['featured_image']) ? $item['featured_image'] : null;
                    ?>
                    <span class="product-title"><?=($item['name'])?></span>
                    <img  class="img-responsive"  width="50" src="<?=$featured_image?>" />
                    <p> {{$item['price']}}
                        <i class="fal fa-times"></i>
                        <?=($item['qty'])?>= {{$item['subtotal']}}
                    </p>

                    <br>
                    <?php }
                    }
                    ?>
                </td>

                <td>
                    {{$order->order_total}}

                </td>

                <td>
                    <?php if($order->order_status=='pending_payment'){
                    ?>
                    <span   class="badge badge-pill badge-info" style="background-color:#ffad55;color: black;border: none;" >Payment Pending</span>
                    <?php  } elseif ($order->order_status=='new') { ?>
                    <span   class="badge badge-pill badge-info">{{ $order->order_status }}</span>
                    <?php  } elseif ($order->order_status=='invoice') { ?>
                    <span   class="badge badge-pill badge-info">Invoice</span>
                    <?php  } elseif ($order->order_status=='on_courier') { ?>
                    <span   class="badge badge-pill badge-danger">{{ $order->order_status }}</span>
                    <?php  } elseif ($order->order_status=='delivered') { ?>
                    <span   class="badge badge-pill badge-success">{{ $order->order_status }}</span>
                    <?php  } elseif ($order->order_status=='refund') { ?>
                    <span   class="badge badge-pill badge-danger">{{ $order->order_status }}</span>
                    <?php  } elseif ($order->order_status=='cancled') { ?>
                    <span   class="badge badge-pill badge-danger">{{ $order->order_status }}</span>
                    <?php  } elseif ($order->order_status=='phone_pending') { ?>
                    <span    class="badge badge-pill badge-info" style="background-color:#ffad55;color: black;border: none;" >Phone Pending </span>
                    <?php  } elseif ($order->order_status=='failed') { ?>
                    <span    class="badge badge-pill badge-danger"  >Failded Delevery </span>
                    <?php  } else {  ?>
                    <span   class="badge badge-pill badge-success">Pending Invoice</span>
                    <?php } ?>
                    <br>
                </td>



            </tr>
        @endforeach
                @endif

                </table>


        </div>
    </section>

    </div>


@endsection