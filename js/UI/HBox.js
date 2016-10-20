var dependencies = [
    'require',
    'Oyat/UI/View',
    'Oyat/Helpers'
]

define('Oyat/UI/HBox', dependencies, function(require) {
    var View = require('Oyat/UI/View'),
        Helpers = require('Oyat/Helpers');

    return View.extend({
        __construct: function() {
            this.__parent();
            this.addType('oyat-hbox');
        },
        add: function(view, options) {
            var cell = this.elements.root.appendChild(Helpers.Element.create('div', {
                className: 'oyat-cell'
            }));
            this.elements.body = cell;

            options = options || {
                position: 'left'
            };

            switch (options.position) {
                case 'right':
                    Helpers.Element.addClassName(cell, 'oyat-right');
                    break;
                case 'left':
                default:
                    Helpers.Element.addClassName(cell, 'oyat-left');
                    break;
            }

            if (options.width) {
                cell.style.width = options.width;
            }

            return this.__parent(view);
        }
    });
});