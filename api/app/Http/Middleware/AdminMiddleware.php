<?php

namespace App\Http\Middleware;

use Closure;
use Session;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $userId=Session::get('admin_id');  
          if($userId){
            return $next($request);
          } else {
             return redirect("/login");
          }
        return $next($request);
    }
}
