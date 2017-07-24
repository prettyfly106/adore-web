'use strict';

/**
 * @ngdoc service
 * @name myAppApp.BaseBean
 * @description
 * # BaseBean
 * Factory in the myAppApp.
 */
angular.module('services', [])
    .factory('BaseBean', function ($http) {
        return {
            httpGet: function (url, callback, headers) {
                //if(!headers) headers = {'cdit-max-age': 60};
                if (typeof(callback) == "function") {
                    //$http.get(url,header).success(function (_data) {
                    $http.get(url).success(function (_data) {
                        if (_data instanceof Array) {
                            for (var i = 0; i < _data.length; i++) {
                                if (_data[i].created_at) {
                                    var strD = _data[i].created_at.replace(/-/g, "/");
                                    strD = strD.substr(0, 'yyyy-mm-dd hh:mi:ss'.length);
                                    _data[i].created_at = new Date(strD);
                                }
                                if (_data[i].updated_at) {
                                    var strD = _data[i].updated_at.replace(/-/g, "/");
                                    strD = strD.substr(0, 'yyyy-mm-dd hh:mi:ss'.length);
                                    _data[i].updated_at = new Date(strD);
                                }
                            }
                        }
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
                    $http.post(url, data).success(function (_data) {
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
                    $http.put(url, data).success(function (_data) {
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
    .factory('PageBean', ['BaseBean', function (BaseBean) {
        var baseUrl = basePath + '/rest/user';

        return {
        	getUser: function (user_id, callback) {
                var url = [baseUrl,  user_id].join('/');
                BaseBean.httpGet(url, callback);
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
    }]);
