/**
 * Created by Administrator on 3/12/15.
 */
angular.module('controllers')
.controller('LoginCtl', ['toaster', '$scope','$modal','$rootScope', '$routeParams', '$interval','$timeout','Facebook','$http','UserBean','PermissionBean','FBBean',
    function (toaster, $scope,$modal,$rootScope, $routeParams, $interval,$timeout,FB,$http,UserBean,PermissionBean,FBBean) {
      $scope.username='';
      $scope.password='';
      $scope.invalid=false;
      $scope.login = function() {
        UserBean.login({username:$scope.username,password:$scope.password}, function(success, data) {
          if (success) {
            sessionStorage.token = data.token;
            $rootScope.fbLogin(function(success, data) {
              if (success && data) {
                sessionStorage.fb_token = data.accessToken;
              }
            });
            $rootScope.changeLocation('#/');
          }
          else {
            $scope.invalid = true;
          }
        });
      }

      $scope.fbSignIn = function() {
        $rootScope.fbSignIn(function(data) {
          $rootScope.changeLocation('#/');
        });
      }
    }]);
