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

