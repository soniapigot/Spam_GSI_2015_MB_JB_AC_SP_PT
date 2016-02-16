package mailParsing;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.mail.*;
import javax.mail.internet.MimeMessage;

public class mailParsing {

	/** @return ID de la requ�te ayant men� � l'envoi du mail */	
	public static int getID(String mail) throws FileNotFoundException, MessagingException{
		InputStream mailFileInputStream = new FileInputStream(mail);
		Properties props = new Properties();
		Session session = Session.getDefaultInstance(props, null);
		MimeMessage message = new MimeMessage(session, mailFileInputStream);

		Address[] recipients = message.getAllRecipients();
		String recipient =  recipients[0].toString();

		//Cherche l'ID en filtrant par une expression r�guli�re l'adresse du destinataire
		Scanner in = new Scanner(recipient).useDelimiter("[^0-9]+");
		return in.nextInt();
	}


	public static void mySplit(String mail) throws IOException{
		BufferedReader br = new BufferedReader(new FileReader(mail));
		int i = 0;
		String s1 = br.readLine();
		String s2 = br.readLine();
		PrintWriter pw = new PrintWriter(mail+"_"+i,"UTF-8");
		pw.println(s1);
		s1 = new String(s2);
		s2 = br.readLine();

		while(s2!=null){
			if (s2.contains(">From")){
				System.out.println("rentreif");
				i++;
				pw.close();
				pw = new PrintWriter(mail+"_"+i,"UTF-8");	
				
			}
			pw.println(s1);
			s1 = new String(s2);
			s2 = br.readLine();
		}
		pw.println(s1);
		pw.close();
	}


	/** @return destinataire du mail */
	public static String getDestinataire(String mail) throws MessagingException, FileNotFoundException{
		InputStream mailFileInputStream = new FileInputStream(mail);
		Properties props = new Properties();
		Session session = Session.getDefaultInstance(props, null);
		MimeMessage message = new MimeMessage(session, mailFileInputStream);

		Address[] recipients = message.getAllRecipients();
		String recipient =  recipients[0].toString();

		// R�cup�re l'identifiant du destinataire sans les chevrons
		Pattern pattern = Pattern.compile("<(.*?)@");
		Matcher matcher = pattern.matcher(recipient);
		if(matcher.find()){
			String result = matcher.group(0).substring(1, matcher.group(0).length()-1);
			return result;
		}
		else{
			return null;
		}

	}

	/** @return exp�diteur du mail */
	public static String getExpediteur(String mail) throws FileNotFoundException, MessagingException{
		InputStream mailFileInputStream = new FileInputStream(mail);
		Properties props = new Properties();
		Session session = Session.getDefaultInstance(props, null);
		MimeMessage message = new MimeMessage(session, mailFileInputStream);

		Address[] sender = message.getFrom();
		String result = sender[0].toString();

		// R�cup�re l'adresse de l'exp�diteur sans les chevrons
		Pattern pattern = Pattern.compile("<(.*?)>");
		Matcher matcher = pattern.matcher(result);
		if(matcher.find()){
			String aRetourner = matcher.group(0).substring(1, matcher.group(0).length()-1);
			return aRetourner;
		}
		else{
			return null;
		}

	}

	/** @return date d'envoi du mail */
	public static String getDate(String mail) throws FileNotFoundException, MessagingException{
		InputStream mailFileInputStream = new FileInputStream(mail);
		Properties props = new Properties();
		Session session = Session.getDefaultInstance(props, null);
		MimeMessage message = new MimeMessage(session, mailFileInputStream);

		Date date = message.getSentDate();
		return date.toString();

	}

	/** @return IP de l'exp�diteur */
	public static String getIP(String mail) throws IOException{

		// lit et r�cup�re le texte complet du fichier mail
		BufferedReader br = new BufferedReader(new FileReader(mail));
		String everything= "";
		try {
			StringBuilder sb = new StringBuilder();
			String line = br.readLine();

			while (line != null) {
				sb.append(line);
				sb.append("\n");
				line = br.readLine();
			}
			everything = sb.toString();
		} finally {
			br.close();
		}

		// cherche l'adresse IP en filtrant via une RegExp
		Pattern pattern = Pattern.compile("(25[0-5]|2[0-4]\\d|[0-1]?\\d?\\d)(\\.(25[0-5]|2[0-4]\\d|[0-1]?\\d?\\d)){3}");
		Matcher matcher = pattern.matcher(everything);
		// boucle imbriqu�e pour trouver la DEUXIEME IP, la premi�re �tant celle de kgb.emn.fr
		if(matcher.find()){
			if(matcher.find()){
				String aRetourner = matcher.group();
				return aRetourner;
			}
			return null;
		}
		else{
			return null;
		}



	}

	public static void main(String[] args) {
		try {
			mySplit("mail/bodin.thomas117");
			System.out.println("done");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}