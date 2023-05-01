import { useState, useRef, useEffect } from "react";
import control from "./assets/control.png";
import { Stage, Layer, Image, Text } from "react-konva";

function loadLayout(stageRef) {
  const savedLayout = localStorage.getItem("myLayout");
  if (savedLayout) {
    const layout = JSON.parse(savedLayout);
    stageRef.current.setAttrs(layout.attrs);
    stageRef.current.children.forEach((child, index) => {
      child.setAttrs(layout.children[index].attrs);
    });
  }
}

function App() {
  const [open, setOpen] = useState(true);
  const [image, setImage] = useState(null);
  const [imageScale, setImageScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [text, setText] = useState("");
  const [textSize, setTextSize] = useState(20);
  const [fontFamily, setFontFamily] = useState("Arial");

  const stageRef = useRef(null);

    useEffect(() => {
      loadLayout(stageRef);
    }, []);

  function handleImageLoad(event) {
    setImage(event.target);
  }

  function handleImageScaleChange(event) {
    setImageScale(parseFloat(event.target.value));
  }

  function handleRotationChange(event) {
    setRotation(parseFloat(event.target.value));
  }

  function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        setImage(img);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  function handleTextChange(event) {
    setText(event.target.value);
  }

  function handleTextSizeChange(event) {
    setTextSize(event.target.value);
  }

  const handleFontFamilyChange = (event) => {
    setFontFamily(event.target.value);
  };

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } duration-300 h-screen bg-dark-purple p-5 relative`}
      >
        <img
          src={control}
          className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-dark-purple ${
            !open && "rotate-180"
          }`}
          alt="button"
          onClick={() => setOpen(!open)}
        />
        <div>
          <label className="block font-medium text-gray-700">
            Upload Your Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-slate-500 mb-4
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
            />
          </label>
          <label>
            Text:
            <input
              type="text"
              value={text}
              onChange={handleTextChange}
              className="block w-full text-sm text-slate-500 mb-4
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100"
            />
          </label>
          {text && (
            <>
              <label>
                Text Size:
                <input
                  type="number"
                  min="8px"
                  max="80px"
                  step="1px"
                  value={textSize}
                  onChange={handleTextSizeChange}
                />
              </label>
              <label>
                Font Family:
                <select value={fontFamily} onChange={handleFontFamilyChange}>
                  <option value="Arial">Arial</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Comic Sans MS">Comic Sans MS</option>
                </select>
              </label>
            </>
          )}
          {image && (
            <>
              <div>
                <label>
                  Image Scale:
                  <input
                    type="range"
                    min="0.1"
                    max="10"
                    step="0.1"
                    value={imageScale}
                    onChange={handleImageScaleChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Rotation:
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={rotation}
                    onChange={handleRotationChange}
                  />
                </label>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="p-7 text-2xl font-semibold flex-1 h-scren">
        <h1 className="text-center">Image Editor</h1>
        <div className="min-h-[80%] min-w-[80%] bg-slate-200">
          <Stage ref={stageRef} width={700} height={700}>
            <Layer>
              <Image
                image={image}
                onLoad={handleImageLoad}
                scaleX={imageScale}
                scaleY={imageScale}
                rotation={rotation}
              />
              <Text
                draggable
                text={text}
                fontSize={textSize}
                fontFamily={fontFamily}
              />
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
}

export default App;
