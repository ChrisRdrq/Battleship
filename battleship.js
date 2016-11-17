

var ElementUtils = {
 computeElementWidth: function(selector) {
   var styleText = this.getStyleText('.cell');
   var ml = this.grabStyle(styleText, 'margin-left');
   var mr = this.grabStyle(styleText, 'margin-right');
   var pl = this.grabStyle(styleText, 'padding-left');
   var pr = this.grabStyle(styleText, 'padding-right');
   if (ml === 0 && mr === 0) {
     var m = this.grabStyle(styleText, 'margin'); ml = m; mr = m;
   }
   if (pl === 0 && pr === 0) {
     var p = this.grabStyle(styleText, 'padding'); pl = p; pr = p;
   }
   var w = this.grabStyle(styleText, 'width');
   return ml + pl + w + pr + mr;
 },
 findCssRule: function(styleText, rule) {
   var searchIndex = styleText.indexOf(rule);
   var endIndex = styleText.indexOf(';', searchIndex);
   var startIndex = searchIndex + rule.length + 1;
   if (startIndex < endIndex && startIndex > -1) {
     return styleText.substring(startIndex, endIndex).trim();
   }
   return undefined;
 },
 grabStyle: function(styleText, rule) {
   var cssRule = this.findCssRule(styleText, rule);
   if (rule) {
     var values = cssRule.split(' ');
     if (values.length > 1) {
       var isMargin = rule === 'margin';
       var isPadding = rule === 'padding';
       if (isMargin || isPadding) {
         if (values[0].indexOf('px') > -1) {
           return this.parseNumber(values[1]);
         }
       }
     } else {
       if (values[0].indexOf('px') > -1) {
         return this.parseNumber(values[0]);
       }
     }
   }
   if (rule.match('width|height|margin|padding|border')) {
       return 0;
   }
   return undefined;
 },
 getStyleText: function(selector) {
   var styleSheets = document.styleSheets[0];
   var classes = styleSheets.rules || styleSheets.cssRules;
   for (var x = 0; x < classes.length; x++) {
     var curr = classes[x];
     if (curr.selectorText === selector) {
       return curr.cssText ? curr.cssText : curr.style.cssText;
     }
   }
   return '';
 },
 parseNumber: function(value) {
   var match = value.match(/\d+/);
   return match.length > 0 ? parseInt(match[0], 10) : 0;
 }
};

var TableUtil = {
 createTable: function(rows, cols) {
   var tableEl = this.createEl('DIV', 'table');
   for (var row = 0; row < rows + 1; row++) {
     this.createRow(tableEl, row, cols + 1);
   }
   tableEl.style.width = this.calculateTableWidth(cols + 1);
   return tableEl;
 },
 createRow: function(tableEl, row, cols) {
   var rowEl = this.createEl('DIV', 'row');
   for (var col = 0; col < cols; col++) {
     this.createCol(rowEl, row, col);
   }
   tableEl.appendChild(rowEl);
 },
 createCol: function(rowEl, row, col) {
   var isX = col === 0;
   var isY = row === 0;
   var cls = isX || isY ? 'cell-outer' : 'cell-inner';
   var txt = (isX && row > 0 ? String.fromCharCode(64 + row) : isY && col > 0 ? col : '').toString();
   rowEl.appendChild(this.createEl('DIV', 'cell ' + cls, txt));
 },
 createEl: function(tagName, className, innerHTML) {
   var el = document.createElement(tagName);
   el.className = className;
   el.innerHTML = innerHTML || '';
   return el;
 },
 calculateTableWidth: function(cols) {
   var elWidth = ElementUtils.computeElementWidth('.cell');
   return ((elWidth + 1) * cols) + 'px';
 }
};

var el = document.getElementById('TableBox');
el.appendChild(TableUtil.createTable(10, 10));
