'use strict';

/**
 * @ngdoc service
 * @name myAppApp.BaseBean
 * @description
 * # BaseBean
 * Factory in the myAppApp.
 */
var apiPath = 'http://localhost:8000/api/v1';
var fbAPIPath = 'https://graph.facebook.com/v2.10/';

angular.module('services', [])
    .factory('BaseBean', function ($http) {
        //if (sessionStorage.token) {
            //$http.defaults.headers.common.Authorization  = 'Beaver ' + sessionStorage.token;
        //}
        return {
            httpGet: function (url, callback, headers) {
                if (typeof(callback) == "function") {
                    //$http.get(url,header).success(function (_data) {
                    $http.get(url).success(function (_data) {
                        callback(true, _data);
                    }).error(function (_data) {
                        callback(false, _data);
                    });
                } else {
                    return $http.get(url);
                }
            },
            httpPost: function (url, data, callback) {
                if (typeof(callback) == "function") {
                    $http.post(url, $.param(data)).success(function (_data) {
                        callback(true, _data);
                    }).error(function (_data) {
                        callback(false, _data);
                    });
                } else {
                    return $http.post(url, data);
                }
            },
            httpPut: function (url, data, callback) {
                if (typeof(callback) == "function") {
                    $http.put(url, $.param(data)).success(function (_data) {
                        callback(true, _data);
                    }).error(function (_data) {
                        callback(false, _data);
                    });
                } else {
                    return $http.put(url, data);
                }
            },
            httpDelete: function (url, callback) {
                if (typeof(callback) == "function") {
                    $http.delete(url).success(function (_data) {
                        callback(true, _data);
                    }).error(function (_data) {
                        callback(false, _data);
                    });
                } else {
                    return $http.delete(url);
                }
            }
        }
    })
    .factory('FBBean', ['BaseBean', function (BaseBean) {
        var baseUrl = fbAPIPath;
        return {
             get:function(key, param) {
               var callback=arguments[arguments.length-1];
               if (!param.access_token) {
                 if (sessionStorage.fb_token) {
                   param.access_token = sessionStorage.fb_token;
                 }
               }
               var url = [baseUrl,key].join('/') + '?' + $.param(param);
               if (callback && typeof callback == 'function') {
                 BaseBean.httpGet(url,callback);
               }
               else {
                 return BaseBean.httpGet(url);
               }
             },
             post:function(key, data, callback) {
               var callback=arguments[arguments.length-1];
               var param = {};
               if (sessionStorage.fb_token) {
                 param.access_token = sessionStorage.fb_token;
               }
               var url = [baseUrl,key].join('/') + '?' + $.param(param);
               if (callback && typeof callback == 'function') {
                 BaseBean.httpPost(url,data,callback);
               }
               else {
                 return BaseBean.httpPost(url,data);
               }
             }
        }
    }])
    .factory('PageBean', ['BaseBean', function (BaseBean) {
        var baseUrl = apiPath + '/page';
        return {
        }
    }])
    .factory('UserBean', ['BaseBean', function (BaseBean) {
        var baseUrl = apiPath + '/auth';
        return {
        	login: function (data, callback) {
                var url = [baseUrl, 'login'].join('/');
                BaseBean.httpPost(url, data, callback);
            },
          fbLogin: function(data, callback) {
            var url = [baseUrl, 'fbLogin'].join('/');
            BaseBean.httpPost(url, data, callback);
          },
            getUserList: function (callback) {
                var url = [baseUrl, 'list'].join('/');
                BaseBean.httpGet(url, callback);
            },
            logout: function (user_id, callback) {
                var url = [baseUrl, 'logout', user_id].join('/');
                BaseBean.httpGet(url, callback);
            },
            addUser: function (data, callback) {
                var url = [baseUrl].join('/');
                BaseBean.httpPost(url, data, callback);
            },
            updateUser: function (data, callback) {
                var url = [baseUrl].join('/');
                BaseBean.httpPut(url, data, callback);
            },
            deleteUser: function (user_id, callback) {
                var url = [baseUrl, user_id].join('/');
                BaseBean.httpDelete(url, callback);
            }
        }
    }])
    .factory('PermissionBean', ['BaseBean', function (BaseBean) {
        var baseUrl = apiPath + '/permission';
        return {
            getPermissionById: function(pId, callback) {
              var url = [baseUrl,pId].join('/');
              BaseBean.httpGet(url, callback);
            },
            getPermissionList: function(callback) {
              var url = baseUrl;
              BaseBean.httpGet(url, callback);
            }
        }
    }]);
