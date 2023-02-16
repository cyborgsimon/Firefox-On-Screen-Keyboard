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
      numpadState: "auto",
    });
    settings.numpadState = "auto";
  }

  var zoomValue = window.devicePixelRatio;
  fxKeyboard.settings.scale = settings.scaleValue / 100;
  fxKeyboard.settings.numpadState = settings.numpadState;
}

function onError(error) {
  console.log("Failed to get stored data from internal storage");
}

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
  defaultFlex: "10",
  main: [
    [
      [{ label: "", flex: 1 }],
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
      [{ label: "←", flex: 1, special: 8, type: "repeat" }], // backspace
      [{ label: "", flex: 1 }],
    ],
    [
      [{ label: "", flex: 1 }],
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
      ["&#91;", "&#123;"],
      ["&#93;", "&#125;"],
      [{ label: "", flex: 1 }],
    ],
    [
      [{ label: "⇪", flex: 1, special: "shiftlock" }],
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
      [{ label: "", flex: 1 }],
    ],
    [
      [{ label: "⇧", flex: 1, special: "shift" }],
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
      [{ label: "", flex: 1 }],
    ],
    [
      [{ label: " ", flex: 1, special: 32 }], // space
      [{ label: "✓", special: "applyFX" }],
      [{ label: "✖", special: "cancelFX" }],
    ],
  ],
});

FxKeyNumpadEn = JSON.stringify({
  name: "English",
  locale: "en",
  defaultFlex: "10",
  main: [
    [["1"], ["2"], ["3"]],
    [["4"], ["5"], ["6"]],
    [["7"], ["8"], ["9"]],
    [["0"], [{ label: "←", special: 8, flex: 1, type: "repeat" }]],
    [[{ label: "✖", special: "cancelFX", flex: 1 }]],
  ],
});

var FxKeyboardDe = JSON.stringify({
  name: "German",
  locale: "de",
  defaultFlex: "10",
  main: [
    [
      [{ label: "", flex: 1 }],
      ["1", "!"],
      ["2", '"'],
      ["3", "§"],
      ["4", "$"],
      ["5", "%"],
      ["6", "&"],
      ["7", "/"],
      ["8", "("],
      ["9", ")"],
      ["0", "="],
      ["ß", "?"],
      ["&#91;", "&#123;"],
      ["&#93;", "&#125;"],
      [{ label: "←", flex: 1, special: 8, type: "repeat" }], // backspace
      [{ label: "", flex: 1 }],
    ],
    [
      [{ label: "", flex: 1 }],
      ["q", "Q"],
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
      ["+", "*"],
      [{ label: "", flex: 2 }],
    ],
    [
      [{ label: "⇪", flex: 1, special: "shiftlock" }],
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
      [{ label: "", flex: 1 }],
    ],
    [
      [{ label: "⇧", flex: 1, special: "shift" }],
      ["y", "Y"],
      ["x", "X"],
      ["c", "C"],
      ["v", "V"],
      ["b", "B"],
      ["n", "N"],
      ["m", "M"],
      [",", ";"],
      [".", ":"],
      ["-", "_"],
      [{ label: "", flex: 1 }],
    ],
    [
      [{ label: " ", flex: 1, special: 32 }], // space
      [{ label: "✓", special: "applyFX" }],
      [{ label: "✖", special: "cancelFX" }],
    ],
  ],
});

FxKeyNumpadDe = JSON.stringify({
  name: "German",
  locale: "de",
  defaultFlex: "10",
  main: [
    [["1"], ["2"], ["3"]],
    [["4"], ["5"], ["6"]],
    [["7"], ["8"], ["9"]],
    [["0"], [{ label: "←", special: 8, flex: 1, type: "repeat" }]],
    [[{ label: "✖", special: "cancelFX", flex: 1 }]],
  ],
});

var FxKeyboardFr = JSON.stringify({
  name: "French",
  locale: "fr",
  defaultFlex: "10",
  main: [
    [
      [{ label: "", flex: 1 }],
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
      [{ label: "←", flex: 1, special: 8, type: "repeat" }], // backspace
      [{ label: "", flex: 1 }],
    ],
    [
      [{ label: "", flex: 1 }],
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
      ["&#91;", "&#123;"],
      ["&#93;", "&#125;"],
      [{ label: "", flex: 2 }],
    ],
    [
      [{ label: "⇪", flex: 1, special: "shiftlock" }],
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
      [{ label: "", flex: 1 }],
    ],
    [
      [{ label: "⇧", flex: 1, special: "shift" }],
      ["w", "W"],
      ["x", "X"],
      ["c", "C"],
      ["v", "V"],
      ["b", "B"],
      ["n", "N"],
      [",", "?"],
      [";", "."],
      [":", "/"],
      ["!", "#"],
      [{ label: "", flex: 1 }],
    ],
    [
      [{ label: "✓", special: "applyFX" }],
      [{ label: "✖", special: "cancelFX" }],
      [{ label: " ", flex: 1, special: 32 }], // space
    ],
  ],
});

FxKeyNumpadFr = JSON.stringify({
  name: "French",
  locale: "fr",
  defaultFlex: "10",
  main: [
    [["1"], ["2"], ["3"]],
    [["4"], ["5"], ["6"]],
    [["7"], ["8"], ["9"]],
    [["0"], [{ label: "←", special: 8, flex: 1, type: "repeat" }]],
    [[{ label: "✖", special: "cancelFX", flex: 1 }]],
  ],
});

var FxKeyMap = JSON.stringify({
  "`": 192,
  "~": 192,
  1: 49,
  "!": 49,
  2: 50,
  "@": 50,
  3: 51,
  "#": 51,
  4: 52,
  $: 52,
  5: 53,
  "%": 53,
  6: 54,
  "^": 54,
  7: 55,
  "&": 55,
  8: 56,
  "*": 56,
  9: 57,
  "(": 57,
  0: 48,
  ")": 48,
  "-": 173,
  _: 173,
  "=": 61,
  "+": 61,
  "←": 8,
  q: 81,
  w: 87,
  e: 69,
  r: 82,
  t: 84,
  y: 89,
  u: 85,
  i: 73,
  o: 79,
  p: 80,
  "[": 219,
  "{": 219,
  "}": 221,
  "]": 221,
  '"': 220,
  "|": 220,
  a: 65,
  s: 83,
  d: 68,
  f: 70,
  g: 71,
  h: 72,
  j: 74,
  k: 75,
  l: 76,
  ";": 59,
  ":": 59,
  "'": 222,
  '"': 222,
  "⏎": 13,
  z: 90,
  x: 88,
  c: 67,
  v: 86,
  b: 66,
  n: 78,
  m: 77,
  ",": 188,
  "<": 188,
  ".": 190,
  ">": 190,
  "/": 191,
  "?": 191,
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
    numpadState: "auto",
    preScale: 0,
    padding: 8,
    kb_max_width: window.innerWidth,
    kb_max_height: window.innerWidth * 0.32,
    np_max_width: 220,
    np_max_height: 375,
    key_height: window.innerWidth * 0.05,
    input_height: window.innerWidth * 0.045,
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
      var kb = document.getElementById(this.activeOSK);
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
                document.getElementById(fxKeyboard.previousOSK).style
                  .display !== "none"
              : false
          ) {
            document.getElementById(this.previousOSK).style.display = "none";
          }
          kb.style.display = "block";
          this.previousOSK = this.activeOSK;
        }
        kb.style.width =
          this.getMaxWidth(this.activeOSK) * this.settings.scale + "px";
        // kb.style.height =
        // this.getMaxHeight(this.activeOSK) * this.settings.scale + "px";
        kb.style.padding = this.settings.padding * this.settings.scale + "px";
        kb.style.fontFamily = "arial,sans-serif";
        kb.style.color = "#000000";
        kb.style.fontSize = 35 * this.settings.scale + "px";
        kb.style.borderRadius = 5 * this.settings.scale + "px";
        for (const element of kb.childNodes) {
          for (const chNodes of element.childNodes) {
            if (chNodes.id === "ptext") {
              chNodes.style.width = "100%";
              // chNodes.style.height =
              //   this.settings.input_height * this.settings.scale + "px";
            } else {
              chNodes.style.width =
                this.settings.key_height * this.settings.scale + "px";
            }
            chNodes.style.margin =
              this.settings.padding * (this.settings.scale / 2) + "px";
            chNodes.style.borderRadius = 5 * this.settings.scale + "px";
          }
        }
      }

      if (document.getElementById("ptext")) {
        document.getElementById("ptext").innerHTML =
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
    var kb = document.getElementById(this.activeOSK);
    return kb != null ? kb.style.display === "block" : false;
  },

  /*
      states:
      0 - normal
      1 - shift on
      2 - shift lock
      */
  state: 0,
  lastPress: null,
  keepOpen: false,
  focusElement: null,
  inputTypes: { numpad: "fxnumpad", keyboard: "fxkeyboard" },
  previousOSK: null,
  oldValue: null,
  activeOSK: null,

  _setSpecialFunctions: function (keyD, obj) {
    if (obj.label !== "") {
      keyD.onmousedown = function () {
        keyD.style.backgroundColor = "rgb(150,150,150)";
      };
      keyD.onmouseenter = function () {
        keyD.style.backgroundColor = "rgb(200,200,200)";
      };
      keyD.onmouseout = function () {
        keyD.style.backgroundColor = "rgb(255,255,255)";
      };
    }
    if (obj.label === "") {
      keyD.style.backgroundColor = "rgb(200,200,200)";
    } else if (obj.label === "⇧") {
      keyD.onmouseup = function () {
        if (fxKeyboard.state === 0) {
          keyD.style.backgroundColor = "rgb(200,200,200)";
          keyD.onmouseout = function () {
            keyD.style.backgroundColor = "rgb(200,200,200)";
          };
          fxKeyboard.state = 1;
        } else {
          fxKeyboard.state = 0;
        }
        fxKeyboard._setShift();
      };
    } else if (obj.label === "⇪") {
      keyD.onmouseup = function () {
        if (fxKeyboard.state === 0 || fxKeyboard.state === 1) {
          keyD.style.backgroundColor = "rgb(200,200,200)";
          keyD.onmouseout = function () {
            keyD.style.backgroundColor = "rgb(200,200,200)";
          };
          fxKeyboard.state = 2;
        } else {
          fxKeyboard.state = 0;
        }
        fxKeyboard._setShiftLock();
      };
    } else if (obj.label === "←") {
      keyD.onmouseup = function () {
        fxKeyboard._sendKey(obj.label);
        keyD.style.backgroundColor = "rgb(255,255,255)";
      };
    } else if (obj.label === " ") {
      keyD.onmouseup = function () {
        fxKeyboard._sendKey(" ");
        keyD.style.backgroundColor = "rgb(255,255,255)";
      };
    } else if (obj.label === "✓") {
      keyD.style.backgroundColor = "rgb(0,255,0)";
      keyD.onmouseup = function () {
        fxKeyboard._toggleOpen(false);
        keyD.style.backgroundColor = "rgb(255,255,255)";
        fxKeyboard.lastPress = "apply";
      };
      keyD.onmouseout = function () {
        keyD.style.backgroundColor = "rgb(0,255,0)";
      };
    } else if (obj.label === "✖") {
      keyD.style.backgroundColor = "rgb(255,0,0)";
      keyD.onmouseup = function () {
        fxKeyboard.focusElement.value = fxKeyboard.oldValue;
        fxKeyboard._toggleOpen(false);
        keyD.style.backgroundColor = "rgb(255,255,255)";
        fxKeyboard.lastPress = "cancel";
      };
      keyD.onmouseout = function () {
        keyD.style.backgroundColor = "rgb(255,0,0)";
      };
    } else if (obj.label === "⏎") {
      keyD.onmouseup = function () {
        keyD.style.backgroundColor = "rgb(255,255,255)";
        document.activeElement.form.submit();
        fxKeyboard._sendKey(obj.label);
      };
    } else if (obj.label === "↑") {
      keyD.onmouseup = function () {
        keyD.style.backgroundColor = "rgb(255,255,255)";
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
      keyD.onmouseup = function () {
        keyD.style.backgroundColor = "rgb(255,255,255)";
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
      }
    }

    return keyD;
  },

  _setShift: function () {
    if (this.state == 1) {
      var secElements = document.getElementsByClassName("fxkey-secondary");
      var priElements = document.getElementsByClassName("fxkey-primary");
      for (var i = 0; secElements.length > i; i++) {
        secElements[i].style.display = "flex";
      }
      for (var i = 0; priElements.length > i; i++) {
        priElements[i].style.display = "none";
      }
    } else {
      var secElements = document.getElementsByClassName("fxkey-secondary");
      var priElements = document.getElementsByClassName("fxkey-primary");
      var shiftK = document.getElementById("fxkey-shift");
      shiftK.style.backgroundColor = "rgb(255,255,255)";
      shiftK.onmouseout = function () {
        shiftK.style.backgroundColor = "rgb(255,255,255)";
      };
      for (var i = 0; secElements.length > i; i++) {
        secElements[i].style.display = "none";
      }
      for (var i = 0; priElements.length > i; i++) {
        priElements[i].style.display = "flex";
      }
    }
  },

  _setShiftLock: function () {
    if (this.state == 2) {
      var secElements = document.getElementsByClassName("fxkey-secondary");
      var priElements = document.getElementsByClassName("fxkey-primary");
      for (var i = 0; secElements.length > i; i++) {
        secElements[i].style.display = "flex";
      }
      for (var i = 0; priElements.length > i; i++) {
        priElements[i].style.display = "none";
      }
    } else {
      var secElements = document.getElementsByClassName("fxkey-secondary");
      var priElements = document.getElementsByClassName("fxkey-primary");
      var shiftK = document.getElementById("fxkey-shiftlock");
      shiftK.style.backgroundColor = "rgb(255,255,255)";
      shiftK.onmouseout = function () {
        shiftK.style.backgroundColor = "rgb(255,255,255)";
      };
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
        case "⏎":
          fxKeyboard.focusElement.dispatchEvent(
            new KeyboardEvent("beforeinput", {
              key: character,
              shiftKey: false,
              keyCode: JSON.parse(FxKeyMap)[character],
            })
          );
          fxKeyboard.focusElement.dispatchEvent(
            new KeyboardEvent("keydown", {
              key: character,
              shiftKey: false,
              code: character,
              keyCode: JSON.parse(FxKeyMap)[character],
            })
          );
          fxKeyboard.focusElement.dispatchEvent(
            new KeyboardEvent("keyup", {
              key: character,
              shiftKey: false,
              code: character,
              keyCode: JSON.parse(FxKeyMap)[character],
            })
          );
          if (fxKeyboard.focusElement.parentNode.nodeName === "FORM") {
            fxKeyboard.focusElement.parentNode.submit();
          }
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

  _buildKey: function (char, primary) {
    var key = document.createElement("div");
    key.style.width = this.settings.key_height * this.settings.scale + "px";
    key.style.height = this.settings.key_height * this.settings.scale + "px";
    key.style.margin = this.settings.padding * (this.settings.scale / 2) + "px";
    if (primary) {
      key.id = "fxkey-primary";
      key.className = "fxkey-primary";
      key.style.display = "flex";
    } else {
      key.id = "fxkey-secondary";
      key.className = "fxkey-secondary";
      key.style.display = "none";
    }
    key.style.alignItems = "center";
    key.style.justifyContent = "center";
    key.style.borderRadius = 5 * this.settings.scale + "px";
    key.style.cursor = "pointer";
    key.style.backgroundColor = "rgb(255,255,255)";
    key.innerHTML = char;
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
      if (char.indexOf("&#") !== -1) {
        char = key.innerHTML;
      }
      fxKeyboard._sendKey(char);
      if (fxKeyboard.state === 1) {
        fxKeyboard.state = 0;
        fxKeyboard._setShift();
      }
    };
    return key;
  },

  _buildKeyFlex: function (char, primary, flex) {
    var key = document.createElement("div");
    key.style.width = this.settings.key_height * this.settings.scale + "px";
    key.style.height = this.settings.key_height * this.settings.scale + "px";
    key.style.margin = this.settings.padding * (this.settings.scale / 2) + "px";
    if (primary) {
      key.id = "fxkey-primary";
      key.className = "fxkey-primary";
      key.style.display = "flex";
    } else {
      key.id = "fxkey-secondary";
      key.className = "fxkey-secondary";
      key.style.display = "none";
    }
    key.style.alignItems = "center";
    key.style.justifyContent = "center";
    key.style.borderRadius = 5 * this.settings.scale + "px";
    key.style.cursor = "pointer";
    key.style.flexGrow = flex;
    key.style.backgroundColor = "rgb(255,255,255)";
    key.innerHTML = char;
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
      if (char.indexOf("&#") !== -1) {
        char = key.innerHTML;
      }
      fxKeyboard._sendKey(char);
      if (fxKeyboard.state === 1) {
        fxKeyboard.state = 0;
        fxKeyboard._setShift();
      }
    };
    return key;
  },

  _buildSpecialKey: function (obj) {
    var key = document.createElement("div");
    key.style.width = this.settings.key_height * this.settings.scale + "px";
    key.style.height = this.settings.key_height * this.settings.scale + "px";
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
    key.style.backgroundColor = "rgb(255,255,255)";
    key = this._setSpecialFunctions(key, obj);
    key.innerHTML = obj.label;
    return key;
  },

  insertKeyboard: function (inputType) {
    var keyb;
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
    //create main Div
    keyb = document.createElement("div");
    // parse keyboard keys JSON

    keyb.setAttribute("tabIndex", "-1");
    keyb.style.backgroundColor = "rgba(0,0,0,0.6)";
    keyb.style.width = max_width * this.settings.scale + "px";
    keyb.style.height = max_height * this.settings.scale + "px";
    keyb.style.padding = this.settings.padding * this.settings.scale + "px";
    keyb.style.fontFamily = "arial,sans-serif";
    keyb.style.color = "#000000";
    keyb.style.fontSize = 35 * this.settings.scale + "px";
    keyb.style.borderRadius = 5 * this.settings.scale + "px";
    keyb.style.textAlign = "center";
    keyb.style.position = "fixed";
    keyb.style.left = "50%";
    keyb.style.top = "50%";
    keyb.style.transform = "translate(-50%, -50%)";
    keyb.id = inputType;
    keyb.style.zIndex = "9999999";
    keyb.style.display = "none"; //hidden on insert.
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

      var divText = document.createElement("div");
      divText.style.display = "flex";
      divText.style.alignItems = "center";
      divText.style.justifyContent = "center";
      divText.style.backgroundColor = "white";
      divText.style.margin =
        this.settings.padding * (this.settings.scale / 2) + "px";
      keyb.appendChild(divText);

      var paragraph = document.createElement("p");
      paragraph.id = "ptext";
      paragraph.style.display = "flex";
      paragraph.style.alignItems = "center";
      paragraph.style.justifyContent = "center";
      paragraph.style.width = "100%";
      divText.appendChild(paragraph);

      for (var row in keys.main) {
        var nrow = document.createElement("div");
        nrow.style.display = "flex";
        nrow.style.justifyContent = "center";
        nrow.id = inputType + "-r";
        nrow.class = inputType + "-r";
        for (var button in keys.main[row]) {
          if (keys.main[row][button][0].constructor === {}.constructor) {
            var nkey = this._buildSpecialKey(keys.main[row][button][0]);
            nrow.appendChild(nkey);
          } else {
            if (keys.main[row][button].length > 2) {
              var nkeyprimary = this._buildKeyFlex(
                keys.main[row][button][0],
                true,
                keys.main[row][button][2]
              );
            } else {
              var nkeyprimary = this._buildKey(keys.main[row][button][0], true);
            }
            nrow.appendChild(nkeyprimary);
            if (keys.main[row].length > 1) {
              if (keys.main[row][button].length > 2) {
                var nkeysecondary = this._buildKeyFlex(
                  keys.main[row][button][1],
                  false,
                  keys.main[row][button][2]
                );
              } else {
                var nkeysecondary = this._buildKey(
                  keys.main[row][button][1],
                  false
                );
              }
              nrow.appendChild(nkeysecondary);
            }
          }
        }
        keyb.appendChild(nrow);
      }
    }
    document.body.appendChild(keyb);
    this.settings.preScale = this.settings.scale;
    this._toggleOpen(false);
  },

  getMaxWidth: function (inputType) {
    switch (inputType) {
      case fxKeyboard.inputTypes.keyboard:
        return this.settings.kb_max_width;
      case fxKeyboard.inputTypes.numpad:
        return this.settings.np_max_width;
    }
  },

  getMaxHeight: function (inputType) {
    switch (inputType) {
      case fxKeyboard.inputTypes.keyboard:
        return this.settings.kb_max_height;
      case fxKeyboard.inputTypes.numpad:
        return this.settings.np_max_height;
    }
  },
};

browser.runtime.onMessage.addListener(function begin(message) {
  msg = JSON.parse(message);
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
    msg = JSON.parse(event.data);
    if (msg.directive === "slave") {
      switch (msg.command) {
        case "initialize":
          var preOpen = fxKeyboard._isOSKOpen();
          if (fxKeyboard.hierarchy.isMaster) {
            fxKeyboard._toggleOpen(false);
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
  // text: "numeric",
  number: "",
  range: "",
  tel: "",
  time: "",
  week: "",
};

function oskAction(clicked) {
  if (
    (fxKeyboard.settings.numpadState === "disabled"
      ? document.activeElement.type in textInputTypes ||
        document.activeElements.type in integerInputTypes
      : document.activeElement.type in textInputTypes) &&
    fxKeyboard.lastPress !== "cancel" &&
    fxKeyboard.lastPress !== "apply" &&
    fxKeyboard.settings.numpadState !== "always"
  ) {
    if(fxKeyboard.focusElement !== document.activeElement)
    {
      fxKeyboard.focusElement = document.activeElement;
      fxKeyboard.oldValue = fxKeyboard.focusElement.value;
    }
    fxKeyboard.activeOSK = fxKeyboard.inputTypes.keyboard;
    fxKeyboard._toggleOpen(true);
  } else if (
    (fxKeyboard.settings.numpadState === "always"
    ? document.activeElement.type in textInputTypes ||
    document.activeElements.type in integerInputTypes
    : document.activeElement.type in integerInputTypes) &&
    fxKeyboard.lastPress !== "cancel" &&
    fxKeyboard.lastPress !== "apply" &&
    fxKeyboard.settings.numpadState !== "disabled"
    ) {
    if(fxKeyboard.focusElement !== document.activeElement)
    {
      fxKeyboard.focusElement = document.activeElement;
      fxKeyboard.oldValue = fxKeyboard.focusElement.value;
    }
    fxKeyboard.activeOSK = fxKeyboard.inputTypes.numpad;
    fxKeyboard._toggleOpen(true);
  } else {
    if (clicked.target.id.indexOf("fxkey") === -1) {
      fxKeyboard.focusElement.value = fxKeyboard.oldValue;
      fxKeyboard._toggleOpen(false);
    }
    fxKeyboard.oldValue = null;
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
