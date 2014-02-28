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



my $name = $s->param("username");
if ($s->id() ne ''){


my $cgi = new CGI;

my $user = $cgi->param('user');

my $digestuser =  sha1_hex($user);



my $file='user.xml';
my $parser=XML::LibXML->new();
my $doc=$parser->parse_file($file);
my $root= $doc->getDocumentElement || die("Radice non recuperata");
my $xpc = 'XML::LibXML::XPathContext'->new;
$xpc->registerNs('xs', 'http://tecnologie-web.studenti.math.unipd.it/tecweb/~gpinato');
$doc->documentElement->setNamespace("http://tecnologie-web.studenti.math.unipd.it/tecweb/~gpinato","xs");

my $removed;

for my $u ($xpc->findnodes('xs:userlist/xs:user', $doc)) {
    
    my ($property) = $xpc->findnodes('xs:username', $u);
    if ($property->textContent eq $digestuser) {
				my $childnode = $root->removeChild( $u );#CONTROLLARE
				$removed="true";			
				
				}
				}

if ($removed ne "true"){

print $cgi->header;
utilities::printmenu();
#DA SISTEMARE REDIRECT
PRINT<<EOF
		
		<p>Errore, utente non cancellato. Riprovare piu' tardi.</p>
		<button type="button"><a href="userpanel.cgi">Back</a></button>
    </div><!--content-->

</body>
</html>

EOF

print $cgi->end_html; 		
exit;

}
		
else{
	

  
print $s->header(-location=>'../index.html');		
	
exit;
  
  
 }
 }
 }

 

