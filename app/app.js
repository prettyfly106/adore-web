/**
 * Created by Administrator on 3/12/15.
 */
(function () {
    var tplurl = function (tplname) {
        //return window.appName +'/app/controllers/' + tplname + '.html';
        return 'app/controllers/' + tplname + '.html';
    };
    var app = angular.module(window.appName, [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'toaster',
        'ui.bootstrap',
        'facebook',
        'filters', 'services', 'controllers'
    ]);
    app.config(['$httpProvider', function ($httpProvider) {
        //var csrf_token = $('meta[name=csrf-token]').attr('content');
        //$httpProvider.defaults.headers.common['Authorization']='Bearer ' + sessionStorage.token;
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    }]);
    app.config(function ($routeProvider) {
        $routeProvider
            .when('/dashboard', {
				templateUrl : tplurl('dashboard'),
				controller : 'DashBoardCtl'
            })
            .when('/login', {
        templateUrl : tplurl('login'),
        controller : 'LoginCtl'
            })
            .when('/page', {
        templateUrl : tplurl('page_manager'),
        controller : 'PageManagerCtl'
            })
            .otherwise({
                redirectTo: '/dashboard'
            });
    }).config(function(FacebookProvider) {
     FacebookProvider.init('151385562092902');
  });

    app.run(function ($rootScope,$window, $location, $cookieStore, $interval, $http, $modal, toaster,Facebook,UserBean) {
        if (sessionStorage.token) {
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.token;//--disable-web-security --user-data-dir
        }

        $rootScope.fbLogin = function() {
          var callback=arguments[arguments.length-1];
          Facebook.getLoginStatus(function(response) {
            if (response.status === 'connected') {
              if (callback && typeof callback == 'function')
                callback(true,response.authResponse);
            } else {
              scopes = 'email,public_profile,manage_pages,read_page_mailboxes';
              Facebook.login(function(response) {
                if (callback && typeof callback == 'function')
                  callback(response.status === 'connected',response.authResponse);
              }, {scope:scopes})
            }
          });
        };

        $rootScope.fbSignIn = function(cb) {
          $rootScope.fbLogin(function(success, data) {
            if (success && data) {
              sessionStorage.fb_token = data.accessToken;
              UserBean.fbLogin({access_token: data.accessToken}, function(success, data) {
                cb(data);
              });
            }
          });
        };

        $rootScope.changeLocation = function(href) {
        	window.location.href=href;
        };

        $rootScope.searchLocation = function(key,value) {
            //window.location.href =  href;
        	$location.search(key, value);
        };

        $rootScope.base64Image = function(base64) {
        	if (base64) {
        		return 'data:image/jpeg;charset=utf-8;base64,' + base64;
        	}
        };
        $rootScope.logout = function() {
          sessionStorage.token = null;
          sessionStorage.fb_token = null;
          $rootScope.changeLocation('#/login');
        };

        $rootScope.toDate = function(input, from, to) {
        	if (from) {
        		date = moment(input,[from]).format(to)
        	}
        	else {
        		date = moment(input).format(to);
        	}
            return date;
        };

        $rootScope.momentJsFormat = function(date, format) {
        	var formats = ['DD/MM/YYYY', 'YYYY-MM-DD HH:mm:ss'];
        	if (typeof date == 'object') {
        		return moment(date).format(format);
        	}
        	else {
        		if (format) {
        			return moment(date,formats).format(format);
        		}
        		else {
        			return moment(date,formats).toDate();
        		}
        	}
        }

        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (next.access !== undefined) {
                if (next.access.allowGroup.indexOf($rootScope.user.user_group_id)<0) {
                    window.location.href = '#/NotAllowed';
                }
            }
        });


        $rootScope.$on('$routeChangeSuccess', function() {
          $rootScope.showMenu = $location.path() !== "/login";
      });


        $rootScope.user = window.userInfo;
        $rootScope.logInTime = window.logInTime;
        $rootScope.userRole = window.userRole;


        if (typeof String.prototype.endsWith !== 'function') {
            String.prototype.endsWith = function(suffix) {
                return this.indexOf(suffix, this.length - suffix.length) !== -1;
            };
        };

        $rootScope.excelExport = function(url, filename, postData) {
        	if (!filename.endsWith('.xls')) {
        		filename += '.xls';
        	};
        	if (postData) {
        		$http.post(url ,postData, { responseType: 'arraybuffer'}).success(function(data) {
      	            var file = new Blob([data], { type: 'application/vnd.ms-excel' });
      	            saveAs(file, filename);
      	     });
        	}
        	else {
	        	$http.get(url , { responseType: 'arraybuffer' }).success(function(data) {
	      	            var file = new Blob([data], { type: 'application/vnd.ms-excel' });
	      	            saveAs(file, filename);
	      	     });
        	}
        };




    });

    app.controller('IndexController',['$scope','$rootScope','$location','Facebook', function ($scope,$rootScope,$location,FB) {

    }]);
})();
