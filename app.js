'use strict';

// Declare app level module which depends on filters, and services.
var app = angular.module('editor', []);

app.run(['$rootScope', function ($rootScope) {
	$rootScope.content = 'Default content';
}]);

app.directive('cleditor', function () {
	return {
		require: '?ngModel',
		link   : function (scope, elm, attr, ngModel) {

			if (!ngModel) return;

			ngModel.$render = function () {
				elm.val(ngModel.$viewValue).blur();
			};



			elm.cleditor().change(function(){
				var value = elm.val();

				if (!scope.$$phase) {
					scope.$apply(function () {
						ngModel.$setViewValue(value);
					});
				}
			});
		}
	}
});
