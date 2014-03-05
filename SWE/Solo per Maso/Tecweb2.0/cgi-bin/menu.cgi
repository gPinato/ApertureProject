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

<button type="button"><a href="Main.cgi">My Files</a></button>


</div><!--colonna1-->
		<div id="colonne2e3">
			<div id="colonna2">
				<button type="button"><a href="calendar.cgi">Calendar</a></button>


</div><!--colonna2-->
<div id="colonna3">
	<button type="button"><a href="userpanel.cgi">User Panel</a></button>
ENDO

print $cgi->end_html; 
}
}