$("#signUpModal").on("shown.bs.modal", function () {
	map.updateSize();
});

var map = new ol.Map({
	target: "map",
	layers: [
		new ol.layer.Tile({
			minZoom: 10,
			source: new ol.source.OSM(),
		}),
	],
	view: new ol.View({
		center: [13903066.89804018, 1229275.2830421156],
		zoom: 15,
		minZoom: 11,
	}),
});

var Mapcoordinates = "";
map.on("click", function (env) {
	map.getLayers().forEach((layer) => {
		if (layer.get("name") && layer.get("name") == "vectorLayer") {
			map.removeLayer(layer);
		}
	});

	const iconFeature = new ol.Feature({
		geometry: new ol.geom.Point([env.coordinate[0], env.coordinate[1]]),
	});

	var layer = new ol.layer.Vector({
		source: new ol.source.Vector({
			features: [iconFeature],
		}),
		style: new ol.style.Style({
			image: new ol.style.Icon({
				anchor: [0.5, 46],
				anchorXUnits: "fraction",
				anchorYUnits: "pixels",
				src: "https://openlayers.org/en/latest/examples/data/icon.png",
			}),
		}),
	});
	Mapcoordinates = [env.coordinate[0], env.coordinate[1]];
	layer.set("name", "vectorLayer");
	map.addLayer(layer);
});

$(document).ready(function () {
	$("#alertMessage").hide();
	$("#signUpForm").submit(function (e) {
		e.preventDefault();
		var dataForm = {
			firstName: $("#signUpForm").find("input[name='firstName']").val(),
			middleName: $("#signUpForm").find("input[name='middleName']").val(),
			lastName: $("#signUpForm").find("input[name='lastName']").val(),
			contactNumber: $("#signUpForm").find("input[name='contactNumber']").val(),
			userName: $("#signUpForm").find("input[name='userName']").val(),
			password: $("#signUpForm").find("input[name='password']").val(),
			reTypePassword: $("#signUpForm")
				.find("input[name='reTypePassword']")
				.val(),
			realEstate: $("#signUpForm")
				.find("select[name='realEstate'] option:selected")
				.val(),
			barangay: $("#signUpForm")
				.find("select[name='barangay'] option:selected")
				.val(),
			address: $("#signUpForm").find("input[name='address']").val(),
		};

		if ($("#realEstate").val() != "residential") {
			dataForm.businessName = $("#signUpForm")
				.find("input[name='businessName']")
				.val();
			dataForm.businessPermit = $("#signUpForm")
				.find("input[name='businessPermit']")
				.val();
			dataForm.businessType = $("#signUpForm")
				.find("select[name='businessType'] option:selected")
				.val();
		}

		if (Mapcoordinates.length == 0) {
			dataForm.coordinates = "";
		} else {
			dataForm.coordinates = Mapcoordinates[0] + ", " + Mapcoordinates[1];
		}

		$.ajax({
			url: base_url + "welcome/signUp",
			type: "post",
			dataType: "json",
			data: dataForm,
			success: function (data) {
				if (data.response == "success") {
					window.location.href = base_url + "welcome?pesan=SignUpConfirm";
				} else {
					$("#alertMessage").show();
					$("#alertMessage").html(data.message);
				}
			},
		});
	});

	//Add Admin
	$("#submitAdmin").submit(function (e) {
		e.preventDefault();

		var dataForm = $("#submitAdmin").serializeArray();
		$.ajax({
			url: base_url + "settings/addAdmin",
			type: "post",
			dataType: "json",
			data: dataForm,
			success: function (data) {
				if (data.response == "success") {
					toastr.success("Admin has successfully been add.");
					setTimeout(function () {
						location.reload();
					}, 2000);
				} else {
					$("#alertMessage").show();
					$("#alertMessage").html(data.message);
				}
			},
		});
	});

	//Edit Admin
	$(".submiteditAdmin").submit(function (e) {
		e.preventDefault();

		var dataForm = $(this).serializeArray();
		$.ajax({
			url: base_url + "settings/editAdmin",
			type: "post",
			dataType: "json",
			data: dataForm,
			success: function (data) {
				if (data.response == "success") {
					toastr.success("An Admin has successfully been edit.");
					setTimeout(function () {
						location.reload();
					}, 2000);
				} else {
					$("#alertMessage" + dataForm[0].value + "").removeAttr(
						"hidden",
						"hidden"
					);
					$("#alertMessage" + dataForm[0].value + "").html(data.message);
				}
			},
		});
	});

	$("#wastecat_name").change(function () {
		var selectedOption = $("#wastecat_name").prop("selectedIndex");
		$("#wasteSpecs option").eq(selectedOption).prop("selected", true);
	});

	var pickerOpts1 = {
		dateFormat: "yy-mm-dd",
		onSelect: function (dateText, inst) {
			var date = $(this).datepicker("getDate");
			$("#datepicker2").val($.datepicker.formatDate("DD", date));
		},
	};

	var currentDate = new Date();
	$("#datepicker2").val($.datepicker.formatDate("DD", currentDate));
	$("#datepicker").datepicker(pickerOpts1).datepicker("setDate", currentDate);

	$("form[name='form_edit_mahasiswa']").each(function () {
		$(this)
			.find("select[name='name_wastecat']")
			.change(function () {
				var selectedOption = $(this).prop("selectedIndex");
				var changeOption = $(this).parent().parent();
				changeOption
					.find("select[name='spec'] option")
					.eq(selectedOption)
					.prop("selected", true);
			});
		var pickerOpts2 = {
			dateFormat: "yy-mm-dd",
			onSelect: function (dateText, inst) {
				var date = $(this).datepicker("getDate");
				$(this)
					.parent()
					.parent()
					.find("input[name='wastecat_day']")
					.val($.datepicker.formatDate("DD", date));
			},
		};
		$(this).find("input[name='wastecat_date']").datepicker(pickerOpts2);
	});

	$("form[name='editUserModal']").each(function () {
		$(this)
			.find("select[name='realEstate']")
			.change(function () {
				if ($(this).val() == "residential") {
					$(this).parent().parent().parent().find(".commercialIndustry").hide();
				} else {
					$(this).parent().parent().parent().find(".commercialIndustry").show();
				}
			});
	});

	$("#realEstate").change(function () {
		if ($(this).val() == "residential") {
			$("#commercialIndustry").hide();
		} else {
			$("#commercialIndustry").show();
		}
	});

	$.get(base_url + "usersection/get_ajaxData", function (data) {
		var dataLength = JSON.parse(data);
		let map = [];
		for (let index = 0; index < dataLength.length; index++) {
			var location = dataLength[index].location.split(", ");
			iconFeature1 = new ol.Feature({
				geometry: new ol.geom.Point([location[0], location[1]]),
			});
			map1 = new ol.Map({
				target: "viewMap" + dataLength[index].user_id,
				layers: [
					new ol.layer.Tile({
						minZoom: 10,
						source: new ol.source.OSM(),
					}),
				],
				view: new ol.View({
					center: [13903066.89804018, 1229275.2830421156],
					zoom: 15,
					minZoom: 11,
				}),
			});
			var layer = new ol.layer.Vector({
				source: new ol.source.Vector({
					features: [iconFeature1],
				}),
				style: new ol.style.Style({
					image: new ol.style.Icon({
						anchor: [0.5, 46],
						anchorXUnits: "fraction",
						anchorYUnits: "pixels",
						src: "https://openlayers.org/en/latest/examples/data/icon.png",
					}),
				}),
			});
			layer.set("name", "vector");
			map1.addLayer(layer);
			map.push(map1);
		}
		for (let index = 0; index < dataLength.length; index++) {
			$("#viewBusiness"+dataLength[index].user_id).on("shown.bs.modal", function() {
				map[index].updateSize();
			});
		}
	});

	$.get(base_url + "usersection/get_ajaxData", function (data) {
		var dataLength = JSON.parse(data);
		let map = [];
		for (let index = 0; index < dataLength.length; index++) {
			var location = dataLength[index].location.split(", ");
			iconFeature1 = new ol.Feature({
				geometry: new ol.geom.Point([location[0], location[1]]),
			});
			map1 = new ol.Map({
				target: "viewMap1" + dataLength[index].user_id,
				layers: [
					new ol.layer.Tile({
						minZoom: 10,
						source: new ol.source.OSM(),
					}),
				],
				view: new ol.View({
					center: [13903066.89804018, 1229275.2830421156],
					zoom: 15,
					minZoom: 11,
				}),
			});
			var layer = new ol.layer.Vector({
				source: new ol.source.Vector({
					features: [iconFeature1],
				}),
				style: new ol.style.Style({
					image: new ol.style.Icon({
						anchor: [0.5, 46],
						anchorXUnits: "fraction",
						anchorYUnits: "pixels",
						src: "https://openlayers.org/en/latest/examples/data/icon.png",
					}),
				}),
			});
			layer.set("name", "vector");
			$("#editMunicipal"+dataLength[index].user_id).find("input[name='coordinate']").val(location[0]+", "+location[1]);
			map1.addLayer(layer);
			map.push(map1);
		}
		for (let index = 0; index < dataLength.length; index++) {
			$("#editMunicipal"+dataLength[index].user_id).on("shown.bs.modal", function() {
				map[index].updateSize();
				map[index].on("click", function (env) {
					map[index].getLayers().forEach((layer) => {
						if (layer.get("name") && layer.get("name") == "vectorLayer" || layer.get("name") && layer.get("name") == "vector") {
							map[index].removeLayer(layer);
						}
					});
				
					const iconFeature = new ol.Feature({
						geometry: new ol.geom.Point([env.coordinate[0], env.coordinate[1]]),
					});
				
					var layer = new ol.layer.Vector({
						source: new ol.source.Vector({
							features: [iconFeature],
						}),
						style: new ol.style.Style({
							image: new ol.style.Icon({
								anchor: [0.5, 46],
								anchorXUnits: "fraction",
								anchorYUnits: "pixels",
								src: "https://openlayers.org/en/latest/examples/data/icon.png",
							}),
						}),
					});
					layer.set("name", "vectorLayer");
					$("#editMunicipal"+dataLength[index].user_id).find("input[name='coordinate']").val(env.coordinate[0]+", "+env.coordinate[1]);
					map[index].addLayer(layer);
				});
			});
		}
	});


});
