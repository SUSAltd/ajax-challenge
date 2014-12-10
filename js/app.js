"use strict";
/*
    app.js, main Angular application script
    define your module and controllers here
*/

var PARSE_PREFIX = 'https://api.parse.com/1/classes/';

angular.module("BassOMatic", [])
	.config(function($httpProvider) {
		$httpProvider.defaults.headers.common['X-Parse-Application-Id'] = "JcqsgPyOerGzr019tDy0KpCkg7El6lUORlmSXpEq";
		$httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = "LIq9ui3Zhno7IPtiwJMTD1DTChqpV9jYcmhB0P2H";
	})
	.controller("CommentsController", function($scope, $http) {
		$scope.refreshReviews = function() {
			$scope.loadingReviews = true;
			$http.get(PARSE_PREFIX + 'reviews')
				.success(function(data) {
					console.log(data);
					$scope.reviews = data.results;
				})
				.error(function(err) {
					console.log(err);
				})
				.finally(function() {
					$scope.loadingReviews = false;
				});
		};

		$scope.newReview = {
			votes: 0,
		};
		
		$scope.submitReview = function() {
			$scope.loadingPost = true;
			console.log($scope.newReview);
			$http.post(PARSE_PREFIX + 'reviews', newReview)
				.success(function(responseData) {
					newReview.objectId = responseData.objectId;
                    $scope.reviews.push($scope.newReview);
                    $scope.newReview = {
                        votes: 0
                    };
				})
				.err(function(err) {
					console.log(err);
				})
				.finally(function() {
					$scope.loadingPost = false;
				});
			
		};
		
		$scope.refreshReviews();
	});