#!/usr/bin/perl -w
use strict;
use warnings;
use FileHandle;
use HTML::Entities;
use XML::LibXSLT;
use XML::LibXML;
use CGI;
use CGI::Carp qw(fatalsToBrowser);
use CGI::Session;
use CGI::Session ( '-ip_match' );
require utilities;



my $s;

$s = CGI::Session->load() or die CGI::Session->errstr();
    if ( $s->is_expired || $s->is_empty ) {
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


 

my $parser = XML::LibXML->new();
my $xslt = XML::LibXSLT->new();

  my $source = $parser->parse_file('appuntamenti.xml');
  
  my $style_doc = $parser->parse_file('appuntamenti.xsl');

  my $stylesheet = $xslt->parse_stylesheet($style_doc);

  my $results = $stylesheet->transform($source);
  

  print $stylesheet->output_string($results);

print<<end;
</div><!--colonna1-->
		<div id="colonne2e3">
			<div id="colonna2">				
			<h1>Pannello Ban utente</h1>
end
#print $cgi->h1("Benvenuto, $name");



print $cgi->start_form(
        -name    => 'ban',
        -method  => 'post',
        -action => 'profilechange.cgi',
    );
	
print $cgi->hidden(
         -name      => 'operation',
		 -default   => "ban",
	);
		
print $cgi->textfield(
        -name      => 'ban',
        -size      => 20,
        -maxlength => 30,
    );
    
	
  print $cgi->submit(
        -name     => 'submit_form',
        -value    => 'Conferma Ban',
        
    );
    
print $cgi->end_form;

print<<end;
		</div><!--colonna2-->
			<div id="colonna3">
				<button type="button"><a href="logout.cgi">Logout</a></button>
			</div>
	</div>
</div><!--content-->
end

print $cgi->end_html; 
}


}

