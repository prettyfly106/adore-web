/**
 * Created by Administrator on 3/12/15.
 */
angular.module('controllers')
    .controller('PageManagerCtl', ['toaster', '$scope','$modal','$rootScope', '$routeParams', '$interval','PageBean','FBBean',
        function (toaster, $scope,$modal,$rootScope, $routeParams, $interval,PageBean,FBBean) {

    		var interval;
            $scope.basePath = basePath;

            FBBean.get('me/accounts', function(success,rt) {
                $scope.pageList = rt.data;
                console.log($scope.pageList);
            });

            $scope.pageList = [];

            $scope.followList = [];

            $scope.fbSignIn = function() {
              $rootScope.fbSignIn(function(rt) {
              });
            }

        }]);
