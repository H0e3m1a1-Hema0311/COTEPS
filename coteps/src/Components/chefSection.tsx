import "./ChefSection.css";

function ChefSection() {
  return (
    <section className="chef-section">

      <div className="chef-left">
        <div className="chef-image">
          👨‍🍳
        </div>
      </div>

      <div className="chef-right">

        <span className="chef-tag">
          Meet Your Chef
        </span>

        <h2>Chef Cote</h2>

        <p>
          Welcome to COTEPS! I'm Chef Cote.
          Every meal here is prepared to give you
          taste, energy and satisfaction.
        </p>

        <div className="chef-features">

          <div className="feature">
            🍽️ Fresh Ingredients
          </div>

          <div className="feature">
            ⚡ Fast Delivery
          </div>

          <div className="feature">
            💪 Protein Rich Choices
          </div>

          <div className="feature">
            😊 Customer Happiness
          </div>

        </div>

      </div>

    </section>
  );
}

export default ChefSection;