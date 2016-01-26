package requestParsing;


import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Set;


public class fillCSV {

	//Delimiter used in CSV file
	private static final String COMMA_DELIMITER = ";";
	private static final String NEW_LINE_SEPARATOR = "\n";

	public static void writeCsvFile(HashMap<String, String> hm) {

		BufferedReader fileReader = null;
		String line = "";

		try{

			//Create the file reader
			fileReader = new BufferedReader(new FileReader("requetes.csv"));

			//Read the CSV file header to skip it
			String headersLine = fileReader.readLine();
			Set<String> hm_headers = hm.keySet();
			List<String> hm_headers_sorted = new ArrayList<String>(hm_headers);
			Collections.sort(hm_headers_sorted);
			// ajoute la colonne id en premier
			hm_headers_sorted.add(0, hm_headers_sorted.remove(hm_headers_sorted.size()-1));
			if(headersLine == null){
				headersLine = "";
				for(String s: hm_headers_sorted){
					headersLine = headersLine + s + COMMA_DELIMITER;	
				}	
			}
			
			String[] headers = headersLine.split(";");
			List<String> headersList = new ArrayList<String>(Arrays.asList(headers));
			List<String> lines = new ArrayList<String>();
			lines.add(headersLine);

			//Read the file line by line starting from the second line
			while ((line = fileReader.readLine()) != null) {
				lines.add(line);	
			}

			FileWriter fileWriter = null;

			try {
				fileWriter = new FileWriter("requetes.csv");

				//rajoute les headers de la requête
				hm_headers = hm.keySet();
				for(String s: hm_headers){
					if(!lines.get(0).contains(s)){
						lines.set(0, lines.get(0) + COMMA_DELIMITER + s);
						headersList.add(s);
					}
				}

				String newLine = "";
				for(String header : headersList){

					if(hm.get(header) != null){

						newLine += "\""+hm.get(header)+"\"";
					}
					newLine += COMMA_DELIMITER;
				}

				lines.add(newLine);

				for(String l : lines){
					fileWriter.append(l);
					fileWriter.append(NEW_LINE_SEPARATOR);
				}

			} catch (Exception e) {
				System.out.println("Error in CsvFileWriter !!!");
				e.printStackTrace();
			} finally {

				try {
					fileWriter.flush();
					fileWriter.close();
				} catch (IOException e) {
					System.out.println("Error while flushing/closing fileWriter !!!");
					e.printStackTrace();
				}

			}

		} catch (IOException e) {
			e.printStackTrace();
		}

	}
}

