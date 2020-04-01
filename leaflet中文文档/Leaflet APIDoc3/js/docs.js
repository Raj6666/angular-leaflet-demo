function bindEvents() {
	var t = $(window),
		o = $(document.body);
	o.scrollspy({
		target: ".icl-docs-sidebar"
	}), t.on("load", function() {
		o.scrollspy("refresh")
	}), $('.icl-docs-container [href="#"]').click(function(t) {
		t.preventDefault()
	}), setTimeout(function() {
		var t = $(".icl-docs-sidebar");
		t.affix({
			offset: {
				top: function() {
					var o = t.offset().top;
					return this.top = o
				},
				bottom: function() {
					return this.bottom = $(".icl-docs-footer").outerHeight(!0)
				}
			}
		})
	}, 100)
}
$(function() {
	bindEvents()
});