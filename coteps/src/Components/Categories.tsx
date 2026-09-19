import "./Categories.css";

const categories = [
  {
    id: 1,
    emoji: "🍔",
    title: "Burgers",
    desc: "Juicy & Delicious"
  },
  {
    id: 2,
    emoji: "🍕",
    title: "Pizza",
    desc: "Cheesy Happiness"
  },
  {
    id: 3,
    emoji: "🍗",
    title: "Chicken",
    desc: "Protein Power"
  },
  {
    id: 4,
    emoji: "🥗",
    title: "Healthy",
    desc: "Fresh Choices"
  },
  {
    id: 5,
    emoji: "🥤",
    title: "Drinks",
    desc: "Stay Refreshed"
  },
  {
    id: 6,
    emoji: "🍰",
    title: "Desserts",
    desc: "Sweet Ending"
  }
];

function Categories() {
  return (
    <section className="categories">

      <h5>Browse Categories</h5>

      <h2>Choose Your Favorite</h2>

      <div className="category-grid">

        {categories.map((item) => (
          <div className="category-card" key={item.id}>

            <div className="icon">
              {item.emoji}
            </div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Categories;