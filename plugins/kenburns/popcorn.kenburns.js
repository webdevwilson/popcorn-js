// PLUGIN: KENBURNS

(function(Popcorn){

    /**
     * Adds Ken Burns effect to a div
     * 
     * Example:
     * var p = Popcorn('#video')
     *  .kenburns({
     *      start: 5,
     *      end: 10,
     *      target: 'targetDiv',
     *      images: [ '1.jpg', '2.jpg' ]
     *  });
     */
    Popcorn.plugin('kenburns', {
		
        manifest: {
            name: "Popcorn Ken Burns Plugin",
            version: "0.1",
            author: "Kerry Wilson",
            website: "http://goodercode.com/"
        },
        
        _setup: function(options) {
            if(!this.canvas) {
                
                // setup canvas and get context
                this.canvas = document.createElement('canvas');
                this.canvas.style.width = '100%';
                this.canvas.style.height = '100%';
                this.context = this.canvas.getContext('2d');
                document.getElementById( options.target ) && document.getElementById( options.target ).appendChild( this.canvas );
            
                this.duration = (options.start - options.end) * 1000;
                this.fadeTime = options.fadeTime || 1000;
                this.displayTime = this.duration / options.images.length;
                this.backgroundColor = options.backgroundColor || '#000000';
                
                // image preloader
                var preloadImage = function(i) {
                    i.image = new Image();
                    i.image.onload = function() {
                        i.loaded = true;
                        i.width = i.image.width;
                        i.height = i.image.height;
                    }
                    i.image.src = i.path;
                    return i;
                }
                
                this.images = [];
                for(var i=0; i < options.images.length; i++) {
                    this.images.push(preloadImage({
                        path: options.images[i],
                        loaded: false
                    }));
                }
            }
        },
        
        start: function(event,options) {
            debugger;
        },
        
        end: function(event,options) {
            clearInterval(this.interval);
        },
        
        _teardown: function(options) {
            this.canvas = this.context = null;
        }
    });

})( Popcorn );