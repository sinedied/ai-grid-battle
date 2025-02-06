# ai-grid-battle

## 4-Bot Grid Domination Battle Simulation Framework

### Setup
- **Grid Size:** 10x10.
- **Obstacles:**
  - Place **6 obstacles** randomly on the grid.
  - Obstacles are impassable; bots must navigate around them.
- **Bots:** 4 AI-generated bots. Each bot starts at a random position on the grid.

### Game Rules
1. **Turns:**
   - Each bot moves once per turn.
   - Movement: Up, down, left, or right (no diagonals).

2. **Claiming Cells:**
   - Moving onto a cell claims it permanently for the bot.

3. **Collisions:**
   - If two bots try to move to the same cell, they stay in their current positions and lose that turn.

4. **Points:**
   - +1 point for each claimed cell.
   - +5 points for claiming any corner cell.

5. **Bonus Power-Up:**
   - A **double-points bonus** spawns at the grid's center (5,5) during the final 5 turns.
   - A bot earns **2 points per claimed cell** for 5 turns if it reaches the bonus first.

6. **Game Length:**
   - 50 turns.

### Strategy Opportunities
- **Obstacles:** Bots must pathfind strategically to maximize claims while avoiding wasted moves.
- **Bonus Timing:** Bots may choose to prioritize regular claims or make a risky dash for the double-points bonus.

### Instructions to Run the Simulation
1. Clone the repository:
   ```sh
   git clone https://github.com/sinedied/ai-grid-battle.git
   cd ai-grid-battle
   ```

2. Open `index.html` in a web browser to run the simulation.

### Technologies Used
- Plain HTML/CSS
- TypeScript
