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
        var someArrayOfNums = [1, 2, 3, 4, 5, 6];
        var obj = {
            foobar: function () {
                console.log('foo');
            return 'bar';
            }
        };
        function uselessFunction () {
            console.log("it really doesn't matter what I do in here");
        }
        var uselessSpy = chai.spy(uselessFunction);

        someArrayOfNums.forEach(uselessSpy);
        expect(uselessSpy).to.have.been.called.exactly(someArrayOfNums.length);
        chai.spy.on(obj, 'foobar');
        someArrayOfNums.forEach(obj.foobar);
        expect(obj.foobar).to.have.been.called.exactly(6);
    });
});

describe('Page model', function () {

  describe('Virtuals', function () {
    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"');
    });
    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML');
    });
  });

  describe('Class methods', function () {
    describe('findByTag', function () {
      it('gets pages with the search tag');
      it('does not get pages without the search tag');
    });
  });

  describe('Instance methods', function () {
    describe('findSimilar', function () {
      it('never gets itself');
      it('gets other pages with any common tags');
      it('does not get other pages without any common tags');
    });
  });

  describe('Validations', function () {
    it('errors without title');
    it('errors without content');
    it('errors given an invalid status');
  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating');
  });

});
