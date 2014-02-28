#!/usr/bin/perl -wT

use CGI::Carp qw(fatalsToBrowser);
use CGI ':standard';  
use CGI::Session;
use CGI::Session ( '-ip_match' );

my $s;
my $cgi = new CGI;
$s = CGI::Session->load() or die CGI::Session->errstr();



if ($s->id() ne ''){

my $files_location;   

my $ID = $cgi->param('ID'); 
my $name = $s->param("username");
my $year = $cgi->param('year');
my $pod = $cgi->param('pod'); 
$files_location = "../files/$name/$year/$pod";  
 

my @fileholder;

if ($ID eq '') {   

print "Content-type: text/html\n\n";   

print "You must specify a file to download.";   

} 
else {  

  

open(DLFILE, "<$files_location/$ID") || Error('open', 'file');   

# NUMERO UNO  @fileholder = <DLFILE>;   

#NUMERO DUE
while (my $line = <DLFILE>){
push(@fileholder, $line);  }

#NUMERO TRE
# while(!eof DLFILE) {
# my $line = readline DLFILE;
# push(@fileholder1, $line);  }

close (DLFILE) || Error ('close', 'file');   

open (LOG, ">>record.log") || Error('open', 'file'); 
my $now=localtime; 
print LOG "The user $name downloaded ";
print LOG "$ID";
print LOG " at $now";
print LOG "\015\012";

close (LOG);  

print "Content-Type:application/x-download\n";   

print "Content-Disposition:attachment;filename=$ID\n\n";  

print @fileholder  

}
}