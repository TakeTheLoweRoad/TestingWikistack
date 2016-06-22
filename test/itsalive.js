var chai = require('chai');
var spies = require('chai-spies');
var expect = chai.expect;

chai.use(spies);

describe('Testing suit capabilities', function (){
	it('works the way math works', function (){
		expect(2 + 2).to.equal(4);
	});
	it('checks that setTimeout works', function (done){
		var start = new Date();
		setTimeout(function () {
			var startAgain = new Date();
			var elapsed = startAgain - start;
			expect(elapsed).to.be.closeTo(1000, 10);
			done();
		}, 1000);
	});
	it('makes sure that forEach works like forEach works', function () {
		// var someArrayOfNums = [1, 2, 3, 4, 5, 6];
		// function uselessFunction () {
		// 	console.log("it really doesn't matter what I do in here");
		// }
		// var uselessSpy = chai.spy(uselessFunction);
		// someArrayOfNums.forEach(uselessSpy);
		// expect(uselessSpy).to.have.been.called.exactly(someArrayOfNums.length);
		var obj = {
  			foobar: function () {
    			console.log('foo');
    		return 'bar';
  			}
		}
		chai.spy.on(obj, 'foobar');
		var someArrayOfNums = [1, 2, 3, 4, 5, 6];
		someArrayOfNums.forEach(obj.foobar);

		expect(obj.foobar).to.have.been.called.exactly(6);




	});
});
