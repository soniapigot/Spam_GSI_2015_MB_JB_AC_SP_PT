var robots = require('robots')
  , parser = new robots.RobotsParser();

parser.setUrl('http://www.france.aide-et-action.org/robots.txt', function(parser, success) {
  if(success) {
    
  	var split1 = (parser.parse("").chunks[0]).split("Disallow: ");
  	var disallow = [];
  	for (var i = 0;i<split1.length;i++) {
  		if (split1[i].includes("Disallow :")) {
  			var temp = split1[i].split("Disallow :");
  			disallow.push(temp);
  		} else {
  			disallow.push(split1[i]);
  		}
  	}
  	for (var i=0;i<disallow.length;i++){
  		if(disallow[i].constructor === Array) {
  			for(var j=0;j<disallow[i].length;j++){
  				disallow.push(disallow[i][j]);
  			}
  			disallow.splice(i, 1);
  		}
  		if(disallow[i].includes("Noindex")){
  			var index = disallow[i].indexOf("Noindex");
  			disallow[i] = disallow[i].substring(0,index);
  		}
  		if(disallow[i].includes("pdf")){
  			disallow.splice(i,1);
  		}
  	}
  	disallow[0] = disallow[0].substring(disallow[0].indexOf("User"),disallow[0].length);
  	for (var i=1;i<disallow.length;i++){
  		disallow[i] = disallow[i].substring(1,disallow[i].indexOf("\r"));
  	}
  }
});
