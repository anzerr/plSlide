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
		
		console.log(node);
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
			template: '<div class="logo bottom-left"><img src="resources/images/singularity.png" style="width:200px;margin:0 auto;" /></div>'
		};
	});

	app.controller('controller', ['$scope', '$timeout', function($scope, $timeout) {
		run();
		$scope.current = 0;
		$scope.loaded = 0;
		$scope.video = document.getElementById('video');
		
		$timeout(function() {
			$scope.loaded = 1;
		}, 1000);
		
		$scope.changePage = function(e) {
			if (e.keyCode == 37) {
				$scope.current = Math.max(0, Math.min($scope.current - 1, $scope.page.length - 1));
			}
			
			if (e.keyCode == 39) {
				$scope.current = Math.max(0, Math.min($scope.current + 1, $scope.page.length - 1));
				$scope.video.play();
			}
		}
		
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
			}, {
				color: 'white'
			}, {
				color: 'white'
			}
		];
	}]);
})();