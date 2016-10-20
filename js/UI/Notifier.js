var dependencies = [
    'require',
    'Oyat/Helpers',
    'Oyat/UI/View'
];

define('Oyat/UI/Notifier', dependencies, function(require) {
    var Helpers = require('Oyat/Helpers'),
        View = require('Oyat/UI/View');

    return View.extend({
        __construct: function(options) {
            this.__parent();
            this.options = {
                position: 'absolute'
            };
            this.setOptions(options);
            this.addType('oyat-notifier');
        },
        notify: function(text, options) {
            var element = Helpers.Element.create('div', {
                className: 'oyat-notification'
            });

            element.appendChild(Helpers.Element.create('div', {
                className: 'oyat-text',
                text: text
            }));

            var timeout = options && options.timeout && options.timeout > 0 ? options.timeout : false;

            if (options && options.className) {
                Helpers.Element.addClassName(element, options.className);
            }

            this.elements.body.appendChild(element);

            if (timeout) {
                window.setTimeout(function() {
                    this.elements.body.removeChild(element);
                }.bind(this), timeout);
            } else {
                element.appendChild(Helpers.Element.create('div', {
                    className: 'oyat-close'
                }))
                    .addEventListener('click', function() {
                        this.elements.body.removeChild(element);
                    }.bind(this));
            }
        }
    });
});