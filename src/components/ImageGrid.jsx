import ImageCard from './ImageCard'

export default function ImageGrid({ images }) {
  return (
    <div className="img-container">
      {images.map(img => (
        <ImageCard key={img.id} image={img} />
      ))}
    </div>
  )
}