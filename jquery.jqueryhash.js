(function($){

// Variables
var settings;
var _jqWindow = $(window);

// Plugin methods
var methods = {
    init: function(options) {
        settings = $.extend({ 
            hashes: [['', function() {}]],
            onlyOnLoad: false
        }, options);

        // We start a events listener
        methods.onCheckHash();
        if(!settings.onlyOnLoad)
            _jqWindow.on('hashchange', methods.onCheckHash);
    },
    // Add one handler
    onAddHandler: function(handler) {
        if( typeof handler[0] === 'string' && $.isFunction(handler[1]) ) {
            settings.hashes.push([ handler[0], handler[1] ]);
        }
        else { throw "Incorrect format of the handler."; }
    },
    // Update one handler
    onUpdateOne: function(handler) {
        // Variable used to error checking
        var _boolExits = false;
        if( typeof handler[0] === 'string' ) {
            for(var i = 0; i < settings.hashes.length; i++) {
                if( settings.hashes[i][0] === handler[0] ) {
                    if($.isFunction(handler[1])) {
                        settings.hashes[i][1] = handler[1]; 
                        _boolExits = true;
                        // No need to keep the for loop
                        break;
                    } else {
                        throw "Error trying to execute the callback function.";
                    }
                }
            }
            if(!_boolExits)
                throw 'Trying to update an unexisting handler';
        }
    },
    // Remove only one handler
    onRemoveOneHandler: function(handler) {
        for(var i = 0; i < settings.hashes.length; i++) {
            if(settings.hashes[i][0] === handler) {
                settings.hashes.splice(i, 1);
                break;
            }
        }
    },
    // Remove all handlers
    onRemoveHashChange: function() {
        if(!settings.onlyOnLoad) {
            _jqWindow.off('hashchange', methods.onCheckHash);
            settings.hashes = [['', function() {}]];
        }
    },
    // Trigger one handler
    onTriggerOne: function(handler) {
        // Variable used to error checking
        var _boolExits = false;
        for(var i = 0; i < settings.hashes.length; i++) {
            if(settings.hashes[i][0] === handler) {
                if($.isFunction(settings.hashes[i][1])) {
                    settings.hashes[i][1](); 
                    _boolExits = true;
                    // No need to keep the for loop
                    break;
                } else {
                    throw "Error trying to execute the callback function.";
                }
            }
        }
        if(!_boolExits)
            throw 'Trying to trigger an unexisting handler';
    },
    // Function used to check the hash and fire the function associated with it
    onCheckHash: function() {
        if(window.location.hash) {
            var _strHash = window.location.href.split('#')[1];
            for(var i = 0; i < settings.hashes.length; i++) {
                if( settings.hashes[i][0] === _strHash ) {
                    if($.isFunction(settings.hashes[i][1])) {
                        settings.hashes[i][1](); 
                        // No need to keep the for loop
                        break;
                    } else {
                        throw "Error trying to execute the callback function.";
                    }
                }
            }
        }  
    }
}

$.onHash = function(method) {
    if(methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if(typeof method === 'object' || !method) {
        return methods.init.apply(this, arguments);
    } else {
        throw 'This method ' + method + ' does not belong to this plugin.';
    }
};

})(jQuery);