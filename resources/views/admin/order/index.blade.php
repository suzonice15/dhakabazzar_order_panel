

@extends('admin.master')
@section('main',"Orders")
@section('active',"  Orders List")
@section('title'," Orders List")

@section('main-content')
 

<section class="content">


<div class="row" style="cursor: pointer;">
          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box">
              <span class="info-box-icon bg-info elevation-1"><i class="fas fa-shopping-cart"></i></span>
              <div class="info-box-content">
                <span class="info-box-text">New</span>
                <span class="info-box-number">
                 {{totalOrder('new')}}
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
                <span class="info-box-number"> {{totalOrder('pending')}} </span>
             
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
                <span class="info-box-number">{{totalOrder('pending_payment')}} </span>
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
                <span class="info-box-text">Processing</span>
                <span class="info-box-number">{{totalOrder('processing')}}  </span>
              </div>
              <!-- /.info-box-content -->
            </div>
            
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-warning elevation-1"><i class="fas fa-shopping-cart"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Ready To Deliver</span>
                <span class="info-box-number">{{totalOrder('ready_to_deliver')}} </span>
              </div>
              <!-- /.info-box-content -->
            </div>
            
          </div>
         
          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-success elevation-1"><i class="fas fa-shopping-cart"></i></span>
 
              <div class="info-box-content">
                <span class="info-box-text">Courier</span>
                <span class="info-box-number">{{totalOrder('on_courier')}} </span>
              </div>
              <!-- /.info-box-content -->
            </div>            
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-success elevation-1"><i class="fas fa-shopping-cart"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Delivered</span>
                <span class="info-box-number">{{totalOrder('delivered')}} </span>
              </div>
              <!-- /.info-box-content -->
            </div>
            
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3">
              <span class="info-box-icon bg-danger elevation-1"><i class="fas fa-shopping-cart"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Cancled</span>
                <span class="info-box-number">{{totalOrder('cancled')}} </span>
              </div>
              <!-- /.info-box-content -->
            </div>
            
          </div>
        </div>
      <div class="card">
        <div class="card-header">
            <div class="row">
                <div class="col-12 col-md-8">
                     <h3 class="card-title">Order  List</h3>
                     @if(Session::get('status')=='office-staff')

                     <a href="{{url('/')}}/admin/order/create" class="btn btn-success btn-sm" style="float:right"> <i class="fa fa-plus"></i> Add New </a>
                     @else
                     <button  type="button"  data-toggle="modal" data-target="#modal-default" class="btn btn-danger btn-sm" style="float:right"  id="deleteAll"><i class="fas fa-exchange"></i> Exchange Order </button>
                   @endif
                     
              </div>
              <div class="col-12 col-md-4">
                      <input type="text" id="search" placeholder="Enter Order Id /Phone Number" class="form-control">

              </div>

             </div>
        </div>
        <div class="card-body p-0 table-responsive">
        <table class="table table-bordered projects">
              <thead>                	 	 	  	  
                  <tr style="text-align:center">
                   <th width="10%">
                         Order ID
                      </th>
                      @if(Session::get('status') !='office-staff')
                      <th>
                        <input type="checkbox" name="all_select" id="checkAll" />
                       Office Staff
                      </th>
                      @endif
                      <th  style="width:20%">Customer</th>

                      <th style="text-align:left">Products</th>
                        <th>   Amount   </th>  
                        <th>   Status   </th> 
                      <th>
                          Action
                      </th>
                     
                  </tr>
              </thead>
              <tbody>

              @include('admin.order.pagination')

   </table>

        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->

    </section>


    <div class="modal fade show" id="modal-default" aria-modal="true" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Order Exchange</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              <label>Exchange to</label>
              <select name="staff_id" id="staff_id" class="form-control">
                <option value="">----select----</option>
                @foreach($users as $user)
                <option value="{{$user->user_id}}">{{$user->user_name}}</option>
                @endforeach
             </select>
              
            
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" id="exchange_now">Exchange Now</button>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
<script>

$(document).ready(function(){


$("#exchange_now").click(function(){
  var staff_id=$("#staff_id").val();
  if(staff_id==''){
    alert("Please Select at least One Staff")
    return false;
  }
  var order_id = new Array();
//var allId=$('.checkAll').val();
$('.checkAll').each(function () {
if ($(this).is(":checked")) {
  order_id.push(this.value);
}
});
if(order_id.length >0){
$.ajax({

url: '{{url('/')}}/admin/orderExchange',
data: {
  order_id: order_id,
  staff_id: $("#staff_id").val(),
  "_token":"{{csrf_token()}}"
},
type: 'post',
success: function (data) {
  location.reload(); 


}
});
} else{
  alert("Please select Order Id")
}

 

})

	//$('#checkAll').change(function () {
		$(document).on("change", "#checkAll", function(event){

if ($(this).is(":checked")) {

$('.checkAll').prop('checked', true);

} else if ($(this).is(":not(:checked)")) {

$('.checkAll').prop('checked', false);

}

});
$('#deleteAll').click(function (e) {
e.preventDefault();
var order_id = new Array();
//var allId=$('.checkAll').val();
$('.checkAll').each(function () {
if ($(this).is(":checked")) {
  order_id.push(this.value);
}
});


if(order_id.length==0){

  Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Please Select At least One Order Id',
        showConfirmButton: true,
        timer: 2000
    })
}


});
})
</script>

    @endsection