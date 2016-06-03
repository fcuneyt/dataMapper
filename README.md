# dataMapper
A pure js data mapper.

This library can map your data (e.g. ajax service response) to your objects or view models.

#Usage

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
		  //And if you using a library like knockout.js give your list and primitive functions (e.g. ko.observableArray and ko.observable)
			dataMapper.mapResponse(response, viewModel.ServiceData, ko.observableArray, ko.observable);
		});
	});
</script>
```

Result is dataMapper will fill your ServiceData property with all observable properties (Includes list items). 
