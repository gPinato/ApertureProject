/*****************************************************\
| REQscript - Alberto Garbui
| v1.0 - 2014/04/07 - prima versione
|
| Script per il parsing del file tex dei requisiti
| generazione file di testo da importare con Access.
| Viene generato REQaccess.txt con la lista dei requisiti
| e REQUC.txt con il tracciamento requisiti-casid'uso
|
\*****************************************************/
#include<stdio.h>
#include<stdlib.h>
#include<iostream>
#include<fstream>
using namespace std;

int cercaStringa(const char * buffer, int buffer_lenght, int start, const char * pattern, int pattern_lenght)
{
	int result=-1;
	bool trovato=false;
	int j=0;
	char debugChar;
	
	for(int i=start; i<=buffer_lenght-pattern_lenght && !trovato; i++)
	{
		//debugChar=buffer[i];
		//cout<<debugChar;
		
		//se trovo la sentinella di fine %JKEND
		if(buffer[i] == '%' && buffer[i+1] == 'J' && buffer[i+2] == 'K' && buffer[i+3] == 'E')
		{
			//cout<<"trovato commento su "<<i<<endl;
			//vado avanti fino a trovare start stando dentro il limite del buffer...
			while(i<=buffer_lenght-5)
			{
				if(buffer[i] == '%' && buffer[i+1] == 'J' && buffer[i+2] == 'K' && buffer[i+3] == 'S'){
					break;
				}else{
					i++;
				}
			}
			//cout<<"saltato fino a "<<i<<endl;
		}
		
		if(buffer[i] == pattern[j]) //se trovo un match
		{
			j++;
		}else{
			if(j != 0)
			{
				i-=j-1; //avanzo di una posizione
				j=0;
			}		
		}
		
		if(j == pattern_lenght)
		{
			trovato=true;
			result=i+1; //restituisco l'indice della prossima posizione utile
		}
		
	}	
	return result;
}

//prende il testo
int setText(const char * buffer, char * outBuffer)
{
	int j=0,i=0;
	
	while(buffer[i]==' ')i++;

	while(buffer[i] != '\n' && buffer[i] != '&' && !(buffer[i]=='\\' && buffer[i+1]=='\\'))
	{
		//se trovo una parola in glossario, rimuovo l'attributo \gloss{
		if(buffer[i]=='\\' && buffer[i+1]=='g' && buffer[i+2]=='l' && buffer[i+3]=='o' && buffer[i+4]=='s')
		{
			//mi sposto al primo carattere utile
			i+=7;
			while(buffer[i] != '}')
				outBuffer[j++] = buffer[i++];	//prendo la parola
			i++;
		}
		
		//salto la barra prima dell'underscore...
		if(buffer[i]=='\\' && buffer[i+1]=='_')i++;
		
		if(buffer[i] != '\n' && buffer[i] != '&' && !(buffer[i]=='\\' && buffer[i+1]=='\\'))
			outBuffer[j++] = buffer[i++];
	}
	outBuffer[j]='\0';
	return i+1;
}

//prende il nome di un caso d'uso associato al requisito
int setUC(const char * buffer, char * outBuffer)
{
	int j=0,i=0;
	
	while(buffer[i]==' ')i++; //salto gli spazi
	//if(buffer[i]=='\\')return i+1; //se trovo una barra esco

	while(buffer[i] != '\n' && buffer[i] != '&' && buffer[i] != ' ' && !(buffer[i]=='\\' && buffer[i+1]=='\\'))
	{	
		//salto la barra prima dell'underscore...
		if(buffer[i]=='\\' && buffer[i+1]=='_')i++;
		
		if(buffer[i] != '\n' && buffer[i] != '&' && buffer[i] != ' ' && !(buffer[i]=='\\' && buffer[i+1]=='\\'))
			outBuffer[j++] = buffer[i++];
	}
	outBuffer[j]='\0';
	return i+1;
}

//prende un requisito
int getREQ(const char * buffer, int length, int start, ofstream * OUT, ofstream * OUT2)
{
	char *buffOUT=new char[1000];
	char *Req=new char[10];
	
	int i=cercaStringa(buffer,length,start,"\\midrule",8); 
	if(i==-1)return i; //errore, non trovato
	
	//cout<<"trovato midrule requisito a "<<i<<endl;
	
	//proseguo fino a trovare una R di requisito
	while(buffer[i]!='R')i++;
	int reqIndex=i+1; 			//mi salvo la posizione del nome del requisito
	i+=setText(&buffer[i],Req); 					//titlitolo requisito
	cout<<Req<<endl;
	*OUT<<'"'<<Req<<'"'<<';';    					//Rxxx
	i++;
	
	switch(buffer[reqIndex])						//importanza
	{
		case 'O': *OUT<<'"'<<"Obbligatorio"<<'"'<<';';break;
		case 'D': *OUT<<'"'<<"Desiderabile"<<'"'<<';';break;
		case 'F': *OUT<<'"'<<"Facoltativo"<<'"'<<';';break;	
		default: *OUT<<'"'<<"JK nn sa :("<<'"'<<';';break;
	}
	
	switch(buffer[reqIndex+1])						//tipo
	{
		case 'F': *OUT<<'"'<<"Funzionale"<<'"'<<';';break;
		case 'Q': *OUT<<'"'<<"Qualita"<<'"'<<';';break;
		case 'P': *OUT<<'"'<<"Prestazionale"<<'"'<<';';break;
		case 'V': *OUT<<'"'<<"Vincolo"<<'"'<<';';break;
		default: *OUT<<'"'<<"JK nn sa :("<<'"'<<';';break;
	}
	
	i+=setText(&buffer[i],buffOUT); 					//descrizione requisito
	cout<<buffOUT<<endl;
	*OUT<<'"'<<buffOUT<<'"'<<';';  
	i++;

	i+=setText(&buffer[i],buffOUT); 					//fonte
	i++;
	
	cout<<buffOUT<<endl;
	*OUT<<'"'<<buffOUT<<'"'<<';'; 						//aggiungo la fonte su REQaccess.txt
	*OUT2<<'"'<<Req<<'"'<<';';    						//anche la fonte va tracciata su REQUC.txt
	*OUT2<<'"'<<buffOUT<<'"'<<endl;	
		
	*OUT<<'"'<<' '<<'"'<<endl; 						//incremento
	
	//preparo anche la tabella requisiti-casi d'uso associati
	i+=setUC(&buffer[i],buffOUT); 				//Caso d'uso associato
	if(buffOUT[0]!='\0')
	{
		cout<<buffOUT<<endl;
		*OUT2<<'"'<<Req<<'"'<<';';    					//Rxxx
		*OUT2<<'"'<<buffOUT<<'"'<<endl;  	
	}
	
	while(!(buffer[i]=='\\' && buffer[i+1]=='m') && !(buffer[i]=='%' && buffer[i+1]=='J' && buffer[i+2]=='K'))
	{
		//prendo UC e verbali
		if((buffer[i]=='U' && buffer[i+1]=='C') || (buffer[i]=='V' && buffer[i+1]=='e'))
		{
			*OUT2<<'"'<<Req<<'"'<<';';    					//Rxxx
			i+=setUC(&buffer[i],buffOUT); 				//Caso d'uso associato
			cout<<buffOUT<<endl;
			*OUT2<<'"'<<buffOUT<<'"'<<endl;
		}else{
			i++;
		}
	}
	
	cout<<endl;
	
	delete buffOUT; // :)
	delete Req;
	return i;
}

//main? :)
int main(int argc, char* argv[])
{
	try
	{
		cout<<"|***********************************************|"<<endl;
		cout<<"|                                               |"<<endl;
		cout<<"|           REQscript - Alberto Garbui          |"<<endl;
		cout<<"|                                               |"<<endl;
		cout<<"|    Script per il parsing del file tex dei     |"<<endl;
		cout<<"|   requisiti e generazione file di testo da    |"<<endl;
		cout<<"|             importare con Access.			   |"<<endl;
		cout<<"|                                               |"<<endl;
		cout<<"|***********************************************|"<<endl<<endl;
		cout<<"-> apertura files... ";
		ifstream IN("Requisiti.tex");
		ofstream OUT("REQaccess.txt");
		ofstream OUT2("REQUC.txt");
		if(!OUT)throw(0);
		if(!OUT2)throw(1);
		if(!IN)throw(2);
		cout<<"Fatto!"<<endl;
		
		
		cout<<"-> carico Requisiti.tex... ";
		IN.seekg (0, IN.end);
		int length = IN.tellg();
		IN.seekg (0, IN.beg);
        char * buffer = new char [length];
		IN.read (buffer,length);
		IN.close();
		cout<<"Fatto!"<<endl;
		cout<<"-> inizio ricerca requisiti... "<<endl;
		int k=getREQ(buffer,length,0,&OUT,&OUT2);
		while(k!=-1)
		{
			k=getREQ(buffer,length,k,&OUT,&OUT2);
		}
		
		delete buffer;
			
	}
	catch(int x)
	{
		switch(x)
		{
			case 0:cout<<"Errore nella scrittura del file di output REQaccess.txt! "<<endl;break;
			case 1:cout<<"Errore nella scrittura del file di output REQUC.txt! "<<endl;break;
			case 2:cout<<"Errore nell'apertura del file Requisiti.tex! "<<endl;break;		
			default:cout<<"Errore! "<<x<<endl;break;
		}
	}
}//end main