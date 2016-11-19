import { Move } from "./game/board";
import BoardParser from "./game/symbolsBoardParser";
import LevelSet from "./game/levelSet";
import { writeToCanvas } from "./display/canvasDisplay";


const canvas = document.getElementById("root") as HTMLCanvasElement;

const parser = new BoardParser();

const levels = getLevels();
const levelSet = new LevelSet(levels, parser);

levelSet.onLevelFinished = () => {
  alert("YOU WIN THIS LEVEL. Give yourself a high-five");
  levelSet.nextLevel();
  writeToCanvas(canvas, levelSet.currentLevel);
};

levelSet.onSetFinished = () => {
  alert("YOU Finished all levels. Sweet Christmas!");
};

writeToCanvas(canvas, levelSet.currentLevel);

window.onkeydown = (e) => {
  switch (e.keyCode) {
    case 37: // Arrow left
      levelSet.currentLevel.move(1, Move.Left);
      break;
    case 38: // Arrow up
      levelSet.currentLevel.move(1, Move.Climb);
      break;
    case 39: // Arrow right
      levelSet.currentLevel.move(1, Move.Right);
      break;
    case 40: // Arrow down
      levelSet.currentLevel.move(1, Move.GrabDrop);
      break;
    case 82: // Letter "r"
      levelSet.currentLevel.reset();
      break;
    default:
      break;
  }

  writeToCanvas(canvas, levelSet.currentLevel);
};

document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

let xDown = undefined;
let yDown = undefined;

function handleTouchStart(evt: TouchEvent): void {
  xDown = evt.touches[0].clientX;
  yDown = evt.touches[0].clientY;
};

function handleTouchMove(evt: TouchEvent): void {
  if (!xDown || !yDown ) {
    return;
  }

  let xUp = evt.touches[0].clientX;
  let yUp = evt.touches[0].clientY;

  let xDiff = xDown - xUp;
  let yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      levelSet.currentLevel.move(1, Move.Left);
    } else {
      levelSet.currentLevel.move(1, Move.Right);
    }
  } else {
    if (yDiff > 0) {
      levelSet.currentLevel.move(1, Move.Climb);
    } else {
      levelSet.currentLevel.move(1, Move.GrabDrop);
    }
  }

  xDown = undefined;
  yDown = undefined;
};


function getLevels(): string[] {
  return [
`
#                  #
#                  #
#                  #
#   #       #      #
#D  #   # B # B P  #
####################`,
    " #    ##        ##    \n" +
" #                #   \n" +
"##                 #  \n" +
"#D                  # \n" +
"##                   #\n" +
" #           #  B    #\n" +
" #           #B BBP  #\n" +
" #####   #############\n" +
"     #  B#            \n" +
"     #####            ",

" #                 \n" +
" #   ############# \n" +
"# # #             #\n" +
"#  #              #\n" +
"#                B#\n" +
"#               BB#\n" +
"# ###    P   #B ## \n" +
"# # #    #  #####  \n" +
"# # #BB ##  #      \n" +
"#D# ###### ##      \n" +
"### ##   ###       ",

"                  #     \n" +
"                 # #    \n" +
"       #        #   #   \n" +
"      # #      #     #  \n" +
"   ###   #    #       # \n" +
"  #       #  #         #\n" +
" #         ##          #\n" +
" #                    B#\n" +
" #                   BB#\n" +
" #               P   ###\n" +
"##    #          #   #  \n" +
"#D    # B        #####  \n" +
"##### # B   B  ###      \n" +
"    # # B # #B #        \n" +
"    # ##########        \n" +
"    ###                 ",

"     ###    ######### \n" +
" ####   ####         #\n" +
"#                    #\n" +
"#                    #\n" +
"#                    #\n" +
"#     #              #\n" +
"#     #              #\n" +
"#     #BBBB          #\n" +
"#D   #######P        #\n" +
"## ###     ## #     B#\n" +
" # #        # ##   BB#\n" +
" # #        # ##  BBB#\n" +
" ###        # ########\n" +
"            ###       ",

" ###             ####\n" +
" #  #############   #\n" +
"##                  #\n" +
"#D                  #\n" +
"##                  #\n" +
" #                BB#\n" +
" #BB        #  B  ###\n" +
" #BBB       #PBBB #  \n" +
" #BBBB      ##### #  \n" +
" #####    ###   ###  \n" +
"     #   B#          \n" +
"     ## ###          \n" +
"      ###            ",

"  #   #####   ##   ###  \n" +
" # # #     # #  # #   # \n" +
" #  ##      ##   ##    #\n" +
" #   #       #    #    #\n" +
" #                    B#\n" +
" #                    B#\n" +
"##                   BB#\n" +
"#D   B               ###\n" +
"##   # B     #    ## #  \n" +
" #   # B    ## B P####  \n" +
" ##  # BBB  ## BBB#     \n" +
"  #  ###### #######     \n" +
"  ## #    ###           \n" +
"   ###                  ",

" ###       ####   #######  \n" +
"#   #     #    # #       # \n" +
"#    #   #     ##         #\n" +
"#B    ###    # #     ###  #\n" +
"#BB         ##      ## #  #\n" +
"####       ##          #D #\n" +
"   ##            ##    ## #\n" +
"  #    B #      #  #      #\n" +
"  #    B# #    #   #      #\n" +
" #   ###   #    #  #     B#\n" +
" #      # #      ##     BB#\n" +
"#        #           ######\n" +
"#            B            #\n" +
"#    B      ###          B#\n" +
"#   ###                 BB#\n" +
"#        B       B  P  BBB#\n" +
"###########################",

"        ###         \n" +
"       #   #        \n" +
"      #     #  #####\n" +
"     #       ##    #\n" +
"    #     B        #\n" +
"   #      BB      B#\n" +
"  #       ###    BB#\n" +
" #            P ####\n" +
"#             B    #\n" +
"#D           ###   #\n" +
"##    ##   #      B#\n" +
" #    ##B  ##   ####\n" +
" #    #######  ##   \n" +
" ###  #     # ##    \n" +
"   # ##     ###     \n" +
"   ###              ",

"   #####################   \n" +
" ##           #         #  \n" +
"####B       BB#B   BBB B## \n" +
"#  ##  #   #####  B### ## #\n" +
"#   #  ##        ### ###  #\n" +
"#   ##  ##BBBB            #\n" +
"#D       #######          #\n" +
"##        #   ###        ##\n" +
" #     B   # #  ##        #\n" +
" #     #    #    ##       #\n" +
" ####  ##             #####\n" +
"   #####      P           #\n" +
"   #          #           #\n" +
"   #         ##    ########\n" +
"   #        ##           # \n" +
"   #          B         B# \n" +
"   #B    ###########   BB# \n" +
"   #BB  ##         ## BBB# \n" +
"   ######           ###### ",

"#############################\n" +
"#  #   #                    #\n" +
"#     B#BB            ##### #\n" +
"#B   ### B##     B  ##  D # #\n" +
"#BB    ###   P  B       # # #\n" +
"###  BB#     # B          # #\n" +
"#   ####      #  ###   ###  #\n" +
"#B            # #      #  B #\n" +
"#BB       ### # #B    #  ####\n" +
"#### B   ###  # ##B  # B #  #\n" +
"#           B ###  B#   #   #\n" +
"#   B     BB #   ####       #\n" +
"#    #########        ##### #\n" +
"#              B   B##    # #\n" +
"####           B   #    BB# #\n" +
"#B##   #    #          #### #\n" +
"##B### #    #   BBB B       #\n" +
"#B#B#B##    #        BBB    #\n" +
"#############################"
  ];
}
