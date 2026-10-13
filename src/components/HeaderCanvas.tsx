import type { Photo } from '../types'

const UNSPLASH_UTM = '?utm_source=scrimba_degree&utm_medium=referral'

type HeaderCanvasProps = {
  photo: Photo
}

export function HeaderCanvas({ photo }: HeaderCanvasProps) {
  return (
    <div className="header-canvas">
      <img
        className="header-canvas__image"
        src={photo.urls.regular}
        alt={`Landscape photo by ${photo.user.name}`}
      />
      <div className="header-canvas__overlay" aria-hidden="true" />
      <div className="crop-border" aria-hidden="true" />
      <ProfileCard />
      <PhotoCredits photo={photo} />
    </div>
  )
}

function ProfileCard() {
  return (
    <section className="profile-card" aria-label="Profile preview">
      <p className="profile-label">Available for opportunities</p>
      <h2 className="profile-card__name">Suhail</h2>
      <h2 className="profile-card__name">Khalil</h2>
      <div className="divider" />
      <p className="profile-card__role">Full Stack Engineer</p>
      <p className="profile-card__contact">suhail142176@gmail.com</p>
      <p className="profile-card__contact">+966 54 677 3975</p>
    </section>
  )
}

function PhotoCredits({ photo }: HeaderCanvasProps) {
  return (
    <footer className="photo-credits">
      Photo by <a href={`${photo.user.links.html}${UNSPLASH_UTM}`}>{photo.user.name}</a>
      {' on '}
      <a href={`https://unsplash.com${UNSPLASH_UTM}`}>Unsplash</a>
    </footer>
  )
}
