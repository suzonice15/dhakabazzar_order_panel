<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
class DashboardController extends Controller
{
    public  function index(){

        $data['users']=  DB::table('users')->get();

        return view('admin.dashboard',$data);
    }
}
