jQuery-Checkbox-Search-Plugin
=============================

jQuery Checkbox Search plugin lets you search all checkboxes in a page and select them from within a input field (text)

Plugin in only 4.9KB - uncompressed

TESTED ON
---------
- jQuery 1.2.1 to 1.5.2
- IE6+
- FF2+
- Safari 3+
- Opera 9+

CHANGE LOG
----------
jQuery Checkbox Search Plugin v.1.0 (Current stable)
Added the ability to specific global searching (match anywhere in a string).
jQuery Checkbox Search Plugin v.0.9 (stable)
First official release.

HOW TO USE
----------
In your HTML file, include css in the HEAD:
`<link rel="stylesheet" type="text/css" href="jquery-checkbox-search.css" /> `

You can include this in the HEAD as well, however good programming
practices dictate that you include the following line after your tag.
Please make sure it occurs after your jquery include.
`<SCRIPT LANGUAGE="JavaScript" SRC="jquery-checkbox-search.js"></SCRIPT> `

In your HTML file, the input element you want to use for search, call matchBrands(this.value):
`<input onKeyUp="matchBrands(this.value);" > `

In jquery-checkbox-search.js you can specify the text you want to index for search:
`var path_to_brands = ".checkbox_container span";`

Where each checkbox is structured in the following way:
`<div class="checkbox_container"><input type="checkbox"/><span>Capezio</span></div> `
OR
`var path_to_brands = "span.searchable" `

Where each checkbox is structured in the following way:
<input type="checkbox"/><span class="searchable">Capezio</span> 

Sadly the current version of the plugin expects that the tags
previous sibling is the checkbox.

CHANGING LOOK AND FEEL
Change the CSS file as you see fit to effect the look and feel.
The mouseover effect of the selections (the highlighting) is controlled within the JS.
Look for 'backColor' and change as you see fit.