// PLUGIN: html5media
(function (Popcorn) {

  /**
   * html5media popcorn plug-in
   * Adds a map to the target div centered on the location specified by the user
   * Options parameter will need .....
   *
   * @param ....
   *
   * Example:
    var p = Popcorn("#video")
        .html5media({
          start: 5, // seconds
          end: 15, // seconds
          sources: {
            mp4: {
              id: "mp4", 
              src: "../../test/trailer.mp4", 
              type: "video/mp4; codecs='avc1, mp4a'"
            }
          },
          target: 'myVideo1',
          poster: "../../test/poster.png",
          noSupport: "Your user agent does not support the HTML5 Video element."
        } );
  *
  */

  Popcorn.plugin( "html5media" , function( options ) {
    var d = document.createElement('div');
        d.style.display = "none";
    // can this be interchangable with audio??
    // TO DO: compare video and audio element
    var v = document.createElement('video');
    v.setAttribute("controls", "true") ;
    v.setAttribute("width", options.width) ;
    //v.setAttribute("preload", "true");
    if ( options.poster ) {
      v.poster = options.poster;
    }
    var s;
    for (var i in options.sources) {
      s       = document.createElement('source');
      s.setAttribute("id", options.sources[i].id);
      s.setAttribute("src", options.sources[i].src);
      //s.type  = options.sources[i].type;
      v.appendChild(s);
    }
    if (options.noSupport) {
      var p = document.createElement('p');
      p.innerHTML = options.noSupport;
      v.appendChild(p);
    } 
    d.appendChild(v);
    if ( document.getElementById( options.target ) ) {
      document.getElementById( options.target ).appendChild( d );
    } else {
      throw (" html5media does not have an appropriate target");
    }
    window.addEventListener("html5mediaEvent",  function () {
      video.pause();
      d.style.display = "inline";
      v.play();
    }, false);
    
    // Setup a proper frame interval function (60fps), favouring paint events.
    var step = ( function() {
    
      var buildFrameRunner = function( runner ) {
        return function( f, options ) {
    
          var _f = function() {
            f();
            if ( running ) {
              runner( _f );
            }
          };
    
          _f();
        };
      };
    
      // Figure out which level of browser support we have for this
      if ( window.webkitRequestAnimationFrame ) {
        return buildFrameRunner( window.webkitRequestAnimationFrame );
      } else if ( window.mozRequestAnimationFrame ) {
        return buildFrameRunner( window.mozRequestAnimationFrame );
      } else {
        return buildFrameRunner( function( f ) {
          window.setTimeout( f, 16 );
        } );
      }
    
    } )();
    return {
      /**
       * @member html5media
       * ...
       */
      /*start: function(event, options){
        this.pause();
        d.style.display = "inline";
      },*/
      /**
       * @member html5media
       * The end function will be executed when the currentTime
       * of the video reaches the end time provided by the
       * options variable
       */
      end: function(event, options){
        alert("hello");
        this.play();
        d.style.display = "none";
      }
    };
  },
  {
    about: {
      name: "Popcorn html5media Plugin",
      version: "0.1",
      author: "@annasob",
      website: "annasob.wordpress.com"
    },
    //needs updating
    options: {
      start    : {elem:"input", type:"text", label:"In"},
      end      : {elem:"input", type:"text", label:"Out"},
      target   : "html5media-container"
    }
  });
})( Popcorn );
