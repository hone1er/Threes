import React, { useContext } from "react";
import { GameContext } from "./GameProvider";
import { Die } from "./styledComponents/Die";
import { DiceDiv } from "./styledComponents/DiceDiv";

export default function Dice() {
  const { game, handleScore, player } = useContext(GameContext);
  return (
    <DiceDiv>
      {game.diceValues.map((value, index) => {
        if (game.dieVisable[index]){
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
            {value}
          </Die>
        )};
      return null})
      }
    </DiceDiv>
  );
}
