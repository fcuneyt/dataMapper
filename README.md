# dataMapper
A pure js data mapper.

This library can map your data (e.g. ajax service response) to your objects or view models.

#Usage

##With MVVM libraries (e.g. knockout.js)
```javascript
<script src="../../Scripts/jquery-2.2.3.min.js"></script>
<script src="../../Scripts/knockout-3.4.0.js"></script>
<script src="../../Scripts/dataMapper.js"></script>
<script type="text/javascript">
	var viewModel = new Object();
	viewModel.ServiceData = new Object();

	$(document).ready(function () {
		$.getJSON("Your-JSON-URL", null, function (response) {
			//Give it your data (response), an object to map (viewModel.ServiceData)
			//And if you using a library like knockout.js give your list and primitive functions
			//(e.g. ko.observableArray and ko.observable)
			dataMapper.mapResponse(response, viewModel.ServiceData, ko.observableArray, ko.observable);
		});
	});
</script>
```

As a result; dataMapper will fill your ServiceData property with all observable properties (Includes list items).

##Pure js objects
```javascript
<script src="../../Scripts/jquery-2.2.3.min.js"></script>
<script src="../../Scripts/dataMapper.js"></script>
<script type="text/javascript">
	var viewModel = new Object();
	viewModel.ServiceData = new Object();

	$(document).ready(function () {
		$.getJSON("Your-JSON-URL", null, function (response) {
			//Give it your data (response), an object to map (viewModel.ServiceData)
			//Pass null values as your functions.
			dataMapper.mapResponse(response, viewModel.ServiceData, null, null);
		});
	});
</script>
```
As a result; dataMapper will fill your ServiceData property with your service response.

If you want to map a part of your service response. You can do it as follows.

```javascript
	dataMapper.mapResponse(response.Items, viewModel.ServiceData, null, null);
```
As a result; dataMapper will fill your ServiceData property with "Items" property of your service response.

##mapConfig Sample

[
	{source: 'sourceField', destination: 'destinationField'},
	{source: 'sourceField', ignore: true}
]

If mapConfig parameter is null or empty it will run using default mappings.

#Installation

##Nuget
```
Install-Package dataMapper.js
```

##Bower
```
bower install datamapper
```
