/**
 * Created by Administrator on 3/12/15.
 */
angular.module('controllers')
    .controller('DashBoardCtl', ['toaster', '$scope','$modal','$rootScope', '$routeParams', '$interval','PageBean',
        function (toaster, $scope,$modal,$rootScope, $routeParams, $interval,UpsBean,CompanyBean,ReportBean) {

    		var interval;
            $scope.basePath = basePath;

            $scope.companyList = [];


            $scope.$on('$destroy',function(){
            	if (angular.isDefined(interval)) {
    	            $interval.cancel(interval);
    	            interval = undefined;
    	        }
            });

        }]);
