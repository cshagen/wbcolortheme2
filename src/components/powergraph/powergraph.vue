<template>
<wbWidget>
  <template v-slot:title> {{ heading }} </template>
  <figure id="powergraph" class="p-0 m-0">
    <svg :viewBox="'0 0 ' + width + ' ' + height">
        <!-- Draw the source graph -->
        <PgSourceGraph
          :graphData="graphData"
          :width="width - margin.left - margin.right"
          :height="(height - margin.top - margin.bottom) / 2"
          :margin="margin"
        ></PgSourceGraph>
        <PgUsageGraph
          :graphData="graphData"
          :width="width - margin.left - margin.right"
          :height="(height - margin.top - margin.bottom) / 2"
          :margin="margin"
        ></PgUsageGraph>
        <PgXAxis
        :width="width - margin.left - margin.right"
        :height="(height - margin.top - margin.bottom)"
        :margin="margin"
        :graphData="graphData"
        :xScale="xScale"
        >
        </PgXAxis>
      </svg>
  </figure>
</wbWidget>
</template>

<script>
import * as d3 from 'd3'
import wbWidget from '../wbWidget.vue'
import PgSourceGraph from './pgSourceGraph.vue'
import PgUsageGraph from './pgUsageGraph.vue'
import PgXAxis from './pgXAxis.vue'
export default {
name: "powergraph",
components: {
    wbWidget,
    PgSourceGraph,
    PgUsageGraph,
    PgXAxis
},
  props: {
    graphData: Array,
  },
  data () {
    return ({
    width : 500,
    height: 500,
    margin: {top: 10, right: 20, bottom: 10, left: 25},
    graphMode:'day',
    
    })
},
computed: {
  xScale() {
      return d3.scaleTime().domain(d3.extent(this.graphData, d => d.date))
        .range([0, this.width - this.margin.left - 2 * this.margin.right])
    },
  heading () {
    let heading = "Leistung / Ladestand ";
    if (this.graphData.length) {
      const startTime = this.graphData[0].date
      const endTime = this.graphData[this.graphData.length - 1].date;
      const liveGraphMinutes = Math.round((endTime - startTime) / 60000);
      heading = heading + liveGraphMinutes + " min";
    } 
    return heading
    
  }
}

}
</script>

<style>

</style>