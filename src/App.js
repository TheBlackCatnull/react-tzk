import "./App.css";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import useDraggable from "./useDraggable";
const list = [
  {
    src: img1,
    title: "万事屋找我",
  },
  {
    title: "吃吃吃……",
    src: img2,
  },
  {
    title: "赛博朋克",
    src: img1,
  },
  {
    title: "爱大大大",
    src: img2,
  },
  {
    title: "汪汪",
    src: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=968093909,4033932240&fm=26&gp=0.jpg",
  },
];
function App() {
  return (
    <div className="App">
      <Draggablelist list={list} />
    </div>
  );
}

function Card({ src, title }) {
  return (
    <div className="card">
      <img src={src} alt="123" />
      <span>{title}</span>
    </div>
  );
}
function cls(def, ...conditions) {
  const list = [def];
  conditions.forEach((cond) => {
    if (cond[0]) {
      list.push(cond[1]);
    }
  });
  return list.join(" ");
}
function Draggablelist({ list }) {
  const { dragList, createDraggerProps, createDropperProps } =
    useDraggable(list);
  // console.log(dragList);
  return dragList.map((item, i) => {
    if (item.type === "BAR") {
      return <Bar id={i} {...createDropperProps(i)} key={item.id} />;
    } else {
      return (
        <Draggable {...createDraggerProps(i, item.id)}>
          <Card {...item.data} />;
        </Draggable>
      );
    }
  });
}
function Bar({ id, dragging, dragOver, eventHandlers }) {
  if (id === dragging + 1) {
    return null;
  }
  console.log(dragOver, id);
  return (
    <div
      {...eventHandlers}
      className={cls("draggable--bar", [dragOver === id, "dragover"])}
    >
      <div
        className="inner"
        style={{
          height: dragOver === id ? "80px" : "0px",
        }}
      ></div>
    </div>
  );
}
function Draggable({ children, eventHandlers, dragging, id }) {
  // console.log(dragging, id);
  return (
    <div
      {...eventHandlers}
      draggable={true}
      className={cls("draggable", [dragging === id, "dragging"])}
    >
      {children}
    </div>
  );
}

export default App;
