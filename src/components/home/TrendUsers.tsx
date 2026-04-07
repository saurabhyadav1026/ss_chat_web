import TrendUser from "../people/trending/TrendUser";
import "./trendUsers.css";

const TrendUsers = () => {
  return (
    <div className="trend-container scrollbar-only-rod">
      <div className="trend-header">
        <div>
          <h3 className="trend-title">Trending People</h3>
          <p className="trend-copy">A visual preview of the kind of profile cards and discovery space your refreshed app now supports.</p>
        </div>
        <span className="trend-pill">Community</span>
      </div>

      <div className="trend-grid">
        {Array.from({ length: 5 }).map((_, index) => (
          <TrendUser key={index} />
        ))}
      </div>
    </div>
  );
};

export default TrendUsers;
