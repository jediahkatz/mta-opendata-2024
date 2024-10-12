const subwayLayerStyles = [
    {
       "id":"subway_green",
       "source":"nyc-subway-routes",
       "type":"line",
       "filter":[
          "all",
          [
             "==",
             "rt_symbol",
             "4"
          ]
       ],
       "paint":{
          "line-color":"rgba(0, 147, 60, 0.2)",
          "line-width":{
             "stops":[
                [
                   10,
                   1
                ],
                [
                   15,
                   4
                ]
             ]
          }
       }
    },
    {
       "id":"subway_yellow",
       "source":"nyc-subway-routes",
       "type":"line",
       "filter":[
          "all",
          [
             "==",
             "rt_symbol",
             "N"
          ]
       ],
       "paint":{
          "line-color":"rgba(252, 204, 10, 0.2)",
          "line-width":{
             "stops":[
                [
                   10,
                   1
                ],
                [
                   15,
                   4
                ]
             ]
          }
       }
    },
    {
       "id":"subway_gray",
       "source":"nyc-subway-routes",
       "type":"line",
       "filter":[
          "all",
          [
             "==",
             "rt_symbol",
             "L"
          ]
       ],
       "paint":{
          "line-color":"rgba(167, 169, 172, 0.2)",
          "line-width":{
             "stops":[
                [
                   10,
                   1
                ],
                [
                   15,
                   4
                ]
             ]
          }
       }
    },
    {
       "id":"subway_brown",
       "source":"nyc-subway-routes",
       "type":"line",
       "filter":[
          "all",
          [
             "==",
             "rt_symbol",
             "J"
          ]
       ],
       "paint":{
          "line-color":"rgba(153, 102, 51, 0.2)",
          "line-width":{
             "stops":[
                [
                   10,
                   1
                ],
                [
                   15,
                   4
                ]
             ]
          }
       }
    },
    {
       "id":"subway_light_green",
       "source":"nyc-subway-routes",
       "type":"line",
       "filter":[
          "all",
          [
             "==",
             "rt_symbol",
             "G"
          ]
       ],
       "paint":{
          "line-color":"rgba(108, 190, 69, 0.2)",
          "line-width":{
             "stops":[
                [
                   10,
                   1
                ],
                [
                   15,
                   4
                ]
             ]
          }
       }
    },
    {
       "id":"subway_orange",
       "source":"nyc-subway-routes",
       "type":"line",
       "filter":[
          "all",
          [
             "==",
             "rt_symbol",
             "B"
          ]
       ],
       "paint":{
          "line-color":"rgba(255, 99, 25, 0.2)",
          "line-width":{
             "stops":[
                [
                   10,
                   1
                ],
                [
                   15,
                   4
                ]
             ]
          }
       }
    },
    {
       "id":"subway_blue",
       "source":"nyc-subway-routes",
       "type":"line",
       "filter":[
          "any",
          [
             "==",
             "rt_symbol",
             "A"
          ],
          [
             "==",
             "rt_symbol",
             "SI"
          ]
       ],
       "paint":{
          "line-color":"rgba(0, 57, 166, 0.2)",
          "line-width":{
             "stops":[
                [
                   10,
                   1
                ],
                [
                   15,
                   4
                ]
             ]
          }
       }
    },
    {
       "id":"subway_purple",
       "source":"nyc-subway-routes",
       "type":"line",
       "filter":[
          "all",
          [
             "==",
             "rt_symbol",
             "7"
          ]
       ],
       "paint":{
          "line-color":"rgba(185, 51, 173, 0.2)",
          "line-width":{
             "stops":[
                [
                   10,
                   1
                ],
                [
                   15,
                   4
                ]
             ]
          }
       }
    },
    {
       "id":"subway_red",
       "source":"nyc-subway-routes",
       "type":"line",
       "filter":[
          "all",
          [
             "==",
             "rt_symbol",
             "1"
          ]
       ],
       "paint":{
          "line-color":"rgba(238, 53, 46, 0.2)",
          "line-width":{
             "stops":[
                [
                   10,
                   1
                ],
                [
                   15,
                   4
                ]
             ]
          }
       }
    },
    // {
    //    "id":"subway_stations",
    //    "minzoom":11,
    //    "source":"nyc-subway-stops",
    //    "type":"circle",
    //    "paint":{
    //       "circle-color":"rgba(255, 255, 255, 1)",
    //       "circle-opacity":{
    //          "stops":[
    //             [
    //                11,
    //                0
    //             ],
    //             [
    //                12,
    //                1
    //             ]
    //          ]
    //       },
    //       "circle-stroke-opacity":{
    //          "stops":[
    //             [
    //                11,
    //                0
    //             ],
    //             [
    //                12,
    //                1
    //             ]
    //          ]
    //       },
    //       "circle-radius":{
    //          "stops":[
    //             [
    //                10,
    //                2
    //             ],
    //             [
    //                14,
    //                5
    //             ]
    //          ]
    //       },
    //       "circle-stroke-width":1,
    //       "circle-pitch-scale":"map"
    //    }
    // },
    // {
    //    "id":"subway_stations_labels",
    //    "minzoom":13,
    //    "source":"nyc-subway-stops",
    //    "type":"symbol",
    //    "layout":{
    //       "text-field":"{name}",
    //       "symbol-placement":"point",
    //       "symbol-spacing":250,
    //       "symbol-avoid-edges":false,
    //       "text-size":14,
    //       "text-anchor":"center"
    //    },
    //    "paint":{
    //       "text-halo-color":"rgba(255, 255, 255, 1)",
    //       "text-halo-width":1,
    //       "text-translate":[
    //          1,
    //          20
    //       ],
    //       "text-opacity":{
    //          "stops":[
    //             [
    //                13,
    //                0
    //             ],
    //             [
    //                14,
    //                1
    //             ]
    //          ]
    //       }
    //    }
    // }
]
export default subwayLayerStyles;