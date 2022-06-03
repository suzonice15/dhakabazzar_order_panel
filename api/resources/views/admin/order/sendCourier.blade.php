@extends('admin.master')
@section('main',"Send Products to Courier")
@section('active',"Send Products to Courier")
@section('title',"Send Products to Courier")

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
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <span style="color:red;font-weight: bold;font-size:18px" id="count_total"></span>
                        <button type="button"
                                class="btn btn-danger btn-sm" style="float:right" id="exchange_send_now">
                            <i class="fas fa-arrow-circle-right"></i> Send Product To Courier
                        </button>

                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover table-bordered">
                            <thead>
                            <tr style="text-align:center">
                                <td>
                                    All
                                      <input type="checkbox" name="all_select" id="checkAll"/>

                                </td>

                                <th> Courier Information </th>
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


                            </tr>
                            </thead>
                            <tbody>
                            <?php $total_quantity=0;?>
                            @if($orders)
                                @foreach($orders as $key=>$order)
@php

$areaInfo = DB::table('area')->where('area_id', $order->area_id)->first();

@endphp
                                    <tr>
                                        <td>
                                            @if($order->traking_id =='')
                                            <input style="width: 15px;text-align: center"
                                                   type="checkbox"
                                                   value="{{$order->order_id}}"
                                                   class="checkAll">
                                                @else
                                                <span style="color:red;font-weight:bold">{{$order->traking_id  }}</span>

                                            @endif
                                        </td>
                                        <td>
                                            <span style="color:red;font-size: 17px;font-weight: bold">
                                                 {{$order->courier_service}}
                                            </span>
                                            <br/>
                                            @if($areaInfo)
                                                <span style="color:green;font-size: 15px;font-weight: bold">
                                                 {{$areaInfo->area_name}}
                                            </span>
                                            @endif
                                            <br/>

                                                <span style="color:red;font-size: 15px;font-weight: bold">
                                                Weight : {{$order->weight}}
                                            </span>
                                            <br/>
                                              <span style="color:black;font-size: 15px;font-weight: bold">
                                                Invoice : {{$order->invoice_id}}
                                            </span>
                                        </td>
                                        <td><span   class="badge badge-pill badge-danger" style="font-size:18px">  {{$order->order_id}}</span>
                                            <span   class="badge badge-pill badge-success" style="font-size:18px">    {{date('d-m-Y',strtotime($order->created_time))}}</span>
                                            {{date('h:i a',strtotime($order->created_time))}}
                                        </td>


                                        <td style="text-align: center" >
                                            <span   data-toggle="modal" data-target="#modal-edit" onclick="orderEdit({{$order->order_id}})" class="badge badge-pill badge-primary"> {{officeStaffName($order->staff_id)}}</span>
                                            <span class="badge badge-pill badge-danger" >@if($order->order_area=='outside_dhaka')  Outside Dhaka   @else Inside Dhaka @endif</span>

                                        </td>




                                        <td>
                                            <span   class="badge badge-pill badge-info" style="font-size:18px">   {{$order->billing_name}}</span>
                                            <br>
                                            <span   class="badge badge-pill badge-success" style="font-size:18px">  {{$order->billing_mobile}}</span>
                                            <br>
                                            {{$order->shipping_address1}}
                                            <br>
                                            <span style="color:red;font-weight: 400">Note: {{$order->order_note}} </span>


                                        </td>
                                        <td>
                                            <?php
                                            $order_items = unserialize($order->products);
                                            if(isset($order_items['items'])) {
                                            foreach ($order_items['items'] as $product_id => $item) {
                                            $featured_image = isset($item['featured_image']) ? $item['featured_image'] : null;

                                            $sku=DB::table('product')->where('product_id',$product_id)->value('sku');
                                            ?>
                                            <span class="product-title"><?=($item['name'])?></span>
                                            <img  class="img-responsive"  width="50" src="<?=$featured_image?>" />
                                            <p> {{$item['price']}}
                                                <i class="fal fa-times"></i>
                                                <?=($item['qty'])?>= {{$item['subtotal']}}
                                            </p>
                                            <p  style="color:red;font-weight:bold;position: absolute;margin-top: 8px;">Code :{{$sku}}</p>

                                            <br>
                                            <?php }
                                            }
                                            ?>
                                        </td>

                                        <td>
                                            {{$order->order_total}}

                                        </td>

                                    </tr>

                                @endforeach
                            @endif


                            </tbody>
                        </table>
                    </div>
                    <!-- /.card-body -->
                </div>
                <!-- /.card -->
            </div>
        </div>

    </section>




    <script>
        $("#exchange_send_now").click(function () {

            var order_id = new Array();
             $('.checkAll').each(function () {
                if ($(this).is(":checked")) {
                    order_id.push(this.value);
                }
            });
            if (order_id.length > 0) {
                $("#exchange_send_now").prop("disabled",true);
                $("#exchange_send_now").text("Please Wait.....");
                $.ajax({
                    url: '{{url('/')}}/admin/sendProductCourier',
                    data: {
                        order_id: order_id,
                        "_token": "{{csrf_token()}}"
                    },
                    method: 'post',
                    success: function (data) {
                        $("#exchange_send_now").text("Successfully done !");
                         location.reload();
                    },
                    error:function(data){
                        $("#exchange_send_now").prop("disabled",false);
                        $("#exchange_send_now").text("Please Fill Up All Courier Information");
                    }
                });
            } else {
                alert("Please select Product To Send To Courier")
            }
        });


        //$('#checkAll').change(function () {
        $(document).on("change", "#checkAll", function (event) {

            if ($(this).is(":checked")) {

                $('.checkAll').prop('checked', true);

            } else if ($(this).is(":not(:checked)")) {

                $('.checkAll').prop('checked', false);

            }

            var order_id = new Array();
            $('.checkAll').each(function () {
                if ($(this).is(":checked")) {
                    order_id.push(this.value);
                }
            });
            if(order_id.length > 0){
                $("#count_total").text(order_id.length +" items selected");
            }else{
                $("#count_total").text("");
            }


        });

        $(".checkAll").change(function(){
            var order_id = new Array();
            $('.checkAll').each(function () {
                if ($(this).is(":checked")) {
                    order_id.push(this.value);
                }
            });
            if(order_id.length > 0){
                $("#count_total").text(order_id.length +" items selected");
            }else{
                $("#count_total").text("");
            }


        })

    </script>

@endsection