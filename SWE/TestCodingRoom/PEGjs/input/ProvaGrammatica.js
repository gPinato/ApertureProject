start
  = dsl
dsl
  =ind c:(indexdo)* doc d:(showdo)* end
ind
  = string:"index do\n" {return "column";}
doc
  = string:"show do\n" {return "row";}
indexdo
  =(" ")*column(" ")*ris:token'\n'
  
column
  =string: "column:" 

token
  =digits:[a-z]+ {
return digits.join("");
}

showdo
  =(" ")*row(" ")*ris:token'\n' {return ris;}

row
  =stringa: "row:"
end
=string: "end"