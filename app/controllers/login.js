/**
 * Created by Administrator on 3/12/15.
 */
angular.module('controllers')
.controller('LoginCtl', ['toaster', '$scope','$modal','$rootScope', '$routeParams', '$interval','$http','UserBean','PermissionBean','FBBean',
    function (toaster, $scope,$modal,$rootScope, $routeParams, $interval,$http,UserBean,PermissionBean,FBBean) {
      UserBean.login({username:'admin',password:'admin1'}, function(success,data) {
        sessionStorage.currentUser = { username: 'admin', token: data.token };
        sessionStorage.token = data.token;
        $http.defaults.headers.common.Authorization = 'Bearer ' + data.token;
      });
      PermissionBean.getPermissionList(function(success,data) {
          console.log(data);
      });

    }]);
