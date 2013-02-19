jquery.sort
===========

Sort the first level children of an element by calling `.sortChildren()`. The default comparison function used for sorting compares the `.text()` of each element. You can pass your own comparison function in the form `function( a, b ) { return -1|0|1; }` to `.sortChildren()`. The element that you sort remembers the comparison function used and will allow you to insert a new child element into the sorted list at the correct location using `.insertSorted()`.

This is also great for maintaining a list of sorted DOM nodes as if one node changes you can call `parent.insertSorted( childThatChanged )` and the child will be moved to its new position in the list with minimal DOM manipulation.

The `.sortChildren()` function is O(n log n) and the `.insertSorted()` function is O(log n).
