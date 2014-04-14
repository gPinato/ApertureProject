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
using namespace std;

//decommentare per rimuovere le funzionalità di debug...
//#define DBUG

void disclaimer(ofstream * OUT)
{
	*OUT<<"%QUESTE TABELLE SONO STATE GENERATE AUTOMATICAMENTE DALLO SCRIPT TRACCIAMENTOSCRIPT"<<endl<<endl;
}

void intestazioneDescrizioneTestSistema(ofstream * OUT)
{
	*OUT<<"\\begin{center}"<<endl;
	*OUT<<"\\begin{longtable}{|p{2cm}|p{7cm}|p{2cm}|p{2cm}|}"<<endl;
	*OUT<<"\\toprule"<<endl;
	*OUT<<"\\textbf{Test} & \\textbf{Descrizione} & \\textbf{Requisito} & \\textbf{Stato}\\\\"<<endl;
}

void fineDescrizioneTestSistema(ofstream * OUT)
{
	*OUT<<"\\bottomrule"<<endl;
	*OUT<<"\\caption{Test di sistema}"<<endl;
	*OUT<<"\\end{longtable}"<<endl;
	*OUT<<"\\end{center}"<<endl;
}

void intestazioneDescrizioneTestIntegrazione(ofstream * OUT)
{
	*OUT<<"\\begin{center}"<<endl;
	*OUT<<"\\begin{longtable}{|p{5cm}|p{5cm}|p{5cm}|p{1cm}|}"<<endl;
	*OUT<<"\\toprule"<<endl;
	*OUT<<"\\textbf{Test} & \\textbf{Descrizione} & \\textbf{Componente} & \\textbf{Stato}\\\\"<<endl;
}

void fineDescrizioneTestIntegrazione(ofstream * OUT)
{
	*OUT<<"\\bottomrule"<<endl;
	*OUT<<"\\caption{Test d'integrazione}"<<endl;
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
	*OUT<<"\\textbf{Requisiti} & \\textbf{Test}\\\\"<<endl;
}

void fineTracciamentoREQTEST(ofstream * OUT)
{
	*OUT<<"\\bottomrule"<<endl;
	*OUT<<"\\caption{Tracciamento Requisiti - Test di Validazione}"<<endl;
	*OUT<<"\\end{longtable}"<<endl;
	*OUT<<"\\end{center}"<<endl;
}

void intestazioneTracciamentoTESTREQ(ofstream * OUT)
{
	*OUT<<"\\begin{center}"<<endl;
	*OUT<<"\\begin{longtable}{|p{7cm}|p{7cm}|}"<<endl;
	*OUT<<"\\toprule"<<endl;
	*OUT<<"\\textbf{Test} & \\textbf{Requisiti}\\\\"<<endl;
}

void fineTracciamentoTESTREQ(ofstream * OUT)
{
	*OUT<<"\\bottomrule"<<endl;
	*OUT<<"\\caption{Tracciamento Test di Validazione - Requisiti}"<<endl;
	*OUT<<"\\end{longtable}"<<endl;
	*OUT<<"\\end{center}"<<endl;
}

int getElements(const char * buffer, char * primo, char * secondo)
{
	int i,p=0,s=0;
	
	//resetto i buffer di risposta...
	for(i=0;i<20;i++){primo[i]=0;secondo[i]=0;}
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
	char * primo = new char[20];
	char * secondo = new char[20];
	char * precedente = new char[20];
	for(int i=0;i<20;i++)precedente[i]=0;
	
	while(indice<length && index!=-1)
	{
		index=getElements(&buffer[indice],primo,secondo);
		if(index!=-1)indice+=index;		
		if(!checkString(primo,precedente))
		{
			for(int i=0;i<20;i++)precedente[i]=primo[i]; //salvo primo
			startMidrule(primo,OUT);			
		}
		addMidrule(secondo,OUT);			
	}	
	*OUT<<endl;
	delete primo;
	delete secondo;
	delete precedente;
}

//main? :)
int main(int argc, char* argv[])
{
	try
	{
		int risposta;
		bool exit = false;
		do{
			do{
				cout<<endl<<endl;
				cout<<"|***********************************************|"<<endl;
				cout<<"|                                               |"<<endl;
				cout<<"|        TestScript - Alberto Garbui            |"<<endl;
				cout<<"|                                               |"<<endl;
				cout<<"|     Script per generare i file latex del      |"<<endl;
				cout<<"|         per il Piano di Qualifica             |"<<endl;
				cout<<"|   utilizzando i file esportati con Access.    |"<<endl;
				cout<<"|                                               |"<<endl;
				cout<<"|***********************************************|"<<endl<<endl;
				cout<<"Scegli..."<<endl;
				cout<<"  1 - Genera DescrizioneTestSistema.tex (da TestSistema.txt)"<<endl;
				cout<<"  2 - Genera DescrizioneTestIntegrazione.tex (da TestIntegrazione.txt)"<<endl;
				
				cout<<"  3 - Genera TracciamentoCOMPTEST.tex (da TracciamentoCOMPTEST.txt)"<<endl;
				cout<<"  4 - Genera TracciamentoTESTCOMP.tex (da TracciamentoTESTCOMP.txt)"<<endl;
				
				cout<<"  5 - Genera TracciamentoTESTREQ.tex (da TracciamentoTESTREQ.txt)"<<endl;
				cout<<"  6 - Genera TracciamentoREQTEST.tex (da TracciamentoREQTEST.txt)"<<endl;
				
				cout<<"  7 - Esegui tutte le precedenti operazioni"<<endl<<endl;
				cout<<"  0 - Exit"<<endl<<endl;
				cout<<"Comando: ";
				cin>>risposta;
				if(risposta<0 || risposta>7)
					cout<<endl<<"Comando errato! riprova.";
				cout<<endl;
			}while(risposta<0 && risposta>7);
			
			bool doAll = false;
			switch(risposta)
			{
				case 0:	exit=true; break;	//exit
				case 7: doAll=true; //esegue tutte le operazioni
				case 1: //DescrizioneTestSistema.tex
				{
					cout<<"-> carico Casi-Requisiti.txt... ";
					
					if(!doAll)break;
				}
				
				case 2: //DescrizioneTestIntegrazione.tex
				{
				
					if(!doAll)break;
				}
				
				case 3: //DescrizioneTestIntegrazione.tex
				{
				
					if(!doAll)break;
				}
			
				case 4: //DescrizioneTestIntegrazione.tex
				{
				
					if(!doAll)break;
				}
				
				case 5: //DescrizioneTestIntegrazione.tex
				{
				
					if(!doAll)break;
				}
				
				case 6: //DescrizioneTestIntegrazione.tex
				{
				
					if(!doAll)break;
				}
				
				default: //hmmm
				{
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
		
		/*
		
		cout<<"-> apertura files... ";
		ifstream IN("Requisiti-Casi.txt");
		ifstream IN2("Casi-Requisiti.txt");
		ofstream OUT("tracciamentoRequisiti.tex"); 
		if(!OUT)throw(0);
		if(!IN)throw(1);
		if(!IN2)throw(2);
		cout<<"fatto!"<<endl;		
		
		cout<<"-> carico dati Requisiti-Casi.txt... ";
		IN.seekg (0, IN.end);
		int length = IN.tellg();
		IN.seekg (0, IN.beg);
        char * buffer = new char [length];
		IN.read (buffer,length);
		IN.close();
		cout<<"fatto!"<<endl;		
		cout<<"-> creo intestazione tabella Requisiti-Fonti... ";
		disclaimer(&OUT);
		intestazioneTabellaREQFONTI(&OUT);
		cout<<"fatto!"<<endl;		
		cout<<"-> riempio tabella Requisiti-Fonti... ";		
		stampaBuffer(buffer,length,&OUT);		
		cout<<"fatto!"<<endl;
		cout<<"-> termino tabella Requisiti-Fonti... ";
		fineTabella(&OUT);	
		cout<<"fatto!"<<endl;
		delete buffer;
		
		//seconda tabella
		
		cout<<"-> carico Casi-Requisiti.txt... ";
		IN2.seekg (0, IN2.end);
		length = IN2.tellg();
		IN2.seekg (0, IN2.beg);
        char * buffer2 = new char [length];
		IN2.read (buffer2,length);
		IN2.close();
		cout<<"fatto!"<<endl;		
		cout<<"-> creo intestazione tabella Fonti-Requisiti... ";
		intestazioneTabellaFONTIREQ(&OUT);
		cout<<"fatto!"<<endl;		
		cout<<"-> riempio tabella Fonti-Requisiti... ";
		stampaBuffer(buffer2,length,&OUT);
		cout<<"fatto!"<<endl;
		cout<<"-> termino tabella Fonti-Requisiti... ";
		fineTabella(&OUT);	
		disclaimer(&OUT);
		cout<<"fatto!"<<endl;
		delete buffer2;
			*/		
	}
	catch(int x)
	{
		switch(x)
		{
			case 0:cout<<"Errore nella scrittura del file di output tracciamentoRequisiti.tex! "<<endl;break;
			case 1:cout<<"Errore nell'apertura del file Requisiti-Casi.txt! "<<endl;break;
			case 2:cout<<"Errore nell'apertura del file Casi-Requisiti.txt! "<<endl;break;
			default:cout<<"Errore file I/O! "<<x<<endl;break;
		}
	}
}//end main
