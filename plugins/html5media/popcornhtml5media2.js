// PLUGIN: html5media
(function (Popcorn) {
  /**
   * html5media popcorn plug-in 
   * Adds a html5media element to an element on the page.
   * Options parameter will need ...
   * 
   * 
   * @param {Object} options
   * 
   * Example:
     var p = Popcorn('#html5media')
        .html5media({
          start: 5, // seconds
          end: 15, // seconds
          sources: {
            mp4: {
              id: "mp4", 
              src: "../../test/trailer.mp4", 
              type: "html5media/mp4; codecs='avc1, mp4a'"
            }
          },
          target: 'footnotediv',
          poster: "../../test/poster.png"
        } );
   *
   */
  Popcorn.plugin( "html5media" , function( options ){
    var d = document.createElement('div'),
    d.style.display = "none";
    
    return {
      {
        about:{
          name: "Popcorn html5media Plugin",
          version: "0.1",
          author: "@annasob",
          website: "annasob.wordpress.com"
        },
        // needs fixin
        options:{
          start    : {elem:'input', type:'text', label:'In'},
          end      : {elem:'input', type:'text', label:'Out'},
          target   : 'html5media-container',
          text     : {elem:'input', type:'text', label:'Text'}
        }
      },
      _setup: function(options) {
        // can this be interchangable with audio??
        // TO DO: compare video and audio element
        var v = document.createElement('video');
        v.controls = true;
        v.preload = true;
        if ( options.poster ) {
          v.poster = options.poster;
        }
        var s;
        for (var i in options.sources) {
          s       = document.createElement('source');
          s.id    = i.id;
          s.src   = i.src;
          s.type  = i.type;
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
      },
      /**
       * @member html5media 
       * The start function will be executed when the currentTime 
       * of the html5media  reaches the start time provided by the 
       * options variable
       */
      start: function(event, options){
        d.style.display = "inline";//options.id
      },
      /**
       * @member html5media 
       * The end function will be executed when the currentTime 
       * of the html5media  reaches the end time provided by the 
       * options variable
       */
      end: function(event, options){
        d.style.display = "none";
      }
    };
  });

})( Popcorn );