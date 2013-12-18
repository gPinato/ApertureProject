# -*- coding: utf-8 -*- 
import os
import sys

#lista_documenti=["Analisi_dei_requisiti.tex", "refman.tex"]
lista_documenti=["Analisi_dei_requisiti.tex"]

def get_lista_termini():
    inp = open("..\\Glossario\\Glossario.tex")
    testo = []
    for i in inp:
        testo.append(i.strip())
    inp.close()
    #
    lista = []
    for riga in testo:
        if riga.startswith("\\elemento{"):
            lista.append(riga[10:-1])
    print lista
    return lista

def check_valid(stringa, indice, lunghezza):
    prefissi = [" ", "{", "'"]
    suffissi = [" ", ",", ".", ";", ":", "}", "!", "?", "'"]
    pre=False
    suf=False
    if indice == 0 or (stringa[indice-1] in prefissi):
        pre = True
    if len(stringa)<=(indice+lunghezza):
        suf = True
    else:
        if stringa[indice+lunghezza] in suffissi:
           suf = True
    return (pre and suf)

def sottolinea(filename, termini, lista_depennati, esclusi_da_header, ricorsione = False):
    #leggo il file e lo importo
    inp = open(filename, "r")
    testo = []    
    for i in inp:
        testo.append(i.strip())
    inp.close()
    
    start = ricorsione #indica se sono arrivato alla prima \section. Se la chiamata è ricorsiva ci sono già arrivato, no? :D
    token = 0
    ll = len(testo)
    while not start and token <ll: # token conterrà l'indice di inizio
        if testo[token].startswith("\\section{") or testo[token].startswith("\\Inizio{"):
            start=True
        else:
            token+=1

    salta_sezione = False
    for indice in range(token,len(testo)):
        #print "riga " + str(indice) + " ",
        if testo[indice].startswith("\\input{"):
            #ricorsione
            fileric = testo[indice][7:-1]
            if not fileric.endswith(".tex"):
                fileric = fileric+".tex"
            if fileric != "../Logo&Header/header.tex":
                #print "riga: ", indice
                dest_agg=""
                perc_split = filename.split("\\")
                for i in range(0, len(perc_split)):
                    if not perc_split[i].endswith(".tex"):
                        dest_agg += perc_split[i]+"\\"
                print "ricorsione su", (dest_agg+fileric)
                lista_depennati = sottolinea((dest_agg+fileric), termini, lista_depennati, esclusi_da_header, True)
        elif testo[indice].startswith("\\Prodotto{}"):
            lista_depennati = lista_depennati + esclusi_da_header
        elif testo[indice].startswith("\\section{"):
            salta_sezione = False
        elif testo[indice].startswith("\\subsection{Riferimenti}"):
            print "riferimenti"
            salta_sezione = True
        elif not (testo[indice].startswith("%") or testo[indice].startswith("\\newcommand{")) and not salta_sezione and not testo[indice].startswith("\\subsection{") and not testo[indice].startswith("\\subsection{Riferimenti}") and not testo[indice].startswith("\\subsubsection{") and not testo[indice].startswith("\\caption{"):
            for parola in termini:
                # tolgo le sottolineature
                parola_low = parola[0].swapcase() + parola[1:]
                pund_c="\\gloss{"+parola+"}"
                pund_l="\\gloss{"+parola_low+"}"
                if parola in testo[indice]:
                    testo[indice] = testo[indice].replace(pund_c, parola) # tolgo la sottolineatura
                    #print "de-sottolineo %s alla riga %d" % (parola, indice)
                if parola_low in testo[indice]:
                    testo[indice] = testo[indice].replace(pund_l, parola_low)
                    #print "de-sottolineo %s alla riga %d" % (parola_low, indice)
                #ricerca della parola giusta
                done = False
                indice_c = -1 # indice della parola capitalizzata nella stringa
                indice_l = -1 # indice della parola non capitalizzata nella stringa
                i_corr = -1
                p = ""
                offset = 0 # offset di ricerca sulla stringa
                while not done:
                    # cerco la parola nella riga a partire dall'offset
                    indice_c = testo[indice].find(parola, offset)
                    indice_l = testo[indice].find(parola_low, offset)
                    i_corr = -1
                    if indice_c == -1 or indice_l == -1: # non ho trovato una delle due
                        #print " n1 ",
                        if indice_c == indice_l: # non ci sono entrambe
                            #print " skip "
                            done = True
                        elif indice_c>indice_l: # c'è quella capitalizzata
                            #print " n1 cap ",
                            done = check_valid(testo[indice], indice_c, len(parola))
                            if done:
                                i_corr = indice_c
                                # a questo punto posso sottolineare
                                if not parola in lista_depennati:
                                    testo[indice] = testo[indice][:i_corr] + testo[indice][i_corr:].replace(parola, pund_c, 1)
                                    print parola + " sottolineata"
                                    lista_depennati.append(parola)
                            else:
                                offset = indice_c + 1
                        else: # c'è l'altra
                            #print " n1 low ",
                            done = check_valid(testo[indice], indice_l, len(parola))
                            if done:
                                i_corr = indice_l
                                if not parola in lista_depennati:
                                    testo[indice] = testo[indice][:i_corr] + testo[indice][i_corr:].replace(parola_low, pund_l, 1)
                                    print parola + " sottolineata"
                                    lista_depennati.append(parola)
                            else:
                                offset = indice_l + 1
                    else: # ci sono entrambe
                        #print " n2 ",
                        if indice_c>=indice_l: # prendo la non capitalizzata, l'= è perchè potrebbe inizare per carattere speciale
                            #print " low ",
                            done = check_valid(testo[indice], indice_l, len(parola))
                            if done:
                                i_corr = indice_l
                                if not parola in lista_depennati:
                                    testo[indice] = testo[indice][:i_corr] + testo[indice][i_corr:].replace(parola_low, pund_l, 1)
                                    print parola + " sottolineata"
                                    lista_depennati.append(parola)
                            else:
                                offset = indice_l + 1
                        elif indice_l>indice_c: # prendo la capitalizzata
                            #print " cap ",
                            done = check_valid(testo[indice], indice_c, len(parola))
                            if done:
                                i_corr = indice_c
                                if not parola in lista_depennati:
                                    testo[indice] = testo[indice][:i_corr] + testo[indice][i_corr:].replace(parola, pund_c, 1)
                                    print parola + " sottolineata"
                                    lista_depennati.append(parola)
                            else:
                                offset = indice_c + 1
                        else:
                            print "asd"
    outp = open(filename, "w")
    for riga in testo:
        outp.write(riga+"\n")
    outp.close()
    return lista_depennati

def main():
    destinazione = ""
    print "arg 0:", sys.argv[0]
    print "cwd:", os.getcwd()
    try:
        destinazione = sys.argv[1]
        print "arg 1:", destinazione
    except:
        destinazione = ""
    lista_termini_glossario = get_lista_termini()
    if len(destinazione)>0:
        dep = []
        termini_esclusi_header = []
        if destinazione.endswith("refman.tex"):
            termini_esclusi_header = sottolinea("..\\Logo&Header\\header.tex", lista_termini_glossario, [], [], True)
            print "non sto lavorando con la DP"
        else:
            print "sto lavorando con la DP"
        sottolinea(destinazione, lista_termini_glossario, dep, termini_esclusi_header)
    else:
        print "chiamata senza argomenti!"
##        directory = os.getcwd()
##        listpercorso = directory.split("\\")
##        cartella_madre=""
##        for indice in range(0,(len(listpercorso)-1)): #-1 per arrivare a quella sopra
##            cartella_madre += (listpercorso[indice] + "\\")
##        os.chdir(cartella_madre)
##
##        lista_esclusi = ["Glossario", "header", "lettera_presentazione", "Lettera di consegna RP"]
##
##        termini_esclusi_header = sottolinea("Logo&Header\\header.tex", lista_termini_glossario, [], [], True)
##        print termini_esclusi_header
##        
##        for entry in os.listdir(os.getcwd()):
##            print entry
##            try:
##                os.chdir(cartella_madre+"\\"+entry.strip())
##                for entry1 in os.listdir(os.getcwd()):
##                    texfile = entry1.split(".")
##                    if texfile[-1]=="tex":
##                        if not texfile[0] in lista_esclusi:
##                            try:
##                                dep = []
##                                sottolinea(entry1, lista_termini_glossario, dep, termini_esclusi_header)
##                            except:
##                                print sys.exc_info()[0]
##                                print sys.exc_info()[1]
##                                print sys.exc_info()[2]
##                    else:
##                        pass
##            except:
##                pass


main()
