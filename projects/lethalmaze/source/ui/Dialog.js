
lychee.define('game.ui.Dialog').includes([
	'lychee.ui.Layer'
]).exports(function(lychee, game, global, attachments) {

	var _texture = attachments["png"];
	var _config  = attachments["json"].buffer;


	var Class = function(data) {

		var settings = lychee.extend({}, data);


		this.__index    = 0;
		this.__players  = [];
		this.__statemap = _config.map['default'][0];


		settings.width  = _config.width;
		settings.height = _config.height;


		lychee.ui.Layer.call(this, settings);

		settings = null;

	};


	Class.prototype = {

		/*
		 * ENTITY API
		 */

		deserialize: function(blob) {

			lychee.ui.Layer.prototype.deserialize.call(this, blob);



			/*
			 * INITIALIZATION
			 */

			this.getEntity('tablet').bind('touch', function() {

				this.getEntity('desktop').setState('device-desktop-default');
				this.getEntity('tablet').setState('device-tablet-active');

				this.trigger('device', [ 'tablet' ]);

			}, this);

			this.getEntity('desktop').bind('touch', function() {

				this.getEntity('desktop').setState('device-desktop-active');
				this.getEntity('tablet').setState('device-tablet-default');

				this.trigger('device', [ 'desktop' ]);

			}, this);

			this.getEntity('start').bind('touch', function() {
				this.trigger('start', []);
			}, this);

			this.getEntity('stop').bind('touch', function() {
				this.trigger('stop', []);
			}, this);

		},

		serialize: function() {

			var data = lychee.ui.Layer.prototype.serialize.call(this);
			data['constructor'] = 'game.ui.Dialog';

			var settings = data['arguments'][0] || {};
			var blob     = data['blob'] || {};


			data['arguments'][0] = settings;
			data['blob']         = Object.keys(blob).length > 0 ? blob : null;


			return data;

		},

		render: function(renderer, offsetX, offsetY) {

			if (this.visible === false) return;


			var alpha = this.alpha;


			if (alpha !== 1) {
				renderer.setAlpha(alpha);
			}


			var texture = _texture || null;
			if (texture !== null) {

				var map = this.__statemap || null;
				if (map !== null) {

					var position = this.position;

					var x1 = position.x + offsetX - this.width  / 2;
					var y1 = position.y + offsetY - this.height / 2;


					renderer.drawSprite(
						x1,
						y1,
						texture,
						map
					);

				}

			}


			lychee.ui.Layer.prototype.render.call(this, renderer, offsetX, offsetY);


			var index   = this.__index;
			var players = this.__players;

			if (players[index]) {

				for (var p = 0, pl = players.length; p < pl; p++) {

					var player = players[p];
					var ox     = position.x + offsetX - this.width / 2 + 64 + 64 * p;
					var oy     = position.y + offsetY + 80;


					if (player === players[index]) {

						renderer.drawBox(
							ox - 16,
							oy - 16,
							ox + 16,
							oy + 16,
							'#88e060',
							true
						);

						renderer.drawBox(
							ox - 16,
							oy - 16,
							ox + 16,
							oy + 16,
							'#ff0000',
							false,
							3
						);

					}


					player.render(
						renderer,
						ox - player.position.x,
						oy - player.position.y
					);

				}

			}


			if (alpha !== 1) {
				renderer.setAlpha(1);
			}

		},

		setMultiplayer: function(index, players) {

			this.__index   = index;
			this.__players = players;


			if (index === 0) {
				this.getEntity('start').setVisible(true);
			} else {
				this.getEntity('start').setVisible(false);
			}


			return true;

		}

	};


	return Class;

});
