/**
 * lazyLoadingImg - jQuery plugin 
 * @requires jQuery v1.8 or above
 * @particle4dev@gmail.com
 * Copyright (c) 2013 Steve John Hoang
 * Version: 0.0.1
 * Note: Requires jquery 1.8 or above from version 0.0.1
 */

(function( $ ) {
	var SETTINGS = null;
	var imagesList = null;
	var $window = $(window);
	var belowthefold = function(element) {
		var fold;		
		if (SETTINGS.container === undefined || SETTINGS.container === window) {
			fold = $window.height() + $window.scrollTop();
		} else {
			fold = $(SETTINGS.container).offset().top + $(SETTINGS.container).height();
		}

		return fold <= element.offset().top - SETTINGS.threshold;
	};
	
	var rightoffold = function(element) {
		var fold;

		if (SETTINGS.container === undefined || SETTINGS.container === window) {
			fold = $window.width() + $window.scrollLeft();
		} else {
			fold = $(SETTINGS.container).offset().left + $(SETTINGS.container).width();
		}

		return fold <= element.offset().left - SETTINGS.threshold;
	};
		
	var abovethetop = function(element) {
		var fold;
		
		if (SETTINGS.container === undefined || SETTINGS.container === window) {
			fold = $window.scrollTop();
		} else {
			fold = $(SETTINGS.container).offset().top;
		}

		return fold >= element.offset().top + SETTINGS.threshold  + element.height();
	};
	
	var leftofbegin = function(element) {
		var fold;
		
		if (SETTINGS.container === undefined || SETTINGS.container === window) {
			fold = $window.scrollLeft();
		} else {
			fold = $(SETTINGS.container).offset().left;
		}

		return fold >= element.offset().left + SETTINGS.threshold + element.width();
	};

	var inviewport = function(element) {
		 return !rightoffold(element) && !leftofbegin(element) &&
				!belowthefold(element) && !abovethetop(element);
	};
	function loading(img){
		if(inviewport(img) && !img.loaded){
			img.one('load', function() {				
				img.closest('.artwork').addClass('flipped');
			}).attr('src', img.attr('data-src'));
			img.loaded = true;
		}
	}
	var methods = {
		init : function( options ) {
			
			SETTINGS = $.extend({
				threshold: 0
			}, options);
			imagesList = this;
			$(window).load(function() {
				
				imagesList.each(function() {
					loading($(this));
				});
			});
			return this.each(function() {
				var self = $(this);
				if(SETTINGS.container){
					$(SETTINGS.container).scroll(function(){
						loading(self);
					});
				}
				else if(SETTINGS.container === undefined || SETTINGS.container === window){
					$window.scroll(function(){
						loading(self);
					});
				}
			});
		}			
	};

	$.fn.lazyLoadingImg = function( method ) {
		console.log('lazyLoadingImg start ...');
		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +	method + ' does not exist on jQuery.lazyLoadingImg' );
		}
	};
})( jQuery );