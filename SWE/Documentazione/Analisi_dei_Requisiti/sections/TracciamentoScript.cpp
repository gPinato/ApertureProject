/*****************************************************\
| TracciamentoScript - Alberto Garbui
| v1.0 - 2014/04/13 - prima versione ufficiale
|
| Script per la generazione del tracciamento in file latex
| per il documento Analisi_dei_Requisiti partendo dai 
| file txt esportati con Access.
|
\*****************************************************/
#include<stdio.h>
#include<stdlib.h>
#include<iostream>
#include<fstream>
#include <ctime>
using namespace std;

//decommentare per rimuovere le funzionalità di debug...
//#define DBUG

void disclaimer(ofstream * OUT)
{
	time_t now = time(0);
	char * dt = ctime(&now);
	char * data = new char[20];
	int i=4;
	for(;i<24;i++)data[i-4]=dt[i];
	data[i-4]=0;
	*OUT<<"%QUESTE TABELLE SONO STATE GENERATE AUTOMATICAMENTE DA TRACCIAMENTOSCRIPT ["<<data<<"]"<<endl<<endl;
}

void intestazioneTabellaREQFONTI(ofstream * OUT)
{
	*OUT<<"\\subsection{Tracciamento requisiti-fonti}"<<endl;
	*OUT<<"\\begin{longtable}{|c|c|}"<<endl;
	*OUT<<"\\caption{Tracciamento requisiti-fonti}"<<endl;
	*OUT<<"\\toprule"<<endl;
	*OUT<<"\\multicolumn{1}{|c}{\\textbf{Requisiti}}"<<endl;
	*OUT<<"& \\multicolumn{1}{|c|}{\\textbf{Fonti}} \\\\"<<endl;
	*OUT<<"\\midrule"<<endl;
	*OUT<<"\\endfirsthead"<<endl;
	*OUT<<"\\multicolumn{2}{l}{\\footnotesize\\itshape\\tablename~\\thetable: continua dalla pagina precedente} \\\\"<<endl;
	*OUT<<"\\toprule"<<endl;
	*OUT<<"\\multicolumn{1}{|c}{\\textbf{Requisiti}}"<<endl;
	*OUT<<"& \\multicolumn{1}{|c|}{\\textbf{Fonti}} \\\\"<<endl;
	*OUT<<"\\midrule"<<endl;
	*OUT<<"\\endhead"<<endl;
	*OUT<<"\\midrule"<<endl;
	*OUT<<"\\multicolumn{2}{r}{\\footnotesize\\itshape\\tablename~\\thetable: continua nella prossima pagina} \\\\"<<endl;
	*OUT<<"\\endfoot"<<endl;
	*OUT<<"\\bottomrule"<<endl;
	*OUT<<"\\multicolumn{2}{r}{\\footnotesize\\itshape\\tablename~\\thetable: si conclude dalla pagina precedente} \\\\"<<endl;
	*OUT<<"\\endlastfoot"<<endl<<endl;
}

void fineTabella(ofstream * OUT)
{
	*OUT<<"\\end{longtable}"<<endl<<endl;
}

void intestazioneTabellaFONTIREQ(ofstream * OUT)
{
	*OUT<<"\\newpage"<<endl;
	*OUT<<"\\subsection{Tracciamento fonti-requisiti}"<<endl;
	*OUT<<"\\begin{longtable}{|c|c|}"<<endl;
	*OUT<<"\\caption{Tracciamento fonti-requisiti}"<<endl;
	*OUT<<"\\toprule"<<endl;
	*OUT<<"\\multicolumn{1}{|c}{\\textbf{Fonte}}"<<endl;
	*OUT<<"& \\multicolumn{1}{|c|}{\\textbf{Requisiti}} \\\\"<<endl;
	*OUT<<"\\midrule"<<endl;
	*OUT<<"\\endfirsthead"<<endl;
	*OUT<<"\\multicolumn{2}{l}{\\footnotesize\\itshape\\tablename~\\thetable: continua dalla pagina precedente} \\\\"<<endl;
	*OUT<<"\\toprule"<<endl;
	*OUT<<"\\multicolumn{1}{|c}{\\textbf{Fonte}}"<<endl;
	*OUT<<"& \\multicolumn{1}{|c|}{\\textbf{Requisiti}} \\\\"<<endl;
	*OUT<<"\\midrule"<<endl;
	*OUT<<"\\endhead"<<endl;
	*OUT<<"\\midrule"<<endl;
	*OUT<<"\\multicolumn{2}{r}{\\footnotesize\\itshape\\tablename~\\thetable: continua nella prossima pagina} \\\\"<<endl;
	*OUT<<"\\endfoot"<<endl;
	*OUT<<"\\bottomrule"<<endl;
	*OUT<<"\\multicolumn{2}{r}{\\footnotesize\\itshape\\tablename~\\thetable: si conclude dalla pagina precedente} \\\\"<<endl;
	*OUT<<"\\endlastfoot"<<endl<<endl;
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
		cout<<"|***********************************************|"<<endl;
		cout<<"|                                               |"<<endl;
		cout<<"|     TracciamentoScript - Alberto Garbui       |"<<endl;
		cout<<"|                                               |"<<endl;
		cout<<"|    Script per generare il file latex del      |"<<endl;
		cout<<"| tracciamento Casi d'uso-requisiti e viceversa |"<<endl;
		cout<<"|   utilizzando i file esportati con Access.    |"<<endl;
		cout<<"|                                               |"<<endl;
		cout<<"|***********************************************|"<<endl<<endl;
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
					
	}
	catch(int x)
	{
		switch(x)
		{
			case 0:cout<<"Errore nella scrittura del file di output tracciamentoRequisiti.tex! "<<endl;break;
			case 1:cout<<"Errore nell'apertura del file Requisiti-Casi.txt! "<<endl;break;
			case 2:cout<<"Errore nell'apertura del file Casi-Requisiti.txt! "<<endl;break;
			default:cout<<"Errore! "<<x<<endl;break;
		}
	}
}//end main
