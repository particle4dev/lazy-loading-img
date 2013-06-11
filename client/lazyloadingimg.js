if (Meteor.isClient) {
	Meteor.startup(function () {
		// code to run on server at startup
		$('img.lazy').lazyLoadingImg({container: '.container'});
	});
}
