new Vue({
    el: '#app',
    components: {
      apexchart: VueApexCharts,
    },
    data: {
      
      series: [{
          name: "Squirtle",
          data: [45, 52, 38, 24, 33, 22],
        },
        {
          name: "Pikachu",
          data: [35, 41, 62, 42, 13, 22],
        },
        {
          name: 'Charizard',
          data: [87, 57, 74, 99, 75, 225],
        },
        {
            name: 'Warturtle',
            data: [8, 5, 4, 9, 5, 25],
        },
        {
            name: 'Voltorb',
            data: [80, 50, 40, 90, 50, 25],
        },
        {
            name: 'Groudon',
            data: [43, 65, 68, 86, 78, 25],
        }
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [5, 5, 5, 5, 5, 5],
          curve: 'straight',
          dashArray: [0, 0, 0, 0, 0, 0]
        },
        title: {
          text: 'Pokémon stats',
          align: 'center'
        },
        legend: {
          tooltipHoverFormatter: function(val, opts) {
            return val + ' - <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>'
          }
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6
          }
        },
        xaxis: {
          categories: ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'],
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val
                }
              }
            }
          ]
        },
        grid: {
          borderColor: '#f1f1f1',
        }
      },
      
      
    },
    
  })