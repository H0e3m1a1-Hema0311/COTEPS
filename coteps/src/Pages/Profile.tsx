import "./Profile.css";

function Profile() {
  return (
    <div className="profile-page">

      <div className="profile-header">

        <img
          src="https://i.pravatar.cc/180"
          alt="Profile"
          className="profile-image"
        />

        <h1>Hemalatha 👋</h1>

        <p>Food Explorer • Level 5</p>

      </div>

      <div className="profile-grid">

        <div className="profile-card">
          <h2>🪙 Coins</h2>
          <h1>450</h1>
        </div>

        <div className="profile-card">
          <h2>⭐ XP</h2>
          <h1>1850</h1>
        </div>

        <div className="profile-card">
          <h2>❤️ Wishlist</h2>
          <h1>12</h1>
        </div>

        <div className="profile-card">
          <h2>📦 Orders</h2>
          <h1>38</h1>
        </div>

      </div>

      <div className="recent-orders">

        <h2>Recent Orders</h2>

        <table>

          <thead>

            <tr>
              <th>Order ID</th>
              <th>Food</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            <tr>
              <td>#COT1201</td>
              <td>Chicken Burger</td>
              <td>₹299</td>
              <td>Delivered ✅</td>
            </tr>

            <tr>
              <td>#COT1202</td>
              <td>Pizza Combo</td>
              <td>₹499</td>
              <td>Delivered ✅</td>
            </tr>

            <tr>
              <td>#COT1203</td>
              <td>Grilled Chicken</td>
              <td>₹399</td>
              <td>Preparing 👨‍🍳</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Profile;