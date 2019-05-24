import React from 'react'
import styles from './styles'
import { addFavorite, deleteFavorite } from 'src/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as hollowHeart } from '@fortawesome/free-regular-svg-icons'

const EditButton = ({ onClick }) => <button onClick={onClick}>Edit</button>

const handleFavoriteClick = (isFavorite, player, onFavorited) => () => {
  const action = isFavorite
    ? () => deleteFavorite(player.id)
    : () => addFavorite(player)
  action().then(result => {
    onFavorited()
  })
}

const Card = props => {
  return (
    <div style={{ ...styles.container, ...props.style }}>
      <div style={props.small ? { display: 'none' } : styles.buttons}>
        <EditButton onClick={props.onEdit} />
        <FontAwesomeIcon
          icon={props.isFavorite ? solidHeart : hollowHeart}
          onClick={handleFavoriteClick(
            props.isFavorite,
            props.player,
            props.onFavorited
          )}
        />
      </div>
      <h3 style={styles.name}>{props.player.name}</h3>
      <span>{props.player.position}</span>
      <img
        onError={e => {
          e.target.onerror = null
          e.target.src =
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'
        }}
        src={`http://localhost:3008/${props.player.image}`}
        style={props.small ? styles.smallPlayerImage : styles.playerImage}
        alt='player_image'
      />
      <div>{props.player.team}</div>
    </div>
  )
}

export default Card
