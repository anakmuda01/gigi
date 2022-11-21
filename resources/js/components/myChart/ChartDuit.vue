<script>
import { HorizontalBar } from 'vue-chartjs'

export default {
  extends: HorizontalBar,
  props: ['dataDuit'],
  data: () => ({
    chartdata: {
      labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober',
      'November', 'Desember'
      ],
      datasets: [
        {
          label: 'Pemasukan',
          backgroundColor: '#FFD700',
          data: []
        },
      ]
    },
    options: {
      title: {
          display: true,
          text: '',
          fontSize: 16,
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
            ticks: {
                // Include a dollar sign in the ticks
                callback: function(value, index, values) {
                    return 'Rp. '+(value/1).toFixed(2).replace('.', ',').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
            }
        }]
      },
      tooltips: {
          callbacks: {
              label: function(tooltipItem, data) {
                  var label = data.datasets[tooltipItem.datasetIndex].label || '';

                  if (label) {
                      label += ': ';
                  }
                  label += 'Rp. '+(tooltipItem.value/1).toFixed(2).replace('.', ',').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  return label;
              }
          }
      }
    }
  }),

  mounted () {
    this.chartdata.datasets[0].data = this.dataDuit.duit
    this.options.title.text = 'Pemasukan Tahun '+this.dataDuit.judulDuit
    this.renderChart(this.chartdata, this.options)
  }
}
</script>