importScripts('script/jquery-1.4.2.min.js');

postMessage(JSON.stringify(get(5, null, "annasob")));



function get(rpp, callback, query) {
  $(document).ready(function(){
    $.getJSON("http://search.twitter.com/search.json?rpp="+rpp+ "&callback="+callback+"&q="+ query,function(json){

      $.each(json.results, function(i, tweet){
        tweet +=tweet.text;
      });
    });
  });
};
