import "./Rewards.css";

function Rewards() {
  return (
    <section className="rewards">

      <h2>🏆 COTEPS Rewards</h2>

      <p>
        Every order earns XP and Coins. Unlock new badges and exciting rewards!
      </p>

      <div className="reward-grid">

        <div className="reward-card">
          <h3>⭐ XP Points</h3>
          <h1>1250</h1>
          <p>Current Experience</p>
        </div>

        <div className="reward-card">
          <h3>🪙 Coins</h3>
          <h1>350</h1>
          <p>Available Coins</p>
        </div>

        <div className="reward-card">
          <h3>🔥 Streak</h3>
          <h1>7 Days</h1>
          <p>Keep Ordering</p>
        </div>

        <div className="reward-card">
          <h3>🏅 Badge</h3>
          <h1>Food Explorer</h1>
          <p>Level 3</p>
        </div>

      </div>

    </section>
  );
}

export default Rewards;