(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["editor"] = factory();
	else
		root["editor"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/editor/block/block.ts"
/*!**************************************!*\
  !*** ./src/ts/editor/block/block.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Block: () => (/* binding */ Block)
/* harmony export */ });
/* harmony import */ var _control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../control */ "./src/ts/editor/control.ts");

var Block = /** @class */ (function () {
    function Block(editor) {
        var _this = this;
        this.editor = editor;
        this.elem = document.createElement('div');
        this.container = document.createElement('div');
        this.deleteButton = document.createElement('span');
        this.deleteIcon = document.createElement('div');
        this.control = new _control__WEBPACK_IMPORTED_MODULE_0__.Control(editor, this);
        this.elem.classList.add('editor-block');
        this.elem.appendChild(this.control.elem);
        this.elem.addEventListener('click', function () {
            this.focus();
            this.editor.showDeleteButton(this);
        }.bind(this));
        this.elem.appendChild(this.container);
        this.container.classList.add('editor-block__container');
        this.container.appendChild(this.deleteButton);
        this.deleteButton.classList.add('editor-block__container__delete-button');
        this.deleteButton.innerHTML = '<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="21"  viewBox="0 0 448 512">' +
            '<path fill="currentColor" d="M192 188v216c0 6.627-5.373 12-12 12h-24c-6.627 0-12-5.373-12-12V188c0-6.627 5.373-12 12-12h24c6.627 ' +
            '0 12 5.373 12 12zm100-12h-24c-6.627 0-12 5.373-12 12v216c0 6.627 5.373 12 12 12h24c6.627 0 12-5.373 12-12V188c0-6.627-5.373-12-12-12zm132-96c13.255 ' +
            '0 24 10.745 24 24v12c0 6.627-5.373 12-12 12h-20v336c0 26.51-21.49 48-48 48H80c-26.51 0-48-21.49-48-48V128H12c-6.627 0-12-5.373-12-12v-12c0-13.255 10.745-24 ' +
            '24-24h74.411l34.018-56.696A48 48 0 0 1 173.589 0h100.823a48 48 0 0 1 41.16 23.304L349.589 80H424zm-269.611 0h139.223L276.16 50.913A6 6 0 0 0 271.015 48h-94.028a6 ' +
            '6 0 0 0-5.145 2.913L154.389 80zM368 128H80v330a6 6 0 0 0 6 6h276a6 6 0 0 0 6-6V128z">' +
            '</path></svg>';
        this.deleteButton.appendChild(this.deleteIcon);
        this.deleteButton.onclick = function () {
            var answer = confirm("You want to delete this block?");
            if (answer == true)
                _this.editor.remove(_this);
        };
    }
    Block.prototype.redraw = function () { };
    Block.prototype.focus = function () {
        this.editor.showDeleteButton(this);
    };
    return Block;
}());



/***/ },

/***/ "./src/ts/editor/block/header-block.ts"
/*!*********************************************!*\
  !*** ./src/ts/editor/block/header-block.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HeaderBlock: () => (/* binding */ HeaderBlock),
/* harmony export */   HeaderBlockReader: () => (/* binding */ HeaderBlockReader)
/* harmony export */ });
/* harmony import */ var _text_based_block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text-based-block */ "./src/ts/editor/block/text-based-block.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var TYPE = 'header';
var HeaderBlockReader = /** @class */ (function () {
    function HeaderBlockReader() {
    }
    HeaderBlockReader.prototype.canParse = function (rawBlock) {
        return rawBlock.type == TYPE;
    };
    HeaderBlockReader.prototype.parse = function (rawBlock, editor) {
        var rawHeaderBlock = rawBlock;
        return new HeaderBlock(editor, rawHeaderBlock.content);
    };
    return HeaderBlockReader;
}());

var HeaderBlock = /** @class */ (function (_super) {
    __extends(HeaderBlock, _super);
    function HeaderBlock(editor, content) {
        var _this = _super.call(this, editor) || this;
        _this.editor = editor;
        _this.content = content;
        _this.textarea = document.createElement('textarea');
        _this.elem.classList.add('editor-block', 'editor-block__text');
        _this.elem.appendChild(_this.textarea);
        _this.textarea.classList.add('editor-block__container__editor', 'editor-block__header');
        _this.textarea.placeholder = 'Header';
        _this.textarea.rows = 1;
        _this.textarea.innerHTML = _this.content;
        _this.setupListeners();
        _this.enableNewLinePrevention();
        _this.enableAutoresizing();
        return _this;
    }
    /**
     * Setup input listeners, including the debounced onChange
     */
    HeaderBlock.prototype.setupListeners = function () {
        var _this = this;
        this.textarea.addEventListener('input', function () {
            _this.debouncedTriggerOnChange(); // This is inherited from TextBasedBlock
        });
    };
    HeaderBlock.prototype.focus = function () {
        _super.prototype.focus.call(this);
        this.textarea.focus();
    };
    HeaderBlock.prototype.getRawContent = function () {
        var raw = {
            type: TYPE,
            content: this.textarea.value
        };
        return raw;
    };
    return HeaderBlock;
}(_text_based_block__WEBPACK_IMPORTED_MODULE_0__.TextBasedBlock));



/***/ },

/***/ "./src/ts/editor/block/image-block.ts"
/*!********************************************!*\
  !*** ./src/ts/editor/block/image-block.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImageBlock: () => (/* binding */ ImageBlock),
/* harmony export */   ImageBlockReader: () => (/* binding */ ImageBlockReader)
/* harmony export */ });
/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block */ "./src/ts/editor/block/block.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var TYPE = 'image';
var ImageBlockReader = /** @class */ (function () {
    function ImageBlockReader() {
    }
    ImageBlockReader.prototype.canParse = function (rawBlock) {
        return rawBlock.type === TYPE;
    };
    ImageBlockReader.prototype.parse = function (rawBlock, editor) {
        var rawImageBlock = rawBlock;
        return new ImageBlock(editor, rawImageBlock.url);
    };
    return ImageBlockReader;
}());

var ImageBlock = /** @class */ (function (_super) {
    __extends(ImageBlock, _super);
    function ImageBlock(editor, url) {
        var _this = _super.call(this, editor) || this;
        _this.editor = editor;
        _this.url = url;
        _this.uploadPanel = document.createElement('div');
        _this.uploadIcon = document.createElement('div');
        _this.uploadLabel = document.createElement('div');
        _this.uploadButton = document.createElement('button');
        _this.loadingIcon = document.createElement('span');
        _this.inputFile = document.createElement('input');
        _this.imagePanel = document.createElement('div');
        _this.img = document.createElement('img');
        _this.elem.classList.add('editor-block__image');
        _this.img.classList.add('editor-block__image__img');
        _this.elem.appendChild(_this.uploadPanel);
        _this.elem.appendChild(_this.imagePanel);
        _this.uploadPanel.appendChild(_this.inputFile);
        _this.uploadPanel.appendChild(_this.uploadButton);
        _this.uploadPanel.appendChild(_this.uploadIcon);
        _this.uploadPanel.appendChild(_this.uploadLabel);
        _this.uploadPanel.appendChild(_this.loadingIcon);
        _this.imagePanel.appendChild(_this.img);
        _this.uploadPanel.classList.add('editor-block__image__upload-panel');
        _this.uploadIcon.classList.add('editor-block__image__upload-panel__icon');
        _this.uploadButton.classList.add('editor-block__image__upload-panel__button');
        _this.inputFile.classList.add('editor-block__image__upload-panel__input');
        _this.uploadIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="53" height="42" viewBox="0 0 53 42">\n' +
            '    <defs>\n' +
            '        <path id="b" d="M13 0v29h30V0h20v53H0V0h13z"/>\n' +
            '        <rect id="a" width="53" height="34" x="5" y="12" rx="2"/>\n' +
            '        <mask id="d" width="53" height="34" x="0" y="0" fill="#fff">\n' +
            '            <use xlink:href="#a"/>\n' +
            '        </mask>\n' +
            '    </defs>\n' +
            '    <g fill="none" fill-rule="evenodd" transform="translate(-5 -4)">\n' +
            '        <mask id="c" fill="#fff">\n' +
            '            <use xlink:href="#b"/>\n' +
            '        </mask>\n' +
            '        <g fill-rule="nonzero" stroke="#666" stroke-dasharray="4,2" stroke-width="4" mask="url(#c)">\n' +
            '            <use mask="url(#d)" xlink:href="#a"/>\n' +
            '        </g>\n' +
            '        <path fill="#666" fill-rule="nonzero" d="M15.283 4C14.035 4 13 5.088 13 6.4v19.2c0 1.312 1.035 2.4 2.283 2.4h25.434C41.965 28 43 26.912 43 25.6V6.4C43 5.088 41.965 4 40.717 4H15.283zm.042 2h25.35c.197 0 .325.135.325.344V20l-4.916-4.155a.96.96 0 0 0-1.157-.054l-4.611 3.35-6.257-5.357a.95.95 0 0 0-.72-.226.95.95 0 0 0-.448.183L15 19.495V6.344c0-.209.128-.344.325-.344zM30 9c-1.645 0-3 1.355-3 3s1.355 3 3 3 3-1.355 3-3-1.355-3-3-3zm0 2c.564 0 1 .436 1 1 0 .564-.436 1-1 1-.564 0-1-.436-1-1 0-.564.436-1 1-1zm-6.59 5l6.256 5.32a.963.963 0 0 0 1.157.054l4.601-3.333L41 22.73v2.927c0 .207-.128.342-.325.342h-25.35c-.197 0-.325-.135-.325-.342V22.1l8.41-6.1z"/>\n' +
            '        <path stroke="#666" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M34 24l-3 11h4l1 5h3l-1-5h4z"/>\n' +
            '    </g>\n' +
            '</svg>\n';
        _this.inputFile.type = 'file';
        _this.inputFile.accept = 'image/*';
        _this.debouncedTriggerOnChange = _this.debounce(function () {
            _this.triggerOnChange();
        }, 300);
        _this.setupListeners();
        _this.addDragAndDropListeners(); // Restore drag and drop functionality
        _this.updateView();
        return _this;
    }
    ImageBlock.prototype.setupListeners = function () {
        var _this = this;
        this.inputFile.onchange = function (event) {
            var target = event.target;
            _this.handleFiles(target.files);
        };
        this.uploadPanel.onclick = function () {
            _this.inputFile.click();
        };
    };
    ImageBlock.prototype.addDragAndDropListeners = function () {
        var _this = this;
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
            _this.uploadPanel.addEventListener(eventName, _this.preventDefaults, false);
        });
        ['dragenter', 'dragover'].forEach(function (eventName) {
            _this.uploadPanel.addEventListener(eventName, function () {
                _this.uploadPanel.classList.add('editor-block__image__upload-panel--active');
            });
        });
        ['dragleave', 'drop'].forEach(function (eventName) {
            _this.uploadPanel.addEventListener(eventName, function () {
                _this.uploadPanel.classList.remove('editor-block__image__upload-panel--active');
            });
        });
        this.uploadPanel.addEventListener('drop', function (event) {
            var dt = event.dataTransfer;
            var files = dt === null || dt === void 0 ? void 0 : dt.files;
            if (files) {
                _this.handleFiles(files);
            }
        });
    };
    ImageBlock.prototype.handleFiles = function (files) {
        var _this = this;
        if (files.length === 0)
            return;
        this.startLoading();
        var successCallback = function (url) {
            _this.stopLoading();
            _this.url = url;
            _this.updateView();
        };
        var failCallback = function (error) {
            _this.stopLoading();
        };
        this.editor.options.uploadImage(files[0], successCallback, failCallback);
        this.inputFile.value = '';
    };
    /**
     * Triggers the editor's onChange callback with the updated content
     */
    ImageBlock.prototype.triggerOnChange = function () {
        if (this.editor.options.onChange) {
            this.editor.options.onChange(this.editor.getContent());
        }
    };
    /**
     * Debounce utility to delay execution of a function
     */
    ImageBlock.prototype.debounce = function (func, wait) {
        var timeout;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                func.apply(void 0, args);
            }, wait);
        };
    };
    ImageBlock.prototype.startLoading = function () {
        this.uploadLabel.style.display = 'none';
        this.loadingIcon.style.display = 'inline-block';
    };
    ImageBlock.prototype.stopLoading = function () {
        this.uploadLabel.style.display = 'inline-block';
        this.loadingIcon.style.display = 'none';
    };
    ImageBlock.prototype.isAdvancedUpload = function () {
        return ('draggable' in this.uploadPanel ||
            ('ondragstart' in this.uploadPanel && 'ondrop' in this.uploadPanel));
    };
    ImageBlock.prototype.preventDefaults = function (e) {
        e.preventDefault();
        e.stopPropagation();
    };
    ImageBlock.prototype.updateView = function () {
        if (this.url) {
            this.img.src = this.url;
            this.imagePanel.style.display = 'block';
            this.uploadPanel.style.display = 'none';
        }
        else {
            this.imagePanel.style.display = 'none';
            this.uploadPanel.style.display = 'block';
        }
        this.debouncedTriggerOnChange(); // Trigger onChange
    };
    ImageBlock.prototype.focus = function () {
        _super.prototype.focus.call(this);
    };
    ImageBlock.prototype.getRawContent = function () {
        var raw = {
            type: TYPE,
            url: this.url
        };
        return raw;
    };
    return ImageBlock;
}(_block__WEBPACK_IMPORTED_MODULE_0__.Block));



/***/ },

/***/ "./src/ts/editor/block/quote-block.ts"
/*!********************************************!*\
  !*** ./src/ts/editor/block/quote-block.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QuoteBlock: () => (/* binding */ QuoteBlock),
/* harmony export */   QuoteBlockReader: () => (/* binding */ QuoteBlockReader)
/* harmony export */ });
/* harmony import */ var _text_based_block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text-based-block */ "./src/ts/editor/block/text-based-block.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var TYPE = 'quote';
var QuoteBlockReader = /** @class */ (function () {
    function QuoteBlockReader() {
    }
    QuoteBlockReader.prototype.canParse = function (rawBlock) {
        return rawBlock.type == TYPE;
    };
    QuoteBlockReader.prototype.parse = function (rawBlock, editor) {
        var rawQuoteBlock = rawBlock;
        return new QuoteBlock(editor, rawQuoteBlock.content);
    };
    return QuoteBlockReader;
}());

var QuoteBlock = /** @class */ (function (_super) {
    __extends(QuoteBlock, _super);
    function QuoteBlock(editor, content) {
        var _this = _super.call(this, editor) || this;
        _this.editor = editor;
        _this.content = content;
        _this.textarea = document.createElement('textarea');
        _this.elem.classList.add('editor-block__text');
        _this.elem.appendChild(_this.textarea);
        _this.textarea.classList.add('editor-block__container__editor', 'editor-block__quote');
        _this.textarea.placeholder = 'Quote';
        _this.textarea.rows = 1;
        _this.textarea.innerHTML = _this.content;
        _this.setupListeners();
        _this.enableNewLinePrevention();
        _this.enableAutoresizing();
        return _this;
    }
    /**
     * Setup input listeners, including the debounced onChange
     */
    QuoteBlock.prototype.setupListeners = function () {
        var _this = this;
        this.textarea.addEventListener('input', function () {
            _this.debouncedTriggerOnChange(); // This is inherited from TextBasedBlock
        });
    };
    QuoteBlock.prototype.focus = function () {
        _super.prototype.focus.call(this);
        this.textarea.focus();
    };
    QuoteBlock.prototype.getRawContent = function () {
        var raw = {
            type: TYPE,
            content: this.textarea.value
        };
        return raw;
    };
    return QuoteBlock;
}(_text_based_block__WEBPACK_IMPORTED_MODULE_0__.TextBasedBlock));



/***/ },

/***/ "./src/ts/editor/block/text-based-block.ts"
/*!*************************************************!*\
  !*** ./src/ts/editor/block/text-based-block.ts ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextBasedBlock: () => (/* binding */ TextBasedBlock)
/* harmony export */ });
/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block */ "./src/ts/editor/block/block.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var TextBasedBlock = /** @class */ (function (_super) {
    __extends(TextBasedBlock, _super);
    function TextBasedBlock(editor) {
        var _this = _super.call(this, editor) || this;
        _this.editor = editor;
        _this.textarea = null; // textarea is now nullable
        // Debounce the onChange method with a 300ms delay
        _this.debouncedTriggerOnChange = _this.debounce(function () {
            _this.triggerOnChange();
        }, 300);
        return _this;
    }
    /**
     * Redraw the block and trigger input events for proper resizing
     */
    TextBasedBlock.prototype.redraw = function () {
        if (!this.textarea) {
            return;
        }
        var evt = document.createEvent("Event");
        evt.initEvent("input", true, true);
        this.textarea.dispatchEvent(evt);
    };
    /**
     * Prevents new lines in the textarea (enter key is disabled)
     */
    TextBasedBlock.prototype.enableNewLinePrevention = function () {
        this.textarea.addEventListener("keypress", function (ev) {
            // 13 is the enter key
            if (ev.keyCode === 13) {
                ev.preventDefault();
            }
        });
    };
    /**
     * Automatically resizes the textarea to fit its content
     */
    TextBasedBlock.prototype.enableAutoresizing = function () {
        var _this = this;
        if (!this.textarea) {
            return;
        }
        this.textarea.addEventListener("input", function () {
            if (_this.textarea.scrollHeight > 10) {
                _this.textarea.style.height = "auto";
                _this.textarea.style.height = "".concat(_this.textarea.scrollHeight, "px");
            }
        });
        window.addEventListener("DOMContentLoaded", function () {
            _this.redraw();
        }, false);
        setTimeout(function () {
            _this.redraw();
        }, 1);
    };
    /**
     * Triggers the editor's onChange callback with the updated content
     */
    TextBasedBlock.prototype.triggerOnChange = function () {
        if (this.editor.options.onChange) {
            this.editor.options.onChange(this.editor.getContent());
        }
    };
    /**
     * Debounce utility to delay execution of a function
     */
    TextBasedBlock.prototype.debounce = function (func, wait) {
        var timeout;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                func.apply(void 0, args);
            }, wait);
        };
    };
    return TextBasedBlock;
}(_block__WEBPACK_IMPORTED_MODULE_0__.Block));



/***/ },

/***/ "./src/ts/editor/block/text-block.ts"
/*!*******************************************!*\
  !*** ./src/ts/editor/block/text-block.ts ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TextBlock: () => (/* binding */ TextBlock),
/* harmony export */   TextBlockReader: () => (/* binding */ TextBlockReader)
/* harmony export */ });
/* harmony import */ var _text_based_block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./text-based-block */ "./src/ts/editor/block/text-based-block.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var TYPE = 'text';
var TextBlockReader = /** @class */ (function () {
    function TextBlockReader() {
    }
    TextBlockReader.prototype.canParse = function (rawBlock) {
        return rawBlock.type == TYPE;
    };
    TextBlockReader.prototype.parse = function (rawBlock, editor) {
        var rawTextBlock = rawBlock;
        return new TextBlock(editor, rawTextBlock.content);
    };
    return TextBlockReader;
}());

var TextBlock = /** @class */ (function (_super) {
    __extends(TextBlock, _super);
    function TextBlock(editor, content) {
        var _this = _super.call(this, editor) || this;
        _this.editor = editor;
        _this.content = content;
        _this.textarea = document.createElement('textarea');
        _this.elem.classList.add('editor-block__text');
        _this.elem.appendChild(_this.textarea);
        _this.textarea.classList.add('editor-block__container__editor', 'editor-block__body');
        _this.textarea.placeholder = 'Body text';
        _this.textarea.rows = 1;
        _this.textarea.innerHTML = _this.content;
        _this.setupListeners();
        _this.enableAutoresizing();
        return _this;
    }
    /**
     * Setup input listeners, including the debounced onChange
     */
    TextBlock.prototype.setupListeners = function () {
        var _this = this;
        this.textarea.addEventListener('input', function () {
            _this.debouncedTriggerOnChange(); // This is inherited from TextBasedBlock
        });
    };
    TextBlock.prototype.focus = function () {
        _super.prototype.focus.call(this);
        this.textarea.focus();
    };
    TextBlock.prototype.getRawContent = function () {
        var raw = {
            type: TYPE,
            content: this.textarea.value
        };
        return raw;
    };
    return TextBlock;
}(_text_based_block__WEBPACK_IMPORTED_MODULE_0__.TextBasedBlock));



/***/ },

/***/ "./src/ts/editor/block/video-block.ts"
/*!********************************************!*\
  !*** ./src/ts/editor/block/video-block.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VideoBlock: () => (/* binding */ VideoBlock),
/* harmony export */   VideoBlockReader: () => (/* binding */ VideoBlockReader)
/* harmony export */ });
/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block */ "./src/ts/editor/block/block.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var TYPE = 'video';
var VideoBlockReader = /** @class */ (function () {
    function VideoBlockReader() {
    }
    VideoBlockReader.prototype.canParse = function (rawBlock) {
        return rawBlock.type === TYPE;
    };
    VideoBlockReader.prototype.parse = function (rawBlock, editor) {
        var rawVideoBlock = rawBlock;
        return new VideoBlock(editor, rawVideoBlock.url);
    };
    return VideoBlockReader;
}());

var VideoBlock = /** @class */ (function (_super) {
    __extends(VideoBlock, _super);
    function VideoBlock(editor, videoUrl) {
        var _this = _super.call(this, editor) || this;
        _this.editor = editor;
        _this.videoUrl = videoUrl;
        _this.uploadPanel = document.createElement('div');
        _this.inputTextContainer = document.createElement('div');
        _this.inputTextLabel = document.createElement('div');
        _this.inputTextIcon = document.createElement('span');
        _this.inputText = document.createElement('input');
        _this.videoPanel = document.createElement('div');
        _this.videoElem = document.createElement('video');
        _this.videoIframe = document.createElement('iframe');
        _this.elem.classList.add('editor-block__video');
        _this.videoElem.classList.add('editor-block__video__video-elem');
        _this.elem.appendChild(_this.uploadPanel);
        _this.elem.appendChild(_this.videoPanel);
        _this.videoPanel.appendChild(_this.videoElem);
        _this.videoPanel.appendChild(_this.videoIframe);
        _this.videoIframe.frameBorder = "0";
        _this.uploadPanel.appendChild(_this.inputTextLabel);
        _this.uploadPanel.appendChild(_this.inputTextContainer);
        _this.inputTextContainer.appendChild(_this.inputTextIcon);
        _this.inputTextContainer.appendChild(_this.inputText);
        _this.uploadPanel.classList.add('editor-block__video__upload-panel');
        _this.inputTextContainer.classList.add('editor-block__video__upload-panel__input-container');
        _this.inputTextLabel.classList.add('editor-block__video__upload-panel__input-container__label');
        _this.inputTextIcon.classList.add('editor-block__video__upload-panel__input-container__icon');
        _this.inputText.classList.add('editor-block__video__upload-panel__input-container__input');
        _this.videoIframe.classList.add('js-video-iframe');
        _this.inputTextLabel.innerHTML = 'Paste a Youtube or Vimeo URL';
        _this.inputTextIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="24" viewBox="0 0 25 20"><g fill="#666" fill-rule="evenodd"><path d="M6.25 0C4.915 0 3.9-.004 3.06.092..."></g></svg>';
        _this.inputText.type = 'text';
        _this.inputText.value = videoUrl;
        // Debounce onChange logic for the video URL
        _this.debouncedTriggerOnChange = _this.debounce(function () {
            _this.triggerOnChange();
        }, 300);
        _this.inputText.onchange = function (event) {
            _this.videoUrl = _this.inputText.value.trim();
            _this.updateView();
        };
        _this.updateView();
        return _this;
    }
    VideoBlock.extractYoutubeId = function (url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=|shorts\/)([^#\&\?]*).*/;
        var match = url.match(regExp);
        return match ? match[2] : null;
    };
    VideoBlock.extractVimeoId = function (url) {
        var regExp = /^.+vimeo.com\/(.*\/)?([^#\?]*)/;
        var match = url.match(regExp);
        return match ? match[2] || match[1] : null;
    };
    /**
     * Update the view based on the video URL.
     */
    VideoBlock.prototype.updateView = function () {
        if (this.videoUrl) {
            if (this.videoUrl.includes('cloudinary')) {
                this.videoElem.src = this.videoUrl;
                this.videoPanel.style.display = 'block';
                this.videoIframe.style.display = 'none';
                this.uploadPanel.style.display = 'none';
            }
            else if (this.videoUrl.includes('youtube')) {
                var youtubeId = VideoBlock.extractYoutubeId(this.videoUrl);
                this.videoIframe.src = "https://www.youtube.com/embed/".concat(youtubeId, "?rel=0");
                this.videoIframe.width = "560";
                this.videoIframe.height = "315";
                this.videoPanel.style.display = 'block';
                this.videoElem.style.display = 'none';
                this.uploadPanel.style.display = 'none';
            }
            else if (this.videoUrl.includes('vimeo')) {
                var vimeoId = VideoBlock.extractVimeoId(this.videoUrl);
                this.videoIframe.src = "https://player.vimeo.com/video/".concat(vimeoId, "?color=ec7070&portrait=0");
                this.videoIframe.width = "560";
                this.videoIframe.height = "315";
                this.videoPanel.style.display = 'block';
                this.videoElem.style.display = 'none';
                this.uploadPanel.style.display = 'none';
            }
        }
        else {
            this.videoPanel.style.display = 'none';
            this.uploadPanel.style.display = 'block';
        }
        this.debouncedTriggerOnChange(); // Trigger onChange
    };
    /**
     * Trigger the editor's onChange callback with the updated content.
     */
    VideoBlock.prototype.triggerOnChange = function () {
        if (this.editor.options.onChange) {
            this.editor.options.onChange(this.editor.getContent());
        }
    };
    /**
     * Debounce utility to delay execution of a function.
     */
    VideoBlock.prototype.debounce = function (func, wait) {
        var timeout;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                func.apply(void 0, args);
            }, wait);
        };
    };
    VideoBlock.prototype.focus = function () {
        _super.prototype.focus.call(this);
    };
    VideoBlock.prototype.getRawContent = function () {
        var raw = {
            type: TYPE,
            url: this.videoUrl,
        };
        return raw;
    };
    return VideoBlock;
}(_block__WEBPACK_IMPORTED_MODULE_0__.Block));



/***/ },

/***/ "./src/ts/editor/control.ts"
/*!**********************************!*\
  !*** ./src/ts/editor/control.ts ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Control: () => (/* binding */ Control)
/* harmony export */ });
/* harmony import */ var _block_image_block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block/image-block */ "./src/ts/editor/block/image-block.ts");
/* harmony import */ var _block_quote_block__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block/quote-block */ "./src/ts/editor/block/quote-block.ts");
/* harmony import */ var _block_header_block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block/header-block */ "./src/ts/editor/block/header-block.ts");
/* harmony import */ var _block_text_block__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block/text-block */ "./src/ts/editor/block/text-block.ts");
/* harmony import */ var _block_video_block__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block/video-block */ "./src/ts/editor/block/video-block.ts");





var Control = /** @class */ (function () {
    function Control(editor, block) {
        var _this = this;
        this.editor = editor;
        this.block = block;
        this.elem = document.createElement('div');
        this.dashboard = document.createElement('div');
        this.expandHandle = document.createElement('div');
        this.expandButton = document.createElement('div');
        this.quoteButton = document.createElement('div');
        this.headerButton = document.createElement('div');
        this.textButton = document.createElement('div');
        this.elem.classList.add('editor-control');
        this.elem.appendChild(this.expandHandle);
        this.expandHandle.classList.add('editor-control__expand-handle', 'js-expand-handle');
        this.expandHandle.appendChild(this.expandButton);
        this.expandButton.classList.add('editor-control__expand-handle__button');
        this.expandButton.innerHTML = '+ ADD';
        this.expandHandle.onclick = function () { _this.toggleDashboard(); };
        this.elem.appendChild(this.dashboard);
        this.dashboard.classList.add('editor-control__dashboard');
        this.dashboard.appendChild(this.headerButton);
        this.headerButton.classList.add('editor-control__dashboard__button', 'js-header-button');
        this.headerButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="14" viewBox="0 0 22 14"><text fill="#666" fill-rule="evenodd" font-family="SourceSansPro-Bold, Source Sans Pro" font-size="20" font-weight="bold" transform="translate(-48 -33)"><tspan x="46.98" y="47">H1</tspan></text></svg><p>Header Text</p>';
        this.headerButton.onclick = function () {
            editor.add(new _block_header_block__WEBPACK_IMPORTED_MODULE_2__.HeaderBlock(editor, ''), _this.block);
            _this.collapseAll();
        };
        this.dashboard.appendChild(this.quoteButton);
        this.quoteButton.classList.add('editor-control__dashboard__button', 'js-quote-button');
        this.quoteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15"><path fill="#666" fill-rule="evenodd" d="M6.881 14.195H.511V9.64c0-1.843.163-3.298.488-4.363.325-1.065.926-2.021 1.802-2.867C3.677 1.562 4.796.898 6.156.414l1.246 2.63c-1.269.422-2.18 1.012-2.731 1.767-.552.756-.842 1.76-.873 3.015h3.083v6.37zm10.63 0h-6.369V9.64c0-1.858.163-3.317.488-4.374.325-1.058.929-2.01 1.813-2.856.884-.847 1.998-1.511 3.343-1.995l1.247 2.63c-1.27.422-2.18 1.012-2.731 1.767-.552.756-.843 1.76-.873 3.015h3.083v6.37z"/></svg><p>Quote<p>';
        this.quoteButton.onclick = function () {
            editor.add(new _block_quote_block__WEBPACK_IMPORTED_MODULE_1__.QuoteBlock(editor, ''), _this.block);
            _this.collapseAll();
        };
        this.dashboard.appendChild(this.textButton);
        this.textButton.classList.add('editor-control__dashboard__button', 'js-text-button');
        this.textButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16"><text fill="#666" fill-rule="evenodd" font-family="SourceSansPro-Regular, Source Sans Pro" font-size="20" transform="translate(-146 -32)"> <tspan x="144.57" y="47">Bd</tspan> </text></svg><p>Body Text</p>';
        this.textButton.onclick = function () {
            editor.add(new _block_text_block__WEBPACK_IMPORTED_MODULE_3__.TextBlock(editor, ''), _this.block);
            _this.collapseAll();
        };
        if (this.editor.options.uploadImage) {
            this.imageButton = document.createElement('div');
            this.dashboard.appendChild(this.imageButton);
            this.imageButton.classList.add('editor-control__dashboard__button', 'js-image-button');
            this.imageButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" viewBox="0 0 25 20"><path fill="#666" fill-rule="nonzero" d="M1.902 0C.862 0 0 .907 0 2v16c0 1.093.862 2 1.902 2h21.196c1.04 0 1.902-.907 1.902-2V2c0-1.093-.862-2-1.902-2H1.902zm0 1.714h21.196c.164 0 .272.113.272.286v11.357l-4.11-3.455a.805.805 0 0 0-.969-.045l-3.855 2.786-5.23-4.455A.798.798 0 0 0 8.601 8a.796.796 0 0 0-.373.152L1.63 12.937V2c0-.173.108-.286.272-.286zM14.402 4c-1.34 0-2.445 1.161-2.445 2.571 0 1.41 1.104 2.572 2.445 2.572 1.341 0 2.446-1.162 2.446-2.572 0-1.41-1.105-2.571-2.446-2.571zm0 1.714c.46 0 .815.374.815.857 0 .484-.355.858-.815.858-.46 0-.815-.374-.815-.858 0-.483.355-.857.815-.857zM8.662 9.93l5.23 4.446a.805.805 0 0 0 .969.045l3.847-2.786 4.662 3.92V18c0 .173-.108.286-.272.286H1.902c-.164 0-.272-.113-.272-.286v-2.973l7.032-5.098z"/></svg><p>Image</p>';
            this.imageButton.onclick = function () {
                editor.add(new _block_image_block__WEBPACK_IMPORTED_MODULE_0__.ImageBlock(editor, ''), _this.block);
                _this.collapseAll();
            };
        }
        this.videoButton = document.createElement('div');
        this.dashboard.appendChild(this.videoButton);
        this.videoButton.classList.add('editor-control__dashboard__button', 'js-video-button');
        this.videoButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" viewBox="0 0 25 20"><g fill="#666" fill-rule="evenodd"><path d="M6.25 0C4.915 0 3.9-.004 3.06.092 2.222.188 1.485.397.939.952c-.545.554-.75 1.305-.846 2.16C-.002 3.969 0 5.003 0 6.365v7.272c0 1.36-.004 2.393.09 3.248.095.855.3 1.606.845 2.16.544.556 1.282.766 2.122.862.84.097 1.856.094 3.193.094h12.5c1.336 0 2.35.004 3.19-.092.84-.096 1.577-.305 2.122-.86.545-.554.75-1.305.846-2.16.095-.856.092-1.89.092-3.252V6.364c0-1.36.004-2.393-.09-3.248-.095-.855-.3-1.605-.845-2.16C23.521.4 22.783.19 21.943.093 21.103-.002 20.087 0 18.75 0H6.25zm0 1.818h12.5c1.336 0 2.327.005 2.993.082.665.076.934.21 1.06.339.126.129.256.402.331 1.08.075.677.08 1.685.08 3.045v7.272c0 1.361-.005 2.37-.08 3.047-.075.678-.207.951-.333 1.08-.126.128-.394.261-1.06.337-.666.076-1.656.082-2.99.082H6.25c-1.337 0-2.327-.005-2.993-.082-.666-.076-.934-.21-1.06-.339-.127-.129-.257-.402-.332-1.08-.075-.677-.08-1.685-.08-3.045V6.364c0-1.361.005-2.37.08-3.047.075-.678.207-.951.333-1.08.126-.128.395-.261 1.06-.337.666-.076 1.656-.082 2.991-.082z"/><path d="M8.744 4.192a1.369 1.369 0 0 0-.708 1.202v9.212c0 .5.271.965.708 1.202.434.236.965.21 1.374-.067l6.784-4.606h.001a1.376 1.376 0 0 0-.001-2.27c-1.428-.968-5.216-3.54-6.784-4.605a1.324 1.324 0 0 0-1.374-.068zm1.078 2.05c1.61 1.094 4.078 2.77 5.535 3.758l-5.535 3.757V6.243z"/></g></svg><p>Video</p>';
        this.videoButton.onclick = function () {
            editor.add(new _block_video_block__WEBPACK_IMPORTED_MODULE_4__.VideoBlock(editor, ''), _this.block);
        };
    }
    Control.prototype.toggleDashboard = function () {
        if (this.dashboard.style.display == 'none')
            this.expandDashboard();
        else
            this.collapseDashboard();
    };
    Control.prototype.collapseDashboard = function () {
        this.dashboard.style.display = 'none';
        this.expandButton.innerHTML = '+ ADD';
    };
    Control.prototype.expandDashboard = function () {
        this.collapseAll();
        this.dashboard.style.display = 'flex';
        this.expandButton.innerHTML = 'HIDE';
    };
    Control.prototype.collapseAll = function () {
        for (var i = 0; i < this.editor.blocks.length; i++) {
            this.editor.blocks[i].control.collapseDashboard();
        }
        this.editor.lastControl.collapseDashboard();
    };
    return Control;
}());



/***/ },

/***/ "./src/ts/editor/editor.ts"
/*!*********************************!*\
  !*** ./src/ts/editor/editor.ts ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Editor: () => (/* binding */ Editor)
/* harmony export */ });
/* harmony import */ var _control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./control */ "./src/ts/editor/control.ts");
/* harmony import */ var _block_image_block__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block/image-block */ "./src/ts/editor/block/image-block.ts");
/* harmony import */ var _block_quote_block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block/quote-block */ "./src/ts/editor/block/quote-block.ts");
/* harmony import */ var _block_header_block__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block/header-block */ "./src/ts/editor/block/header-block.ts");
/* harmony import */ var _block_text_block__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block/text-block */ "./src/ts/editor/block/text-block.ts");
/* harmony import */ var _block_video_block__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./block/video-block */ "./src/ts/editor/block/video-block.ts");






var BLOCKS = [
    new _block_text_block__WEBPACK_IMPORTED_MODULE_4__.TextBlockReader(),
    new _block_header_block__WEBPACK_IMPORTED_MODULE_3__.HeaderBlockReader(),
    new _block_quote_block__WEBPACK_IMPORTED_MODULE_2__.QuoteBlockReader(),
    new _block_image_block__WEBPACK_IMPORTED_MODULE_1__.ImageBlockReader(),
    new _block_video_block__WEBPACK_IMPORTED_MODULE_5__.VideoBlockReader(),
];
function convertRawContent(rawContent, editor) {
    var blocks = [];
    for (var _i = 0, rawContent_1 = rawContent; _i < rawContent_1.length; _i++) {
        var rawBlock = rawContent_1[_i];
        var processed = false;
        for (var _a = 0, BLOCKS_1 = BLOCKS; _a < BLOCKS_1.length; _a++) {
            var block = BLOCKS_1[_a];
            if (block.canParse(rawBlock)) {
                processed = true;
                blocks.push(block.parse(rawBlock, editor));
                break;
            }
        }
        if (!processed) {
            console.warn("Unrecognized block type: '".concat(rawBlock.type, "'. Ignore."));
        }
    }
    return blocks;
}
var Editor = /** @class */ (function () {
    function Editor(elem, options) {
        this.elem = elem;
        this.options = options;
        this.blocks = convertRawContent(this.options.content, this);
        this.render();
        // Trigger the initial onChange event
        this.triggerOnChange();
    }
    Editor.prototype.add = function (block, beforeBlock) {
        if (beforeBlock) {
            for (var i = 0; i < this.blocks.length; i++) {
                if (beforeBlock == this.blocks[i]) {
                    this.blocks.splice(i, 0, block);
                    break;
                }
            }
            this.elem.insertBefore(block.elem, beforeBlock.elem);
        }
        else {
            this.blocks.push(block);
            this.elem.insertBefore(block.elem, this.lastControl.elem);
        }
        block.focus();
        this.triggerOnChange();
    };
    Editor.prototype.remove = function (block) {
        for (var i = 0; i < this.blocks.length; i++) {
            if (block == this.blocks[i]) {
                this.blocks.splice(i, 1);
                block.elem.remove();
                break;
            }
        }
        this.triggerOnChange();
    };
    Editor.prototype.redraw = function () {
        for (var _i = 0, _a = this.blocks; _i < _a.length; _i++) {
            var block = _a[_i];
            block.redraw();
        }
    };
    Editor.prototype.getContent = function () {
        var rawContent = [];
        for (var _i = 0, _a = this.blocks; _i < _a.length; _i++) {
            var block = _a[_i];
            rawContent.push(block.getRawContent());
        }
        return rawContent;
    };
    Editor.prototype.showDeleteButton = function (block) {
        for (var i = 0; i < this.blocks.length; i++) {
            this.blocks[i].deleteButton.style.display = 'none';
            if (block == this.blocks[i]) {
                this.blocks[i].deleteButton.style.display = 'inline-block';
            }
        }
    };
    Editor.prototype.triggerOnChange = function () {
        if (this.options.onChange) {
            this.options.onChange(this.getContent()); // Call onChange with current content
        }
    };
    Editor.prototype.render = function () {
        for (var _i = 0, _a = this.blocks; _i < _a.length; _i++) {
            var block = _a[_i];
            this.elem.appendChild(block.elem);
        }
        this.lastControl = new _control__WEBPACK_IMPORTED_MODULE_0__.Control(this, null);
        this.elem.appendChild(this.lastControl.elem);
        this.lastControl.expandDashboard();
    };
    return Editor;
}());



/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/ts/index.ts ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Editor: () => (/* reexport safe */ _editor_editor__WEBPACK_IMPORTED_MODULE_0__.Editor)
/* harmony export */ });
/* harmony import */ var _editor_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor/editor */ "./src/ts/editor/editor.ts");

window.installEditor = function (elem, options) {
    if (options === void 0) { options = {}; }
    return new _editor_editor__WEBPACK_IMPORTED_MODULE_0__.Editor(elem, options);
};


})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsV0FBVyxHQUFHLElBQUksNkNBQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFDSCxhQUFDO0FBQUQsQ0FBQzs7Ozs7Ozs7VUM3SEQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0M1QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7QUNOcUQ7QUFRL0MsTUFBTyxDQUFDLGFBQWEsR0FBRyxVQUFDLElBQW9CLEVBQUUsT0FBNEM7SUFBNUMsb0NBQXlDLEVBQUc7SUFDL0YsT0FBTyxJQUFJLGtEQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ25DLENBQUMsQ0FBQztBQUVvSCIsInNvdXJjZXMiOlsid2VicGFjazovL2VkaXRvci93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vZWRpdG9yLy4vc3JjL3RzL2VkaXRvci9ibG9jay9ibG9jay50cyIsIndlYnBhY2s6Ly9lZGl0b3IvLi9zcmMvdHMvZWRpdG9yL2Jsb2NrL2hlYWRlci1ibG9jay50cyIsIndlYnBhY2s6Ly9lZGl0b3IvLi9zcmMvdHMvZWRpdG9yL2Jsb2NrL2ltYWdlLWJsb2NrLnRzIiwid2VicGFjazovL2VkaXRvci8uL3NyYy90cy9lZGl0b3IvYmxvY2svcXVvdGUtYmxvY2sudHMiLCJ3ZWJwYWNrOi8vZWRpdG9yLy4vc3JjL3RzL2VkaXRvci9ibG9jay90ZXh0LWJhc2VkLWJsb2NrLnRzIiwid2VicGFjazovL2VkaXRvci8uL3NyYy90cy9lZGl0b3IvYmxvY2svdGV4dC1ibG9jay50cyIsIndlYnBhY2s6Ly9lZGl0b3IvLi9zcmMvdHMvZWRpdG9yL2Jsb2NrL3ZpZGVvLWJsb2NrLnRzIiwid2VicGFjazovL2VkaXRvci8uL3NyYy90cy9lZGl0b3IvY29udHJvbC50cyIsIndlYnBhY2s6Ly9lZGl0b3IvLi9zcmMvdHMvZWRpdG9yL2VkaXRvci50cyIsIndlYnBhY2s6Ly9lZGl0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZWRpdG9yL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9lZGl0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9lZGl0b3Ivd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9lZGl0b3IvLi9zcmMvdHMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZWRpdG9yXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImVkaXRvclwiXSA9IGZhY3RvcnkoKTtcbn0pKHNlbGYsICgpID0+IHtcbnJldHVybiAiLCJpbXBvcnQge0NvbnRyb2x9IGZyb20gJy4uL2NvbnRyb2wnO1xuaW1wb3J0IHtFZGl0b3J9IGZyb20gJy4uL2VkaXRvcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmF3QmxvY2sge1xuICB0eXBlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmxvY2tSZWFkZXIge1xuICBjYW5QYXJzZShyYXdCbG9jazogUmF3QmxvY2spOiBCb29sZWFuXG4gIHBhcnNlKHJhd0Jsb2NrOiBSYXdCbG9jaywgZWRpdG9yOiBFZGl0b3IpOiBCbG9ja1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmxvY2sge1xuICBlbGVtOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb250YWluZXI6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRlbGV0ZUJ1dHRvbjogSFRNTFNwYW5FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBkZWxldGVJY29uOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb250cm9sOiBDb250cm9sO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlZGl0b3I6IEVkaXRvcikge1xuICAgIHRoaXMuY29udHJvbCA9IG5ldyBDb250cm9sKGVkaXRvciwgdGhpcyk7XG4gICAgdGhpcy5lbGVtLmNsYXNzTGlzdC5hZGQoJ2VkaXRvci1ibG9jaycpO1xuICAgIHRoaXMuZWxlbS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRyb2wuZWxlbSk7XG4gICAgdGhpcy5lbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmZvY3VzKCk7XG4gICAgICB0aGlzLmVkaXRvci5zaG93RGVsZXRlQnV0dG9uKHRoaXMpO1xuICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLmVsZW0uYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2VkaXRvci1ibG9ja19fY29udGFpbmVyJyk7XG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5kZWxldGVCdXR0b24pO1xuXG4gICAgdGhpcy5kZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZCgnZWRpdG9yLWJsb2NrX19jb250YWluZXJfX2RlbGV0ZS1idXR0b24nKTtcbiAgICB0aGlzLmRlbGV0ZUJ1dHRvbi5pbm5lckhUTUwgPSAnPHN2ZyBhcmlhLWhpZGRlbj1cInRydWVcIiByb2xlPVwiaW1nXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMVwiICB2aWV3Qm94PVwiMCAwIDQ0OCA1MTJcIj4nICtcbiAgICAgICc8cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xOTIgMTg4djIxNmMwIDYuNjI3LTUuMzczIDEyLTEyIDEyaC0yNGMtNi42MjcgMC0xMi01LjM3My0xMi0xMlYxODhjMC02LjYyNyA1LjM3My0xMiAxMi0xMmgyNGM2LjYyNyAnICtcbiAgICAgICcwIDEyIDUuMzczIDEyIDEyem0xMDAtMTJoLTI0Yy02LjYyNyAwLTEyIDUuMzczLTEyIDEydjIxNmMwIDYuNjI3IDUuMzczIDEyIDEyIDEyaDI0YzYuNjI3IDAgMTItNS4zNzMgMTItMTJWMTg4YzAtNi42MjctNS4zNzMtMTItMTItMTJ6bTEzMi05NmMxMy4yNTUgJyArXG4gICAgICAnMCAyNCAxMC43NDUgMjQgMjR2MTJjMCA2LjYyNy01LjM3MyAxMi0xMiAxMmgtMjB2MzM2YzAgMjYuNTEtMjEuNDkgNDgtNDggNDhIODBjLTI2LjUxIDAtNDgtMjEuNDktNDgtNDhWMTI4SDEyYy02LjYyNyAwLTEyLTUuMzczLTEyLTEydi0xMmMwLTEzLjI1NSAxMC43NDUtMjQgJyArXG4gICAgICAnMjQtMjRoNzQuNDExbDM0LjAxOC01Ni42OTZBNDggNDggMCAwIDEgMTczLjU4OSAwaDEwMC44MjNhNDggNDggMCAwIDEgNDEuMTYgMjMuMzA0TDM0OS41ODkgODBINDI0em0tMjY5LjYxMSAwaDEzOS4yMjNMMjc2LjE2IDUwLjkxM0E2IDYgMCAwIDAgMjcxLjAxNSA0OGgtOTQuMDI4YTYgJyArXG4gICAgICAnNiAwIDAgMC01LjE0NSAyLjkxM0wxNTQuMzg5IDgwek0zNjggMTI4SDgwdjMzMGE2IDYgMCAwIDAgNiA2aDI3NmE2IDYgMCAwIDAgNi02VjEyOHpcIj4nICtcbiAgICAgICc8L3BhdGg+PC9zdmc+JztcbiAgICB0aGlzLmRlbGV0ZUJ1dHRvbi5hcHBlbmRDaGlsZCh0aGlzLmRlbGV0ZUljb24pO1xuICAgIHRoaXMuZGVsZXRlQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICBsZXQgYW5zd2VyID0gY29uZmlybShcIllvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGJsb2NrP1wiKTtcbiAgICAgIGlmIChhbnN3ZXIgPT0gdHJ1ZSlcbiAgICAgICAgdGhpcy5lZGl0b3IucmVtb3ZlKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIHJlZHJhdygpIHt9XG5cbiAgYWJzdHJhY3QgZ2V0UmF3Q29udGVudCgpOiBSYXdCbG9ja1xuXG4gIGZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuZWRpdG9yLnNob3dEZWxldGVCdXR0b24odGhpcyk7XG4gIH1cbn1cbiIsImltcG9ydCB7RWRpdG9yfSBmcm9tICcuLi9lZGl0b3InO1xuaW1wb3J0IHtCbG9jaywgQmxvY2tSZWFkZXIsIFJhd0Jsb2NrfSBmcm9tICcuL2Jsb2NrJ1xuaW1wb3J0IHtUZXh0QmFzZWRCbG9ja30gZnJvbSBcIi4vdGV4dC1iYXNlZC1ibG9ja1wiO1xuXG5jb25zdCBUWVBFOiBzdHJpbmcgPSAnaGVhZGVyJztcblxuZXhwb3J0IGludGVyZmFjZSBSYXdIZWFkZXJCbG9jayBleHRlbmRzIFJhd0Jsb2NrIHtcbiAgY29udGVudDogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgSGVhZGVyQmxvY2tSZWFkZXIgaW1wbGVtZW50cyBCbG9ja1JlYWRlciB7XG4gIGNhblBhcnNlKHJhd0Jsb2NrOiBSYXdCbG9jayk6IEJvb2xlYW4ge1xuICAgIHJldHVybiByYXdCbG9jay50eXBlID09IFRZUEU7XG4gIH1cblxuICBwYXJzZShyYXdCbG9jazogUmF3QmxvY2ssIGVkaXRvcjogRWRpdG9yKTogQmxvY2sge1xuICAgIGxldCByYXdIZWFkZXJCbG9jayA9IHJhd0Jsb2NrIGFzIFJhd0hlYWRlckJsb2NrO1xuICAgIHJldHVybiBuZXcgSGVhZGVyQmxvY2soZWRpdG9yLCByYXdIZWFkZXJCbG9jay5jb250ZW50KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSGVhZGVyQmxvY2sgZXh0ZW5kcyBUZXh0QmFzZWRCbG9jayB7XG5cbiAgdGV4dGFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlZGl0b3I6IEVkaXRvciwgcHVibGljIGNvbnRlbnQ6IHN0cmluZykge1xuICAgIHN1cGVyKGVkaXRvcik7XG4gICAgdGhpcy5lbGVtLmNsYXNzTGlzdC5hZGQoJ2VkaXRvci1ibG9jaycsICdlZGl0b3ItYmxvY2tfX3RleHQnKTtcbiAgICB0aGlzLmVsZW0uYXBwZW5kQ2hpbGQodGhpcy50ZXh0YXJlYSk7XG5cbiAgICB0aGlzLnRleHRhcmVhLmNsYXNzTGlzdC5hZGQoJ2VkaXRvci1ibG9ja19fY29udGFpbmVyX19lZGl0b3InLCAnZWRpdG9yLWJsb2NrX19oZWFkZXInKTtcbiAgICB0aGlzLnRleHRhcmVhLnBsYWNlaG9sZGVyID0gJ0hlYWRlcic7XG4gICAgdGhpcy50ZXh0YXJlYS5yb3dzID0gMTtcbiAgICB0aGlzLnRleHRhcmVhLmlubmVySFRNTCA9IHRoaXMuY29udGVudDtcblxuICAgIHRoaXMuc2V0dXBMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLmVuYWJsZU5ld0xpbmVQcmV2ZW50aW9uKCk7XG4gICAgdGhpcy5lbmFibGVBdXRvcmVzaXppbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXR1cCBpbnB1dCBsaXN0ZW5lcnMsIGluY2x1ZGluZyB0aGUgZGVib3VuY2VkIG9uQ2hhbmdlXG4gICAqL1xuICBwcml2YXRlIHNldHVwTGlzdGVuZXJzKCk6IHZvaWQge1xuICAgIHRoaXMudGV4dGFyZWEuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICB0aGlzLmRlYm91bmNlZFRyaWdnZXJPbkNoYW5nZSgpOyAvLyBUaGlzIGlzIGluaGVyaXRlZCBmcm9tIFRleHRCYXNlZEJsb2NrXG4gICAgfSk7XG4gIH1cblxuICBmb2N1cygpOiB2b2lkIHtcbiAgICBzdXBlci5mb2N1cygpO1xuICAgIHRoaXMudGV4dGFyZWEuZm9jdXMoKTtcbiAgfVxuXG4gIGdldFJhd0NvbnRlbnQoKTogUmF3QmxvY2sge1xuICAgIGxldCByYXc6IFJhd0hlYWRlckJsb2NrID0ge1xuICAgICAgdHlwZTogVFlQRSxcbiAgICAgIGNvbnRlbnQ6IHRoaXMudGV4dGFyZWEudmFsdWVcbiAgICB9O1xuICAgIHJldHVybiByYXc7XG4gIH1cbn0iLCJpbXBvcnQgeyBFZGl0b3IgfSBmcm9tICcuLi9lZGl0b3InO1xuaW1wb3J0IHsgQmxvY2ssIFJhd0Jsb2NrLCBCbG9ja1JlYWRlciB9IGZyb20gJy4vYmxvY2snO1xuXG5jb25zdCBUWVBFOiBzdHJpbmcgPSAnaW1hZ2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJhd0ltYWdlQmxvY2sgZXh0ZW5kcyBSYXdCbG9jayB7XG4gIHVybDogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgSW1hZ2VCbG9ja1JlYWRlciBpbXBsZW1lbnRzIEJsb2NrUmVhZGVyIHtcbiAgY2FuUGFyc2UocmF3QmxvY2s6IFJhd0Jsb2NrKTogQm9vbGVhbiB7XG4gICAgcmV0dXJuIHJhd0Jsb2NrLnR5cGUgPT09IFRZUEU7XG4gIH1cblxuICBwYXJzZShyYXdCbG9jazogUmF3QmxvY2ssIGVkaXRvcjogRWRpdG9yKTogQmxvY2sge1xuICAgIGxldCByYXdJbWFnZUJsb2NrID0gcmF3QmxvY2sgYXMgUmF3SW1hZ2VCbG9jaztcbiAgICByZXR1cm4gbmV3IEltYWdlQmxvY2soZWRpdG9yLCByYXdJbWFnZUJsb2NrLnVybCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEltYWdlQmxvY2sgZXh0ZW5kcyBCbG9jayB7XG4gIHVwbG9hZFBhbmVsOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB1cGxvYWRJY29uOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB1cGxvYWRMYWJlbDogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdXBsb2FkQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBsb2FkaW5nSWNvbjogSFRNTFNwYW5FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBpbnB1dEZpbGU6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBcbiAgaW1hZ2VQYW5lbDogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgaW1nOiBIVE1MSW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgcHJpdmF0ZSBkZWJvdW5jZWRUcmlnZ2VyT25DaGFuZ2U6ICgpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVkaXRvcjogRWRpdG9yLCBwdWJsaWMgdXJsOiBzdHJpbmcpIHtcbiAgICBzdXBlcihlZGl0b3IpO1xuXG4gICAgdGhpcy5lbGVtLmNsYXNzTGlzdC5hZGQoJ2VkaXRvci1ibG9ja19faW1hZ2UnKTtcbiAgICB0aGlzLmltZy5jbGFzc0xpc3QuYWRkKCdlZGl0b3ItYmxvY2tfX2ltYWdlX19pbWcnKTtcblxuICAgIHRoaXMuZWxlbS5hcHBlbmRDaGlsZCh0aGlzLnVwbG9hZFBhbmVsKTtcbiAgICB0aGlzLmVsZW0uYXBwZW5kQ2hpbGQodGhpcy5pbWFnZVBhbmVsKTtcblxuICAgIHRoaXMudXBsb2FkUGFuZWwuYXBwZW5kQ2hpbGQodGhpcy5pbnB1dEZpbGUpO1xuICAgIHRoaXMudXBsb2FkUGFuZWwuYXBwZW5kQ2hpbGQodGhpcy51cGxvYWRCdXR0b24pO1xuICAgIHRoaXMudXBsb2FkUGFuZWwuYXBwZW5kQ2hpbGQodGhpcy51cGxvYWRJY29uKTtcbiAgICB0aGlzLnVwbG9hZFBhbmVsLmFwcGVuZENoaWxkKHRoaXMudXBsb2FkTGFiZWwpO1xuICAgIHRoaXMudXBsb2FkUGFuZWwuYXBwZW5kQ2hpbGQodGhpcy5sb2FkaW5nSWNvbik7XG4gICAgdGhpcy5pbWFnZVBhbmVsLmFwcGVuZENoaWxkKHRoaXMuaW1nKTtcblxuICAgIHRoaXMudXBsb2FkUGFuZWwuY2xhc3NMaXN0LmFkZCgnZWRpdG9yLWJsb2NrX19pbWFnZV9fdXBsb2FkLXBhbmVsJyk7XG4gICAgdGhpcy51cGxvYWRJY29uLmNsYXNzTGlzdC5hZGQoJ2VkaXRvci1ibG9ja19faW1hZ2VfX3VwbG9hZC1wYW5lbF9faWNvbicpO1xuICAgIHRoaXMudXBsb2FkQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2VkaXRvci1ibG9ja19faW1hZ2VfX3VwbG9hZC1wYW5lbF9fYnV0dG9uJyk7XG4gICAgdGhpcy5pbnB1dEZpbGUuY2xhc3NMaXN0LmFkZCgnZWRpdG9yLWJsb2NrX19pbWFnZV9fdXBsb2FkLXBhbmVsX19pbnB1dCcpO1xuXG4gICAgdGhpcy51cGxvYWRJY29uLmlubmVySFRNTCA9ICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB3aWR0aD1cIjUzXCIgaGVpZ2h0PVwiNDJcIiB2aWV3Qm94PVwiMCAwIDUzIDQyXCI+XFxuJyArXG4gICAgICAnICAgIDxkZWZzPlxcbicgK1xuICAgICAgJyAgICAgICAgPHBhdGggaWQ9XCJiXCIgZD1cIk0xMyAwdjI5aDMwVjBoMjB2NTNIMFYwaDEzelwiLz5cXG4nICtcbiAgICAgICcgICAgICAgIDxyZWN0IGlkPVwiYVwiIHdpZHRoPVwiNTNcIiBoZWlnaHQ9XCIzNFwiIHg9XCI1XCIgeT1cIjEyXCIgcng9XCIyXCIvPlxcbicgK1xuICAgICAgJyAgICAgICAgPG1hc2sgaWQ9XCJkXCIgd2lkdGg9XCI1M1wiIGhlaWdodD1cIjM0XCIgeD1cIjBcIiB5PVwiMFwiIGZpbGw9XCIjZmZmXCI+XFxuJyArXG4gICAgICAnICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPVwiI2FcIi8+XFxuJyArXG4gICAgICAnICAgICAgICA8L21hc2s+XFxuJyArXG4gICAgICAnICAgIDwvZGVmcz5cXG4nICtcbiAgICAgICcgICAgPGcgZmlsbD1cIm5vbmVcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC01IC00KVwiPlxcbicgK1xuICAgICAgJyAgICAgICAgPG1hc2sgaWQ9XCJjXCIgZmlsbD1cIiNmZmZcIj5cXG4nICtcbiAgICAgICcgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9XCIjYlwiLz5cXG4nICtcbiAgICAgICcgICAgICAgIDwvbWFzaz5cXG4nICtcbiAgICAgICcgICAgICAgIDxnIGZpbGwtcnVsZT1cIm5vbnplcm9cIiBzdHJva2U9XCIjNjY2XCIgc3Ryb2tlLWRhc2hhcnJheT1cIjQsMlwiIHN0cm9rZS13aWR0aD1cIjRcIiBtYXNrPVwidXJsKCNjKVwiPlxcbicgK1xuICAgICAgJyAgICAgICAgICAgIDx1c2UgbWFzaz1cInVybCgjZClcIiB4bGluazpocmVmPVwiI2FcIi8+XFxuJyArXG4gICAgICAnICAgICAgICA8L2c+XFxuJyArXG4gICAgICAnICAgICAgICA8cGF0aCBmaWxsPVwiIzY2NlwiIGZpbGwtcnVsZT1cIm5vbnplcm9cIiBkPVwiTTE1LjI4MyA0QzE0LjAzNSA0IDEzIDUuMDg4IDEzIDYuNHYxOS4yYzAgMS4zMTIgMS4wMzUgMi40IDIuMjgzIDIuNGgyNS40MzRDNDEuOTY1IDI4IDQzIDI2LjkxMiA0MyAyNS42VjYuNEM0MyA1LjA4OCA0MS45NjUgNCA0MC43MTcgNEgxNS4yODN6bS4wNDIgMmgyNS4zNWMuMTk3IDAgLjMyNS4xMzUuMzI1LjM0NFYyMGwtNC45MTYtNC4xNTVhLjk2Ljk2IDAgMCAwLTEuMTU3LS4wNTRsLTQuNjExIDMuMzUtNi4yNTctNS4zNTdhLjk1Ljk1IDAgMCAwLS43Mi0uMjI2Ljk1Ljk1IDAgMCAwLS40NDguMTgzTDE1IDE5LjQ5NVY2LjM0NGMwLS4yMDkuMTI4LS4zNDQuMzI1LS4zNDR6TTMwIDljLTEuNjQ1IDAtMyAxLjM1NS0zIDNzMS4zNTUgMyAzIDMgMy0xLjM1NSAzLTMtMS4zNTUtMy0zLTN6bTAgMmMuNTY0IDAgMSAuNDM2IDEgMSAwIC41NjQtLjQzNiAxLTEgMS0uNTY0IDAtMS0uNDM2LTEtMSAwLS41NjQuNDM2LTEgMS0xem0tNi41OSA1bDYuMjU2IDUuMzJhLjk2My45NjMgMCAwIDAgMS4xNTcuMDU0bDQuNjAxLTMuMzMzTDQxIDIyLjczdjIuOTI3YzAgLjIwNy0uMTI4LjM0Mi0uMzI1LjM0MmgtMjUuMzVjLS4xOTcgMC0uMzI1LS4xMzUtLjMyNS0uMzQyVjIyLjFsOC40MS02LjF6XCIvPlxcbicgK1xuICAgICAgJyAgICAgICAgPHBhdGggc3Ryb2tlPVwiIzY2NlwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZS13aWR0aD1cIjJcIiBkPVwiTTM0IDI0bC0zIDExaDRsMSA1aDNsLTEtNWg0elwiLz5cXG4nICtcbiAgICAgICcgICAgPC9nPlxcbicgK1xuICAgICAgJzwvc3ZnPlxcbic7XG4gICAgXG4gICAgdGhpcy5pbnB1dEZpbGUudHlwZSA9ICdmaWxlJztcbiAgICB0aGlzLmlucHV0RmlsZS5hY2NlcHQgPSAnaW1hZ2UvKic7XG5cbiAgICB0aGlzLmRlYm91bmNlZFRyaWdnZXJPbkNoYW5nZSA9IHRoaXMuZGVib3VuY2UoKCkgPT4ge1xuICAgICAgdGhpcy50cmlnZ2VyT25DaGFuZ2UoKTtcbiAgICB9LCAzMDApO1xuXG4gICAgdGhpcy5zZXR1cExpc3RlbmVycygpO1xuICAgIHRoaXMuYWRkRHJhZ0FuZERyb3BMaXN0ZW5lcnMoKTsgLy8gUmVzdG9yZSBkcmFnIGFuZCBkcm9wIGZ1bmN0aW9uYWxpdHlcbiAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgdGhpcy5pbnB1dEZpbGUub25jaGFuZ2UgPSAoZXZlbnQ6IEV2ZW50KTogYW55ID0+IHtcbiAgICAgIGxldCB0YXJnZXQgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZXZlbnQudGFyZ2V0KTtcbiAgICAgIHRoaXMuaGFuZGxlRmlsZXModGFyZ2V0LmZpbGVzKTtcbiAgICB9O1xuXG4gICAgdGhpcy51cGxvYWRQYW5lbC5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgdGhpcy5pbnB1dEZpbGUuY2xpY2soKTtcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBhZGREcmFnQW5kRHJvcExpc3RlbmVycygpOiB2b2lkIHtcbiAgICBbJ2RyYWdlbnRlcicsICdkcmFnb3ZlcicsICdkcmFnbGVhdmUnLCAnZHJvcCddLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgIHRoaXMudXBsb2FkUGFuZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHRoaXMucHJldmVudERlZmF1bHRzLCBmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBbJ2RyYWdlbnRlcicsICdkcmFnb3ZlciddLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgIHRoaXMudXBsb2FkUGFuZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsICgpID0+IHtcbiAgICAgICAgdGhpcy51cGxvYWRQYW5lbC5jbGFzc0xpc3QuYWRkKCdlZGl0b3ItYmxvY2tfX2ltYWdlX191cGxvYWQtcGFuZWwtLWFjdGl2ZScpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBbJ2RyYWdsZWF2ZScsICdkcm9wJ10uZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgdGhpcy51cGxvYWRQYW5lbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgKCkgPT4ge1xuICAgICAgICB0aGlzLnVwbG9hZFBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2VkaXRvci1ibG9ja19faW1hZ2VfX3VwbG9hZC1wYW5lbC0tYWN0aXZlJyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMudXBsb2FkUGFuZWwuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIChldmVudDogRHJhZ0V2ZW50KSA9PiB7XG4gICAgICBsZXQgZHQgPSBldmVudC5kYXRhVHJhbnNmZXI7XG4gICAgICBsZXQgZmlsZXMgPSBkdD8uZmlsZXM7XG4gICAgICBpZiAoZmlsZXMpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVGaWxlcyhmaWxlcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVGaWxlcyhmaWxlczogRmlsZUxpc3QpOiB2b2lkIHtcbiAgICBpZiAoZmlsZXMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICB0aGlzLnN0YXJ0TG9hZGluZygpO1xuXG4gICAgY29uc3Qgc3VjY2Vzc0NhbGxiYWNrID0gKHVybDogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLnN0b3BMb2FkaW5nKCk7XG4gICAgICB0aGlzLnVybCA9IHVybDtcbiAgICAgIHRoaXMudXBkYXRlVmlldygpO1xuICAgIH07XG5cbiAgICBjb25zdCBmYWlsQ2FsbGJhY2sgPSAoZXJyb3I6IHN0cmluZykgPT4ge1xuICAgICAgdGhpcy5zdG9wTG9hZGluZygpO1xuICAgIH07XG5cbiAgICB0aGlzLmVkaXRvci5vcHRpb25zLnVwbG9hZEltYWdlKGZpbGVzWzBdLCBzdWNjZXNzQ2FsbGJhY2ssIGZhaWxDYWxsYmFjayk7XG4gICAgdGhpcy5pbnB1dEZpbGUudmFsdWUgPSAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyB0aGUgZWRpdG9yJ3Mgb25DaGFuZ2UgY2FsbGJhY2sgd2l0aCB0aGUgdXBkYXRlZCBjb250ZW50XG4gICAqL1xuICBwcml2YXRlIHRyaWdnZXJPbkNoYW5nZSgpIHtcbiAgICBpZiAodGhpcy5lZGl0b3Iub3B0aW9ucy5vbkNoYW5nZSkge1xuICAgICAgdGhpcy5lZGl0b3Iub3B0aW9ucy5vbkNoYW5nZSh0aGlzLmVkaXRvci5nZXRDb250ZW50KCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZWJvdW5jZSB1dGlsaXR5IHRvIGRlbGF5IGV4ZWN1dGlvbiBvZiBhIGZ1bmN0aW9uXG4gICAqL1xuICBwcml2YXRlIGRlYm91bmNlKGZ1bmM6ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCwgd2FpdDogbnVtYmVyKSB7XG4gICAgbGV0IHRpbWVvdXQ6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+O1xuICAgIHJldHVybiAoLi4uYXJnczogYW55W10pID0+IHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZnVuYyguLi5hcmdzKTtcbiAgICAgIH0sIHdhaXQpO1xuICAgIH07XG4gIH1cblxuICBzdGFydExvYWRpbmcoKTogdm9pZCB7XG4gICAgdGhpcy51cGxvYWRMYWJlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHRoaXMubG9hZGluZ0ljb24uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuICB9XG5cbiAgc3RvcExvYWRpbmcoKTogdm9pZCB7XG4gICAgdGhpcy51cGxvYWRMYWJlbC5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG4gICAgdGhpcy5sb2FkaW5nSWNvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICB9XG5cbiAgaXNBZHZhbmNlZFVwbG9hZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgJ2RyYWdnYWJsZScgaW4gdGhpcy51cGxvYWRQYW5lbCB8fFxuICAgICAgKCdvbmRyYWdzdGFydCcgaW4gdGhpcy51cGxvYWRQYW5lbCAmJiAnb25kcm9wJyBpbiB0aGlzLnVwbG9hZFBhbmVsKVxuICAgICk7XG4gIH1cblxuICBwcmV2ZW50RGVmYXVsdHMoZTogRXZlbnQpOiB2b2lkIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHVwZGF0ZVZpZXcoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudXJsKSB7XG4gICAgICB0aGlzLmltZy5zcmMgPSB0aGlzLnVybDtcbiAgICAgIHRoaXMuaW1hZ2VQYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIHRoaXMudXBsb2FkUGFuZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbWFnZVBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB0aGlzLnVwbG9hZFBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cbiAgICB0aGlzLmRlYm91bmNlZFRyaWdnZXJPbkNoYW5nZSgpOyAvLyBUcmlnZ2VyIG9uQ2hhbmdlXG4gIH1cblxuICBmb2N1cygpOiB2b2lkIHtcbiAgICBzdXBlci5mb2N1cygpO1xuICB9XG5cbiAgZ2V0UmF3Q29udGVudCgpOiBSYXdCbG9jayB7XG4gICAgbGV0IHJhdzogUmF3SW1hZ2VCbG9jayA9IHtcbiAgICAgIHR5cGU6IFRZUEUsXG4gICAgICB1cmw6IHRoaXMudXJsXG4gICAgfTtcbiAgICByZXR1cm4gcmF3O1xuICB9XG59XG4iLCJpbXBvcnQge0VkaXRvcn0gZnJvbSAnLi4vZWRpdG9yJztcbmltcG9ydCB7QmxvY2ssIFJhd0Jsb2NrLCBCbG9ja1JlYWRlcn0gZnJvbSAnLi9ibG9jaydcbmltcG9ydCB7VGV4dEJhc2VkQmxvY2t9IGZyb20gXCIuL3RleHQtYmFzZWQtYmxvY2tcIjtcblxuY29uc3QgVFlQRTogc3RyaW5nID0gJ3F1b3RlJztcblxuZXhwb3J0IGludGVyZmFjZSBSYXdRdW90ZUJsb2NrIGV4dGVuZHMgUmF3QmxvY2sge1xuICBjb250ZW50OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBRdW90ZUJsb2NrUmVhZGVyIGltcGxlbWVudHMgQmxvY2tSZWFkZXIge1xuICBjYW5QYXJzZShyYXdCbG9jazogUmF3QmxvY2spOiBCb29sZWFuIHtcbiAgICByZXR1cm4gcmF3QmxvY2sudHlwZSA9PSBUWVBFO1xuICB9XG5cbiAgcGFyc2UocmF3QmxvY2s6IFJhd0Jsb2NrLCBlZGl0b3I6IEVkaXRvcik6IEJsb2NrIHtcbiAgICBsZXQgcmF3UXVvdGVCbG9jayA9IHJhd0Jsb2NrIGFzIFJhd1F1b3RlQmxvY2s7XG4gICAgcmV0dXJuIG5ldyBRdW90ZUJsb2NrKGVkaXRvciwgcmF3UXVvdGVCbG9jay5jb250ZW50KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUXVvdGVCbG9jayBleHRlbmRzIFRleHRCYXNlZEJsb2NrIHtcblxuICB0ZXh0YXJlYTogSFRNTFRleHRBcmVhRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVkaXRvcjogRWRpdG9yLCBwdWJsaWMgY29udGVudDogc3RyaW5nKSB7XG4gICAgc3VwZXIoZWRpdG9yKTtcbiAgICB0aGlzLmVsZW0uY2xhc3NMaXN0LmFkZCgnZWRpdG9yLWJsb2NrX190ZXh0Jyk7XG4gICAgdGhpcy5lbGVtLmFwcGVuZENoaWxkKHRoaXMudGV4dGFyZWEpO1xuXG4gICAgdGhpcy50ZXh0YXJlYS5jbGFzc0xpc3QuYWRkKCdlZGl0b3ItYmxvY2tfX2NvbnRhaW5lcl9fZWRpdG9yJywgJ2VkaXRvci1ibG9ja19fcXVvdGUnKTtcbiAgICB0aGlzLnRleHRhcmVhLnBsYWNlaG9sZGVyID0gJ1F1b3RlJztcbiAgICB0aGlzLnRleHRhcmVhLnJvd3MgPSAxO1xuICAgIHRoaXMudGV4dGFyZWEuaW5uZXJIVE1MID0gdGhpcy5jb250ZW50O1xuXG4gICAgdGhpcy5zZXR1cExpc3RlbmVycygpO1xuICAgIHRoaXMuZW5hYmxlTmV3TGluZVByZXZlbnRpb24oKTtcbiAgICB0aGlzLmVuYWJsZUF1dG9yZXNpemluZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHVwIGlucHV0IGxpc3RlbmVycywgaW5jbHVkaW5nIHRoZSBkZWJvdW5jZWQgb25DaGFuZ2VcbiAgICovXG4gIHByaXZhdGUgc2V0dXBMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgdGhpcy50ZXh0YXJlYS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgIHRoaXMuZGVib3VuY2VkVHJpZ2dlck9uQ2hhbmdlKCk7IC8vIFRoaXMgaXMgaW5oZXJpdGVkIGZyb20gVGV4dEJhc2VkQmxvY2tcbiAgICB9KTtcbiAgfVxuXG4gIGZvY3VzKCk6IHZvaWQge1xuICAgIHN1cGVyLmZvY3VzKCk7XG4gICAgdGhpcy50ZXh0YXJlYS5mb2N1cygpO1xuICB9XG5cbiAgZ2V0UmF3Q29udGVudCgpOiBSYXdCbG9jayB7XG4gICAgbGV0IHJhdzogUmF3UXVvdGVCbG9jayA9IHtcbiAgICAgIHR5cGU6IFRZUEUsXG4gICAgICBjb250ZW50OiB0aGlzLnRleHRhcmVhLnZhbHVlXG4gICAgfTtcbiAgICByZXR1cm4gcmF3O1xuICB9XG59IiwiaW1wb3J0IHsgQmxvY2sgfSBmcm9tIFwiLi9ibG9ja1wiO1xuaW1wb3J0IHsgRWRpdG9yIH0gZnJvbSBcIi4uL2VkaXRvclwiO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVGV4dEJhc2VkQmxvY2sgZXh0ZW5kcyBCbG9jayB7XG4gIHRleHRhcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50IHwgbnVsbCA9IG51bGw7IC8vIHRleHRhcmVhIGlzIG5vdyBudWxsYWJsZVxuXG4gIHByb3RlY3RlZCBkZWJvdW5jZWRUcmlnZ2VyT25DaGFuZ2U6ICgpID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVkaXRvcjogRWRpdG9yKSB7XG4gICAgc3VwZXIoZWRpdG9yKTtcblxuICAgIC8vIERlYm91bmNlIHRoZSBvbkNoYW5nZSBtZXRob2Qgd2l0aCBhIDMwMG1zIGRlbGF5XG4gICAgdGhpcy5kZWJvdW5jZWRUcmlnZ2VyT25DaGFuZ2UgPSB0aGlzLmRlYm91bmNlKCgpID0+IHtcbiAgICAgIHRoaXMudHJpZ2dlck9uQ2hhbmdlKCk7XG4gICAgfSwgMzAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWRyYXcgdGhlIGJsb2NrIGFuZCB0cmlnZ2VyIGlucHV0IGV2ZW50cyBmb3IgcHJvcGVyIHJlc2l6aW5nXG4gICAqL1xuICByZWRyYXcoKSB7XG4gICAgaWYgKCF0aGlzLnRleHRhcmVhKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkV2ZW50XCIpO1xuICAgIGV2dC5pbml0RXZlbnQoXCJpbnB1dFwiLCB0cnVlLCB0cnVlKTtcbiAgICB0aGlzLnRleHRhcmVhLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcmV2ZW50cyBuZXcgbGluZXMgaW4gdGhlIHRleHRhcmVhIChlbnRlciBrZXkgaXMgZGlzYWJsZWQpXG4gICAqL1xuICBlbmFibGVOZXdMaW5lUHJldmVudGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLnRleHRhcmVhLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCAoZXYpID0+IHtcbiAgICAgIC8vIDEzIGlzIHRoZSBlbnRlciBrZXlcbiAgICAgIGlmICgoZXYgYXMgS2V5Ym9hcmRFdmVudCkua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdXRvbWF0aWNhbGx5IHJlc2l6ZXMgdGhlIHRleHRhcmVhIHRvIGZpdCBpdHMgY29udGVudFxuICAgKi9cbiAgZW5hYmxlQXV0b3Jlc2l6aW5nKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy50ZXh0YXJlYSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMudGV4dGFyZWEuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnRleHRhcmVhIS5zY3JvbGxIZWlnaHQgPiAxMCkge1xuICAgICAgICB0aGlzLnRleHRhcmVhIS5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIjtcbiAgICAgICAgdGhpcy50ZXh0YXJlYSEuc3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy50ZXh0YXJlYSEuc2Nyb2xsSGVpZ2h0fXB4YDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgXCJET01Db250ZW50TG9hZGVkXCIsXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHRoaXMucmVkcmF3KCk7XG4gICAgICB9LFxuICAgICAgZmFsc2VcbiAgICApO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnJlZHJhdygpO1xuICAgIH0sIDEpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXJzIHRoZSBlZGl0b3IncyBvbkNoYW5nZSBjYWxsYmFjayB3aXRoIHRoZSB1cGRhdGVkIGNvbnRlbnRcbiAgICovXG4gIHByaXZhdGUgdHJpZ2dlck9uQ2hhbmdlKCkge1xuICAgIGlmICh0aGlzLmVkaXRvci5vcHRpb25zLm9uQ2hhbmdlKSB7XG4gICAgICB0aGlzLmVkaXRvci5vcHRpb25zLm9uQ2hhbmdlKHRoaXMuZWRpdG9yLmdldENvbnRlbnQoKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlYm91bmNlIHV0aWxpdHkgdG8gZGVsYXkgZXhlY3V0aW9uIG9mIGEgZnVuY3Rpb25cbiAgICovXG4gIHByaXZhdGUgZGVib3VuY2UoZnVuYzogKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkLCB3YWl0OiBudW1iZXIpIHtcbiAgICBsZXQgdGltZW91dDogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD47XG4gICAgcmV0dXJuICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBmdW5jKC4uLmFyZ3MpO1xuICAgICAgfSwgd2FpdCk7XG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRWRpdG9yIH0gZnJvbSAnLi4vZWRpdG9yJztcbmltcG9ydCB7IEJsb2NrLCBCbG9ja1JlYWRlciwgUmF3QmxvY2sgfSBmcm9tICcuL2Jsb2NrJztcbmltcG9ydCB7IFRleHRCYXNlZEJsb2NrIH0gZnJvbSAnLi90ZXh0LWJhc2VkLWJsb2NrJztcblxuY29uc3QgVFlQRTogc3RyaW5nID0gJ3RleHQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJhd1RleHRCbG9jayBleHRlbmRzIFJhd0Jsb2NrIHtcbiAgY29udGVudDogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgVGV4dEJsb2NrUmVhZGVyIGltcGxlbWVudHMgQmxvY2tSZWFkZXIge1xuICBjYW5QYXJzZShyYXdCbG9jazogUmF3QmxvY2spOiBCb29sZWFuIHtcbiAgICByZXR1cm4gcmF3QmxvY2sudHlwZSA9PSBUWVBFO1xuICB9XG5cbiAgcGFyc2UocmF3QmxvY2s6IFJhd0Jsb2NrLCBlZGl0b3I6IEVkaXRvcik6IEJsb2NrIHtcbiAgICBsZXQgcmF3VGV4dEJsb2NrID0gcmF3QmxvY2sgYXMgUmF3VGV4dEJsb2NrO1xuICAgIHJldHVybiBuZXcgVGV4dEJsb2NrKGVkaXRvciwgcmF3VGV4dEJsb2NrLmNvbnRlbnQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUZXh0QmxvY2sgZXh0ZW5kcyBUZXh0QmFzZWRCbG9jayB7XG5cbiAgdGV4dGFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlZGl0b3I6IEVkaXRvciwgcHVibGljIGNvbnRlbnQ6IHN0cmluZykge1xuICAgIHN1cGVyKGVkaXRvcik7XG4gICAgdGhpcy5lbGVtLmNsYXNzTGlzdC5hZGQoJ2VkaXRvci1ibG9ja19fdGV4dCcpO1xuICAgIHRoaXMuZWxlbS5hcHBlbmRDaGlsZCh0aGlzLnRleHRhcmVhKTtcblxuICAgIHRoaXMudGV4dGFyZWEuY2xhc3NMaXN0LmFkZCgnZWRpdG9yLWJsb2NrX19jb250YWluZXJfX2VkaXRvcicsICdlZGl0b3ItYmxvY2tfX2JvZHknKTtcbiAgICB0aGlzLnRleHRhcmVhLnBsYWNlaG9sZGVyID0gJ0JvZHkgdGV4dCc7XG4gICAgdGhpcy50ZXh0YXJlYS5yb3dzID0gMTtcbiAgICB0aGlzLnRleHRhcmVhLmlubmVySFRNTCA9IHRoaXMuY29udGVudDtcblxuICAgIHRoaXMuc2V0dXBMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLmVuYWJsZUF1dG9yZXNpemluZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHVwIGlucHV0IGxpc3RlbmVycywgaW5jbHVkaW5nIHRoZSBkZWJvdW5jZWQgb25DaGFuZ2VcbiAgICovXG4gIHByaXZhdGUgc2V0dXBMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgdGhpcy50ZXh0YXJlYS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgIHRoaXMuZGVib3VuY2VkVHJpZ2dlck9uQ2hhbmdlKCk7IC8vIFRoaXMgaXMgaW5oZXJpdGVkIGZyb20gVGV4dEJhc2VkQmxvY2tcbiAgICB9KTtcbiAgfVxuXG4gIGZvY3VzKCk6IHZvaWQge1xuICAgIHN1cGVyLmZvY3VzKCk7XG4gICAgdGhpcy50ZXh0YXJlYS5mb2N1cygpO1xuICB9XG5cbiAgZ2V0UmF3Q29udGVudCgpOiBSYXdCbG9jayB7XG4gICAgbGV0IHJhdzogUmF3VGV4dEJsb2NrID0ge1xuICAgICAgdHlwZTogVFlQRSxcbiAgICAgIGNvbnRlbnQ6IHRoaXMudGV4dGFyZWEudmFsdWVcbiAgICB9O1xuICAgIHJldHVybiByYXc7XG4gIH1cbn1cbiIsImltcG9ydCB7IEVkaXRvciB9IGZyb20gJy4uL2VkaXRvcic7XG5pbXBvcnQgeyBCbG9jaywgUmF3QmxvY2ssIEJsb2NrUmVhZGVyIH0gZnJvbSAnLi9ibG9jayc7XG5cbmNvbnN0IFRZUEU6IHN0cmluZyA9ICd2aWRlbyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmF3VmlkZW9CbG9jayBleHRlbmRzIFJhd0Jsb2NrIHtcbiAgdXJsOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBWaWRlb0Jsb2NrUmVhZGVyIGltcGxlbWVudHMgQmxvY2tSZWFkZXIge1xuICBjYW5QYXJzZShyYXdCbG9jazogUmF3QmxvY2spOiBCb29sZWFuIHtcbiAgICByZXR1cm4gcmF3QmxvY2sudHlwZSA9PT0gVFlQRTtcbiAgfVxuXG4gIHBhcnNlKHJhd0Jsb2NrOiBSYXdCbG9jaywgZWRpdG9yOiBFZGl0b3IpOiBCbG9jayB7XG4gICAgbGV0IHJhd1ZpZGVvQmxvY2sgPSByYXdCbG9jayBhcyBSYXdWaWRlb0Jsb2NrO1xuICAgIHJldHVybiBuZXcgVmlkZW9CbG9jayhlZGl0b3IsIHJhd1ZpZGVvQmxvY2sudXJsKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVmlkZW9CbG9jayBleHRlbmRzIEJsb2NrIHtcblxuICB1cGxvYWRQYW5lbDogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgaW5wdXRUZXh0Q29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBpbnB1dFRleHRMYWJlbDogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgaW5wdXRUZXh0SWNvbjogSFRNTFNwYW5FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBpbnB1dFRleHQ6IEhUTUxJbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuXG4gIHZpZGVvUGFuZWw6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHZpZGVvRWxlbTogSFRNTFZpZGVvRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gIHZpZGVvSWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuXG4gIHByaXZhdGUgZGVib3VuY2VkVHJpZ2dlck9uQ2hhbmdlOiAoKSA9PiB2b2lkOyAvLyBBZGQgZGVib3VuY2VkIHRyaWdnZXJcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWRpdG9yOiBFZGl0b3IsIHB1YmxpYyB2aWRlb1VybDogc3RyaW5nKSB7XG4gICAgc3VwZXIoZWRpdG9yKTtcbiAgICB0aGlzLmVsZW0uY2xhc3NMaXN0LmFkZCgnZWRpdG9yLWJsb2NrX192aWRlbycpO1xuICAgIHRoaXMudmlkZW9FbGVtLmNsYXNzTGlzdC5hZGQoJ2VkaXRvci1ibG9ja19fdmlkZW9fX3ZpZGVvLWVsZW0nKTtcblxuICAgIHRoaXMuZWxlbS5hcHBlbmRDaGlsZCh0aGlzLnVwbG9hZFBhbmVsKTtcbiAgICB0aGlzLmVsZW0uYXBwZW5kQ2hpbGQodGhpcy52aWRlb1BhbmVsKTtcblxuICAgIHRoaXMudmlkZW9QYW5lbC5hcHBlbmRDaGlsZCh0aGlzLnZpZGVvRWxlbSk7XG4gICAgdGhpcy52aWRlb1BhbmVsLmFwcGVuZENoaWxkKHRoaXMudmlkZW9JZnJhbWUpO1xuICAgIHRoaXMudmlkZW9JZnJhbWUuZnJhbWVCb3JkZXIgPSBcIjBcIjtcblxuICAgIHRoaXMudXBsb2FkUGFuZWwuYXBwZW5kQ2hpbGQodGhpcy5pbnB1dFRleHRMYWJlbCk7XG4gICAgdGhpcy51cGxvYWRQYW5lbC5hcHBlbmRDaGlsZCh0aGlzLmlucHV0VGV4dENvbnRhaW5lcik7XG4gICAgdGhpcy5pbnB1dFRleHRDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5pbnB1dFRleHRJY29uKTtcbiAgICB0aGlzLmlucHV0VGV4dENvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmlucHV0VGV4dCk7XG5cbiAgICB0aGlzLnVwbG9hZFBhbmVsLmNsYXNzTGlzdC5hZGQoJ2VkaXRvci1ibG9ja19fdmlkZW9fX3VwbG9hZC1wYW5lbCcpO1xuICAgIHRoaXMuaW5wdXRUZXh0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2VkaXRvci1ibG9ja19fdmlkZW9fX3VwbG9hZC1wYW5lbF9faW5wdXQtY29udGFpbmVyJyk7XG4gICAgdGhpcy5pbnB1dFRleHRMYWJlbC5jbGFzc0xpc3QuYWRkKCdlZGl0b3ItYmxvY2tfX3ZpZGVvX191cGxvYWQtcGFuZWxfX2lucHV0LWNvbnRhaW5lcl9fbGFiZWwnKTtcbiAgICB0aGlzLmlucHV0VGV4dEljb24uY2xhc3NMaXN0LmFkZCgnZWRpdG9yLWJsb2NrX192aWRlb19fdXBsb2FkLXBhbmVsX19pbnB1dC1jb250YWluZXJfX2ljb24nKTtcbiAgICB0aGlzLmlucHV0VGV4dC5jbGFzc0xpc3QuYWRkKCdlZGl0b3ItYmxvY2tfX3ZpZGVvX191cGxvYWQtcGFuZWxfX2lucHV0LWNvbnRhaW5lcl9faW5wdXQnKTtcbiAgICB0aGlzLnZpZGVvSWZyYW1lLmNsYXNzTGlzdC5hZGQoJ2pzLXZpZGVvLWlmcmFtZScpO1xuXG4gICAgdGhpcy5pbnB1dFRleHRMYWJlbC5pbm5lckhUTUwgPSAnUGFzdGUgYSBZb3V0dWJlIG9yIFZpbWVvIFVSTCc7XG4gICAgdGhpcy5pbnB1dFRleHRJY29uLmlubmVySFRNTCA9ICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjM1XCIgaGVpZ2h0PVwiMjRcIiB2aWV3Qm94PVwiMCAwIDI1IDIwXCI+PGcgZmlsbD1cIiM2NjZcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCI+PHBhdGggZD1cIk02LjI1IDBDNC45MTUgMCAzLjktLjAwNCAzLjA2LjA5Mi4uLlwiPjwvZz48L3N2Zz4nO1xuICAgIHRoaXMuaW5wdXRUZXh0LnR5cGUgPSAndGV4dCc7XG4gICAgdGhpcy5pbnB1dFRleHQudmFsdWUgPSB2aWRlb1VybDtcblxuICAgIC8vIERlYm91bmNlIG9uQ2hhbmdlIGxvZ2ljIGZvciB0aGUgdmlkZW8gVVJMXG4gICAgdGhpcy5kZWJvdW5jZWRUcmlnZ2VyT25DaGFuZ2UgPSB0aGlzLmRlYm91bmNlKCgpID0+IHtcbiAgICAgIHRoaXMudHJpZ2dlck9uQ2hhbmdlKCk7XG4gICAgfSwgMzAwKTtcblxuICAgIHRoaXMuaW5wdXRUZXh0Lm9uY2hhbmdlID0gKGV2ZW50OiBFdmVudCk6IGFueSA9PiB7XG4gICAgICB0aGlzLnZpZGVvVXJsID0gdGhpcy5pbnB1dFRleHQudmFsdWUudHJpbSgpO1xuICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XG4gICAgfTtcblxuICAgIHRoaXMudXBkYXRlVmlldygpO1xuICB9XG5cbiAgc3RhdGljIGV4dHJhY3RZb3V0dWJlSWQodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCByZWdFeHAgPSAvXi4qKHlvdXR1LmJlXFwvfHZcXC98dVxcL1xcd1xcL3xlbWJlZFxcL3x3YXRjaFxcP3Y9fFxcJnY9fFxcP3Y9fHNob3J0c1xcLykoW14jXFwmXFw/XSopLiovO1xuICAgIGxldCBtYXRjaCA9IHVybC5tYXRjaChyZWdFeHApO1xuICAgIHJldHVybiBtYXRjaCA/IG1hdGNoWzJdIDogbnVsbDtcbiAgfVxuXG4gIHN0YXRpYyBleHRyYWN0VmltZW9JZCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgbGV0IHJlZ0V4cCA9IC9eLit2aW1lby5jb21cXC8oLipcXC8pPyhbXiNcXD9dKikvO1xuICAgIGxldCBtYXRjaCA9IHVybC5tYXRjaChyZWdFeHApO1xuICAgIHJldHVybiBtYXRjaCA/IG1hdGNoWzJdIHx8IG1hdGNoWzFdIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHZpZXcgYmFzZWQgb24gdGhlIHZpZGVvIFVSTC5cbiAgICovXG4gIHVwZGF0ZVZpZXcoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudmlkZW9VcmwpIHtcbiAgICAgIGlmICh0aGlzLnZpZGVvVXJsLmluY2x1ZGVzKCdjbG91ZGluYXJ5JykpIHtcbiAgICAgICAgdGhpcy52aWRlb0VsZW0uc3JjID0gdGhpcy52aWRlb1VybDtcbiAgICAgICAgdGhpcy52aWRlb1BhbmVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB0aGlzLnZpZGVvSWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHRoaXMudXBsb2FkUGFuZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIH0gZWxzZSBpZiAodGhpcy52aWRlb1VybC5pbmNsdWRlcygneW91dHViZScpKSB7XG4gICAgICAgIGxldCB5b3V0dWJlSWQgPSBWaWRlb0Jsb2NrLmV4dHJhY3RZb3V0dWJlSWQodGhpcy52aWRlb1VybCk7XG4gICAgICAgIHRoaXMudmlkZW9JZnJhbWUuc3JjID0gYGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyR7eW91dHViZUlkfT9yZWw9MGA7XG4gICAgICAgIHRoaXMudmlkZW9JZnJhbWUud2lkdGggPSBcIjU2MFwiO1xuICAgICAgICB0aGlzLnZpZGVvSWZyYW1lLmhlaWdodCA9IFwiMzE1XCI7XG5cbiAgICAgICAgdGhpcy52aWRlb1BhbmVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB0aGlzLnZpZGVvRWxlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB0aGlzLnVwbG9hZFBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudmlkZW9VcmwuaW5jbHVkZXMoJ3ZpbWVvJykpIHtcbiAgICAgICAgbGV0IHZpbWVvSWQgPSBWaWRlb0Jsb2NrLmV4dHJhY3RWaW1lb0lkKHRoaXMudmlkZW9VcmwpO1xuICAgICAgICB0aGlzLnZpZGVvSWZyYW1lLnNyYyA9IGBodHRwczovL3BsYXllci52aW1lby5jb20vdmlkZW8vJHt2aW1lb0lkfT9jb2xvcj1lYzcwNzAmcG9ydHJhaXQ9MGA7XG4gICAgICAgIHRoaXMudmlkZW9JZnJhbWUud2lkdGggPSBcIjU2MFwiO1xuICAgICAgICB0aGlzLnZpZGVvSWZyYW1lLmhlaWdodCA9IFwiMzE1XCI7XG5cbiAgICAgICAgdGhpcy52aWRlb1BhbmVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB0aGlzLnZpZGVvRWxlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB0aGlzLnVwbG9hZFBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmlkZW9QYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgdGhpcy51cGxvYWRQYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9XG4gICAgICAgIFxuICAgIHRoaXMuZGVib3VuY2VkVHJpZ2dlck9uQ2hhbmdlKCk7IC8vIFRyaWdnZXIgb25DaGFuZ2VcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIHRoZSBlZGl0b3IncyBvbkNoYW5nZSBjYWxsYmFjayB3aXRoIHRoZSB1cGRhdGVkIGNvbnRlbnQuXG4gICAqL1xuICBwcml2YXRlIHRyaWdnZXJPbkNoYW5nZSgpIHtcbiAgICBpZiAodGhpcy5lZGl0b3Iub3B0aW9ucy5vbkNoYW5nZSkge1xuICAgICAgdGhpcy5lZGl0b3Iub3B0aW9ucy5vbkNoYW5nZSh0aGlzLmVkaXRvci5nZXRDb250ZW50KCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZWJvdW5jZSB1dGlsaXR5IHRvIGRlbGF5IGV4ZWN1dGlvbiBvZiBhIGZ1bmN0aW9uLlxuICAgKi9cbiAgcHJpdmF0ZSBkZWJvdW5jZShmdW5jOiAoLi4uYXJnczogYW55W10pID0+IHZvaWQsIHdhaXQ6IG51bWJlcikge1xuICAgIGxldCB0aW1lb3V0OiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PjtcbiAgICByZXR1cm4gKC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGZ1bmMoLi4uYXJncyk7XG4gICAgICB9LCB3YWl0KTtcbiAgICB9O1xuICB9XG5cbiAgZm9jdXMoKTogdm9pZCB7XG4gICAgc3VwZXIuZm9jdXMoKTtcbiAgfVxuXG4gIGdldFJhd0NvbnRlbnQoKTogUmF3QmxvY2sge1xuICAgIGxldCByYXc6IFJhd1ZpZGVvQmxvY2sgPSB7XG4gICAgICB0eXBlOiBUWVBFLFxuICAgICAgdXJsOiB0aGlzLnZpZGVvVXJsLFxuICAgIH07XG4gICAgcmV0dXJuIHJhdztcbiAgfVxufVxuIiwiaW1wb3J0IHtCbG9ja30gZnJvbSAnLi9ibG9jay9ibG9jayc7XG5pbXBvcnQge0ltYWdlQmxvY2t9IGZyb20gJy4vYmxvY2svaW1hZ2UtYmxvY2snO1xuaW1wb3J0IHtRdW90ZUJsb2NrfSBmcm9tICcuL2Jsb2NrL3F1b3RlLWJsb2NrJztcbmltcG9ydCB7SGVhZGVyQmxvY2t9IGZyb20gJy4vYmxvY2svaGVhZGVyLWJsb2NrJztcbmltcG9ydCB7VGV4dEJsb2NrfSBmcm9tICcuL2Jsb2NrL3RleHQtYmxvY2snO1xuaW1wb3J0IHtFZGl0b3J9IGZyb20gJy4vZWRpdG9yJztcbmltcG9ydCB7VmlkZW9CbG9ja30gZnJvbSBcIi4vYmxvY2svdmlkZW8tYmxvY2tcIjtcblxuXG5leHBvcnQgY2xhc3MgQ29udHJvbCB7XG4gIGVsZW06IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRhc2hib2FyZDogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZXhwYW5kSGFuZGxlOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBleHBhbmRCdXR0b246IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHF1b3RlQnV0dG9uOiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBoZWFkZXJCdXR0b246IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRleHRCdXR0b246IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGltYWdlQnV0dG9uOiBIVE1MRGl2RWxlbWVudDtcbiAgdmlkZW9CdXR0b246IEhUTUxEaXZFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlZGl0b3I6IEVkaXRvciwgcHVibGljIGJsb2NrOiBCbG9jaykge1xuICAgIHRoaXMuZWxlbS5jbGFzc0xpc3QuYWRkKCdlZGl0b3ItY29udHJvbCcpO1xuICAgIHRoaXMuZWxlbS5hcHBlbmRDaGlsZCh0aGlzLmV4cGFuZEhhbmRsZSk7XG4gICAgdGhpcy5leHBhbmRIYW5kbGUuY2xhc3NMaXN0LmFkZCgnZWRpdG9yLWNvbnRyb2xfX2V4cGFuZC1oYW5kbGUnLCAnanMtZXhwYW5kLWhhbmRsZScpO1xuXG4gICAgdGhpcy5leHBhbmRIYW5kbGUuYXBwZW5kQ2hpbGQodGhpcy5leHBhbmRCdXR0b24pO1xuICAgIHRoaXMuZXhwYW5kQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2VkaXRvci1jb250cm9sX19leHBhbmQtaGFuZGxlX19idXR0b24nKTtcbiAgICB0aGlzLmV4cGFuZEJ1dHRvbi5pbm5lckhUTUwgPSAnKyBBREQnO1xuICAgIHRoaXMuZXhwYW5kSGFuZGxlLm9uY2xpY2sgPSAoKSA9PiB7IHRoaXMudG9nZ2xlRGFzaGJvYXJkKCk7IH07XG5cbiAgICB0aGlzLmVsZW0uYXBwZW5kQ2hpbGQodGhpcy5kYXNoYm9hcmQpO1xuICAgIHRoaXMuZGFzaGJvYXJkLmNsYXNzTGlzdC5hZGQoJ2VkaXRvci1jb250cm9sX19kYXNoYm9hcmQnKTtcblxuICAgIHRoaXMuZGFzaGJvYXJkLmFwcGVuZENoaWxkKHRoaXMuaGVhZGVyQnV0dG9uKTtcbiAgICB0aGlzLmhlYWRlckJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdlZGl0b3ItY29udHJvbF9fZGFzaGJvYXJkX19idXR0b24nLCAnanMtaGVhZGVyLWJ1dHRvbicpO1xuICAgIHRoaXMuaGVhZGVyQnV0dG9uLmlubmVySFRNTCA9ICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjIyXCIgaGVpZ2h0PVwiMTRcIiB2aWV3Qm94PVwiMCAwIDIyIDE0XCI+PHRleHQgZmlsbD1cIiM2NjZcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZm9udC1mYW1pbHk9XCJTb3VyY2VTYW5zUHJvLUJvbGQsIFNvdXJjZSBTYW5zIFByb1wiIGZvbnQtc2l6ZT1cIjIwXCIgZm9udC13ZWlnaHQ9XCJib2xkXCIgdHJhbnNmb3JtPVwidHJhbnNsYXRlKC00OCAtMzMpXCI+PHRzcGFuIHg9XCI0Ni45OFwiIHk9XCI0N1wiPkgxPC90c3Bhbj48L3RleHQ+PC9zdmc+PHA+SGVhZGVyIFRleHQ8L3A+JztcbiAgICB0aGlzLmhlYWRlckJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgZWRpdG9yLmFkZChuZXcgSGVhZGVyQmxvY2soZWRpdG9yLCAnJyksIHRoaXMuYmxvY2spO1xuICAgICAgdGhpcy5jb2xsYXBzZUFsbCgpO1xuICAgIH07XG5cbiAgICB0aGlzLmRhc2hib2FyZC5hcHBlbmRDaGlsZCh0aGlzLnF1b3RlQnV0dG9uKTtcbiAgICB0aGlzLnF1b3RlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2VkaXRvci1jb250cm9sX19kYXNoYm9hcmRfX2J1dHRvbicsICdqcy1xdW90ZS1idXR0b24nKTtcbiAgICB0aGlzLnF1b3RlQnV0dG9uLmlubmVySFRNTCA9ICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjE4XCIgaGVpZ2h0PVwiMTVcIiB2aWV3Qm94PVwiMCAwIDE4IDE1XCI+PHBhdGggZmlsbD1cIiM2NjZcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgZD1cIk02Ljg4MSAxNC4xOTVILjUxMVY5LjY0YzAtMS44NDMuMTYzLTMuMjk4LjQ4OC00LjM2My4zMjUtMS4wNjUuOTI2LTIuMDIxIDEuODAyLTIuODY3QzMuNjc3IDEuNTYyIDQuNzk2Ljg5OCA2LjE1Ni40MTRsMS4yNDYgMi42M2MtMS4yNjkuNDIyLTIuMTggMS4wMTItMi43MzEgMS43NjctLjU1Mi43NTYtLjg0MiAxLjc2LS44NzMgMy4wMTVoMy4wODN2Ni4zN3ptMTAuNjMgMGgtNi4zNjlWOS42NGMwLTEuODU4LjE2My0zLjMxNy40ODgtNC4zNzQuMzI1LTEuMDU4LjkyOS0yLjAxIDEuODEzLTIuODU2Ljg4NC0uODQ3IDEuOTk4LTEuNTExIDMuMzQzLTEuOTk1bDEuMjQ3IDIuNjNjLTEuMjcuNDIyLTIuMTggMS4wMTItMi43MzEgMS43NjctLjU1Mi43NTYtLjg0MyAxLjc2LS44NzMgMy4wMTVoMy4wODN2Ni4zN3pcIi8+PC9zdmc+PHA+UXVvdGU8cD4nO1xuICAgIHRoaXMucXVvdGVCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgIGVkaXRvci5hZGQobmV3IFF1b3RlQmxvY2soZWRpdG9yLCAnJyksIHRoaXMuYmxvY2spO1xuICAgICAgdGhpcy5jb2xsYXBzZUFsbCgpO1xuICAgIH07XG5cbiAgICB0aGlzLmRhc2hib2FyZC5hcHBlbmRDaGlsZCh0aGlzLnRleHRCdXR0b24pO1xuICAgIHRoaXMudGV4dEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdlZGl0b3ItY29udHJvbF9fZGFzaGJvYXJkX19idXR0b24nLCAnanMtdGV4dC1idXR0b24nKTtcbiAgICB0aGlzLnRleHRCdXR0b24uaW5uZXJIVE1MID0gJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIxNlwiIHZpZXdCb3g9XCIwIDAgMjAgMTZcIj48dGV4dCBmaWxsPVwiIzY2NlwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIiBmb250LWZhbWlseT1cIlNvdXJjZVNhbnNQcm8tUmVndWxhciwgU291cmNlIFNhbnMgUHJvXCIgZm9udC1zaXplPVwiMjBcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTE0NiAtMzIpXCI+IDx0c3BhbiB4PVwiMTQ0LjU3XCIgeT1cIjQ3XCI+QmQ8L3RzcGFuPiA8L3RleHQ+PC9zdmc+PHA+Qm9keSBUZXh0PC9wPic7XG4gICAgdGhpcy50ZXh0QnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICBlZGl0b3IuYWRkKG5ldyBUZXh0QmxvY2soZWRpdG9yLCAnJyksIHRoaXMuYmxvY2spO1xuICAgICAgdGhpcy5jb2xsYXBzZUFsbCgpO1xuICAgIH07XG5cbiAgICBpZiAodGhpcy5lZGl0b3Iub3B0aW9ucy51cGxvYWRJbWFnZSkge1xuICAgICAgdGhpcy5pbWFnZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdGhpcy5kYXNoYm9hcmQuYXBwZW5kQ2hpbGQodGhpcy5pbWFnZUJ1dHRvbik7XG5cbiAgICAgIHRoaXMuaW1hZ2VCdXR0b24uY2xhc3NMaXN0LmFkZCgnZWRpdG9yLWNvbnRyb2xfX2Rhc2hib2FyZF9fYnV0dG9uJywgJ2pzLWltYWdlLWJ1dHRvbicpO1xuICAgICAgdGhpcy5pbWFnZUJ1dHRvbi5pbm5lckhUTUwgPSAnPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyNVwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyNSAyMFwiPjxwYXRoIGZpbGw9XCIjNjY2XCIgZmlsbC1ydWxlPVwibm9uemVyb1wiIGQ9XCJNMS45MDIgMEMuODYyIDAgMCAuOTA3IDAgMnYxNmMwIDEuMDkzLjg2MiAyIDEuOTAyIDJoMjEuMTk2YzEuMDQgMCAxLjkwMi0uOTA3IDEuOTAyLTJWMmMwLTEuMDkzLS44NjItMi0xLjkwMi0ySDEuOTAyem0wIDEuNzE0aDIxLjE5NmMuMTY0IDAgLjI3Mi4xMTMuMjcyLjI4NnYxMS4zNTdsLTQuMTEtMy40NTVhLjgwNS44MDUgMCAwIDAtLjk2OS0uMDQ1bC0zLjg1NSAyLjc4Ni01LjIzLTQuNDU1QS43OTguNzk4IDAgMCAwIDguNjAxIDhhLjc5Ni43OTYgMCAwIDAtLjM3My4xNTJMMS42MyAxMi45MzdWMmMwLS4xNzMuMTA4LS4yODYuMjcyLS4yODZ6TTE0LjQwMiA0Yy0xLjM0IDAtMi40NDUgMS4xNjEtMi40NDUgMi41NzEgMCAxLjQxIDEuMTA0IDIuNTcyIDIuNDQ1IDIuNTcyIDEuMzQxIDAgMi40NDYtMS4xNjIgMi40NDYtMi41NzIgMC0xLjQxLTEuMTA1LTIuNTcxLTIuNDQ2LTIuNTcxem0wIDEuNzE0Yy40NiAwIC44MTUuMzc0LjgxNS44NTcgMCAuNDg0LS4zNTUuODU4LS44MTUuODU4LS40NiAwLS44MTUtLjM3NC0uODE1LS44NTggMC0uNDgzLjM1NS0uODU3LjgxNS0uODU3ek04LjY2MiA5LjkzbDUuMjMgNC40NDZhLjgwNS44MDUgMCAwIDAgLjk2OS4wNDVsMy44NDctMi43ODYgNC42NjIgMy45MlYxOGMwIC4xNzMtLjEwOC4yODYtLjI3Mi4yODZIMS45MDJjLS4xNjQgMC0uMjcyLS4xMTMtLjI3Mi0uMjg2di0yLjk3M2w3LjAzMi01LjA5OHpcIi8+PC9zdmc+PHA+SW1hZ2U8L3A+JztcbiAgICAgIHRoaXMuaW1hZ2VCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgZWRpdG9yLmFkZChuZXcgSW1hZ2VCbG9jayhlZGl0b3IsICcnKSwgdGhpcy5ibG9jayk7XG4gICAgICAgIHRoaXMuY29sbGFwc2VBbGwoKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgdGhpcy52aWRlb0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuZGFzaGJvYXJkLmFwcGVuZENoaWxkKHRoaXMudmlkZW9CdXR0b24pO1xuXG4gICAgdGhpcy52aWRlb0J1dHRvbi5jbGFzc0xpc3QuYWRkKCdlZGl0b3ItY29udHJvbF9fZGFzaGJvYXJkX19idXR0b24nLCAnanMtdmlkZW8tYnV0dG9uJylcbiAgICB0aGlzLnZpZGVvQnV0dG9uLmlubmVySFRNTCA9ICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjI1XCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDI1IDIwXCI+PGcgZmlsbD1cIiM2NjZcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCI+PHBhdGggZD1cIk02LjI1IDBDNC45MTUgMCAzLjktLjAwNCAzLjA2LjA5MiAyLjIyMi4xODggMS40ODUuMzk3LjkzOS45NTJjLS41NDUuNTU0LS43NSAxLjMwNS0uODQ2IDIuMTZDLS4wMDIgMy45NjkgMCA1LjAwMyAwIDYuMzY1djcuMjcyYzAgMS4zNi0uMDA0IDIuMzkzLjA5IDMuMjQ4LjA5NS44NTUuMyAxLjYwNi44NDUgMi4xNi41NDQuNTU2IDEuMjgyLjc2NiAyLjEyMi44NjIuODQuMDk3IDEuODU2LjA5NCAzLjE5My4wOTRoMTIuNWMxLjMzNiAwIDIuMzUuMDA0IDMuMTktLjA5Mi44NC0uMDk2IDEuNTc3LS4zMDUgMi4xMjItLjg2LjU0NS0uNTU0Ljc1LTEuMzA1Ljg0Ni0yLjE2LjA5NS0uODU2LjA5Mi0xLjg5LjA5Mi0zLjI1MlY2LjM2NGMwLTEuMzYuMDA0LTIuMzkzLS4wOS0zLjI0OC0uMDk1LS44NTUtLjMtMS42MDUtLjg0NS0yLjE2QzIzLjUyMS40IDIyLjc4My4xOSAyMS45NDMuMDkzIDIxLjEwMy0uMDAyIDIwLjA4NyAwIDE4Ljc1IDBINi4yNXptMCAxLjgxOGgxMi41YzEuMzM2IDAgMi4zMjcuMDA1IDIuOTkzLjA4Mi42NjUuMDc2LjkzNC4yMSAxLjA2LjMzOS4xMjYuMTI5LjI1Ni40MDIuMzMxIDEuMDguMDc1LjY3Ny4wOCAxLjY4NS4wOCAzLjA0NXY3LjI3MmMwIDEuMzYxLS4wMDUgMi4zNy0uMDggMy4wNDctLjA3NS42NzgtLjIwNy45NTEtLjMzMyAxLjA4LS4xMjYuMTI4LS4zOTQuMjYxLTEuMDYuMzM3LS42NjYuMDc2LTEuNjU2LjA4Mi0yLjk5LjA4Mkg2LjI1Yy0xLjMzNyAwLTIuMzI3LS4wMDUtMi45OTMtLjA4Mi0uNjY2LS4wNzYtLjkzNC0uMjEtMS4wNi0uMzM5LS4xMjctLjEyOS0uMjU3LS40MDItLjMzMi0xLjA4LS4wNzUtLjY3Ny0uMDgtMS42ODUtLjA4LTMuMDQ1VjYuMzY0YzAtMS4zNjEuMDA1LTIuMzcuMDgtMy4wNDcuMDc1LS42NzguMjA3LS45NTEuMzMzLTEuMDguMTI2LS4xMjguMzk1LS4yNjEgMS4wNi0uMzM3LjY2Ni0uMDc2IDEuNjU2LS4wODIgMi45OTEtLjA4MnpcIi8+PHBhdGggZD1cIk04Ljc0NCA0LjE5MmExLjM2OSAxLjM2OSAwIDAgMC0uNzA4IDEuMjAydjkuMjEyYzAgLjUuMjcxLjk2NS43MDggMS4yMDIuNDM0LjIzNi45NjUuMjEgMS4zNzQtLjA2N2w2Ljc4NC00LjYwNmguMDAxYTEuMzc2IDEuMzc2IDAgMCAwLS4wMDEtMi4yN2MtMS40MjgtLjk2OC01LjIxNi0zLjU0LTYuNzg0LTQuNjA1YTEuMzI0IDEuMzI0IDAgMCAwLTEuMzc0LS4wNjh6bTEuMDc4IDIuMDVjMS42MSAxLjA5NCA0LjA3OCAyLjc3IDUuNTM1IDMuNzU4bC01LjUzNSAzLjc1N1Y2LjI0M3pcIi8+PC9nPjwvc3ZnPjxwPlZpZGVvPC9wPic7XG4gICAgdGhpcy52aWRlb0J1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgZWRpdG9yLmFkZChuZXcgVmlkZW9CbG9jayhlZGl0b3IsICcnKSwgdGhpcy5ibG9jayk7XG4gICAgfTtcbiAgfVxuXG4gIHRvZ2dsZURhc2hib2FyZCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5kYXNoYm9hcmQuc3R5bGUuZGlzcGxheSA9PSAnbm9uZScpXG4gICAgICB0aGlzLmV4cGFuZERhc2hib2FyZCgpO1xuICAgIGVsc2VcbiAgICAgIHRoaXMuY29sbGFwc2VEYXNoYm9hcmQoKTtcbiAgfVxuXG4gIGNvbGxhcHNlRGFzaGJvYXJkKCk6IHZvaWQge1xuICAgIHRoaXMuZGFzaGJvYXJkLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgdGhpcy5leHBhbmRCdXR0b24uaW5uZXJIVE1MID0gJysgQUREJ1xuICB9XG5cbiAgZXhwYW5kRGFzaGJvYXJkKCk6IHZvaWQge1xuICAgIHRoaXMuY29sbGFwc2VBbGwoKTtcbiAgICB0aGlzLmRhc2hib2FyZC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgIHRoaXMuZXhwYW5kQnV0dG9uLmlubmVySFRNTCA9ICdISURFJztcbiAgfVxuXG4gIGNvbGxhcHNlQWxsKCkge1xuICAgIGZvciAobGV0IGk9MDtpIDwgdGhpcy5lZGl0b3IuYmxvY2tzLmxlbmd0aDtpKyspIHtcbiAgICAgIHRoaXMuZWRpdG9yLmJsb2Nrc1tpXS5jb250cm9sLmNvbGxhcHNlRGFzaGJvYXJkKCk7XG4gICAgfVxuICAgIHRoaXMuZWRpdG9yLmxhc3RDb250cm9sLmNvbGxhcHNlRGFzaGJvYXJkKCk7XG4gIH1cbn0iLCJpbXBvcnQge0NvbnRyb2x9IGZyb20gJy4vY29udHJvbCc7XG5pbXBvcnQge0Jsb2NrLCBCbG9ja1JlYWRlciwgUmF3QmxvY2t9IGZyb20gJy4vYmxvY2svYmxvY2snO1xuaW1wb3J0IHtJbWFnZUJsb2NrUmVhZGVyfSBmcm9tICcuL2Jsb2NrL2ltYWdlLWJsb2NrJztcbmltcG9ydCB7UXVvdGVCbG9ja1JlYWRlcn0gZnJvbSAnLi9ibG9jay9xdW90ZS1ibG9jayc7XG5pbXBvcnQge0hlYWRlckJsb2NrUmVhZGVyfSBmcm9tICcuL2Jsb2NrL2hlYWRlci1ibG9jayc7XG5pbXBvcnQge1RleHRCbG9ja1JlYWRlcn0gZnJvbSAnLi9ibG9jay90ZXh0LWJsb2NrJztcbmltcG9ydCB7VmlkZW9CbG9ja1JlYWRlcn0gZnJvbSAnLi9ibG9jay92aWRlby1ibG9jayc7XG5cbmNvbnN0IEJMT0NLUzogQXJyYXk8QmxvY2tSZWFkZXI+ID0gW1xuICBuZXcgVGV4dEJsb2NrUmVhZGVyKCksXG4gIG5ldyBIZWFkZXJCbG9ja1JlYWRlcigpLFxuICBuZXcgUXVvdGVCbG9ja1JlYWRlcigpLFxuICBuZXcgSW1hZ2VCbG9ja1JlYWRlcigpLFxuICBuZXcgVmlkZW9CbG9ja1JlYWRlcigpLFxuXTtcblxuZnVuY3Rpb24gY29udmVydFJhd0NvbnRlbnQocmF3Q29udGVudDogQXJyYXk8UmF3QmxvY2s+LCBlZGl0b3I6IEVkaXRvcik6IEFycmF5PEJsb2NrPiB7XG4gIGxldCBibG9ja3M6IEFycmF5PEJsb2NrPiA9IFtdO1xuXG4gIGZvciAobGV0IHJhd0Jsb2NrIG9mIHJhd0NvbnRlbnQpIHtcbiAgICBsZXQgcHJvY2Vzc2VkID0gZmFsc2U7XG4gICAgZm9yIChsZXQgYmxvY2sgb2YgQkxPQ0tTKSB7XG4gICAgICBpZiAoYmxvY2suY2FuUGFyc2UocmF3QmxvY2spKSB7XG4gICAgICAgIHByb2Nlc3NlZCA9IHRydWU7XG4gICAgICAgIGJsb2Nrcy5wdXNoKGJsb2NrLnBhcnNlKHJhd0Jsb2NrLCBlZGl0b3IpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFwcm9jZXNzZWQpIHtcbiAgICAgIGNvbnNvbGUud2FybihgVW5yZWNvZ25pemVkIGJsb2NrIHR5cGU6ICcke3Jhd0Jsb2NrLnR5cGV9Jy4gSWdub3JlLmApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBibG9ja3M7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRWRpdG9yT3B0aW9ucyB7XG4gIGNvbnRlbnQ6IEFycmF5PFJhd0Jsb2NrPjtcbiAgdXBsb2FkSW1hZ2U/OiAoZmlsZTogRmlsZSwgc3VjY2Vzc0NhbGxiYWNrOiAodXJsOiBzdHJpbmcpID0+IHZvaWQsIGZhaWx1cmVDYWxsYmFjazogKGVycm9yOiBzdHJpbmcpID0+IHZvaWQpID0+IHZvaWQ7XG4gIG9uQ2hhbmdlPzogKGNvbnRlbnQ6IEFycmF5PFJhd0Jsb2NrPikgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIEVkaXRvciB7XG4gIGJsb2NrczogQXJyYXk8QmxvY2s+O1xuICBsYXN0Q29udHJvbDogQ29udHJvbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbTogSFRNTERpdkVsZW1lbnQsXG4gICAgcHVibGljIG9wdGlvbnM6IEVkaXRvck9wdGlvbnNcbiAgKSB7XG4gICAgdGhpcy5ibG9ja3MgPSBjb252ZXJ0UmF3Q29udGVudCh0aGlzLm9wdGlvbnMuY29udGVudCwgdGhpcyk7XG4gICAgdGhpcy5yZW5kZXIoKTtcblxuICAgIC8vIFRyaWdnZXIgdGhlIGluaXRpYWwgb25DaGFuZ2UgZXZlbnRcbiAgICB0aGlzLnRyaWdnZXJPbkNoYW5nZSgpO1xuICB9XG5cbiAgYWRkKGJsb2NrOiBCbG9jaywgYmVmb3JlQmxvY2s6IEJsb2NrKSB7XG4gICAgaWYgKGJlZm9yZUJsb2NrKSB7XG4gICAgICBmb3IgKGxldCBpPTA7aSA8IHRoaXMuYmxvY2tzLmxlbmd0aDtpKyspIHtcbiAgICAgICAgaWYgKGJlZm9yZUJsb2NrID09IHRoaXMuYmxvY2tzW2ldKSB7XG4gICAgICAgICAgdGhpcy5ibG9ja3Muc3BsaWNlKGksIDAsIGJsb2NrKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5lbGVtLmluc2VydEJlZm9yZShibG9jay5lbGVtLCBiZWZvcmVCbG9jay5lbGVtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ibG9ja3MucHVzaChibG9jayk7XG4gICAgICB0aGlzLmVsZW0uaW5zZXJ0QmVmb3JlKGJsb2NrLmVsZW0sIHRoaXMubGFzdENvbnRyb2wuZWxlbSk7XG4gICAgfVxuXG4gICAgYmxvY2suZm9jdXMoKTtcbiAgICB0aGlzLnRyaWdnZXJPbkNoYW5nZSgpO1xuICB9XG5cbiAgcmVtb3ZlKGJsb2NrOiBCbG9jaykge1xuICAgIGZvciAobGV0IGk9MDtpIDwgdGhpcy5ibG9ja3MubGVuZ3RoO2krKykge1xuICAgICAgaWYgKGJsb2NrID09IHRoaXMuYmxvY2tzW2ldKSB7XG4gICAgICAgIHRoaXMuYmxvY2tzLnNwbGljZShpLCAxKTtcbiAgICAgICAgYmxvY2suZWxlbS5yZW1vdmUoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudHJpZ2dlck9uQ2hhbmdlKCk7XG4gIH1cblxuICByZWRyYXcoKSB7XG4gICAgZm9yIChsZXQgYmxvY2sgb2YgdGhpcy5ibG9ja3MpIHtcbiAgICAgIGJsb2NrLnJlZHJhdygpO1xuICAgIH1cbiAgfVxuXG4gIGdldENvbnRlbnQoKTogQXJyYXk8UmF3QmxvY2s+IHtcbiAgICBsZXQgcmF3Q29udGVudDogQXJyYXk8UmF3QmxvY2s+ID0gW107XG4gICAgZm9yIChsZXQgYmxvY2sgb2YgdGhpcy5ibG9ja3MpIHtcbiAgICAgIHJhd0NvbnRlbnQucHVzaChibG9jay5nZXRSYXdDb250ZW50KCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmF3Q29udGVudDtcbiAgfVxuXG4gIHNob3dEZWxldGVCdXR0b24oYmxvY2s6IEJsb2NrKSB7XG4gICAgZm9yIChsZXQgaT0wO2kgPCB0aGlzLmJsb2Nrcy5sZW5ndGg7aSsrKSB7XG4gICAgICB0aGlzLmJsb2Nrc1tpXS5kZWxldGVCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGlmIChibG9jayA9PSB0aGlzLmJsb2Nrc1tpXSkge1xuICAgICAgICB0aGlzLmJsb2Nrc1tpXS5kZWxldGVCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdHJpZ2dlck9uQ2hhbmdlKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMub25DaGFuZ2UpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5vbkNoYW5nZSh0aGlzLmdldENvbnRlbnQoKSk7IC8vIENhbGwgb25DaGFuZ2Ugd2l0aCBjdXJyZW50IGNvbnRlbnRcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbmRlcigpIHtcbiAgICBmb3IgKGxldCBibG9jayBvZiB0aGlzLmJsb2Nrcykge1xuICAgICAgdGhpcy5lbGVtLmFwcGVuZENoaWxkKGJsb2NrLmVsZW0pO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLmxhc3RDb250cm9sID0gbmV3IENvbnRyb2wodGhpcywgbnVsbCk7XG4gICAgdGhpcy5lbGVtLmFwcGVuZENoaWxkKHRoaXMubGFzdENvbnRyb2wuZWxlbSk7XG4gICAgdGhpcy5sYXN0Q29udHJvbC5leHBhbmREYXNoYm9hcmQoKTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRpZiAoIShtb2R1bGVJZCBpbiBfX3dlYnBhY2tfbW9kdWxlc19fKSkge1xuXHRcdGRlbGV0ZSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7RWRpdG9yLCBFZGl0b3JPcHRpb25zfSBmcm9tICcuL2VkaXRvci9lZGl0b3InXG5pbXBvcnQge1Jhd0Jsb2NrfSBmcm9tICcuL2VkaXRvci9ibG9jay9ibG9jayc7XG5pbXBvcnQge1Jhd0hlYWRlckJsb2NrfSBmcm9tICcuL2VkaXRvci9ibG9jay9oZWFkZXItYmxvY2snO1xuaW1wb3J0IHtSYXdJbWFnZUJsb2NrfSBmcm9tICcuL2VkaXRvci9ibG9jay9pbWFnZS1ibG9jayc7XG5pbXBvcnQge1Jhd1F1b3RlQmxvY2t9IGZyb20gJy4vZWRpdG9yL2Jsb2NrL3F1b3RlLWJsb2NrJztcbmltcG9ydCB7UmF3VGV4dEJsb2NrfSBmcm9tICcuL2VkaXRvci9ibG9jay90ZXh0LWJsb2NrJztcbmltcG9ydCB7UmF3VmlkZW9CbG9ja30gZnJvbSAnLi9lZGl0b3IvYmxvY2svdmlkZW8tYmxvY2snO1xuXG4oPGFueT53aW5kb3cpLmluc3RhbGxFZGl0b3IgPSAoZWxlbTogSFRNTERpdkVsZW1lbnQsIG9wdGlvbnM6IEVkaXRvck9wdGlvbnMgPSAoPEVkaXRvck9wdGlvbnM+e30pKSA9PiB7XG4gIHJldHVybiBuZXcgRWRpdG9yKGVsZW0sIG9wdGlvbnMpO1xufTtcblxuZXhwb3J0IHsgRWRpdG9yLCBFZGl0b3JPcHRpb25zLCBSYXdCbG9jaywgUmF3SGVhZGVyQmxvY2ssIFJhd0ltYWdlQmxvY2ssIFJhd1F1b3RlQmxvY2ssIFJhd1RleHRCbG9jaywgUmF3VmlkZW9CbG9jayB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9