
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
	
	
	 
	//update cart when change quantity in cart page
	jQuery('.quantity').on('input propertychange change', function()
	{
		jQuery('.cart-update-block input.cartUpdateBtn').trigger('click');
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
 
	
	 
});