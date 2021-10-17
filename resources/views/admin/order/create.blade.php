
@extends('admin.master')
@section('main',"Order")
@section('active',"Add New Order")
@section('title',"Add New Order")
@section('main-content')

<section class="content">
      <div class="container-fluid">
        <div class="row">
        
          <div class="col-md-4">
           
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Customer Information</h3>
              </div>
             
              <form>
                <div class="card-body">
                <div class="form-group ">
                                    <label for="billing_name">Name </label> 
                                    <input required class="form-control" placeholder="Customer Name" type="text" name="billing_name"
                                           value=""/>
                                </div>
 

                                <div class="form-group ">
                                    <label for="billing_mobile">Customer Phone</label>
                                    <input required type="text" placeholder="Customer Mobile" name="billing_mobile" class="form-control"
                                           value=""/>
                                </div>


                                <div class="form-group shipping-address-group ">
                                    <label for="shipping_address1">Customer Address </label>
                                        <textarea required class="form-control" rows="2" name="shipping_address1"
                                                  id="shipping_address1" placeholder="Customer Address"></textarea>
                                </div> 
                </div>
               
             
              </form>
            </div>
         
          </div>

          <div class="col-md-8">
           
           <div class="card card-info">
             <div class="card-header">
               <h3 class="card-title">Order  Information</h3>
             </div>
            
             <form>
               <div class="card-body">


               <div class="card">
        <div class="card-header">
          <h3 class="card-title">Product Information</h3>

          
        </div>
        <div class="card-body p-0">

       

          <table class="table table-striped projects">
              <thead>
                  <tr>
                      <th style="width: 1%">
                      Product
                      </th>
                      <th style="width: 20%">
                      Image
                      </th>
                      <th style="width: 30%">
                      Qty
                      </th>
                      <th>
                      Price
                      </th>
                      <th style="width: 8%" class="text-center">
                      Sub-Total
                      </th>
                       
                  </tr>
              </thead>
              <tbody id="product_html">
                 
              </tbody>
          </table>

          <div class="form-group">
                                        <select name="product_ids" id="product_ids" class="form-control select2"    multiple="multiple"  data-placeholder="Type... product name here..."
                                                style="width:100%;">

                                            <?php foreach($products as $product) :
                                            $product_title=substr($product->product_title,0,50)
                                            ?>
                                            <option value="{{$product->product_id}}"
                                            >{{$product_title}} - {{$product->sku}}</option>
                                            <?php endforeach; ?>
                                        </select>
                                    </div>
        </div>
        <!-- /.card-body -->
      </div>
              
               
               </div>
              
            
             </form>
           </div>
        
         </div>
         
         <div class="col-md-4">
           
           <div class="card card-primary">
             <div class="card-header">
               <h3 class="card-title">Action </h3>
             </div>
            
             <form>
               <div class="card-body">
               <div class="form-group" style="padding: 11px;margin-top: -21px;">
                                <label>Order Status</label>


                                <select name="order_status" id="order_status" class="form-control">
                                    <option value="new">New</option>
                                    <option value="pending_payment">Pending for Payment</option>
                                    <option value="processing">On Process</option>
                                    <option value="on_courier">With Courier</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="refund">Refunded</option>
                                    <option value="cancled">Cancelled</option>
                                    <?php
                                    $admin_user=Session::get('status');
                                    if($admin_user !='editor' && $admin_user !='office-staff') {
                                    ?>

                                    <option value="completed">Completed {{ $admin_user}}</option>
                                    <?php } ?>

                                </select>
                            </div>
                            <div class="form-group" style="padding: 11px;margin-top: -21px;">
                                <label> Order Note</label>
                                    <textarea rows="3" class="form-control"
                                              name="order_note"></textarea>

                            </div>
               </div>
              
            
             </form>
           </div>
        
         </div>
           
          </div>        
      </div> 
    </section>

<section class="content">
<div class="box-body">


<div class="col-sm-offset-0 col-md-12">


    <form name="product" action="{{ url('admin/order/store') }}" class="form-horizontal"
          method="post"
          enctype="multipart/form-data">
        @csrf


        
            <div class="row">



                    <div class="col-md-12">
                        <div class="box box-primary" style="border:2px solid #ddd">
                            <div class="box-header" style="background-color:#ddd">
                                <h3 class="box-title">Product Information</h3>
                            </div>
                            <div class="box-body">
                   
                   <table class="table table-striped table-bordered">
                       <tr>
                           <th class="name" width="30%">Product</th>
                           <th class="name" width="5%">Code</th>
                           <th class="image text-center" width="5%">Image</th>

                           <th class="quantity text-center" width="10%">Qty</th>
                           <th class="price text-center" width="10%">Price</th>
                           <th class="total text-right" width="10%">Sub-Total</th>
                       </tr>

                       <tr>


                   </table>

                  
 </div>
                        </div>
                        <button type="submit" class="btn btn-primary pull-right">Save</button>
                    </div>


            </div>




        </div>



    </form>

    <script>

        $("body").on('input', '#shipping_charge', function () {
            var subtotal_price = $('#subtotal_price_sujon').text();
            var delivary_cost = parseInt($(this).val());
            var total_price = delivary_cost + parseInt(subtotal_price);
            $('#total_cost').text(total_price);
            $('#order_total').val(total_price);
        });
        $("body").on('input', '#discount_price', function () {
            var discount_price = parseInt($(this).val());
            var subtotal_price = $('#subtotal_price_sujon').text();
            var shipping_charge = $('#shipping_charge').val();
            var total_price = parseInt(subtotal_price) + parseInt(shipping_charge);

            var total = parseInt(total_price) - discount_price;
            $('#total_cost').text(total);
            $('#order_total').val(total);
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

        $('#change_order_data').click(function () {
            $('#customer_info_change').toggle();
        });


        $(document).on('click', '.update_items', function () {
            var product_ids = [];
            var product_qtys = [];
            var _token = $("input[name='_token']").val();

            var shipping_charge= $('#shipping_charge').val();
            $.each($(".item_qty"), function () {
                product_ids.push($(this).attr('data-item-id'));
                product_qtys.push($(this).val());
            });

            product_ids = product_ids.join(",");
            product_qtys = product_qtys.join(",");
            //alert(_token)


            $.ajax({
                type: 'POST',
                data: {
                    "product_ids": product_ids,
                    "product_qtys": product_qtys,
                    "shipping_charge":shipping_charge,
                    "_token":_token

                },
                url: "{{  url('newProductUpdateChange')}} ",
                success: function (result) { 
                    //var response = JSON.parse(result); 
                    $('#product_html').html(result);
                },
                error:function (result) {
                  
                    console.log(result)
                }
            });
        });



    </script>


    <script>
        $(document).on('change', '#product_ids', function () {
            var product_ids = [];
            var product_qtys = [];
            var _token = $("input[name='_token']").val();
            var shipping_charge= $('#shipping_charge').val();
            $.each($("#product_ids option:selected"), function () {
                product_ids.push($(this).val());
            });
            product_ids = product_ids.join(",");
            $.ajax({
                type: "POST",
                data: {
                shipping_charge:shipping_charge,
                product_id: product_ids,
                product_quantity: 1,
                 _token:"{{ csrf_token()}}"
                 },

                url: "{{  url('admin/newProductSelectionChange')}} ",
                success: function (result) {

                    //  alert('success');
                    console.log('success')
                    //var response = JSON.parse(result);

                    console.log(result)
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

<script>
        $(document).ready(function () {
            $("#blog_name").on('input click', function () {
                var text = $("#blog_name").val();  
                var word = text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                $("#blog_parmalink").val(word);               
            });
        });
 </script>


    @endsection