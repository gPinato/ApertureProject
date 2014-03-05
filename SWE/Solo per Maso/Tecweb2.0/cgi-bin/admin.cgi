#!/usr/bin/perl -w
use strict;
use warnings;
use FileHandle;
use HTML::Entities;
use CGI;
use CGI::Carp qw(fatalsToBrowser);
use CGI::Session;
use CGI::Session ( '-ip_match' );
require utilities;



my $s;

$s = CGI::Session->load() or die CGI::Session->errstr();
    if ( $s->is_expired || $s->is_empty ) {
	 my $q = new CGI;
	print $s->header(-location=>'../riservata.html');


        exit(0);
    }
else{



my $name = $s->param("username");
if ($s->id() ne '' && $name eq 'admin' ){

my $cgi = new CGI;

print $cgi->header;

utilities::printmenu();

#lista appuntamenti 
print<<ENDO;
		<div id="colonna1">
			<h1>Lista appuntamenti richiesti</h1>

ENDO

my $file='appuntamenti.xml';
my $parser=XML::LibXML->new();
my $doc=$parser->parse_file($file);
my $xpc = 'XML::LibXML::XPathContext'->new;
$xpc->registerNs('xs', 'http://tecnologie-web.studenti.math.unipd.it/tecweb/~gpinato');
$doc->documentElement->setNamespace("http://tecnologie-web.studenti.math.unipd.it/tecweb/~gpinato","xs");

print "<table border=2>\n";


for my $u ($xpc->findnodes('xs:lista/xs:appuntamento', $doc)) {
	print "<tr>";
	my ($numero) = $xpc->findnodes('xs:numero', $u);
	my ($mese) = $xpc->findnodes('xs:nmese', $u);
	my ($utente) = $xpc->findnodes('xs:utente', $u);
	
	print "<td>";
	print $numero->textContent()."/".$mese->textContent();
	print "</td><td>";
	print $utente->textContent();
	print "</td></tr>";
	}
print "</table>";	

print $cgi->end_html; 
}


}

