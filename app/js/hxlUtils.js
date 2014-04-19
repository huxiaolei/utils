/**
* modules for 
* @param {attrs} chartData, chartName, chartOptions should be provided
*    -chartData, must be an array, the data to be ploted on the figure, can be mutiple arraies for plotting in the same graph
*    -chartName, the name of the chart, in the html decoration, it will be assigned to a <div chartName></div>
*    -charOptions, the jqplot options for plot the target graph.
* 
**/
angular.module('hxlUtils',[])
.factory('sineUpdateData',['$interval', function($interval){
	function DataHandler(){
		this._CurData = [];
		this._OriginData = [] ;
		this._TargetData =[];
		this._Index = [];
		this._Amp = [] ;
		this.UpdateTime = 1000; // in milisecond
		this.refreshTime = 50 ;
		this.timeInterval = this.UpdateTime/this.refreshTime;

		this.add = function(OData,FData){
			//check if OData and FData are arraie
			if(!(angular.isArray(OData)) || !angular.isArray(FData)){
				//throws an exception
				throw 'Not array, this service requires an array to capture data'
			}
			else if (OData.length!=FData.length||OData.length==0||FData==0) {
				throw 'two arraies must have the same degree!' ;
			}

			//go through both arraies
			for(var i=0; i<OData.length;i++){
				try{ 
					Number(OData[i]) ;
					Number(FData[i]) ;
				}
				catch(exception){
					throw 'array must contains number not other stuffs';
				}

				if(typeof OData[i] != 'number' || typeof FData[i] != 'number'){
					throw 'array must contains number not other stuffs';
				}
			};

			this._Amp.push(new Array());

			for(var i=0; i<OData.length;i++){
				this._Amp[this._Amp.length-1].push(FData[i] - OData[i]) ;
			}

			this._CurData.push(OData) ;
			this._OriginData.push(OData.slice(0)) ;
			this._TargetData.push(FData) ;
			this._Index.push(0) ;
		}

		this.setRefreshTime = function(timeIn){
			try{
				if (timeIn < this.UpdateTime){
					this.timeInterval = Number(timeIn) ;
					this.register();
				}
				else{
					throw "refresh time cann't be higher than update Time "; 
				}
				//re register update function
			}
			catch(e){
				//remains unchanged
			}
		}

		this.doUpdate = function(){
			// every change should be finished in 1's which is defined as 1000 miliseconds
			if (typeof this._CurData != 'undefined') {
				var cleanLs =[];
				if(this._CurData.length!=0){
					for(var j=0; j<this._CurData.length;j++){
						var temp = (( 1+Math.sin(-Math.PI/2+(this._Index[j]*Math.PI)/this.timeInterval) )/2);
						for(var i=0; i<this._CurData[j].length;i++){
							this._CurData[j][i] = this._OriginData[j][i] + this._Amp[j][i] *temp ;
						}
						this._Index[j]++;
						if(this._Index[j]>this.timeInterval){
							cleanLs.push(j);
							for(var k=0; k<this._CurData[j].length;k++){
								this._CurData[j][k] = this._TargetData[j][k];
							}
						}
					}
				}

				while(cleanLs.length>0){
					var temp = cleanLs.shift() ;
					for(var i = 0; i<cleanLs.length;i++){
						cleanLs[i]-- ;
					}
					this._CurData.splice(temp,1) ;
					this._TargetData.splice(temp,1) ;
					this._Amp.splice(temp,1) ;
					this._Index.splice(temp,1) ;
					this._OriginData.splice(temp,1) ;
				}
			};
		}


		this.register = function(dh){
			if(typeof hxlUtilsSineUpdateData!= "undefined" ){
	          while(!$interval.cancel(hxlUtilsSineUpdateData)){};
	        }

	       hxlUtilsSineUpdateData = $interval(function(){
	          dh.doUpdate() ;        
	        },dh.refreshTime);
		};
	}

	var datahandler = new DataHandler();

	datahandler.register(datahandler) ;

	return datahandler;
}])