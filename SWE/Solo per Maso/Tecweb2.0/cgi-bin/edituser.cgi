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


my $s = CGI::Session->load() or die CGI::Session->errstr();
    if ( $s->is_expired || $s->is_empty ) {
	 my $q = new CGI;
	print $s->header(-location=>'../riservata.html');
  
	
	
        exit(0);
    }
else{



my $name = $s->param("username");
if ($s->id() ne '' && $name eq 'admin' ){


my $cgi = new CGI;

my $user = $cgi->param('user');
my $pass = $cgi->param('pass');
my $mail = $cgi->param('email');
my $digestuser =  sha1_hex($user);
my $digestpass =  sha1_hex($pass);
my $digestmail =  sha1_hex($mail);



my $file='user.xml';
my $parser=XML::LibXML->new();
my $doc=$parser->parse_file($file);
my $root= $doc->getDocumentElement || die("Radice non recuperata");
my $removed;

for my $u ($doc->findnodes('/userlist/user')) {
	my $property=$u->findnodes('./username')->get_node(1); 
	
			if(($property->textContent()) eq $digestuser){
				my $childnode = $root->removeChild( $u );
				$removed="true";			
				
				}
				}

if ($removed ne "true"){

 print $cgi->header;
print<<EOF;
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
		
		<p>Username not found</p>
		<button type="button"><a href="admin.cgi">Back</a></button>
    </div><!--content-->

</body>
</html>

EOF
print $cgi->end_html; 		


}				
else{
			
my $frammento="<user>
<username>".$digestuser."</username>
<password>".$digestpass."</password>
<email>".$digestmail."</email>
</user>";
my $nodo=$parser->parse_balanced_chunk($frammento)|| die("nodo non creato");
$root->appendChild($nodo);
    		

open(OUT,">$file");
print OUT $doc->toString;
close(OUT);
		
					

  

 print $cgi->header;
print<<EOF;
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
		
		<p>User data changed</p>
		<button type="button"><a href="admin.cgi">Back</a></button>
    </div><!--content-->

</body>
</html>

EOF
print $cgi->end_html; # end of HTML  		
	
exit;
  
  
  }
 }
 }

 

