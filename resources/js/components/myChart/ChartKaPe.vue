<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['dataKP'],
  data: () => ({
    chartdata: {
      labels: ['January', 'February', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober',
      'November', 'Desember'
      ],
      datasets: [
        {
          label: 'Jumlah Kunjungan',
          backgroundColor: '#3949AB',
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
      maintainAspectRatio: false
    }
  }),

  mounted () {
    this.chartdata.datasets[0].data = this.dataKP.kunjP
    this.options.title.text = 'Kunjungan Tahun '+this.dataKP.judulKP
    this.renderChart(this.chartdata, this.options)
  }
}
</script>