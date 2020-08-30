# JQueryHash
A Jquery plugin that allow users  to add hooks when the url hash changes.

## Usage
First include the script after jquery
```
<script src="jquery.jqueryhash.js"></script>
```
Call the plugin 
```
$.onHash({
    hashes: [
        ['foo', function() { console.log(123); }],
        ['bar', function() { console.log(456); }]
    ],
});
```
## Hooks

### onAddHandler
Adds a callback to a foo hash **https://myurl.com/index.html#foo**
```
$.onHash('onAddHandler', [ 'foo', function() { console.log(789); } ]); 
```
**Please note that if you add more than one callback to a hash only executes the first added, to change the foo hash callback please use the update option**

### onUpdateOne
Update the callback of a foo hash **https://myurl.com/index.html#foo**
```
$.onHash('onUpdateOne', [ 'foo', function() { console.log(456); } ]); 
```

### onTriggerOne
Triggers the callback of a foo hash **https://myurl.com/index.html#foo**
```
$.onHash('onTriggerOne', 'foo'); 
```

### onRemoveOneHandler
Removes the callback of a foo hash **https://myurl.com/index.html#foo**
```
$.onHash('onRemoveOneHandler', 'foo');
```

### onRemoveHashChange
Removes all callbacks
```
$.onHash('onRemoveHashChange'); 
```