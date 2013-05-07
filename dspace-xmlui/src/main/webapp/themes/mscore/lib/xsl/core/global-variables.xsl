<!--

    The contents of this file are subject to the license and copyright
    detailed in the LICENSE and NOTICE files at the root of the source
    tree and available online at

    http://www.dspace.org/license/

-->
<!--
    Global variables accessible from other templates

    Author: art.lowel at atmire.com
    Author: lieven.droogmans at atmire.com
    Author: ben at atmire.com
    Author: Alexey Maslov

-->

<xsl:stylesheet xmlns:i18n="http://apache.org/cocoon/i18n/2.1"
	xmlns:dri="http://di.tamu.edu/DRI/1.0/"
	xmlns:mets="http://www.loc.gov/METS/"
	xmlns:xlink="http://www.w3.org/TR/xlink/"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0"
	xmlns:dim="http://www.dspace.org/xmlns/dspace/dim"
	xmlns:xhtml="http://www.w3.org/1999/xhtml"
	xmlns:mods="http://www.loc.gov/mods/v3"
	xmlns:dc="http://purl.org/dc/elements/1.1/"
	xmlns="http://www.w3.org/1999/xhtml"
    xmlns:confman="org.dspace.core.ConfigurationManager"
	exclude-result-prefixes="i18n dri mets xlink xsl dim xhtml mods dc confman">

    <xsl:output indent="yes"/>

    <!--the max thumbnail height & width from dspace.cfg, needed for item view and item list pages-->
    <xsl:variable name="thumbnail.maxheight" select="confman:getIntProperty('thumbnail.maxheight', 80)"/>
    <xsl:variable name="thumbnail.maxwidth" select="confman:getIntProperty('thumbnail.maxwidth', 80)"/>
    <!-- item details url -->
    <xsl:variable name="ds_item_view_toggle_url" select="//dri:p[contains(@rend , 'item-view-toggle') and
        (preceding-sibling::dri:referenceSet[@type = 'summaryView'] or following-sibling::dri:referenceSet[@type = 'summaryView'])]/dri:xref/@target"/>
    <!-- Global variables -->

    <!--
        Context path provides easy access to the context-path parameter. This is
        used when building urls back to the site, they all must include the
        context-path paramater.
    -->
    <xsl:variable name="context-path" select="/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='contextPath'][not(@qualifier)]"/>

    <!--
        Theme path represents the full path back to theme. This is useful for
        accessing static resources such as images or javascript files. Simply
        prepend this variable and then add the file name, thus
        {$theme-path}/images/myimage.jpg will result in the full path from the
        HTTP root down to myimage.jpg. The theme path is composed of the
        "[context-path]/themes/[theme-dir]/".
    -->
    <xsl:variable name="theme-path" select="concat($context-path,'/themes/',/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='theme'][@qualifier='path'])"/>


    <!-- Should COinS be used? 0 = disabled, 1 = enabled.
        COinS is Context Objects in Spans, adding metadata to a span, its good for machines, but looks really messy-->
    <xsl:variable name="config-use-COinS">
        <xsl:text>0</xsl:text>
    </xsl:variable>

    <xsl:variable name="config-use-feedback">
        <xsl:text>0</xsl:text>
    </xsl:variable>

    <!--
        baseurl including scheme, servername and port with no trailing slash.
    -->
    <xsl:variable name="baseurl">
        <xsl:value-of select="/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='request'][@qualifier='scheme']"/>
        <xsl:text>://</xsl:text>
        <xsl:value-of select="/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='request'][@qualifier='serverName']"/>
        <xsl:text>:</xsl:text>
        <xsl:value-of select="/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='request'][@qualifier='serverPort']"/>
    </xsl:variable>

<!-- bds: This is rather ungraceful.. I wasn't able to get apply-templates with-param name="browseMode" to work
        with the summaryList sections, so by last resort I am shamefully using this global variable.
        This allows us to detect browse type so as to display submit dates when browsing by submit date.
            possible values are:
                1 = title
                2 = date issued
                3 = date accessioned
        -->
    <xsl:variable name="browseMode" select="//dri:field[@n='sort_by']/dri:value/@option"/>

    <!-- Grab the previous / next item handles if they are available -->
    <xsl:variable name="previousItemHandle" select="/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='previousItemHandle']"/>
    <xsl:variable name="nextItemHandle" select="/dri:document/dri:meta/dri:pageMeta/dri:metadata[@element='nextItemHandle']"/>
 
</xsl:stylesheet>
