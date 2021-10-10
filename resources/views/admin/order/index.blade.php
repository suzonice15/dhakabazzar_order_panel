

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
                     <a href="{{url('/')}}/admin/order/create" class="btn btn-success btn-sm" style="float:right"> <i class="fa fa-plus"></i> Add New </a>
 
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

    @endsection