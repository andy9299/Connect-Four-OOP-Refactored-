#Further Study
If you have more time and would like more tasks, here are some things to play with:

1. Make it so that you can have more than two players
    * Started
        * Need textbox for num players and create multiple entries for player color
        * code mostly scalable except for "document.getElementById('start').addEventListener('click', ...)"
            * use queryselector all to select all colors 
            * iterate thru it with an index 
            * create player and push to empty array
                * use index + 1 for player num (should start at 1)
                * need to randomize default color
            * construct game with array
2. The look-and-feel is very sparse: add animations, better graphics for the board or pieces, and other CSS ideas. You could even use bootstrap for things like modals for the start-new-game form.
3. Make a very simple computer player: it could pick a random column and place a piece there. Can you do this in an object-oriented way, so there is a ComputerPlayer class?
4. Want something ambitious? Try to build another game using OOP! Here are some ideas to get you started:
    * Checkers
    * Othello