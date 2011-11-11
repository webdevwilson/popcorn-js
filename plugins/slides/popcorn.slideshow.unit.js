test("Popcorn Ken Burns Plugin", function () {
  /*
    ATTENTION
  
    This demo uses an API key obtained for testing the LastFM Popcorn.js
    plugin. Please do not use it for other purposes.
  */
  var popped = Popcorn("#video"),
      expects = 8, 
      count = 0,
      kenburnsdiv = document.getElementById('kenburnsdiv');
  
  expect( expects );
  
  function plus() {
	count += (arguments[0]) ? arguments[0] : 1;
	if ( count >= expects) {
      start();
    }
  }

  stop();   
 
  ok('kenburns' in popped, "ken burns is a method of the popped instance");
  plus();

  equals ( kenburnsdiv.innerHTML, "", "initially, there is nothing inside the kenburnsdiv" );
  plus();
  
  var kb = popped.kenburns({
    start: 1, // seconds
    end: 4, // seconds
    target: 'kenburnsdiv',
	fadeTime: 500,
	images: [
            'https://lh6.googleusercontent.com/-Xncgl2_KX5E/TgOZThvk65I/AAAAAAAABFc/6OVmfJRdXRo/e365/IMG_6141.JPG',
            'https://lh3.googleusercontent.com/-nBhYSb9sQRk/ToufUDjTlII/AAAAAAAAClo/4cMzXAoRzTo/e365/DSC_2737-Edit.jpg',
            'https://lh4.googleusercontent.com/-oXg81wLqeos/TqCLoBuvL9I/AAAAAAAAFGc/-ttrNpqV1Ys/e365/L1057586.jpg',
            'https://lh4.googleusercontent.com/-uL6JpWOq82k/To9jCU-DPGI/AAAAAAAAEng/jAXJx2eSOXM/IMG_5249%252B-%252B1.jpg',
            'https://lh4.googleusercontent.com/-1oYAqn8Hi9o/TgtZEE_8tKI/AAAAAAAAYJg/woQdbqPgBX4/e365/3410783929_310572ed16_o.jpg'
    ]
  });

  popped.exec( 2, function() {
    equals ( kenburnsdiv.childElementCount, 1, "kenburnsdiv now contains 1 element" );
	equals ( kenburnsdiv.children[0], kb.canvas, "kenburnsdiv has a canvas element" );
	equals ( kb.images.length, 5, 'should load all images');
	equals ( kb.duration, 3000, 'duration is the length of the animation in milliseconds');
	equals ( kb.fadeTime, 500, 'fadeTime should be 500');
	equals ( kb.displayTime, 500, 'displayTime is the length each image will show up in the timeline');
    plus(3);
  });

  popped.exec( 5, function() {
    equals (kenburnsdiv.innerHTML , "", "kenburnsdiv should be empty" );
    plus();
  });
  
  popped.volume(0).play();

});
