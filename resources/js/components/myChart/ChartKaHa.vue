<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['dataKH'],
  data: () => ({
    chartdata: {
      labels: [],
      datasets: [
        {
          label: 'Kunjungan',
          backgroundColor: '#EC407A',
          borderColor: '#D4E157',
          data: [],
          borderCapStyle: 'square',
          fill: false,
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
    this.chartdata.datasets[0].data = this.dataKH.kunjH
    let arr = []
    for(let i=1; i<= this.dataKH.jumlahHari; i++){
      arr.push('tgl '+i)
    }
    this.chartdata.labels = arr
    this.options.title.text = 'Kunjungan Bulan '+this.dataKH.judulKH
    this.renderChart(this.chartdata, this.options)
  }
}
</script>