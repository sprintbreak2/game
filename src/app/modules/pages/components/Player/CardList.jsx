import React from "react";

export default class CardList extends React.Component {
  render() {
    const { white_cards, handleOnChange, selectedItem } = this.props;
    //console.log("Selected Item:",selectedItem)
    return (
      <div>
        {white_cards.map(el => (
          <div key={el.id}>
            <label>
              <input type="radio" value={el.id} onChange={handleOnChange} checked={selectedItem == el.id} /> {el.content}
            </label>
            <br />
          </div>
        ))}
      </div>
    );
  }
};  