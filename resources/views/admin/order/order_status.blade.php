<div class="row" style="cursor: pointer;" >

<div class="col-12 col-sm-6 col-md-3">
            <div class="info-box" onClick="orderStatus('new')">
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
            <div class="info-box mb-3" onClick="orderStatus('pending')">
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
            <div class="info-box mb-3" onClick="orderStatus('pending_payment')">
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
        <div class="info-box mb-3" onClick="orderStatus('on_courier')">
            <span class="info-box-icon bg-success elevation-1"><i class="fas fa-shopping-cart"></i></span>

            <div class="info-box-content">
                <span class="info-box-text">Courier</span>
                <span class="info-box-number">{{totalOrder('on_courier')}} </span>
            </div>
            <!-- /.info-box-content -->
        </div>
    </div>
  
          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3" onClick="orderStatus('invoice')">
              <span class="info-box-icon bg-warning elevation-1"><i class="fas fa-shopping-cart"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Invoice</span>
                <span class="info-box-number">{{totalOrder('invoice')}}  </span>
              </div>
              <!-- /.info-box-content -->
            </div>
            
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3" onClick="orderStatus('ready_to_deliver')">
              <span class="info-box-icon bg-warning elevation-1"><i class="fas fa-shopping-cart"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Pending Invoice  </span>
                <span class="info-box-number">{{totalOrder('ready_to_deliver')}} </span>
              </div>
              <!-- /.info-box-content -->
            </div>
            
          </div>




          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3" onClick="orderStatus('delivered')">
              <span class="info-box-icon bg-success elevation-1"><i class="fas fa-shopping-cart"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Delivered</span>
                <span class="info-box-number">{{totalOrder('delivered')}} </span>
              </div>
              <!-- /.info-box-content -->
            </div>
            
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <div class="info-box mb-3" onClick="orderStatus('cancled')">
              <span class="info-box-icon bg-danger elevation-1"><i class="fas fa-shopping-cart"></i></span>

              <div class="info-box-content">
                <span class="info-box-text">Cancled</span>
                <span class="info-box-number">{{totalOrder('cancled')}} </span>
              </div>
              <!-- /.info-box-content -->
            </div>
            
          </div>
        </div>
        </div>