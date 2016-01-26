package requestParsing;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;


import org.w3c.dom.Document;

import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

public class xmlParse {
	
	/** @return le nombre de requ�tes en base de donn�es */
	public static int getNumberOfRequests() throws ParserConfigurationException, SAXException, IOException{
		
		DocumentBuilderFactory domFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder = domFactory.newDocumentBuilder();
        Document doc = builder.parse("GENERATION_MAIL.xml");
        NodeList columns =  doc.getElementsByTagName("column");
		
        String number = columns.item(columns.getLength()-3).getTextContent();
        return Integer.parseInt(number);
	}

	/** @return String contenant la requ�te caract�ris�e par id */
	public static String findRequest(int id){
		 DocumentBuilderFactory domFactory = DocumentBuilderFactory.newInstance();
		 String aRetourner ="";
	        try {
	            DocumentBuilder builder = domFactory.newDocumentBuilder();
	            Document doc = builder.parse("GENERATION_MAIL.xml");
	            NodeList columns =  doc.getElementsByTagName("column");
	            int i=0; 
	            Node parent;
	            boolean trouve = false;
	            
	            // on cherche la balise 'column' qui contient le texte "id"
	            // une fois trouv�e, on remonte au parent dans le DOM
	            // puis on renvoit l'enfant du noeud qui contient la requ�te
	            while(i<columns.getLength() && !trouve){
	            	if(columns.item(i).getTextContent().equals(""+id)){
	            		parent = columns.item(i).getParentNode();
	            		aRetourner = parent.getChildNodes().item(5).getTextContent();
	            		trouve = true;
	            	}
	            	else{
	            		i++;
	            	}
	       	
	          
	            }
	           
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	        return aRetourner;
	}
	
	/** @return liste contenant les diff�rents �lement de la requ�te */
	public static List<String> parseRequest(String request){
		
		// on parse la requ�te en la d�composant suivant les virgules qui s�parent les �l�ments
		String[] decompose = request.split(", ");
		List<String> liste = new ArrayList<String>();

		// certaines virgules sont comprises dans les valeurs des �l�ments
		// on recompose alors ces �l�ments, en cr�ant une liste
		// on v�rifie que chaque �l�ment du tableau decompose commence par une lettre majuscule
		// si oui, on ajoute cet �l�ment � la liste
		// si non, on ajoute decompose[i] au dernier �l�ment de la liste --> on recompose l'�lement
		for(int i=0; i<decompose.length; i++){	
			char initiale = decompose[i].charAt(0);
			if(initiale>='A' && initiale <= 'Z'){
				liste.add(decompose[i]);
			}
			else{
				liste.set(liste.size()-1, liste.get(liste.size()-1)+ ", " + decompose[i]);
			}
		}
		
		return liste;
	}
	
	/** D�compose un �lement s constitu� comme suit :  CLE : valeur  et remplit la HashMap hm en cons�quence*/
	public static void splitName_Value(String s, HashMap<String, String> hm){
		
		String[] decompose = s.split(": ");
		String name = decompose[0];
		
		// si pas de valeur pour la cl�, on remplit avec un espace
		String value = " ";
		
		if(decompose.length == 2){
			value = decompose[1];	
		}
		hm.put(name.replaceAll("\\s+", ""),  value);
		
	}
	
	
}
