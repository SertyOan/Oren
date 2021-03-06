import Observable from '../Observable.js';
import Helpers from '../Helpers.js';
import './root.css';

var View = Observable.extend({
    __construct: function(options) {
        this.__parent();

        this.isRendered = false;
        this.canHaveChildren = true; // TODO review View and CompositeView
        this.cascadeRendering = true;

        this.handlers = {};
        this.handlers.click = this.emit.bind(this, 'Click');

        this.elements = {};
        this.elements.root = Helpers.Element.create('div');
        this.elements.root.addEventListener('click', this.handlers.click);
        this.elements.body = this.elements.root;

        if(options && options.hidden === true) {
            Helpers.Element.hide(this.elements.root);
        }

        this.children = [];
    },
    setOptions: function(options) {
        this.options = Helpers.Object.extend(this.options, options);
    },
    render: function() {
        if (this.isRendered) {
            throw new Error('Cannot render twice the view in Oyat/UI/View.render');
        }

        if (this.cascadeRendering) {
            for (var i = -1, c = this.children.length; ++i < c;) {
                this.children[i].render();
            }
        }

        this.isRendered = true;
        this.emit('Render');
    },
    add: function(view) {
        if (!this.canHaveChildren) {
            throw new Error('Cannot have children in Oyat/UI/View.add');
        }

        // TODO check if can be remove 
        // view.parent = this;
        this.children.push(view);
        this.elements.body.appendChild(view.elements.root);

        if (this.isRendered && this.cascadeRendering) {
            view.render();
        }

        return view;
    },
    remove: function(view) {
        if (!this.canHaveChildren) {
            throw new Error('Cannot have children in Oyat/UI/View.remove');
        }

        var index = this.children.indexOf(view);

        if (index === -1) {
            throw new Error('Cannot remove a view which is not a child in Oyat/UI/View.remove');
        }

        view.dispose();

        return this.children.splice(index, 1);
    },
    clear: function() {
        while(this.children.length !== 0) {
            var view = this.children[0];
            this.remove(view);
        }
    },
    dispose: function() {
        if (this.isRendered) {
            this.elements.root.parentNode.removeChild(this.elements.root);
            this.isRendered = false;
        }

        this.emit('Dispose');
    },
    addType: function(type) {
        Helpers.Element.addClassName(this.elements.root, type);
    },
    removeType: function(type) {
        Helpers.Element.removeClassName(this.elements.root, type);
    },
    show: function() {
        Helpers.Element.show(this.elements.root);
        this.emit('Show');
    },
    hide: function() {
        Helpers.Element.hide(this.elements.root);
        this.emit('Hide');
    },
    setText: function(text) {
        Helpers.Element.setText(this.elements.body, text);
    },
    setHTML: function(html) {
        Helpers.Element.setHTML(this.elements.body, html);
    }
});

export default View;
