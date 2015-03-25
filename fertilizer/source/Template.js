
lychee.define('fertilizer.Template').requires([
	'fertilizer.data.Filesystem'
]).includes([
	'lychee.event.Emitter'
]).exports(function(lychee, fertilizer, global, attachments) {

	var Class = function(data) {

		var settings = lychee.extend({}, data);


console.log(settings);


		this.environment = null;
		this.filesystem  = null;


		lychee.event.Emitter.call(this);

	};


	Class.prototype = {

		getInfo: function() {
			return '/* INFO STUFF */';
		}

	};


	return Class;

});
