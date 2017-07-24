'use strict';

/**
 * @ngdoc filter
 * @name myAppApp.filter:vnDate
 * @function
 * @description
 * # vnDate
 * Filter in the myAppApp.
 */
angular.module('filters',[])
    .filter('vnDate', function () {
        return function (input) {
            return 'vnDate filter: ' + input;
        };
    })
    .filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }])
    .filter('character',function(){
        return function(input){
            return String.fromCharCode(64 + parseInt(input,10));
        };
    })
    .filter('toDate',function(){
        return function(input,format1, format2){
        	if (!input) {
        		return;
        	}
        	var date = '';
        	if (format2) {
        		date = moment(input,[format1]).format(format2)
        	}
        	else {
        		date = moment(input).format(format1);
        	}
            return date;
        };
    });
