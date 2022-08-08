

              @foreach($orders as $order)

                  <?php
                  $order_track=DB::table('order_edit_track')->where('order_id',$order->order_id)->orderBy('id','desc')->value('updated_date');
                  $areaInfo = DB::table('area')->where('area_id', $order->area_id)->first();
                  ?>
                  <tr>
              <td><span   class="badge badge-pill badge-danger" style="font-size:18px">  {{$order->order_id}}</span>
                  <span   class="badge badge-pill badge-success" style="font-size:18px">
                      {{date('d-m-Y',strtotime($order->created_time))}}</span>
                   {{date('h:i a',strtotime($order->created_time))}}

                  @if($order->shipment_time)
                      <br/>
                      <span style="color:green">
                      Shipping Date
                          {{date('d-m-Y',strtotime($order->shipment_time))}}
                  </span>
                  @endif
                  @if($order->return_date)
                      <br/>
                  <span style="color:red">
                      Return Date
                      {{date('d-m-Y',strtotime($order->return_date))}}
                  </span>

                  @endif

                </td>
                      <td> <span style="color:red;font-size: 17px;font-weight: bold">
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

                <td style="text-align: center" >
                @if(Session::get('status') !='office-staff')
                    <input style="width: 15px;text-align: center" type="checkbox" value="{{$order->order_id}}" class="checkAll ">
                    @endif
                    <span   data-toggle="modal" data-target="#modal-edit" onclick="orderEdit({{$order->order_id}})" class="badge badge-pill badge-primary"> {{officeStaffName($order->staff_id)}}</span>
              <span class="badge badge-pill badge-danger" >@if($order->order_area=='outside_dhaka')  Outside Dhaka   @else Inside Dhaka @endif</span>
              <span class="badge badge-pill badge-danger" >{{$order->traking_id}}</span>

               </td>
             <td>
             <span   class="badge badge-pill badge-info" style="font-size:18px">   {{$order->billing_name}}</span>
               <br>
               <span   class="badge badge-pill badge-success" style="font-size:18px">  {{$order->billing_mobile}}</span>
              <br>
                 {{$order->shipping_address1}}
                 <br>
                <span style="color:red;font-weight: 400">Note: {{$order->order_note}} </span>
                    @if($order_track)
                     <br>
                         <span class="badge badge-pill badge-success" style="font-size:15px">{{date("d-m-Y",strtotime($order_track))}}</span>
                         <span class="badge badge-pill badge-info" style="font-size:15px">{{date("h:i a",strtotime($order_track))}}</span>
                     @endif

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
                    <?php  } elseif ($order->order_status=='pending') { ?>
                    <span    class="badge badge-pill badge-danger"  >Pending  </span>
                    <?php  } elseif ($order->order_status=='booking') { ?>
                    <span    class="badge badge-pill badge-success"  >Booking  </span>
                    <?php  } elseif ($order->order_status=='return') { ?>
                    <span    class="badge badge-pill badge-success"  >Return</span>

                    <?php  } else {  ?>
                    <span   class="badge badge-pill badge-success">Pending Invoice</span>
                <?php } ?>
                        <br>
            </td>


            <td>
                <a title="edit"   href="{{ url('admin/order') }}/{{ $order->order_id }}/edit" class=" btn btn-success btn-sm">
                    <i class="fa fa-pencil"></i>
                </a> 

                @if(($order->order_status=='ready_to_deliver') ||  ($order->order_status=='invoice'))

                <a title="print"  class="btn btn-info btn-sm" target="_blank" href="{{url('/')}}/admin/single_order_invoice/{{ $order->order_id }}?name={{ Session::get('name') }}">
                      @if($order->order_print_status ==1)
                        Done
                      @endif
                    <i class="fa fa-print "></i>
                </a>
                @endif
                <!-- <div class="input-group input-group-lg">


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
                </div> -->
            </td>
        </tr>
              @endforeach 
              <tr > <td style="text-align: center" colspan="6">  {!! $orders->links() !!}</td></tr>     
              
         
         
         
         