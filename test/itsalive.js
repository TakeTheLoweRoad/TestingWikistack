var chai = require('chai');
var spies = require('chai-spies');
var expect = chai.expect;
var models = require('../models');
var Page = models.Page;
var supertest = require('supertest');
var app = require('../app');
var agent = supertest.agent(app);
chai.use(spies);

describe('Testing suit capabilities', function (){
    it('works the way math works', function (){
        expect(2 + 2).to.equal(4);
    });
    /*it('checks that setTimeout works', function (done){
        var start = new Date();
        setTimeout(function () {
            var startAgain = new Date();
            var elapsed = startAgain - start;
            expect(elapsed).to.be.closeTo(1000, 10);
            done();
        }, 1000);
    });*/
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
    var ourPage;
    beforeEach(function (){
    ourPage = Page.build(
        {title: "Best Page Ever", 
        content: "Imagine really great content here", 
        urlTitle: "besturlever",
        tags: ['this', 'is', 'the', 'best']
        });
  });

    describe('Virtuals', function () {
        describe('route', function () {
            it('returns the url_name prepended by "/wiki/"', function (){
                expect(ourPage.route).to.equal("/wiki/" + ourPage.urlTitle);
            });
        });
    });

    describe('Class methods', function () {

        beforeEach(function (done) {
            var page = Page.create({
                title: 'another thing',
                content: 'pub',
                tags: ['tag1', 'tag2']
            })
            var newPage = Page.create({
                title: 'something',
                content: 'bar',
                tags: ['foo', 'bar']
            })
            Promise.all([page, newPage])
            .then(function () {
                done();
            })
            .catch(done);
        });

        afterEach(function (done) {
            Page.findAll({})
            .then(function (pages) {
                for (var idx in pages) {
                    pages[idx].destroy();
                }
                done();
            });
        });

        describe('findByTag', function () {
            it('gets pages with the search tag', function (done) {
                Page.findByTag('bar')
                .then(function (pages) {
                    expect(pages[0].title).to.equal('something');
                    done();
                });
            });
            it('does not get pages without the search tag', function(done){
                Page.findByTag('bar')
                .then(function (pages) {
                    for (var page in pages){
                    expect(pages[page].title).to.not.equal('another thing');
                    }
                    done();
                });
            });    
        });
    });

    // describe('Validations', function () {
    //     it('errors without title');
    //     it('errors without content');
    //     it('errors given an invalid status');
    // });

    // describe('Hooks', function () {
    //     it('it sets urlTitle based on title before validating');
    // });

});


//Now start supertest stuff:
describe('http requests', function () {

  describe('GET /wiki/', function () {
    it('responds with 200', function (done) {
    agent
    .get('/wiki')
    .expect(200, done);
  });

  });

  describe('GET /wiki/add', function () {
    it('responds with 200', function(done){
        agent
        .get('/wiki/add')
        .expect(200, done);
    });
  });

  describe('GET /wiki/:urlTitle', function () {
    beforeEach(function (done){
        Page.create({title: 'not', content: 'yourmom', urlTitle:'notyourmom'})
        .then(function (){
            done();
        })
    })
    it('responds with 404 on page that does not exist', function(done){
        agent
        .get('/wiki/yourmom')
        .expect(404, done);
    });
    it('responds with 200 on page that does exist', function(done){
            agent
            .get('/wiki/notyourmom')
            .expect(200, done);
        })
    });
    

  });

  describe('GET /wiki/search', function () {
    it('responds with 200');
  });

  describe('GET /wiki/:urlTitle/similar', function () {
    it('responds with 404 for page that does not exist');
    it('responds with 200 for similar page');
  });

  describe('POST /wiki', function () {
    it('responds with 302');
    it('creates a page in the database');
  });

});

