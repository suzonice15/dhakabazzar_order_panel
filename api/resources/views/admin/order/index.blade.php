@extends('admin.master')
@section('main',"Orders")
@section('active',"  Orders List")
@section('title'," Orders List")

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
        <div class="row" style="cursor: pointer;">
            <span id="order_status_view"></span>

            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-12 col-md-4">
                            <h3 class="card-title">Order List</h3>
                            @if(Session::get('status')=='office-staff')

                                <a href="{{url('/')}}/admin/order/create" class="btn btn-success btn-sm"
                                   style="float:right"> <i class="fa fa-plus"></i> Add New </a>
                            @else
                                <button type="button" data-toggle="modal" data-target="#modal-default"
                                        class="btn btn-danger btn-sm" style="float:right" id="deleteAll"><i
                                            class="fas fa-exchange"></i> Exchange Order
                                </button>
                            @endif

                        </div>
                        <div class="col-12 col-md-4">
                            <input type="text" id="order_id" placeholder="Enter Order ID " class="form-control">

                        </div>
                        <div class="col-12 col-md-4">
                            <input type="text" id="pagination_search_by_phone" placeholder="Enter Phone Number"
                                   class="form-control">

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
                            <th style="width: 9%;">
                                <span style="font-size: 15px;"> Office Staff</span>
                                <br/>
                                @if(Session::get('status') !='office-staff')
                                    <input type="checkbox" name="all_select" id="checkAll"/>
                                @endif
                            </th>
                            <th style="width:20%;text-align:left">Customer</th>
                            <th style="text-align:left">Products</th>
                            <th> Amount</th>
                            <th> Status</th>
                            <th width="10%">Action </th>

                        </tr>
                        </thead>
                        <tbody>
                        @include('admin.order.pagination')
                        </tbody>
                    </table>
                </div>
                <!-- /.card-body -->
            </div>
        </div>
        <!-- /.card -->

    </section>


    <?php

    $status = Session::get('status');
    if($status != 'office-staff'){
    ?>

    <div class="modal fade show" id="modal-default" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Order Exchange</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class='form-group'>
                        
                   
                    <label>Exchange to</label>
                    <select name="staff_id" id="staff_id" class="form-control">
                        <option value="">----select----</option>
                        @foreach($users as $user)
                            <option value="{{$user->user_id}}">{{$user->user_name}}</option>
                        @endforeach
                    </select>
                     </div>
                     
                       <div class='form-group'>
                        
                   
                    <label>Order Status</label>
                    <select name="order_status_convert" id="order_status_convert" class="form-control">
                        <option value="">----select----</option>
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
                <div class="modal-footer text-right">
                    <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="exchange_now">Exchange Now</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <?php }?>
    <div class="modal fade show" id="modal-edit" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Order Edit History</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body" id="order_edit_history">


                </div>
                <div class="modal-footer text-right">
                    <button type="button" class="btn   btn-danger btn-sm" data-dismiss="modal">Close</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>



    <input type="hidden" name="hidden_page" id="hidden_page" value="1"/>
    <input type="hidden" name="status" id="status" value="new"/>

    <script>

        window.load = order_status()

        function orderEdit(order_id) {
            $.ajax({
                type: "GET",
                url: "{{url('admin/order/editHistory')}}/" + order_id,
                success: function (data) {

                    $('#order_edit_history').html(data);
                }
            })

        }
        $("#exchange_now").click(function () {
            var staff_id = $("#staff_id").val();
            var order_status_convert = $("#order_status_convert").val();
            // if (staff_id == '') {
            //     alert("Please Select at least One Staff")
            //     return false;
            // }
            var order_id = new Array();
//var allId=$('.checkAll').val();
            $('.checkAll').each(function () {
                if ($(this).is(":checked")) {
                    order_id.push(this.value);
                }
            });
            if (order_id.length > 0) {
                $.ajax({

                    url: '{{url('/')}}/admin/orderExchange',
                    data: {
                        order_id: order_id,
                        order_status:order_status_convert,
                        staff_id: $("#staff_id").val(),
                        "_token": "{{csrf_token()}}"
                    },
                    type: 'post',
                    success: function (data) {
                        location.reload();
                    }
                });
            } else {
                alert("Please select Order Id")
            }
        });

        //$('#checkAll').change(function () {
        $(document).on("change", "#checkAll", function (event) {

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


            if (order_id.length == 0) {

                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Please Select At least One Order Id',
                    showConfirmButton: true,
                    timer: 2000
                })
            }


        });

        function fetch_data(page, status) {
            $.ajax({
                type: "GET",
                url: "{{url('admin/order/pagination')}}?page=" + page + "&status=" + status,
                success: function (data) {
                    $('tbody').html('');
                    $('tbody').html(data);
                }
            })
        }
        function order_status() {
            $.ajax({
                type: "GET",
                url: "{{url('admin/order/order_status')}}",
                success: function (data) {
                    $('#order_status_view').html(data);
                }
            })
        }
        function orderStatus(status) {
            $('#status').val(status);
            let page = 1;
            fetch_data(page, status);
        }

    </script>


    <script>


        function pagination_search_by_order_id(query) {
            var page = 1
            $.ajax({
                type: "GET",
                url: "{{url('admin/order/pagination_search_by_order_id')}}?page=" + page + "&query=" + query,
                success: function (data) {
                    $('tbody').html('');
                    $('tbody').html(data);
                }
            })
        }


        function pagination_search_by_phone(query) {
            var page = 1
            $.ajax({
                type: "GET",
                url: "{{url('admin/order/pagination_search_by_phone')}}?page=" + page + "&query=" + query,

                success: function (data) {
                    $('tbody').html('');
                    $('tbody').html(data);
                }
            })
        }
        function pagination_search_by_product_code(query) {
            var page = 1
            $.ajax({
                type: "GET",
                url: "{{url('order/pagination_search_by_product_code')}}?page=" + page + "&query=" + query,

                success: function (data) {
                    $('tbody').html('');
                    $('tbody').html(data);
                }
            })
        }


        $(document).on('keyup input', '#order_id', function () {
            var query = $('#order_id').val();
            if (query.length > 1) {
                pagination_search_by_order_id(query);
            } else {
                fetch_data(1, 'new');
            }
        });


        $(document).on('keyup input', '#product_code', function () {
            var query = $('#product_code').val();
            var page = $('#hidden_page').val();
            var status = $('#status').val();
            if (query.length > 3) {
                pagination_search_by_product_code(page, query);
            } else {
                fetch_data(1, 'new');
            }
        });
        $(document).on('keyup input', '#pagination_search_by_phone', function () {
            var query = $('#pagination_search_by_phone').val();

            if (query.length > 7) {
                pagination_search_by_phone(query);
            } else {
                fetch_data(1, 'new');
            }
        });


        $(document).on('click', '.pagination a', function (event) {

            event.preventDefault();
            var page = $(this).attr('href').split('page=')[1];
            $('#hidden_page').val(page);
            var status = $('#status').val();
            fetch_data(page, status);
        });


        $(document).on('click', '.status_check', function () {
            var status = $(this).val()
            $('#status').val(status);
            var status = $('#status').val();
            var page = 1;
            fetch_data(page, status);
        });


    </script>



@endsection