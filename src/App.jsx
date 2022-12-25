import { createSignal } from "solid-js"
const treeRaw = `
 ┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
 │ ┌────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
 │ │                                                                                                    │ │
 │ │                                                                                                    │ │
 │ │                                                                                                    │ │
 │ │                             @                                                                      │ │
 │ │                            ^!:                                                                     │ │
 │ │                           :?Y7                            ( /  /                                   │ │
 │ │                          :J5Y57.                           /--/ __,   ,_    ,_   __  ,             │ │
 │ │                        .?P5*555Y!.                        /  /_(_/(__/|_)__/|_)_/ (_/_             │ │
 │ │                     :!YP*5PP5YY*Y5?~.                                /|    /|      /               │ │
 │ │                     ....:YP*Y557....                                (/    (/      '                │ │
 │ │                       .!55YY5555J~.                        _ __                                    │ │
 │ │                  ..~?5PP55P5YY*Y55*J!^.                   ( /  )                                   │ │
 │ │                .^!77!~*P*P*Y5YYY5*~^~!!^:                  /  / _  , , ,                           │ │
 │ │                      ^5P55YYYY*5Y5J:                      /  (_(/_(_(_/_                           │ │
 │ │                 ..*75P*555*YYY*5Y555J7^:..                                                         │ │
 │ │             .:~!77?Y*PP55YY*YYYY*Y555J*?77~^.                                                      │ │
 │ │                  .75P555*YYY*YY*YYYY5J~.                   __   _                                  │ │
 │ │              .~?5GP5PPP5*Y5YYYYYYYY5*Y55J!^.              ( /  /                                   │ │
 │ │              :^~^^*?P5*YY5YYY*YY*YY5Y!::^^^.               (__/ _  __,  _                          │ │
 │ │                 .!5P5YYYYY5*5YYYYYYY*5J^                    _/_(/_(_/(_/ (_                        │ │
 │ │             .:!YPP5YYY555555YYYYYYYYYY55Y?~:               //                                      │ │
 │ │        :~7J5PGPP5*55PPPP*5YY5Y*YYYY5*Y555555YJ7~^.        (/                                       │ │
 │ │        :~?Y*PPPP*YYPP*55YY5YYYYYYY*Y55J*JYY*YJ?!^.                                                 │ │
 │ │               ..^75P5Y555YYYY*YYYYY5Y5Y7~:.                                                        │ │
 │ │          .:~!?*5PP5*5PP55Y5Y*YYYYYYYY5555YJ7~^:.                                                   │ │
 │ │           .^~!~~5P*PPP5Y*YYYYYYYYYYYYY*5Y7*^~^:.                                                   │ │
 │ │               .JPPPPP5YYYYYY555*YYY555555Y?:                                                       │ │
 │ │            .^JGGPP55YYY55555PP5Y*5555Y*55555Y!.                                                    │ │
 │ │        .:!JPG*P5555*PPPPPG*BB*5YYJ!:..:7*55*555J!^.                                                │ │
 │ │    .^7Y5P*GPPPP555@YJ7~?######P55B~       .^!*??JJJ?!^.                                            │ │
 │ │                       !#BBBB##PB&?                                                                 │ │
 │ │                       5#BBBBB###BP                                                                 │ │
 │ │                      .B##########B.                                                                │ │
 │ │BBBBBBBBBBBBBBGGGGGBBBBBBGPBBGGBBBBPP5GBBBBBPBGPP55PPGGGGGPPGGGGGBBBGGBBBG555YYY55PPPPPPGGGGBBBBBBBB│ │
 │ │GGBBBBBBBBBBBBGPPGGBBBBBBGPPBGGPGBBGYY5BBBBBGGGGGPPPGGGGGP5PPGGGGGGBBBBGGPPPPPPPPPPPPPPPPPPGBBBBBBBB│ │
 │ │GGGGBBBBGGBBBBP5YYYPGBBBBGGGYJYGBPYGBBBBBBBBBGPGPP5YYY5PP55PYYPGPP555PPPPPPPPPPPGGBBGGGGGGGGBBBBBBBB│ │
 │ └────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
 └────────────────────────────────────────────────────────────────────────────────────────────────────────┘
`.replaceAll("*", "@")
const green = [];

let c = 0;

const genTree = () => {
  return treeRaw.split('\n').map((it, lineIdx) => it.trim().split('').map((it, idx) => {
    if (it == ' ' && idx != 1 && idx !== 104) {
      return Math.random() < 0.05 ? '*' : ' '
    }
    return it
  }).map((it, idx) => {
    let color;

    if (it !== ' ') {
      color = ['#393', '#161', '#292'][(lineIdx) % 3];
    }

    if (lineIdx > 32) {
      color = '#532'
    }

    if (lineIdx > 35) {
      color = ['#ccc', '#bbb', '#ddd'][Math.floor(Math.random() * 3)];
    }
    if ("─└│┘┌┐".split("").includes(it)) {
      color = "#ff5"
    }

    if ("/|_)(-,'".split("").includes(it)) {
      color = "#f03"
    }
    if (it == '@') {
      if ((c++) % 2 == 0) {
        color = '#ff0'
      } else {
        color = '#393'
      }
    }
    if (it == '*') color = '#fff'
    return { s: it, color }
  }))
}


function App() {
  // g

  const [tree, setTree] = createSignal()

  setInterval(() => {
    setTree(genTree())
  }, 300)

  return (
    <pre>
      <For each={tree()}>
        {line =>
          <div><For each={line}>
            {ch => <span style={{ color: ch.color, "text-shadow": "0 0 1px " + ch.color }}>{ch.s}</span>}
          </For>
          </div>

        }
      </For>
    </pre>
  );
}

export default App;
