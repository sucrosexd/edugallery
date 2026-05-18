export default function ImageCard({ image }) {
  return (
    <div className="img-card">
      <img src={image.src} alt={image.title} />
      <div className="img-info">
        <div className="text-wrapper">
          <p className="name-works">{image.title}</p>
          <p className="number">{image.year}</p>
        </div>
        <div className="extra-info">
          <p className="artist-name">{image.artist}</p>
          <p className="description">{image.location}</p>
        </div>
      </div>
    </div>
  )
}