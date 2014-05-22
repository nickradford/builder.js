;(function (exports, doc) {
  "use strict"

  var escapeString = function (string) {
    return string.replace(/&/g, '&amp;')
                 .replace(/</g, '&lt;')
                 .replace(/>/g, '&gt;')
                 .replace(/"/g, '&quot;')
                 .replace(/'/g, '&apos;');
  };

  var Tag = function (name, attrs, body) {
    this.el = doc.createElement(name);
    var attributes = {};

    if (typeof attrs === "object") {
      attributes = attrs;
    } else {
      if (typeof body === "undefined") {
        body = attrs;
      }
    }

    for (var key in attributes) {
      this.el.setAttribute(key, attributes[key]);
    }

    if (typeof body === "function") {
      this.el.appendChild(body(this));
    } else {
      this.el.textContent = body || "";
    }
  };

  Tag.prototype.t = function (name, attrs, body) {
    return new Tag(name, attrs, body);
  };

  Tag.prototype.toString = function () {
    return this.el.outerHTML;
  };

  Tag.prototype.toDom = function () {
    return this.el;
  };

  exports.XMLBuilder = {
    t: function (name, attrs, body) {
      return new Tag(name, attrs, body);
    }
  }

})(typeof exports === "undefined" ? window : exports,
   typeof document === "undefined" ? require('jsdom').jsdom() : document);