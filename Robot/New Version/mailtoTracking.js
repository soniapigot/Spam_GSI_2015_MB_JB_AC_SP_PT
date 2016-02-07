//-- INSERTION BALISE SCRIPT POUR LE PISTAGE DU MAILTO--\\

//Ecriture des balises dans le code HTML
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