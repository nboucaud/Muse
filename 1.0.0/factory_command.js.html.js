tui.util.defineNamespace("fedoc.content", {});
fedoc.content["factory_command.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @author NHN Ent. FE Development Team &lt;dl_javascript@nhnent.com>\n * @fileoverview Command factory\n */\n'use strict';\n\nvar Command = require('../interface/command');\nvar consts = require('../consts');\n\nvar componentNames = consts.componentNames;\nvar commandNames = consts.commandNames;\nvar creators = {};\n\nvar MAIN = componentNames.MAIN;\nvar IMAGE_LOADER = componentNames.IMAGE_LOADER;\nvar FLIP = componentNames.FLIP;\nvar ROTATION = componentNames.ROTATION;\n\n/**\n * Set mapping creators\n */\ncreators[commandNames.LOAD_IMAGE] = createLoadImageCommand;\ncreators[commandNames.FLIP_IMAGE] = createFlipImageCommand;\ncreators[commandNames.ROTATE_IMAGE] = createRotationImageCommand;\ncreators[commandNames.CLEAR_OBJECTS] = createClearCommand;\ncreators[commandNames.ADD_OBJECT] = createAddObjectCommand;\ncreators[commandNames.REMOVE_OBJECT] = createRemoveCommand;\n\n/**\n * @param {fabric.Object} object - Fabric object\n * @returns {Command}\n */\nfunction createAddObjectCommand(object) {\n    tui.util.stamp(object);\n\n    return new Command({\n        /**\n         * @param {object.&lt;string, Component>} compMap - Components injection\n         * @returns {jQuery.Deferred}\n         */\n        execute: function(compMap) {\n            var canvas = compMap[MAIN].getCanvas();\n            var jqDefer = $.Deferred();\n\n            if (!canvas.contains(object)) {\n                canvas.add(object);\n                jqDefer.resolve(object);\n            } else {\n                jqDefer.reject();\n            }\n\n            return jqDefer;\n        },\n        /**\n         * @param {object.&lt;string, Component>} compMap - Components injection\n         * @returns {jQuery.Deferred}\n         */\n        undo: function(compMap) {\n            var canvas = compMap[MAIN].getCanvas();\n            var jqDefer = $.Deferred();\n\n            if (canvas.contains(object)) {\n                canvas.remove(object);\n                jqDefer.resolve(object);\n            } else {\n                jqDefer.reject();\n            }\n\n            return jqDefer;\n        }\n    });\n}\n\n/**\n * @param {string} imageName - Image name\n * @param {string|fabric.Image} img - Image(or url)\n * @returns {Command}\n */\nfunction createLoadImageCommand(imageName, img) {\n    return new Command({\n        /**\n         * @param {object.&lt;string, Component>} compMap - Components injection\n         * @returns {jQuery.Deferred}\n         */\n        execute: function(compMap) {\n            var loader = compMap[IMAGE_LOADER];\n            var canvas = loader.getCanvas();\n\n            this.store = {\n                prevName: loader.getImageName(),\n                prevImage: loader.getCanvasImage(),\n                // Slice: \"canvas.clear()\" clears the objects array, So shallow copy the array\n                objects: canvas.getObjects().slice()\n            };\n            canvas.clear();\n\n            return loader.load(imageName, img);\n        },\n        /**\n         * @param {object.&lt;string, Component>} compMap - Components injection\n         * @returns {jQuery.Deferred}\n         */\n        undo: function(compMap) {\n            var loader = compMap[IMAGE_LOADER];\n            var canvas = loader.getCanvas();\n            var store = this.store;\n\n            canvas.clear();\n            canvas.add.apply(canvas, store.objects);\n\n            return loader.load(store.prevName, store.prevImage);\n        }\n    });\n}\n\n/**\n * @param {string} type - 'flipX' or 'flipY' or 'reset'\n * @returns {$.Deferred}\n */\nfunction createFlipImageCommand(type) {\n    return new Command({\n        /**\n         * @param {object.&lt;string, Component>} compMap - Components injection\n         * @returns {jQuery.Deferred}\n         */\n        execute: function(compMap) {\n            var flipComp = compMap[FLIP];\n\n            this.store = flipComp.getCurrentSetting();\n\n            return flipComp[type]();\n        },\n        /**\n         * @param {object.&lt;string, Component>} compMap - Components injection\n         * @returns {jQuery.Deferred}\n         */\n        undo: function(compMap) {\n            var flipComp = compMap[FLIP];\n\n            return flipComp.set(this.store);\n        }\n    });\n}\n\n/**\n * @param {string} type - 'rotate' or 'setAngle'\n * @param {number} angle - angle value (degree)\n * @returns {$.Deferred}\n */\nfunction createRotationImageCommand(type, angle) {\n    return new Command({\n        /**\n         * @param {object.&lt;string, Component>} compMap - Components injection\n         * @returns {jQuery.Deferred}\n         */\n        execute: function(compMap) {\n            var rotationComp = compMap[ROTATION];\n\n            this.store = rotationComp.getCurrentAngle();\n\n            return rotationComp[type](angle);\n        },\n        /**\n         * @param {object.&lt;string, Component>} compMap - Components injection\n         * @returns {jQuery.Deferred}\n         */\n        undo: function(compMap) {\n            var rotationComp = compMap[ROTATION];\n\n            return rotationComp.setAngle(this.store);\n        }\n    });\n}\n\n/**\n * Clear command\n * @returns {Command}\n */\nfunction createClearCommand() {\n    return new Command({\n        /**\n         * @param {object.&lt;string, Component>} compMap - Components injection\n         * @returns {jQuery.Deferred}\n         */\n        execute: function(compMap) {\n            var canvas = compMap[MAIN].getCanvas();\n            var jqDefer = $.Deferred();\n\n            // Slice: \"canvas.clear()\" clears the objects array, So shallow copy the array\n            this.store = canvas.getObjects().slice();\n            if (this.store.length) {\n                canvas.clear();\n                jqDefer.resolve();\n            } else {\n                jqDefer.reject();\n            }\n\n            return jqDefer;\n        },\n        /**\n         * @param {object.&lt;string, Component>} compMap - Components injection\n         * @returns {jQuery.Deferred}\n         */\n        undo: function(compMap) {\n            var canvas = compMap[MAIN].getCanvas();\n\n            canvas.add.apply(canvas, this.store);\n\n            return $.Deferred().resolve();\n        }\n    });\n}\n\n/**\n * Remove command\n * @param {fabric.Object|fabric.Group} target - Object(s) to remove\n * @returns {Command}\n */\nfunction createRemoveCommand(target) {\n    return new Command({\n        /**\n         * @param {object.&lt;string, Component>} compMap - Components injection\n         * @returns {jQuery.Deferred}\n         */\n        execute: function(compMap) {\n            var canvas = compMap[MAIN].getCanvas();\n            var jqDefer = $.Deferred();\n            var isValidGroup = target &amp;&amp; target.isType('group') &amp;&amp; !target.isEmpty();\n\n            if (isValidGroup) {\n                canvas.discardActiveGroup(); // restore states for each objects\n                this.store = target.getObjects();\n                target.forEachObject(function(obj) {\n                    obj.remove();\n                });\n                jqDefer.resolve();\n            } else if (canvas.contains(target)) {\n                this.store = [target];\n                target.remove();\n                jqDefer.resolve();\n            } else {\n                jqDefer.reject();\n            }\n\n            return jqDefer;\n        },\n        /**\n         * @param {object.&lt;string, Component>} compMap - Components injection\n         * @returns {jQuery.Deferred}\n         */\n        undo: function(compMap) {\n            var canvas = compMap[MAIN].getCanvas();\n\n            canvas.add.apply(canvas, this.store);\n\n            return $.Deferred().resolve();\n        }\n    });\n}\n\n/**\n * Create command\n * @param {string} name - Command name\n * @param {...*} args - Arguments for creating command\n * @returns {Command}\n */\nfunction create(name, args) {\n    args = Array.prototype.slice.call(arguments, 1);\n\n    return creators[name].apply(null, args);\n}\n\n\nmodule.exports = {\n    create: create\n};\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"