<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:e="http://www.progetto.com">
<xsl:output method='html' version='1.0' encoding='UTF-8' indent='yes'
doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN" />

<xsl:template match="/" >
<html xmlns="http://www.w3.org/1999/xhtml"  xml:lang="it" lang="it">

<head>
	<link href="feedback.css" rel="stylesheet" type="text/css" media="all"/>
</head>

<body>
	<dl>
		<h2>Feedback</h2>
		<xsl:for-each select="e:elenco/e:feedback">
		       
                        <xsl:sort select="substring(e:data,7,4)" data-type="number" order="descending"/> <!-- year sort -->
                        <xsl:sort select="substring(e:data,4,2)" data-type="number" order="descending"/> <!-- month sort --> 
                        <xsl:sort select="substring(e:data,1,2)" data-type="number" order="descending"/> <!-- day sort -->
                                 
			<dl><dt><xsl:value-of select="e:account" /></dt>
			<dd><xsl:value-of select="e:data" /></dd>
			<dd><xsl:value-of select="e:contenuto" /></dd></dl>
		</xsl:for-each>  
	</dl>
</body>

</html>
</xsl:template> 
</xsl:stylesheet>
