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
	print $s->header(-location=>'../riservata.html');
	exit(0);
    }
else{

if ($s->id() ne '' ){

my $errore="void";
my $name = $s->param("username");
my $cgi = new CGI;

my $operation = $cgi->param('operation'); #tipo di operazione
my $pass = $cgi->param('pass'); #delete
my $pass1 = $cgi->param('pass1'); #cambio password
my $pass2 = $cgi->param('pass2');
my $mail1 = $cgi->param('mail1'); #cambio mail
my $mail2 = $cgi->param('mail2');
my $userban = $cgi->param('ban');#ban utente

my $digestuser = sha1_hex($name);

my $file='user.xml';
my $parser=XML::LibXML->new();
my $doc=$parser->parse_file($file);
my $root= $doc->getDocumentElement || die("Radice non recuperata");
my $xpc = 'XML::LibXML::XPathContext'->new;
$xpc->registerNs('xs', 'http://tecnologie-web.studenti.math.unipd.it/tecweb/~gpinato');
$doc->documentElement->setNamespace("http://tecnologie-web.studenti.math.unipd.it/tecweb/~gpinato","xs");

if ($operation eq "passchange"){
	if($pass1 eq $pass2){
	
	my $tempmail;
	my $digestpass = sha1_hex($pass1);
	my $u;
		for $u ($xpc->findnodes('xs:userlist/xs:user', $doc)) {
			
			my ($property) = $xpc->findnodes('xs:username', $u);
				if ($property->textContent eq $digestuser) {
					
					($property) = $xpc->findnodes('xs:email', $u);
					$tempmail = $property->textContent;
					my $childnode = $root->removeChild($u);
					last
				}
		}
		
		
		
		my $frammento="<user>
               <username>".$digestuser."</username>
               <password>".$digestpass."</password>
			   <email>".$tempmail."</email>
				</user>";
		my $nodo=$parser->parse_balanced_chunk($frammento)|| die("nodo non creato");
		$root->appendChild($nodo);
    		

		open(OUT, ">$file");
		print OUT $doc->toString;
		close(OUT);
		
	
	}
	else {$errore="Le password inserite non coincidono"}
}
#fine passchange

if ($operation eq "mailchange") {
	if($mail1 eq $mail2){
	
	my $temppass;
	my $digestmail = sha1_hex($mail1);
	my $u; 
		for $u ($xpc->findnodes('xs:userlist/xs:user', $doc)) {
			
			my ($property) = $xpc->findnodes('xs:username', $u);
				if ($property->textContent eq $digestuser) {
					
					($property) = $xpc->findnodes('xs:password', $u);
					$temppass = $property->textContent;
					my $childnode = $root->removeChild($u);
					last
				}
		}
		
		
		
		my $frammento="<user>
               <username>".$digestuser."</username>
               <password>".$temppass."</password>
			   <email>".$digestmail."</email>
				</user>";
		my $nodo=$parser->parse_balanced_chunk($frammento)|| die("nodo non creato");
		
		$root->appendChild($nodo);
    		

		open(OUT, ">$file");
		print OUT $doc->toString;
		close(OUT);
		
	
	}
	else {$errore="Le email inserite non coincidono"}
}
#fine mailchange
if ($operation eq "delete"){

	my $digestpass = sha1_hex($pass);
	my $found="false";
	my $u;
	for  $u ($xpc->findnodes('xs:userlist/xs:user', $doc)) {
    
    my ($property) = $xpc->findnodes('xs:username', $u);
		if ($property->textContent eq $digestuser) {
			
			($property) = $xpc->findnodes('xs:password', $u);
			if ($property->textContent eq $digestpass) {
				$found="true";
				my $childnode = $root->removeChild($u);
			}
			last
		}
	}
	open(OUT, ">$file");
	print OUT $doc->toString;
	close(OUT);

	if($found eq "true"){
		
		print $s->header(-location=>'logout.cgi');
		}
	else {$errore="Le password inserita non coincide"}
}
#fine delete

if ($operation eq "ban" && $name eq 'admin' ){
	
	my $toban =  sha1_hex($userban);
	my $found="false";
	my $u;
		
		for $u ($xpc->findnodes('xs:userlist/xs:user', $doc)) {
			
			my ($property) = $xpc->findnodes('xs:username', $u);
				if ($property->textContent eq $toban) {
					
					$found="true";
					my $childnode = $root->removeChild($u);
					last
				}
		}
		
		
	if($found eq "true"){	
		my $frammento="<user>
               <username>".$toban."</username>
               <password>utentebannato</password>
			   <email>utentebannato</email>
				</user>";
		my $nodo=$parser->parse_balanced_chunk($frammento)|| die("nodo non creato");
		$root->appendChild($nodo);
    		

		open(OUT, ">$file");
		print OUT $doc->toString;
		close(OUT);
		}
	else {$errore="Utente non trovato!"}
}
#fine ban utente

 print $cgi->header;

utilities::printmenu();

if ($errore eq "void"){
	print $cgi->h1("Operazione eseguita correttamente");
	}
else {
	print $cgi->h1("Operazione non eseguita ");
	print $cgi->p("$errore");
	}

if ($name eq 'admin' ){
	print<<EOF
<button type="button"><a href="admin.cgi">Ritorna alla pagina admin</a></button>

</div>
EOF
	}
else {
	print<<EOF
<button type="button"><a href="userpanel.cgi">Ritorna al pannello utente</a></button>

</div>
EOF
	}

print $cgi->end_html; 
}				
}
exit;
 

