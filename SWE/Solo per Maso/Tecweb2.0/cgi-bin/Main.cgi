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
my $text;
my @files;
my @values;
my @pods;
my $temptext;
my $lenght;
my $count;
my %hash;
my $year;
my $pod;
my $cgi = new CGI;

print $cgi->header;

utilities::printmenu();

#print $cgi->h1("Benvenuto, $name");

print<<ENDO;
		<div id="colonna1">
			<h1>Seleziona Anno</h1>

ENDO


print $cgi->start_form(
        -name    => 'asd',
        -method  => 'POST',
        -action => 'Main.cgi',

    );
   @values= ('2012', '2013', '2014');
   print $cgi->popup_menu(
        -name    => 'asd',
        -values  => \@values,
		-onchange => 'javascript: this.form.submit()',
        
    );
	
print $cgi->end_form;

print<<STE;
</div><!--colonna1-->
		<div id="colonne2e3">
			<div id="colonna2">
				<h1> Seleziona POD</h1>
STE

$year = $cgi->param('asd');
if ($year eq '') {$year="2012";}
my $dir1 = "../files/$name/$year/";


opendir(DIR, $dir1);
@pods = sort(grep(!/^(\.|\.\.)$/, readdir(DIR)));
closedir(DIR);
unshift @pods,'';


print $cgi->start_form(
        -name    => 'pod',
        -method  => 'POST',
        -action => 'Main.cgi',

    );
	print $cgi->hidden(
        -name      => 'asd',
		-default   => $year,
    );

   print $cgi->popup_menu(
        -name    => 'pod',
        -values  => \@pods,
		-onchange => 'javascript: this.form.submit()',
        
    );
	
print $cgi->end_form;

$pod = $cgi->param('pod');
my $dir = "../files/$name/$year/$pod/";


print<<END;
</div><!--colonna2-->
<div id="colonna3">
	<h1>Tabella File</h1>
END





if ($pod ne ''){
opendir(DIR, $dir);
#controllare exp regolare del grep
@files = sort(grep(!/^(\.|\.\.)$/ && !/^\./, readdir(DIR)));
closedir(DIR);
$lenght=@files;

print "<table border=2>\n";

 for(my $row=0;$row<$lenght;$row++) {
    print "\t<tr>\n";

   
	$text=$files[$row];
	print '<td>';
		print $files[$row];
	print '</td>';
	print '<td>';
		
		print $cgi->start_form(
        -name    => 'ID',
        -method  => 'POST',
        -action => 'download.cgi', 
    );
	
	print $cgi->hidden(
        -name      => 'year',
		-default   => $year,
    );
	print $cgi->hidden(
        -name      => 'pod',
		-default   => $pod,
    );

    print $cgi->hidden(
        -name      => 'ID',
		-default   => $text,
    );
	 print $cgi->submit(
        -name     => 'submit_form',
        -value    => 'Download',
        -onsubmit => 'javascript: validate_form()',
    );
print $cgi->end_form;
		print '</td>';
    

    print "\t</tr>\n";
}

print "</table>\n";
}
print<<END;
<button type="button"><a href="menu.cgi">Torna al menu'</a></button>
			</div><!--colonna3-->
			
		</div><!--colonne2e3-->
    </div><!--content-->
END

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