import "./MeaningCard.css";

function MeaningCard() {
  return (
    <section className="meaning-section">

      <h2>Why COTEPS?</h2>

      <div className="meaning-grid">

        <div className="card-box">
          <h3>C</h3>
          <p>Choice</p>
        </div>

        <div className="card-box">
          <h3>O</h3>
          <p>Order</p>
        </div>

        <div className="card-box">
          <h3>T</h3>
          <p>Take</p>
        </div>

        <div className="card-box">
          <h3>E</h3>
          <p>Energy</p>
        </div>

        <div className="card-box">
          <h3>P</h3>
          <p>Protein</p>
        </div>

        <div className="card-box">
          <h3>S</h3>
          <p>Satisfaction</p>
        </div>

      </div>

    </section>
  );
}

export default MeaningCard;