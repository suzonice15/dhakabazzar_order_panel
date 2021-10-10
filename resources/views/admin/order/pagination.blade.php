
<style>
    .img-responsive{
float:left;
border: 2px solid #ddd;
    }
    .product-title{
        width: 100%;
display: block;
height: 30px;
overflow: hidden;
    }

 </style>

              @foreach($orders as $order)
            <tr >
              <td> 
                   <span   class="badge badge-pill badge-danger">  {{$order->order_id}}</span>                
                   {{date('d/m/Y h:i a',strtotime($order->created_time))}}
                 

                </td>

                @if(Session::get('status') !='office-staff')
                <td>
                    <input style="width: 22px;" type="checkbox" class="form-control">
                {{officeStaffName($order->staff_id)}}
               </td>

               @endif
               
               
             <td>
             <span   class="badge badge-pill badge-info">   {{$order->billing_name}}</span>
               <br>
               <span   class="badge badge-pill badge-success">  {{$order->billing_mobile}}</span>
              <br>
                 {{$order->shipping_address1}}
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
                <?php  } elseif ($order->order_status=='processing') { ?>
                    <span   class="badge badge-pill badge-info">{{ $order->order_status }}</span>
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
                    <span   class="badge badge-pill badge-success">{{ $order->order_status }}</span>
                <?php } ?>
                        <br>
            </td>
             


            <td>
                <a title="edit" target="_blank" href="{{ url('admin/order') }}/{{ $order->order_id }}">
                    <i class="fa fa-pencil btn btn-success btn-sm"></i>
                </a>

                {{--<a title="edit" href="{{ url('admin/order/invoice-print') }}/{{ $order->order_id }}">--}}
                    {{--<span class="glyphicon glyphicon-print btn btn-info"></span>--}}
                {{--</a>--}}

                {{--<button type="button"  class="btn btn-info orderPrint mt-2" data-order_id="{{$order->order_id }}" data-toggle="modal" data-target="#modal-default">--}}
                    {{--<i class="fa fa-fw fa-print"></i>--}}
                {{--</button>--}}

                <a title="print" target="_blank" href="{{ url('admin/order/invoice-print') }}/{{ $order->order_id }}">

                    <i class="fa fa-print btn btn-success btn-sm"></i>
                </a>


                {{--<a title="delete" href="{{ url('admin/product/delete') }}/{{ $order->product_id }}" onclick="return confirm('Are you want to delete this Product')">--}}
                    {{--<span class="glyphicon glyphicon-trash btn btn-danger"></span>--}}
                {{--</a>--}}


                <div class="input-group input-group-lg">


                    <div class="input-group-btn">
                        <button  style="width: 42px;height: 34px;padding: 3px;margin-top: 2px;" type="button" class="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                            <span class="fa fa-eye"></span></button>
                        <ul class="dropdown-menu">
                            @if($order->order_status=='new')
                                <li><a href="{{url('/')}}/admin/order/status/changed/cancled/{{$order->order_id}}">Cancel</a></li>
                                <li><a href="{{url('/')}}/admin/order/status/changed/phone_pending/{{$order->order_id}}">Phone Pending</a></li>
                                <li><a href="{{url('/')}}/admin/order/status/changed/pending_payment/{{$order->order_id}}">Pending Payment</a></li>
                                <li><a href="{{url('/')}}/admin/order/status/changed/processing/{{$order->order_id}}">processing</a></li>
                            @elseif($order->order_status=='phone_pending')
                                <li><a href="{{url('/')}}/admin/order/status/changed/cancled/{{$order->order_id}}">Cancel</a></li>
                                <li><a href="{{url('/')}}/admin/order/status/changed/pending_payment/{{$order->order_id}}">Pending Payment</a></li>
                                <li><a href="{{url('/')}}/admin/order/status/changed/processing/{{$order->order_id}}">processing</a></li>
                            @elseif($order->order_status=='processing')
                                <li><a href="{{url('/')}}/admin/order/status/changed/on_courier/{{$order->order_id}}">On Courier</a></li>
                                <li><a href="{{url('/')}}/admin/order/status/changed/cancled/{{$order->order_id}}">Cancel</a></li>
                            @elseif($order->order_status=='on_courier')
                                <li><a href="{{url('/')}}/admin/order/status/changed/delivered/{{$order->order_id}}">Delivered</a></li>
                                <li><a href="{{url('/')}}/admin/order/status/changed/failed/{{$order->order_id}}">Failed</a></li>
                            @elseif($order->order_status=='delivered')
                                <li><a href="{{url('/')}}/admin/order/status/changed/refund/{{$order->order_id}}">Refund</a></li>

                            @elseif($order->order_status=="pending_payment")
                                <li><a href="{{url('/')}}/admin/order/status/changed/processing/{{$order->order_id}}">processing</a></li>
                                <li><a href="{{url('/')}}/admin/order/status/changed/cancled/{{$order->order_id}}">Cancel</a></li>
                            @elseif($order->order_status=="failed")
                           <li><a href="{{url('/')}}/admin/order/status/changed/new/{{$order->order_id}}">New</a></li>
                            @elseif($order->order_status=="cancled")
                                <li><a href="{{url('/')}}/admin/order/status/changed/new/{{$order->order_id}}">New</a></li>
                            @elseif($order->order_status=="delivered")
                                {{--<li><a href="{{url('/')}}/admin/order/status/changed/refund/{{$order->order_id}}">Refund</a></li>--}}
                             @else

                            @endif


                        </ul>
                    </div>
                </div>
            </td>
       

              </tr>
              @endforeach 
              <tr > <td style="text-align: center" colspan="6">  {!! $orders->links() !!}</td></tr>     
              </tbody>
         
         
         
         