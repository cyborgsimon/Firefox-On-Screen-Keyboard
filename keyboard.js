/*
 FxKeyboard improved
 Version: 0.0.1
 Author:  Travis Fitzgerald
 Date:    23 March 2021
 Purpose: A virtual keyboard for Firefox
 */

const storageData = browser.storage.local.get();

storageData.then(storedSetup, onError);

function storedSetup(settings) {
  if (!settings.hasOwnProperty("scaleValue") || settings.scaleValue === null) {
    browser.storage.local.set({
      scaleValue: 95,
    });
    settings.scaleValue = 95;
  }
  if (
    !settings.hasOwnProperty("numpadState") ||
    settings.numpadState === null
  ) {
    browser.storage.local.set({
      numpadState: "disabled",
    });
    settings.numpadState = "disabled";
  }

  var zoomValue = window.devicePixelRatio;
  fxKeyboard.settings.scale = settings.scaleValue / 100;
  fxKeyboard.settings.numpadState = settings.numpadState;
}

function onError(error) {}

var xpath = {
  getXPathOfElement: function (elt) {
    var path = "";
    for (; elt && elt.nodeType == 1; elt = elt.parentNode) {
      idx = xpath.getElementIdx(elt);
      xname = elt.tagName;
      if (idx > 1) xname += "[" + idx + "]";
      path = "/" + xname + path;
    }
    return path;
  },

  getElementIdx: function (elt) {
    var count = 1;
    for (var sib = elt.previousSibling; sib; sib = sib.previousSibling) {
      if (sib.nodeType == 1 && sib.tagName == elt.tagName) count++;
    }

    return count;
  },
};

var FxKeyboardEn = JSON.stringify({
  name: "English",
  locale: "en",
  main: [
    [
      ["`", "~"],
      ["1", "!"],
      ["2", "@"],
      ["3", "#"],
      ["4", "$"],
      ["5", "%"],
      ["6", "^"],
      ["7", "&"],
      ["8", "*"],
      ["9", "("],
      ["0", ")"],
      ["-", "_"],
      ["=", "+"],
      [{ label: "←", special: 8, type: "repeat" }], // backspace
    ],
    [
      [{ label: "" }],
      ["q", "Q"],
      ["w", "W"],
      ["e", "E"],
      ["r", "R"],
      ["t", "T"],
      ["y", "Y"],
      ["u", "U"],
      ["i", "I"],
      ["o", "O"],
      ["p", "P"],
      ["[", "{"],
      ["]", "}"],
      ["\\", "|"],
    ],
    [
      [{ label: "⇪", special: "shiftlock" }],
      ["a", "A"],
      ["s", "S"],
      ["d", "D"],
      ["f", "F"],
      ["g", "G"],
      ["h", "H"],
      ["j", "J"],
      ["k", "K"],
      ["l", "L"],
      [";", ":"],
      ["'", '"'],
      [],
    ],
    [
      [{ label: "⇧", special: "shift" }],
      ["z", "Z"],
      ["x", "X"],
      ["c", "C"],
      ["v", "V"],
      ["b", "B"],
      ["n", "N"],
      ["m", "M"],
      [",", "<"],
      [".", ">"],
      ["/", "?"],
      [{ label: "" }],
    ],
    [
      [{ width: 2 }],
      [{ label: " ", flex: 1 }], // space
      [{ label: "Alt Gr", width: 2, special: "altgr" }],
      [],
      [{ label: "✓" }],
      [{ label: "✖" }],
    ],
  ],
});

FxKeyNumpadEn = JSON.stringify({
  name: "English",
  locale: "en",
  main: [
    [["A"], ["B"], ["C"], [{ label: "←", type: "repeat" }]],
    [["1"], ["2"], ["3"], ["D"]],
    [["4"], ["5"], ["6"], ["E"]],
    [["7"], ["8"], ["9"], ["F"]],
    [["0"], ["."], ["-"], []],
    [[{ label: "✓" }], [{ label: "✖" }]],
  ],
});

var FxKeyboardDe = JSON.stringify({
  name: "German",
  locale: "de",
  main: [
    [
      ["^", "°"],
      ["1", "!"],
      ["2", '"', "²"],
      ["3", "§", "³"],
      ["4", "$"],
      ["5", "%"],
      ["6", "&"],
      ["7", "/", "{"],
      ["8", "(", "["],
      ["9", ")", "]"],
      ["0", "=", "}"],
      ["ß", "?", "\\"],
      [{ label: "←", special: 8, type: "repeat" }], // backspace
    ],
    [
      [{ label: "" }],
      ["q", "Q", "@"],
      ["w", "W"],
      ["e", "E"],
      ["r", "R"],
      ["t", "T"],
      ["z", "Z"],
      ["u", "U"],
      ["i", "I"],
      ["o", "O"],
      ["p", "P"],
      ["ü", "Ü"],
      ["+", "*", "~"],
    ],
    [
      [{ label: "⇪", special: "shiftlock" }],
      ["a", "A"],
      ["s", "S"],
      ["d", "D"],
      ["f", "F"],
      ["g", "G"],
      ["h", "H"],
      ["j", "J"],
      ["k", "K"],
      ["l", "L"],
      ["ö", "Ö"],
      ["ä", "Ä"],
      ["#", "'"],
    ],
    [
      [{ label: "⇧", special: "shift" }],
      ["<", ">", "|"],
      ["y", "Y"],
      ["x", "X"],
      ["c", "C"],
      ["v", "V"],
      ["b", "B"],
      ["n", "N"],
      ["m", "M", "µ"],
      [",", ";"],
      [".", ":"],
      ["-", "_"],
      [],
    ],
    [
      [{ width: 2 }],
      [{ label: " ", flex: 1 }], // space
      [{ label: "Alt Gr", width: 2, special: "altgr" }],
      [],
      [{ label: "✓" }],
      [{ label: "✖" }],
    ],
  ],
});

FxKeyNumpadDe = JSON.stringify({
  name: "German",
  locale: "de",
  main: [
    [["A"], ["B"], ["C"], [{ label: "←", type: "repeat" }]],
    [["1"], ["2"], ["3"], ["D"]],
    [["4"], ["5"], ["6"], ["E"]],
    [["7"], ["8"], ["9"], ["F"]],
    [["0"], [","], ["-"], []],
    [[{ label: "✓" }], [{ label: "✖" }]],
  ],
});

var FxKeyboardFr = JSON.stringify({
  name: "French",
  locale: "fr",
  main: [
    [
      ["²", "§"],
      ["1", "&"],
      ["2", "é"],
      ["3", '"'],
      ["4", "'"],
      ["5", "("],
      ["6", "-"],
      ["7", "è"],
      ["8", "_"],
      ["9", "ç"],
      ["0", "à"],
      ["°", ")"],
      ["=", "+"],
      [{ label: "←", special: 8, type: "repeat" }], // backspace
    ],
    [
      [],
      ["a", "A"],
      ["z", "Z"],
      ["e", "E"],
      ["r", "R"],
      ["t", "T"],
      ["y", "Y"],
      ["u", "U"],
      ["i", "I"],
      ["o", "O"],
      ["p", "P"],
      ["^", "¨"],
      ["$", "£"],
      [],
    ],
    [
      [{ label: "⇪", special: "shiftlock" }],
      ["q", "Q"],
      ["s", "S"],
      ["d", "D"],
      ["f", "F"],
      ["g", "G"],
      ["h", "H"],
      ["j", "J"],
      ["k", "K"],
      ["l", "L"],
      ["m", "M"],
      ["ù", "%"],
      ["*", "µ"],
    ],
    [
      [{ label: "⇧", flex: 2, special: "shift" }],
      ["<", ">"],
      ["w", "W"],
      ["x", "X"],
      ["c", "C"],
      ["v", "V"],
      ["b", "B"],
      ["n", "N"],
      [",", "?"],
      [";", "."],
      [":", "/"],
      ["!", "§"],
      [],
    ],
    [
      [{ width: 2 }],
      [{ label: " ", flex: 1 }], // space
      [{ label: "Alt Gr", width: 2, special: "altgr" }],
      [],
      [{ label: "✓" }],
      [{ label: "✖" }],
    ],
  ],
});

FxKeyNumpadFr = JSON.stringify({
  name: "French",
  locale: "fr",
  main: [
    [["A"], ["B"], ["C"], [{ label: "←", type: "repeat" }]],
    [["1"], ["2"], ["3"], ["D"]],
    [["4"], ["5"], ["6"], ["E"]],
    [["7"], ["8"], ["9"], ["F"]],
    [["0"], [","], ["-"], []],
    [[{ label: "✓" }], [{ label: "✖" }]],
  ],
});

var fxKeyboard = {
  settings: {
    repeat_all: true,
    keep_closed: false,
    startingURL: document.location.href,
    locale_default: "en",
    secScaleX: 0,
    secScaleY: 0,
    scale: 0,
    numpadState: "disabled",
    preScale: 0,
    padding: 8,
  },

  hierarchy: {
    isMaster: true,
    pathInMaster: null,
    slavedIFrame: null,
  },

  _toggleOpen: function (open) {
    if (document.getElementById(this.activeOSK) === null) {
      this.insertKeyboard(this.activeOSK);
    }
    try {
      var kb = document.getElementById(this.activeOSK).parentElement;
      kb.style.zIndex = "9999999";
    } catch (e) {
      console.log("OSK not found");
      return;
    }
    if (open) {
      if (!this.hierarchy.isMaster) {
        window.parent.postMessage(
          JSON.stringify({
            directive: "master",
            command: {
              input: fxKeyboard.activeOSK,
              state: open,
            },
            xpath: this.hierarchy.pathInMaster,
            uri: this.settings.startingURL,
          }),
          "*"
        );
      } else {
        if (kb.style.display !== "block") {
          if (
            this.previousOSK !== null
              ? this.previousOSK !== this.activeOSK &&
                document.getElementById(fxKeyboard.previousOSK).parentElement
                  .style.display !== "none"
              : false
          ) {
            document.getElementById(
              this.previousOSK
            ).parentElement.style.display = "none";
          }
          kb.style.display = "block";
          this.previousOSK = this.activeOSK;
        }
        // kb.style.maxWidth =
        //   this.getMaxWidth(this.activeOSK) * this.settings.scale + "px";
        // kb.style.padding = this.settings.padding * this.settings.scale + "px";
        // kb.style.fontFamily = "arial,sans-serif";
        // kb.style.color = "#000000";
        // kb.style.fontSize = 35 * this.settings.scale + "px";
        // kb.style.borderRadius = 5 * this.settings.scale + "px";
        // for (const element of kb.childNodeschildNodes) {
        //   for (const chNodes of element.childNodes) {
        //     if (chNodes.id === "fxkey-ptext-" + this.activeOSK) {
        //       chNodes.style.width = "100%";
        //       chNodes.style.height =
        //         this.getInputHeight() * this.settings.scale + "px";
        //     } else {
        //       chNodes.style.width =
        //         this.getKeyHeight() * this.settings.scale + "px";
        //     }
        //     chNodes.style.margin =
        //       this.settings.padding * (this.settings.scale / 2) + "px";
        //     chNodes.style.borderRadius = 5 * this.settings.scale + "px";
        //   }
        // }
      }
      if (document.getElementById("fxkey-ptext-" + this.activeOSK)) {
        document.getElementById("fxkey-ptext-" + this.activeOSK).textContent =
          document.activeElement.value;
      }
    } else {
      if (!this.hierarchy.isMaster) {
        window.parent.postMessage(
          JSON.stringify({
            directive: "master",
            command: { input: this.activeOSK, state: open },
          }),
          "*"
        );
      } else {
        kb.style.display = "none";
        this.focusElement = null;
      }
    }
  },

  _isOSKOpen: function () {
    var kb = document.getElementById(this.activeOSK).parentElement;
    return kb != null ? kb.style.display === "block" : false;
  },

  /*
      states:
      0 - normal
      1 - shift on
      2 - shift lock
      3 - alt gr
      */
  state: 0,
  lastPress: null,
  keepOpen: false,
  focusElement: null,
  inputTypes: { numpad: "fxnumpad", keyboard: "fxkeyboard" },
  previousOSK: null,
  oldValue: null,
  activeOSK: null,

  _setSpecialFunctions: function (key, obj) {
    if (obj.label !== "") {
      key.onmousedown = function () {
        key.style.backgroundColor = "rgb(150,150,150)";
      };
      key.onmouseenter = function () {
        key.style.backgroundColor = "rgb(200,200,200)";
      };
      key.onmouseout = function () {
        key.style.backgroundColor = "rgb(255,255,255)";
      };
    }
    if (obj.label === "") {
      key.style.backgroundColor = "rgb(200,200,200)";
    } else if (obj.label === "⇧") {
      key.onmouseup = function () {
        if (fxKeyboard.state !== 1) {
          key.style.backgroundColor = "rgb(200,200,200)";
          key.onmouseout = function () {
            key.style.backgroundColor = "rgb(200,200,200)";
          };
          fxKeyboard.state = 1;
        } else {
          fxKeyboard.state = 0;
        }
        fxKeyboard._setShift();
      };
    } else if (obj.label === "⇪") {
      key.onmouseup = function () {
        if (fxKeyboard.state !== 2) {
          key.style.backgroundColor = "rgb(200,200,200)";
          key.onmouseout = function () {
            key.style.backgroundColor = "rgb(200,200,200)";
          };
          fxKeyboard.state = 2;
        } else {
          fxKeyboard.state = 0;
        }
        fxKeyboard._setShiftLock();
      };
    } else if (obj.label === "AltGr") {
      key.onmouseup = function () {
        if (fxKeyboard.state !== 3) {
          key.style.backgroundColor = "rgb(200,200,200)";
          key.onmouseout = function () {
            key.style.backgroundColor = "rgb(200,200,200)";
          };
          fxKeyboard.state = 3;
        } else {
          fxKeyboard.state = 0;
        }
        fxKeyboard._setAltGr();
      };
    } else if (obj.label === "←") {
      key.onmouseup = function () {
        fxKeyboard._sendKey(obj.label);
        key.style.backgroundColor = "rgb(255,255,255)";
      };
    } else if (obj.label === " ") {
      key.onmouseup = function () {
        fxKeyboard._sendKey(" ");
        key.style.backgroundColor = "rgb(255,255,255)";
      };
    } else if (obj.label === "✓") {
      key.style.backgroundColor = "rgb(0,255,0)";
      key.onmouseup = function () {
        fxKeyboard.oldValue = null;
        fxKeyboard.focusElement.blur();
        fxKeyboard._toggleOpen(false);
        fxKeyboard.focusElement = null;
        key.style.backgroundColor = "rgb(255,255,255)";
        fxKeyboard.lastPress = "apply";
      };
      key.onmouseout = function () {
        key.style.backgroundColor = "rgb(0,255,0)";
      };
    } else if (obj.label === "✖") {
      key.style.backgroundColor = "rgb(255,0,0)";
      key.onmouseup = function () {
        fxKeyboard.focusElement.value = fxKeyboard.oldValue;
        fxKeyboard.oldValue = null;
        fxKeyboard.focusElement.dispatchEvent(
          new Event("keydown", { bubbles: true, cancelable: true })
        );
        fxKeyboard.focusElement.dispatchEvent(
          new Event("keypress", { bubbles: true, cancelable: true })
        );
        fxKeyboard.focusElement.dispatchEvent(
          new Event("keyup", { bubbles: true, cancelable: true })
        );
        fxKeyboard.focusElement.dispatchEvent(
          new Event("input", { bubbles: true, cancelable: true })
        );
        fxKeyboard.focusElement.dispatchEvent(
          new Event("change", { bubbles: true, cancelable: true })
        );
        fxKeyboard.focusElement.blur();
        fxKeyboard._toggleOpen(false);
        fxKeyboard.focusElement = null;
        key.style.backgroundColor = "rgb(255,255,255)";
        fxKeyboard.lastPress = "cancel";
      };
      key.onmouseout = function () {
        key.style.backgroundColor = "rgb(255,0,0)";
      };
    } else if (obj.label === "⏎") {
      key.onmouseup = function () {
        key.style.backgroundColor = "rgb(255,255,255)";
        document.activeElement.form.submit();
        fxKeyboard._sendKey(obj.label);
      };
    } else if (obj.label === "↑") {
      key.onmouseup = function () {
        key.style.backgroundColor = "rgb(255,255,255)";
        var focussableElements =
          'input:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
        if (document.activeElement && document.activeElement.form) {
          var focussable = Array.prototype.filter.call(
            document.activeElement.form.querySelectorAll(focussableElements),
            function (element) {
              return (
                element.offsetWidth > 0 ||
                element.offsetHeight > 0 ||
                element === document.activeElement
              );
            }
          );
          var index = focussable.indexOf(document.activeElement);
          focussable[index - 1 >= focussable.length ? 0 : index - 1].focus();
        }
      };
    } else if (obj.label === "↓") {
      key.onmouseup = function () {
        key.style.backgroundColor = "rgb(255,255,255)";
        var focussableElements =
          'input:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
        if (document.activeElement && document.activeElement.form) {
          var focussable = Array.prototype.filter.call(
            document.activeElement.form.querySelectorAll(focussableElements),
            function (element) {
              return (
                element.offsetWidth > 0 ||
                element.offsetHeight > 0 ||
                element === document.activeElement
              );
            }
          );
          var index = focussable.indexOf(document.activeElement);
          focussable[index + 1 >= focussable.length ? 0 : index + 1].focus();
        }
      };
    } else {
      if (fxKeyboard.state === 1) {
        fxKeyboard.state = 0;
        fxKeyboard._setShift();
      } else if (fxKeyboard.state === 3) {
        fxKeyboard.state = 0;
        fxKeyboard._setAltGr();
      }
    }

    return key;
  },

  _setShift: function () {
    if (this.state === 1) {
      var shiftLockKey = document.getElementById("fxkey-shiftlock");
      shiftLockKey.style.backgroundColor = "rgb(255,255,255)";
      shiftLockKey.onmouseout = function () {
        shiftLockKey.style.backgroundColor = "rgb(255,255,255)";
      };
      var altGrKey = document.getElementById("fxkey-altgr");
      altGrKey.style.backgroundColor = "rgb(255,255,255)";
      altGrKey.onmouseout = function () {
        altGrKey.style.backgroundColor = "rgb(255,255,255)";
      };

      var terElements = document.getElementsByClassName("fxkey-tertiary");
      var secElements = document.getElementsByClassName("fxkey-secondary");
      var priElements = document.getElementsByClassName("fxkey-primary");
      for (var i = 0; terElements.length > i; i++) {
        terElements[i].style.display = "none";
      }
      for (var i = 0; secElements.length > i; i++) {
        secElements[i].style.display = "flex";
      }
      for (var i = 0; priElements.length > i; i++) {
        priElements[i].style.display = "none";
      }
    } else {
      var shiftKey = document.getElementById("fxkey-shift");
      shiftKey.style.backgroundColor = "rgb(255,255,255)";
      shiftKey.onmouseout = function () {
        shiftKey.style.backgroundColor = "rgb(255,255,255)";
      };

      var terElements = document.getElementsByClassName("fxkey-tertiary");
      var secElements = document.getElementsByClassName("fxkey-secondary");
      var priElements = document.getElementsByClassName("fxkey-primary");
      for (var i = 0; terElements.length > i; i++) {
        terElements[i].style.display = "none";
      }
      for (var i = 0; secElements.length > i; i++) {
        secElements[i].style.display = "none";
      }
      for (var i = 0; priElements.length > i; i++) {
        priElements[i].style.display = "flex";
      }
    }
  },

  _setShiftLock: function () {
    if (this.state === 2) {
      var shiftKey = document.getElementById("fxkey-shift");
      shiftKey.style.backgroundColor = "rgb(255,255,255)";
      shiftKey.onmouseout = function () {
        shiftKey.style.backgroundColor = "rgb(255,255,255)";
      };
      var altGrKey = document.getElementById("fxkey-altgr");
      altGrKey.style.backgroundColor = "rgb(255,255,255)";
      altGrKey.onmouseout = function () {
        altGrKey.style.backgroundColor = "rgb(255,255,255)";
      };

      var terElements = document.getElementsByClassName("fxkey-tertiary");
      var secElements = document.getElementsByClassName("fxkey-secondary");
      var priElements = document.getElementsByClassName("fxkey-primary");
      for (var i = 0; terElements.length > i; i++) {
        terElements[i].style.display = "none";
      }
      for (var i = 0; secElements.length > i; i++) {
        secElements[i].style.display = "flex";
      }
      for (var i = 0; priElements.length > i; i++) {
        priElements[i].style.display = "none";
      }
    } else {
      var shiftLockKey = document.getElementById("fxkey-shiftlock");
      shiftLockKey.style.backgroundColor = "rgb(255,255,255)";
      shiftLockKey.onmouseout = function () {
        shiftLockKey.style.backgroundColor = "rgb(255,255,255)";
      };

      var terElements = document.getElementsByClassName("fxkey-tertiary");
      var secElements = document.getElementsByClassName("fxkey-secondary");
      var priElements = document.getElementsByClassName("fxkey-primary");
      for (var i = 0; terElements.length > i; i++) {
        terElements[i].style.display = "none";
      }
      for (var i = 0; secElements.length > i; i++) {
        secElements[i].style.display = "none";
      }
      for (var i = 0; priElements.length > i; i++) {
        priElements[i].style.display = "flex";
      }
    }
  },

  _setAltGr: function () {
    if (this.state === 3) {
      var shiftKey = document.getElementById("fxkey-shift");
      shiftKey.style.backgroundColor = "rgb(255,255,255)";
      shiftKey.onmouseout = function () {
        shiftKey.style.backgroundColor = "rgb(255,255,255)";
      };
      var shiftLockKey = document.getElementById("fxkey-shiftlock");
      shiftLockKey.style.backgroundColor = "rgb(255,255,255)";
      shiftLockKey.onmouseout = function () {
        shiftLockKey.style.backgroundColor = "rgb(255,255,255)";
      };

      var terElements = document.getElementsByClassName("fxkey-tertiary");
      var secElements = document.getElementsByClassName("fxkey-secondary");
      var priElements = document.getElementsByClassName("fxkey-primary");
      for (var i = 0; terElements.length > i; i++) {
        terElements[i].style.display = "flex";
      }
      for (var i = 0; secElements.length > i; i++) {
        secElements[i].style.display = "none";
      }
      for (var i = 0; priElements.length > i; i++) {
        priElements[i].style.display = "none";
      }
    } else {
      var altGrKey = document.getElementById("fxkey-altgr");
      altGrKey.style.backgroundColor = "rgb(255,255,255)";
      altGrKey.onmouseout = function () {
        altGrKey.style.backgroundColor = "rgb(255,255,255)";
      };

      var terElements = document.getElementsByClassName("fxkey-tertiary");
      var secElements = document.getElementsByClassName("fxkey-secondary");
      var priElements = document.getElementsByClassName("fxkey-primary");
      for (var i = 0; terElements.length > i; i++) {
        terElements[i].style.display = "none";
      }
      for (var i = 0; secElements.length > i; i++) {
        secElements[i].style.display = "none";
      }
      for (var i = 0; priElements.length > i; i++) {
        priElements[i].style.display = "flex";
      }
    }
  },

  _sendKey: function (character) {
    if (
      fxKeyboard.hierarchy.isMaster &&
      fxKeyboard.hierarchy.slavedIFrame != null
    ) {
      fxKeyboard.hierarchy.slavedIFrame.contentWindow.postMessage(
        JSON.stringify({
          directive: "slave",
          command: "sendKey",
          key: character,
        }),
        "*"
      );
    } else {
      switch (character) {
        case "←":
          fxKeyboard.focusElement.value = fxKeyboard.focusElement.value.slice(
            0,
            -1
          );
          break;
        default:
          fxKeyboard.focusElement.value =
            fxKeyboard.focusElement.value === null
              ? "" + character
              : fxKeyboard.focusElement.value + character;
          if (fxKeyboard.state === 1) {
            fxKeyboard.state = 0;
            fxKeyboard._setShift();
          }
          if (fxKeyboard.state === 3) {
            fxKeyboard.state = 0;
            fxKeyboard._setAltGr();
          }
      }

      fxKeyboard.focusElement.dispatchEvent(
        new Event("keydown", { bubbles: true, cancelable: true })
      );
      fxKeyboard.focusElement.dispatchEvent(
        new Event("keypress", { bubbles: true, cancelable: true })
      );
      fxKeyboard.focusElement.dispatchEvent(
        new Event("keyup", { bubbles: true, cancelable: true })
      );
      fxKeyboard.focusElement.dispatchEvent(
        new Event("input", { bubbles: true, cancelable: true })
      );
      fxKeyboard.focusElement.dispatchEvent(
        new Event("change", { bubbles: true, cancelable: true })
      );
    }
  },

  _buildKey: function (char, level) {
    var key = document.createElement("div");
    key.style.width = this.getKeyHeight() * this.settings.scale + "px";
    key.style.height = this.getKeyHeight() * this.settings.scale + "px";
    key.style.margin = this.settings.padding * (this.settings.scale / 2) + "px";
    if (level === 0) {
      key.id = "fxkey-primary";
      key.className = "fxkey-primary";
      key.style.display = "flex";
    } else if (level === 1) {
      key.id = "fxkey-secondary";
      key.className = "fxkey-secondary";
      key.style.display = "none";
    } else {
      key.id = "fxkey-tertiary";
      key.className = "fxkey-tertiary";
      key.style.display = "none";
    }
    key.style.alignItems = "center";
    key.style.justifyContent = "center";
    key.style.borderRadius = 5 * this.settings.scale + "px";
    key.style.cursor = "pointer";
    if (char === "") {
      key.style.backgroundColor = "rgb(200,200,200)";
    } else {
      key.style.backgroundColor = "rgb(255,255,255)";
      key.textContent = char;
      key.onmouseenter = function () {
        key.style.backgroundColor = "rgb(200,200,200)";
      };
      key.onmouseout = function () {
        key.style.backgroundColor = "rgb(255,255,255)";
      };
      key.onmousedown = function () {
        key.style.backgroundColor = "rgb(150,150,150)";
      };
      key.onmouseup = function () {
        key.style.backgroundColor = "rgb(200,200,200)";
        fxKeyboard._sendKey(char);
      };
    }
    return key;
  },

  _buildSpecialKey: function (obj) {
    var key = document.createElement("div");
    if (typeof obj.width === "undefined") {
      obj.width = 1;
    }
    if (obj.width > 1) {
      key.style.width =
        this.getKeyHeight() * this.settings.scale * obj.width +
        2 *
          this.settings.padding *
          (this.settings.scale / 2) *
          (obj.width - 1) +
        "px";
    } else {
      key.style.width = this.getKeyHeight() * this.settings.scale + "px";
    }
    key.style.height = this.getKeyHeight() * this.settings.scale + "px";
    key.style.margin = this.settings.padding * (this.settings.scale / 2) + "px";
    key.style.display = "flex";
    key.style.alignItems = "center";
    key.style.justifyContent = "center";
    key.style.cursor = "pointer";
    key.style.flexGrow = obj.flex;
    if (obj.special !== "") {
      key.id = "fxkey-" + obj.special;
    } else {
      key.id = "fxkey-" + obj.label.toLowerCase();
    }
    key.style.borderRadius = 5 * this.settings.scale + "px";
    if (typeof obj.label === "undefined") {
      key.style.backgroundColor = "rgb(200,200,200)";
    } else {
      key.style.backgroundColor = "rgb(255,255,255)";
      key = this._setSpecialFunctions(key, obj);
      key.textContent = obj.label;
    }
    return key;
  },

  insertKeyboard: function (inputType) {
    var background;
    var keyboard;
    var max_width = this.getMaxWidth(inputType);
    var max_height = this.getMaxHeight(inputType);
    var language = (navigator.language || navigator.userLanguage).slice(0, 2);
    switch (inputType) {
      case fxKeyboard.inputTypes.keyboard:
        if (language === "de") {
          var keys = JSON.parse(FxKeyboardDe);
        } else if (language === "fr") {
          var keys = JSON.parse(FxKeyboardFr);
        } else {
          var keys = JSON.parse(FxKeyboardEn);
        }
        if (document.getElementById(inputType)) {
          return;
        }
        break;
      case fxKeyboard.inputTypes.numpad:
        if (language === "de") {
          var keys = JSON.parse(FxKeyNumpadDe);
        } else if (language === "fr") {
          var keys = JSON.parse(FxKeyNumpadFr);
        } else {
          var keys = JSON.parse(FxKeyNumpadEn);
        }
        if (document.getElementById(inputType)) {
          return;
        }
        break;
    }
    if (
      !document.getElementById(inputType) ||
      this.settings.preScale !== this.settings.scale
    ) {
      if (this.settings.preScale !== this.settings.scale) {
        var rows = document.getElementsByClassName(inputType + "-r");
        if (rows.length > 0) {
          for (var row in rows) {
            document.body.removeChild(rows[row]);
          }
        }
      }
      background = document.createElement("div");
      background.style.width = "100%";
      background.style.height = "100%";
      background.style.backgroundColor = "rgba(0,0,0,0.6)";
      background.style.position = "absolute";
      background.style.top = 0;
      background.style.left = 0;
      background.style.zIndex = "9999999";
      background.style.display = "none"; //hidden on insert.

      keyboard = document.createElement("div");
      keyboard.setAttribute("tabIndex", "-1");
      keyboard.style.maxWidth = max_width * this.settings.scale + "px";
      keyboard.style.padding =
        this.settings.padding * this.settings.scale + "px";
      keyboard.style.fontFamily = "arial,sans-serif";
      keyboard.style.color = "#000000";
      keyboard.style.fontSize = 35 * this.settings.scale + "px";
      keyboard.style.borderRadius = 5 * this.settings.scale + "px";
      keyboard.style.textAlign = "center";
      keyboard.style.position = "fixed";
      keyboard.style.left = "50%";
      keyboard.style.top = "50%";
      keyboard.style.transform = "translate(-50%, -50%)";
      keyboard.style.backgroundColor = "rgba(0,0,0,0.6)";
      keyboard.style.display = "block";
      keyboard.id = inputType;
      background.appendChild(keyboard);

      var divText = document.createElement("div");
      divText.style.display = "flex";
      divText.style.alignItems = "right";
      divText.style.justifyContent = "center";
      divText.style.overflowX = "hidden";
      divText.style.backgroundColor = "white";
      divText.style.margin =
        this.settings.padding * (this.settings.scale / 2) + "px";
      keyboard.appendChild(divText);

      var paragraph = document.createElement("p");
      paragraph.id = "fxkey-ptext-" + inputType;
      paragraph.style.display = "flex";
      paragraph.style.alignItems = "center";
      paragraph.style.justifyContent = "center";
      paragraph.style.width = "100%";
      paragraph.style.height = this.getKeyHeight() * this.settings.scale + "px";
      paragraph.style.margin = 0;
      divText.appendChild(paragraph);

      for (var row in keys.main) {
        var keyRow = document.createElement("div");
        keyRow.style.display = "flex";
        keyRow.style.justifyContent = "center";
        keyRow.id = inputType + "-r";
        keyRow.class = inputType + "-r";
        for (var button in keys.main[row]) {
          if (keys.main[row][button].length === 0) {
            keys.main[row][button] = [""];
          }
          if (keys.main[row][button][0].constructor === {}.constructor) {
            var specialKey = this._buildSpecialKey(keys.main[row][button][0]);
            keyRow.appendChild(specialKey);
          } else {
            var primaryKey = this._buildKey(keys.main[row][button][0], 0);
            keyRow.appendChild(primaryKey);

            var secondaryKey = this._buildKey("", 1);
            if (keys.main[row][button].length > 1) {
              var secondaryKey = this._buildKey(keys.main[row][button][1], 1);
            }
            keyRow.appendChild(secondaryKey);

            var tertiaryKey = this._buildKey("", 2);
            if (keys.main[row][button].length > 2) {
              var tertiaryKey = this._buildKey(keys.main[row][button][2], 2);
            }
            keyRow.appendChild(tertiaryKey);
          }
        }
        keyboard.appendChild(keyRow);
      }
    }
    document.body.appendChild(background);
    this.settings.preScale = this.settings.scale;
    this._toggleOpen(false);
    this.focusElement = null;
    this.oldValue = null;
  },

  getMaxWidth: function (inputType) {
    if (inputType === fxKeyboard.inputTypes.keyboard) {
      return window.innerWidht;
    }
    if (inputType === fxKeyboard.inputTypes.numpad) {
      return 275;
    }
  },

  getMaxHeight: function (inputType) {
    if (inputType === fxKeyboard.inputTypes.keyboard) {
      return window.innerWidth * 0.32;
    }
    if (inputType === fxKeyboard.inputTypes.numpad) {
      return 375;
    }
  },

  getKeyHeight: function (inputType) {
    return window.innerWidth * 0.05;
  },

  getInputHeight: function (inputType) {
    return window.innerWidth * 0.04;
  },
};

browser.runtime.onMessage.addListener(function begin(message) {
  var msg = {};
  try {
    msg = JSON.parse(str);
  } catch (e) {
    return;
  }
  if (msg.directive === "insertKeyboard") {
    if (fxKeyboard.hierarchy.isMaster) {
      window.parent.postMessage(
        JSON.stringify({
          directive: "master",
          command: "ping",
          uri: fxKeyboard.settings.startingURL,
        }),
        "*"
      );
    }
    if (
      document.getElementById("fxkeyboard") === null &&
      fxKeyboard.hierarchy.isMaster
    ) {
      fxKeyboard.activeOSK = fxKeyboard.inputTypes.keyboard;
      fxKeyboard.insertKeyboard(fxKeyboard.inputTypes.keyboard);
    }
  }
});

window.addEventListener(
  "message",
  function messageReceived(event) {
    var msg = {};
    try {
      msg = JSON.parse(str);
    } catch (e) {
      return;
    }
    if (msg.directive === "slave") {
      switch (msg.command) {
        case "initialize":
          var preOpen = fxKeyboard._isOSKOpen();
          if (fxKeyboard.hierarchy.isMaster) {
            fxKeyboard._toggleOpen(false);
            fxKeyboard.focusElement = null;
            fxKeyboard.oldValue = null;
          }
          fxKeyboard.hierarchy.isMaster = false;
          fxKeyboard.hierarchy.pathInMaster = msg.xpath;
          if (preOpen) {
            fxKeyboard._toggleOpen(preOpen);
          }
          break;
        case "sendKey":
          fxKeyboard._sendKey(msg.key);
          break;
        case "updateXPath":
          fxKeyboard.hierarchy.pathInMaster = msg.xpath;
          break;
      }
    }

    if (msg.directive === "master" && fxKeyboard.hierarchy.isMaster) {
      if (typeof msg.command === "object") {
        fxKeyboard.activeOSK = msg.command.input;
        if (msg.command.state) {
          fxKeyboard.hierarchy.slavedIFrame = document.evaluate(
            msg.xpath,
            document.body,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue;
          if (fxKeyboard.hierarchy.slavedIFrame == null) {
            fxKeyboard.hierarchy.slavedIFrame = document.querySelector(
              'iframe[src="' + msg.uri + '"]'
            );
            fxKeyboard.hierarchy.slavedIFrame.contentWindow.postMessage(
              JSON.stringify({
                directive: "slave",
                command: "updateXPath",
                xpath: xpath.getXPathOfElement(
                  fxKeyboard.hierarchy.slavedIFrame
                ),
              }),
              "*"
            );
          }
          fxKeyboard._toggleOpen(msg.command.state);
        } else {
          fxKeyboard._toggleOpen(msg.command.state);
          fxKeyboard.hierarchy.slavedIFrame = null;
        }
      } else if (msg.command == "ping") {
        var iframe = document.querySelector('iframe[src="' + msg.uri + '"]');
        if (iframe !== null) {
          iframe.contentWindow.postMessage(
            JSON.stringify({
              directive: "slave",
              command: "initialize",
              xpath: xpath.getXPathOfElement(iframe),
            }),
            "*"
          );
        }
      }
    }
  },
  false
);

document.addEventListener("mousedown", function load(clicked) {
  if (clicked.target.id.indexOf("fxkey") !== -1) {
    clicked.preventDefault();
  }
});

document.addEventListener("mouseup", function load(clicked) {
  if (clicked.target.id.indexOf("fxkey") !== -1) {
    clicked.preventDefault();
  }

  oskAction(clicked);
});

document.addEventListener("focusin", function load(clicked) {
  if (clicked.target.id.indexOf("fxkey") !== -1) {
    clicked.preventDefault();
  }

  oskAction(clicked);
});

// document.addEventListener("focusout", function load(clicked) {
//   if (fxKeyboard.focusElement !== null) {
//     fxKeyboard.oldValue = null;
//     fxKeyboard.focusElement.blur();
//     fxKeyboard._toggleOpen(false);
//     fxKeyboard.focusElement = null;
//     fxKeyboard.lastPress = "apply";
//   }
// });

var textInputTypes = {
  input: "",
  select: "",
  option: "",
  textarea: "",
  textbox: "",
  text: "",
  password: "",
  url: "",
  color: "",
  date: "",
  datetime: "",
  "datetime-local": "",
  email: "",
  month: "",
  search: "",
};

var integerInputTypes = {
  number: "",
  range: "",
  tel: "",
  time: "",
  week: "",
};

var integerInputClasses = {
  numeric: "",
};

function oskAction(clicked) {
  if (
    (fxKeyboard.settings.numpadState === "disabled"
      ? document.activeElement.type in textInputTypes ||
        document.activeElement.type in integerInputTypes ||
        document.activeElement.classList.contains("numeric")
      : document.activeElement.type in textInputTypes &&
        !document.activeElement.classList.contains("numeric")) &&
    fxKeyboard.lastPress !== "cancel" &&
    fxKeyboard.lastPress !== "apply"
  ) {
    fxKeyboard.focusElement = document.activeElement;
    if (fxKeyboard.oldValue === null) {
      fxKeyboard.oldValue = fxKeyboard.focusElement.value;
    }
    fxKeyboard.activeOSK = fxKeyboard.inputTypes.keyboard;
    fxKeyboard._toggleOpen(true);
  } else if (
    (fxKeyboard.settings.numpadState === "auto"
      ? document.activeElement.type in integerInputTypes ||
        document.activeElement.classList.contains("numeric")
      : false) &&
    fxKeyboard.lastPress !== "cancel" &&
    fxKeyboard.lastPress !== "apply" &&
    fxKeyboard.settings.numpadState !== "disabled"
  ) {
    fxKeyboard.focusElement = document.activeElement;
    if (fxKeyboard.oldValue === null) {
      fxKeyboard.oldValue = fxKeyboard.focusElement.value;
    }
    fxKeyboard.activeOSK = fxKeyboard.inputTypes.numpad;
    fxKeyboard._toggleOpen(true);
  } else {
    if (clicked.target.id.indexOf("fxkey") === -1) {
    }
    fxKeyboard.lastPress = null;
  }
}

document.addEventListener("dragstart", function load(clicked) {
  if (clicked.target.id.indexOf("fxkey") !== -1) {
    clicked.preventDefault();
  }
});

document.addEventListener("dragend", function load(clicked) {
  if (clicked.target.id.indexOf("fxkey") !== -1) {
    clicked.preventDefault();
  }
});
