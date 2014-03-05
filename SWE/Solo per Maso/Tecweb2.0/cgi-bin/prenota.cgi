#!/usr/bin/perl
use strict;
use warnings;
use FileHandle;
use XML::LibXML;
use HTML::Entities;
use CGI;
use CGI::Carp qw(fatalsToBrowser);
use CGI::Session;  
use CGI::Session ( '-ip_match' );
use Digest::SHA qw( sha1_hex);
require utilities;

my $s = CGI::Session->load() or die CGI::Session->errstr();
    if ( $s->is_expired || $s->is_empty ) {
	 my $q = new CGI;
	print $s->header(-location=>'../riservata.html');
   	
        exit(0);
    }
else{


if ($s->id() ne ''){

my $cgi = new CGI;
my $name = $s->param("username");
my $numero = $cgi->param('giorno');
my $mese = $cgi->param('mese');
my $anno = $cgi->param('anno');

my $occupato =utilities::verify($numero, $mese, $anno);
if ($occupato==0){
my $fileDati="appuntamenti.xml";

my $parser=XML::LibXML->new();
my $doc=$parser->parse_file($fileDati) || die("Operazione  di parsificazione fallita");
my $root= $doc->getDocumentElement || die("Radice non recuperata");

my $frammento="<appuntamento>
               <numero>".$numero."</numero>
               <nmese>".$mese."</nmese>
               
               <anno>".$anno."</anno>
               <utente>".$name."</utente>
               
               </appuntamento>";
my $nodo=$parser->parse_balanced_chunk($frammento)|| die("nodo non creato");
$root->appendChild($nodo);
    		

open(OUT, ">$fileDati");
print OUT $doc->toString;
close(OUT);	

print $cgi->header;
 
utilities::printmenu();
print $cgi->h1("Prenotazione effettuata!");
print<<EOF;
		
		<p>Prenotazione effettuata correttamente!</p>
		<button type="button"><a href="calendar.cgi">Back</a></button>
    </div><!--content-->


EOF
}

else{
print $cgi->h1("Prenotazione non effettuata");
       print<<EOF;
		
		<p>Si e' verificato un errore durante la prenotazione, riprova.</p>
		<button type="button"><a href="calendar.cgi">Back</a></button>
    </div><!--content-->

EOF
               
               }
print $cgi->end_html; 		


}				
	
	
exit;
  
  
  }
 

