﻿	// create the module and name it myApp
	var myApp = angular.module('myApp', ['ngRoute']);

	// configure our routes
	myApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : 'view/home.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/about', {
				templateUrl : 'view/about.html',
				controller  : 'aboutController'
			})

			// route for the contact page
			.when('/contact', {
				templateUrl : 'view/contact.html',
				controller  : 'contactController'
			})

			// test
			.when('/register', {
				templateUrl : 'view/register.html',
				controller  : 'registerController'
			})

			.otherwise({ redirectTo: '/' });
	});

	// create the controller and inject Angular's $scope
	myApp.controller('mainController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Hello World สวัสดีชาวโลก';
	});

	myApp.controller('aboutController', function($scope) {
		$scope.message = 'Look! I am an about page.';
	});

	myApp.controller('contactController', function($scope, $location, $http) {
		$scope.message = 'Contact us! JK. This is just a demo.';
		$scope.go = function ( path ) {
			$location.path( path );
		};
		$scope.getData = function() {
			$http.get('app/database/select.php').success(function(data){
				$scope.itemList = data;
			});
		};
	});

	myApp.controller('registerController', function($scope, $http) {
		$scope.errors = [];
		$scope.msgs = [];

		$scope.SignUp = function() {

			$scope.errors.splice(0, $scope.errors.length); // remove all error messages
			$scope.msgs.splice(0, $scope.msgs.length);

			$http.post('app/database/insert.php', {'uid': $scope.userid, 'uname': $scope.username, 'pwd': $scope.userpassword, 'email': $scope.useremail}
			).success(function(data, status, headers, config) {
				if (data.msg != '')
				{
					$scope.msgs.push(data.msg);
				}
				else
				{
					$scope.errors.push(data.error);
				}
			}).error(function(data, status) { // called asynchronously if an error occurs
// or server returns response with an error status.
				$scope.errors.push(status);
			});
		}
	});