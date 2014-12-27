angular.module('app.core')
.factory('Title', function() {
	var siteName = 'FindAGroupFor.me';
	var pageName = '';
	
	return {
		get: function() {
			if (pageName === '') {
				return siteName;
			}
			else {
				return pageName + ' | ' + siteName;
			}
		},
		set: function(newPageName) {
			pageName = newPageName;
		}
	};
});