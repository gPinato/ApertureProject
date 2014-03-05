package utilities;
use strict;
use warnings;
use XML::LibXML;


sub printmenu {

print<<ENDO;
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"  xml:lang="it" lang="it">
    
   
<head>
   <title>Area riservata - Consulen</title>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"/>
    <meta name="title" content="Area Riservata - Consulen" />
    <meta name="description" content="Area riservata Consulen" />
    <meta name="keywords" content="Consulen, consulenza, energia,Pinato" />
    <meta name="language" content="italian it" />
    <meta name="viewport" content="initial-scale=1.0,width=device-width" />
    <link href="../StileElisa.css" rel="stylesheet" type="text/css" media="screen"/>
    <link href='http://fonts.googleapis.com/css?family=Roboto:400,700,500' rel='stylesheet' type='text/css' />
</head>


<body>
     <div id="header">
     	<img src="../immagini/logo2.png" alt="Consulen energy consulting logo" />
		<ul id="nav">
			<li><a href="../index.html">HOME</li>               
            <li><a href="../servizi.html">SERVIZI</a></li>  
            <li><a href="../news.html">NEWS</a></li>  				
            <li class="corrente"><a href="fork.cgi">AREA RISERVATA</a></li>  	
            <li><a href="../feedback.html">FEEDBACK</a></li>
		</ul>
		<p>Via A.Calore 9/11 Padova 12345<br />Tel 0498930203 Fax 0498930203<br />P.IVA 4387403804640743908</p>
    </div><!--header-->

	<div id="content">
ENDO

}





# for my $u ($xpc->findnodes('xs:userlist/xs:user', $doc)) {
    
    # my ($property) = $xpc->findnodes('xs:username', $u);
    # if ($property->textContent eq $digestuser) {
        
        # ($property) = $xpc->findnodes('xs:password', $u);
        # if ($property->textContent eq $digestpass) {
            # $passok = 1;
            # $session = new CGI::Session("driver:File", undef, {Directory=>"/tmp"}) or die CGI::Session->errstr;
						# $session->param("username", $user);
						# $session->expire("+10m");
						# if( $user eq "admin"){print $session->header(-location=>'admin.cgi');}
						# print $session->header(-location=>'menu.cgi');
        # }
        # last
    # }
# }



sub verify{
my ($day, $month, $year) = @_;

my $file='appuntamenti.xml';
my $parser=XML::LibXML->new();
my $doc=$parser->parse_file($file);
my $xpc = 'XML::LibXML::XPathContext'->new;
$xpc->registerNs('xs', 'http://tecnologie-web.studenti.math.unipd.it/tecweb/~gpinato');
$doc->documentElement->setNamespace("http://tecnologie-web.studenti.math.unipd.it/tecweb/~gpinato","xs");

#print " verifico ".$day." ". $month." ". $year." ";

for my $u ($xpc->findnodes('xs:lista/xs:appuntamento', $doc)) {
my ($numero) = $xpc->findnodes('xs:numero', $u);
	#my $numero=$u->findnodes('./xs:numero')->get_node(1)->textContent();
	my ($mese) = $xpc->findnodes('xs:nmese', $u);
	#my $mese=$u->findnodes('./xs:nmese')->get_node(1)->textContent(); 
    #my $anno=$u->findnodes('./xs:anno')->get_node(1)->textContent();
	my ($anno) = $xpc->findnodes('xs:anno', $u);
	#print " ho fetchato ".$numero->textContent()." ".$mese->textContent()." ".$anno->textContent()." \n";
	if ($numero->textContent()==$day && $mese->textContent()==$month && $anno->textContent()==$year){
	#print " return 1";
	return 1; last;}	
}
#print " return 0";
return 0;

}

return 1;