// @ts-nocheck
import React from "react";
import f3 from "family-chart";
import "./family-chart.css";
import { db } from "../../firebase";
import { query, collection, getDocs } from "firebase/firestore";
export default class FamilyTree extends React.Component {
  cont = React.createRef();

  async componentDidMount() {
    if (!this.cont.current) return;
    const p = query(collection(db, "data"));
    const newDoc = await getDocs(p);
    const res = newDoc.docs[0].data(); 
    sessionStorage.setItem("chart", res.chart); 
    const store = f3.createStore({
        data: JSON.parse(res.chart),
        node_separation: 250,
        level_separation: 150,
      }),
      view = f3.d3AnimationView({
        store,
        cont: document.querySelector("#FamilyChart"),
      }),
      Card = f3.elements.Card({
        store,
        svg: view.svg,
        card_dim: {
          w: 220,
          h: 80,
          text_x: 75,
          text_y: 15,
          img_w: 60,
          img_h: 65,
          img_x: 5,
          img_y: 6,
        },
        card_display: [
          (d) => `${d.data["first name"] || ""} ${d.data["last name"] || ""}`,
          (d) => `${d.data["birthday"] || ""}`,
          (d) => `${d.data["location"] || ""}`,
          (d) => `${d.data["phonenumber"] || ""}`,
        ],
        mini_tree: true,
        link_break: false,
      });
    view.setCard(Card);
    store.setOnUpdate((props) => view.update(props || {}));
    store.update.tree({ initial: true });

  }

  render() {
    return <div className='f3' id='FamilyChart' ref={this.cont}></div>;
  }
}
