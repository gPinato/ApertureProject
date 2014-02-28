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
    # print $q->header;
    # print $q->start_html;
    # print $q->h1("Session Expired, Log In again");
	# print $q->a( {-href=>"/tecweb/~gpinato/riservata.html"},"Click here to log in again" );
    # print $q->end_html;
	
	
        exit(0);
    }
else{



my $name = $s->param("username");
if ($s->id() ne '' && $name eq 'admin' ){

my $cgi = new CGI;

     print $cgi->header;

utilities::printmenu();
#<div id=content>
#lista appuntamenti 
print<<ENDO;
		<div id="colonna1">
			<h1>Lista appuntamenti richiesti</h1>

ENDO
my $file='appuntamenti.xml';
my $parser=XML::LibXML->new();
my $doc=$parser->parse_file($file);
print "<table border=2>\n";
for my $u ($doc->findnodes('/xs:lista/xs:appuntamento')) {
	print "<tr>";
	my $numero=$u->findnodes('./xs:numero')->get_node(1);
	my $mese=$u->findnodes('./xs:nmese')->get_node(1);
	my $utente=$u->findnodes('./xs:anno')->get_node(1);
	print "<td>";
	print $numero."/".$mese;
	print "</td><td>";
	print $utente;
	print "</td></tr>";}
print "</table>";


print $cgi->end_html; 

}

else {

 my $q = new CGI;

    print $q->header;
    print $q->start_html;
    print $q->h1("Login Failed");
    print $q->end_html;
}

}