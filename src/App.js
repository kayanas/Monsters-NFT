import { useState, useEffect } from "react";
import "./App.css";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((resp) => resp.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">MONSTERS LAB</h1>

      <SearchBox
        className="monsters-search-box"
        placeholder="Which one?"
        onChangeHandler={onSearchChange}
      />

      <CardList monsters={filteredMonsters} />
    </div>
  );
}

// USING CLASS COMPONENTS // EXPLAINING FOR MYSELF

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: "",
//     };
//   }

// componentDidMount() {
//   fetch("https://jsonplaceholder.typicode.com/users")
//     .then((resp) => resp.json())
//     .then((users) =>
//       this.setState(() => {
//         return { monsters: users };
//       })
//     );
// }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return { searchField };
//     });
//   };

//   render() {
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;
//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">
//         <h1 className="app-title">MONSTERS</h1>
//         <SearchBox
//           onChangeHandler={onSearchChange}
//           className="monsters-search-box"
//           placeholder="What are you looking for?"
//         />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
