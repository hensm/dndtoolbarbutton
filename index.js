const { Cc, Ci }		= require("chrome");
const { ToggleButton }	= require("sdk/ui/button/toggle");

const { get: _ } = require("sdk/l10n");


const alerts_service = Cc["@mozilla.org/alerts-service;1"]
	.getService(Ci.nsIAlertsService)
	.QueryInterface(Ci.nsIAlertsDoNotDisturb);

ToggleButton({
	id: "dnd-toggle",
	label: _("label_disabled"),
	icon: "./off.png",

	onChange: function () {
		this.state("window", null);
		this.checked = !this.checked;

		if (this.checked) {
			this.icon = "./on.png";
			this.label = _("label_enabled");
		} else {
			this.icon = "./off.png";
			this.label = _("label_disabled");
		}

		alerts_service.manualDoNotDisturb = this.checked;
	}
});
