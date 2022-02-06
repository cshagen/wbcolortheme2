// cookies.js
// Mixin to handle saving and restoring preferences through a cookie
// To be imported at the root  component
import { eventBus } from '@/main.js'
export default {
  
  methods: {
    writeCookie() {
      let prefs = {}
      prefs.hideSH = this.shDevice
        .filter((device) => !device.showInGraph)
        .map((device) => device.id);
      prefs.showLG = this.config.graphPreference == "live";
      prefs.displayM = this.config.displayMode;
      prefs.stackO = this.config.usageStackOrder;
      prefs.showGr = this.config.showGrid;
      prefs.decimalP = this.config.decimalPlaces;
      prefs.smartHomeC = this.config.smartHomeColors;
      prefs.relPM = this.config.showRelativeArcs;
      prefs.maxPow = this.config.maxPower;
      document.cookie =
        "openWBColorTheme=" + JSON.stringify(prefs) + "; max-age=16000000";
    },

    readCookie() {
      const wbCookies = document.cookie.split(";");
      const myCookie = wbCookies.filter(
        (entry) => entry.split("=")[0] === "openWBColorTheme"
      );
      if (myCookie.length > 0) {
        let prefs = JSON.parse(myCookie[0].split("=")[1]);
        Object.entries(prefs).map(preference => {
          switch (preference) {
            case 'decimalP': this.config.decimalPlaces = prefs.decimalP; break
            case 'smartHomeC': this.config.smartHomeColors = prefs.smartHomeC; break
            case 'hideSH': prefs.hideSH.map((i) => (this.shDevice[i].showInGraph = false)); break
            case 'showLG': this.config.graphPreference = prefs.showLG ? "live" : "day"; break
            case 'maxPow': this.config.maxPower = +prefs.maxPow; break
            case 'relPM': this.config.showRelativeArcs = prefs.relPM; break
            case 'displayM': this.config.displayMode = prefs.displayM; break
            case 'stackO': this.config.usageStackOrder = prefs.stackO; break
            case 'showGr': this.config.showGrid = prefs.showGr; break
          }
        })
      }
    }
  },
  mounted () {
    eventBus.$on('writeCookie', () => {
      this.writeCookie()
    })
  },
}
