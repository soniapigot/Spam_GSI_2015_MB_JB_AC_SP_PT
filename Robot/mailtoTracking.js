/**
 * Created by Pierre on 06/01/2016.
 */

var oldSet = Object.getOwnPropertyDescriptor(HTMLAnchorElement.prototype, 'href').set;
Object.defineProperty(HTMLAnchorElement.prototype, 'href', {
    set: function newSet(value) {
        try {
            throw new Error();
        } catch (e) {
            window.alert("e: "+e.stack);
            window.alert(value, newSet.caller);
            oldSet.call(this, value);
        }

    }});