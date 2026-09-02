import "./index.css";

const BusinessCard = ({ business }) => {
  const {
    name,
    category,
    description,
    phone,
    location,
    services,
    workingHours,
  } = business;

  return (
    <li className="business-card">
      <div className="business-card-header">
        <h2>{name}</h2>
        <span>{category}</span>
      </div>

      <p className="business-description">{description}</p>

      <div className="business-info">
        <p>
          <strong>📍 Location:</strong> {location}
        </p>

        <p>
          <strong>🕐 Working Hours:</strong> {workingHours}
        </p>

        <div className="business-phone">
          <strong>📞 Phone:</strong>
          {phone.map((number) => (
            <a key={number} href={`tel:${number}`}>
              {number}
            </a>
          ))}
        </div>
      </div>

      <div className="business-services">
        <strong>Services</strong>

        <div className="service-list">
          {services.map((service) => (
            <span key={service}>{service}</span>
          ))}
        </div>
      </div>
    </li>
  );
};

export default BusinessCard;
