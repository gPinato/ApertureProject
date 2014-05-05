start
  = dsl
dsl
  =maapregister coll:token WhiteSpace do LineTerminatorSequence* WhiteSpace* ind WhiteSpace* c:(indexdo)* WhiteSpace* doc WhiteSpace* d:(showdo)* WhiteSpace* end 

maapregister
  =string:"Maap.register" WhiteSpace+

do
  =string:"do" LineTerminatorSequence+

ind
  = string:"index do" LineTerminatorSequence+ {return "column";}
doc
  = string:"show do"LineTerminatorSequence+ {return "row";}
indexdo
  =column  (SingleEscapeCharacter e:etichetta SingleEscapeCharacter WhiteSpace* Virgola)? WhiteSpace* Duepunti? (ris:token)? (Virgola WhiteSpace+ Duepunti sort WhiteSpace* Freccia WhiteSpace* Trueofalse Virgola WhiteSpace* Duepunti sortField WhiteSpace? Freccia WhiteSpace? etichetta)?
LineTerminatorSequence+
  
sort
  =string:"sortable"

 sortField
  =string:"sortable" 
  
column
  =WhiteSpace* string: "column" WhiteSpace* 

 etichetta
  = digits:[a-z WhiteSpace? A-Z]* {
return digits.join("");
}
  
token
  =digits:[a-zA-Z]* {
return digits.join("");
}

showdo
  =/*WhiteSpace *row WhiteSpace *ris:token LineTerminatorSequence+ {return ris;}*/
    row  (SingleEscapeCharacter e:etichetta SingleEscapeCharacter WhiteSpace* Virgola)? WhiteSpace* Duepunti? (ris:token)? 
LineTerminatorSequence+
row
  = WhiteSpace* stringa: "row:" WhiteSpace*
end
=string: "end"

WhiteSpace "whitespace"
  = "\t"
  / "\v"
  / "\f"
  / " "
  / "\u00A0"
  / "\uFEFF"
  / "Zs"

LineTerminatorSequence "end of line"
  = "\n" 
  / "\r\n"
  / "\r"
  / "\u2028"
  / "\u2029"
  
 SingleEscapeCharacter
  = "'"
  / '"'
  / "\\"
  / "b"  { return "\b";   }
  / "f"  { return "\f";   }
  / "n"  { return "\n";   }
  / "r"  { return "\r";   }
  / "t"  { return "\t";   }

Virgola
 = ","

Duepunti
 = ":"

Freccia
 = "=>"
 /"->"

Trueofalse
 = "true"
 / "false"