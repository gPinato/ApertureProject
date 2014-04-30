
start
  = dsl
dsl
  =ind c:(indexdo)* doc d:(showdo)* end
ind
  = string:"index do" LineTerminatorSequence+ {return "column";}
doc
  = string:"show do"LineTerminatorSequence+ {return "row";}
indexdo
  =column e:etichetta ris:token LineTerminatorSequence+
  
column
  =WhiteSpace* string: "column:" WhiteSpace*

 etichetta
  = digits:[a-z]* {
return digits.join("");
}
  
token
  =digits:[a-z]* {
return digits.join("");
}

showdo
  =WhiteSpace *row WhiteSpace *ris:token LineTerminatorSequence+ {return ris;}

row
  =stringa: "row:"
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