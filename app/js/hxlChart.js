/**
* directive to draw a plot using jqplot
* @param {attrs} chartData, chartName, chartOptions should be provided
*    -chartData, must be an array, the data to be ploted on the figure, can be mutiple arraies for plotting in the same graph
*    -chartName, the name of the chart, in the html decoration, it will be assigned to a <div chartName></div>
*    -charOptions, the jqplot options for plot the target graph.
* 
**/

angular.module('hxlUiChart', [])
  //this is the plots 
  .value('chartList',  {})   
  .directive('hxlUiChart', function (chartList) {
    return {
      restrict: 'EACM',
      template: '',
      replace: true,
      link: function (scope, elem, attrs) {
        var renderChart = function () {
          var data = scope.$eval(attrs.chartData);
          var idName = attrs.chartName ;
          var idNameStr = 'id="' + idName + '"' ;
          //check if elements exits
          if($('#'+idName).length==0){
            elem.html('<div '+ idNameStr +'></div>');
          }
          if (!angular.isArray(data)) {
            return;
          }

          var opts = {};
          if (!angular.isUndefined(attrs.chartOptions)) {
            opts = scope.$eval(attrs.chartOptions);
            if (!angular.isObject(opts)) {
              throw 'Invalid ui.chart options attribute';
            }
          }

          if (typeof chartList[idName] !='undefined') {
            chartList[idName].destroy();
          };

          chartList[idName] = $.jqplot(idName,data,opts) ;

        };

        scope.$watch(attrs.chartData, function () {
          renderChart();
        }, true);

        scope.$watch(attrs.chartOptions, function () {
          renderChart();
        });
      }
    };
  });