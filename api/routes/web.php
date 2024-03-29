<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin\AdminController;
use App\Http\Controllers\admin\DashboardController;
 use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\OrderController;
use App\Http\Controllers\admin\SettingController;


Route::group(['prefix'=>'admin',
'middleware' => 'admin'], function(){  
   
  Route::get('/login', [AdminController::class, 'login']); 
  Route::get('/logout', [AdminController::class, 'logout']);   
  
    Route::get('/dashboard', [DashboardController::class, 'index']); 
    Route::get('/order', [OrderController::class, 'index']);
    Route::post('/order', [OrderController::class, 'store']);
    Route::get('/order/create', [OrderController::class, 'create']);
    Route::get('/order/{id}/edit', [OrderController::class, 'edit']); 
    Route::get('/order/order_status', [OrderController::class, 'order_status']);
    Route::post('/order/newProductSelectionChange', [OrderController::class, 'newProductSelectionChange']); 
    Route::post('/order/newProductEditSelectionChange', [OrderController::class, 'newProductEditSelectionChange']); 
    Route::post('/order/newProductUpdateChange', [OrderController::class, 'newProductUpdateChange']); 
    Route::post('/order/ProductUpdateChangeOfNewOrder', [OrderController::class, 'ProductUpdateChangeOfNewOrder']); 
   
    Route::post('/order/{id}', [OrderController::class, 'update']); 
    Route::get('/convertOrder', [OrderController::class, 'convertOrder']); 
    Route::get('/order/editHistory/{id}', [OrderController::class, 'editHistory']); 
    Route::get('/product/report', [OrderController::class, 'productReport']); 
    Route::get('/single_order_invoice/{id}', [OrderController::class, 'single_order_invoice']); 
    Route::get('/orderStatus/report', [OrderController::class, 'orderStatusReport']);
    Route::get('/currentMonthStaffReport', [OrderController::class, 'currentMonthStaffReport']);
    Route::get('/order/getTotalProductsReport', [OrderController::class, 'getTotalProductsReport']);
    Route::get('/order/sendCourier', [OrderController::class, 'sendCourier']);
    Route::post('/sendProductCourier', [OrderController::class, 'sendProductCourier']);


    Route::post('/orderExchange', [OrderController::class, 'orderExchange']);
    Route::get('/order/pagination', [OrderController::class, 'pagination']); 
    Route::get('/order/pagination_search_by_phone', [OrderController::class, 'pagination_search_by_phone']);  
    Route::get('/order/pagination_search_by_order_id', [OrderController::class, 'pagination_search_by_order_id']);  
    Route::get('/order/searchOrderOfRedexCourier', [OrderController::class, 'searchOrderOfRedexCourier']);  
    Route::get('/order/getSinglePercel', [OrderController::class, 'getSinglePercel']);  

    
    Route::get('/setting', [SettingController::class,'setting']);  
    Route::post('/setting', [SettingController::class,'setting']);

     
});

Route::get('/', [AdminController::class, 'login']);
Route::get('/login', [AdminController::class, 'login']);
Route::post('/login', [AdminController::class, 'LoginCheck']);
Route::get('/admin/cache-clean',
    function() {
        Cache::flush();
        Artisan::call('cache:clear');
        Artisan::call('view:clear');
        return view('admin.setting.cache');
    }
);

Route::get('/{id}', [AdminController::class,'login']);
