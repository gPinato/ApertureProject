/*****************************************************\
| TracciamentoScriptST - Alberto Garbui
| v1.0 - 2014/04/14 - prima versione ufficiale
|
| Script per la generazione del tracciamento in file latex
| per il documento Specifica_Tecnica partendo dai 
| file txt esportati con Access.
|
\*****************************************************/
#include<stdio.h>
#include<stdlib.h>
#include<iostream>
#include<fstream>
using namespace std;

//decommentare per rimuovere le funzionalità di debug...
//#define DBUG

#define BUFFERDIM	150

void disclaimer(ofstream * OUT)
{
	*OUT<<"%QUESTE TABELLE SONO STATE GENERATE AUTOMATICAMENTE DALLO SCRIPT TRACCIAMENTOSCRIPTST"<<endl<<endl;
}

void intestazioneTabellaCOMPREQ(ofstream * OUT)
{
	*OUT<<"\\subsection{Tracciamento componenti - requisiti}"<<endl;
	*OUT<<"\\begin{center}"<<endl;
	*OUT<<"\\begin{longtable}{|p{0.8\\linewidth}|c|}"<<endl;
	*OUT<<"\\toprule"<<endl;
	*OUT<<"\\multicolumn{1}{|p{0.8\\linewidth}}{\\textbf{Componente}} & \\multicolumn{1}{|c|}{\\textbf{Requisito}}\\\\"<<endl;
	*OUT<<"\\midrule"<<endl;
	*OUT<<"\\endfirsthead"<<endl;
	*OUT<<"\\multicolumn{2}{l}{\\footnotesize\\itshape\\tablename~\\thetable: continua dalla pagina precedente} \\\\"<<endl;
	*OUT<<"\\toprule"<<endl;
	*OUT<<"\\multicolumn{1}{|p{0.8\\linewidth}}{\\textbf{Componente}} & \\multicolumn{1}{|c|}{\\textbf{Requisito}}\\\\"<<endl;
	*OUT<<"\\midrule"<<endl;
	*OUT<<"\\endhead"<<endl;
	*OUT<<"\\midrule"<<endl;
	*OUT<<"\\multicolumn{2}{r}{\\footnotesize\\itshape\\tablename~\\thetable: continua nella prossima pagina} \\\\"<<endl;
	*OUT<<"\\endfoot"<<endl;
	*OUT<<"\\bottomrule"<<endl;
	*OUT<<"\\caption{Tracciamento componenti - requisiti}"<<endl;
	*OUT<<"\\label{tab:Tracciamento componenti - requisiti}\\\\"<<endl;
	*OUT<<"\\endlastfoot"<<endl;
}

void fineTabella(ofstream * OUT)
{
	*OUT<<"\\end{longtable}"<<endl;
	*OUT<<"\\end{center}"<<endl<<endl;
}

void intestazioneTabellaREQCOMP(ofstream * OUT)
{
	*OUT<<"\\newpage"<<endl;
	*OUT<<"\\subsection{Tracciamento requisiti - componenti}"<<endl;
	*OUT<<"\\begin{center}"<<endl;
	*OUT<<"\\begin{longtable}{|c|p{0.25\\linewidth}|p{0.5\\linewidth}|}"<<endl;
	*OUT<<"\\toprule"<<endl;
	*OUT<<"\\multicolumn{1}{|c|}{\\textbf{Requisito}}"<<endl;
	*OUT<<"& \\multicolumn{1}{|p{0.25\\linewidth}}{\\textbf{Descrizione}}"<<endl;
	*OUT<<"& \\multicolumn{1}{|p{0.5\\linewidth}|}{\\textbf{Componente}}\\\\"<<endl;
	*OUT<<"\\midrule"<<endl;
	*OUT<<"\\endfirsthead"<<endl;
	*OUT<<"\\multicolumn{2}{l}{\\footnotesize\\itshape\\tablename~\\thetable: continua dalla pagina precedente} \\\\"<<endl;
	*OUT<<"\\toprule"<<endl;
	*OUT<<"\\multicolumn{1}{|c|}{\\textbf{Requisito}}"<<endl;
	*OUT<<"& \\multicolumn{1}{|p{0.25\\linewidth}}{\\textbf{Descrizione}}"<<endl;
	*OUT<<"& \\multicolumn{1}{|p{0.5\\linewidth}|}{\\textbf{Componente}}\\\\"<<endl;
	*OUT<<"\\midrule"<<endl;
	*OUT<<"\\endhead"<<endl;
	*OUT<<"\\midrule"<<endl;
	*OUT<<"\\multicolumn{2}{r}{\\footnotesize\\itshape\\tablename~\\thetable: continua nella prossima pagina} \\\\"<<endl;
	*OUT<<"\\endfoot"<<endl;
	*OUT<<"\\bottomrule"<<endl;
	*OUT<<"\\caption{Tracciamento requisiti - componenti}"<<endl;
	*OUT<<"\\label{tab:Tracciamento requisiti - componenti}\\\\"<<endl;
	*OUT<<"\\endlastfoot"<<endl;
}

int getElements(const char * buffer, char * primo, char * secondo)
{
	int i,p=0,s=0;
	bool primaVolta = true;
	
	//resetto i buffer di risposta...
	for(i=0;i<BUFFERDIM;i++){primo[i]=0;secondo[i]=0;}
	i=0;
	
	while(buffer[i]=='"')i++;
	while(buffer[i]!='"')
	{
		if(buffer[i]=='_')primo[p++]='\\'; //disambiguo underscore con la barra
		//aggiungo uno spazio ai componenti con nomi lunghi
		if(primaVolta && p>40 && buffer[i]==':'){primaVolta=false;primo[p++]=' ';}
		primo[p++]=buffer[i++];
	}	
	i+=3;
	primaVolta = true;
	while(buffer[i]!='"')
	{
		if(buffer[i]=='_')secondo[s++]='\\'; //disambiguo underscore con la barra
		//aggiungo uno spazio ai componenti con nomi lunghi
		if(primaVolta && s>40 && buffer[i]==':'){primaVolta=false;secondo[s++]=' ';}
		secondo[s++]=buffer[i++];
	}
	
	#ifdef DBUG
		//cout<<primo<<" "<<secondo<<endl;
	#endif

	if(buffer[i+1]=='\n' && buffer[i+2]=='"')return i+2; //se non trovo un doppio apice ho finito...
	else return -1;
}

int get3Elements(const char * buffer, char * primo, char * secondo, char * terzo)
{
	int i,p=0,s=0,t=0;
	bool primaVolta = true;
	
	//resetto i buffer di risposta...
	for(i=0;i<BUFFERDIM;i++){primo[i]=0;secondo[i]=0;terzo[i]=0;}
	i=0;
	
	while(buffer[i]=='"')i++;
	while(buffer[i]!='"')
	{
		if(buffer[i]=='_')primo[p++]='\\'; //disambiguo underscore con la barra
		//aggiungo uno spazio ai componenti con nomi lunghi
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
		if(primaVolta && t>20 && buffer[i]==':'){primaVolta=false;terzo[t++]=' ';}
		terzo[t++]=buffer[i++];
	}
	
	#ifdef DBUG
		cout<<primo<<" "<<secondo<<" "<<terzo<<endl;
	#endif

	if(buffer[i+1]=='\n' && buffer[i+2]=='"')return i+2; //se non trovo un doppio apice ho finito...
	else return -1;
}

int startMidrule(const char * valore, ofstream * OUT)
{
	*OUT<<endl<<"\\midrule"<<endl;
	*OUT<<valore<<endl;
}

int startMidrule3(const char * valore1,const char * valore2,const char * valore3, ofstream * OUT)
{
	*OUT<<endl<<"\\midrule"<<endl;
	*OUT<<valore1<<endl<<"& "<<valore2<<endl<<"& "<<valore3<<"\\\\"<<endl;
}

int addMidrule(const char * valore, ofstream * OUT)
{
	*OUT<<"& "<<valore<<"\\\\"<<endl;
}

int addMidrule3(const char * valore, ofstream * OUT)
{
	*OUT<<"& & "<<valore<<"\\\\"<<endl;
}

bool checkString(const char * primo, const char * secondo)
{
	int errors=0;
	for(int i=0;i<BUFFERDIM;i++)
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

void stampaBuffer3(const char * buffer, int length, ofstream * OUT)
{
	int index=0,indice=0;
	char * primo = new char[BUFFERDIM];
	char * secondo = new char[BUFFERDIM];
	char * terzo = new char[BUFFERDIM];
	char * precedente = new char[BUFFERDIM];
	for(int i=0;i<BUFFERDIM;i++)precedente[i]=0;
	
	while(indice<length && index!=-1)
	{
		index=get3Elements(&buffer[indice],primo,secondo,terzo);
		if(index!=-1)indice+=index;		
		if(!checkString(primo,precedente))
		{
			for(int i=0;i<BUFFERDIM;i++)precedente[i]=primo[i]; //salvo primo
			startMidrule3(primo,secondo,terzo,OUT);			
		}else{
			addMidrule3(terzo,OUT);
		}
		
	}	
	*OUT<<endl;
	delete primo;
	delete secondo;
	delete terzo;
	delete precedente;
}

//main? :)
int main(int argc, char* argv[])
{
	try
	{
		cout<<"|***********************************************|"<<endl;
		cout<<"|                                               |"<<endl;
		cout<<"|    TracciamentoScriptST - Alberto Garbui      |"<<endl;
		cout<<"|                                               |"<<endl;
		cout<<"|    Script per generare il file latex del      |"<<endl;
		cout<<"| tracciamento componenti-requisiti e viceversa |"<<endl;
		cout<<"|   utilizzando i file esportati con Access.    |"<<endl;
		cout<<"|                                               |"<<endl;
		cout<<"|***********************************************|"<<endl<<endl;
		cout<<"-> apertura files... ";
		ifstream IN("TracciamentoCOMPREQ.txt");
		ifstream IN2("TracciamentoREQCOMP.txt");
		ofstream OUT("Tracciamento.tex"); 
		if(!OUT)throw(0);
		if(!IN)throw(1);
		if(!IN2)throw(2);
		cout<<"fatto!"<<endl;		
		
		cout<<"-> carico dati TracciamentoCOMPREQ.txt... ";
		IN.seekg (0, IN.end);
		int length = IN.tellg();
		IN.seekg (0, IN.beg);
        char * buffer = new char [length];
		IN.read (buffer,length);
		IN.close();
		cout<<"fatto!"<<endl;		
		cout<<"-> creo intestazione tabella Componenti-Requisiti... ";
		disclaimer(&OUT);
		intestazioneTabellaCOMPREQ(&OUT);
		cout<<"fatto!"<<endl;		
		cout<<"-> riempio tabella Componenti-Requisiti... ";		
		stampaBuffer(buffer,length,&OUT);		
		cout<<"fatto!"<<endl;
		cout<<"-> termino tabella Componenti-Requisiti... ";
		fineTabella(&OUT);	
		cout<<"fatto!"<<endl;
		delete buffer;
		
		//seconda tabella
		
		cout<<"-> carico TracciamentoREQCOMP.txt... ";
		IN2.seekg (0, IN2.end);
		length = IN2.tellg();
		IN2.seekg (0, IN2.beg);
        char * buffer2 = new char [length];
		IN2.read (buffer2,length);
		IN2.close();
		cout<<"fatto!"<<endl;		
		cout<<"-> creo intestazione tabella Requisiti-Componenti... ";
		intestazioneTabellaREQCOMP(&OUT);
		cout<<"fatto!"<<endl;		
		cout<<"-> riempio tabella Requisiti-Componenti... ";
		stampaBuffer3(buffer2,length,&OUT);
		cout<<"fatto!"<<endl;
		cout<<"-> termino tabella Requisiti-Componenti... ";
		fineTabella(&OUT);	
		disclaimer(&OUT);
		cout<<"fatto!"<<endl;
		delete buffer2;
					
	}
	catch(int x)
	{
		switch(x)
		{
			case 0:cout<<"Errore nella scrittura del file di output Tracciamento.tex! "<<endl;break;
			case 1:cout<<"Errore nell'apertura del file TracciamentoCOMPREQ.txt! "<<endl;break;
			case 2:cout<<"Errore nell'apertura del file TracciamentoREQCOMP.txt! "<<endl;break;
			default:cout<<"Errore! "<<x<<endl;break;
		}
	}
}//end main
