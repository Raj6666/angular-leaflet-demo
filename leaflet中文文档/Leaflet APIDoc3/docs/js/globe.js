function replaceCdnIP(e) {
	$("#" + e).html($("#" + e).html().replace(new RegExp("127.0.0.1:8020", "gm"), location.host))
}