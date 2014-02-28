#!/usr/bin/perl 
use strict;
use warnings;
use XML::LibXML;
use HTML::Entities;
use CGI;
use CGI::Carp qw(fatalsToBrowser);
use POSIX qw/strftime/;

sub toEnglish{
	my $string=@_[0];
	$string =~ s/è/e'/g;
	$string =~ s/à/a'/g;
	$string =~ s/ò/o'/g;
	$string =~ s/ì/i'/g;
	$string =~ s/ù/u'/g;
	$string =~ s/é/e'/g;
	
	return $string;

	}
	


my $cgi=new CGI;
my $nome=$cgi->param('nome');
my $cognome=$cgi->param('cognome');
my $commento=$cgi->param('commento');

$nome=toEnglish($nome);
$cognome=toEnglish($cognome);
$commento=toEnglish($commento);

$nome=encode_entities($nome);
$cognome=encode_entities($cognome);
$commento=encode_entities($commento);


my $data=strftime("%d-%m-%Y", localtime), "\n";
my $fileDati="../public_html/feedback.xml";



my $parser=XML::LibXML->new();
my $doc=$parser->parse_file($fileDati) || die("Operazione  di parsificazione fallita");
my $root= $doc->getDocumentElement || die("Radice non recuperata");

my $frammento="<feedback>
               <account>".$nome." ".$cognome."</account>
               <data>".$data."</data>
			   <contenuto>".$commento."</contenuto>
				</feedback>";
my $nodo=$parser->parse_balanced_chunk($frammento)|| die("nodo non creato");
$root->appendChild($nodo);
    		

open(OUT, ">$fileDati");
print OUT $doc->toString;
close(OUT);	

print $cgi->header(-location=>'../feedback.html');
