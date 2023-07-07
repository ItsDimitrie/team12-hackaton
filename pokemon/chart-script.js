export function createGraph(pokemonTeam) {
  let pokemonStats = [];
  
  pokemonTeam.forEach((pokemon) => {
    pokemonStats.push({
      "name": pokemon.name,
      "data": [
        pokemon.hp,
        pokemon.attack,
        pokemon.defense,
        pokemon.specialAttack,
        pokemon.specialDefense,
        pokemon.speed,
      ]
    })
  });

  new Vue({
    el: '#graph',
    components: {
      apexchart: VueApexCharts,
    },
    data: {
      series: pokemonStats,
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
          text: 'Pokémon Stats',
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
  });
}