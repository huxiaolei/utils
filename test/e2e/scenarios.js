describe('phoneCat App', function(){

	describe('phone list view', function(){

		beforeEach(function(){
			browser.get('app/index.html');
			//browser.driver.get('app/index.html');
		});
		/*
		it('should filter the phone list as user types into the search box', function(){

			var phoneList = element.all(by.repeater('phone in phones'));
			var query = element(by.model('query'));

			expect(phoneList.count()).toBe(3);

			query.sendKeys('nexus');
			expect(phoneList.count()).toBe(1);

			query.clear();
			query.sendKeys('motorola');
			expect(phoneList.count()).toBe(2);
		});

		it('should display the current filter value within an element with id "status"', 
			function(){
				var statusElement = element(by.id('status')) ;
				expect(statusElement.getText()).toMatch(/Current filter:\s*$/) ;

				element(by.model('query')).sendKeys('nexus');
				expect(statusElement.getText()).toMatch(/Current filter: nexus\s*$/) ;

				//alternative version of the last assertion that tests just the value of the binding
    			//expect(element(by.binding('query')).getText()).toMatch(/Current filter: nexus\s*$/);

			});
		*/
		it('should display phones in order of number', function(){
			element(by.model('orderProp')).findElement(by.css('option[value="age"]')).click() ;
			expect(element(by.selectedOption('orderProp')).getText()).toEqual('Newest');
			expect(element(by.selectedOption('orderProp')).getAttribute('value')).toEqual('age');

			var column = element.all(by.repeater('phone in phones').column('{{phone.name}}')) ;

			function getNames(){
				return column.map(function(elm){
					return elm.getText();
				});
			};
			//expect(getNames()).toMatch('/Motorola\s*$/');
			//expect(element.all(by.repeater('phone in phones'))[0].name).toBe('Motorola XOOM™ with Wi-Fi') ;
			//expect(findElements(by.repeater('phone in phones'))).toBe('Motorola XOOM™ with Wi-Fi') ;
		});
	});
});