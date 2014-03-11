#!/usr/bin/perl -w
use strict;
use warnings;
use FileHandle;
use HTML::Entities;
use XML::LibXSLT;
use XML::LibXML;
use CGI;
use CGI::Carp qw(fatalsToBrowser);

require utilities;



my $cgi = new CGI;

print $cgi->header;

utilities::printmenu();

#lista appuntamenti 


# my $file='appuntamenti.xml';
# my $parser=XML::LibXML->new();
# my $doc=$parser->parse_file($file);
# my $xpc = 'XML::LibXML::XPathContext'->new;
# $xpc->registerNs('xs', 'http://tecnologie-web.studenti.math.unipd.it/tecweb/~gpinato');
# $doc->documentElement->setNamespace("http://tecnologie-web.studenti.math.unipd.it/tecweb/~gpinato","xs");

# print "<table border=2>\n";


# for my $u ($xpc->findnodes('xs:lista/xs:appuntamento', $doc)) {
	# print "<tr>";
	# my ($numero) = $xpc->findnodes('xs:numero', $u);
	# my ($mese) = $xpc->findnodes('xs:nmese', $u);
	# my ($utente) = $xpc->findnodes('xs:utente', $u);
	
	# print "<td>";
	# print $numero->textContent()."/".$mese->textContent();
	# print "</td><td>";
	# print $utente->textContent();
	# print "</td></tr>";
	# }
# print "</table>";	

 

my $parser = XML::LibXML->new();
my $xslt = XML::LibXSLT->new();

  my $source = $parser->parse_file('../public_html/feedback.xml');
  my $style_doc = $parser->parse_file('../public_html/feedback.xsl');

  my $stylesheet = $xslt->parse_stylesheet($style_doc);

  my $results = $stylesheet->transform($source);

  print $stylesheet->output_string($results);


print<<end;
<div id="formcommento">
<form action="addfeed.cgi" method="post">
			    <fieldset>
                <label>Nome:</label><br /><input type="text" title="nome" name="nome" tabindex="1" /><br />
                <label>Cognome:</label><br /><input type="text" title="nome" name="cognome" tabindex="2" /><br />
                <label>Commento:</label><br /><textarea title="nome" name="commento" tabindex="3" rows="10" cols="20"></textarea>
				<button type="submit">Submit!</button>
				</fieldset>
            </form>
		</div>
		</div>
		</body>
		</html>
end

