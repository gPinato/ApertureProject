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
my @months = qw(Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec);
my @days = qw(Sunday Monday Tuesday Wednesday Thursday Friday Saturday);
my $cgi = new CGI;

print $cgi->header;
my @NOD=(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); #number of days, numero giorni dei mesi
my @weekdays=("Dom", "Lun", "Mar", "Mer", "Gio", "Ven","Sab");
my @months=("Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre");
my ($sec, $min, $hr, $day, $m, $year, $wday, $yday, $stime) = localtime(time);
$year=$year+1900;
my $daycounter=0;


utilities::printmenu();

print $cgi->h1("Calendario degli appuntamenti");

print "<table border=2>\n";
 #print $day;
 for(my $row=0;$row<4;$row++) {
    print "\t<tr>\n";

    for(my $cell=0;$cell<7;$cell++) {
    print '<td>';
	print $weekdays[($wday+$cell)%7]." ";
	
		if (($day+$row*7+$cell)>$NOD[$m]){$m++; $day=1;$daycounter=0;}#cambio mese
	print $day+$daycounter." ".$months[$m];
	print "<br/>";
	#print  " da file principale passo ". $m;
	my $occupato =utilities::verify($day+$daycounter, $m+1, $year);
	if ($occupato==0){
	  #GIORNO LIBERO
		print "Inserisci una nota:";
	
	 print $cgi->start_form(
        -name    => 'prenota',
        -method  => 'POST',
        -action  => 'prenota.cgi', 
     );
	 print $cgi->hidden(
         -name      => 'giorno',
	-default   => $day+$daycounter,
     );
	
	 print $cgi->hidden(
         -name      => 'mese',
	-default   => $m+1,
     );
	
	print $cgi->hidden(
         -name      => 'anno',
	-default   => $year,
     );
	 
	print $cgi->textfield(
        -name  => 'nota',
    );
	
	 print $cgi->submit(
         -name     => 'submit_form',
         -value    => 'Prenota!',
         
     );
 print $cgi->end_form;
 }
 
 else{ 
	 #GIORNO OCCUPATO

	 print "Giorno non disponibile";
 
 
 
 }
	
	
	#Caricare skin adatta

	print "</td>\n";
	$daycounter++;
	}

    print "\t</tr>\n";
    
}

print "</table>\n";
print<<ENDO;
<button type="button"><a href="menu.cgi">Torna al menu'</a></button>
	</div>
	
ENDO
print $cgi->end_html; 

}

else {

 my $q = new CGI;

    print $q->header;
    print $q->start_html;
    print $q->h1("Login Failed");
    print $q->end_html;
}

}