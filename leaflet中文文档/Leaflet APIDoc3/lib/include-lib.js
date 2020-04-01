! function() {
	function s(s) {
		if(null != s && 0 != s.length)
			for(var e = 0, t = s.length; e < t; e++) {
				var o = s[e];
				if(n.test(o)) {
					var a = '<link rel="stylesheet" href="' + o + "?time=" + i + '">';
					document.writeln(a)
				} else {
					var r = '<script type="text/javascript" src="' + o + "?time=" + i + '"></script>';
					document.writeln(r)
				}
			}
	}

	function e() {
		var e = (t.getAttribute("include") || "").split(","),
			o = t.getAttribute("libpath") || "",
			a = {
				jquery: [o + "js/jquery-2.1.4.min.js"],
				"jquery.scrollTo": [o + "/jquery/scrollTo/jquery.scrollTo.min.js"],
				"jquery.minicolors": [o + "/jquery/minicolors/jquery.minicolors.css", o + "/jquery/minicolors/jquery.minicolors.min.js"],
				"jquery.range": [o + "/jquery/range/range.css", o + "/jquery/range/range.js"],
				ztree: [o + "/jquery/ztree/css/zTreeStyle/zTreeStyle.css", o + "/jquery/ztree/js/jquery.ztree.all.min.js"],
				"jquery.mCustomScrollbar": [o + "/jquery/mCustomScrollbar/jquery.mCustomScrollbar.css", o + "/jquery/mCustomScrollbar/jquery.mCustomScrollbar.js"],
				"font-awesome": [o + "/font-awesome/css/font-awesome.min.css"],
				animate: [o + "/animate/animate.css"],
				bootstrap: [o + "/bootstrap/css/bootstrap.css", o + "/bootstrap/js/bootstrap.min.js"],
				"bootstrap-table": [o + "/bootstrap/plugins/table/bootstrap-table.min.css", o + "/bootstrap/plugins/table/bootstrap-table.min.js", o + "/bootstrap/plugins/table/locale/bootstrap-table-zh-CN.js"],
				"admin-lte": [o + "/font-awesome/css/font-awesome.min.css", o + "/admin-lte/css/AdminLTE.min.css", o + "/admin-lte/css/skins/skin-blue.min.css", o + "/admin-lte/js/adminlte.min.js"],
				ace: [o + "/ace/ace.js"],
				layer: [o + "/layer/theme/default/layer.css", o + "/layer/theme/mars/layer.css", o + "/layer/layer.js"],
				haoutil: [o + "/hao/haoutil.min.js", o + "/hao/loading/loading.css", o + "/hao/loading/loading.js"],
				echarts: [o + "/echarts/echarts.min.js", o + "/echarts/dark.js"],
				"echarts-gl": [o + "/echarts/echarts-gl.min.js"],
				"echarts-forleaflet": [o + "/echarts/forleaflet/echarts-3.4.min.js"],
				mapV: [o + "/mapV/mapv.min.js"],
				highlight: [o + "/highlight/styles/foundation.css", o + "/highlight/highlight.pack.js"],
				turf: [o + "/turf/turf.min.js"],
				"leaflet-mars": [o + "/leaflet-mars/leaflet.css", o + "/leaflet-mars/leaflet.js"],
				"esri-leaflet": [o + "/leafletPlugins/esri/esri-leaflet-debug.js"],
				"cesium-mars": [o + "/Cesium/Widgets/widgets.css", o + "/Cesium/Cesium.js", o + "/cesium-mars/mars3d.css", o + "/cesium-mars/mars3d.js"]
			},
			r = {
				jquery: ["//cdn.bootcss.com/jquery/2.2.4/jquery.min.js"],
				"jquery.scrollTo": ["//cdn.jsdelivr.net/jquery.scrollto/2.1.2/jquery.scrollTo.min.js"],
				"font-awesome": ["//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css"],
				bootstrap: [o + "/bootstrap/css/bootstrap.css", "//cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"],
				"bootstrap-table": ["//cdn.bootcss.com/bootstrap-table/1.11.1/bootstrap-table.min.css", "//cdn.bootcss.com/bootstrap-table/1.11.1/bootstrap-table.min.js", "//cdn.bootcss.com/bootstrap-table/1.11.1/locale/bootstrap-table-zh-CN.min.js"],
				"admin-lte": ["//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css", "//cdn.bootcss.com/admin-lte/2.4.2/css/AdminLTE.min.css", "//cdn.bootcss.com/admin-lte/2.4.2/css/skins/skin-blue.min.css", "//cdn.bootcss.com/admin-lte/2.4.2/js/adminlte.min.js"],
				ace: ["//cdn.bootcss.com/ace/1.2.6/ace.js"],
				echarts: ["//cdn.bootcss.com/echarts/3.7.2/echarts.min.js", o + "/echarts/dark.js"],
				highlight: ["//cdn.bootcss.com/highlight.js/9.12.0/styles/foundation.min.css", "//cdn.bootcss.com/highlight.js/9.12.0/highlight.min.js"],
				turf: ["//cdn.bootcss.com/Turf.js/5.0.4/turf.min.js"],
				"esri-leaflet": ["//cdn.bootcss.com/esri-leaflet/2.1.1/esri-leaflet.js"]
			},
			c = window.location.hostname.indexOf("marsgis") != -1;
		c && s([o + "/hao/noCopy.js"]);
		for(var l in e) {
			var i = e[l];
			s(c ? r[i] || a[i] : a[i])
		}
	}
	for(var t, o = new RegExp("(^|(.*?\\/))(include-lib.js)(\\?|$)"), a = document.getElementsByTagName("script"), r = 0; r < a.length; r++) {
		var c = a[r].getAttribute("src");
		if(c) {
			var l = c.match(o);
			if(l) {
				t = a[r];
				break
			}
		}
	}
	var i = "20180123",
		n = new RegExp("\\.css");
	e()
}();