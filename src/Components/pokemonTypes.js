import { useState, useEffect } from "react";
import { Menu, Button, Box } from "@mantine/core";
import { IconRainbow } from "@tabler/icons";
import axios from "axios";
function PokemonTypes() {
  const [types, setTypes] = useState([
    "Normal",
    "Fire",
    "Water",
    "Grass",
    "Flying",
    "Fighting",
    "Poison",
    "Electric",
    "Ground",
    "Rock",
    "Psychic",
    "Ice",
    "Bug",
    "Ghost",
    "Steel",
    "Dragon",
    "Dark",
    "Fairy",
  ]);
  const [pColors, setpColors] = useState([
    "White",
    "red",
    "Aqua",
    "Green",
    "Beige",
    "Coral",
    "Orchid",
    "Yellow",
    "Sienna",
    "Brown",
    "Fuchsia",
    "DeepSkyBlue",
    "GreenYellow",
    "MediumPurple",
    "Silver",
    "CornflowerBlue",
    "Gray",
    "HotPink",
  ]);
  const [pokeType, setPokeType] = useState([]);
  const [pokeTypeList, setPokeTypeList] = useState([]);
  const [pokeData, setPokeData] = useState([]);
  const mergeArr = () => {
    setPokeType(
      types.map((item, index) => ({ typing: item, pokeColors: pColors[index] }))
    );
  };

  const buttonType = async (props) => {
    await axios
      .get(`https://pokeapi.co/api/v2/type/${props.typing.toLowerCase()}`)
      .then((response) => {
        const res = response.data.pokemon;
        // console.log(`Button Type: ${props.typing.toLowerCase()}`, res);
        setPokeTypeList(res);
        console.log("p t l", pokeTypeList);
        console.log("Page Data", res.data.pokemon);
      });
  };
  // useEffect(
  //   () => async (pokeTypeList) => {
  //     pokeTypeList.forEach(async (item) => {
  //       console.log(item)
  //       const res = await axios.get(item.url);
  //       setPokeData((prevState) => [...prevState, res.data]);
  //     });
  //     console.log("Poke Data Set", pokeData);
  //   },
  //   [pokeTypeList, pokeData]
  // );

  const menuItems = pokeType.map((item, index) => (
    <Button.Group
      sx={() => ({
        padding: "1%",
      })}
      key={index}
    >
      <Button
        compact
        fullWidth
        variant="outline"
        style={{
          border: "solid 1.5px",
          // background: item.pokeColors,
          background: `linear-gradient(${item.pokeColors}, rgb(212, 182, 182))`,
          opacity: 1,
          color: "black",
        }}
        onClick={() => buttonType(item)}
      >
        {item.typing}
      </Button>
    </Button.Group>
  ));

  return (
    <Menu shadow="md" width={225} transition="scale-y" transitionDuration={100}>
      <Menu.Target>
        <Button
          className="navButton1"
          fullWidth
          rightIcon={<IconRainbow size={20} />}
          variant="outline"
          style={{ borderColor: "black", color: "black" }}
          onClick={mergeArr}
        >
          Types
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Pokemon Types</Menu.Label>
        <Button.Group orientation="vertical">{menuItems}</Button.Group>
      </Menu.Dropdown>
    </Menu>
  );
}

export default PokemonTypes;
