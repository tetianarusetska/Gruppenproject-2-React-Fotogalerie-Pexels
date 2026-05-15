export default function ImageContainer({ imageSource }) {
    return (
        <div className="shrink-0">
            <img
                className="h-[85vh] w-[60vh] object-contain"
                src={imageSource}
                alt="carousel image"
            />
        </div>
    );
}