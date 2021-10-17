<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin\AdminController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\BlogController;
use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\OrderController;
use App\Http\Controllers\admin\SettingController; 


Route::get('/', [AdminController::class, 'login']); 
Route::get('/login', [AdminController::class, 'login']); 


 Route::group(['prefix'=>'admin',
'middleware' => 'admin'], function(){   
   
  Route::get('/login', [AdminController::class, 'login']); 
  Route::get('/logout', [AdminController::class, 'logout']);

   
    Route::post('/login', [AdminController::class, 'LoginCheck']); 
    Route::get('/dashboard', [DashboardController::class, 'index']); 
    Route::get('/order', [OrderController::class, 'index']); 
    Route::get('/order/create', [OrderController::class, 'create']); 
    Route::get('/order/order_status', [OrderController::class, 'order_status']); 
    Route::post('/newProductSelectionChange', [OrderController::class, 'newProductSelectionChange']); 


    Route::post('/orderExchange', [OrderController::class, 'orderExchange']);
    Route::get('/order/pagination', [OrderController::class, 'pagination']); 
    Route::get('/order/pagination_search_by_phone', [OrderController::class, 'pagination_search_by_phone']);  
    Route::get('/order/pagination_search_by_order_id', [OrderController::class, 'pagination_search_by_order_id']);  

    
    Route::get('/setting', [SettingController::class,'setting']);  
    Route::post('/setting', [SettingController::class,'setting']);
    Route::get('/cache-clean', 
    function() {
          Cache::flush();
        Artisan::call('cache:clear');
       Artisan::call('view:clear');
         return view('admin.setting.cache');
   }
);   
});

