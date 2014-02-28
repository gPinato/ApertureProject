<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
xmlns:ex="http://exslt.org/dates-and-times"   
extension-element-prefixes="ex"
xmlns:e="http://tecnologie-web.studenti.math.unipd.it/tecweb/~gpinato">
<xsl:output method='html' version='1.0' encoding='UTF-8' indent='yes'
doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN" />

<xsl:template match="/" >
<html xmlns="http://www.w3.org/1999/xhtml"  xml:lang="it" lang="it">

<head>
	<link href="appuntamenti.css" rel="stylesheet" type="text/css" media="all"/>
</head>

<body>
	<dl>
		<h2>Appuntamenti</h2>
		<xsl:for-each select="e:lista/e:appuntamento">
			<xsl:sort select="e:anno" data-type="number" order="ascending"/>
			<xsl:sort select="e:nmese" data-type="number" order="ascending"/>
			<xsl:sort select="e:numero" data-type="number" order="ascending"/>
			<xsl:variable name="curdate" select="ex:date-time()" />
			<xsl:variable name="curanno" select='substring($curdate,1,4)'/>
			<xsl:variable name="curmese" select='substring($curdate,6,2)'/>	
			<xsl:variable name="curgiorno" select='substring($curdate,9,2)'/>
			<xsl:choose>
			  <xsl:when test="e:anno &gt; $curanno" >			
				<dl>
				<dt><p><xsl:value-of select="e:giorno"/>, <xsl:value-of select="e:numero"/>
				<span style="padding-left:0.5em"></span><xsl:value-of select="e:mese"/>
				<span style="padding-left:0.5em"></span><xsl:value-of select="e:anno"/>
				</p></dt>
				<dd><span style="font-weight:bold">Utente: </span><xsl:value-of select="e:utente" /></dd>
				<dd><span style="font-weight:bold">Nota: </span><xsl:value-of select="e:nota"/></dd>
				</dl>
			  </xsl:when>
			  <xsl:when test="e:anno = $curanno and e:nmese &gt; $curmese" >
				<dl>
				<dt><p><xsl:value-of select="e:giorno"/>, <xsl:value-of select="e:numero"/>
				<span style="padding-left:0.5em"></span><xsl:value-of select="e:mese"/>
				<span style="padding-left:0.5em"></span><xsl:value-of select="e:anno"/>
				</p></dt>
				<dd><span style="font-weight:bold">Utente: </span><xsl:value-of select="e:utente" /></dd>
				<dd><span style="font-weight:bold">Nota: </span><xsl:value-of select="e:nota"/></dd>
				</dl>
			  </xsl:when>
			  <xsl:when test="e:anno = $curanno and e:nmese = $curmese and e:numero &gt; $curgiorno" >
				<dl>
				<dt><p><xsl:value-of select="e:giorno"/>, <xsl:value-of select="e:numero"/>
				<span style="padding-left:0.5em"></span><xsl:value-of select="e:mese"/>
				<span style="padding-left:0.5em"></span><xsl:value-of select="e:anno"/>
				</p></dt>
				<dd><span style="font-weight:bold">Utente: </span><xsl:value-of select="e:utente" /></dd>
				<dd><span style="font-weight:bold">Nota: </span><xsl:value-of select="e:nota"/></dd>
				</dl>
			  </xsl:when>
			  <xsl:when test="e:anno = $curanno and e:nmese = $curmese and e:numero = $curgiorno" >
				<dl>
				<dt><p><xsl:value-of select="e:giorno"/>, <xsl:value-of select="e:numero"/>
				<span style="padding-left:0.5em"></span><xsl:value-of select="e:mese"/>
				<span style="padding-left:0.5em"></span><xsl:value-of select="e:anno"/>
				</p></dt>
				<dd><span style="font-weight:bold">Utente: </span><xsl:value-of select="e:utente" /></dd>
				<dd><span style="font-weight:bold">Nota: </span><xsl:value-of select="e:nota"/></dd>
				</dl>
			  </xsl:when>
			</xsl:choose>
		</xsl:for-each>  
	</dl>
</body>

</html>
</xsl:template> 
</xsl:stylesheet>
