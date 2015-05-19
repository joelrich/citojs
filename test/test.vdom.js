/*
 * Copyright (c) 2015, Joel Richard
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

describe('cito.vdom', function () {

    // TODO separate data from code
    // TODO generate extensive test data automatically

    var domDefs = {
        'attrs div': [
            {
                name: 'none',
                node: {tag: 'div'},
                html: '<div></div>'
            },
            {
                name: 'null',
                node: {tag: 'div', attrs: null},
                html: '<div></div>'
            },
            {
                name: 'empty',
                node: {tag: 'div', attrs: {}},
                html: '<div></div>'
            },
            {
                name: 'id 1',
                node: {tag: 'div', attrs: {id: 'id1'}},
                html: '<div id="id1"></div>'
            },
            {
                name: 'id 2',
                node: {tag: 'div', attrs: {id: 'id2'}},
                html: '<div id="id2"></div>'
            },
            {
                name: 'id and class',
                node: {tag: 'div', attrs: {id: 'id1', 'class': 'class1'}},
                html: '<div id="id1" class="class1"></div>'
            },
            {
                name: 'id and class',
                node: {tag: 'div', attrs: {id: 'id1', 'class': 'class1'}},
                html: '<div id="id1" class="class1"></div>'
            },
            {
                name: 'title',
                node: {tag: 'div', attrs: {title: 'title1'}},
                html: '<div title="title1"></div>'
            },
            {
                name: 'data-attr',
                node: {tag: 'div', attrs: {'data-attr': 'attr1'}},
                html: '<div data-attr="attr1"></div>'
            }
        ],
        'attrs input': [
            {
                name: 'empty',
                node: {tag: 'input'},
                html: '<input>'
            },
            {
                name: 'required false',
                node: {tag: 'input', attrs: {required: false}},
                html: '<input>'
            },
            {
                name: 'required false',
                node: {tag: 'input', attrs: {required: true}},
                html: '<input required>'
            }
        ],
        'general': [
            {
                name: 'children none',
                node: {tag: 'div'},
                html: '<div></div>'
            },
            {
                name: 'children empty',
                node: {tag: 'div', children: []},
                html: '<div></div>'
            },
            {
                name: 'text',
                node: {tag: 'div', children: 'text'},
                html: '<div>text</div>'
            },
            {
                name: 'text array',
                node: {tag: 'div', children: ['text']},
                html: '<div>text</div>'
            },
            {
                name: 'two ul',
                node: {
                    tag: 'div', children: [
                        {tag: 'ul', children: [{tag: 'li', children: ['t0']}]},
                        {tag: 'ul', children: [{tag: 'li', children: ['t1']}, {tag: 'li', children: ['t2']}]}
                    ]
                },
                html: '<div><ul><li>t0</li></ul><ul><li>t1</li><li>t2</li></ul></div>'
            },
            {
                name: 'two ul reversed',
                node: {
                    tag: 'div', children: [
                        {tag: 'ul', children: [{tag: 'li', children: ['t1']}, {tag: 'li', children: ['t2']}]},
                        {tag: 'ul', children: [{tag: 'li', children: ['t0']}]}
                    ]
                },
                html: '<div><ul><li>t1</li><li>t2</li></ul><ul><li>t0</li></ul></div>'
            }
        ],
        'text': [
            {
                name: 'text empty',
                node: {
                    tag: 'div', children: ''
                },
                html: '<div></div>'
            },
            {
                name: 'text empty array',
                node: {
                    tag: 'div', children: ['']
                },
                html: '<div></div>'
            },
            {
                name: 'two texts empty',
                node: {
                    tag: 'div', children: ['', '']
                },
                html: '<div></div>'
            },
            {
                name: 'text object empty',
                node: {
                    tag: 'div', children: {tag: '#', children: ''}
                },
                html: '<div></div>'
            },
            {
                name: 'text object empty array',
                node: {
                    tag: 'div', children: [{tag: '#', children: ''}]
                },
                html: '<div></div>'
            },
            {
                name: 'text',
                node: {
                    tag: 'div', children: 'text'
                },
                html: '<div>text</div>'
            },
            {
                name: 'text object',
                node: {
                    tag: 'div', children: {tag: '#', children: 'text'}
                },
                html: '<div>text</div>'
            },
            {
                name: 'element b + text empty',
                node: {
                    tag: 'div', children: [
                        {tag: 'b', children: 't0'},
                        ''
                    ]
                },
                html: '<div><b>t0</b></div>'
            },
            {
                name: 'element b + text',
                node: {
                    tag: 'div', children: [
                        {tag: 'b', children: 't0'},
                        't1'
                    ]
                },
                html: '<div><b>t0</b>t1</div>'
            },
            {
                name: 'text empty + element b',
                node: {
                    tag: 'div', children: [
                        '',
                        {tag: 'b', children: 't1'}
                    ]
                },
                html: '<div><b>t1</b></div>'
            },
            {
                name: 'text + element b',
                node: {
                    tag: 'div', children: [
                        't0',
                        {tag: 'b', children: 't1'}
                    ]
                },
                html: '<div>t0<b>t1</b></div>'
            },
            {
                name: 'text 0 + text 1',
                node: {
                    tag: 'div', children: ['t0', 't1']
                },
                html: '<div>t0t1</div>'
            },
            {
                name: 'text 1 + text 0',
                node: {
                    tag: 'div', children: ['t1', 't0']
                },
                html: '<div>t1t0</div>'
            }
        ],
        'escaping': [
            {
                name: 'attr',
                node: {tag: 'div', attrs: {title: '\"&'}},
                html: '<div title="&quot;&amp;"></div>'
            },
            {
                name: 'content',
                node: {tag: 'div', children: '<&>'},
                html: '<div>&lt;&amp;&gt;</div>'
            }
        ],
        'comments': [
            {
                name: 'comment 1',
                node: {tag: 'div', children: {tag: '!', children: 'comment 1'}},
                html: '<div><!--comment 1--></div>'
            },
            {
                name: 'comment 2',
                node: {tag: 'div', children: {tag: '!', children: 'comment 2'}},
                html: '<div><!--comment 2--></div>'
            }
        ],
        'html': [
            {
                name: 'html empty',
                node: {
                    tag: 'div', children: {tag: '<', children: ''}
                },
                html: '<div></div>'
            },
            {
                name: 'html empty array',
                node: {
                    tag: 'div', children: [{tag: '<', children: ''}]
                },
                html: '<div></div>'
            },
            {
                name: 'two html empty',
                node: {
                    tag: 'div', children: [
                        {tag: '<', children: ''},
                        {tag: '<', children: ''}
                    ]
                },
                html: '<div></div>'
            },
            {
                name: 'html b',
                node: {
                    tag: 'div', children: {tag: '<', children: '<b>t0</b>'}
                },
                html: '<div><b>t0</b></div>'
            },
            {
                name: 'two html b',
                node: {
                    tag: 'div', children: {tag: '<', children: '<b>t0</b><b>t1</b>'}
                },
                html: '<div><b>t0</b><b>t1</b></div>'
            },
            {
                name: 'element b + html empty',
                node: {
                    tag: 'div', children: [
                        {tag: 'b', children: 't0'},
                        {tag: '<', children: ''}
                    ]
                },
                html: '<div><b>t0</b></div>'
            },
            {
                name: 'element b + html b',
                node: {
                    tag: 'div', children: [
                        {tag: 'b', children: 't0'},
                        {tag: '<', children: '<b>t1</b>'}
                    ]
                },
                html: '<div><b>t0</b><b>t1</b></div>'
            },
            {
                name: 'html empty + element b',
                node: {
                    tag: 'div', children: [
                        {tag: '<', children: ''},
                        {tag: 'b', children: 't1'}
                    ]
                },
                html: '<div><b>t1</b></div>'
            },
            {
                name: 'html b + element b',
                node: {
                    tag: 'div', children: [
                        {tag: '<', children: '<b>t0</b>'},
                        {tag: 'b', children: 't1'}
                    ]
                },
                html: '<div><b>t0</b><b>t1</b></div>'
            },
            {
                name: 'text + html text',
                node: {
                    tag: 'div', children: [
                        't0',
                        {tag: '<', children: 'ht1'}
                    ]
                },
                html: '<div>t0ht1</div>'
            },
            {
                name: 'text + b',
                node: {
                    tag: 'div', children: [
                        't0',
                        {tag: '<', children: '<b>t1</b>'}
                    ]
                },
                html: '<div>t0<b>t1</b></div>'
            },
            {
                name: 'text + (html text + b)',
                node: {
                    tag: 'div', children: [
                        't0',
                        {tag: '<', children: 'ht1<b>t2</b>'}
                    ]
                },
                html: '<div>t0ht1<b>t2</b></div>'
            },
            {
                name: 'html + (html b + text)',
                node: {
                    tag: 'div', children: [
                        't0',
                        {tag: '<', children: '<b>t1</b>ht2'}
                    ]
                },
                html: '<div>t0<b>t1</b>ht2</div>'
            }
        ],
        'lists': [
            {
                name: 'empty',
                node: {
                    tag: 'ul',
                    children: []
                },
                html: '<ul></ul>'
            },
            {
                name: '2 li',
                node: {
                    tag: 'ul',
                    children: [
                        {tag: 'li', children: ['t0']},
                        {tag: 'li', children: ['t', '1']}
                    ]
                },
                html: '<ul><li>t0</li><li>t1</li></ul>'
            },
            {
                name: '3 li',
                node: {
                    tag: 'ul',
                    children: [
                        {tag: 'li', children: ['t', '0']},
                        {tag: 'li', children: ['t1']},
                        {tag: 'li', children: ['t2']}
                    ]
                },
                html: '<ul><li>t0</li><li>t1</li><li>t2</li></ul>'
            },
            {
                name: '5 li',
                node: {
                    tag: 'ul',
                    children: [
                        {tag: 'li', children: ['t0']},
                        {tag: 'li', children: ['t1']},
                        {tag: 'li', children: ['t2']},
                        {tag: 'li', children: ['t', '3']},
                        {tag: 'li', children: ['t', '4']}
                    ]
                },
                html: '<ul><li>t0</li><li>t1</li><li>t2</li><li>t3</li><li>t4</li></ul>'
            }
        ],
        'keyed lists': [
            {
                name: '0',
                node: {
                    tag: 'ul',
                    children: [{tag: 'li', key: 0, children: ['t0']}]
                },
                html: '<ul><li>t0</li></ul>'
            },
            {
                name: '1',
                node: {
                    tag: 'ul',
                    children: [{tag: 'li', key: 1, children: ['t1']}]
                },
                html: '<ul><li>t1</li></ul>'
            },
            {
                name: '2',
                node: {
                    tag: 'ul',
                    children: [{tag: 'li', key: 2, children: ['t2']}]
                },
                html: '<ul><li>t2</li></ul>'
            },
            {
                name: '9',
                node: {
                    tag: 'ul',
                    children: [{tag: 'li', key: 9, children: ['t9']}]
                },
                html: '<ul><li>t9</li></ul>'
            },
            {
                name: '0-1-2',
                node: {
                    tag: 'ul',
                    children: [
                        {tag: 'li', key: 0, children: ['t0']},
                        {tag: 'li', key: 1, children: ['t1']},
                        {tag: 'li', key: 2, children: ['t2']}
                    ]
                },
                html: '<ul><li>t0</li><li>t1</li><li>t2</li></ul>'
            },
            {
                name: '1-0-2',
                node: {
                    tag: 'ul',
                    children: [
                        {tag: 'li', key: 1, children: ['t1']},
                        {tag: 'li', key: 0, children: ['t0']},
                        {tag: 'li', key: 2, children: ['t2']}
                    ]
                },
                html: '<ul><li>t1</li><li>t0</li><li>t2</li></ul>'
            },
            {
                name: '0-2-1',
                node: {
                    tag: 'ul',
                    children: [
                        {tag: 'li', key: 0, children: ['t0']},
                        {tag: 'li', key: 2, children: ['t2']},
                        {tag: 'li', key: 1, children: ['t1']}
                    ]
                },
                html: '<ul><li>t0</li><li>t2</li><li>t1</li></ul>'
            },
            {
                name: '1-2',
                node: {
                    tag: 'ul',
                    children: [
                        {tag: 'li', key: 1, children: ['t1']},
                        {tag: 'li', key: 2, children: ['t2']}
                    ]
                },
                html: '<ul><li>t1</li><li>t2</li></ul>'
            },
            {
                name: '0-1',
                node: {
                    tag: 'ul',
                    children: [
                        {tag: 'li', key: 0, children: ['t0']},
                        {tag: 'li', key: 1, children: ['t1']}
                    ]
                },
                html: '<ul><li>t0</li><li>t1</li></ul>'
            },
            {
                name: '0-1-2-3-4',
                node: {
                    tag: 'ul',
                    children: [
                        {tag: 'li', key: 0, children: ['t0']},
                        {tag: 'li', key: 1, children: ['t1']},
                        {tag: 'li', key: 2, children: ['t2']},
                        {tag: 'li', key: 3, children: ['t3']},
                        {tag: 'li', key: 4, children: ['t4']}
                    ]
                },
                html: '<ul><li>t0</li><li>t1</li><li>t2</li><li>t3</li><li>t4</li></ul>'
            },
            {
                name: '4-3-2-1-0',
                node: {
                    tag: 'ul',
                    children: [
                        {tag: 'li', key: 4, children: ['t4']},
                        {tag: 'li', key: 3, children: ['t3']},
                        {tag: 'li', key: 2, children: ['t2']},
                        {tag: 'li', key: 1, children: ['t1']},
                        {tag: 'li', key: 0, children: ['t0']}
                    ]
                },
                html: '<ul><li>t4</li><li>t3</li><li>t2</li><li>t1</li><li>t0</li></ul>'
            },
            {
                name: '2-1-4-0-3',
                node: {
                    tag: 'ul',
                    children: [
                        {tag: 'li', key: 2, children: ['t2']},
                        {tag: 'li', key: 1, children: ['t1']},
                        {tag: 'li', key: 4, children: ['t4']},
                        {tag: 'li', key: 0, children: ['t0']},
                        {tag: 'li', key: 3, children: ['t3']}
                    ]
                },
                html: '<ul><li>t2</li><li>t1</li><li>t4</li><li>t0</li><li>t3</li></ul>'
            },
            {
                name: '4-1-2',
                node: {
                    tag: 'ul',
                    children: [
                        {tag: 'li', key: 4, children: ['t4']},
                        {tag: 'li', key: 1, children: ['t1']},
                        {tag: 'li', key: 2, children: ['t2']}
                    ]
                },
                html: '<ul><li>t4</li><li>t1</li><li>t2</li></ul>'
            },
            {
                name: '0-4',
                node: {
                    tag: 'ul',
                    children: [
                        {tag: 'li', key: 0, children: ['t0']},
                        {tag: 'li', key: 4, children: ['t4']}
                    ]
                },
                html: '<ul><li>t0</li><li>t4</li></ul>'
            },
            {
                name: '0-5-4',
                node: {
                    tag: 'ul',
                    children: [
                        {tag: 'li', key: 0, children: ['t0']},
                        {tag: 'li', key: 5, children: ['t5']},
                        {tag: 'li', key: 4, children: ['t4']}
                    ]
                },
                html: '<ul><li>t0</li><li>t5</li><li>t4</li></ul>'
            },
            {
                name: '0-5-6-4',
                node: {
                    tag: 'ul',
                    children: [
                        {tag: 'li', key: 0, children: ['t0']},
                        {tag: 'li', key: 6, children: ['t6']},
                        {tag: 'li', key: 5, children: ['t5']},
                        {tag: 'li', key: 4, children: ['t4']}
                    ]
                },
                html: '<ul><li>t0</li><li>t6</li><li>t5</li><li>t4</li></ul>'
            }
        ],
        'keyed html': [
            {
                name: '0',
                node: {
                    tag: 'div',
                    children: [
                        {tag: '<', key: 0, children: '<b>t0.0</b><b>t0.1</b>'}
                    ]
                },
                html: '<div><b>t0.0</b><b>t0.1</b></div>'
            },
            {
                name: '1',
                node: {
                    tag: 'div',
                    children: [
                        {tag: '<', key: 1, children: '<b>t1.0</b><b>t1.1</b>'}
                    ]
                },
                html: '<div><b>t1.0</b><b>t1.1</b></div>'
            },
            {
                name: '0-1',
                node: {
                    tag: 'div',
                    children: [
                        {tag: '<', key: 0, children: '<b>t0.0</b><b>t0.1</b>'},
                        {tag: '<', key: 1, children: '<b>t1.0</b><b>t1.1</b>'}
                    ]
                },
                html: '<div><b>t0.0</b><b>t0.1</b><b>t1.0</b><b>t1.1</b></div>'
            },
            {
                name: '1-0',
                node: {
                    tag: 'div',
                    children: [
                        {tag: '<', key: 1, children: '<b>t1.0</b><b>t1.1</b>'},
                        {tag: '<', key: 0, children: '<b>t0.0</b><b>t0.1</b>'}
                    ]
                },
                html: '<div><b>t1.0</b><b>t1.1</b><b>t0.0</b><b>t0.1</b></div>'
            }
        ],
        'style': [
            {
                name: 'none',
                node: {tag: 'div'},
                html: '<div></div>'
            },
            {
                name: 'null',
                node: {tag: 'div', attrs: {style: null}},
                html: '<div></div>'
            },
            {
                name: 'string empty',
                node: {tag: 'div', attrs: {style: ''}},
                html: '<div></div>'
            },
            {
                name: 'string color',
                node: {tag: 'div', attrs: {style: 'color: red;'}},
                html: '<div style="color: red;"></div>'
            },
            {
                name: 'string color and display',
                node: {tag: 'div', attrs: {style: 'color: red; display: inline;'}},
                html: '<div style="color: red; display: inline;"></div>'
            },
            {
                name: 'object empty',
                node: {tag: 'div', attrs: {style: {}}},
                html: '<div></div>'
            },
            {
                name: 'object color',
                node: {tag: 'div', attrs: {style: {color: 'red'}}},
                html: '<div style="color: red;"></div>'
            },
            {
                name: 'object color and display',
                node: {tag: 'div', attrs: {style: {color: 'red', display: 'inline'}}},
                html: '<div style="color: red; display: inline;"></div>'
            },
            {
                name: 'object color !important',
                node: {tag: 'div', attrs: {style: {color: 'red !important'}}},
                html: '<div style="color: red !important;"></div>'
            }
        ],
        'simple fragments': [
            {
                name: 'fragment without children',
                node: {tag: 'div', children: {}},
                html: '<div></div>'
            },
            {
                name: 'two fragments without children',
                node: {tag: 'div', children: [{}, {}]},
                html: '<div></div>'
            },
            {
                name: 'fragment with empty children array',
                node: {tag: 'div', children: {children: []}},
                html: '<div></div>'
            },
            {
                name: 'fragment with null children',
                node: {tag: 'div', children: {children: null}},
                html: '<div></div>'
            },
            {
                name: 'fragment with text children array',
                node: {tag: 'div', children: {children: ['text']}},
                html: '<div>text</div>'
            },
            {
                name: 'fragment with text child',
                node: {tag: 'div', children: {children: 'text'}},
                html: '<div>text</div>'
            }
        ],
        'surrounded fragments': [
            {
                name: 'div + empty fragment',
                node: {
                    tag: 'div',
                    children: [
                        {tag: 'div', children: 't0'},
                        {
                            children: []
                        }
                    ]
                },
                html: '<div><div>t0</div></div>'
            },
            {
                name: 'div + fragment with 2 div',
                node: {
                    tag: 'div',
                    children: [
                        {tag: 'div', children: 't0'},
                        {
                            children: [
                                {tag: 'div', children: 't1'},
                                {tag: 'div', children: 't2'}
                            ]
                        }
                    ]
                },
                html: '<div><div>t0</div><div>t1</div><div>t2</div></div>'
            },
            {
                name: 'fragment with 2 div + div',
                node: {
                    tag: 'div',
                    children: [
                        {
                            children: [
                                {tag: 'div', children: 't1'},
                                {tag: 'div', children: 't2'}
                            ]
                        },
                        {tag: 'div', children: 't3'}
                    ]
                },
                html: '<div><div>t1</div><div>t2</div><div>t3</div></div>'
            },
            {
                name: 'fragment with 2 div',
                node: {
                    tag: 'div',
                    children: [
                        {
                            children: [
                                {tag: 'div', children: 't1'},
                                {tag: 'div', children: 't2'}
                            ]
                        }
                    ]
                },
                html: '<div><div>t1</div><div>t2</div></div>'
            },
            {
                name: 'div + fragment with 3 div',
                node: {
                    tag: 'div',
                    children: [
                        {tag: 'div', children: 't0'},
                        {
                            children: [
                                {tag: 'div', children: 't1'},
                                {tag: 'div', children: 't2'},
                                {tag: 'div', children: 't3'}
                            ]
                        }
                    ]
                },
                html: '<div><div>t0</div><div>t1</div><div>t2</div><div>t3</div></div>'
            },
            {
                name: 'div + fragment with 2 div + div',
                node: {
                    tag: 'div',
                    children: [
                        {tag: 'div', children: 't0'},
                        {
                            children: [
                                {tag: 'div', children: 't1'},
                                {tag: 'div', children: 't2'}
                            ]
                        },
                        {tag: 'div', children: 't3'}
                    ]
                },
                html: '<div><div>t0</div><div>t1</div><div>t2</div><div>t3</div></div>'
            },
            {
                name: 'div + empty fragment + div',
                node: {
                    tag: 'div',
                    children: [
                        {tag: 'div', children: 't0'},
                        {
                            children: []
                        },
                        {tag: 'div', children: 't3'}
                    ]
                },
                html: '<div><div>t0</div><div>t3</div></div>'
            },
            {
                name: 'div + fragment with text + div',
                node: {
                    tag: 'div',
                    children: [
                        {tag: 'div', children: 't0'},
                        {
                            children: 't1'
                        },
                        {tag: 'div', children: 't3'}
                    ]
                },
                html: '<div><div>t0</div>t1<div>t3</div></div>'
            },
            {
                name: 'div + fragment with html + div',
                node: {
                    tag: 'div',
                    children: [
                        {tag: 'div', children: 't0'},
                        {
                            children: {tag: '<', children: '<b>t1</b>'}
                        },
                        {tag: 'div', children: 't3'}
                    ]
                },
                html: '<div><div>t0</div><b>t1</b><div>t3</div></div>'
            }
        ],
        'keyed fragments': [
            {
                name: '0',
                node: {
                    tag: 'ul',
                    children: [
                        {key: 0, children: [{tag: 'li', children: 't0.0'},{tag: 'li', children: 't0.1'}]}
                    ]
                },
                html: '<ul><li>t0.0</li><li>t0.1</li></ul>'
            },
            {
                name: '0-1',
                node: {
                    tag: 'ul',
                    children: [
                        {key: 0, children: [{tag: 'li', children: 't0.0'},{tag: 'li', children: 't0.1'}]},
                        {key: 1, children: [{tag: 'li', children: 't1.0'},{tag: 'li', children: 't1.1'}]}
                    ]
                },
                html: '<ul><li>t0.0</li><li>t0.1</li><li>t1.0</li><li>t1.1</li></ul>'
            },
            {
                name: '1-0',
                node: {
                    tag: 'ul',
                    children: [
                        {key: 1, children: [{tag: 'li', children: 't1.0'},{tag: 'li', children: 't1.1'}]},
                        {key: 0, children: [{tag: 'li', children: 't0.0'},{tag: 'li', children: 't0.1'}]}
                    ]
                },
                html: '<ul><li>t1.0</li><li>t1.1</li><li>t0.0</li><li>t0.1</li></ul>'
            },
            {
                name: '1',
                node: {
                    tag: 'ul',
                    children: [
                        {key: 1, children: [{tag: 'li', children: 't1.0'},{tag: 'li', children: 't1.1'}]}
                    ]
                },
                html: '<ul><li>t1.0</li><li>t1.1</li></ul>'
            },
            {
                name: '0-1-2',
                node: {
                    tag: 'ul',
                    children: [
                        {key: 0, children: [{tag: 'li', children: 't0.0'},{tag: 'li', children: 't0.1'}]},
                        {key: 1, children: [{tag: 'li', children: 't1.0'},{tag: 'li', children: 't1.1'}]},
                        {key: 2, children: [{tag: 'li', children: 't2.0'},{tag: 'li', children: 't2.1'}]}
                    ]
                },
                html: '<ul><li>t0.0</li><li>t0.1</li><li>t1.0</li><li>t1.1</li><li>t2.0</li><li>t2.1</li></ul>'
            },
            {
                name: '2-1-0',
                node: {
                    tag: 'ul',
                    children: [
                        {key: 2, children: [{tag: 'li', children: 't2.0'},{tag: 'li', children: 't2.1'}]},
                        {key: 1, children: [{tag: 'li', children: 't1.0'},{tag: 'li', children: 't1.1'}]},
                        {key: 0, children: [{tag: 'li', children: 't0.0'},{tag: 'li', children: 't0.1'}]}
                    ]
                },
                html: '<ul><li>t2.0</li><li>t2.1</li><li>t1.0</li><li>t1.1</li><li>t0.0</li><li>t0.1</li></ul>'
            },
            {
                name: '0-2',
                node: {
                    tag: 'ul',
                    children: [
                        {key: 0, children: [{tag: 'li', children: 't0.0'},{tag: 'li', children: 't0.1'}]},
                        {key: 2, children: [{tag: 'li', children: 't2.0'},{tag: 'li', children: 't2.1'}]}
                    ]
                },
                html: '<ul><li>t0.0</li><li>t0.1</li><li>t2.0</li><li>t2.1</li></ul>'
            },
            {
                name: '2-0',
                node: {
                    tag: 'ul',
                    children: [
                        {key: 2, children: [{tag: 'li', children: 't2.0'},{tag: 'li', children: 't2.1'}]},
                        {key: 0, children: [{tag: 'li', children: 't0.0'},{tag: 'li', children: 't0.1'}]}
                    ]
                },
                html: '<ul><li>t2.0</li><li>t2.1</li><li>t0.0</li><li>t0.1</li></ul>'
            }
        ],
        'nested fragments': [
            {
                name: 'fragment > text',
                node: {
                    tag: 'div',
                    children: {children: {children: 't0'}}
                },
                html: '<div>t0</div>'
            },
            {
                name: 'fragment > div',
                node: {
                    tag: 'div',
                    children: {children: {tag: 'div', children: 't0'}}
                },
                html: '<div><div>t0</div></div>'
            },
            {
                name: 'fragment > fragment > text',
                node: {
                    tag: 'div',
                    children: {children: {children: 't00'}}
                },
                html: '<div>t00</div>'
            },
            {
                name: 'fragment > fragment > text + text',
                node: {
                    tag: 'div',
                    children: {children: {children: ['t00', 't01']}}
                },
                html: '<div>t00t01</div>'
            },
            {
                name: 'fragment > fragment > html',
                node: {
                    tag: 'div',
                    children: {children: {children: {tag: '<', children: '<b>t00</b>'}}}

                },
                html: '<div><b>t00</b></div>'
            },
            {
                name: 'fragment > fragment > div',
                node: {
                    tag: 'div',
                    children: {children: {children: {tag: 'div', children: 't00'}}}
                },
                html: '<div><div>t00</div></div>'
            },
            {
                name: 'fragment > fragment > div + div',
                node: {
                    tag: 'div',
                    children: {children: {children: [{tag: 'div', children: 't00'}, {tag: 'div', children: 't01'}]}}
                },
                html: '<div><div>t00</div><div>t01</div></div>'
            }
        ]
    };

    /*
    function immediatePromise(valueCallback) {
        return {then: function (thenCallback) {
            thenCallback(valueCallback());
        }};
    }

    function timeoutPromise(valueCallback) {
        return {then: function (thenCallback) {
            window.setTimeout(function () {
                thenCallback(valueCallback());
            }, 0);
        }};
    }

    domDefs['promise'] = [
        {
            name: 'children immediate',
            node: {
                tag: 'ul', children: immediatePromise(function () {
                    return [
                        {tag: 'li', children: 't0'}
                    ]
                })
            },
            html: '<ul><li>t0</li></ul>',
            htmlDelayed: '<ul><li>t0</li></ul>'
        },
        {
            name: 'children timeout',
            node: {
                tag: 'ul', children: timeoutPromise(function () {
                    return [
                        {tag: 'li', children: 't0'}
                    ]
                })
            },
            html: '<ul></ul>',
            htmlDelayed: '<ul><li>t0</li></ul>'
        },
        {
            name: 'child immediate',
            node: {
                tag: 'ul', children: [
                    immediatePromise(function () {
                        return {tag: 'li', children: 't0'};
                    })
                ]
            },
            html: '<ul><li>t0</li></ul>',
            htmlDelayed: '<ul><li>t0</li></ul>'
        },
        {
            name: 'child timeout',
            node: {
                tag: 'ul', children: [
                    timeoutPromise(function () {
                        return {tag: 'li', children: 't0'};
                    })
                ]
            },
            html: '<ul></ul>',
            htmlDelayed: '<ul><li>t0</li></ul>'
        },
        {
            name: 'child immediate before',
            node: {
                tag: 'ul', children: [
                    immediatePromise(function () {
                        return {tag: 'li', children: 't0'}
                    }),
                    {tag: 'li', children: 't1'}
                ]
            },
            html: '<ul><li>t0</li><li>t1</li></ul>',
            htmlDelayed: '<ul><li>t0</li><li>t1</li></ul>'
        },
        {
            name: 'child timeout before',
            node: {
                tag: 'ul', children: [
                    timeoutPromise(function () {
                        return {tag: 'li', children: 't0'}
                    }),
                    {tag: 'li', children: 't1'}
                ]
            },
            html: '<ul><li>t1</li></ul>',
            htmlDelayed: '<ul><li>t0</li><li>t1</li></ul>'
        },
        {
            name: 'child immediate after',
            node: {
                tag: 'ul', children: [
                    {tag: 'li', children: 't0'},
                    immediatePromise(function () {
                        return {tag: 'li', children: 't1'}
                    })
                ]
            },
            html: '<ul><li>t0</li><li>t1</li></ul>',
            htmlDelayed: '<ul><li>t0</li><li>t1</li></ul>'
        },
        {
            name: 'child timeout after',
            node: {
                tag: 'ul', children: [
                    {tag: 'li', children: 't0'},
                    timeoutPromise(function () {
                        return {tag: 'li', children: 't1'}
                    })
                ]
            },
            html: '<ul><li>t0</li></ul>',
            htmlDelayed: '<ul><li>t0</li><li>t1</li></ul>'
        },
        {
            name: 'two children timeout',
            node: {
                tag: 'ul', children: [
                    timeoutPromise(function () {
                        return {tag: 'li', children: 't0'}
                    }),
                    timeoutPromise(function () {
                        return {tag: 'li', children: 't1'}
                    })
                ]
            },
            html: '<ul></ul>',
            htmlDelayed: '<ul><li>t0</li><li>t1</li></ul>'
        },
        {
            name: 'wrapped child timeout',
            node: {
                tag: 'div',
                children: [
                    {
                        tag: 'ul', children: [
                        timeoutPromise(function () {
                            return {tag: 'li', children: 't0'}
                        })
                    ]
                    }
                ]
            },
            html: '<div><ul></ul></div>',
            htmlDelayed: '<div><ul><li>t0</li></ul></div>'
        }
    ];
    */

    var ulTwoLi = {
        tag: 'ul',
        children: [
            {tag: 'li', children: 't0'},
            {tag: 'li', children: 't1'}
        ]
    };
    var twoLi = [
        {tag: 'li', children: 't0'},
        {tag: 'li', children: 't1'}
    ];
    var callbackOldNodes;
    var liFunc = function (oldNode) {
        callbackOldNodes && callbackOldNodes.push(oldNode);
        return {tag: 'li', children: 't'};
    };
    domDefs['callback'] = [
        {
            name: 'ul',
            node: function (oldNode) {
                callbackOldNodes && callbackOldNodes.push(oldNode);
                return _.cloneDeep(ulTwoLi);
            },
            html: '<ul><li>t0</li><li>t1</li></ul>',
            oldNodes: [ulTwoLi]
        },
        {
            name: 'ul children',
            node: {
                tag: 'ul',
                children: function (oldChildren) {
                    callbackOldNodes && callbackOldNodes.push(oldChildren);
                    return _.cloneDeep(twoLi);
                }
            },
            html: '<ul><li>t0</li><li>t1</li></ul>',
            oldNodes: [twoLi]
        },
        {
            name: 'ul li',
            node: {
                tag: 'ul',
                children: [liFunc, liFunc]
            },
            html: '<ul><li>t</li><li>t</li></ul>',
            oldNodes: [liFunc(), liFunc()]
        }
    ];

    domDefs['callback retain'] = [
        {
            name: 'children',
            node: {
                tag: 'ul',
                children: function (oldChildren) {
                    if (!oldChildren) {
                        return [
                            {tag: 'li', children: 't0'},
                            {tag: 'li', children: 't1'}
                        ];
                    }
                }
            },
            html: '<ul><li>t0</li><li>t1</li></ul>',
            updateOnlySelf: true
        },
        {
            name: 'child',
            node: {
                tag: 'ul',
                children: [
                    function (oldChild) { if (!oldChild) return {tag: 'li', children: 't0'}}
                ]
            },
            html: '<ul><li>t0</li></ul>',
            updateOnlySelf: true
        },
        {
            name: 'two children',
            node: {
                tag: 'ul',
                children: [
                    function (oldChild) { if (!oldChild) return {tag: 'li', children: 't0'}},
                    function (oldChild) { if (!oldChild) return {tag: 'li', children: 't1'}}
                ]
            },
            html: '<ul><li>t0</li><li>t1</li></ul>',
            updateOnlySelf: true
        }
    ];

    var helperDiv = document.createElement('div');
    function supportsNamespace(tag) {
        helperDiv.innerHTML = '<' + tag + '>';
        var firstChild = helperDiv.firstChild;
        return firstChild ? firstChild.namespaceURI !== helperDiv.namespaceURI : false;
    }

    if (supportsNamespace('svg')) {
        var svgNamespaces = {
            'http://www.w3.org/2000/svg': ['svg', 'a', 'circle'],
            'http://www.w3.org/1999/xlink': ['xlink:href']
        };
        domDefs['svg'] = [
            {
                name: 'link',
                node: {
                    tag: 'svg',
                    attrs: {height: 20, width: 40},
                    children: {
                        tag: 'a',
                        attrs: {'xlink:href': 'http://link'},
                        children: {tag: 'text', attrs: {x: 0, y: 0}, children: 'link'}
                    }
                },
                html: '<svg height="20" width="40"><a xlink:href="http://link"><text x="0" y="0">link</text></a></svg>',
                namespaces: svgNamespaces
            },
            {
                name: 'two links',
                node: {
                    tag: 'svg',
                    attrs: {height: 20, width: 40},
                    children: [
                        {
                            tag: 'a',
                            attrs: {'xlink:href': 'http://link1'},
                            children: {tag: 'text', attrs: {x: 0, y: 0}, children: 'link1'}
                        },
                        {
                            tag: 'a',
                            attrs: {'xlink:href': 'http://link2'},
                            children: {tag: 'text', attrs: {x: 0, y: 0}, children: 'link2'}
                        }
                    ]
                },
                html: '<svg height="20" width="40"><a xlink:href="http://link1"><text x="0" y="0">link1</text></a><a xlink:href="http://link2"><text x="0" y="0">link2</text></a></svg>',
                namespaces: svgNamespaces
            },
            {
                name: 'circle',
                node: {
                    tag: 'svg',
                    attrs: {height: 40, width: 40},
                    children: {
                        tag: 'circle',
                        attrs: {cx: 20, cy: 20, r: 10, stroke: 'black', 'stroke-width': 1, fill: 'red'}
                    }
                },
                html: '<svg height="40" width="40"><circle cx="20" cy="20" r="10" stroke="black" stroke-width="1" fill="red"></circle></svg>',
                namespaces: svgNamespaces
            },
            {
                name: 'wrapped circle',
                node: {
                    tag: 'div',
                    children: {
                        tag: 'svg',
                        attrs: {height: 40, width: 40},
                        children: {
                            tag: 'circle',
                            attrs: {cx: 20, cy: 20, r: 10, stroke: 'black', 'stroke-width': 1, fill: 'red'}
                        }
                    }
                },
                html: '<div><svg height="40" width="40"><circle cx="20" cy="20" r="10" stroke="black" stroke-width="1" fill="red"></circle></svg></div>',
                namespaces: svgNamespaces
            },
            {
                name: 'circle fragment',
                node: {
                    tag: 'svg',
                    children: {children: [{tag: 'circle'}]}
                },
                html: '<svg><circle></circle></svg>',
                namespaces: svgNamespaces
            },
            {
                name: 'two circles fragment',
                node: {
                    tag: 'svg',
                    children: {children: [{tag: 'circle'}, {tag: 'circle'}]}
                },
                html: '<svg><circle></circle><circle></circle></svg>',
                namespaces: svgNamespaces
            }
        ];
    }
    if (supportsNamespace('math')) {
        var mathmlNamespaces = {
            'http://www.w3.org/1998/Math/MathML': ['math', 'mi', 'mo']
        };
        domDefs['mathml'] = [
            {
                name: 'a',
                node: {
                    tag: 'math',
                    children: {tag: 'mi', children: 'a'}
                },
                html: '<math><mi>a</mi></math>',
                namespaces: mathmlNamespaces
            },
            {
                name: 'a + b',
                node: {
                    tag: 'math',
                    children: [
                        {tag: 'mi', children: 'a'},
                        {tag: 'mo', children: '+'},
                        {tag: 'mi', children: 'b'}
                    ]
                },
                html: '<math><mi>a</mi><mo>+</mo><mi>b</mi></math>',
                namespaces: mathmlNamespaces
            },
            {
                name: 'a + c',
                node: {
                    tag: 'math',
                    children: [
                        {tag: 'mi', children: 'a'},
                        {tag: 'mo', children: '+'},
                        {tag: 'mi', children: 'c'}
                    ]
                },
                html: '<math><mi>a</mi><mo>+</mo><mi>c</mi></math>',
                namespaces: mathmlNamespaces
            }
        ];
    }

    describe('#create()', function () {
        describe('DOM', function () {
            _.forEach(domDefs, function (defs, groupName) {
                describe(groupName, function () {
                    _.forEach(defs, function (def) {
                        it(def.name, function () {
                            var node = cito.vdom.create(_.cloneDeep(def.node));
                            expect(node.dom).to.eqlDom(def.html);
                            verifyNamespaces(node.dom, def.namespaces);
                        });
                    });
                });
                describe(groupName + ' after delay', function () {
                    _.forEach(defs, function (def) {
                        if (def.htmlDelayed) {
                            it(def.name, function (done) {
                                var node = cito.vdom.create(_.cloneDeep(def.node));
                                window.setTimeout(function () {
                                    expect(node.dom).to.eqlDom(def.htmlDelayed);
                                    done();
                                }, 1);
                            });
                        }
                    });
                });
            });
        });
    });

    var inputPropDefs = [
        {
            name: 'input text',
            node1: {tag: 'input', attrs: {value: 'val1'}},
            node2: {tag: 'input', attrs: {value: 'val1'}},
            prop: 'value',
            value1: 'val1', value2: 'val1'
        },
        {
            name: 'input text change',
            node1: {tag: 'input', attrs: {value: 'val1'}},
            node2: {tag: 'input', attrs: {value: 'val2'}},
            prop: 'value',
            value1: 'val1', value2: 'val2'
        },
        {
            name: 'input text external change',
            node1: {tag: 'input', attrs: {value: 'val1'}},
            node2: {tag: 'input', attrs: {value: 'val2'}},
            prop: 'value',
            value1: 'val1', valueExt1: 'val in1', value2: 'val2'
        },
        {
            name: 'textarea',
            node1: {tag: 'textarea', attrs: {value: 'val1'}},
            node2: {tag: 'textarea', attrs: {value: 'val2'}},
            prop: 'value',
            value1: 'val1', value2: 'val2'
        },
        {
            name: 'textarea external change',
            node1: {tag: 'textarea', attrs: {value: 'val1'}},
            node2: {tag: 'textarea', attrs: {value: 'val2'}},
            prop: 'value',
            value1: 'val1', valueExt1: 'val in1', value2: 'val2'
        },
        {
            name: 'checkbox',
            node1: {tag: 'input', attrs: {type: 'checkbox', checked: false}},
            node2: {tag: 'input', attrs: {type: 'checkbox', checked: true}},
            prop: 'checked',
            value1: false, value2: true
        },
        {
            name: 'radio',
            node1: {tag: 'input', attrs: {type: 'radio', checked: true}},
            node2: {tag: 'input', attrs: {type: 'radio', checked: false}},
            prop: 'checked',
            value1: true, value2: false
        }
    ];

    var selectDefs = [
        {
            name: 'option 1 selected',
            node: {tag: 'select', children: [{tag: 'option', attrs: {value: 'opt1', selected: true}}, {tag: 'option', attrs: {value: 'opt2'}}]},
            props: {selectedIndex: 0, value: 'opt1'}
        },
        {
            name: 'option 2 selected',
            node: {tag: 'select', children: [{tag: 'option', attrs: {value: 'opt1'}}, {tag: 'option', attrs: {value: 'opt2', selected: true}}]},
            props: {selectedIndex: 1, value: 'opt2'}
        },
        {
            name: 'selectedIndex 0',
            node: {tag: 'select', attrs: {selectedIndex: 0}, children: [{tag: 'option', attrs: {value: 'opt1'}}, {tag: 'option', attrs: {value: 'opt2'}}]},
            props: {selectedIndex: 0, value: 'opt1'}
        },
        {
            name: 'selectedIndex 1',
            node: {tag: 'select', attrs: {selectedIndex: 1}, children: [{tag: 'option', attrs: {value: 'opt1'}}, {tag: 'option', attrs: {value: 'opt2'}}]},
            props: {selectedIndex: 1, value: 'opt2'}
        },
        {
            name: 'value opt1',
            node: {tag: 'select', attrs: {value: 'opt1'}, children: [{tag: 'option', attrs: {value: 'opt1'}}, {tag: 'option', attrs: {value: 'opt2'}}]},
            props: {selectedIndex: 0, value: 'opt1'}
        },
        {
            name: 'value opt2',
            node: {tag: 'select', attrs: {value: 'opt2'}, children: [{tag: 'option', attrs: {value: 'opt1'}}, {tag: 'option', attrs: {value: 'opt2'}}]},
            props: {selectedIndex: 1, value: 'opt2'}
        }
    ];

    var callbackEventDescs,
        customEventHandler;
    var nodeWithNestedEvents = {
        tag: 'div',
        events: {click: function (event) {
            callbackEventDescs.push('click outer');
            return customEventHandler && customEventHandler.call(this, event);
        }},
        children: {
            tag: 'div',
            events: {click: [
                function (event) {
                    callbackEventDescs.push('click inner 1');
                    return customEventHandler && customEventHandler.call(this, event);
                },
                function (event) {
                    callbackEventDescs.push('click inner 2');
                    return customEventHandler && customEventHandler.call(this, event);
                }
            ]}
        }
    };

    describe('#update()', function () {
        it('tag name does not change parent', function () {
            var domParent = document.createElement('div');
            var node = cito.vdom.append(domParent, {tag: 'div'});
            expect(node.dom.parentNode).to.be(domParent);
            cito.vdom.update(node, {tag: 'span'});
            expect(node.dom.parentNode).to.be(domParent);
        });

        describe('DOM', function () {
            _.forEach(domDefs, function (defs, groupName) {
                describe(groupName, function () {
                    forEachCombination(domDefs[groupName], function (def1, def2) {
                        if ((def1.updateOnlySelf || def2.updateOnlySelf) && def1 !== def2) {
                            return;
                        }
                        it(def1.name + ' -> ' + def2.name, function () {
                            var node = cito.vdom.create(_.cloneDeep(def1.node));
                            cito.vdom.update(node, _.cloneDeep(def2.node));
                            expect(node.dom).to.eqlDom(def2.html);
                            verifyNamespaces(node.dom, def2.namespaces);
                        });
                        it(def1.name + ' -> ' + def2.name + ' -> ' + def1.name, function () {
                            var node = cito.vdom.create(_.cloneDeep(def1.node));
                            cito.vdom.update(node, _.cloneDeep(def2.node));
                            cito.vdom.update(node, _.cloneDeep(def1.node));
                            expect(node.dom).to.eqlDom(def1.html);
                            verifyNamespaces(node.dom, def1.namespaces);
                        });
                    });
                });
            });
        });

        describe('DOM callbacks', function () {
            beforeEach(function () {
                callbackOldNodes = [];
            });
            afterEach(function () {
                callbackOldNodes = undefined;
            });

            _.forEach(domDefs['callback'], function (def) {
                it(def.name, function () {
                    var node = cito.vdom.create(_.cloneDeep(def.node));
                    callbackOldNodes = [];
                    cito.vdom.update(node, _.cloneDeep(def.node));
                    expect(normNodes(callbackOldNodes)).to.eql(normNodes(def.oldNodes));
                });
            });
        });

        describe('input properties', function () {
            _.forEach(inputPropDefs, function (def) {
                it(def.name, function () {
                    var node = cito.vdom.create(_.cloneDeep(def.node1));
                    expect(node.dom[def.prop]).to.be(def.value1);
                    if (def.valueExt1) {
                        node.dom[def.prop] = def.valueExt1;
                        expect(node.dom[def.prop]).to.be(def.valueExt1);
                    }
                    cito.vdom.update(node, _.cloneDeep(def.node2));
                    expect(node.dom[def.prop]).to.be(def.value2);
                });
            });
        });

        describe('select element', function () {
            forEachCombination(selectDefs, function (def1, def2) {
                it(def1.name + ' -> ' + def2.name, function () {
                    var node = cito.vdom.create(_.cloneDeep(def1.node)),
                        prop;
                    for (prop in def1.props) {
                        expect(node.dom[prop]).to.be(def1.props[prop]);
                    }
                    cito.vdom.update(node, _.cloneDeep(def2.node));
                    for (prop in def2.props) {
                        expect(node.dom[prop]).to.be(def2.props[prop]);
                    }
                });
            });
        });
    });

    describe('#append()', function () {
        it('appends node to parent', function () {
            var domParent = document.createElement('div');
            var node = cito.vdom.append(domParent, {tag: 'div'});

            expect(node.dom.parentNode).to.be(domParent);
            expect(domParent.childNodes.length).to.be(1);

            cito.vdom.remove(node);
        });
    });

    describe('#remove()', function () {
        it('removed node from parent', function () {
            var domParent = document.createElement('div');
            var node = cito.vdom.append(domParent, {tag: 'div'});
            cito.vdom.remove(node);

            try {
                expect(node.dom.parentNode).to.be(null);
            } catch (e) {
                expect(node.dom.parentNode.tagName).to.be(undefined); // IE6
            }
            expect(domParent.childNodes.length).to.be(0);
        });

        describe('destroys virtual node', function () {
            var node;
            beforeEach(function () {
                node = cito.vdom.append(document.body, _.cloneDeep(nodeWithNestedEvents));
            });

            it('properties', function () {
                expect(node.dom.virtualNode).to.be(node);
                expect(node.dom.firstChild.virtualNode).to.be(node.children);

                var domParent = node.dom, domChild = domParent.firstChild;
                cito.vdom.remove(node);

                expect(domParent.virtualNode).to.be(undefined);
                expect(domChild.virtualNode).to.be(undefined);
            });

            it('event handlers', function () {
                callbackEventDescs = [];
                dispatchEvent(node.dom.firstChild, createEvent('click'));
                expect(callbackEventDescs).to.have.length(3);

                var domChild = node.dom.firstChild;
                callbackEventDescs = [];
                cito.vdom.remove(node);

                dispatchEvent(domChild, createEvent('click'));
                expect(callbackEventDescs).to.have.length(0);
            });
        });
    });

    var callbackEventTypes;
    function testEventHandler(event) {
        callbackEventTypes.push(event.type);
    }
    function testExceptionEventHandler(event) {
        callbackEventTypes.push(event.type);
        throw new Error();
    }

    var eventDefs = [
        {
            name: 'none',
            node: {tag: 'div'},
            events: []
        },
        {
            name: 'null',
            node: {tag: 'div', events: null},
            events: []
        },
        {
            name: 'empty',
            node: {tag: 'div', events: {}},
            events: []
        },
        {
            name: 'click one',
            node: {tag: 'div', events: {click: testEventHandler}},
            events: ['click']
        },
        {
            name: 'click array two',
            node: {tag: 'div', events: {click: [testEventHandler, testEventHandler]}},
            events: ['click', 'click']
        },
        {
            name: 'click one + mouseover one',
            node: {tag: 'div', events: {click: testEventHandler, mouseover: testEventHandler}},
            events: ['click', 'mouseover']
        },
        {
            name: 'click exception + click exception',
            node: {tag: 'div', events: {click: [testExceptionEventHandler, testExceptionEventHandler]}},
            events: ['click', 'click']
        }
    ];

    describe('events', function () {
        describe('normalization', function () {
            var node, callbackEvent;
            beforeEach(function () {
                node = cito.vdom.append(document.body, {
                    tag: 'div',
                    events: {
                        click: function (event) {
                            callbackEvent = event;
                        }
                    }
                });
                dispatchEvent(node.dom, createEvent('click'));
            });
            afterEach(function () {
                cito.vdom.remove(node);
            });

            it('missing properties are added', function () {
                expect(callbackEvent).to.have.property('defaultPrevented', false);
                expect(callbackEvent.returnValue).not.to.be(false);
                expect(callbackEvent).to.have.property('target');
                expect(callbackEvent).to.have.property('currentTarget');
                expect(callbackEvent.preventDefault).to.be.a('function');
                expect(callbackEvent.stopPropagation).to.be.a('function');
                expect(callbackEvent.stopImmediatePropagation).to.be.a('function');
            });
        });

        describe('handlers', function () {
            var node;
            beforeEach(function () {
                callbackEventTypes = [];
            });
            afterEach(function () {
                callbackEventTypes = undefined;
                cito.vdom.remove(node);
            });

            forEachCombination(eventDefs, function (def1, def2) {
                it(def1.name + ' -> ' + def2.name, function () {
                    var allEvents = _.uniq(def1.events.concat(def2.events));
                    node = cito.vdom.append(document.body, _.cloneDeep(def1.node));
                    var createAndDispatchEvent = function (type) {
                        dispatchEvent(node.dom, createEvent(type));
                    };
                    _.forEach(allEvents, createAndDispatchEvent);
                    expect(callbackEventTypes.sort()).to.eql(def1.events.sort());

                    cito.vdom.update(node, _.cloneDeep(def2.node));
                    callbackEventTypes = [];
                    _.forEach(allEvents, createAndDispatchEvent);
                    expect(callbackEventTypes.sort()).to.eql(def2.events.sort());
                });
            });
        });

        describe('bubbling', function () {
            var node, callbackEvents;
            beforeEach(function () {
                callbackEventDescs = [];
                callbackEvents = [];
                node = cito.vdom.append(document.body, _.cloneDeep(nodeWithNestedEvents));
            });
            afterEach(function () {
                callbackEventDescs = undefined;
                callbackEvents = undefined;
                customEventHandler = undefined;
                cito.vdom.remove(node);
            });

            it('works', function () {
                dispatchEvent(node.dom.firstChild, createEvent('click'));
                expect(callbackEventDescs).to.eql(['click inner 1', 'click inner 2', 'click outer']);
            });

            it('this and currentTarget is set correctly', function () {
                var thises = [], currentTargets = [];
                customEventHandler = function (event) {
                    thises.push(this);
                    currentTargets.push(event.currentTarget);
                };
                dispatchEvent(node.dom.firstChild, createEvent('click'));
                var domChild = node.children.dom,
                    expectedCurrentTargets = [domChild, domChild, node.dom];
                expect(thises).to.eql(expectedCurrentTargets);
                expect(currentTargets).to.eql(expectedCurrentTargets);
            });

            it('stopPropagation() stops bubbling', function () {
                customEventHandler = function (event) {
                    event.stopPropagation();
                };
                dispatchEvent(node.dom.firstChild, createEvent('click'));
                expect(callbackEventDescs).to.eql(['click inner 1', 'click inner 2']);
            });

            it('stopImmediatePropagation() stops bubbling and other handlers', function () {
                customEventHandler = function (event) {
                    event.stopImmediatePropagation();
                };
                dispatchEvent(node.dom.firstChild, createEvent('click'));
                expect(callbackEventDescs).to.eql(['click inner 1']);
            });

            it('preventDefault() prevents default', function () {
                customEventHandler = function (event) {
                    callbackEvents.push(event);
                    event.preventDefault();
                };
                testPreventDefault();
            });

            it('return false prevents default', function () {
                customEventHandler = function (event) {
                    callbackEvents.push(event);
                    return false;
                };
                testPreventDefault();
            });

            function testPreventDefault() {
                dispatchEvent(node.dom.firstChild, createEvent('click'));
                expect(mapProp(callbackEvents, 'defaultPrevented')).to.eql([true, true, true]);
                expect(callbackEventDescs).to.have.length(3);
            }
        });
    });

    // TODO test this, multiple listeners, return false
    describe('lifecycle events', function () {
        it('$created', function () {
            var caughtEvent;
            var node = cito.vdom.create({
                tag: 'div', events: {
                    $created: function (event) {
                        caughtEvent = event;
                    }
                }
            });
            expect(caughtEvent).to.have.property('type', '$created');
            expect(caughtEvent).to.have.property('target', node.dom);
            expect(caughtEvent.virtualNode).to.eql(node);
        });

        it('$changed', function () {
            var caughtEvent;
            var changedHandler = function (event) {
                caughtEvent = event;
            };
            var node = cito.vdom.create({tag: 'div', events: {$changed: changedHandler}});
            expect(caughtEvent).to.be(undefined);

            cito.vdom.update(node, {tag: 'div', attrs: {id: 'id1'}, events: {$changed: changedHandler}});

            expect(caughtEvent).to.have.property('type', '$changed');
            expect(caughtEvent).to.have.property('target', node.dom);
            expect(caughtEvent.virtualNode).to.eql(node);
            expect(caughtEvent.changes).to.eql(['id']);
        });

        it('$destroyed', function () {
            var caughtEvent;
            var domParent = document.createElement('div');

            var node = cito.vdom.append(domParent, {
                tag: 'div', events: {
                    $destroyed: function (event) {
                        caughtEvent = event;
                    }
                }
            });

            expect(caughtEvent).to.be(undefined);
            cito.vdom.remove(node);

            expect(caughtEvent).to.have.property('type', '$destroyed');
            expect(caughtEvent).to.have.property('target', node.dom);
            expect(caughtEvent).to.have.property('virtualNode', node);
        });
    });

    if (document.registerElement) {
        var TestNormal = document.registerElement('test-normal', {
            prototype: Object.create(HTMLElement.prototype, {})
        });

        var TestExtended = document.registerElement('test-extended', {
            prototype: Object.create(HTMLButtonElement.prototype, {}),
            'extends': 'button'
        });

        describe('custom elements', function () {
            it('normal element', function () {
                var node = cito.vdom.create({tag: 'test-normal'});
                expect(node.dom).to.be.a(TestNormal);
            });

            it('extended element', function () {
                var node = cito.vdom.create({tag: 'button', attrs: {is: 'test-extended'}});
                expect(node.dom).to.be.a(TestExtended);
            });

            it('changing is attribute creates new element', function () {
                var node = cito.vdom.create({tag: 'button', attrs: {is: 'test-extended'}});
                expect(node.dom).to.be.a(TestExtended);
                cito.vdom.update(node, {tag: 'button'});
                expect(node.dom).to.be.an(HTMLButtonElement);
            });
        });
    }

    function forEachCombination(defs, callback) {
        _.forEach(defs, function (def1) {
            _.forEach(defs, function (def2) {
                callback(def1, def2);
            });
        });
    }

    function verifyNamespaces(domNode, namespaces, flat) {
        if (namespaces) {
            if (!flat) {
                var flatNamespaces = {};
                _.forEach(namespaces, function (tagsOrAttrs, namespace) {
                    _.forEach(tagsOrAttrs, function (tagOrAttr) {
                        flatNamespaces[tagOrAttr] = namespace;
                    });
                });
                namespaces = flatNamespaces;
            }
            var namespace = namespaces[domNode.tagName.toLowerCase()];
            if (namespace) {
                expect(domNode.namespaceURI).to.be(namespace);
            }
            var attrs = domNode.attributes;
            for (var i = 0; i < attrs.length; i++) {
                var attr = attrs[i];
                namespace = namespaces[attr.name];
                if (namespace) {
                    var attrNamespace = attr.namespaceURI;
                    expect(attrNamespace).to.be(namespace);
                }
            }
            _.forEach(domNode.children, function (domChild) {
                verifyNamespaces(domChild, namespaces, true);
            });
        }
    }

    function normNodes(nodes) {
        return _.map(nodes, normNode);
    }

    function normNode(node) {
        if (_.isArray(node)) {
            return normNodes(node);
        } else if (_.isString(node)) {
            return {tag: '#', children: node};
        } else {
            node = {tag: node.tag, children: node.children};
            if (node.tag.match(/[a-z0-9]+/)) {
                var children = node.children;
                if (!_.isArray(children)) {
                    children = children || _.isString(children) ? [children] : [];
                }
                node.children = _.map(children, normNode);
            }
            return node;
        }
    }

    var supportsEventConstructor = true;
    try {
        new CustomEvent('custom');
    } catch (e) {
        supportsEventConstructor = false;
    }

    var helperEvent = createEvent('custom'), fixPreventDefault;
    if (helperEvent.preventDefault) {
        helperEvent.preventDefault();
        fixPreventDefault = !helperEvent.defaultPrevented;
    }

    function createEvent(type, detail) {
        var event;
        if (supportsEventConstructor) {
            event = new CustomEvent(type, {bubbles: true, cancelable: true, detail: detail});
        } else if (document.createEvent) {
            event = document.createEvent('CustomEvent');
            event.initCustomEvent(type, true, true, detail);
        } else {
            event = document.createEventObject();
            event.type = type;
            event.detail = detail;
        }
        if (fixPreventDefault) {
            event.preventDefault = function () {
                if (!this.defaultPrevented) {
                    Object.defineProperty(this, "defaultPrevented", {
                        get: function () {
                            return true;
                        }
                    });
                }
            };
        }
        return event;
    }

    function dispatchEvent(target, event) {
        if (target.dispatchEvent) {
            target.dispatchEvent(event);
        } else {
            target.fireEvent('on' + event.type, event);
        }
    }

    var expectPrototype = expect().constructor.prototype;
    expectPrototype.eqlDom = function (obj) {
        var html1 = getHtml(this.obj), html2 = getHtml(obj);
        this.assert(normHtml(html1) === normHtml(html2),
            function () {
                return 'expected ' + html1 + ' to equal DOM ' + html2;
            },
            function () {
                return 'expected ' + html1 + ' to not equal DOM ' + html2;
            }
        );
        return this;
    };

    function getHtml(value) {
        if (value && value.outerHTML) {
            return value.outerHTML;
        } else if (value && value.nodeType) {
            while (helperDiv.firstChild) {
                helperDiv.removeChild(helperDiv.firstChild);
            }
            helperDiv.appendChild(value.cloneNode(true));
            return helperDiv.innerHTML;
        } else {
            return '' + value;
        }
    }

    // TODO compare dom/vdom instead of string
    function normHtml(html) {
        html = html.toLowerCase();
        html = html.replace(/xmlns(:\w+)?=".*?"/g, '');
        html = html.replace(/(style|class)=""/g, '');
        html = html.replace(/=""/g, '');
        html = html.replace(/(<([\w-]+)[^/>]*)\/>/g, '$1></$2>');
        html = html.replace(/(<[\w-]+)(.*?)(>)/g, function (match, start, attrsStr, end) {
            var attrs = [];
            var attrMatch, attrRegEx = /([\w-]+)(?:=(?:(["'])(.*?)\2)|=([^ ]*))?/g;
            while (attrMatch = attrRegEx.exec(attrsStr)) {
                var normedAttr;
                if (attrMatch === '"') {
                    normedAttr = attrMatch[0]
                } else if (attrMatch[3]) {
                    var attrValue = (attrMatch[3] || attrMatch[2]).replace('"', "&quot;");
                    normedAttr = attrMatch[1] + '="' + attrValue + '"';
                } else {
                    normedAttr = attrMatch[0];
                }
                attrs.push(normedAttr);
            }
            return start + attrs.sort().join(' ') + end;
        });
        html = html.replace(/(style=")(.*?)"/g, function (match, start, style, end) {
            return start + style.split(/;\s*/).sort().join(';') + '"';
        });
        html = html.replace(/[\s";]/g, '');
        return html;
    }

    function mapProp(array, prop) {
        return _.map(array, function (value) {
            return value[prop];
        });
    }

});