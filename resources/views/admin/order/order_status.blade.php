
<style> .status_active {
        background: #FE19B4 !important;
        border: none;
    }

    .order_status {
        width: 23.9%;
        background: #6A00A8;
        font-weight: bold;
        border: none;
        margin: 4px;
    }

    .btn .badge {
        position: relative;
        top: 2px;
        text-align: center;
        float: right;
        color: red;
    }

    @media (max-width: 776px) {
        .order_status {
            width: 48%;
            margin-bottom: 8px;
            background: #6a00a8;
            font-weight: bold;
            border: none;
            margin: 2px;
        }

        .btn .badge {
            position: relative;
            top: 2px;
            text-align: center;
            float: right;
            color: red;
        }
    } </style>
<div class="row" style="cursor: pointer;">
<div class="col-12 col-lg-12 col-xl-12">
    <button onClick="orderStatus('new')" type="button"
            class="btn btn-primary order_status  "> New <span class="badge badge-light">     {{totalOrder('new')}}</span>
    </button>

    <button onClick="orderStatus('pending')" type="button"
            class="btn btn-primary order_status "> Pending <span class="badge badge-light">     {{totalOrder('pending')}}</span>
    </button>

    <button onClick="orderStatus('pending_payment')" type="button"
            class="btn btn-primary order_status ">  Pending Pyment <span class="badge badge-light">     {{totalOrder('pending_payment')}}</span>
    </button>
    <button onClick="orderStatus('on_courier')" type="button"
            class="btn btn-primary order_status ">  Courier  <span class="badge badge-light">     {{totalOrder('on_courier')}}</span>
    </button>
    <button onClick="orderStatus('invoice')" type="button"
            class="btn btn-primary order_status ">    Invoice <span class="badge badge-light">     {{totalOrder('invoice')}}</span>
    </button>

    <button onClick="orderStatus('ready_to_deliver')" type="button"
            class="btn btn-primary order_status ">  Pending Invoice   <span class="badge badge-light">     {{totalOrder('ready_to_deliver')}}</span>
    </button>
    <button onClick="orderStatus('delivered')" type="button"
            class="btn btn-primary order_status ">  Delivered  <span class="badge badge-light">     {{totalOrder('delivered')}}</span>
    </button>
    <button onClick="orderStatus('cancled')" type="button"
            class="btn btn-primary order_status ">  Cancled  <span class="badge badge-light">     {{totalOrder('cancled')}}</span>
    </button>

</div>


</div>