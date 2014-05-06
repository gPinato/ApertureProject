start
  = dsl
dsl
  =Collection
 
 Collection
 =WhiteSpace* "collection" WhiteSpace* RoundOpenPar WhiteSpace* LineTerminatorSequence+ Label DuePunti WhiteSpace* Etichetta WhiteSpace* Virgola WhiteSpace* LineTerminatorSequence+ Name DuePunti WhiteSpace* Etichetta WhiteSpace* Virgola WhiteSpace* LineTerminatorSequence+ Position DuePunti WhiteSpace* Etichetta WhiteSpace* LineTerminatorSequence+ WhiteSpace* RoundClosePar
 
 
 
 
 
 
 
 
column
  =WhiteSpace* string: "column" WhiteSpace* 

 Etichetta
  = digits:[a-z/WhiteSpace? /A-Z]* {
}
  
token
  =digits:[a-zA-Z]* {
return digits.join("");
}

row
  = WhiteSpace* stringa: "row:" WhiteSpace*


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

DuePunti
 = ":"

Freccia
 = "=>"
 /"->"

Trueofalse
 = "true"
 / "false"
 
 RoundOpenPar
 ="("
 
  RoundClosePar
 =")"
 
 Label
 =WhiteSpace* "label"/"Label" WhiteSpace*
 
 Name
 =WhiteSpace* "name"/"Name" WhiteSpace*
 
Position
=WhiteSpace* "position"/"Position" WhiteSpace*