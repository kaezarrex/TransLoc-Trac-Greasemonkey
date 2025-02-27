// ==UserScript==
// @name TL Trac Beautifier
// @namespace https://dev.transloc.com
// @description Makes Trac look much better.
// @include https://dev.transloc.com/*
// ==/UserScript==

var $;

addJQuery(letsJQuery);

// Add jQuery
function addJQuery(callback) {
    var script = document.createElement("script");

    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");

    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);

    document.body.appendChild(script);
}



// All your JQuery code must be inside this function
function letsJQuery() {

    var authors = [
        {
            name: 'Jason',
            url: 'https://github.com/jasonwyatt'
        }, {
            name: 'Hazmat',
            url: 'https://github.com/kaezarrex'
        }, {
            name: 'Tim',
            url: 'https://github.com/generictjohnson'
        }
    ],
    icons = {
        'task': 'http://hacks.jwf.us/pretty_trac/icons/page_white_text.png',
        'defect': 'http://hacks.jwf.us/pretty_trac/icons/bug.png',
        'enhancement': 'http://hacks.jwf.us/pretty_trac/icons/star.png'
    };

    $('body').css({
        width: 1024,
        margin: '15px auto'
    });
    
    function styleRoadmap(){
        // summary:
        //      Styles the roadmap page.

        if(window.location.pathname !== "/trac/roadmap"){
            return;
        }

        var $progressTables = $('table.progress'),
            $progressTableCells = $('table.progress td'),
            $progressClosedCells = $('table.progress td.closed'),
            $progressOpenedCells = $('table.progress td.open'),
            $percentages = $('p.percent');

        $percentages.css({
            fontSize: '35px',
            lineHeight: '35px',
            fontWeight: 'bold',
            textShadow: '0 -1px 0 #DDD',
            color: '#AAA'
        });

        $progressTables.css({
            border: 'none',
            marginBottom: 10,
            width: '890px',
            maxWidth: '10000px'
        });

        $progressTableCells.css({
            height: '35px'
        });

        $progressClosedCells.css({
            borderRadius: '17px 0 0 17px',
            //boxShadow: '0 1px 3px black'
        });
        // gradients for each type:
        var gradientVersions = [
            'linear-gradient(top, hsl(69,58%,58%) 0%,hsl(78,63%,45%) 50%,hsl(80,100%,33%) 51%,hsl(77,64%,49%) 100%)',
            '-webkit-linear-gradient(top, hsl(69,58%,58%) 0%,hsl(78,63%,45%) 50%,hsl(80,100%,33%) 51%,hsl(77,64%,49%) 100%)',
            '-webkit-gradient(linear, left top, left bottom, color-stop(0%,hsl(69,58%,58%)), color-stop(50%,hsl(78,63%,45%)), color-stop(51%,hsl(80,100%,33%)), color-stop(100%,hsl(77,64%,49%)))',
            '-moz-linear-gradient(top, hsl(69,58%,58%) 0%, hsl(78,63%,45%) 50%, hsl(80,100%,33%) 51%, hsl(77,64%,49%) 100%)'
        ];
        for(var i = 0, len = gradientVersions.length; i < len; i++){
            $progressClosedCells.css({
                backgroundImage: gradientVersions[i]
            });
        }
    
    
        $progressOpenedCells.css({
            borderRadius: '0 17px 17px 0',
            backgroundColor: '#EEE',
            //boxShadow: '0 1px 3px black'
        });
        gradientVersions = [
            '-moz-linear-gradient(top, hsl(200,20%,97%) 0%, hsl(200,21%,92%) 50%, hsl(205,18%,87%) 51%, hsl(210,25%,97%) 100%)',
            '-webkit-gradient(linear, left top, left bottom, color-stop(0%,hsl(200,20%,97%)), color-stop(50%,hsl(200,21%,92%)), color-stop(51%,hsl(205,18%,87%)), color-stop(100%,hsl(210,25%,97%)))',
            '-webkit-linear-gradient(top, hsl(200,20%,97%) 0%,hsl(200,21%,92%) 50%,hsl(205,18%,87%) 51%,hsl(210,25%,97%) 100%)',
            'linear-gradient(top, hsl(200,20%,97%) 0%,hsl(200,21%,92%) 50%,hsl(205,18%,87%) 51%,hsl(210,25%,97%) 100%)'
        ];
        for(var i = 0, len = gradientVersions.length; i < len; i++){
            $progressOpenedCells.css({
                backgroundImage: gradientVersions[i]
            });
        }
    }
    styleRoadmap();

    // -----------------------------------------------------
    // Utilities
    // -----------------------------------------------------

    var utils = {

        strip: function(s) {
            return s.replace(/^\s+|\s+$/g, '');
        },

        gravatarUrl: function(user, size) {
            var cleanedUser = this.strip(user).toLowerCase(),
                email = cleanedUser + '@transloc-inc.com';

            return 'http://www.gravatar.com/avatar/' + this.MD5(email) + '.png?s=' + (size || 80);
        },

        // MD5 (Message-Digest Algorithm) by WebToolkit
        // http://www.webtoolkit.info/javascript-md5.html
        // http://www.deluxeblogtips.com/2010/04/get-gravatar-using-only-javascript.html
        MD5: function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]|(G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()},

    };

    // -----------------------------------------------------
    // For the Navigation
    // -----------------------------------------------------

    var $myActiveTicketsNav;
    $('#mainnav ul li').each(function(){
        var $this = $(this);

        if($this.find('a').text() === "View Tickets"){
            $this.find('a').text("View All Tickets");

            $myActiveTicketsNav = $('<li class="activeTicketsNav"><a href="https://dev.transloc.com/trac/report/21">My Active Tickets</a></li>').insertBefore($this);
        }
    });
    if(/My Active Tickets/.exec($('title').text())){
        $('#mainnav ul li').removeClass('active');
        $myActiveTicketsNav.addClass('active');
    }

    // -----------------------------------------------------
    // For the Tickets
    // -----------------------------------------------------

    var changes = {
        fontSize: 14,
        verticalAlign: 'middle'
    };
    var items= ['table.listing tbody', 'table.listing th', 'table.listing td'];
    for(var i = 0, len = items.length; i < len; i++){
        $(items[i]).css(changes);
    }

    $('table .type').css({
        textAlign: 'center'
    }).each(function(){
        // Go through and replace the text with an icon
        var types = {
            'task': '<img src="' + icons.task + '" alt="Task Icon" title="Task" />',
            'defect': '<img src="' + icons.defect + '" alt="Bug Icon" title="Defect / Bug" />',
            'enhancement': '<img src="' + icons.enhancement + '" alt="Enhancement Icon" title="Enhancement / New Feature" />'
        };
        var $this = $(this),
            content = $this.text();

        content = /(task)|(defect)|(enhancement)/i.exec(content);

        if(content && content.length > 0){
            $this.html(types[content[0]]);
        }
    });

    // Individual ticket view

    $('#content.ticket').css({
        width: '100%'
    });
    $('#content #ticket').css({
        border: 'none',
        backgroundColor: '#FFF',
        padding: 0
    });
    $('#ticket .description h3').css({
        borderBottom: '1px solid black',
        color: '#000',
        fontWeight: 'bold'
    });
    $('#ticket .properties td, #ticket .properties th').css({
        'font-size': '13px'
    });

    $('#h_reporter, #h_owner').each(function(index) {
        var $link = $(this).next().find('a'),
            user = $link.text(),
            url = utils.gravatarUrl(user, 18);

        $link.css('position', 'relative');
        $link.html('<img src="' + url + '" style="border-radius: 3px; position: absolute; left: -25px;"> ' + user); 
    });

    // Create ticket view

    (function() {

        var $typeField = $('#field-type'),
            type = $typeField.val();

        $typeField.parent().append('<img src="' + icons[type] + '" style="position: absolute; top: 3px; margin-left: 5px; margin-top: 2px;">');
        $typeField.parent().css('position', 'relative');

        $typeField.change(function(event){
            $(this).siblings('img').attr('src', icons[event.target.value]);
        });

        $('#field-owner').change(function(event){
            var user = event.target.value,
                url = utils.gravatarUrl(user, 20),
                $image = $(this).siblings('img');

            if ($image.length == 0) {
                $(this).parent().append('<img src="' + url + '" style="border-radius: 3px; position: absolute; top: 3px; margin-left: 5px">');
                $(this).parent().css('position', 'relative');
            } else {
                $image.attr('src', url);
            }
        });

    })();

    // -----------------------------------------------------
    // For the Preferences Box
    // -----------------------------------------------------

    (function() {
        var $prefs = $('#prefs');

        if ($prefs.length == 0) {
            return;
        }

        $prefs.html($prefs.html().replace(/<br>/g, ''));
        $prefs.css('float', 'none');
        $prefs.find('label, div, fieldset').css('display', 'inline-block');
        $prefs.find('.buttons input').css({'margin': '0px 10px', 'font-size': '10px'});

    })();

    // -----------------------------------------------------
    // For the Timeline
    // -----------------------------------------------------

    $('.timeline').css('font-size', '14px');

    $('.timeline dt').css({
        'background-image': 'none !important',
        'clear': 'both'
    });

    $('.timeline dt a').css({
        'background-image': 'none !important',
        'padding-left': '10px',
        'border-radius': '5px'
    });

    $('.timeline dd').css('margin-left', '4em');

    $('.timeline dt').each(function(index){
        var $author = $(this).find('.author'),
            user;

        if ($author.length == 1) {
            user = $($author[0]).text();
            $(this).append('<img src="' + utils.gravatarUrl(user, 30) + '" style="float: left; border-radius: 5px; margin-top:4px;">');
        }
    });

    // -----------------------------------------------------
    // For the Footer
    // -----------------------------------------------------

    (function() {
        var $footer = $('#footer'),
            html = '<p style="text-align:center; margin: 0 300px;">Styled by ',
            i;

        for (i = 0; i < authors.length; i++) {
            if (authors[i].url) {
                html += '<a href="' + authors[i].url + '">' + authors[i].name + '</a>';
            } else {
                html += authors[i].name;
            }

            if (i == authors.length - 2) {
                html += ' and ';
            } else if (i == authors.length - 1) {
                html += '.';
            } else {
                html += ', ';
            }
        }

        html += '</p>';
        $footer.append(html);

    })();
}

