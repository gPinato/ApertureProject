#!/usr/bin/perl -w

use CGI::Carp qw(fatalsToBrowser);
use CGI ':standard';  
use CGI::Session;
use CGI::Session ( '-ip_match' );
my @fileholder;
my @fileholder1;
open(DLFILE, "<public_html.rar") || Error('open', 'file');
@fileholder = <DLFILE>;
close (DLFILE) || Error ('close', 'file');      

open(DLFILE, "<public_html.rar") || Error('open', 'file');
while(!eof DLFILE) {
my $line = readline DLFILE;

# process $line...
 push(@fileholder1, $line);  }
 
close (DLFILE) || Error ('close', 'file');

if (@fileholder == @fileholder1){print "true";}