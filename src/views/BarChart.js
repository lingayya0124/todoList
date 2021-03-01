import { mixins, Bar } from "vue-chartjs";

export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: ["options"],
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
