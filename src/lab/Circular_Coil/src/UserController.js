(function(){
    angular
    .module('users',['FBAngular','ui.bootstrap','dialogs.main','pascalprecht.translate'])
    .controller('UserController', [
        '$mdSidenav', '$mdBottomSheet', '$log', '$q','$scope','$element','Fullscreen','$mdToast','$animate','$translate','dialogs',
        UserController
    ])
    .config(['dialogsProvider','$translateProvider',function(dialogsProvider,$translateProvider){
        dialogsProvider.useBackdrop('static');
        dialogsProvider.useEscClose(false);
        dialogsProvider.useCopy(false);
        dialogsProvider.setSize('sm');
        $translateProvider.translations(language,{DIALOGS_ERROR:(_("Error")),DIALOGS_ERROR_MSG:(_("Error in initial Adjustment of the apparatus.")),DIALOGS_CLOSE:(_("Okay"))}),$translateProvider.preferredLanguage(language);
    }]);
	/**
	 * Main Controller for the Angular Material Starter App
	 * @param $scope
	 * @param $mdSidenav
	 * @param avatarsService
	 * @constructor
	 */
	function UserController($mdSidenav, $mdBottomSheet, $log, $q, $scope, $element, Fullscreen, $mdToast, $animate, $translate, dialogs) {
		$scope.toastPosition = {
			bottom: true,
			top: false,
			left: true,
			right: false
		};
		$scope.toggleSidenav = function(ev) {
			$mdSidenav('right').toggle();
		};
		$scope.getToastPosition = function() {
			return Object.keys($scope.toastPosition)
				.filter(function(pos) {
				return $scope.toastPosition[pos];
			})
				.join(' ');
		};
		$scope.showActionToast = function() {
			var toast = $mdToast.simple()
				.content(helpArray[0])
				.action(helpArray[7])
				.hideDelay(15000)
				.highlightAction(false)
				.position($scope.getToastPosition());

			var toast1 = $mdToast.simple()
				.content(helpArray[1])
				.action(helpArray[7])
				.hideDelay(15000)
				.highlightAction(false)
				.position($scope.getToastPosition());

			var toast2 = $mdToast.simple()
				.content(helpArray[2])
				.action(helpArray[7])
				.hideDelay(15000)
				.highlightAction(false)
				.position($scope.getToastPosition());

			var toast3 = $mdToast.simple()
				.content(helpArray[3])
				.action(helpArray[7])
				.hideDelay(15000)
				.highlightAction(false)
				.position($scope.getToastPosition());

			var toast4 = $mdToast.simple()
				.content(helpArray[4])
				.action(helpArray[7])
				.hideDelay(15000)
				.highlightAction(false)
				.position($scope.getToastPosition());


			var toast5 = $mdToast.simple()
				.content(helpArray[5])
				.action(helpArray[7])
				.hideDelay(15000)
				.highlightAction(false)
				.position($scope.getToastPosition());

			var toast6 = $mdToast.simple()
				.content(helpArray[6])
				.action(helpArray[8])
				.hideDelay(15000)
				.highlightAction(false)
				.position($scope.getToastPosition());

			$mdToast.show(toast).then(function() {
				$mdToast.show(toast1).then(function() {
					$mdToast.show(toast2).then(function() {
						$mdToast.show(toast3).then(function() {
							$mdToast.show(toast4).then(function() {
								$mdToast.show(toast5).then(function() {
									$mdToast.show(toast6).then(function() {});
								});
							});
						});
					});
				});
			});
		};

		var self = this;
		self.selected = null;
		self.users = [];
		self.toggleList = toggleUsersList;

		$scope.showValue = false; /** It hides the 'Result' tab */
		$scope.showVariables = false; /** I hides the 'Variables' tab */
		$scope.isActive = true;
		$scope.isActive1 = true;

		$scope.control_disable = true; /** It disables the controls drop down box, reverse current, radius of coil, adjust rheostat, check box, reset */
		$scope.initial_adj_disable = false; /** It enables the Initial adjustment button */
		$scope.rotate_compass_disable = false; /** It enables the rotate compass slider */
		$scope.rotate_apparatus_disable = true; /** It disables the rotate apparatus slider */
		$scope.hide_show_result = false; /** It hides the show result check box */
		$scope.hide_show_sliders = false; /** It hides the sliders rotate compass box and rotate apparatus */
		$scope.insert_key_disable = true; /** It disables the insert key button */
		$scope.radius = 5; /** Initial radius slider value */
		$scope.compass_position = 0; /** Initial compass box position slider value */
		$scope.magnetic_field_value = 0; /** Initial magnetic field result value */
		$scope.compassPosition = 0; /** Put the compass box position slider value as 0 */


		$scope.goFullscreen = function() {
			/** Full screen */
			if (Fullscreen.isEnabled()) Fullscreen.cancel();
			else Fullscreen.all();
			/** Set Full screen to a specific element (bad practice) */
			/** Full screen.enable( document.getElementById('img') ) */
		};

		$scope.toggle = function() {
			$scope.showValue = !$scope.showValue;
			$scope.isActive = !$scope.isActive;
		};

		$scope.toggle1 = function() {
			$scope.showVariables = !$scope.showVariables;
			$scope.isActive1 = !$scope.isActive1;
		};
		/** Function for changing the drop down list */
		$scope.changeMaterial = function() {
			indexVal = $scope.Turns /** Index value of the drop down box array */
			noOfTurnsSelection($scope); /** Function defined in experiment.js file */
		}
		/** The click event function of Initial adjustment button */
		$scope.initialAdjustment = function() {
			initialAdjustmentfn($scope, dialogs); /** Function defined in experiment.js file */
		}
		/** Change event function of Radius slider */
		$scope.radiusSlider = function() {
			radiusSliderFN($scope); /** Function defined in experiment.js file */
		}
		/** Change event function of Compass box position slider */
		$scope.compassboxPositionSlider = function() {
			compassBoxSliderFN($scope); /** Function defined in experiment.js file */
		}
		/** Change event function of Adjust rheostat slider */
		$scope.adjustRheostatSlider = function() {
			adjRheostatSliderFN($scope); /** Function defined in experiment.js file */
		}
		/** Focus event function of sliders Compass box position, Adjust rheostat, Rotate compass and Rotate apparatus */
		$scope.slideDown = function() {
			currentRotation($scope); /** Function defined in experiment.js file */
		}
		/** Change event function of Rotate compass box slider */
		$scope.rotateCompassSlider = function() {
			rotateCompassSliderFN($scope); /** Function defined in experiment.js file */
		}
		/** Change event function of Rotate apparatus slider */
		$scope.rotateApparatusSlider = function() {
			rotateApparatusSliderFN($scope); /** Function defined in experiment.js file */
		}
		/** Click event function of Insert key button */
		$scope.insertKeyBtn = function() {
			insertKeyFunction($scope); /** Function defined in experiment.js file */
		}
		/** Click event function of Reverse current button */
		$scope.reverseCurrentBtn = function() {
			reverseCurrentFunction($scope); /** Function defined in experiment.js file */
		}
		/** Change event function of the check box Show result */
		$scope.showResult = function() {
			showresultFN($scope); /** Function defined in experiment.js file */
		}
		/** Click event function of the Reset button */
		$scope.resetBtn = function() {
			reset($scope); /** Function defined in experiment.js file */
		}

		/**
		 * First hide the bottom sheet IF visible, then
		 * hide or Show the 'left' sideNav area
		 */
		function toggleUsersList() {
			$mdSidenav('right').toggle();
		}
	}
})();