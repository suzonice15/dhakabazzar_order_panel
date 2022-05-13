/*# set popup div position #*/
function popup_dv_position_set(dv_id)
{
	var win_width = jQuery(window).width();
	var win_height = jQuery(window).height();
	var div_width = jQuery('#'+dv_id).width();
	var div_height = jQuery('#'+dv_id).height();
	var cal_left = (win_width/2) - (div_width/2);
	var cal_top = (win_height/2) - (div_height/2);
	if(cal_top < 60){cal_top = 60;}
	jQuery('#'+dv_id).css({'left':cal_left, 'top':cal_top, 'position':'fixed'});
}


jQuery(document).ready(function()
{



	 

	var emailPattern=/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	
	/*### close popup ####*/
	jQuery('body').on('click', '#cboxPopup', function()
	{
		jQuery('#cboxPopup').remove();
		jQuery('#cboxClose').remove();
		jQuery('#loginbox').hide();
	});
	jQuery('#cboxClose').on('click', function()
	{
		jQuery('#cboxPopup').remove();
		jQuery('#cboxClose').remove();
	});


	/*### current link make active ###*/
	jQuery("#mainmenu a").each(function()
	{
		jQuery(this).closest('#mainmenu li.level0').removeClass('active');
		
		var path = window.location.pathname;
		var href = jQuery(this).attr('href');
		
		if(href.indexOf(path) !== -1)
		{
			jQuery(this).closest('li.level0').addClass('active');
			return false;
		}
	});
	jQuery(window).scroll(function()
	{
	    	var win_width = jQuery(window).width();
		
		if(win_width<=399)
		{
		    
		  jQuery('#hpart .topnav mobile').addClass('col-sm-6');
	
		  
		  jQuery('.list_all #menuIdLink').click(function(e){
		   
		        e.preventDefault();
		      
		  });
		 
	
		}else {
		    	if(win_width<=999)
		{
			jQuery('#hpart .topnav mobile').addClass('col-sm-6');
		}
		}
		
	   
		
	});
 

jQuery(".category-menu a.view-all-cats").on('click', function()
	{
		var win_width = jQuery(window).width();
		
		if(win_width<=999)
		{
			jQuery('.catnavul').toggle('slide', 
			{
	            direction: 'left'
	        });
		}
		else
		{
			var this_parent = jQuery(this).parent();

			if(this_parent.hasClass('active'))
			{
				this_parent.removeClass('active');
			}
			else
			{
				this_parent.addClass('active');
			}
		}

		return false;
	});

	jQuery(".close_category_menu").on('click', function()
	{
		jQuery('.catnavul').toggle('slide', 
		{
            direction: 'left'
        });

		return false;
	});

	  
	/*### floating sticky social bar ###*/
	jQuery("#close_social").click(function(e)
	{
        jQuery(this).parent().toggleClass("closed");
        e.stopPropagation();
        return false;
    });


	/*### popup login ###*/
	jQuery('body').on('click', '.btnlogin', function()
	{
		jQuery('body').append('<div id="cboxPopup"></div>');
		jQuery('#loginbox').show();
		popup_dv_position_set('loginbox');
		return false;
	});
	
	
	/*### qty update using plus minus ###*/
	jQuery(document).on('click', '.plus, .minus', function()
	{
		var qty=jQuery(this).parents('.input-group').find('.quantity .qty');
		
		var currentVal	=	parseFloat(qty.val()),
			max			=	parseFloat(qty.attr('max')),
			min			=	parseFloat(qty.attr('min')),
			step		=	qty.attr('step');
		
		// Format values
		if(!currentVal || currentVal==='' || currentVal==='NaN' ) currentVal=0;
		if(max==='' || max==='NaN') max='';
		if(min==='' || min === 'NaN' ) min = 0;
		if(step==='any' || step==='' || step===undefined || parseFloat( step )==='NaN' ) step=1;

		// Change the value
		if(jQuery(this).is('.plus'))
		{
			if(max && (max==currentVal || currentVal > max))
			{
				qty.val(max);
			}
			else
			{
				qty.val(currentVal + parseFloat(step));
			}
		}
		else
		{
			if(min && (min == currentVal || currentVal < min))
			{
				qty.val( min );
			}
			else if(currentVal > 0)
			{
				qty.val( currentVal - parseFloat(step));
			}
		}

		qty.trigger('change');
	});
	//update cart when change quantity in cart page
	jQuery('.quantity').on('input propertychange change', function()
	{
		jQuery('.cart-update-block input.cartUpdateBtn').trigger('click');
	});


	/*### wishlist ###*/
	jQuery('body').on('click', '.add_to_wish_list', function()
	{
		var this_link = jQuery(this);
		var product_id = jQuery(this).attr('data-product_id');

		var ajax_url = base_url+'ajax/add_to_wish_list';

		if(this_link.hasClass('active'))
		{
			ajax_url = base_url+'ajax/remove_wish_list'
		}

		jQuery.ajax({
			type : 'POST',
			data : {"product_id" : product_id},
			url : ajax_url,
			success : function(result)
			{
				if(this_link.hasClass('active'))
				{
					this_link.removeClass('active');
				}
				else
				{
					this_link.addClass('active');
				}
			}
		});
		
	});
	jQuery('.remove_wish_list').on('click', function()
	{
		var this_link = jQuery(this);
		var product_id = jQuery(this).attr('data-product_id');

		jQuery.ajax({
			type : 'POST',
			data : {"product_id" : product_id},
			url : base_url+'ajax/remove_wish_list',
			success : function(result)
			{
				if(result=='empty_wishlist')
				{
					window.location.reload();
				}
				else
				{
					this_link.parent().parent().remove();
				}
			}
		});
	});
	
	
	/*### add to cart ###*/
	jQuery('body').on('click', '.buy_now', function()
	{
		var this_link = jQuery(this);
		var product_id=jQuery(this).attr('data-product_id');
		var product_price=jQuery(this).attr('data-product_price');
		var product_title=jQuery(this).attr('data-product_title');
		
		//alert('product_id: '+product_id);
		//alert('product_price: '+product_price);
		//alert('product_title: '+product_title);
		
		var ajax_url = base_url+'ajax/add_to_cart';
		
		jQuery.ajax({
			type: 'POST',
			data: {
				"product_id" : product_id,
				"product_qty" : 1,
				"product_price" : product_price,
				"product_title" : product_title
			},
			url: ajax_url,
			beforeSend: function()
			{
				this_link.append('<img src="'+base_url+'images/loading.gif" style="width:16px;height:16px;display:inline-block;margin:0px;margin-left:5px;padding:0px;">');
			},
			success: function(result)
			{
			   // console.log(result)
		 	location.replace(base_url+'checkout');
			}
		});
		
		return false;
	});
	
		jQuery('body').on('click', '.buy_now_single', function()
	{
		var this_link = jQuery(this);
		var product_id=jQuery(this).attr('data-product_id');
		var product_price=jQuery(this).attr('data-product_price');
		var product_title=jQuery(this).attr('data-product_title');
		var ajax_url = base_url+'ajax/add_to_cart';
var product_size=jQuery("input[name='product_size']:checked").val();
var product_color=jQuery("input[name='product_color']:checked").val();
if(product_size || product_color){

		jQuery.ajax({
			type: 'POST',
			data: {
				"product_id" : product_id,
				"product_qty" : 1,
				"product_price" : product_price,
				"product_title" : product_title,
					"product_size":product_size,
				"product_color":product_color
			},
			url: ajax_url,
			beforeSend: function()
			{
				this_link.append('<img src="'+base_url+'images/loading.gif" style="width:16px;height:16px;display:inline-block;margin:0px;margin-left:5px;padding:0px;">');
			},
			success: function(result)
			{
				location.replace(base_url+'checkout');
			}
		});
		
		return false;
} else {
    jQuery("#mpart #product_errror").text('Enter the Product Size or Color');
   
}
	});
		jQuery('body').on('click', '.add_to_cart_single', function()
	{
		var this_link = jQuery(this);
		var product_id=jQuery(this).attr('data-product_id');
		var product_price=jQuery(this).attr('data-product_price');
		var product_title=jQuery(this).attr('data-product_title');
var product_size=jQuery("input[name='product_size']:checked").val();
var product_color=jQuery("input[name='product_color']:checked").val();

if(product_size || product_color){
		var product_qty=1;
	
		if(jQuery("input#product_qty").length > 0)
		{
			product_qty=jQuery("input#product_qty").val();
		}
		
		var ajax_url = base_url+'ajax/add_to_cart';
		
		jQuery.ajax({
			type: 'POST',
			data: {
				"product_id" : product_id,
				"product_qty" : product_qty,
				"product_price" : product_price,
				"product_title" : product_title,
				"product_size":product_size,
				"product_color":product_color
			},
			url: ajax_url,
			beforeSend: function()
			{
				this_link.append('<img src="'+base_url+'images/loading.gif" style="width:16px;height:16px;display:inline-block;margin:0px;margin-left:5px;padding:0px;">');
			},
			success: function(result)
			{
				this_link.find('img').remove();
				
				var response = JSON.parse(result);
				
				//jQuery('aside#minicart').addClass('active');
				jQuery('aside#minicart .innerbox').html(response.html);
				//setTimeout(function(){ jQuery('aside#minicart').removeClass('active'); }, 5000);

				jQuery('header .cartbtn .items .itemcount').removeClass('item_0');
				jQuery('header .cartbtn .items .itemcount').addClass('item_'+response.current_cart_item);
				jQuery('header .cartbtn .items .itemcount span.itemno').text(response.current_cart_item);
				//jQuery('header .cartbtn .total span.price').text(response.current_cart_total);
			}
		});
		
		return false;
} else {
    
     jQuery("#mpart #product_errror").text('Enter the Product Size or Color');
}
	});

	jQuery('body').on('click', '.add_to_cart', function()
	{
		var this_link = jQuery(this);
		var product_id=jQuery(this).attr('data-product_id');
		var product_price=jQuery(this).attr('data-product_price');
		var product_title=jQuery(this).attr('data-product_title');
			
		
		var product_qty=1;
		if(jQuery("input#product_qty").length > 0)
		{
			product_qty=jQuery("input#product_qty").val();
		}
		
		var ajax_url = base_url+'ajax/add_to_cart';
		
		jQuery.ajax({
			type: 'POST',
			data: {
				"product_id" : product_id,
				"product_qty" : product_qty,
				"product_price" : product_price,
				"product_title" : product_title
			},
			url: ajax_url,
			beforeSend: function()
			{
				this_link.append('<img src="'+base_url+'images/loading.gif" style="width:16px;height:16px;display:inline-block;margin:0px;margin-left:5px;padding:0px;">');
			},
			success: function(result)
			{
				this_link.find('img').remove();
				
				var response = JSON.parse(result);
				
				//jQuery('aside#minicart').addClass('active');
				jQuery('aside#minicart .innerbox').html(response.html);
				//setTimeout(function(){ jQuery('aside#minicart').removeClass('active'); }, 5000);

				jQuery('header .cartbtn .items .itemcount').removeClass('item_0');
				jQuery('header .cartbtn .items .itemcount').addClass('item_'+response.current_cart_item);
				jQuery('header .cartbtn .items .itemcount span.itemno').text(response.current_cart_item);
				//jQuery('header .cartbtn .total span.price').text(response.current_cart_total);
			}
		});
		
		return false;
	});
	 

	 
	 
	
	
	/*### checkout ###*/
	jQuery('a.checkoutitem').on('click', function()
	{
		jQuery('.checkout-fields').show();
		
		jQuery('.directpay').hide();
		jQuery('a.checkoutitem').removeClass('active');
		jQuery(this).addClass('active');
		
		if(jQuery(this).hasClass('direct_payment'))
		{
			jQuery('.directpay').show();
			jQuery('form#checkout input[name=checkout_type]').val('direct_payment');
		}
		else
		{
			jQuery('form#checkout input[name=checkout_type]').val('cash_on_delivery');
		}
	});
	
	jQuery('form#checkout .ship-to-billing input[name=ship_to_billing_address]').change(function()
	{
		if(jQuery('form#checkout .ship-to-billing input[name=ship_to_billing_address]').is(':checked'))
		{
			jQuery('form#checkout .checkout-box.shipping-info').hide();
		}
		else
		{
			jQuery('form#checkout .checkout-box.shipping-info').show();
		}
	});
	/*****************************new javascript ***************************/
	
	jQuery('form#checkout input[name=ship_to_billing]').change(function()
	{
		if(jQuery('form#checkout input[name=ship_to_billing]').is(':checked'))
		{
			var shipping_address1 = jQuery('form#checkout #shipping_address1').val();
			jQuery('form#checkout #billing_address1').val(shipping_address1);
		}
		else
		{
			jQuery('form#checkout #billing_address1').val('');
		}
	});
	jQuery('.checkoutpage').on('click', function()
	{
		if(jQuery('form#checkout input[name=ship_to_billing]').is(':checked'))
		{
			var shipping_address1 = jQuery('form#checkout #shipping_address1').val();
			jQuery('form#checkout #billing_address1').val(shipping_address1);
		}
	});
	
	
	/*### mobile menu ###*/
	var win_width = jQuery(window).width();

	if(win_width<=767)
	{
		jQuery('.nav-category').addClass('novisibility');
	}

	jQuery('body').on('click', '.mobilenav', function()
	{
		if(win_width<=767)
		{
			if(jQuery('.nav-category').hasClass('active'))
			{
				jQuery('.nav-category').removeClass('active');
				jQuery('.nav-category').addClass('novisibility');
				jQuery('#cboxPopup').remove();
				jQuery('#cboxClose').remove();
			}
			else
			{
				jQuery('.nav-category').addClass('active');
				jQuery('.nav-category').removeClass('novisibility');
				jQuery('body').append('<div id="cboxPopup"></div>');
				jQuery('body').prepend('<button type="button" id="cboxClose">X</button>');
			}
		}
	});

	jQuery('body').on('click', '.topnav', function()
	{
		jQuery('#hpart .ac-link').slideToggle();
	});
	
	
	/*### contact ###*/
	jQuery('.contactpage #emailus form').submit(function()
	{
		jQuery('#emailus').find('.form-control').removeClass('validation-error');
		
		var name = jQuery('#emailus input[name=name]').val();
		var phone = jQuery('#emailus input[name=phone]').val();
		var subject = jQuery('#emailus input[name=subject]').val();
		var message = jQuery('#emailus textarea[name=message]').val();
		
		if(name=='')
		{
			jQuery('#emailus .field-name').focus();
			jQuery('#emailus .field-name').addClass('validation-error');
			return false;
		}
		if(phone=='')
		{
			jQuery('#emailus .field-phone').focus();
			jQuery('#emailus .field-phone').addClass('validation-error');
			return false;
		}
		if(subject=='')
		{
			jQuery('#emailus .field-subject').focus();
			jQuery('#emailus .field-subject').addClass('validation-error');
			return false;
		}
		if(message=='')
		{
			jQuery('#emailus .field-message').focus();
			jQuery('#emailus .field-message').addClass('validation-error');
			return false;
		}
		
		var ajax_url = base_url+'ajax/contact_inquiry_action';
		
		jQuery.ajax({
			type:'POST',
			data:{
				"name" : name,
				"phone" : phone,
				"subject" : subject,
				"message" : message
			},
			url:ajax_url,
			beforeSend:function()
			{
				jQuery('#emailus input[type=submit]').append('<img src="'+base_url+'images/loading.gif" style="width:16px;height:16px;display:inline-block;margin:0px;margin-left:5px;padding:0px;">');
			},
			success:function(result)
			{
				if(result!='')
				{
					jQuery('#emailus input, #emailus textarea').val('');
					jQuery('#emailus form').append('<div class="alert alert-success" role="alert" id="success_message">Success <i class="glyphicon glyphicon-thumbs-up"></i> Thanks for contacting us, we will get back to you shortly.</div>');
				}
				else
				{
					jQuery('#emailus form').append('<div class="alert alert-success" role="alert" id="failed_message">Sorry you have failed to send your inquiry!</div>');
				}
			}
		});
		
		return false;
	});
	
	
	/*### newsletter ###*/
	jQuery('form#newsletter').submit(function()
	{
		var newsletter_email = jQuery('#newsletter #footer_newsletter_email').val();
		
		if(newsletter_email=='' || !emailPattern.test(newsletter_email))
		{
			jQuery('#newsletter #footer_newsletter_email').focus();
			return false;
		}
		
		var ajax_url = base_url+'ajax/newsletter';
		
		jQuery.ajax({
			type:'POST',
			data: {
				"newsletter_email" : newsletter_email
			},
			url:ajax_url,
			beforeSend:function()
			{
				jQuery('#newsletter input[type=submit]').append('<img src="'+base_url+'images/loading.gif" style="width:16px;height:16px;display:inline-block;margin:0px;margin-left:5px;padding:0px;">');
			},
			success:function(result)
			{
				if(result!='')
				{
					jQuery('#newsletter input, #newsletter textarea').val('');
					jQuery('#newsletter').append('<div class="alert-success" role="alert" id="success_message" style="margin-top:5px;">You have successfully subcribed!</div>');
				}
				else
				{
					jQuery('#newsletter').append('<div class="alert-success" role="alert" id="failed_message" style="margin-top:5px;">Sorry you have failed to subcribe!</div>');
				}
			}
		});
		
		return false;
	});
	
	
	/*### review ###*/
	jQuery('.fbchatbtn, .fbchat-title').on('click', function()
	{
		jQuery('.fbchat').slideToggle('slow');
	});

	jQuery('.clkaddreview').on('click', function()
	{
		jQuery('.singleproduct .nav-tabs li.review a').trigger('click');
		
		jQuery('html, body').animate({
			scrollTop: jQuery('#review').offset().top - 100
		}, 1000);
	});
	

	if(window.location.href.indexOf("?review=") > -1)
	{
		jQuery('.singleproduct .nav-tabs li.review a').trigger('click');
		
		jQuery('html, body').animate({
			scrollTop: jQuery('#review').offset().top - 100
		}, 1000);
    }


	/*### account update ###*/
	jQuery('form#useredit').submit(function(e)
	{
		e.preventDefault();
		jQuery('#useredit').find('.response').remove();
		
		var user_id = jQuery('#useredit #user_id').val();
		var user_name = jQuery('#useredit #user_name').val();
		var user_login = jQuery('#useredit #user_login').val();
		var user_phone = jQuery('#useredit #user_phone').val();
		var user_email = jQuery('#useredit #user_email').val();
		var user_address = jQuery('#useredit #user_address').val();
		var user_city = jQuery('#useredit #user_city').val();
		var user_state = jQuery('#useredit #user_state').val();
		
		var ajax_url = base_url+'ajax/update_account';

		jQuery.ajax({
			type: 'POST',
			data: {
				"user_id" : user_id,
				"user_name" : user_name,
				"user_login" : user_login,
				"user_phone" : user_phone,
				"user_email" : user_email,
				"user_address" : user_address,
				"user_city" : user_city,
				"user_state" : user_state
			},
			url: ajax_url,
			success: function(result)
			{
				jQuery('.success-txt').show();
				
				jQuery('html,body').animate({scrollTop: jQuery(".success-txt").offset().top}, 'slow');
				
				setTimeout(function(){ window.location.reload(); }, 3000);
			}
		});
		
		return false;
	});
	
		/*### auto suggestion search query ###*/
	jQuery('header #search_query3').on('input', function()
	{
		var search_query = jQuery(this).val();
		
		if(search_query.length >= 3)
		{
			var ajax_url = base_url+'ajax/ajax_search_items';
			
			jQuery.ajax({
				type: 'POST',
				dataType : 'json',
				url:ajax_url,
				data: {
					"search_query" : search_query
				},
				
				beforeSend:function()
				{
					jQuery('header .search-area ul.dropdown-menu').show();
					jQuery('header .search-area ul.dropdown-menu').html('<div class="searching" style="text-align:center;padding:10px;"><img src="'+base_url+'images/loading.gif"><div>Searching...</div></div>');
				},
				success:function(response)
				{
					if(response.status=='success')
					{
						jQuery('header .search-area ul.dropdown-menu').html(response.return_value);
					}
				}
			});
		}
		else
		{
			jQuery('header .search-area ul.dropdown-menu').html('');
		}
	});
	
	/*### change customer password ###*/
	jQuery('form#changepw').submit(function()
	{
		jQuery('form#changepw').find('.form-control').removeClass('validation-error');
		jQuery('form#changepw').find('.errormsg').remove();
		jQuery('form#changepw').find('.alert-success').remove();
		
		var old_pass = jQuery('form#changepw #old_pass').val();
		var user_pass = jQuery('form#changepw #user_pass').val();
		var user_id = jQuery('form#changepw #user_id').val();
		
		if(old_pass=='')
		{
			jQuery('#changepw #old_pass').focus();
			jQuery('#changepw #old_pass').addClass('validation-error');
		}
		if(user_pass=='')
		{
			jQuery('#changepw #user_pass').focus();
			jQuery('#changepw #user_pass').addClass('validation-error');
		}
		if(user_id=='')
		{
			jQuery('#changepw #user_id').focus();
			jQuery('#changepw #user_id').addClass('validation-error');
		}
		
		var ajax_url = base_url+'ajax/changepw';
		
		jQuery.ajax({
			type:'POST',
			data:{
				"user_id" : user_id,
				"old_pass" : old_pass,
				"user_pass" : user_pass
			},
			url:ajax_url,
			beforeSend:function()
			{
				jQuery('form#changepw button[type=submit]').append('<img src="'+base_url+'images/loading.gif" style="width:16px;height:16px;display:inline-block;margin:0px;margin-left:5px;padding:0px;">');
			},
			success:function(result)
			{
				jQuery('form#changepw button[type=submit] img').remove();
				
				if(result==true)
				{
					jQuery('form#changepw button[type=submit]').before('<div class="alert alert-success" role="alert" id="success_message">You have changed your password!</div>');
				}
				else
				{
					jQuery('form#changepw button[type=submit]').before('<div class="alert alert-success" role="alert" id="failed_message">Sorry you have failed to change your password!</div>');
				}
			}
		});
		
		return false;
	});
	
	
		

	
	
/*
	jQuery('form#checkout #billing_phone').on('blur', function()
	{
	
		var billing_phone = jQuery('form#checkout #billing_phone').val();
		 var filter = /^[0-9]{11}$/;

        if (!filter.test(billing_phone)) {
             alert("Enter valid Bangladeshi Number such as 01970778457")
            jQuery('form#checkout #billing_phone').addClass('error');
		    jQuery('form#checkout button.confirm_order').attr('disabled',true); 
        }
        else {
                   
		var ajax_url = base_url+'ajax/tryOrder';

             //  alert(billing_phone)
		    jQuery('form#checkout #billing_phone').removeClass('error');
		   
		    jQuery('form#checkout button.confirm_order').attr('disabled',false);
		    	
            $.ajax({
                type: "POST",
                data: {billing_phone:billing_phone},
                url: ajax_url,
                success: function (result) {
                    debugger;
                                        console.log(result);

                 // alert(result);
                },
                error:function(result){
                                        console.log(result);

                   // alert(result);
                }
                
            });
            
		    
        }

	
	});
	*/
		jQuery('form#checkout #shipping_address1').on('blur', function()
	{
	
	

	
	});
	
	
	
	jQuery('form#checkout button.confirm_order').on('click', function()
	{
		jQuery('form#checkout .form-control').removeClass('error');
		
	//	var billing_name = jQuery('form#checkout #billing_name').val();
	//	if(billing_name==''){ 
		   // jQuery('form#checkout #billing_name').addClass('error'); 
		    
	//	}
		
	//	var billing_phone = jQuery('form#checkout #billing_phone').val().trim();
	//	if(billing_phone==''){
		  //  jQuery('form#checkout #billing_phone').addClass('error');
		    
		
	//	}

	//	var shipping_address1 = jQuery('form#checkout #shipping_address1').val().trim();
	//	if(shipping_address1==''){ 
		   // jQuery('form#checkout #shipping_address1').addClass('error'); 
		    
	//	}

		

		jQuery('form#checkout').submit();
	});
	
});