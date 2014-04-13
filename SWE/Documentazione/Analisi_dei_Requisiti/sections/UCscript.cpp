/*****************************************************\
| UCscript - Alberto Garbui
| v1.2 - 2014/01/21 - prima versione
| v1.3 - 2014/04/07 - minor bugfixes
|
| Script per il parsing del file tex dei casi d'uso e 
| generazione file di testo da importare con Access.
| Recupera i casi d'uso
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
	
	for(int i=start; i<=buffer_lenght-pattern_lenght && !trovato; i++)
	{
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

//prende il testo contenuto tra due parentesi grafe
int setText(const char * buffer, char * outBuffer)
{
	int j=0,i=0;

	//per sicurezza mi sposto dentro al campo delimitato dalla parentesi grafa
	if(buffer[i]=='{')i++;
	
	while(buffer[i] != '}')
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
		
		if(buffer[i] == '{'){i++;}
		if(buffer[i] == '\n' || buffer[i] == ';'){outBuffer[j++]=' '; i++;}
		if(buffer[i] != '}')
			outBuffer[j++] = buffer[i++];
	}
	outBuffer[j]='\0';
	return i+1;
}

int setScenario(const char * buffer, char * outBuffer)
{
	int j=0,i=0;

	while(buffer[i] != '}')
	{
		if(buffer[i]=='\\' && buffer[i+1]=='g' && buffer[i+2]=='l' && buffer[i+3]=='o' && buffer[i+4]=='s')
		{
			i+=7;
			while(buffer[i] != '}')
				outBuffer[j++] = buffer[i++];
			i++;
		}
		if(buffer[i] == '\n' || buffer[i] == ';'){outBuffer[j++]=' '; i++;}
		if(buffer[i] != '}')
		{
			outBuffer[j++] = buffer[i++];
		}
	}
	outBuffer[j]='\0';
	return i+1;
}

int getUC(const char * buffer, int length, int start, ofstream * OUT)
{
	char *buffOUT=new char[1000];
	
	int i=cercaStringa(buffer,length,start,"UCtitle",7);
	if(i==-1)return i; //errore, non trovato
	
	//proseguo fino a trovare una parentesi grafa aperta
	while(buffer[i]!='{')i++;
	i++; //mi sposto al carattere successivo

	//qui c'è qualcosa del tipo "Caso d'uso UCxxx"
	//quindi scarto la prima parte del testo e prelevo solo il nome del caso 
	//d'uso UCxxxx
	while(buffer[i]!='U' && buffer[i+1]!='C')i++;
	i+=setText(&buffer[i],buffOUT); //title
	cout<<buffOUT<<endl;
	*OUT<<'"'<<buffOUT<<'"'<<';';    														//UCxxxx
	
	//proseguo fino a trovare una parentesi grafa aperta
	while(buffer[i]!='{')i++;
	i++; //mi sposto al carattere successivo
	
	i+=setText(&buffer[i],buffOUT); 														//NOME
	cout<<buffOUT<<endl;
	*OUT<<'"'<<buffOUT<<'"'<<';'; 
	
	i=cercaStringa(buffer,length,i,"\\UC",3);
	if(i==-1)return i; //errore, non trovato
	if(buffer[i]=='i')
	{
		//qui ho trovato il comando \UCimmagine{}
		//TODO ****** prelevare i dati relativi all'immagine							//IMMAGINE
	
	
		//cerco il prossimo comando \UC
		i=cercaStringa(buffer,length,i,"\\UC",3);
		if(i==-1)return i; //errore, non trovato
	}
	
	//proseguo fino a trovare una parentesi grafa aperta
	while(buffer[i]!='{')i++;
	i++; //mi sposto al carattere successivo
	
	i+=setText(&buffer[i],buffOUT); //caso
	cout<<buffOUT<<endl;
	*OUT<<'"'<<buffOUT<<'"'<<';'; 														//DIAGRAMMA ASSOCIATO
	
	//proseguo fino a trovare una parentesi grafa aperta
	while(buffer[i]!='{')i++;
	i++; //mi sposto al carattere successivo
	
	i+=setText(&buffer[i],buffOUT); 													//attori
	cout<<buffOUT<<endl;
	*OUT<<'"'<<buffOUT<<'"'<<';'; 
	
	//proseguo fino a trovare una parentesi grafa aperta
	while(buffer[i]!='{')i++;
	i++; //mi sposto al carattere successivo
	
	i+=setText(&buffer[i],buffOUT); 													//scopo
	cout<<buffOUT<<endl;
	*OUT<<'"'<<buffOUT<<'"'<<';'; 
	
	//proseguo fino a trovare una parentesi grafa aperta
	while(buffer[i]!='{')i++;
	i++; //mi sposto al carattere successivo
	
	i+=setText(&buffer[i],buffOUT); 													//pre
	cout<<buffOUT<<endl;
	*OUT<<'"'<<buffOUT<<'"'<<';'; 
	
	/*
	//cerco il prossimo comando \scenario
	i=cercaStringa(buffer,length,i,"\\scenario",9);
	if(i==-1)return i; //errore, non trovato
	if(buffer[i]=='A')
	while(buffer[i]!='{')i++;
	i++; //mi sposto al carattere successivo
	
	i+=setScenario(&buffer[i],buffOUT); 												//scenario
	cout<<buffOUT<<endl;
	*OUT<<'"'<<buffOUT<<'"'<<';'; 
	
	while(buffer[i]!='\\')i++; //cerco il prossimo comando
	
	if(buffer[i]=='\\' && buffer[i+1]=='s') //scenarioAlt
	{
		i+=14;
		i+=setText(&buffer[i],buffOUT); 
		cout<<buffOUT<<endl;
		*OUT<<'"'<<buffOUT<<'"'<<';'; 
				
	}else{
		*OUT<<'"'<<' '<<'"'<<';'; 
	}
	
	//poi estensioni
	if(buffer[i]=='\\' && buffer[i+1]=='e') //estensioni
	{
		i+=13;
		i+=setText(&buffer[i],buffOUT); //estensioni
		cout<<buffOUT<<endl;
		*OUT<<'"'<<buffOUT<<'"'<<';'; 
	}else{
		*OUT<<'"'<<' '<<'"'<<';'; 
	}	
		
	//poi inclusioni
	if(buffer[i]=='\\' && buffer[i+1]=='i') //inclusioni
	{
		i+=13;
		i+=setText(&buffer[i],buffOUT); //inclusioni
		cout<<buffOUT<<endl;
		*OUT<<'"'<<buffOUT<<'"'<<';'; 
	}else{
		*OUT<<'"'<<' '<<'"'<<';'; 
	}
	*/
	
	//campi vuoti per scenario, scenarioAlt, inclusioni ed estensioni
	*OUT<<'"'<<' '<<'"'<<';'; 
	*OUT<<'"'<<' '<<'"'<<';'; 
	*OUT<<'"'<<' '<<'"'<<';'; 
	*OUT<<'"'<<' '<<'"'<<';'; 
	
	//cerco il prossimo comando \post
	i=cercaStringa(buffer,length,i,"\\post",5);
	if(i==-1)return i; //errore, non trovato
	while(buffer[i]!='{')i++;
	i++; //mi sposto al carattere successivo
	
	i+=setText(&buffer[i],buffOUT); 																//post
	cout<<buffOUT<<endl;	
	*OUT<<'"'<<buffOUT<<'"'<<';'; 
	
	*OUT<<'"'<<' '<<'"'<<'\n';  //figura 
	
	delete buffOUT; // :)
	return i;
}

void creaRecord(const char * UC, 
				const char * nome, 
				const char * diagrammaAssociato, 
				const char * attori, 
				const char * scopo,
				const char * pre,
				const char * scenario,
				const char * scenarioAlt,
				const char * estensioni,
				const char * inclusioni,
				const char * post,				
				ofstream * OUT)
{
	*OUT<<'"'<<UC<<'"'<<';'; 
	*OUT<<'"'<<nome<<'"'<<';'; 
	*OUT<<'"'<<diagrammaAssociato<<'"'<<';'; 
	*OUT<<'"'<<attori<<'"'<<';'; 
	*OUT<<'"'<<scopo<<'"'<<';';
	*OUT<<'"'<<pre<<'"'<<';';
	*OUT<<'"'<<scenario<<'"'<<';';
	*OUT<<'"'<<scenarioAlt<<'"'<<';';
	*OUT<<'"'<<estensioni<<'"'<<';';
	*OUT<<'"'<<inclusioni<<'"'<<';';
	*OUT<<'"'<<post<<'"'<<';'; 
	*OUT<<'"'<<" "<<'"'<<endl; //immagine     		
}

int main(int argc, char* argv[])
{
	try
	{
		cout<<"|***********************************************|"<<endl;
		cout<<"|                                               |"<<endl;
		cout<<"|           UCscript - Alberto Garbui           |"<<endl;
		cout<<"|                                               |"<<endl;
		cout<<"|  Script per il parsing del file tex dei casi  |"<<endl;
		cout<<"|      d'uso e generazione file di testo da     |"<<endl;
		cout<<"|             importare con Access.			   |"<<endl;
		cout<<"|                                               |"<<endl;
		cout<<"|***********************************************|"<<endl<<endl;
		cout<<"-> apertura files... ";
		ifstream IN("UC1MaaP.tex");
		ifstream IN1("UC2MaaPsWeb.tex");
		ifstream IN2("UC3MaaS.tex");
		ofstream OUT("UCaccess.txt");
		if(!OUT)throw(0);
		if(!IN)throw(1);
		if(!IN1)throw(2);
		if(!IN2)throw(3);
		cout<<"Fatto!"<<endl;
		
		creaRecord("Capitolato"," "," "," "," "," "," "," "," "," "," ",&OUT);
		creaRecord("Interna"," "," "," "," "," "," "," "," "," "," ",&OUT);
		creaRecord("Verbale_2013_12_05"," "," "," "," "," "," "," "," "," "," ",&OUT);
		creaRecord("Verbale_2014_01_20"," "," "," "," "," "," "," "," "," "," ",&OUT);
		creaRecord("Verbale_2014_03_05"," "," "," "," "," "," "," "," "," "," ",&OUT);
		
		cout<<"-> carico UCMaaP... ";
		IN.seekg (0, IN.end);
		int length = IN.tellg();
		IN.seekg (0, IN.beg);
        char * buffer = new char [length];
		IN.read (buffer,length);
		IN.close();
		cout<<"Fatto!"<<endl;
		cout<<"-> inizio ricerca UC... "<<endl;
		int k=0;
		do{
		 k=getUC(buffer,length,k,&OUT);
		}while(k!=-1);
			
		delete buffer;
		cout<<endl<<endl<<"-> carico UCMaaPsWeb... ";
		IN1.seekg (0, IN1.end);
		length = IN1.tellg();
		IN1.seekg (0, IN1.beg);
        buffer = new char [length];
		IN1.read (buffer,length);
		IN1.close();
		cout<<"Fatto!"<<endl;
		cout<<"-> inizio ricerca UC... "<<endl;
		k=0;
		do{
		 k=getUC(buffer,length,k,&OUT);
		}while(k!=-1);
						
		delete buffer;
		cout<<endl<<endl<<"-> carico UCMaaS... ";
		IN2.seekg (0, IN2.end);
		length = IN2.tellg();
		IN2.seekg (0, IN2.beg);
        buffer = new char [length];
		IN2.read (buffer,length);
		IN2.close();
		cout<<"Fatto!"<<endl;
		cout<<"-> inizio ricerca UC... "<<endl;
		k=0;
		do{
		 k=getUC(buffer,length,k,&OUT);
		}while(k!=-1);
			
		//pulisco la memoria
		delete buffer;
	}
	catch(int x)
	{
		switch(x)
		{
			case 0:cout<<"Errore nella scrittura del file di output! "<<endl;break;
			case 1:cout<<"Errore nell'apertura del file casi d'uso MaaP! "<<endl;break;
			case 2:cout<<"Errore nell'apertura del file casi d'uso MaaPsWeb! "<<endl;break;
			case 3:cout<<"Errore nell'apertura del file casi d'uso MaaS! "<<endl;break;			
			default:cout<<"Errore! "<<x<<endl;break;
		}
	}
}//end main