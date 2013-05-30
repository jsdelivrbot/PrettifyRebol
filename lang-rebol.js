// Copyright (C) 2008 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* 
 *  Original Google (Apache) license as-is above 
 *  All addition work comes under this (Apache 2 license)
*/

/**
 * @fileoverview
 * Registers a language handler for Rebol
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then put your code in an HTML tag like
 *      <pre class="prettyprint lang-rebol">(rebol code)</pre>
 *
 * I used lang-lisp.js as the basis and then amended to Rebol
 *
 * "Name"    = 'Rebol'
 * "Author"  = 'Carl Sassenrath'
 * "Version" = 'rebol2|rebol3'
 * "About"   = 'Rebol - Relative Expression Based Object Language'
 *
 * @author draegtun@gmail.com
 *
 */

/**
 * History - https://github.com/draegtun/PrettifyRebol/Changes
 *
 * Contributors
 * - draegtun (Barry Walsh)
 * 
 * Grammar - http://reb4.me/r/rebol#Value
 *
 * Source - https://github.com/draegtun/PrettifyRebol
 *
 */

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [
         // Rebol block/parens.  Is opn/clo really needed for Rebol?
         ['opn',             /^[\(\[]+/, null, '(['],
         ['clo',             /^[\)\]]+/, null, ')]'],
         //
         // Whitespace
         [PR['PR_PLAIN'],       /^[\t\n\r \xA0]+/, null, '\t\n\r \xA0'],
         //
         // Multi-line string {braces} - allowed within:  { ^{ ^}  
         [PR['PR_STRING'],      /^\{(?:[^\}\^]|\^[\s\S])*(?:\}|$)/, null, '{}']
        ],
        [
         //
         // Schemes ("Generic" RE) - Must be before get-word! to avoid conflict
         [PR['PR_LITERAL'], /^\w+\:\/\/[\w\d\+\-\.\,\%\/]+\b/],
         //
         // Types
         // -- money!
         [PR['PR_LITERAL'], /^\$\d[\d\.\,\']*\b/],
         [PR['PR_LITERAL'], /^[\+\-\w]{1,4}\$\d[\d\.\,\']*\b/],
         // -- time!
         [PR['PR_LITERAL'], /^\d{1,2}\:\d{1,2}\:\d{1,2}\b/],
         [PR['PR_LITERAL'], /^\d{1,2}\:\d{1,2}\b/],
         // -- date!
         [PR['PR_LITERAL'], /^\d{1,2}[\-\/](\d{1,2}|\w{3,9})[\-\/]\d{2,4}\b/],
         // -- char!
         [PR['PR_LITERAL'], /^\#\"(?:[^\"\\]|\\[\s\S])*(?:\"|$)/],
         // -- pair!
         [PR['PR_LITERAL'], /^\d(?:[\.\,\'\d]*)x\d(?:[\.\,\'\d]*)\b/],
         // -- string!
         [PR['PR_STRING'], /^\"(?:[^\"\\]|\\[\s\S])*(?:\"|$)/],
         // -- issue!
         [PR['PR_LITERAL'], /^\#[\w\d\-]+/],
         // -- binary!
         [PR['PR_LITERAL'], /^\#\{(?:[^\}\\]|\\[\s\S])*(?:\}|$)/],
         // -- file!
         [PR['PR_LITERAL'], /^\%[\.\w\/\-\\]+/],
         // -- email!
         [PR['PR_LITERAL'], /^[\w\d\+\-\.]+\@[\w\d\+\-\.]+\b/],
         // -- tag!
         [PR['PR_LITERAL'], /^\<(?:[^\>\\]|\\[\s\S])*(?:\>|$)/],
         // -- tuple!
         [PR['PR_LITERAL'], /^\d+\.\d+\.\d+\.\d+/],
         [PR['PR_LITERAL'], /^\d+\.\d+\.\d+/],
         // -- decimal!
         [PR['PR_LITERAL'], /^(\+|\-|\d)\d*(?:[\.\,]\d+)\b/],
         // -- percent!
         [PR['PR_LITERAL'], /^(\+|\-|\d)(?:[\.\,\'\d]*)\%/],
         // -- integer!
         [PR['PR_LITERAL'], /^(\+|\-|\d)\d*\b/],
         // -- get-word!
         [PR['PR_LITERAL'], /^\:(?:[A-Za-z0-9=\-\!\?\_\*\+\.\/\'\~]*)/],
         // -- lit-word!
         [PR['PR_LITERAL'], /^\'(?:[A-Za-z0-9=\-\!\?\_\*\+\.\/\'\~]*)/],
         // -- set-word!
         [PR['PR_DECLARATION'], /^(?:[A-Za-z0-9=\-\!\?\_\*\+\.\/\'\~]*):/],
         //
         // Above is the Rebol data types grammar.  
         // Below the grammar for type! (declarations)
         [PR['PR_TYPE'],  /^(?:[A-Za-z0-9=\-\?\_\*\+\.\/]*)\!/],
         //
         // Constants (as literals! - there is no Constants token in GCP)
         [PR['PR_LITERAL'], /^\b(?:none|true|false|yes|no|on|off)\b/],
         //
         // Keywords
         [PR['PR_KEYWORD'], /^(?:to\-relative\-file\/as\-local|to\-relative\-file\/as\-rebol|to\-relative\-file\/no\-copy|load\-extension\/dispatch|map\-gob\-offset\/reverse|collect\-words\/ignore|request\-file\/filter|request\-file\/title|arctangent\/radians|collect\-words\/deep|request\-file\/multi|to\-local\-file\/full|round\/half\-ceiling|request\-file\/save|collect\-words\/set|arccosine\/radians|request\-file\/file|unprotect\/values|invalid\-utf\?\/utf|to\-relative\-file|decompress\/limit|checksum\/secure|recycle\/torture|maximum\-of\/skip|arcsine\/radians|clean\-path\/only|checksum\/method|decompress\/part|decompress\/gzip|minimum\-of\/skip|unprotect\/words|difference\/case|tangent\/radians|extract\/default|transcode\/error|round\/half\-down|import\/no\-share|recycle\/ballast|difference\/skip|load\-extension|intersect\/case|intersect\/skip|construct\/only|uppercase\/part|import\/no\-user|clean\-path\/dir|unprotect\/deep|select\/reverse|dump\-obj\/match|import\/version|switch\/default|transcode\/only|transcode\/next|trace\/function|protect\/values|cosine\/radians|resolve\/extend|lowercase\/part|charset\/length|construct\/with|encode\/options|map\-gob\-offset|make\-dir\/deep|round\/ceiling|import\/no\-lib|compress\/part|checksum\/hash|to\-local\-file|shift\/logical|checksum\/part|delta\-profile|reduce\/no\-set|reword\/escape|stats\/profile|to\-refinement|to\-rebol\-file|new\-line\/skip|save\/compress|random\/secure|collect\-words|extract\/index|protect\/words|array\/initial|compress\/gzip|replace\/tail|compose\/into|compose\/only|checksum\/tcp|checksum\/key|confirm\/with|reverse\/part|protect\/deep|resolve\/only|import\/check|protect\/hide|decloak\/with|break\/return|find\/reverse|extract\/into|request\-file|exclude\/case|encloak\/with|speed\?\/times|new\-line\/all|funct\/extern|module\/mixin|speed\?\/no\-io|collect\/into|sort\/reverse|compose\/deep|sine\/radians|sort\/compare|deline\/lines|replace\/case|exclude\/skip|write\/append|now\/yearday|select\/part|select\/skip|unbind\/deep|select\/with|to\-lit\-path|select\/last|insert\/part|cause\-error|stats\/timer|debase\/base|replace\/all|repend\/part|to\-set\-path|to\-set\-word|unique\/skip|resolve\/all|select\/case|insert\/only|return\/redo|do\-callback|remove\/part|do\-commands|remove\-each|remold\/only|to\-hex\/size|remold\/flat|change\/only|reword\/into|reduce\/only|change\/part|select\/only|launch\/args|square\-root|append\/part|recycle\/off|append\/only|enbase\/base|read\/string|say\-browser|to\-get\-word|launch\/wait|random\/seed|stats\/evals|to\-get\-path|make\-banner|stack\/block|save\/length|save\/header|stack\/depth|random\/only|limit\-usage|quit\/return|write\/allow|write\/lines|to\-lit\-word|stack\/limit|to\-function|now\/precise|find\-script|now\/weekday|reduce\/into|assert\/type|round\/floor|unique\/case|repend\/only|to\-datatype|load\/header|to\-percent|to\-closure|parse\/case|to\-decimal|open\/write|open\/allow|find\/match|query\/mode|throw\/name|trace\/back|format\/pad|entab\/size|read\/lines|to\-typeset|recycle\/on|trim\/lines|remold\/all|funct\/with|try\/except|type\?\/word|to\-integer|mkdir\/deep|repend\/dup|difference|detab\/size|delta\-time|minimum\-of|delect\/all|decompress|decode\-url|copy\/types|round\/down|round\/even|to\-command|union\/case|union\/skip|maximum\-of|clean\-path|select\/any|change\/dup|insert\/dup|change\-dir|catch\/quit|catch\/name|boot\-print|set\-scheme|switch\/all|stats\/show|arctangent|split\-path|split\/into|apply\/only|append\/dup|stack\/args|alter\/case|stack\/func|list\-dir\/d|list\-dir\/f|list\-dir\/i|list\-dir\/l|list\-dir\/r|write\/part|loud\-print|stack\/word|write\/seek|complement|stack\/size|sort\/part|load\/next|load\/type|transcode|to\-binary|to\-bitset|find\/case|copy\/deep|lowercase|find\/last|copy\/part|to\-object|find\/only|to\-module|find\/part|read\/part|read\/seek|take\/part|find\/skip|what\/args|intersect|find\/tail|map\-event|find\/with|take\/last|index\?\/xy|uppercase|call\/wait|arccosine|parse\/all|delect\/in|bind\/copy|to\-string|to\-vector|open\/seek|open\/read|take\/deep|values\-of|trim\/auto|trim\/head|unprotect|now\/month|mold\/flat|mold\/only|remainder|trim\/tail|sort\/skip|move\/part|move\/skip|trim\/with|sort\/case|construct|bind\/only|absolute|load\/all|to\-tuple|multiply|do\-codec|sort\/all|function|now\/date|checksum|mold\/all|case\/all|now\/time|to\-image|ask\/hide|now\/year|save\/all|now\/zone|dump\-obj|to\-event|subtract|open\/new|round\/to|types\-of|to\-issue|to\-error|new\-line|help\/doc|compress|wait\/all|trim\/all|bind\/set|what\-dir|map\-each|make\-dir|list\-dir|bind\/new|to\-block|to\-logic|words\-of|to\-money|list\-env|to\-paren|undirize|load\-gui|continue|title\-of|find\/any|find\-all|quit\/now|to\-email|q\/return|to\-path|seventh|exclude|set\/any|tangent|extract|protect|to\-char|encloak|recycle|set\-env|to\-date|body\-of|pending|to\-word|upgrade|foreach|forever|reflect|now\/utc|attempt|now\/day|changes|to\-file|forskip|do\/next|set\/pad|do\/args|move\/to|spec\-of|closure|as\-pair|arcsine|get\-env|get\/any|replace|collect|comment|compose|minimum|if\/else|default|confirm|decloak|maximum|resolve|wake\-up|license|to\-pair|context|to\-port|reverse|charset|to\-time|log\-10|return|cosine|create|debase|decode|delect|delete|deline|unbind|dirize|divide|repend|repeat|rename|unique|remove|second|secure|select|remold|change|unless|rejoin|reform|reduce|browse|eighth|either|enbase|encode|reword|random|extend|printf|first\+|switch|update|forall|object|to\-url|format|fourth|negate|to\-gob|assert|to\-hex|source|mold64|modulo|to\-tag|module|modify|import|in\-dir|append|insert|intern|launch|to\-map|action|enline|native|log\-e|stack|split|ajoin|write|sixth|alter|while|shift|apply|stats|usage|until|round|unset|break|quote|catch|tenth|third|throw|check|mkdir|clear|q\/now|close|probe|print|union|power|dehex|detab|parse|entab|evoke|fifth|trace|first|ninth|funco|about|funct|input|log\-2|query|array|prin|wait|tail|make|ls\/r|ls\/l|ls\/i|ls\/f|ls\/d|xor\~|loop|take|mold|load|last|join|more|and\~|back|help|head|bind|halt|save|move|next|swap|form|read|bugs|call|find|open|case|exit|task|sine|trim|echo|dump|sort|chat|also|does|quit|docs|what|pick|demo|poke|copy|func|skip|any|try|all|or\~|add|min|now|not|for|and|pwd|has|abs|xor|ask|mod|use|map|max|set|get|exp|ls|rm|cd|to|do|dp|at|dt|or|if|in|ds)\b/, null],
         //
         // Script tag (shebang!)
         [PR['PR_COMMENT'], /^#!(?:.*)/],
         //
         // A line comment that starts with ;
         [PR['PR_COMMENT'],     /^;[^\r\n]*/, null, ';']
        ]),
    ['rebol', 'red']);
