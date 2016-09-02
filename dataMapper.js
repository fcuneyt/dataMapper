var dataMapper = {};
(function () {
	var self = this;
	var listFunction = null;
	var primitiveFunction = null;
	var getViewModelAttribute = function (viewModelKeys, key) {
		var result = null;
		for (var i = 0; i < viewModelKeys.length; i++) {
			var viewModelAttribute = viewModelKeys[i];
			if (viewModelAttribute === key) {
				result = viewModelAttribute;
				break;
			}
		}
		if (result === null) {
			result = key;
		}
		return result;
	};
	var getData = function (value) {
		var result;
		if (value !== null && typeof value !== "undefined") {
			if (Object.prototype.toString.call(value) === "[object Array]") {
				var array = [];
				for (var j = 0; j < value.length; j++) {
					var item = value[j];
					array.push(getData(item));
				}
				result = listFunction
					? listFunction(array)
					: array;
			} else if (typeof (value) == "object") {
				var objectKeys = Object.keys(value);
				result = {};
				for (var i = 0; i < objectKeys.length; i++) {
					var objectItem = objectKeys[i];
					result[objectItem] = getData(value[objectItem]);
				}
			} else {
				result = primitiveFunction
					? primitiveFunction(value)
					: value;
			}
		} else {
			result = null;
		}
		return result;
	};
	var setValue = function (instance, attribute, value) {
		if (typeof window.ko !== "undefined" && ko.isObservable(instance[attribute])) {
			instance[attribute](value);
		} else {
			instance[attribute] = getData(value);
		}
	};
	var getAttributeFromMapConfig = function (mapConfig, source) {
		if (!mapConfig) {
			return null;
		}
		for (var i = 0; i < mapConfig.length; i++) {
			var config = mapConfig[i];
			if (config.source === source) {
				if (config.ignore) {
					return undefined;
				} else {
					return config.destination;
				}
			}
		}
		return null;
	};
	self.mapResponse = function (response, viewModel, listFunc, primitiveFunc, mapConfig) {
		listFunction = listFunc;
		primitiveFunction = primitiveFunc;
		var responseKeys = Object.keys(response);
		var viewModelKeys = Object.keys(viewModel);
		for (var i = 0; i < responseKeys.length; i++) {
			var key = responseKeys[i];

			var config = getAttributeFromMapConfig(mapConfig, key);

			if (typeof config !== "undefined") {
				var viewModelAttribute = config === null
					? getViewModelAttribute(viewModelKeys, key)
					: config;

				setValue(viewModel, viewModelAttribute, response[key]);
			}
		}
	};
}).apply((dataMapper));