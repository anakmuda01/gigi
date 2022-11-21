<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: ['dataPie'],
  data: () => ({
    chartdata: {
      labels: [],
      datasets: [
        {
          backgroundColor: [
            '#58508d',
            '#bc5090',
            '#ff6361',
            '#ffa600'
          ],
          data: [10,20,30,40]
        },
      ]
    },
    options: {
      title: {
          display: true,
          text: 'Pasien Berdasarkan Umur',
          fontSize: 16,
      },
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            var dataset = data.datasets[tooltipItem.datasetIndex];
            var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
              return previousValue + currentValue;
            });
            var currentValue = dataset.data[tooltipItem.index];
            var percentage = Math.floor(((currentValue/total) * 100)+0.5);         
            return percentage + "%";
          }
        }
      }
    }
  }),

  mounted () {
    this.chartdata.labels = [
      '< 13 Tahun : '+this.dataPie[0]+' Orang', '13-30 Tahun : '+this.dataPie[1]+' Orang', 
      '31-50 Tahun : '+this.dataPie[2]+' Orang', '> 50 Tahun : '+this.dataPie[3]+' Orang'
    ]
    this.chartdata.datasets[0].data = this.dataPie
    this.renderChart(this.chartdata, this.options)
  }
}
</script>