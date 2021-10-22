@extends('admin.master')
@section('main',"Order")
@section('active',"Update Order")
@section('title',"Update Order of $order->order_id")
@section('main-content')
    <form action="{{url('/')}}/admin/order/{{$order->order_id}}" method="post">
        @csrf
        <section class="content">


            <div class="container-fluid">
                <div class="row">

                    <div class="col-md-6">

                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title">Customer Information</h3>
                            </div>


                            <div class="card-body">
                                <div class="form-group ">
                                    <label for="billing_name">Name </label>
                                    <input required class="form-control" placeholder="Customer Name" type="text"
                                           name="billing_name"
                                           value="{{$order->billing_name}}"/>
                                </div>


                                <div class="form-group ">
                                    <label for="billing_mobile">Customer Phone</label>
                                    <input required type="text" placeholder="Customer Mobile" name="billing_mobile"
                                           class="form-control"
                                           value="{{$order->billing_mobile}}"/>
                                </div>


                                <div class="form-group shipping-address-group ">
                                    <label for="shipping_address1">Customer Address </label>
                                        <textarea required class="form-control" rows="2" name="shipping_address1"
                                                  id="shipping_address1"
                                                  placeholder="Customer Address">{{$order->shipping_address1}}</textarea>
                                </div>
                            </div>


                        </div>

                    </div>

                    <div class="col-md-6">

                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title">Action </h3>
                            </div>


                            <div class="card-body">
                                <div class="form-group" style="padding: 11px;margin-top: -21px;">
                                    <label>Order Status</label>
                                    <select name="order_status" id="order_status" class="form-control">
                                        <option value="new">New</option>
                                        <option value="pending_payment">Pending for Payment</option>
                                        <option value="processing">Processing</option>
                                        <option value="on_courier">With Courier</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancled">Cancelled</option>

                                    </select>
                                </div>
                                <div class="form-group" style="padding: 11px;margin-top: -21px;">
                                    <label> Order Note</label>
                                    <textarea rows="3" class="form-control"
                                              name="order_note"></textarea>

                                </div>
                            </div>


                        </div>

                    </div>

                    <div class="col-md-12">

                        <div class="card card-info">
                            <div class="card-header">
                                <h3 class="card-title">Order Information</h3>
                            </div>


                            <div class="card-body">


                                <div class="card">
                                    <div class="card-header">
                                        <h3 class="card-title">Product Information</h3>
                                    </div>
                                    <div class="card-body p-0">

        <span id="product_html">
                           <table class="table table-striped table-bordered">
                               <thead>
                               <tr>
                                   <th class="name" width="30%">Product</th>
                                   <th class="name" width="5%">Code</th>
                                   <th class="image text-center" width="5%">Image</th>
                                   <th class="quantity text-center" width="10%">Qty</th>
                                   <th class="price text-center" width="10%">Price</th>
                                   <th class="total text-right" width="10%">Sub-Total</th>
                               </tr>
                               <tr>
                               </thead>


                               <?php
                               $order_ids = array();
                               $totalCommision = 0;
                               $product_ids = array();
                               $product_id_select = array();
                               $proSizeList = 0;
                               $subtotal_price = 0;
                               $item_count = 0;
                               $order_id = $order->order_id;
                               $order_items = unserialize($order->products);
                               $html = null;
                               if(is_array($order_items['items'])) {
                               foreach ($order_items['items'] as $product_id => $item) {
                               $featured_image = isset($item['featured_image']) ? $item['featured_image'] : null;
                               $product_ids[] = $product_id;
                               $product_code = 0;
                               $product_id_select = array_unique($product_ids);
                               $products_sku = DB::table('product')->select('sku')->first();
                               $product_code = $products_sku->sku;
                               $totall = intval(preg_replace('/[^\d.]/', '', isset($item['subtotal']) ? $item['subtotal'] : null));
                               $subtotal_price += $totall;
                               //  $subtotal_price= $subtotal_price+ $item['subtotal'] ;
                               //  $item_count = $item_count + $item['qty'];
                               $sku = "";
                               $name = "";
                               $product = single_product_information($product_id);
                               if ($product) {
                                   $sku = $product->sku;
                                   $name = $product->product_name;
                               }

                               //commition calculation of affilator
                               $commision_price = 0;

                               ?>
                               <tbody>
                               <tr>
                                   <td><a target="_blank"
                                          href="{{url('/')}}/{{$name}}"><?php $name = (isset($item['name']) ? $item['name'] : null);echo $name; ?></a>
                                   </td>
                                   <td>{{$sku}}</td>
                                   <td class="image text-center">
                                       <img src="<?php echo $featured_image ?>" height="30" width="30">
                                   </td>
                                   <td>
                                       <input type="number" name="products[items][<?php echo $product_id ?>][qty]"
                                              class="form-control item_qty"
                                              value="<?php echo $quantity = isset($item['qty']) ? $item['qty'] : null;  ?>"
                                              data-item-id="<?php echo $product_id ?>"
                                              style="width:70px;">
                                   </td>


                                   <td class="text-center">
                                       ৳ <?php $price = (isset($item['price']) ? $item['price'] : null);echo $price; ?></td>
                                   <td class="text-right">
                                       ৳ <?php $pricee = (isset($item['subtotal']) ? $item['subtotal'] : null);echo $pricee; ?> </td>
                               </tr>
                               <input type="hidden" name="products[items][<?=$product_id?>][featured_image]"
                                      value="<?=$featured_image?>"/>
                               <input type="hidden" name="products[items][<?=$product_id?>][price]"
                                      value="<?=$item['price']?>"/>
                               <input type="hidden" name="products[items][<?=$product_id?>][name]"
                                      value="<?php $name = (isset($item['name']) ? $item['name'] : null);echo $name; ?>"/>
                               <input type="hidden" name="products[items][<?=$product_id?>][subtotal]"
                                      value="<?=$item['subtotal']?>"/>

                               <?php
                               }
                               }
                               ?>

                               <tr>
                                   <td class="text-right" colspan="6">
                                       <a class="btn btn-primary   update_items">Change</a>
                                   </td>
                               </tr>
                               <tr>
                                   <td class="text-right" colspan="5"> Sub Total</td>
                                   <td
                                           class="text-right"> ৳ <span
                                               id="subtotal_price_sujon"><?php echo $subtotal_price . '.00' ?></span>
                                   </td>
                               </tr>
                               <tr>
                                   <td class="text-right" colspan="5"> <span
                                               class="extra bold">Delivery Cost</span></td>
                                   <td class="text-right"><input
                                               type="text" name="shipping_charge" class="form-control"
                                               id="shipping_charge"
                                               value="{{$order->shipping_charge}}"></td>
                               </tr>

                               <tr>
                                   <td class="text-right" colspan="5"><span class="extra bold">Discount Price</span>
                                   </td>
                                   <td class="text-right">
                                       <input type="text" name="discount_price" class="form-control" id="discount_price"
                                              value="{{$order->discount_price}}"></td>
                               </tr>
                               <tr>
                                   <td class="text-right" colspan="5"> <span
                                               class="extra bold">Advance Price</span></td>
                                   <td class="text-right"><input
                                               type="text" name="advabced_price" class="form-control"
                                               id="advabced_price" value="{{$order->advabced_price}}"></td>
                               </tr>
                               <tr>
                                   <td class="text-right" colspan="5"> <span
                                               class="extra bold totalamout">Total</span></td>
                                   <td
                                           class="text-right"> <span class="bold totalamout"><p> ৳ <span
                                                       id="total_cost">{{$order->order_total}}</span></p></span>
                                       <input type="text" name="order_total" id="order_total"
                                              value="{{$order->order_total}}">
                               </tr>


                               </tbody>
                           </table>
                           </span>

                                        <div class="form-group">
                                            <select name="product_ids" id="product_ids" class="form-control select2"
                                                    multiple="multiple"
                                                    data-placeholder="Type... product name here..."
                                                    style="width:100%;">

                                                <?php foreach($products as $product) :
                                                $product_title = substr($product->product_title, 0, 50)
                                                ?>
                                                <option
                                                        <?php
                                                        foreach ($product_id_select as $key => $prod) {
                                                            if ($prod == $product->product_id) {
                                                                echo "selected";
                                                            } else {
                                                                echo "";
                                                            }
                                                        }?>
                                                        value="{{$product->product_id}}"
                                                >{{$product_title}} - {{$product->sku}}</option>
                                                <?php endforeach; ?>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-success" style="float: right">Update
                                            </button>
                                        </div>
                                    </div>
                                    <!-- /.card-body -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </form>
    <input type="hidden" id="order_id" value="{{$order->order_id}}">
    <script>

        $("body").on('input', '#shipping_charge', function () {
            var subtotal_price = $('#subtotal_price_sujon').text();
            var delivary_cost = $(this).val();
            var advabced_price = $("#advabced_price").val();
            var discount_price = $("#discount_price").val();

            if (delivary_cost == '') {
                $("#shipping_charge").val(0);
            }
            if (advabced_price == '') {
                $("#advabced_price").val(0);
            }
            if (discount_price == '') {
                $("#discount_price").val(0);
            }

            var delivary_cost = $("#shipping_charge").val();
            var advabced_price = $("#advabced_price").val();
            var discount_price = $("#discount_price").val();

            var total_price = (parseInt(subtotal_price) + parseInt(delivary_cost) - parseInt(advabced_price)) - parseInt(discount_price);
            $('#total_cost').text(total_price);
            $('#order_total').val(total_price);
        });
        $("body").on('input', '#discount_price', function () {
            var discount_price = parseInt($(this).val());
            var subtotal_price = $('#subtotal_price_sujon').text();
            var delivary_cost = $('#shipping_charge').val();
            var advabced_price = $("#advabced_price").val();
            if (delivary_cost == '') {
                $("#shipping_charge").val(0);
            }
            if (advabced_price == '') {
                $("#advabced_price").val(0);
            }
            if (discount_price == '') {
                $("#discount_price").val(0);
            }

            var delivary_cost = $("#shipping_charge").val();
            var advabced_price = $("#advabced_price").val();
            var discount_price = $("#discount_price").val();
            var total_price = (parseInt(subtotal_price) + parseInt(delivary_cost) - parseInt(advabced_price)) - parseInt(discount_price);

            $('#total_cost').text(total_price);
            $('#order_total').val(total_price);
        });
        $("body").on('input', '#advabced_price', function () {
            var advabced_price = parseInt($(this).val());
            var subtotal_price = $('#subtotal_price_sujon').text();
            var shipping_charge = $('#shipping_charge').val();
            var discount_price = parseInt($('#discount_price').val());
            var total_price = parseInt(subtotal_price) + parseInt(shipping_charge) - (discount_price + advabced_price);
            var total = parseInt(total_price)
            $('#total_cost').text(total);
            $('#order_total').val(total);
        });
    </script>


    <script>




        $(document).on('click', '.update_items', function () {
            var product_ids = [];
            var product_qtys = [];
            var _token = $("input[name='_token']").val();

            var order_id = $('#order_id').val();
            var shipping_charge = $('#shipping_charge').val();
            $.each($(".item_qty"), function () {
                product_ids.push($(this).attr('data-item-id'));
                product_qtys.push($(this).val());
            });
            product_ids = product_ids.join(",");
            product_qtys = product_qtys.join(",");
            $.ajax({
                type: 'POST',
                data: {
                    "product_ids": product_ids,
                    "product_qtys": product_qtys,
                    "shipping_charge": shipping_charge,
                    "order_id": order_id,
                    "_token": _token
                },
                url: "{{  url('admin/order/newProductUpdateChange')}} ",
                success: function (result) {
                    console.log(result)
                    //var response = JSON.parse(result);
                    $('#product_html').html(result);
                },
                error: function (result) {

                    console.log(result)
                }
            });
        });


    </script>


    <script>
        $(document).on('change', '#product_ids', function () {
            var product_ids = [];
            var product_qtys = [];
            var shipping_charge = $('#shipping_charge').val();
            $.each($("#product_ids option:selected"), function () {
                product_ids.push($(this).val());
            });
            product_ids = product_ids.join(",");
            $.ajax({
                url: "{{  url('admin/order/newProductEditSelectionChange')}} ",
                type: "POST",
                data: {
                    shipping_charge: shipping_charge,
                    product_id: product_ids,
                    product_quantity: 1,
                    _token: "{{ csrf_token()}}"
                },
                success: function (result) {

                    $('#product_html').html(result);
                },
                errors: function (result) {
                    console.log('error')
                    console.log(result)
                }

            });

        });

    </script>

    </section>



@endsection