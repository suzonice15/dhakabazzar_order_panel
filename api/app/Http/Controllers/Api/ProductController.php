<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CategoryProductRelation;
use App\Models\Product;
use Illuminate\Http\Request;
use DB;

class ProductController extends Controller
{
    public function Products($product_name)
    {
        $product=DB::table('product')->where('product_name',$product_name)->first();
        if($product){

            $data['image']=getProductGalaryImageByProductId($product->product_id);
            $data['product']=$product;
        }
        return response()->json($data);
    }

    public function allProduct()
    {
        $data=DB::table('v_product_category')->groupBy('product_id')->get();
        return response()->json($data);
    }
    public function singleProductRightCategory($product_id)
    {
        $data=CategoryProductRelation::with('category')->select('category_title','category_name','term_id')
            ->where('product_id',$product_id)->limit(3)->get();
        return response()->json($data);
    }


    public function related_products($product_name)
    {

        $data=  CategoryProductRelation::inRandomOrder()->where('product_name',$product_name)
            //->where('product_name','!=',$product_name)
            ->limit(6)->get();

        return response()->json($data);   
        
      
    }

  
    public function hotProducts()
    {
        $data=  CategoryProductRelation::where('discount_price','>=',1000)
            ->limit(6)->get();
        return response()->json($data);
    }
    public function productSearch(Request $request)
    {
        $search=$request->search;
        $data=  Product::where('product_title','like',"%$search")
            ->limit(30)->get();
        return response()->json($data);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
