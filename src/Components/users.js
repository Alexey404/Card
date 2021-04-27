import React from "react";
import Card from "./Card";
import "./user.css";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }
  componentDidMount() {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          isLoaded: true,
          items: result,
        }),
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          };
      });
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <p>Error </p>;
    } else if (!isLoaded) {
      return <p>Loading... </p>;
    } else {
      return (
        <div className="Container">
          {items.map((item) => (
            <div>
              <Card key={item.id} name={item.name} />
            </div>
          ))}
        </div>
      );
    }
  }
}
export default Form;
