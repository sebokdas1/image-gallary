import { useState } from "react";
// import { Inter } from "next/font/google";
import Image1 from "../assets/image-1.webp";
import Image2 from "../assets/image-2.webp";
import Image3 from "../assets/image-3.webp";
import Image4 from "../assets/image-4.webp";
import Image5 from "../assets/image-5.webp";
import Image6 from "../assets/image-6.webp";
import Image7 from "../assets/image-7.webp";
import Image8 from "../assets/image-8.webp";
import Image9 from "../assets/image-9.webp";
import Image10 from "../assets/image-10.jpeg";
import Image11 from "../assets/image-11.jpeg";
// import Image from "next/image";

// const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const images = [
    { id: 1, thumbnail: `${Image1}` },
    { id: 2, thumbnail: `${Image2}` },
    { id: 3, thumbnail: `${Image3}` },
    { id: 4, thumbnail: `${Image4}` },
    { id: 5, thumbnail: `${Image5}` },
    { id: 6, thumbnail: `${Image6}` },
    { id: 7, thumbnail: `${Image7}` },
    { id: 8, thumbnail: `${Image8}` },
    { id: 9, thumbnail: `${Image9}` },
    { id: 10, thumbnail: `${Image10}` },
    { id: 11, thumbnail: `${Image11}` },
  ];
  //   const Image = images;
  const [selectThumbnails, setSelectThumbnails] = useState([]);
  const [thumbnails, setThumbnails] = useState(images);
  const [dragging, setDragging] = useState(false);
  const [draggedImage, setDraggedImage] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Handle new images
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;

    const newImages = Array.from(selectedFiles).map((file, index) => {
      const id = thumbnails.length + index + 1;
      const thumbnail = URL.createObjectURL(file);

      return { id, thumbnail };
    });

    setThumbnails([...thumbnails, ...newImages]);
  };

  // delete items
  const handleDeleteClick = () => {
    const updatedImages = thumbnails.filter(
      (image) => !selectThumbnails.some((selected) => selected.id === image.id)
    );

    setThumbnails(updatedImages);
    setSelectThumbnails([]);
  };

  // drag start
  const handleDragStart = (image) => {
    setDragging(true);
    setDraggedImage(image);
  };

  // drag Over
  const handleDragOver = (e) => {
    e.preventDefault();
    e?.target?.children[0]?.alt && setDraggedIndex(e?.target?.children[0]?.alt);
  };

  //  drop image
  const handleDrop = (targetIndex) => {
    setDragging(false);

    if (draggedImage) {
      const updatedImages = thumbnails.filter(
        (image) => image.id !== draggedImage.id
      );
      updatedImages.splice(targetIndex, 0, draggedImage);

      setThumbnails(updatedImages);
      setDraggedImage(null);
    }
  };

  return (
    <main
      className={`min-h-screen w-screen flex flex-row items-center justify-center md:p-0 p-4 `}
    >
      <section className="lg:w-1/2 md:w-3/4 w-full bg-white rounded-lg shadow">
        <div className="flex flex-col gap-y-2">
          <nav className="py-4 px-6">
            <article className="flex flex-row justify-between items-center">
              <h1 className="text-2xl font-bold">
                {selectThumbnails.length === 0 ? (
                  "Gallery"
                ) : (
                  <label
                    htmlFor="select"
                    className="flex flex-row justify-between items-center gap-x-4"
                  >
                    <input
                      type="checkbox"
                      name="select"
                      id="select"
                      checked={selectThumbnails.length > 0}
                      className="h-5 w-5 accent-blue-500 cursor-pointer"
                      onChange={() => setSelectThumbnails([])}
                    />
                    {selectThumbnails.length} Files Selected
                  </label>
                )}
              </h1>
              <button
                className="text-red-500 font-medium"
                onClick={handleDeleteClick}
              >
                Delete files
              </button>
            </article>
          </nav>
          <hr />
          <section className="h-full w-full p-6">
            <div
              className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-6"
              onDragOver={handleDragOver}
            >
              {thumbnails.map((image, index) => (
                <div
                  key={index}
                  className={
                    "group relative before:content-[''] before:absolute before:h-full before:w-full before:rounded-lg before:transition-colors before:cursor-move" +
                    (index === 0
                      ? " md:col-span-2 md:row-span-2"
                      : " col-span-1") +
                    (selectThumbnails.find((photo) => photo.id === image.id)
                      ? " opacity-100"
                      : " hover:before:bg-black/50")
                  }
                  draggable={true}
                  onDragStart={() => handleDragStart(image)}
                  onDrop={() => handleDrop(index)}
                >
                  <img
                    src={image.thumbnail}
                    alt={image.id}
                    height={index === 0 ? 390 : 184}
                    width={index === 0 ? 390 : 184}
                    className={
                      "h-full w-full max-w-full rounded-lg object-contain border-2" +
                      " " +
                      (selectThumbnails.find(
                        (photo) => photo.id === image.id
                      ) && "opacity-70")
                    }
                  />
                  <input
                    type="checkbox"
                    name={image.id}
                    id={image.id}
                    className={
                      "absolute top-4 left-4 h-5 w-5 accent-blue-500 group-hover:opacity-100 transition-opacity delay-100 duration-100 ease-linear cursor-pointer" +
                      " " +
                      (selectThumbnails.find((photo) => photo.id === image.id)
                        ? "opacity-100"
                        : "opacity-0")
                    }
                    checked={
                      selectThumbnails.find((photo) => photo.id === image.id)
                        ? true
                        : false
                    }
                    onChange={() => {
                      if (
                        selectThumbnails.find((photo) => photo.id === image.id)
                      )
                        setSelectThumbnails(
                          selectThumbnails.filter(
                            (photo) => photo.id !== image.id
                          )
                        );
                      else setSelectThumbnails([...selectThumbnails, image]);
                    }}
                  />
                  {dragging && Number(draggedIndex) === Number(image.id) && (
                    <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center bg-white border-2 border-dashed rounded-lg">
                      Drop Here
                    </div>
                  )}
                </div>
              ))}

              <div className="relative border-2 border-dashed rounded-lg p-4 hover:bg-gray-50 transition-colors ease-linear">
                <input
                  type="file"
                  multiple
                  name="images"
                  id="images"
                  className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
                  title="Try to upload photos..."
                  onChange={handleFileChange}
                />
                <div className="h-full w-full flex flex-col justify-center items-center gap-y-4">
                  <Image
                    src="../assets/placeholder.png"
                    alt="placeholder"
                    height={20}
                    width={20}
                    priority
                  />
                  <span className="whitespace-nowrap">Add Images</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Home;
