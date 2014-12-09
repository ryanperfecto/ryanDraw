// http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
var toType = function(obj) { return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase(); }

	/**
	* ryanDraw Class
	*
	* @class ryanDraw
	* @constructor
	* @public
	*/
	function ryanDraw() {
		// private

		/**
		* _errors: Stores all of the JavaScript errors.
		*
		*
		*/
		var _errors = new Array();
		var _debugs = new Array();
		var _debug = false;
		var _objects = new Array();
		// public
		this.canvas = null;
		this.canvasId = null;
		this.context = null;

		// Constructor
		this.construct = function(canvasId, w, h, context) {
			_setDebug('construct(canvasId='+canvasId+', w='+w+', h='+h+', context='+context+')');

			if(_setCanvas(canvasId)) {
				if(_setContext(context)) {
					_setupCanvas(w, h);
				} else {
					_setError('function construct: _setContext() returned false');
				}
			} else {
				_setError('function construct: _setCanvas() returned false');
			}

			if(_debug === true)	this.getDebugs();
		};

		// private

		var _setupCanvas = function(w, h) {
			_setDebug('function _setupCanvas(w='+w+', h='+h+')');
			if(_getCanvas() !== false) {
				_getCanvas().width = w;
				_getCanvas().height = h;
			} else {
				_setError('function _setupCanvas: _getCanvas() returned false');
			}
		};

		var _setContext = function _setContext(context) {
			var validContexts = ['2d', '3d'];
			_setDebug('function _setContext(context='+context+')');
			_setDebug('Valid context?: ' + $.inArray(context, validContexts));
			if($.inArray(context, validContexts) !== -1) {
				if(_getCanvas().getContext) {
					this.context = _getCanvas().getContext(context);
					if(toType(this.context) === 'canvasrenderingcontext') {
						return true;
					} else {
						_setError('function _setContext: Canvas was not type (canvasrenderingcontext)');
					}
				} else {
					_setError('function _setContext: Could not getContext on canvas');
				}
			}
			_setError('function _setContext: An invalid context was provided ' +context);
			this.context = null;
			return false;
		};

		var _getContext = function _getContext() {
			_setDebug('function _getContext(): this.context = ' + this.context);
			if(this.context !== null) {
				return this.context;
			}
			_setError('function _getContext: The context was null');
			return false;
		};

		var _setCanvas = function _setCanvas(canvasId) {
			if(document.getElementById(canvasId) !== null) {
				this.canvas = document.getElementById(canvasId);
				if(toType(this.canvas) === 'htmlcanvaselement') {
					return true;
				} else {
					_setError('function _setCanvas: Canvas was not type (htmlcanvaselement)');
				}
			}
			_setError('function _setCanvas: Could not find the canvas element with the id ' +canvasId);
			this.canvas = null;
			return false;
		};

		var _getCanvas = function _getCanvas() {
			_setDebug('function _getCanvas(): this.canvas = ' + this.canvas);
			if(this.canvas !== null) {
				return this.canvas;
			}
			_setError('function _getCanvas: The canvas was null');
			return false;
		};

		var _setError = function _setError(message) {
			_errors.push(message);
		};

		var _setDebug = function _setDebug(message) {
			if(_debug === true) _debugs.push(message);
		};

		// public

		this.setDebug = function(state) {
			_debug = state;
		};

		this.setFill = function setColour(colour) {
			if(_getContext() !== false) {
				try {
					_setDebug('function setFill(): context = ' + context);
					_getContext().fillStyle = colour;
				} catch (error) {
					if(error.name === 'TypeError') {
						_setError('function setFill(): Context was not correctly defined  ('+error.message+')');
					}
				}
			} else {
				_setError('function setFill(): _getContext() returned false');
			}
		};

		this.setStroke = function setStroke(colour) {
			if(_getContext() !== false) {
				try {
					_setDebug('function setStroke(): context = ' + context);
					_getContext().strokeStyle = colour;
				} catch (error) {
					if(error.name === 'TypeError') {
						_setError('function setStroke(): Context was not correctly defined  ('+error.message+')');
					}
				}
			} else {
				_setError('function setStroke(): _getContext() returned false');
			}
		};

		this.fillRect = function fillRect(x, y, w, h) {
			if(_getContext() !== false) {
				try {
					_setDebug('function fileRect: context = ' + context);
					_getContext().fillRect(x, y, w, h);
				} catch (error) {
					if(error.name === 'TypeError') {
						_setError('function fillRect(): Context was not correctly defined  ('+error.message+')');
					}
				}
			} else {
				_setError('function fillRect: _getContext() returned false');
			}
		};

		this.arc = function arc(x, y, w, h, curve) {
			if(_getContext() !== false) {
				try {
					_setDebug('function arc: context = ' + context);
					_getContext().arc(x, y, w, h, curve, true);
				} catch (error) {
					if(error.name === 'TypeError') {
						_setError('function arc(): Context was not correctly defined  ('+error.message+')');
					}
				}
			} else {
				_setError('function arc: _getContext() returned false');
			}
		};

		this.rectangle = function rectangle(x, y, w, h, lc, fc) {
			if( x >= 0 && x <= parseInt(_getCanvas().width)) {
				if(y >= 0 && y <= parseInt(_getCanvas().height)) {
					this.setStroke(lc);
					this.setFill(fc);
					this.fillRect(x, y, w, h);
				} else {
					_setError('function rect(): The y coord ('+y+') is less than or greater than the height: '+_getCanvas().height);
				}
			} else {
				_setError('function rect(): The x coord ('+x+') is less than or greater than the width: '+_getCanvas().width);
			}
		};

		this.rect = function rect(x, y, w, h, lc, fc) {
			this.rectangle(x, y, w, h, lc, fc);
		};

		this.square = function square(x, y, d, lc, fc) {
			if( x >= 0 && x <= parseInt(_getCanvas().width)) {
				if(y >= 0 && y <= parseInt(_getCanvas().height)) {
					this.setStroke(lc);
					this.setFill(fc);
					this.fillRect(x, y, d, d);
				} else {
					_setError('function square(): The y coord ('+y+') is less than or greater than the height: '+_getCanvas().height);
				}
			} else {
				_setError('function square(): The x coord ('+x+') is less than or greater than the width: '+_getCanvas().width);
			}
		};

		this.sqr = function sqr(x, y, d, lc, fc) {
			this.square(x, y, d, lc, fc);
		};

		this.line = function line(x1, y1, x2, y2, w, c) {
			if( x1 >= 0 && x1 <= parseInt(_getCanvas().width)) {
				if(y1 >= 0 && y1 <= parseInt(_getCanvas().height)) {
					if( x2 >= 0 && x2 <= parseInt(_getCanvas().width)) {
						if(y2 >= 0 && y2 <= parseInt(_getCanvas().height)) {
							this.setStroke(c);
							_getContext().beginPath();
							_getContext().moveTo(x1, y1);
							_getContext().lineTo(x2, y2);
							_getContext().lineWidth = w;
							_getContext().stroke();
						} else {
							_setError('function square(): The y2 coord ('+y2+') is less than or greater than the height: '+_getCanvas().height);
						}
					} else {
						_setError('function square(): The x2 coord ('+x2+') is less than or greater than the width: '+_getCanvas().width);
					}
				} else {
					_setError('function square(): The y1 coord ('+y1+') is less than or greater than the height: '+_getCanvas().height);
				}
			} else {
				_setError('function square(): The x1 coord ('+x1+') is less than or greater than the width: '+_getCanvas().width);
			}
		};

		this.ln = function(x1, x2, y1, y2, w, c) {
			this.line(x1, x2, y1, y2, w, c);
		};

		/**
		* A function which outputs a point to the browser canvas.
		* @author Ryan Ormrod
		* @public
		*
		* @param {Integer} x The x coordinate (Distance from the top)
		* @param {Integer} y The y coordinate (Distance from the left)
		* @param {Integer} w How far should the point stretch?
		* @param {String}  c The colour of the point in a valid web format
		* @param {String}	 t The type/shape of the point
		*
		*/
		this.point = function point(x, y, w, c, t) {
			if( x >= 0 && x <= parseInt(_getCanvas().width)) {
				if(y >= 0 && y <= parseInt(_getCanvas().height)) {
					this.setStroke(c);
					if(t === 'square') {
						this.rect(x, y, w, w, c, c);
					} else if(t === 'circle') {
						this.circle(x, y, w, w, c, c);
					}
				} else {
					_setError('function point(): The y coord ('+y+') is less than or greater than the height: '+_getCanvas().height);
				}
			} else {
				_setError('function point(): The x coord ('+x+') is less than or greater than the width: '+_getCanvas().width);
			}
		};

		/**
		* A Shortcut function the point function.
		* @author Ryan Ormrod
		* @public
		*
		* See the point function for parameters.
		*/
		this.pt = function pt(x, y, w, c, t) {
			this.point(x, y, w, c, t);
		};

		/**
		* A function which outputs a circle to the browser canvas.
		* @author Ryan Ormrod
		* @public
		*
		* @param {Integer} x The x coordinate (Distance from the top)
		* @param {Integer} y The y coordinate (Distance from the left)
		* @param {Integer} w The width of the circle
		* @param {Integer} h The height of the circle
		* @param {String}  lc The stroke colour in a valid web format
		* @param {String}	 fc The fill colour in a valid web format
		*
		*/
		this.circle = function circle(x, y, w, h, lc, fc) {
			if( x >= 0 && x <= parseInt(_getCanvas().width)) {
				if(y >= 0 && y <= parseInt(_getCanvas().height)) {
					this.setStroke(lc);
					this.setFill(fc);
					this.arc(x, y, w, h, 2 * Math.PI);
				}
			}
		};

		/**
		* A basic function that outputs all of the JavaScript errors to the
		* browser console.
		* @author Ryan Ormrod
		* @public
		*
		*/
		this.getErrors = function getErrors() {
			for(var i in _errors) {
				console.log('Error (#'+i+'): ' + _errors[i]);
			}
		};

		/**
		* A basic function that outputs all of the JavaScript debug messages to the
		* browser console.
		* @author Ryan Ormrod
		* @public
		*
		*/
		this.getDebugs = function getDebugs() {
			for(var i in _debugs) {
				console.log('Debug (#'+i+'): ' + _debugs[i]);
			}
		};
	}
