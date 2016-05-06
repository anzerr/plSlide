(function() {
	var app = angular.module('app', []);
	
	var $ = {
		defined: function(a) { return (typeof(a) !== 'undefined' && a !== null); }
	}
	
	
	window.requestAnimFrame = (function(callback) {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function(callback) {
		  window.setTimeout(callback, 1000 / 60);
		};
	})();
	
	var run = function() {
		var c = document.getElementById("canvas"), ctx = c.getContext("2d");
		
		var resizeCanvas = function() {
			c.width = window.innerWidth;
			c.height = window.innerHeight;
			render();
		}
		
		var node = [];
		for (var i = 0; i < 50; i++) {
			node.push({
				x: Math.random(), 
				y: Math.random(),
				life: Math.floor(Math.random() * 800) + 200
			});
		}

		var render = function() {
			for (var i in node) {
				node[i].x += ((Math.round(Math.random()) == 0) ? 1 : -1) * 0.003;
				node[i].y += ((Math.round(Math.random()) == 0) ? 1 : -1) * 0.003;
				node[i].life += -1;
				
				ctx.beginPath();
				ctx.arc(node[i].x * c.width, node[i].y * c.height, 1, 0, 2 * Math.PI);
				ctx.fillStyle = '#0957a0';
				ctx.fill();
			}
			
			var i = 0;
			while (node[i]) {
				if (node[i].life <= 0) {
					node.splice(i, 1);
				} else {
					i += 1;
				}
			}
		}
		

		window.addEventListener('resize', resizeCanvas, false);
		resizeCanvas();
		
		var loop = function() {
			render();
			requestAnimFrame(loop);
		}
		requestAnimFrame(loop);
	}
	
	app.directive('companyLogo', function() {
		return {
			template: '<div class="logo bottom-left"><img src="cdn/resources/images/singularity.png" style="width:200px;margin:0 auto;" /></div>'
		};
	});

	app.controller('controller', ['$scope', '$timeout', '$http', function($scope, $timeout, $http) {
		run();
		$scope.current = 0;
		$scope.loaded = 0;
		$scope.video = document.getElementById('video');
		$scope.framework = false;
		$scope.node = false;
		$scope.architecture = false;
		$scope.label = false;
		$scope.names = false;
		$scope.descs = false;

		$timeout(function() {
			$scope.loaded = 1;
		}, 1000);
		
		$scope.showRelated = function(related) {
			$scope.label = true;
			$scope[related] = true;
		}

		$scope.changePage = function(e) {
			if (e.keyCode == 37) {
				$scope.current = Math.max(0, Math.min($scope.current - 1, $scope.page.length - 1));
			}
			
			if (e.keyCode == 39) {
				$scope.current = Math.max(0, Math.min($scope.current + 1, $scope.page.length - 1));
				if ($scope.current === 1) {
					$scope.video.end = false;
					$scope.video.play();
					$timeout(function(){
						$scope.video.end = true;
					}, 7200);
				}
				if ($scope.current === 3) {
					$timeout(function(){
						$scope.names = true;
					}, 1500);
					$timeout(function(){
						$scope.descs = true;
					}, 3500);
				}
			}
		}

		$scope.obj = {};
		$scope.objCount = {};
		$scope.objNames = {
			charDump: {name : 'Char Dump', desc: 'Char Dump test.'},
			getRequest: {name : 'Get Request', desc: 'Get Request test.'},
			postCreated: {name : 'Post Created', desc: 'Post Created test.'},
			postReply: {name : 'Post Reply', desc: 'Post Reply test.'},
			taskCreated: {name : 'Task Created', desc: 'Task Created test.'},
			taskFinished: {name : 'Task Finished', desc: 'Task Finished test.'},
		};

		$scope.up = function(key) {
			$timeout(function() {
				$scope.obj[key] += 1;
				$scope.objCount[key] -= 1;
				if ($scope.objCount[key] > 0) {
					$scope.up(key);
				}
			}, 100);
		};

		$scope.upgardeValues = function(serverObj) {
			for (var key in $scope.obj) {
				$scope.objCount[key] = (serverObj[key] - (($scope.objCount[key] ? $scope.objCount[key] : 0) + $scope.obj[key]));
				$scope.up(key);
			}
		};

		$scope.getData = function() {
			$http({
				method: 'GET',
  				url: '/api/stats/'
			}).then(function successCallback(response) {
				if (response && response.status && response.status == 200) {
					if ($scope.firstLoad) {
						$scope.obj = response.data;
						$scope.firstLoad = false;
					}
					$scope.upgardeValues(response.data);
				}
				$timeout(function() {
					$scope.getData();
				}, 1000);
  			});
		};

		$scope.firstLoad = true;
		$scope.getData();
		
		$scope.page = [
			{
				color: 'white'
			}, {
				color: 'white'
			}, {
				color: 'white'
			}, {
				color: 'white'
			}, {
				color: 'white'
			}, {
				color: 'white'
			}, {
				color: 'white'
			}, {
				color: 'white'
			}, {
				color: 'white'
			}, {
				color: 'white'
			}, {
				color: 'white'
			}, {
				color: 'white'
			}
		];
	}]);
})();