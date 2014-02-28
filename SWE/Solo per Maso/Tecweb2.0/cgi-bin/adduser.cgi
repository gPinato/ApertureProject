#!/usr/bin/perl
use strict;
use warnings;
use XML::LibXML;
use HTML::Entities;
use CGI;
use File::Path qw(make_path remove_tree);
use CGI::Carp qw(fatalsToBrowser);
use Digest::SHA qw(sha1_hex);
use CGI::Session;
use CGI::Session ( '-ip_match' );
binmode STDOUT, ":utf8";
binmode STDERR, ":utf8";
binmode STDIN,  ":utf8";
require utilities;


my $cgi=new CGI;
my $found="false";
# my $user=encode_entities($cgi->param('user'));
# my $pass=encode_entities($cgi->param('pass'));
# my $email=encode_entities($cgi->param('email'));
my $digestuser = sha1_hex($cgi->param('user'));
my $digestpass = sha1_hex($cgi->param('pass'));
my $digestmail = sha1_hex($cgi->param('email'));


my $file='user.xml';
my $parser=XML::LibXML->new();
my $doc=$parser->parse_file($file);

#cerco utente già esistente
my $xpc = 'XML::LibXML::XPathContext'->new;
$xpc->registerNs('xs', 'http://tecnologie-web.studenti.math.unipd.it/tecweb/~gpinato');
$doc->documentElement->setNamespace("http://tecnologie-web.studenti.math.unipd.it/tecweb/~gpinato","xs");


for my $u ($xpc->findnodes('xs:userlist/xs:user', $doc)) {
    
    my ($property) = $xpc->findnodes('xs:username', $u);
    if ($property->textContent eq $digestuser) {
        
        ($property) = $xpc->findnodes('xs:password', $u);
        if ($property->textContent eq $digestpass) {
            $found="true";
        }
        last
    }
}

if ($found eq "true"){	
 print $cgi->header;

 utilities::printmenu();
 print $cgi->h1("Username non disponibile");
#FIX GO BACK
print<<ENDO;
		<div id="colonna1">
			<h1>go back</h1>
		</div>

ENDO
 
 
	print $cgi->end_html;  		
	}			


if( $found ne "true") {

my $fileDati="user.xml";

my $parser=XML::LibXML->new();
my $doc=$parser->parse_file($fileDati) || die("Operazione  di parsificazione fallita");
my $root= $doc->getDocumentElement || die("Radice non recuperata");

my $frammento="<user>
               <username>".$digestuser."</username>
               <password>".$digestpass."</password>
			   <email>".$digestmail."</email>
				</user>";
my $nodo=$parser->parse_balanced_chunk($frammento)|| die("nodo non creato");
$root->appendChild($nodo);
    		

open(OUT, ">$fileDati");
print OUT $doc->toString;
close(OUT);	

make_path('../files/$user/2013/pod0');
make_path('../files/$user/2014/pod0');
print $cgi->header;
utilities::printmenu();

print<<EOF;		
		<p>Registrazione completata! Ora puoi effettuare il login</p>
		<button type="button"><a href="../riservata.html">Vai al login</a></button>
    </div><!--content-->

</body>
</html>

EOF
print $cgi->end_html; 
}
exit;
