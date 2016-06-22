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
			expect(elapsed).to.be.closeTo(1000, 5);
			done();
		}, 1000);
	});
	it('makes sure that forEach works like forEach works', function () {
		var someArrayOfNums = [1, 2, 3, 4, 5, 6];
		function uselessFunction () {
			console.log("it really doesn't matter what I do in here");
		}
		var uselessSpy = chai.spy(uselessFunction);
		someArrayOfNums.forEach(uselessSpy);
		expect(uselessSpy).to.have.been.called.exactly(someArrayOfNums.length);
	});
});

// Page model tests
	// test that datatypes are the expected datatypes
	// test that adding blank values for fields that may not be blank raises an error of some sort
	// I don't know how to write any of this
