//Styling
import "./Session.scss";

const Session = ({name, description}) => {
  return (
    <div className="session">
        <h3 className="session__name">{name}</h3>
        <p className="session__description">{description}</p>
    </div>
  )
}

export default Session