package crossData;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;

public class CrossData {

	
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new FileReader("requetes.csv"));
		String line = br.readLine();
		String[] l1 = line.split(";");
		int index=0;int i=0;int j=0; int k=0;
		while(index<l1.length && i*j*k==0){
			if(l1[index].equals("REQUEST_TIME")){
				i=index;
			}
			if(l1[index].equals("HTTP_USER_AGENT")){
				j=index;
			}
			if(l1[index].equals("REMOTE_ADDR")){
				k=index;
			}
			index++;
		}
		System.out.println(i+";"+j+";"+k);
		
	}
}
