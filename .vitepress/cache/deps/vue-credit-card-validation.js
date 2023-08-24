import "./chunk-CF3WPAMV.js";

// node_modules/.pnpm/vue-credit-card-validation@1.0.5/node_modules/vue-credit-card-validation/dist/vue-credit-card-validation.esm.js
var cards = [
  {
    type: "maestro",
    patterns: [
      5018,
      502,
      503,
      506,
      56,
      58,
      639,
      6220,
      67,
      633
    ],
    format: /(\d{1,4})/g,
    length: [12, 13, 14, 15, 16, 17, 18, 19],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "forbrugsforeningen",
    patterns: [600],
    format: /(\d{1,4})/g,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "dankort",
    patterns: [5019],
    format: /(\d{1,4})/g,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  // Credit cards
  {
    type: "visa",
    patterns: [4],
    format: /(\d{1,4})/g,
    length: [13, 16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "mastercard",
    patterns: [
      51,
      52,
      53,
      54,
      55,
      22,
      23,
      24,
      25,
      26,
      27
    ],
    format: /(\d{1,4})/g,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "amex",
    patterns: [34, 37],
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    length: [15, 16],
    cvcLength: [3, 4],
    luhn: true
  },
  {
    type: "dinersclub",
    patterns: [30, 36, 38, 39],
    format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
    length: [14],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "discover",
    patterns: [60, 64, 65, 622],
    format: /(\d{1,4})/g,
    length: [16],
    cvcLength: [3],
    luhn: true
  },
  {
    type: "unionpay",
    patterns: [62, 88],
    format: /(\d{1,4})/g,
    length: [16, 17, 18, 19],
    cvcLength: [3],
    luhn: false
  },
  {
    type: "jcb",
    patterns: [35],
    format: /(\d{1,4})/g,
    length: [16],
    cvcLength: [3],
    luhn: true
  }
];
var validation = {
  cardExpiryVal: function(value) {
    var ref = Array.from(value.split(/[\s\/]+/, 2));
    var month = ref[0];
    var year = ref[1];
    if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
      var prefix = (/* @__PURE__ */ new Date()).getFullYear();
      prefix = prefix.toString().slice(0, 2);
      year = prefix + year;
    }
    month = parseInt(month, 10);
    year = parseInt(year, 10);
    return { month, year };
  },
  validateCardNumber: function(num) {
    num = (num + "").replace(/\s+|-/g, "");
    if (!/^\d+$/.test(num)) {
      return false;
    }
    var card = cardFormatUtils.cardFromNumber(num);
    if (!card) {
      return false;
    }
    return Array.from(card.length).includes(num.length) && (card.luhn === false || cardFormatUtils.luhnCheck(num));
  },
  validateCardExpiry: function(month, year) {
    if (!month) {
      return false;
    }
    if (!year) {
      var assign;
      assign = validation.cardExpiryVal(month), month = assign.month, year = assign.year;
    }
    if (typeof month === "object" && "month" in month) {
      var assign$1;
      assign$1 = month, month = assign$1.month, year = assign$1.year;
    }
    if (!month || !year) {
      return false;
    }
    month = month.toString().trim();
    year = year.toString().trim();
    if (!/^\d+$/.test(month)) {
      return false;
    }
    if (!/^\d+$/.test(year)) {
      return false;
    }
    if (!(1 <= month && month <= 12)) {
      return false;
    }
    if (year.length === 2) {
      if (year < 70) {
        year = "20" + year;
      } else {
        year = "19" + year;
      }
    }
    console.log(year);
    if (year.length !== 4) {
      return false;
    }
    var expiry = new Date(year, month);
    var currentTime = /* @__PURE__ */ new Date();
    expiry.setMonth(expiry.getMonth() - 1);
    expiry.setMonth(expiry.getMonth() + 1, 1);
    return expiry > currentTime;
  },
  validateCardCVC: function(cvc, type) {
    if (!cvc) {
      return false;
    }
    cvc = cvc.toString().trim();
    if (!/^\d+$/.test(cvc)) {
      return false;
    }
    var card = cardFormatUtils.cardFromType(type);
    if (card != null) {
      return Array.from(card.cvcLength).includes(cvc.length);
    } else {
      return cvc.length >= 3 && cvc.length <= 4;
    }
  },
  cardType: function(num) {
    if (!num) {
      return null;
    }
    return cardFormatUtils.__guard__(cardFormatUtils.cardFromNumber(num), function(x) {
      return x.type;
    }) || null;
  },
  formatCardNumber: function(num) {
    num = num.toString().replace(/\D/g, "");
    var card = cardFormatUtils.cardFromNumber(num);
    if (!card) {
      return num;
    }
    var upperLength = card.length[card.length.length - 1];
    num = num.slice(0, upperLength);
    if (card.format.global) {
      return cardFormatUtils.__guard__(num.match(card.format), function(x) {
        return x.join(" ");
      });
    } else {
      var groups = card.format.exec(num);
      if (groups == null) {
        return;
      }
      groups.shift();
      return groups.join(" ");
    }
  },
  formatExpiry: function(expiry) {
    var parts = expiry.match(/^\D*(\d{1,2})(\D+)?(\d{1,4})?/);
    if (!parts) {
      return "";
    }
    var mon = parts[1] || "";
    var sep = parts[2] || "";
    var year = parts[3] || "";
    if (year.length > 0) {
      sep = " / ";
    } else if (sep === " /") {
      mon = mon.substring(0, 1);
      sep = "";
    } else if (mon.length === 2 || sep.length > 0) {
      sep = " / ";
    } else if (mon.length === 1 && !["0", "1"].includes(mon)) {
      mon = "0" + mon;
      sep = " / ";
    }
    return mon + sep + year;
  }
};
var cardFormatUtils = {
  cardFromNumber: function(num) {
    num = (num + "").replace(/\D/g, "");
    for (var i in cards) {
      for (var j in cards[i].patterns) {
        var p = cards[i].patterns[j] + "";
        if (num.substr(0, p.length) === p) {
          return cards[i];
        }
      }
    }
  },
  cardFromType: function(type) {
    for (var i in cards) {
      if (cards[i].type === type) {
        return cards[i];
      }
    }
  },
  luhnCheck: function(num) {
    var odd = true;
    var sum = 0;
    var digits = (num + "").split("").reverse();
    for (var i in digits) {
      var digit = parseInt(digits[i], 10);
      if (odd = !odd) {
        digit *= 2;
      }
      if (digit > 9) {
        digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0;
  },
  hasTextSelected: function(target) {
    if (target.selectionStart != null && target.selectionStart !== target.selectionEnd) {
      return true;
    }
    if (cardFormatUtils.__guard__(typeof document !== "undefined" && document !== null ? document.selection : void 0, function(x) {
      return x.createRange;
    }) != null) {
      if (document.selection.createRange().text) {
        return true;
      }
    }
    return false;
  },
  // Private
  // Safe Val
  safeVal: function(value, target, e) {
    if (e.inputType === "deleteContentBackward") {
      return;
    }
    var cursor;
    try {
      cursor = target.selectionStart;
    } catch (error) {
      cursor = null;
    }
    var last = target.value;
    target.value = value;
    value = target.value;
    if (cursor !== null && document.activeElement == target) {
      if (cursor === last.length) {
        cursor = target.value.length;
      }
      if (last !== value) {
        var prevPair = last.slice(cursor - 1, +cursor + 1 || void 0);
        var currPair = target.value.slice(cursor - 1, +cursor + 1 || void 0);
        var digit = value[cursor];
        if (/\d/.test(digit) && prevPair === digit + " " && currPair === " " + digit) {
          cursor = cursor + 1;
        }
      }
      target.selectionStart = cursor;
      return target.selectionEnd = cursor;
    }
  },
  // Replace Full-Width Chars
  replaceFullWidthChars: function(str) {
    if (str == null) {
      str = "";
    }
    var fullWidth = "０１２３４５６７８９";
    var halfWidth = "0123456789";
    var value = "";
    var chars = str.split("");
    for (var i in chars) {
      var idx = fullWidth.indexOf(chars[i]);
      if (idx > -1) {
        chars[i] = halfWidth[idx];
      }
      value += chars[i];
    }
    return value;
  },
  // Format Numeric
  reFormatNumeric: function(e) {
    var target = e.currentTarget;
    return setTimeout(function() {
      var value = target.value;
      value = cardFormatUtils.replaceFullWidthChars(value);
      value = value.replace(/\D/g, "");
      return cardFormatUtils.safeVal(value, target, e);
    });
  },
  // Format Card Number
  reFormatCardNumber: function(e) {
    var target = e.currentTarget;
    return setTimeout(function() {
      var value = target.value;
      value = cardFormatUtils.replaceFullWidthChars(value);
      value = validation.formatCardNumber(value);
      return cardFormatUtils.safeVal(value, target, e);
    });
  },
  formatCardNumber: function(e) {
    var re;
    var digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    var target = e.currentTarget;
    var value = target.value;
    var card = cardFormatUtils.cardFromNumber(value + digit);
    var length = value.replace(/\D/g, "") + digit;
    var upperLength = 16;
    if (card) {
      upperLength = card.length[card.length.length - 1];
    }
    if (length >= upperLength) {
      return;
    }
    if (target.selectionStart != null && target.selectionStart !== value.length) {
      return;
    }
    if (card && card.type === "amex") {
      re = /^(\d{4}|\d{4}\s\d{6})$/;
    } else {
      re = /(?:^|\s)(\d{4})$/;
    }
    if (re.test(value + digit)) {
      e.preventDefault();
      return setTimeout(function() {
        return target.value = value + " " + digit;
      });
    } else if (re.test(value + digit)) {
      e.preventDefault();
      return setTimeout(function() {
        return target.value = value + digit + " ";
      });
    }
  },
  formatBackCardNumber: function(e) {
    var target = e.currentTarget;
    var value = target.value;
    if (e.which !== 8) {
      return;
    }
    if (target.selectionStart != null && target.selectionStart !== value.length) {
      return;
    }
    if (/\d\s$/.test(value)) {
      e.preventDefault();
      return setTimeout(function() {
        return target.value = value.replace(/\d\s$/, "");
      });
    } else if (/\s\d?$/.test(value)) {
      e.preventDefault();
      return setTimeout(function() {
        return target.value = value.replace(/\d$/, "");
      });
    }
  },
  // Format Expiry
  reFormatExpiry: function(e) {
    var target = e.currentTarget;
    return setTimeout(function() {
      var value = target.value;
      value = cardFormatUtils.replaceFullWidthChars(value);
      value = validation.formatExpiry(value);
      return cardFormatUtils.safeVal(value, target, e);
    });
  },
  formatExpiry: function(e) {
    var digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    var target = e.currentTarget;
    var val = target.value + digit;
    if (/^\d$/.test(val) && !["0", "1"].includes(val)) {
      e.preventDefault();
      return setTimeout(function() {
        return target.value = "0" + val + " / ";
      });
    } else if (/^\d\d$/.test(val)) {
      e.preventDefault();
      return setTimeout(function() {
        var m1 = parseInt(val[0], 10);
        var m2 = parseInt(val[1], 10);
        if (m2 > 2 && m1 !== 0) {
          return target.value = "0" + m1 + " / " + m2;
        } else {
          return target.value = val + " / ";
        }
      });
    }
  },
  formatForwardExpiry: function(e) {
    var digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    var target = e.currentTarget;
    var val = target.value;
    if (/^\d\d$/.test(val)) {
      return target.value = val + " / ";
    }
  },
  formatForwardSlashAndSpace: function(e) {
    var which = String.fromCharCode(e.which);
    if (which !== "/" && which !== " ") {
      return;
    }
    var target = e.currentTarget;
    var val = target.value;
    if (/^\d$/.test(val) && val !== "0") {
      return target.value = "0" + val + " / ";
    }
  },
  formatBackExpiry: function(e) {
    var target = e.currentTarget;
    var value = target.value;
    if (e.which !== 8) {
      return;
    }
    if (target.selectionStart != null && target.selectionStart !== value.length) {
      return;
    }
    if (/\d\s\/\s$/.test(value)) {
      e.preventDefault();
      return setTimeout(function() {
        return target.value = value.replace(/\d\s\/\s$/, "");
      });
    }
  },
  // Adds maxlength to Expiry field
  handleExpiryAttributes: function(e) {
    e.setAttribute("maxlength", 9);
  },
  // Format CVC
  reFormatCVC: function(e) {
    var target = e.currentTarget;
    return setTimeout(function() {
      var value = target.value;
      value = cardFormatUtils.replaceFullWidthChars(value);
      value = value.replace(/\D/g, "").slice(0, 4);
      return cardFormatUtils.safeVal(value, target, e);
    });
  },
  // Restrictions
  restrictNumeric: function(e) {
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    var input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input) ? true : e.preventDefault();
  },
  restrictCardNumber: function(e) {
    var target = e.currentTarget;
    var digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    if (cardFormatUtils.hasTextSelected(target)) {
      return;
    }
    var value = (target.value + digit).replace(/\D/g, "");
    var card = cardFormatUtils.cardFromNumber(value);
    if (card) {
      return value.length <= card.length[card.length.length - 1];
    } else {
      return value.length <= 16;
    }
  },
  restrictExpiry: function(e) {
    var target = e.currentTarget;
    var digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    if (cardFormatUtils.hasTextSelected(target)) {
      return;
    }
    var value = target.value + digit;
    value = value.replace(/\D/g, "");
    if (value.length > 6) {
      return false;
    }
  },
  restrictCVC: function(e) {
    var target = e.currentTarget;
    var digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    if (cardFormatUtils.hasTextSelected(target)) {
      return;
    }
    var val = target.value + digit;
    return val.length <= 4;
  },
  setCardType: function(e) {
    var target = e.currentTarget;
    var val = target.value;
    var cardType = validation.cardType(val) || "unknown";
    if (target.className.indexOf(cardType) === -1) {
      var allTypes = [];
      for (var i in cards) {
        allTypes.push(cards[i].type);
      }
      target.classList.remove("unknown");
      target.classList.remove("identified");
      (ref = target.classList).remove.apply(ref, allTypes);
      target.classList.add(cardType);
      target.dataset.cardBrand = cardType;
      if (cardType !== "unknown") {
        target.classList.add("identified");
      }
    }
    var ref;
  },
  __guard__: function(value, transform) {
    return typeof value !== "undefined" && value !== null ? transform(value) : void 0;
  }
};
var format = {
  validateCardNumber: validation.validateCardNumber,
  validateCardCVC: validation.validateCardCVC,
  validateCardExpiry: validation.validateCardExpiry,
  setCardType: function(el) {
    cardFormatUtils.setCardType(el);
    setTimeout(function() {
      el.currentTarget.dispatchEvent(new Event("keyup"));
      el.currentTarget.dispatchEvent(new Event("change"));
    }, 100);
  },
  formatCardCVC: function(el) {
    el.addEventListener("keypress", cardFormatUtils.restrictNumeric);
    el.addEventListener("keypress", cardFormatUtils.restrictCVC);
    el.addEventListener("paste", cardFormatUtils.reFormatCVC);
    el.addEventListener("change", cardFormatUtils.reFormatCVC);
    el.addEventListener("input", cardFormatUtils.reFormatCVC);
    return this;
  },
  formatCardExpiry: function(el) {
    cardFormatUtils.handleExpiryAttributes(el);
    el.addEventListener("keypress", cardFormatUtils.restrictNumeric);
    el.addEventListener("keypress", cardFormatUtils.formatExpiry);
    el.addEventListener("keypress", cardFormatUtils.formatForwardSlashAndSpace);
    el.addEventListener("keypress", cardFormatUtils.formatForwardExpiry);
    el.addEventListener("keydown", cardFormatUtils.formatBackExpiry);
    el.addEventListener("change", cardFormatUtils.reFormatExpiry);
    el.addEventListener("input", cardFormatUtils.reFormatExpiry);
    el.addEventListener("blur", cardFormatUtils.reFormatExpiry);
    return this;
  },
  formatCardNumber: function(el) {
    el.maxLength = 19;
    el.addEventListener("keypress", cardFormatUtils.restrictNumeric);
    el.addEventListener("keypress", cardFormatUtils.restrictCardNumber);
    el.addEventListener("keypress", cardFormatUtils.formatCardNumber);
    el.addEventListener("keydown", cardFormatUtils.formatBackCardNumber);
    el.addEventListener("keyup", cardFormatUtils.setCardType);
    el.addEventListener("paste", cardFormatUtils.reFormatCardNumber);
    el.addEventListener("change", cardFormatUtils.reFormatCardNumber);
    el.addEventListener("input", cardFormatUtils.reFormatCardNumber);
    el.addEventListener("input", cardFormatUtils.setCardType);
    return this;
  },
  restrictNumeric: function(el) {
    el.addEventListener("keypress", cardFormatUtils.restrictNumeric);
    el.addEventListener("paste", cardFormatUtils.restrictNumeric);
    el.addEventListener("change", cardFormatUtils.restrictNumeric);
    el.addEventListener("input", cardFormatUtils.restrictNumeric);
    return this;
  }
};
var VueCardFormat = {
  install: function install(vue, opts) {
    vue.config.globalProperties.$cardFormat = format;
    vue.directive("cardformat", {
      beforeMount: function beforeMount(el, binding, vnode) {
        if (el.nodeName.toLowerCase() !== "input") {
          el = el.querySelector("input");
        }
        var method = Object.keys(format).find(function(key) {
          return key.toLowerCase() === binding.arg.toLowerCase();
        });
        var keyupEvent = new Event("keyup");
        format[method](el, vnode);
        if (method == "formatCardNumber" && typeof binding.instance.cardBrand !== "undefined") {
          el.addEventListener("keyup", function() {
            if (el.dataset.cardBrand) {
              binding.instance.cardBrand = el.dataset.cardBrand;
            }
          });
          el.addEventListener("paste", function() {
            setTimeout(function() {
              el.dispatchEvent(keyupEvent);
            }, 10);
          });
        }
      }
    });
  }
};
var vue_credit_card_validation_esm_default = VueCardFormat;
export {
  vue_credit_card_validation_esm_default as default
};
/*! Bundled license information:

vue-credit-card-validation/dist/vue-credit-card-validation.esm.js:
  (*!
   * vue-credit-card-validation v1.0.3 
   * (c) 2022 Michael Wuori
   * Released under the MIT License.
   *)
*/
//# sourceMappingURL=vue-credit-card-validation.js.map
