
@extends('admin.master')
@section('main',"Blog")
@section('active',"Add New Blog")
@section('title',"Add New Blog")
@section('main-content')
<section class="content">
    <div class="container-fluid">
        <div class="card card-defualt">
            <div class="card-header">
                <h3 class="card-title">Add New Blog</h3>
                <div class="card-tools"></div>
            </div>
            <form action="{{ route('blog.store') }}" method="post"  enctype="multipart/form-data">
            @csrf
                <div class="card-body">
                    <div class="card card-info">
                        <div class="card-header"><h6>Basic Blog Information</h6></div>
                        <div class="row">
                            <div class="col-md-11 col-sm-12 pl-4 mt-2">
                                <div class="form-group">
                                    <label for="blog_name">Blog Title<span class="required">*</span></label>
                                    <input required type="text" name="blog_name" id="blog_name" autocomplete="on" class="form-control" value="" />

                                </div>
                                <div class="form-group">
                                    <label for="blog_parmalink">Parmalink<span class="required">*</span></label>
                                    <input required type="text" id="blog_parmalink" name="blog_parmalink" class="form-control the_name" value="" />
                                </div> 
                               
                                <div class="form-group">
                                    <label for="blog_description">Description<span class="required">*</span></label>
                                           <textarea  required name="blog_description" 
                                    class="form-control ckeditor"></textarea>  
                                </div> 

                                <div class="form-group">
                                    <label for="blog_parmalink">Status<span class="required">*</span></label>
                                      
                                    <select name="blog_status" class="form-control">
                                    <option value="1">Top Blog</option>
                                        <option value="0">General Blog</option> 
                                    </select>
                                </div> 

                                <div class="form-group">
                                    <label for="blog_parmalink">Featured Picture<span class="required">*</span></label>
                                    <input required type="file" id="blog_picture" name="blog_picture" class="form-control " value="" />
                                </div> 

                                <div class="form-group">
                                     <input   type="submit"    class="btn btn-success " value="Save" />
                                </div> 
                                
                            </div>
                           
                    </div>
                
                       
                    </div>
                
                  
                </div>
            </form>
        </div>
    </div>
</section>  

<script>
        $(document).ready(function () {
            $("#blog_name").on('input click', function () {
                var text = $("#blog_name").val();  
                var word = text.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                $("#blog_parmalink").val(word);               
            });
        });
 </script>


    @endsection