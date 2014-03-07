#!/usr/bin/perl 
use strict;
use warnings;
use FileHandle;
use HTML::Entities;
use CGI;
use CGI::Carp qw(fatalsToBrowser);
use CGI::Session;
use CGI::Session ( '-ip_match' );


require utilities;


my $s = CGI::Session->load() or die CGI::Session->errstr();
    if ( $s->is_expired || $s->is_empty ) {
	 my $q = new CGI;
	print $s->header(-location=>'../riservata.html');
   	
        exit(0);
    }


else{

if ($s->id() ne ''){
my $name = $s->param("username");

my $cgi = new CGI;

print $cgi->header;

utilities::printmenu();

print $cgi->h1("Benvenuto, $name");

print<<ENDO;
		<div id="colonna1">
		<h1>Cambia Password<h1>
ENDO


print $cgi->start_form(
        -name    => 'passchange',
        -method  => 'post',
        -action => 'profilechange.cgi',
    );
	
print $cgi->hidden(
         -name      => 'operation',
		 -default   => "passchange",
	);
		
print $cgi->password_field(
        -name      => 'pass1',
        -size      => 20,
        -maxlength => 30,
    );
    
print $cgi->password_field(
        -name      => 'pass2',
        -size      => 20,
        -maxlength => 30,
    );
	
  print $cgi->submit(
        -name     => 'submit_form',
        -value    => 'Conferma',
        
    );
    
print $cgi->end_form;

print<<STE;
</div><!--colonna1-->
		<div id="colonne2e3">
			<div id="colonna2">
				<h1>Cambia Email</h1>
STE

print $cgi->start_form(
        -name    => 'mailchange',
        -method  => 'post',
        -action => 'profilechange.cgi',
    );
	
print $cgi->hidden(
         -name      => 'operation',
		 -default   => "mailchange",
	);
print $cgi->textfield(
        -name      => 'mail1',
        -size      => 20,
        -maxlength => 30,
    );
    
print $cgi->textfield(
        -name      => 'mail2',
        -size      => 20,
        -maxlength => 30,
    );
	
print $cgi->submit(
        -name     => 'submit_form',
        -value    => 'Conferma',
        
    );
	
print $cgi->end_form;

print<<END;
</div><!--colonna2-->
<div id="colonna3">
	<h1>Cancella account</h1>
	
END
print $cgi->start_form(
        -name    => 'accountdelete',
        -method  => 'post',
        -action => 'profilechange.cgi',
    );
	
print $cgi->hidden(
         -name      => 'operation',
		 -default   => "delete",
	);
	
print $cgi->password_field(
        -name      => 'pass',
        -size      => 20,
        -maxlength => 30,
    );
	
print $cgi->submit(
        -name     => 'submit_form',
        -value    => 'Conferma',
        
    );
	
print $cgi->end_form;


print<<END;
</div><!--colonna3-->
			
		</div><!--colonne2e3-->
		<button type="button"><a href="menu.cgi">Torna al menu'</a></button>
    </div><!--content-->
	
END

print $cgi->end_html; 
}
}