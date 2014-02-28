#!/usr/bin/perl
use strict;
use warnings;
use CGI;
use CGI::Carp qw(fatalsToBrowser);
use CGI::Session;
use CGI::Session ( '-ip_match' );

my $s;

$s = CGI::Session->load() or die CGI::Session->errstr();
    if ( $s->is_expired || $s->is_empty ) {
  
  print $s->header(-location=>'../riservata.html');

    }
else{

 if( $s->param("username") eq "admin"){print $s->header(-location=>'admin.cgi');}
 else {  print $s->header(-location=>'menu.cgi');}

}

print $s->header(-location=>'../riservata.html');
#nel caso in cui non ci sia sessione


