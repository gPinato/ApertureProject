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
use Time::Piece;
require utilities;

my $cgi = new CGI;

my $user = $cgi->param('username');
my $pass = $cgi->param('password');
my $digestuser =  sha1_hex($user);
my $digestpass =  sha1_hex($pass);


my $session;
my $cookie;


my $file='user.xml';
my $parser=XML::LibXML->new();
my $doc=$parser->parse_file($file);
my $userok=0; my $passok=0;

my $xpc = 'XML::LibXML::XPathContext'->new;
$xpc->registerNs('xs', 'http://tecnologie-web.studenti.math.unipd.it/tecweb/~gpinato');
$doc->documentElement->setNamespace("http://tecnologie-web.studenti.math.unipd.it/tecweb/~gpinato","xs");


for my $u ($xpc->findnodes('xs:userlist/xs:user', $doc)) {
    
    my ($property) = $xpc->findnodes('xs:username', $u);
    if ($property->textContent eq $digestuser) {
        
        ($property) = $xpc->findnodes('xs:password', $u);
        if ($property->textContent eq $digestpass) {
            $passok = 1;
            $session = new CGI::Session("driver:File", undef, {Directory=>"/tmp"}) or die CGI::Session->errstr;
						$session->param("username", $user);
						$session->expire("+10m");
						if( $user eq "admin"){print $session->header(-location=>'admin.cgi');}
						else {print $session->header(-location=>'menu.cgi');}
        }
        last
    }
}
 
print $cgi->header;
utilities::printmenu();
print<<EOF;

		
		<p>Login Failed, please try again</p>
    </div><!--content-->

</body>
</html>

EOF

print $cgi->end_html;
   



 

