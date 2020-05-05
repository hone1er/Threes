import React, { useContext } from "react";
import { GameContext } from "./GameProvider";
import { Die } from "./styledComponents/Die";
import { DiceDiv } from "./styledComponents/DiceDiv";
import die1 from "../diceSVG/U+2680.svg"
import die2 from "../diceSVG/U+2681.svg"
import die3 from "../diceSVG/U+2682.svg"
import die4 from "../diceSVG/U+2683.svg"
import die5 from "../diceSVG/U+2684.svg"
import die6 from "../diceSVG/U+2685.svg"

export default function Dice() {
  const { game, handleScore, player } = useContext(GameContext);
  return (
    <DiceDiv className="dice-area">
      {game.diceValues.map((value, index) => {
        if (game.dieVisable[index]){
          let die;
          switch (value) {
            case 1:
              die = die1
              break;
          case 2:
              die = die2
              break;
              case 3:
              die = die3
              break;
              case 4:
              die = die4
              break;
              case 5:
              die = die5
              break;
              case 6:
              die = die6
              break;
              
            default:
              break;
          }
        return (
          <Die
            key={index}
            id={index}
            disabled={
              player !== game.names[game.currentPlayer]
                ? true
                : game.diceDisabled
            }
            className="dice"
            onClick={() => handleScore(game.currentPlayer, value, index)}
          >
            <img src={die} alt="dice" />
          </Die>
        )};
      return null})
      }
    </DiceDiv>
  );
}
