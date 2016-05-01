tui.util.defineNamespace("fedoc.content", {});
fedoc.content["consts.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @author NHN Ent. FE Development Team &lt;dl_javascript@nhnent.com>\n * @fileoverview Constants\n */\n'use strict';\n\nvar util = require('./util');\n\nmodule.exports = {\n    /**\n     * Component names\n     * @type {Object.&lt;string, string>}\n     */\n    componentNames: util.keyMirror(\n        'MAIN',\n        'IMAGE_LOADER',\n        'CROPPER',\n        'FLIP',\n        'ROTATION',\n        'FREE_DRAWING'\n    ),\n\n    /**\n     * Command names\n     * @type {Object.&lt;string, string>}\n     */\n    commandNames: util.keyMirror(\n        'CLEAR',\n        'LOAD_IMAGE',\n        'FLIP_IMAGE',\n        'ROTATE_IMAGE',\n        'ADD_OBJECT',\n        'REMOVE_OBJECT'\n    ),\n\n    /**\n     * Event names\n     * @type {Object.&lt;string, string>}\n     */\n    eventNames: {\n        LOAD_IMAGE: 'loadImage',\n        CLEAR_OBJECTS: 'clearObjects',\n        CLEAR_IMAGE: 'clearImage',\n        START_CROPPING: 'startCropping',\n        END_CROPPING: 'endCropping',\n        FLIP_IMAGE: 'flipImage',\n        ROTATE_IMAGE: 'rotateImage',\n        ADD_OBJECT: 'addObject',\n        REMOVE_OBJECT: 'removeObject',\n        START_FREE_DRAWING: 'startFreeDrawing',\n        END_FREE_DRAWING: 'endFreeDrawing',\n        EMPTY_REDO_STACK: 'emptyRedoStack',\n        EMPTY_UNDO_STACK: 'emptyUndoStack',\n        PUSH_UNDO_STACK: 'pushUndoStack',\n        PUSH_REDO_STACK: 'pushRedoStack'\n    },\n\n    /**\n     * Editor states\n     * @type {Object.&lt;string, string>}\n     */\n    states: util.keyMirror(\n        'NORMAL',\n        'CROP',\n        'FREE_DRAWING'\n    )\n};\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"