describe('jasmine-shared', function(){

  shared.setup('init word', function(word){

    beforeEach(function(){
      this.word = word;
    });

  });

  shared.behavior('contains the letter', function(letter){

    it('contains the letter "' + letter + '"', function (){
      expect(this.word).toContain(letter);
    });

  });

  shared.scenario('test word contains "e" and "h"', function(word){

    describe('when the word is "' + word + '"', function(){
      shared.setup('init word', word);
      shared.for(['e','h'], function(letter){
        shared.behavior('contains the letter', letter);
      });
    });

  });

  shared.scenario('test word contains "e" and "h"', 'hello');
  shared.scenario('test word contains "e" and "h"', 'horse');

});
