let candleChart = null

    const displayChart = (data) => {
      if(candleChart) {
        candleChart.updateSeries([{
          data: data.map((d, i) => ({
            x: i,
            y: d
          }))
        }])

        return
      }

      var options = {
        series: [{
          data: data.map((d, i) => ({
            x: i,
            y: d.map(a => +a.toFixed(4))
          }))
        }],
          chart: {
          type: 'candlestick',
          height: 350,
        },
        theme: {
          mode: 'dark'
        },
        annotations: {
          xaxis: [
            {
              x: 29,
              borderColor: '#00E396',
              label: {
                borderColor: '#00E396',
                style: {
                  fontSize: '12px',
                  color: '#fff',
                  background: '#00E396'
                },
                orientation: 'horizontal',
                offsetY: 7,
                text: 'BUY'
              }
            }
          ],
        },
        xaxis: {
          type: 'number'
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      }

      candleChart = new ApexCharts(document.querySelector("#chart"), options);
      candleChart.render();
    }

    const setTp = (tp) => {
      candleChart.removeAnnotation('tp')
      candleChart.addYaxisAnnotation({
        id: 'tp',
        y: tp,
        borderColor: '#00FF00',
        // label: {
        //     text: 'Take profit',
        // }
      })
    }

    const setSl = (sl) => {
      candleChart.removeAnnotation('sl')
      candleChart.addYaxisAnnotation({
        id: 'sl',
        y: sl,
        borderColor: '#FF0000',
        // label: {
        //     text: 'Take profit',
        // }
      })
    }