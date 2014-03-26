# -*- coding: cp1252 -*-
import os
import sys

# caption, 
lista_comandi_ignorati=["}","\\emph{", "\\underline{", "\\textbf{", "\\numref{", "\\item", "\\url{", "\\textit{", "\\texttt{", "\\\\", "\\centerline{", "\\hline", "\\caption{", "\\centering", "\\large", "\\label{", "{", "\\newline", "\\opening", "\\closing", "\\mbox"]
lista_comandi_custom = ["\\NomeGruppo{}", "\\Progetto{}","\\Prop{}", "\\Glossario{}","\LaTeX", "\\textquoteright{", "\\`{a}", "\\`{e}", "\\`{i}", "\\`{o}", "\\`{u}", "\\`{E}", "\\_{}", "\\_", "\\Prodotto"]
lista_testi_custom = ["SevenTech", "3DMob: Grafica 3D su device mobili","Mentis s.r.l.","Al fine di evitare incomprensioni dovute a possibili ambiguità del linguaggio, dei termini e acronimi utilizzati nei documenti, viene allegato il glossario contenuto nel file Glossario_vX.Y.pdf. Saranno in esso definiti e descritti tutti i termini marcati da una sottolineatura nella documentazione fornita.","LaTex","'", "à", "è", "ì", "ò", "ù", "È", "_", "_", "Il prodotto denominato 3DMob ha lo scopo di fornire un \underline{applicativo} in grado di leggere e \underline{convertire} \underline{oggetti 3D} a partire dai \underline{formati} \underline{3DS} o \underline{OBJ} e relativo file \underline{MTL}, in un formato aderente allo standard \underline{JSON} compatibile con i \underline{device mobili}. Esso intende garantire che gli oggetti esportati siano immediatamente utilizzabili dalle \underline{librerie} \underline{OpenGL ES}."]

def getCommand(stringa, start):
    if stringa[start:].startswith("\\"):
        graffa=False
        spazio=False
        indice = start
        done=False
        item=False
        while indice < len(stringa) and not done:
            if stringa[indice] == "{":
                done=True
                graffa=True
            elif stringa[indice]==" ":
                done=True
                spazio=True
            elif stringa[indice]=="[":
                done=True
                spazio=False
            else:
                indice+=1
        if indice == len(stringa)-1:
            spazio=True
        comando = stringa[start+1:indice]
        return [comando,graffa,spazio]
    else:
        return ["",False,False]
   

def calcola_indice(lista_righe_latex, nome_file, log):
    tot_lettere=0
    tot_parole=0
    tot_frasi = 0
    
    token = 0
    start=False #indica se sono arrivato alla prima \section
    ll = len(lista_righe_latex)
    while not start and token <ll:
        if lista_righe_latex[token].startswith("\\section{") or lista_righe_latex[token].startswith("\\Inizio{"):
            start=True
            lista_righe_latex=lista_righe_latex[token:]
        else:
            token+=1
    ll = len(lista_righe_latex)
    token=0
    while token < ll:
        result=getCommand(lista_righe_latex[token],0)
        rimosso = False
        if result[0]!="":
            if result[0] == "section" or result[0] == "subsection" or result[0] == "subsubsection" or result[0] == "subsubsubsection" or result[0] == "subsubsubsubsection" or result[0] == "subsubsubsubsubsection" or result[0] == "subsubsection" or result[0] == "label" or result[0] == "newpage" or result[0] == "begin" or result[0] == "end" or result[0] == "vspace" or result[0] =="setlength" or result[0] =="includegraphics" or result[0] =="posizCellaRiga" or result[0] =="Lettera"or result[0] =="Inizio" or result[0] =="Riga" or result[0] =="Termine" or result[0]=="input" or result[0]=="ref" or result[0]=="center" or result[0]=="appendix":
                if result[0]=="begin" and (lista_righe_latex[token].startswith("\\begin{table}") or lista_righe_latex[token].startswith("\\begin{longtable}")):
                    table_end = token
                    while not (lista_righe_latex[token].startswith("\\end{table}") or lista_righe_latex[token].startswith("\\end{longtable}")):
                        lista_righe_latex[token]=""
                        token+=1
                    lista_righe_latex[token]=""
                elif result[0]=="input": # scendo ricorsivamente
                    inp_ric = ""
                    if lista_righe_latex[token][7:-1].endswith(".tex"):
                        inp_ric=open(lista_righe_latex[token][7:-1],"r")
                    else:
                        inp_ric=open((lista_righe_latex[token][7:-1]+".tex"),"r")
                    text_ric=[]
                    for el_ric in inp_ric:
                        text_ric.append(el_ric.strip())
                    inp_ric.close()
                    # print "ricorsione su ", lista_righe_latex[token][7:-1]
                    dati_ric = calcola_indice(text_ric, lista_righe_latex[token][7:-1], log)
                    # print dati_ric
                    tot_lettere += dati_ric[1]
                    tot_parole += dati_ric[2]
                    tot_frasi += dati_ric[3]
                    lista_righe_latex[token]=""
                else:
                    lista_righe_latex[token]=""
                rimosso = True
            elif result[0] == "item":
                if lista_righe_latex[token][-1] == ":":
                    lista_righe_latex[token]=lista_righe_latex[token][:-1]+"."
                else:
                    lista_righe_latex[token]=lista_righe_latex[token]+"."
        if not rimosso and lista_righe_latex[token]!= "": #ho una riga di contenuto
            ic = 0
            for ic in range(0,len(lista_testi_custom)): # sostituzioni
                lista_righe_latex[token]=lista_righe_latex[token].replace(lista_comandi_custom[ic], lista_testi_custom[ic])
            ic=0
            for ic in range(0,len(lista_comandi_ignorati)): #eliminazioni comandi
                lista_righe_latex[token]=lista_righe_latex[token].replace(lista_comandi_ignorati[ic], "")
            commento = lista_righe_latex[token].find("%")
            if commento>-1: #eliminazioni commenti
                lista_righe_latex[token]=lista_righe_latex[token][:commento]
            lista_righe_latex[token]=lista_righe_latex[token].strip()
            if  lista_righe_latex[token] != "" and lista_righe_latex[token][-1] != ".":
                if lista_righe_latex[token][-1] == ":":
                    lista_righe_latex[token]=lista_righe_latex[token][:-1]+"."
                else:
                    lista_righe_latex[token]=lista_righe_latex[token]+"."
            # indice
            if  lista_righe_latex[token] != "":
                incr_parole=len(lista_righe_latex[token].split(" "))
                tot_parole+=incr_parole
                tot_lettere+=len(lista_righe_latex[token])-incr_parole+1
                tot_frasi+=len(lista_righe_latex[token].split(". "))
        token+=1
    if log:
        outp = open((nome_file+".txt"), "w")
        for parola in lista_righe_latex:
            if parola != "":
                outp.write(parola+"\n")
        outp.close()
##    print "lettere:",
##    print tot_lettere
##    print "parole:",
##    print tot_parole
##    print "frasi:",
##    print tot_frasi
    if tot_parole!=0:
        Lp=(100*tot_lettere)/tot_parole
        Fr=(100*tot_frasi)/tot_parole
##        print "Lp:",
##        print Lp
##        print "Fr:",
##        print Fr
    else: # file senza testo utile, faccio uscire 100 e tanti saluti
        Fr=4
        Lp=10
    return [(89-(Lp/10)+(3*Fr)), tot_lettere, tot_parole, tot_frasi]
        

def main():
    cartella_start=os.getcwd()
    outp = open("results.txt", "w")
    outp.close()
    listpercorso = cartella_start.split("\\")
    cartella_madre=""
    for indice in range(0,(len(listpercorso)-1)): #-1 per arrivare a quella sopra
        cartella_madre += (listpercorso[indice] + "\\")
    os.chdir(cartella_madre)
    asd = raw_input("Loggare il testo risultante? (s/n)")
    log=False
    if asd=="s":
        log=True
    elif asd!="n":
        print "lo prendo come un no"
    outp
    for entry in os.listdir(os.getcwd()):
        print entry
        try:
            os.chdir(cartella_madre+"\\"+entry.strip())
            for entry1 in os.listdir(os.getcwd()):
                texfile = entry1.split(".")
                if texfile[-1]=="tex":
                    inp=open(entry1,"r")
                    text=[]
                    for el in inp:
                        text.append(el.strip())
                    inp.close()
                    try:
                        indice = calcola_indice(text, entry1, log)
                        print entry1 + ": ",
                        print indice[0]
                        outp = open(cartella_start+"\\results.txt", "a")
                        outp.write(entry1 + ": "+str(indice[0])+"\n")
                        outp.close()
                    except:
                        print sys.exc_info()[0]
                        print sys.exc_info()[1]
                        print sys.exc_info()[2]
                else:
                    if entry1 == "latex":
                        print "DP"
                        os.chdir("latex")
                        inp=open("refman.tex","r")
                        text=[]
                        for el in inp:
                            text.append(el.strip())
                        inp.close()
                        indice = calcola_indice(text, entry1, log)
                        print entry1 + ": ",
                        print indice[0]
                        outp = open(cartella_start+"\\results.txt", "a")
                        os.chdir("../")
                    pass
                    #print entry1 + " non è un file tex" 
        except:
            pass
            #print entry + " non è una cartella"

    asd=raw_input("\nI risultati sono stati salvati in 'results.txt'\n\npremere invio per chiudere...")
        
main()
