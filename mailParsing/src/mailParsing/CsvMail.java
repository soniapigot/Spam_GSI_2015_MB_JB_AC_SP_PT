package mailParsing;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import mailParsing.mailParsing;

import javax.mail.MessagingException;

public class CsvMail {

	//Delimiter used in CSV file
	private static final String COMMA_DELIMITER = ";";
	private static final String NEW_LINE_SEPARATOR = "\n";

	public static void main(String[] args) throws MessagingException, IOException {

		// on efface à chaque exécution du programme le fichier csv existant pour le mettre à jour 
		PrintWriter writer = new PrintWriter(new File("mails.csv"));
		writer.print("");
		writer.print("id;MAIL_DESTINATAIRE;MAIL_EXPEDITEUR;MAIL_DATE;MAIL_IP" + NEW_LINE_SEPARATOR);
		
        // pour chaque fichier dans le répertoire mail, on crée une String comportant les éléments à inscrire dans le tableau
		File dir = new File("mail");
		File[] directoryListing = dir.listFiles();
		List<String> liste = new ArrayList<String>();
		if (directoryListing != null) {
			for (File child : directoryListing) {			    
				String childString = "\"" + mailParsing.getID("mail/" + child.getName())
						+ "\"" + COMMA_DELIMITER + "\""
						+mailParsing.getDestinataire("mail/" +child.getName())
						+ "\"" + COMMA_DELIMITER + "\""
						+mailParsing.getExpediteur("mail/" +child.getName())
						+ "\"" + COMMA_DELIMITER + "\""
						+mailParsing.getDate("mail/" +child.getName())
						+ "\"" + COMMA_DELIMITER + "\""
						+mailParsing.getIP("mail/" +child.getName())
						+ "\"";
				liste.add(childString);
			}
			// on trie la liste des String par id croissants
			Collections.sort(liste);

			// on ajoute chaque ligne au fichier CSV
			for(String s : liste){
				writer.print(s + NEW_LINE_SEPARATOR);

			}

		}
		
		writer.close();
	}
	

}
