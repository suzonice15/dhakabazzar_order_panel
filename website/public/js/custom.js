// JavaScript Document.

// Just Added Products Carousal
(function() { 
  // store the slider in a local variable
  var $window = $(window),
      flexslider;
 
  // tiny helper function to add breakpoints
 function getGridSize() {
    	 return (window.innerWidth < 470) ? 1 :
		   	    (window.innerWidth < 800) ? 2 :
           		(window.innerWidth < 1200) ? 3 : 4;
  	}	
 
  $window.load(function() {
    $('.crflexslider').flexslider({
      animation: "slide",
    animationSpeed: 1000, 
     slideshow:false,
      animationLoop: true,
      itemWidth: 250,
      itemMargin: 34,
	  move: 1,
      minItems: getGridSize(), // use function to pull in initial value
      maxItems: getGridSize() // use function to pull in initial value
    });
  });
 
  // check grid size on resize event
}());

// Recommended For You Carousal

(function() { 
  // store the slider in a local variable
  var $window = $(window),
      flexslider;
 
  // tiny helper function to add breakpoints
  function getGridSize1() {
    return (window.innerWidth < 470) ? 1 :
		   (window.innerWidth < 800) ? 2 :
           (window.innerWidth < 1200) ? 3 : 3;
  }
 
  $window.load(function() {
    $('.newflexslider').flexslider({
      animation: "slide",
      animationLoop: true,
	  slideshow: false,
      itemWidth: 270,
      itemMargin: 33,
	  move: 1,
      minItems: getGridSize1(), // use function to pull in initial value
      maxItems: getGridSize1() // use function to pull in initial value
    });
  });
 
  // check grid size on resize event


}());


// Brand Carousal full
(function() { 
  // store the slider in a local variable
  var $window = $(window),
      flexslider;
 
  // tiny helper function to add breakpoints
  function getGridSize2() {
    return (window.innerWidth < 470) ? 1 :
		   (window.innerWidth < 800) ? 2 :
           (window.innerWidth < 1200) ? 5 : 5;
  }
 
  $window.load(function() {
    $('.brandflexsliderfull').flexslider({
      animation: "slide",
      animationLoop: true,
      itemWidth: 270,
      itemMargin: 32,
      minItems: getGridSize2(), // use function to pull in initial value
      maxItems: getGridSize2() // use function to pull in initial value
    });
  });
 
  // check grid size on resize event

}());


$(document).ready(function(e) {

// Twitter
	$("#twitter").tweet({
	join_text: "auto",
	username: "wrapbootstrap", //replace this with your username
	modpath: './twitter/',
	avatar_size: 32,
	count: 2,
	auto_join_text_default: "we said,",
	auto_join_text_ed: "we",
	auto_join_text_ing: "we were",
	auto_join_text_reply: "we replied",
	auto_join_text_url: "we were checking out",
	loading_text: "loading tweets..."
	});
	
	
// Latest Deal	
	var clock;
	clock = $('.clock').FlipClock({
		clockFace: 'DailyCounter',
	});
	
// Tab SLider
	$('#main-slider').liquidSlider({
	 mobileNavDefaultText: "Slider Tab"
	});
	
// Product Thumb Zoom
	$('.my-foto-container').imagezoomsl({ 
	 zoomrange: [1, 12],
         zoomstart: 4,
         innerzoom: true,
         magnifierborder: "none",	    
          magnifiersize: [500, 300],
          scrollspeedanimate: 10,
          loopspeedanimate: 5,          
         // magnifiereffectanimate: "slideIn"	
	}); 
	$ (".zoom" ).click( function () {
    var That =  this ;
    $( ".my-foto-container" ).fadeOut ( 100 , function (){
	 $(this).attr( "src" ,$ ( That).attr ( "src" ))            
     . attr ("data-large", $ (That).attr ("data-large")).fadeIn (200 )
	 . attr ("data-title", $ (That).attr ("data-title"))
	 . attr ("data-help", $ (That).attr ("data-help"))
				
           }); 
       }); 

//Tab Why Us
	$('#myTab a').click(function (e) {
		e.preventDefault()
  		$(this).tab('show');
	})
	$('#myTab a:first').tab('show') ;// Select first tab

//Tab Why Us
	$('.myTabclass a').click(function (e) {
		e.preventDefault()
  		$(this).tab('show');
	})
	$('.myTabclass a:first').tab('show'); // Select first tab

// Tooltip	
	$('[data-toggle="tooltip"]').tooltip()
	
// plus mines button in qty 
$(".qtyBtn").click(function(){
		if($(this).hasClass("increase")){
			var qty = $("#qty").val();
			qty++;
			$("#qty").val(qty);
		}else{
			var qty = $("#qty").val();
			qty--;
			if(qty>0){
				$("#qty").val(qty);
			}
		}
	});	

// Grid View
	$('.productlistpage #productgrid').show()
	$('.productlistpage #grid').click(function()
	{	$(this).addClass ('btn-new').children('i').addClass('icon-white')
		$('.productlistpage #productlist').fadeOut()
		$('.productlistpage #productgrid').fadeIn()
		$('.productlistpage #list').removeClass ('btn-new').children('i').removeClass('icon-white')
	});
	$('.productlistpage #list').click(function()
	{	$(this).addClass ('btn-new').children('i').addClass('icon-white')
		$('.productlistpage #productgrid').fadeOut()
		$('.productlistpage #productlist').fadeIn()
		$('.productlistpage #grid').removeClass ('btn-new').children('i').removeClass('icon-white')
	});
	
	
// List View
	$('.productgridpage #productlist').show()
	
	$('.productgridpage #list').click(function()
	{	$(this).addClass ('btn-new').children('i').addClass('icon-white')
		$('.productgridpage #productgrid').fadeOut()
		$('.productgridpage #productlist').fadeIn()
		$('.productgridpage #grid').removeClass ('btn-new').children('i').removeClass('icon-white')
	});
	
	$('.productgridpage #grid').click(function()
	{	$(this).addClass ('btn-new').children('i').addClass('icon-white')
		$('.productgridpage #productlist').fadeOut()
		$('.productgridpage #productgrid').fadeIn()
		$('.productgridpage #list').removeClass ('btn-new').children('i').removeClass('icon-white')
	});
	
	
	
	/*### checkout steps ###*/
	jQuery('.checkoutsteptitle').addClass('down').next('.checkoutstep').fadeIn();
	jQuery('.checkoutsteptitle').on('click', function()
	{
		jQuery("select, input:checkbox, input:radio, input:file").css('display', 'blcok');
		jQuery(this).toggleClass('down').next('.checkoutstep').slideToggle();
	});


	/***************new java suzon  */
	

	
	

	jQuery('form#checkout #billing_phone').on('blur', function()
	{
	
		var billing_phone = jQuery('form#checkout #billing_phone').val();
		 var filter = /^[0-9]{11}$/;

        if (!filter.test(billing_phone)) {
           //  alert("Enter valid Bangladeshi Number such as 01970778457")
         //   jQuery('form#checkout #billing_phone').addClass('error');
		  //  jQuery('form#checkout button.confirm_order').attr('disabled',true); 
        }
        else {
                   

           		var billing_name = jQuery('form#checkout #billing_name').val();
           		var order_total=$("input[name=order_total]").val();

           			var product_name = [];
$('.product_name').each(function(){
    product_name.push($(this).val()); 
});
           		
           		
           			var product_price = [];
$('.product_price').each(function(){
    product_price.push(Number($(this).val().replace(/\,/g,''))); 
});

	var product_color = [];
$('.product_color').each(function(){
    product_color.push($(this).val()); 
});
           		
           		
           			var product_size = [];
$('.product_size').each(function(){
    product_size.push($(this).val()); 
});
           		
           			var product_qty = [];
$('.product_qty').each(function(){
    product_qty.push($(this).val()); 
});
           		
           			var product_featured_image = [];
$('.product_featured_image').each(function(){
    product_featured_image.push($(this).val()); 
});
           //	alert(product_price);
           		

               	//	var ajax_url = base_url+'ajax/tryOrder';

		    jQuery('form#checkout #billing_phone').removeClass('error');
		 //  
		  //  jQuery('form#checkout button.confirm_order').attr('disabled',false);
		    	
            $.ajax({
                type: "POST",
                data: {product_name:product_name,product_price:product_price,product_color:product_color,billing_phone:billing_phone,billing_name:billing_name,product_featured_image:product_featured_image,product_qty:product_qty,product_size:product_size,order_total:order_total},
                url: ajax_url,
                success: function (result) {
                    debugger;
                    console.log(result);
                  //  alert(result);
                },
                error:function(result){
                                        console.log(result);

                   // alert(result);
                }
                
            });
            
		    
        }

	
	});
	
		jQuery('form#checkout #shipping_address1').on('blur', function()
	{
	
		var shipping_address1 = jQuery('form#checkout #shipping_address1').val().trim();

	
	});
	
	
	
	jQuery('form#checkout button.confirm_order').on('click', function()
	{
		jQuery('form#checkout .form-control').removeClass('error');
		
		
	

		jQuery('form#checkout').submit();
	});
	
	
// Contact Form 
		$(".contactform").validate({
	   submitHandler: function(form) {
		   var name = $("input#name").val();
		   var email = $("input#email").val();
		   var url = $("input#url").val();
		   var message = $("textarea#message").val();
		   
		   var dataString = 'name='+ name + '&email=' + email + '&url=' + url+'&message='+message;
		  $.ajax({
		  type: "POST",
		  url: "email.php",
		  data: dataString,
		  success: function() {
			  $('#contactmsg').remove();
			  $('.contactform').prepend("<div id='contactmsg' class='successmsg'>Form submitted successfully!</div>");
			   $('#contactmsg').delay(1500).fadeOut(500);
			  $('#submit_id').attr('disabled','disabled');
			  }
		 	});   
	   return false;
	  	}
		});
		
// Scroll top
	$(window).scroll(function () {
			if ($(this).scrollTop() > 50) {
				$('#gotop').fadeIn(500);
							
			} else {
				$('#gotop').fadeOut(500);
			}
		});	
	$('#gotop').click(function()
			{
				
				$("html, body").animate({ scrollTop: 0 }, 600);
			})
		
});	






// Window load Events
$( window ).load(function() {	
	$widthscreen = $(window).width();
	if ($widthscreen > 801){
	// Mega Menu
	$('ul.mainnav li.dropdown').hover(function()
		{
			$(this).children('.dropdown-menu').fadeIn(0)
		},
		function()
		{
			$(this).children('.dropdown-menu').fadeOut(0)
		}
		)
	}

});	

$(function() {
	$(document).on('mouseover', '.yamm .dropdown-menu', function(e) {
		e.stopPropagation()
	})
})
