*The development of this library has stopped because of personal reasons. Please only use it for uncritical experiments. If you are interested to take ownership of it, you can send me an email to citojsweb@gmail.com.*

# cito.js

cito.js is a JavaScript framework for building fast, scalable and modularized web applications. The core consists of a virtual DOM library inspired by React/Mithril. On top of that, it will provide a component framework which will make it easy to build well-encapsulated components.

## Motivation

You might be wondering why I am trying to build another fancy web framework. Although there has been a lot of change in this area recently, the situation is still not satisfying: Some frameworks look very developer-friendly at first glance, but do not scale well. Others perform and scale rather well, but for example require mingling templates with JavaScript code.

It seems to me that all of the concepts needed to build the next great web framework are already out there, but have just not been combined correctly. The challenge is to choose and combine existing concepts without having to forgo any of their benefits - and that is what this project is all about!

## Priorities

**Performance:** At the time of writing, `cito.vdom` is already one of the fastest virtual DOM library according to the [vdom-benchmark](http://vdom-benchmark.github.io/vdom-benchmark/) - and this will not change!

**Scalability:** Performance without scalability is delusive. This is why there are several features in the pipeline, which will guarantee great performance even with tens of thousands of DOM nodes.

**Developer-friendliness:** While the [`cito.vdom` API](#citovdom-api) is kept simple, it still requires some extra work compared to traditional templates. This is unnecessary and this is where the (not yet revealed) component framework will step in.

**Encapsulation:** The component framework will encourage encapsulating all your components which makes your project easier to comprehend, better testable and more scalable.

**Compatibility:** IE8 is supported and as long as there is no large disadvantage, I will make sure that even in IE6 all tests pass.

## Documentation

Please note that everything in this documentation is subject to change until the first version is released.

### Example Application

Let's start with a simple example application which has a button and a list and whenever you click the button, it doubles the list items.

First, we initialize an array with one list item [node](#element-node):

```javascript
var items = [
    {tag: 'li', children: 'text'}
];
```

Then we define a root function which returns a div container with a button and a list with the previously defined items.

```javascript
function root() {
    return {
        tag: 'div', children: [
            {tag: 'button', children: 'double'},
            {tag: 'ul', children: items}
        ]
    };
}
```

In order to render this root function, we can either use the [`cito.vdom.append`](#citovdom-api) or [`cito.vdom.create`](#citovdom-api) function. We choose the `append` function which does not only create the DOM nodes, but also immediately appends them to a parent node:

```javascript
var rootNode = cito.vdom.append(document.body, root);
```

Next, we want the list to double when you click the button. For that, we have to add a `click` [event handler](#events) which modifies the `items` variable and updates the DOM:

```javascript
function doubleList() {
    items = items.concat(items);
    cito.vdom.update(rootNode, root);
}

function root() {
    return {
        tag: 'div', children: [
            {tag: 'button', children: 'double', events: {click: doubleList},
            {tag: 'ul', children: items}
        ]
    };
}
```

Last but not least, we move the button into its own button function and add a tooltip. Here the complete source code:

```javascript
var items = [
    {tag: 'li', children: 'text'}
];

function doubleList() {
    items = items.concat(items);
    cito.vdom.update(rootNode, root);
}

function button() {
    return {
        tag: 'button',
        attrs: {title: 'double the list'},
        events: {click: doubleList},
        children: 'double'
    }
}

function root() {
    return {
        tag: 'div', children: [
            button,
            {tag: 'ul', children: items}
        ]
    };
}

var rootNode = cito.vdom.append(document.body, root);
```

#### cito.vdom API

The `cito.vdom` API provides all necessary functions to create, update and remove virtual DOM nodes to/from the real DOM.

**cito.vdom.create(node)** and **cito.vdom.append(domParent, node):**
Creates a DOM node for the given virtual node. The virtual node can be of the [node types](#nodes), a [callback function](#partial-updates) or a [promise](#promises).
In case of `append` the DOM node is appended at the end of the given DOM parent element. The created DOM node can be accessed through ```.dom``` on the returned normalized node.

**update(oldNode, node)**: Updates the DOM of the previously created `oldNode` to the state of the given `node`. The rules which are described above for create/append apply here for the new `node` as well.

**updateChildren(element, children)**: Updates the DOM child nodes of `element` to the state of of the given `node`. The `children` argument can either be a node or an array of nodes.

**remove(node)**: Removes a previously created node from the DOM.

#### Nodes

cito.js supports five different virtual node types which are eventually all translated to one, none or multiple regular DOM nodes.

##### Element Node

The element node is the most basic node type. Examples:

```javascript
// Empty element with attributes
{tag: 'img', attrs: {src: 'http://...', alt: 'Image ...'}}

// Element with one child
{tag: 'ul', children: [{tag: 'li', ...}]}
// or without array
{tag: 'ul', children: {tag: 'li', ...}}

// Element with multiple children
{tag: 'ul', children: [
    {tag: 'li', ...},
    {tag: 'li', ...}
]}

// Element with text content
{tag: 'span', children: 'Text ...'}
```

###### Attributes

Element attributes can be set with the `attrs` property. The attribute name is always the same as in HTML. If you provide a boolean for the attribute value, the attribute will be added with an empty string if it is `true` and removed otherwise.

```javascript
// Element with an id and class
{tag: 'input', attrs: {id: 'name-field', 'class': 'important-field'}}

// Input element which is required
{tag: 'input', attrs: {required: true}}
```

###### Inline Style

To style an element, you can either use a CSS string or an object with CSS properties. The object will update only changed properties while the string will simply overwrite the style attribute. The style property name is in both cases the same name as you would use for inline styles.

```javascript
// Element with style string
{tag: 'input', attrs: {style: 'border-bottom: 1px solid black; color: gray;'}}

// Element with style object
{tag: 'input', attrs: {style: {'border-bottom': '1px solid black', color: 'gray'}}}
```

###### Input Elements

While most attributes update DOM element attributes, the attributes `value`, `checked`, `selected` and `selectedIndex` are compared with and update DOM element properties instead. This is because these properties can be influenced by the user directly through browser input fields. If they were only compared with the previous attribute values, the current attribute values would not be enforced.

Moreover, there are a few other noteworthy exceptions:

The content of `textarea` elements must be provided with the `value` attribute instead of the `children` property:

```javascript
{tag: 'textarea', attrs: {value: 'Text ...'}}
```

To define the current option of a `select` element you can either set the `value` or `selectedIndex` attribute or set the `selected` attribute of an `option` directly:

```javascript
// Select option by setting the value
{tag: 'select', attrs: {value: 'val1'}, children: [
    {tag: 'option', attrs: {value: 'val1'}, ...}
]}

// Select option by setting the selectedIndex
{tag: 'select', attrs: {selectedIndex: 0}, children: [
    {tag: 'option', attrs: {value: 'val1'}, ...}
]}

// Select option by setting selected on the option
{tag: 'select', attrs: children: [
    {tag: 'option', attrs: {selected: true}, ...}
]}
```

##### Text Node

Usually, you will use text nodes like this:

```javascript
// Span element with text node
{tag: 'span', children: 'Text ...'}
// Span element with text node and b element
{tag: 'span', children: [
    'Text ...',
    {tag: 'b', children: '...'}
]}
```

But there is also a more advanced form for [keyed nodes](#keyed-nodes):

```javascript
// Text node as object with optional key
{tag: '#', key: '1', children: 'text'}
```

The `#` tag name comes from `#text` which is the DOM name of a text node.

##### Comment Node

```javascript
{tag: '!', children: 'Comment ...'}
```

The `!` tag name comes from `<!--`.

##### HTML Node

HTML nodes allows you to insert pieces of HTML into the DOM. They should only be used if the other node types are not an option, for example if the HTML string comes from another system, since they are inherently vulnerable to XSS attacks:

```javascript
{tag: '<', children: '<div>text</div><div>...'}
```

The `<` tag name comes from `<element>`.

##### Fragments

Fragments are a less common but very powerful feature in virtual DOM libraries. Similar to DOM document fragments, they do not add a node to the DOM themselves and can either be empty or contain one or a list of nodes. Some examples:

Empty: `{}` or `{children: []}`
One child:  `{children: {tag: 'div', ...}}`
Multiple children:

```javascript
{children: [
    {tag: 'div', ...},
    {tag: 'div', ...}
]}
```

Although you could avoid fragments, they often make your program simpler and improve the performance. Let's have a look at the following example:

```javascript
{tag: 'ul', children: list1.concat(list2)}
```

If this node is updated and the last item of the first list has been removed, it will have to re-render all the elements of the second list. Instead of using [keyed nodes](#keyed-nodes) to solve this problem, we can now simply use fragments:

```javascript
{tag: 'ul', children: [
    {children: list1},
    {children: list2}
]}
```

Now, if the last element is removed from the first list, this will not affect the re-rendering of the second list at all because it will compare the two versions of the first and second list separately.

Fragments are used internally for unresolved [promises](#promises) and will play an integral part in the component framework too.

#### Events

Event handlers can be added to element nodes like this:

```javascript
// Element with one event listener
{tag: 'button', events: {
    click: function (event) {
        ...
    }
}}

// Element with multiple event listener of the same type
{tag: 'button', events: {
    click: [
        function (event) {},
        function (event) {}
    ]
}}

// Element with multiple event listener of different types
{tag: 'button', events: {
    click: function (event) {},
    mousemove: function (event) {},
}}
```

If the event handler returns `false`, then the default will be prevented (but in contrast to jQuery it does not stop the propagation).

To remove an event handler, just update the node without the event handler which has to be removed.

##### Event Normalization

The following properties/functions are added to event objects in IE8 and below:

 * preventDefault
 * stopPropagation
 * defaultPrevented
 * target
 * currentTarget

#### Partial Updates

The idea behind virtual DOM libraries is that DOM operations are expensive and that it is much cheaper to generate a JSON representation of the DOM which is then used to update only the differences in the real DOM. However, sometimes the computation and diffing of the virtual DOM is expensive too - especially if you work with big data structures. In that case, you can use partial update callbacks:

```javascript
cito.vdom.append(document.body, {
    tag: 'div',
    children: function (oldChildren) {
        if (!oldChildren) { // oldChildren is undefined when the node is created
            return createExpensiveChildren();
        }
        // If nothing is returned, it does not touch the current DOM
    }
});
```

The callback is always called when the DOM needs to be rendered, but `oldChildren` is only defined if the node was added to the DOM in a previous cycle. If nothing/`undefined` or `oldChildren` is returned, it will keep this subtree of the DOM as it is.

#### Keyed Nodes

Similar to other virtual DOM libraries, cito.js supports keyed nodes:

```javascript
var node = cito.vdom.append(document.body, {
    tag: 'ul',
    children: [
        {tag: 'li', key: 0, children: 'item 0'},
        {tag: 'li', key: 1, children: 'item 1'}
    ]
});

cito.vdom.update(node, {
    tag: 'ul',
    children: [
        {tag: 'li', key: 1, children: 'item 1'},
        {tag: 'li', key: 0, children: 'item 0'}
    ]
});
```

Keyed nodes ensure that only the elements which were really changed are updated even if elements were added/removed before or moved to another position. While common operations like appending and prepending nodes are optimized, it is also very fast at updating random changes like sorting or filtering.

If you only want to add/remove a node conditionally without having overhead you can use [fragments](#fragments) instead of keyed nodes.

#### Promises

*The promise support is disabled at the moment and will soon be moved to a utility.*

Since promises are becoming more and more popular in browsers, cito.js has built-in support for them:

```javascript
{tag:'ul', children: listPromise.then(function (list) {
    return list.map(function (item) {
        return {tag: 'li', children: item.text};
    };
})}
```

Promises can also be used for single nodes:

```javascript
{tag:'ul', children: [
    {tag: 'h1', children: 'Title'},
    textPromise.then(function (text) {
        return text;
    })
]}
```

#### Custom Elements, SVG and MathML

Custom Elements, SVG and MathML are supported out of the box and you don't have to do anything special to use them.

## How to Contribute

I am very interested in your thoughts! If you have any ideas you would like to share with me or if you are even considering working on this project, please do not hesitate to drop me an email at <citojsweb@gmail.com>.

## License

This project is licensed under the [Mozilla Public License version 2.0](https://www.mozilla.org/MPL/2.0/).
