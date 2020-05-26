import React from "react";
import "./routeBoard.css";
export default function RouteBoard(props) {
  function elem(address, index) {
    console.log(address);

    return (
      <a
        class="list-group-item list-group-item-action"
        id="list-home-list"
        data-toggle="list"
        role="tab"
        href="#"
        aria-controls={address}
        onClick={() => props.handleAddressClick(index)}
      >
        {address}
      </a>
    );
  }
  const boardRow = () => {
    let result = [];
    let index = 0;
    if (props.route.origin) {
      result.push(elem(props.route.origin, index++));
    }

    props.route.waypoints.map((address) => {
      return result.push(elem(address, index++));
    });

    if (props.route.destination) {
      result.push(elem(props.route.destination, index++));
    }

    return result;
  };

  return (
    <div class="list-group" id="list-tab" role="tablist">
      {boardRow()}
    </div>
  );
}
