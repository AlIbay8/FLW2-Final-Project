function FavoritesOption(props) {
  if (props.choice !== undefined) {
    return <div className="imageOption" onClick={props.handleClick}>
      <h4>{props.choice.title}</h4>
      <p>{props.choice.name}</p>
      <img src={props.choice.image} alt="character" />
    </div>
  }
}

export default FavoritesOption;