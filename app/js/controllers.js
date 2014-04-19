angular.module('myChartingApp', ['ngResource','hxlUiChart','hxlUtils' ])
    .config(['$anchorScrollProvider', function($anchorScrollProvider){
      $anchorScrollProvider.disableAutoScrolling() ;
    }])
    .value('charting', {
      pieChartOptions: {
        //seriesDefaults: {
          // Make this a pie chart.
          //renderer: jQuery.jqplot.PieRenderer,
          //rendererOptions: {
            // Put data labels on the pie slices.
            // By default, labels show the percentage of the slice.
          //  showDataLabels: true
          //}
        //},
        //legend: { show:true, location: 'e' }
        title: 'Sine Wave',
        series:[ 
          {
            // Change our line width and use a diamond shaped marker.
            lineWidth:1, 
            //markerOptions: { style:'dimaond' }
            showMarker:false,
          }, 
        ],
        axes:{
          xaxis:{
            label:'time'
          },
          yaxis:{
            label:'Amplitude'
          }
      }
      }
    })
    .value('voltChartOpts',{
      voltChartOpts:{
        seriesDefaults:{
          renderer: $.jqplot.MeterGaugeRenderer,
           rendererOptions: {
               min: 100,
               max: 500,
               intervals:[200, 300, 400, 500],
               intervalColors:['#66cc66', '#93b75f', '#E7E658', '#cc6666']
            }
        }
      }
    })
    .controller('DemoCtrl', function ($scope, charting,voltChartOpts,$resource, $interval,sineUpdateData) {
      $scope.someData = [[0]] ;
      var rs = $resource('data/SineWave.json') ;
      rs.get({},function (Data){
        //$scope.testData = Data.data ;
        $scope.testData = [] ;
        for (var i = 0; i < Data.data.length; i++) {
          if(i%20==0){
            $scope.testData.push(Data.data[i]) ; 
          }
        };
        
       $scope.updateSpeed() ;
      });
      //console.log($scope.testData);
      $scope.$watch('testData', function(newValue,oldValue){
        if(newValue!=null){
          $scope.someData = [$scope.testData] ;
        };
      });

      $scope.updateSpeed = function(){
        //first cancel the current task;
        if(typeof sineUpdate!= "undefined" ){
          while(!$interval.cancel(sineUpdate)){};
        }

        if($scope.speed!=null){
          timeInterval = $scope.speed ;
        }
        else{
          timeInterval = 1000 ;
        };

       sineUpdate = $interval(function(){
          if ($scope.testData != null) {
            shiftItems($scope.testData,1) ;
          };          
        },timeInterval);
      }

      shiftItems = function(array,number){
        for (var i = number - 1; i >= 0; i--) {
          array.push(array.shift());          
        }
      };

      $scope.updateVolt = function(){
         sineUpdateData.add($scope.voltData[0],[Number($scope.Volt)]) ;
      }
      
      $scope.voltData = [[200]];
      $scope.myChartOpts = charting.pieChartOptions;
      $scope.voltChartOpts = voltChartOpts.voltChartOpts; 
      //$scope.voltChartOpts = charting.pieChartOptions;
    });