/*****************************************************\
| TestScript - Alberto Garbui
| v1.0 - 2014/04/14 - prima versione ufficiale
|
| Script per la generazione delle tabelle e tracciamento
| test-componenti-requisiti in latex per il Piano di 
| Qualifica.
|
\*****************************************************/
#include<stdio.h>
#include<stdlib.h>
#include<iostream>
#include<fstream>
#include <conio.h> /* getch() and kbhit() */
#include <ctime>
using namespace std;

//decommentare per rimuovere le funzionalità di debug...
//#define DBUG

//definizioni nomi dei file di input
#define inputTS			"TestSistema.txt"
#define inputTI			"TestIntegrazione.txt"
#define inputCOMPTEST	"TracciamentoCOMPTEST.txt"
#define inputTESTCOMP	"TracciamentoTESTCOMP.txt"
#define inputREQTEST	"TracciamentoREQTEST.txt"
#define inputTESTREQ	"TracciamentoTESTREQ.txt"

//definizioni nomi dei file latex di output
#define fileTS			"DescrizioneTestSistema.tex"
#define	fileTI			"DescrizioneTestIntegrazione.tex"
#define fileCOMPTEST	"TracciamentoCOMPTEST.tex"
#define fileTESTCOMP	"TracciamentoTESTCOMP.tex"
#define fileREQTEST		"TracciamentoREQTEST.tex"
#define fileTESTREQ		"TracciamentoTESTREQ.tex"

//dimensione del buffer di caratteri...
#define BUFFERDIM	500

void disclaimer(ofstream * OUT)
{
	time_t now = time(0);
	char * dt = ctime(&now);
	char * data = new char[20];
	int i=4;
	for(;i<24;i++)data[i-4]=dt[i];
	data[i-4]=0;
	*OUT<<"%QUESTE TABELLE SONO STATE GENERATE AUTOMATICAMENTE DA TESTSCRIPT ["<<data<<"]"<<endl<<endl;
}

void intestazioneDescrizioneTestSistema(ofstream * OUT)
{
	*OUT<<"\\begin{center}"<<endl;
	*OUT<<"\\begin{longtable}{|p{2cm}|p{7cm}|p{2cm}|p{2cm}|}"<<endl;
	*OUT<<"\\toprule"<<endl;
	*OUT<<"\\multicolumn{1}{|p{2cm}}{\\textbf{Test}}"<<endl;
	*OUT<<"& \\multicolumn{1}{|p{7cm}}{\\textbf{Descrizione}}"<<endl;
	*OUT<<"& \\multicolumn{1}{|p{2cm}}{\\textbf{Requisito}}"<<endl;
	*OUT<<"& \\multicolumn{1}{|p{2cm}|}{\\textbf{Stato}}\\\\"<<endl;
	*OUT<<"\\midrule"<<endl;
	*OUT<<"\\endfirsthead"<<endl;
	*OUT<<"\\multicolumn{2}{l}{\\footnotesize\\itshape\\tablename~\\thetable: continua dalla pagina precedente} \\\\"<<endl;
	*OUT<<"\\toprule"<<endl;
	*OUT<<"\\multicolumn{1}{|p{2cm}}{\\textbf{Test}}"<<endl;
	*OUT<<"& \\multicolumn{1}{|p{7cm}}{\\textbf{Descrizione}}"<<endl;
	*OUT<<"& \\multicolumn{1}{|p{2cm}}{\\textbf{Requisito}}"<<endl;
	*OUT<<"& \\multicolumn{1}{|p{2cm}|}{\\textbf{Stato}}\\\\"<<endl;
	*OUT<<"\\midrule"<<endl;
	*OUT<<"\\endhead"<<endl;
	*OUT<<"\\midrule"<<endl;
	*OUT<<"\\multicolumn{2}{r}{\\footnotesize\\itshape\\tablename~\\thetable: continua nella prossima pagina} \\\\"<<endl;
	*OUT<<"\\endfoot"<<endl;
	*OUT<<"\\bottomrule"<<endl;
	*OUT<<"\\caption{Test di sistema}"<<endl;
	*OUT<<"\\endlastfoot"<<endl;
}

void fineDescrizioneTestSistema(ofstream * OUT)
{
	*OUT<<"\\end{longtable}"<<endl;
	*OUT<<"\\end{center}"<<endl;
}

void intestazioneDescrizioneTestIntegrazione(ofstream * OUT)
{
	*OUT<<"\\begin{center}"<<endl;
	*OUT<<"\\begin{longtable}{|p{4.5cm}|p{3cm}|p{5.5cm}|c|}"<<endl;
	*OUT<<"\\toprule"<<endl;
	*OUT<<"\\multicolumn{1}{|p{4.5cm}}{\\textbf{Test}}"<<endl;
	*OUT<<"& \\multicolumn{1}{|p{3cm}}{\\textbf{Descrizione}}"<<endl;
	*OUT<<"& \\multicolumn{1}{|p{5.5cm}}{\\textbf{Componente}}"<<endl;
	*OUT<<"& \\multicolumn{1}{|c|}{\\textbf{Stato}}\\\\"<<endl;
	*OUT<<"\\midrule"<<endl;
	*OUT<<"\\endfirsthead"<<endl;
	*OUT<<"\\multicolumn{2}{l}{\\footnotesize\\itshape\\tablename~\\thetable: continua dalla pagina precedente} \\\\"<<endl;
	*OUT<<"\\toprule"<<endl;
	*OUT<<"\\multicolumn{1}{|p{4.5cm}}{\\textbf{Test}}"<<endl;
	*OUT<<"& \\multicolumn{1}{|p{3cm}}{\\textbf{Descrizione}}"<<endl;
	*OUT<<"& \\multicolumn{1}{|p{5.5cm}}{\\textbf{Componente}}"<<endl;
	*OUT<<"& \\multicolumn{1}{|c|}{\\textbf{Stato}}\\\\"<<endl;
	*OUT<<"\\midrule"<<endl;
	*OUT<<"\\endhead"<<endl;
	*OUT<<"\\midrule"<<endl;
	*OUT<<"\\multicolumn{2}{r}{\\footnotesize\\itshape\\tablename~\\thetable: continua nella prossima pagina} \\\\"<<endl;
	*OUT<<"\\endfoot"<<endl;
	*OUT<<"\\bottomrule"<<endl;
	*OUT<<"\\caption{Test d'integrazione}"<<endl;
	*OUT<<"\\endlastfoot"<<endl;
}

void fineDescrizioneTestIntegrazione(ofstream * OUT)
{
	*OUT<<"\\end{longtable}"<<endl;
	*OUT<<"\\end{center}"<<endl;
}

void intestazioneTracciamentoCOMPTEST(ofstream * OUT)
{
	*OUT<<"\\begin{center}"<<endl;
	*OUT<<"\\begin{longtable}{|p{7cm}|p{7cm}|}"<<endl;
	*OUT<<"\\toprule"<<endl;
	*OUT<<"\\textbf{Componente} & \\textbf{Test}\\\\"<<endl;
}

void fineTracciamentoCOMPTEST(ofstream * OUT)
{
	*OUT<<"\\bottomrule"<<endl;
	*OUT<<"\\caption{Tracciamento componente-test d'integrazione}"<<endl;
	*OUT<<"\\end{longtable}"<<endl;
	*OUT<<"\\end{center}"<<endl;
}

void intestazioneTracciamentoTESTCOMP(ofstream * OUT)
{
	*OUT<<"\\begin{center}"<<endl;
	*OUT<<"\\begin{longtable}{|p{7cm}|p{7cm}|}"<<endl;
	*OUT<<"\\toprule"<<endl;
	*OUT<<"\\textbf{Test} & \\textbf{Componente}\\\\"<<endl;
}

void fineTracciamentoTESTCOMP(ofstream * OUT)
{
	*OUT<<"\\bottomrule"<<endl;
	*OUT<<"\\caption{Tracciamento test d'integrazione-componente}"<<endl;
	*OUT<<"\\end{longtable}"<<endl;
	*OUT<<"\\end{center}"<<endl;
}

void intestazioneTracciamentoREQTEST(ofstream * OUT)
{
	*OUT<<"\\begin{center}"<<endl;
	*OUT<<"\\begin{longtable}{|p{7cm}|p{7cm}|}"<<endl;
	*OUT<<"\\toprule"<<endl;
	*OUT<<"\\multicolumn{1}{|p{7cm}}{\\textbf{Requisiti}}"<<endl;
	*OUT<<"& \\multicolumn{1}{|p{7cm}|}{\\textbf{Test}} \\\\"<<endl;
	*OUT<<"\\midrule"<<endl;
	*OUT<<"\\endfirsthead"<<endl;
	*OUT<<"\\multicolumn{2}{l}{\\footnotesize\\itshape\\tablename~\\thetable: continua dalla pagina precedente} \\\\"<<endl;
	*OUT<<"\\toprule"<<endl;
	*OUT<<"\\multicolumn{1}{|p{7cm}}{\\textbf{Requisiti}}"<<endl;
	*OUT<<"& \\multicolumn{1}{|p{7cm}|}{\\textbf{Test}} \\\\"<<endl;
	*OUT<<"\\midrule"<<endl;
	*OUT<<"\\endhead"<<endl;
	*OUT<<"\\midrule"<<endl;
	*OUT<<"\\multicolumn{2}{r}{\\footnotesize\\itshape\\tablename~\\thetable: continua nella prossima pagina} \\\\"<<endl;
	*OUT<<"\\endfoot"<<endl;
	*OUT<<"\\bottomrule"<<endl;
	*OUT<<"\\caption{Tracciamento Requisiti - Test di validazione}"<<endl;
	*OUT<<"\\endlastfoot"<<endl<<endl;
}

void fineTracciamentoREQTEST(ofstream * OUT)
{
	*OUT<<"\\end{longtable}"<<endl;
	*OUT<<"\\end{center}"<<endl;
}

void intestazioneTracciamentoTESTREQ(ofstream * OUT)
{
	*OUT<<"\\begin{center}"<<endl;
	*OUT<<"\\begin{longtable}{|p{7cm}|p{7cm}|}"<<endl;
	*OUT<<"\\toprule"<<endl;
	*OUT<<"\\multicolumn{1}{|p{7cm}}{\\textbf{Test}}"<<endl;
	*OUT<<"& \\multicolumn{1}{|p{7cm}|}{\\textbf{Requisiti}} \\\\"<<endl;
	*OUT<<"\\midrule"<<endl;
	*OUT<<"\\endfirsthead"<<endl;
	*OUT<<"\\multicolumn{2}{l}{\\footnotesize\\itshape\\tablename~\\thetable: continua dalla pagina precedente} \\\\"<<endl;
	*OUT<<"\\toprule"<<endl;
	*OUT<<"\\multicolumn{1}{|p{7cm}}{\\textbf{Test}}"<<endl;
	*OUT<<"& \\multicolumn{1}{|p{7cm}|}{\\textbf{Requisiti}} \\\\"<<endl;
	*OUT<<"\\midrule"<<endl;
	*OUT<<"\\endhead"<<endl;
	*OUT<<"\\midrule"<<endl;
	*OUT<<"\\multicolumn{2}{r}{\\footnotesize\\itshape\\tablename~\\thetable: continua nella prossima pagina} \\\\"<<endl;
	*OUT<<"\\endfoot"<<endl;
	*OUT<<"\\bottomrule"<<endl;
	*OUT<<"\\caption{Tracciamento Test di validazione - Requisiti}"<<endl;
	*OUT<<"\\endlastfoot"<<endl<<endl;
}

void fineTracciamentoTESTREQ(ofstream * OUT)
{
	*OUT<<"\\end{longtable}"<<endl;
	*OUT<<"\\end{center}"<<endl;
}

int get4Elements(const char * buffer, char * primo, char * secondo, char * terzo, char * quarto)
{
	int i,p=0,s=0,t=0,q=0;
	bool primaVolta = true;
	
	//resetto i buffer di risposta...
	for(i=0;i<BUFFERDIM;i++){primo[i]=0;secondo[i]=0;terzo[i]=0;quarto[i]=0;}
	i=0;
	
	while(buffer[i]=='"')i++;
	while(buffer[i]!='"')
	{
		if(buffer[i]=='_')primo[p++]='\\'; //disambiguo underscore con la barra
		//aggiungo uno spazio ai componenti con nomi lunghi
		if(primaVolta && p>20 && buffer[i]=='.'){primaVolta=false;primo[p++]=' ';}
		if(primaVolta && p>20 && buffer[i]==':'){primaVolta=false;primo[p++]=' ';}
		primo[p++]=buffer[i++];
	}	
	i+=3;
	primaVolta = true;
	while(buffer[i]!='"')
	{
		if(buffer[i]=='_')secondo[s++]='\\'; //disambiguo underscore con la barra
		//aggiungo uno spazio ai componenti con nomi lunghi
		if(primaVolta && s>20 && buffer[i]==':'){primaVolta=false;secondo[s++]=' ';}
		secondo[s++]=buffer[i++];
	}
	i+=3;
	primaVolta = true;
	while(buffer[i]!='"')
	{
		if(buffer[i]=='_')terzo[t++]='\\'; //disambiguo underscore con la barra
		//aggiungo uno spazio ai componenti con nomi lunghi
		if(primaVolta && t>15 && buffer[i]==':'){primaVolta=false;terzo[t++]=' ';}
		terzo[t++]=buffer[i++];
	}
	i+=3;
	primaVolta = true;
	while(buffer[i]!='"')
	{
		if(buffer[i]=='_')quarto[q++]='\\'; //disambiguo underscore con la barra
		//aggiungo uno spazio ai componenti con nomi lunghi
		if(primaVolta && q>20 && buffer[i]==':'){primaVolta=false;quarto[q++]=' ';}
		quarto[q++]=buffer[i++];
	}

	if(buffer[i+1]=='\n' && buffer[i+2]=='"')return i+2; //se non trovo un doppio apice ho finito...
	else return -1;
}

int getElements(const char * buffer, char * primo, char * secondo)
{
	int i,p=0,s=0;
	
	//resetto i buffer di risposta...
	for(i=0;i<BUFFERDIM;i++){primo[i]=0;secondo[i]=0;}
	i=0;
	
	while(buffer[i]=='"')i++;
	while(buffer[i]!='"')
	{
		if(buffer[i]=='_')primo[p++]='\\'; //disambiguo underscore con la barra
		primo[p++]=buffer[i++];
	}	
	i+=3;
	while(buffer[i]!='"')
	{
		if(buffer[i]=='_')secondo[s++]='\\'; //disambiguo underscore con la barra
		secondo[s++]=buffer[i++];
	}
	
	#ifdef DBUG
		cout<<primo<<" "<<secondo<<endl;
	#endif

	if(buffer[i+1]=='\n' && buffer[i+2]=='"')return i+2; //se non trovo un doppio apice ho finito...
	else return -1;
}

int startMidrule(const char * valore, ofstream * OUT)
{
	*OUT<<endl<<"\\midrule"<<endl;
	*OUT<<valore<<endl;
}

int Midrule4(const char * valore1,const char * valore2,const char * valore3,const char * valore4, ofstream * OUT)
{
	*OUT<<endl<<"\\midrule"<<endl;
	*OUT<<valore1<<endl<<"& "<<valore2<<endl<<"& "<<valore3<<endl<<"& "<<valore4<<"\\\\"<<endl<<endl;
}

int addMidrule(const char * valore, ofstream * OUT)
{
	*OUT<<"& "<<valore<<"\\\\"<<endl;
}

bool checkString(const char * primo, const char * secondo)
{
	int errors=0;
	for(int i=0;i<20;i++)
		if(primo[i]!=secondo[i])errors++;
	return errors==0;
}

void stampaBuffer(const char * buffer, int length, ofstream * OUT)
{
	int index=0,indice=0;
	char * primo = new char[BUFFERDIM];
	char * secondo = new char[BUFFERDIM];
	char * precedente = new char[BUFFERDIM];
	for(int i=0;i<BUFFERDIM;i++)precedente[i]=0;
	
	while(indice<length && index!=-1)
	{
		index=getElements(&buffer[indice],primo,secondo);
		if(index!=-1)indice+=index;		
		if(!checkString(primo,precedente))
		{
			for(int i=0;i<BUFFERDIM;i++)precedente[i]=primo[i]; //salvo primo
			startMidrule(primo,OUT);			
		}
		addMidrule(secondo,OUT);			
	}	
	*OUT<<endl;
	delete primo;
	delete secondo;
	delete precedente;
}

void stampaBuffer4(const char * buffer, int length, ofstream * OUT)
{
	int index=0,indice=0;
	char * primo = new char[BUFFERDIM];
	char * secondo = new char[BUFFERDIM];
	char * terzo = new char[BUFFERDIM];
	char * quarto = new char[BUFFERDIM];
	
	while(indice<length && index!=-1)
	{
		index=get4Elements(&buffer[indice],primo,secondo,terzo,quarto);
		if(index!=-1)indice+=index;		
		Midrule4(primo,secondo,terzo,quarto,OUT);			
	}	
	*OUT<<endl;
	delete primo;
	delete secondo;
	delete terzo;
	delete quarto;
}

//main? :)
int main(int argc, char* argv[])
{
	try
	{
		int risposta;
		bool exit = false;
		int length;
		bool doAll;
		do{
			do{
				cout<<endl<<endl;
				cout<<"  |***********************************************|"<<endl;
				cout<<"  |                                               |"<<endl;
				cout<<"  |        TestScript - Alberto Garbui            |"<<endl;
				cout<<"  |                                               |"<<endl;
				cout<<"  |      Script per generare i file latex         |"<<endl;
				cout<<"  |         per il Piano di Qualifica             |"<<endl;
				cout<<"  |   utilizzando i file esportati con Access.    |"<<endl;
				cout<<"  |                                               |"<<endl;
				cout<<"  |***********************************************|"<<endl<<endl;
				cout<<" Scegli..."<<endl;
				cout<<"  1 - Genera "<<fileTS<<" (da "<<inputTS<<")"<<endl; //test sistema
				cout<<"  2 - Genera "<<fileTI<<" (da "<<inputTI<<")"<<endl; //test integrazione
				cout<<"  3 - Genera "<<fileCOMPTEST<<" (da "<<inputCOMPTEST<<")"<<endl; //tracciamento componenti-test
				cout<<"  4 - Genera "<<fileTESTCOMP<<" (da "<<inputTESTCOMP<<")"<<endl; //tracciamento test-componenti
				cout<<"  5 - Genera "<<fileTESTREQ<<" (da "<<inputTESTREQ<<")"<<endl; //tracciamento test-requisiti
				cout<<"  6 - Genera "<<fileREQTEST<<" (da "<<inputREQTEST<<")"<<endl; //tracciamento requisiti-test
				cout<<endl;
				cout<<"  7 - Esegui tutte le precedenti operazioni"<<endl<<endl;
				cout<<"  0 - Exit"<<endl<<endl;
				cout<<" Comando: ";
				cin>>risposta;
				if(risposta<0 || risposta>7)
					cout<<endl<<"Comando errato! riprova.";
				cout<<endl;
			}while(risposta<0 && risposta>7);
			
			doAll = false;
			switch(risposta)
			{
				case 0:	exit=true; break;	//exit
				case 7: doAll=true; //esegue tutte le operazioni
				case 1: //TestSistema
				{
					cout<<"-> apertura files... ";
					ifstream IN(inputTS);
					ofstream OUT(fileTS); 
					if(!OUT)throw(0);
					if(!IN)throw(1);
					cout<<"fatto!"<<endl;					
					cout<<"-> carico dati da "<<inputTS<<"... ";
					IN.seekg (0, IN.end);
					length = IN.tellg();
					IN.seekg (0, IN.beg);
					char * buffer = new char [length];
					IN.read (buffer,length);
					IN.close();
					cout<<"fatto!"<<endl;		
					cout<<"-> creo intestazione tabella TestSistema... ";
					disclaimer(&OUT);
					intestazioneDescrizioneTestSistema(&OUT);
					cout<<"fatto!"<<endl;		
					cout<<"-> riempio tabella TestSistema... ";		
					stampaBuffer4(buffer,length,&OUT);		
					cout<<"fatto!"<<endl;
					cout<<"-> termino tabella TestSistema... ";
					fineDescrizioneTestSistema(&OUT);	
					disclaimer(&OUT);
					cout<<"fatto!"<<endl;
					delete buffer;
					OUT.close();
					if(!doAll)break;
				}
				
				case 2: //TestIntegrazione
				{
					cout<<"-> apertura files... ";
					ifstream IN2(inputTI);
					ofstream OUT2(fileTI); 
					if(!OUT2)throw(2);
					if(!IN2)throw(3);
					cout<<"fatto!"<<endl;					
					cout<<"-> carico dati da "<<inputTS<<"... ";
					IN2.seekg (0, IN2.end);
					length = IN2.tellg();
					IN2.seekg (0, IN2.beg);
					char * buffer = new char [length];
					IN2.read (buffer,length);
					IN2.close();
					cout<<"fatto!"<<endl;		
					cout<<"-> creo intestazione tabella TestIntegrazione... ";
					disclaimer(&OUT2);
					intestazioneDescrizioneTestIntegrazione(&OUT2);
					cout<<"fatto!"<<endl;		
					cout<<"-> riempio tabella TestIntegrazione... ";		
					stampaBuffer4(buffer,length,&OUT2);		
					cout<<"fatto!"<<endl;
					cout<<"-> termino tabella TestIntegrazione... ";
					fineDescrizioneTestIntegrazione(&OUT2);	
					disclaimer(&OUT2);
					cout<<"fatto!"<<endl;
					delete buffer;
					OUT2.close();
					if(!doAll)break;
				}
				
				case 3: //tracciamento componente - test
				{
					cout<<"-> apertura files... ";
					ifstream IN3(inputCOMPTEST);
					ofstream OUT3(fileCOMPTEST); 
					if(!OUT3)throw(4);
					if(!IN3)throw(5);
					cout<<"fatto!"<<endl;					
					cout<<"-> carico dati da "<<inputCOMPTEST<<"... ";
					IN3.seekg (0, IN3.end);
					length = IN3.tellg();
					IN3.seekg (0, IN3.beg);
					char * buffer = new char [length];
					IN3.read (buffer,length);
					IN3.close();
					cout<<"fatto!"<<endl;		
					cout<<"-> creo intestazione tabella tracciamento componenti-test... ";
					disclaimer(&OUT3);
					intestazioneTracciamentoCOMPTEST(&OUT3);
					cout<<"fatto!"<<endl;		
					cout<<"-> riempio tabella tracciamento componenti-test... ";		
					stampaBuffer(buffer,length,&OUT3);		
					cout<<"fatto!"<<endl;
					cout<<"-> termino tabella tracciamento componenti-test... ";
					fineTracciamentoCOMPTEST(&OUT3);	
					disclaimer(&OUT3);
					cout<<"fatto!"<<endl;
					delete buffer;
					OUT3.close();
					if(!doAll)break;
				}
			
				case 4: //tracciamento test - componente
				{
					cout<<"-> apertura files... ";
					ifstream IN4(inputTESTCOMP);
					ofstream OUT4(fileTESTCOMP); 
					if(!OUT4)throw(6);
					if(!IN4)throw(7);
					cout<<"fatto!"<<endl;					
					cout<<"-> carico dati da "<<inputTESTCOMP<<"... ";
					IN4.seekg (0, IN4.end);
					length = IN4.tellg();
					IN4.seekg (0, IN4.beg);
					char * buffer = new char [length];
					IN4.read (buffer,length);
					IN4.close();
					cout<<"fatto!"<<endl;		
					cout<<"-> creo intestazione tabella tracciamento test-componenti... ";
					disclaimer(&OUT4);
					intestazioneTracciamentoTESTCOMP(&OUT4);
					cout<<"fatto!"<<endl;		
					cout<<"-> riempio tabella tracciamento test-componenti... ";		
					stampaBuffer(buffer,length,&OUT4);		
					cout<<"fatto!"<<endl;
					cout<<"-> termino tabella tracciamento test-componenti... ";
					fineTracciamentoTESTCOMP(&OUT4);	
					disclaimer(&OUT4);
					cout<<"fatto!"<<endl;
					delete buffer;
					OUT4.close();
					if(!doAll)break;
				}
				
				case 5: //tracciamento test - requisiti
				{
					cout<<"-> apertura files... ";
					ifstream IN5(inputTESTREQ);
					ofstream OUT5(fileTESTREQ); 
					if(!OUT5)throw(8);
					if(!IN5)throw(9);
					cout<<"fatto!"<<endl;					
					cout<<"-> carico dati da "<<inputTESTREQ<<"... ";
					IN5.seekg (0, IN5.end);
					length = IN5.tellg();
					IN5.seekg (0, IN5.beg);
					char * buffer = new char [length];
					IN5.read (buffer,length);
					IN5.close();
					cout<<"fatto!"<<endl;		
					cout<<"-> creo intestazione tabella tracciamento test-requisiti... ";
					disclaimer(&OUT5);
					intestazioneTracciamentoTESTREQ(&OUT5);
					cout<<"fatto!"<<endl;		
					cout<<"-> riempio tabella tracciamento test-requisiti... ";		
					stampaBuffer(buffer,length,&OUT5);		
					cout<<"fatto!"<<endl;
					cout<<"-> termino tabella tracciamento test-requisiti... ";
					fineTracciamentoTESTREQ(&OUT5);	
					disclaimer(&OUT5);
					cout<<"fatto!"<<endl;
					delete buffer;
					OUT5.close();
					if(!doAll)break;
				}
				
				case 6: //tracciamento requisiti-test
				{
					cout<<"-> apertura files... ";
					ifstream IN6(inputREQTEST);
					ofstream OUT6(fileREQTEST); 
					if(!OUT6)throw(10);
					if(!IN6)throw(11);
					cout<<"fatto!"<<endl;					
					cout<<"-> carico dati da "<<inputREQTEST<<"... ";
					IN6.seekg (0, IN6.end);
					length = IN6.tellg();
					IN6.seekg (0, IN6.beg);
					char * buffer = new char [length];
					IN6.read (buffer,length);
					IN6.close();
					cout<<"fatto!"<<endl;		
					cout<<"-> creo intestazione tabella tracciamento requisiti-test... ";
					disclaimer(&OUT6);
					intestazioneTracciamentoREQTEST(&OUT6);
					cout<<"fatto!"<<endl;		
					cout<<"-> riempio tabella tracciamento requisiti-test... ";		
					stampaBuffer(buffer,length,&OUT6);		
					cout<<"fatto!"<<endl;
					cout<<"-> termino tabella tracciamento requisiti-test... ";
					fineTracciamentoREQTEST(&OUT6);	
					disclaimer(&OUT6);
					cout<<"fatto!"<<endl;
					delete buffer;
					OUT6.close();
					if(!doAll)break;
				}
				
				default: //hmmm
				{
					if(risposta>=0 && risposta<=7)
						cout<<endl<<"SONO STATE ESEGUITE TUTTE LE OPERAZIONI! :)"<<endl<<endl;
				}		
				
			}//end switch
			cout<<endl;
			if(!exit)
			{
				cout<<"Premi un tasto per continuare... ";
				while(!kbhit());
			}
		}while(!exit);
		
	}
	catch(int x)
	{
		switch(x)
		{
			case 0:cout<<"Errore nella scrittura del file di output DescrizioneTestSistema.tex! "<<endl;break;
			case 1:cout<<"Errore nell'apertura del file TestSistema.txt! "<<endl;break;
			//TODO aggiungere tutti i rimanenti casi...
			case 2:cout<<"Errore nell'apertura del file Casi-Requisiti.txt! "<<endl;break;
			default:cout<<"Errore file I/O! "<<x<<endl;break;
		}
	}
}//end main
