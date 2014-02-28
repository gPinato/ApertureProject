#!/usr/bin/perl
use strict;
use warnings;
use FileHandle;
use XML::LibXML;
use HTML::Entities;
use CGI;
use CGI::Carp qw(fatalsToBrowser);
use CGI::Session ( '-ip_match' );
use File::Basename qw(basename);

my $s;

$s = CGI::Session->load() or die CGI::Session->errstr();
  if ($s) {
        $s->delete();
        $s->flush();
        $s = undef;
    }

my $cgi = CGI->new;
#print $cgi->header, 
$cgi->start_html('My first Perl website'),
$cgi->h1('Thank You, have a good day'), 

print $cgi->redirect(-uri=>"../index.html");
$cgi->end_html;