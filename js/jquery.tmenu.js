// tMenu v1.0 (Tin Trần  - tindl88@gmail.com)
;(function ($) {
	
	var methods = {
		init: function(options){
			var def = {
				showArrow: true,
				fadeSpeed: 200,
				resposiveBreak: 900,
				desktopWrapClass: "",
				mobileWrapClass: "",
				expandMenuClass: "",
				closeMenuClass: ""
			};
			return this.each(function () {
				var opts = $.extend(def, options || {});
				var self = $(this);
				var li = self.find("li");
				var liActive = self.find("li.active");
				var hoverClass = "tMenuHover", 
					expandedClass = "tmExpd", 
					showClass = "menuShow";
					
					var docWidth = $(document).width();
					var winHeight = $(window).height();
					
				var tMenuApi = {
					_unbindEvents: function(){
						li.unbind("mouseenter mouseleave");
						li.find("i").unbind("click");
					},
					AddHeight: function(){
						$("body").css({height:winHeight, overflow:"hidden"});
						$("." + opts.mobileWrapClass).css({height:winHeight});
					},
					RemoveHeight: function(){
						li.removeClass(expandedClass);
						$("." + opts.expandMenuClass).removeClass(showClass);
						$("body,." + opts.mobileWrapClass + ",." + opts.desktopWrapClass).removeAttr("style");
					},
					ShowArrow: function(){
						if(opts.showArrow){
							li.has("ul").find(">a span").append("<i>&nbsp</i>");
						}
					},
					AutoActive: function(){
						liActive.parents("li").addClass("active");
						liActive.append("<b>&nbsp</b>");
					},
					ExpandMobileMenu: function(){
						$("." + opts.expandMenuClass).bind("click", function(){
							$(this).addClass(showClass).hide();
							$("." + opts.mobileWrapClass).show();
							tMenuApi.AddHeight();
						});						
					},
					CloseMenu: function(){
						$("." + opts.closeMenuClass).bind("click", function(){
							$("." + opts.expandMenuClass).removeClass(showClass).show();
							$("." + opts.mobileWrapClass).hide();
							tMenuApi.RemoveHeight();
						});
					},
					BindEventMobile: function(){
						li.find("i").bind("click", function(){
							if($(this).parent().parent().parent().hasClass(expandedClass)){
								$(this).parent().parent().parent().removeClass(expandedClass).find(">ul").slideUp(opts.fadeSpeed);
							}
							else {
								$(this).parent().parent().parent().addClass(expandedClass).find(">ul").slideDown(opts.fadeSpeed);
							}
						});
					},
					BindEventDesktop: function(){
						li.bind("mouseenter", function(){
							$(this).addClass(hoverClass);
							$(this).find(">ul").fadeIn(opts.fadeSpeed);
						});
						li.bind("mouseleave", function(){
							$(this).removeClass(hoverClass);
							$(this).find(">ul").fadeOut(opts.fadeSpeed);					
						});
					},
					CheckResposive: function(){
						tMenuApi._unbindEvents();
						li.find(">ul").fadeOut(opts.fadeSpeed);

						if(docWidth <= opts.resposiveBreak)
						{
							$("." + opts.expandMenuClass).show();
							self.parent().addClass(opts.mobileWrapClass).removeClass(opts.desktopWrapClass);

							tMenuApi.BindEventMobile();

							if($("." + opts.expandMenuClass).hasClass(showClass))
								tMenuApi.AddHeight();	
						}
						else
						{
							$("." + opts.expandMenuClass).hide();
							self.parent().addClass(opts.desktopWrapClass).removeClass(opts.mobileWrapClass);
							tMenuApi.BindEventDesktop();
							tMenuApi.RemoveHeight();
						}
					}
				};

				// Hiển thị mũi tên nếu có chứ menu con
				tMenuApi.ShowArrow();

				// Nếu đang active menu con thì set luôn active cho menu cha
				tMenuApi.AutoActive();

				// Hiện mobile menu
				tMenuApi.ExpandMobileMenu();

				// Đóng mobile menu
				tMenuApi.CloseMenu();

				// Xử lý menu mobile và desktop
				tMenuApi.CheckResposive();
				$(window).on("resize", function(){
					docWidth = $(document).width();
					winHeight = $(window).height();
					setTimeout(
					function(){
						tMenuApi.CheckResposive();
					}, 400);					
				});
			});
		}
	};
	$.fn.tMenu = function(method) {
		if (methods[method])
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		else if (typeof method === 'object' || !method)
			return methods.init.apply(this, arguments);
		else 
			$.error('tMenu: Method ' + method + ' does not exist.');
	};
})(jQuery);