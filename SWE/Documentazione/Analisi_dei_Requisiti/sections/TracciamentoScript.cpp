/*****************************************************\
| TracciamentoScript - Alberto Garbui
| v1.0 - 2014/04/12 - prima stesura incompleta
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
using namespace std;

void disclaimer(ofstream * OUT)
{
	*OUT<<"%QUESTE TABELLE SONO STATE GENERATE AUTOMATICAMENTE DALLO SCRIPT TRACCIAMENTOSCRIPT"<<endl<<endl;
}

void intestazioneTabellaREQFONTI(ofstream * OUT)
{
	*OUT<<"\\subsection{Tracciamento requisiti-fonti}"<<endl;
	*OUT<<"\\begin{longtable}{|c|c|}"<<endl;
	*OUT<<"\\caption{Tracciamento requisiti-fonti}"<<endl;
	*OUT<<"\\label{tab:Tracciamento requisiti-fonti} \\\\"<<endl;
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
	*OUT<<"\\label{tab:Tracciamento fonti-requisiti} \\\\"<<endl;
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

int stampaMidrule(const char * buffer, ofstream * OUT)
{
	int i=0;
	
	return i;
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
		ifstream IN("Tabella_CasiRequisiti_daAccess.txt");
		ifstream IN2("Tabella_CasiRequisiti_daAccess.txt");
		ofstream OUT("tracciamentoRequisiti.tex"); 
		if(!OUT)throw(0);
		if(!IN)throw(1);
		if(!IN2)throw(2);
		cout<<"fatto!"<<endl;		
		
		cout<<"-> carico dati Tabella_CasiRequisiti_daAccess.txt... ";
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
		
		
		
		cout<<"fatto!"<<endl;
		cout<<"-> termino tabella Requisiti-Fonti... ";
		fineTabella(&OUT);	
		cout<<"fatto!"<<endl;
		delete buffer;
		
		//seconda tabella
		
		cout<<"-> carico Tabella_CasiRequisiti_daAccess.txt... ";
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
			case 1:cout<<"Errore nell'apertura del file Tabella_CasiRequisiti_daAccess.txt! "<<endl;break;
			case 2:cout<<"Errore nell'apertura del file Tabella_CasiRequisiti_daAccess.txt! "<<endl;break;
			default:cout<<"Errore! "<<x<<endl;break;
		}
	}
}//end main
