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
                        // if (_data instanceof Array) {
                        //     for (var i = 0; i < _data.length; i++) {
                        //         if (_data[i].created_at) {
                        //             var strD = _data[i].created_at.replace(/-/g, "/");
                        //             strD = strD.substr(0, 'yyyy-mm-dd hh:mi:ss'.length);
                        //             _data[i].created_at = new Date(strD);
                        //         }
                        //         if (_data[i].updated_at) {
                        //             var strD = _data[i].updated_at.replace(/-/g, "/");
                        //             strD = strD.substr(0, 'yyyy-mm-dd hh:mi:ss'.length);
                        //             _data[i].updated_at = new Date(strD);
                        //         }
                        //     }
                        // }
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
             get:function(key, param, callback) {
               if (!param.access_token) {
                 if (sessionStorage.fb_token) {
                   param.access_token = sessionStorage.fb_token;
                 }
               }
               var url = [baseUrl,key].join('/') + '?' + $.param(param);
               return BaseBean.httpGet(url,callback);
             },
             post:function(key, param, data, callback) {
               if (!param.access_token) {
                 if (sessionStorage.fb_token) {
                   param.access_token = sessionStorage.fb_token;
                 }
               }
               var url = [baseUrl,key].join('/') + '?' + $.param(param);
               return BaseBean.httpPost(,data,callback);
             },
             login: function(scopes, callback) {
               FB.getLoginStatus(function(response) {
                 if (response.status === 'connected') {
                   callback(response);
                 } else if (response.status === 'not_authorized') {
                   if (!scopes) scopes = 'email,public_profile,manage_pages,read_page_mailboxes';
                   FB.login(function(response) {
                     callback(response);
                   }, {scope:scopes})
                 } else {
                 }
               });
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
