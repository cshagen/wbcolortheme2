<template>
  <div>
    <hr />
    <cp-charge-config-item :title="'Ladepunkt sperren?'">
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
        />
      </div>
    </cp-charge-config-item>
    <!-- Select the vehicle -->
    <cp-charge-config-item :title="'Fahrzeug:'">
      <div class="dropdown">
        <div class="d-grid gap-2">
          <button
            type="button"
            class="btn btn-outline-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            {{ chargepoint.carName }}
          </button>
          <ul class="dropdown-menu">
            <li v-for="(car, index) in vehicle" :key="index">
              <a class="dropdown-item" href="#">
                {{ car.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </cp-charge-config-item>
    <!-- Select the charge mode -->
    <cp-charge-config-item :title="'Lademodus:'">
        <div class="dropdown">
      <div class="d-grid gap-2">
          <button
            type="button"
            class="btn dropdown-toggle"
            data-bs-toggle="dropdown"
            :style="{
              background: chargemodes[chargepoint.chargeMode].color,
              color: 'var(--color-fg)',
            }"
          >
            {{ chargemodes[chargepoint.chargeMode].name }}
          </button>

          <ul class="dropdown-menu">
            <li v-for="(mode, index) in chargemodes" :key="index">
              <a
                class="dropdown-item"
                href="#"
                :style="{ background: mode.color, color: 'var(--color-fg)' }"
              >
                <i class ="fa mr-2" :class="mode.icon"></i> {{ mode.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </cp-charge-config-item>
    <cp-charge-config-item title="Priorität:"> yes </cp-charge-config-item>
    <cp-charge-config-item title="Zeitladen:"> no </cp-charge-config-item>
    <!-- Sofortladen config -->
    <div>
      <hr />
      <h4>Einstellungen für Sofortladen:</h4>
    </div>
    <hr />

    <button type="button" class="btn btn-outline-success" @click="toggleConfig">
      OK
    </button>
  </div>
</template>

<script>
import globalConf from "@/assets/mixins/themeConfig.js";
import cpChargeConfigItem from "./cpChargeConfigItem.vue";

export default {
  name: "bbChargeConfig",
  props: {
    chargepoint: Object,
    vehicle: Array,
  },
  mixins: [globalConf],
  components: {
    cpChargeConfigItem,
  },
  data() {
    return {
      cars: ["Tesla", "Polestar", "ID.3"],
    };
  },
  methods: {
    toggleConfig() {
      this.$emit("closeConfig");
    },
  },
};
</script>

<style></style>
