node robotAvecCheerio.js %1 %2 ;
phantomjs enleveCSS.js "http://localhost/projetoption/" "a" %2 ;
phantomjs enleveJS.js "http://localhost/projetoption/" "b" %2 ;
phantomjs enleveJS.js "http://localhost/projetoption/" "a" %2 ;
phantomjs skynet.js "http://localhost/projetoption/b/b.html" %2 ;
node scripts.js %1 %2 ;
phantomjs robot.js "http://localhost/projetoption/a/a.html" "1" %2 ;
phantomjs robot.js "http://localhost/projetoption/b/b.html" "2" %2 ;
phantomjs robot.js %1 "3" %2 ;
node difference.js %2 ;