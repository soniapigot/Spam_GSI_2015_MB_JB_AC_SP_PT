Echo "Execution getRawHTMLCode.js";
node getRawHTMLCode.js %1 %2 ;
Echo "Execution removeCSS.js sur withoutCSSandJS";
phantomjs removeCSS.js "http://localhost/projetoption/" "withoutCSSandJS" %2 ;
Echo "Execution removeJS.js sur withoutJS";
phantomjs removeJS.js "http://localhost/projetoption/" "withoutJS" %2 ;
Echo "Execution removeJS.js sur withoutCSSandJS";
phantomjs removeJS.js "http://localhost/projetoption/" "withoutCSSandJS" %2 ;
Echo "Execution getCSSaddress.js";
phantomjs getCSSaddress.js "http://localhost/projetoption/withoutJS/withoutJS.html" %2 ;
Echo "Execution getCSScode.js";
node getCSScode.js %1 %2 ;
Echo "Execution scraper.js sur withoutCSSandJS";
phantomjs scraper.js "http://localhost/projetoption/withoutCSSandJS/withoutCSSandJS.html" "WithoutObfuscation" %2 ;
Echo "Execution scraper.js sur withoutJS";
phantomjs scraper.js "http://localhost/projetoption/withoutJS/withoutJS.html" "CSSObfuscation" %2 ;
Echo "Execution scraper.js sur la page";
phantomjs scraper.js %1 "SophisticatedObfuscation" %2 ;
Echo "Execution scraper.js sur mailtoTracking";
phantomjs scraper.js "http://localhost/projetoption/mailtoTracking/mailtoTracking.html" "Tracking" %2 ;
Echo "Execution setDistribution.js";
node setDistribution.js %2 ;
Echo "Fin de l'execution";