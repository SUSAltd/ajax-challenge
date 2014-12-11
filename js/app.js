"use strict";
/*
    app.js, main Angular application script
    define your module and controllers here
*/

var PARSE_PREFIX_REVIEWS = 'https://api.parse.com/1/classes/reviews/';

angular.module("BassOMatic", [])
	.config(function($httpProvider) {
		$httpProvider.defaults.headers.common['X-Parse-Application-Id'] = "JcqsgPyOerGzr019tDy0KpCkg7El6lUORlmSXpEq";
		$httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = "LIq9ui3Zhno7IPtiwJMTD1DTChqpV9jYcmhB0P2H";
	})
	.controller("CommentsController", function($scope, $http) {
		$scope.refreshReviews = function() {
			$scope.loadingReviews = true;
			$http.get(PARSE_PREFIX_REVIEWS)
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
			$http.post(PARSE_PREFIX_REVIEWS, $scope.newReview)
				.success(function(responseData) {
					$scope.newReview.objectId = responseData.objectId;
                    $scope.reviews.push($scope.newReview);
                    $scope.newReview = {
                        votes: 0
                    };
				})
				.error(function(err) {
					console.log(err);
				})
				.finally(function() {
					$scope.loadingPost = false;
				});
			
		};

        $scope.deletePost = function(review) {
            $http.delete(PARSE_PREFIX_REVIEWS + review.objectId)
                .success(function(data) {
                    $scope.refreshReviews();
                })
                .error(function(err) {
                    console.log(err);
                });
        };
		
		$scope.addVotes = function(review, value) {
			$http.put(PARSE_PREFIX_REVIEWS + review.objectId, {
				votes: review.votes + value,
			})
				.success(function(data) {
					console.log(data);
					review.votes += value;
				})
				.error(function(err) {
					console.log(err);
				});
		};
		
		$scope.refreshReviews();
	});