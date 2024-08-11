# tic-tac-toe

This is a simple vanilla JS tic-tac-toe project where players can enter names and play against each other.
The game looks out for draws, wins and three-wins-in-a-row. 

The development approach of console-first as encouraged in the project is remarkable. I definitely learned a lot from doing this project. One remarkable thing I learned is that closures in JS have far-reaching uses - more than I ever imagined.

While updating this README, I just that the Odin Project Node path had major updates and I can't wait to get back to studying. The skills I learn here, I hope to put into use in the nearest future.

Ill keep you updated on my progress.

On y va!


*Edit*

There is a small bug that I observed with the New game buttons (on the modal and the board header). When you click it, and enter the player names on the form to Start Game, it appends these new names entered with the names of the previous game on the modal display. 

When any of the new game buttons are clicked on for the second time and the player names are entered on the form and Start Game is clicked, it renders the board on the same page below the form and the appends the new names to the previous two. 

One way to fix it is to reload the page onClick of any of the New Game buttons. Another way to fix it may be to look at the startGameButton event listener in newGame(). Another solution could be on 432, to find a way to clear old player names on click of newGameButtons before removing the gameContainer and calling newGame(). 

Will these fix the bug of the board rendering on the same page as the form as described above? I will hopefully fix this later.