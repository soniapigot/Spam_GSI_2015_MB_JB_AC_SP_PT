package requestParsing;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;




import javax.xml.parsers.ParserConfigurationException;

import org.xml.sax.SAXException;

public class Main {

	public static void main(String[] args) throws ParserConfigurationException, SAXException, IOException {

		PrintWriter writer = new PrintWriter(new File("requetes.csv"));
		writer.print("");
		writer.close();

		int nbOfRequests = xmlParse.getNumberOfRequests();

		for(int id=1; id<=nbOfRequests; id++){
			HashMap<String, String> hm = new HashMap<String, String>();
			hm.put("id", ""+id);
			List<String> liste = xmlParse.parseRequest(xmlParse.findRequest(id));
			for(String s : liste){
				xmlParse.splitName_Value(s, hm);
			}	
			fillCSV.writeCsvFile(hm);
		}





	}


}
