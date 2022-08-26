import {
  Card,
  Image,
  Text,
  Center,
  createStyles,
  keyframes,
} from "@mantine/core";
import "../index.css";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import {
  startNavigationProgress,
  resetNavigationProgress,
  NavigationProgress,
} from "@mantine/nprogress";

const PokemonCardData = ({
  id,
  name,
  image,
  types,
  stats,
  weight,
  height,
  abilities,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <ReactCardFlip
      isFlipped={isFlipped}
      flipDirection="horizontal"
      flipSpeedBackToFront={0.5}
    >
      {/*------------------------------------CARD FRONT------------------------------------------------------*/}
      <Card
        className={`card-container ${types[0].type.name}`}
        style={{ textAlign: "center", color: "black" }}
        onClick={() => setIsFlipped((prev) => !prev)}
      >
        <Card.Section>
          <h1>{id + " " + name.toUpperCase().slice(0, 1) + name.slice(1)}</h1>
          <Center>
            <Image src={image.front_default} width={200} fit="contain" />
          </Center>
        </Card.Section>
        <Card.Section withBorder>
          <Text style={{ textDecoration: "underline", fontWeight: "bold" }}>
            Type
          </Text>
          {types.map(
            (i) =>
              " | " +
              (i.type.name.toUpperCase().slice(0, 1) + i.type.name.slice(1)) +
              " | "
          )}
          <br />
          <Text style={{ textDecoration: "underline", fontWeight: "bold" }}>
            Abilities
          </Text>
          {abilities.map(
            (i) =>
              " | " +
              (i.ability.name.toUpperCase().slice(0, 1) +
                i.ability.name.slice(1)) +
              "  "
          )}
        </Card.Section>
      </Card>
      {/*------------------------------------CARD BACK------------------------------------------------------*/}
      <Card
        className={`card-container2 ${types[0].type.name}`}
        style={{ textAlign: "center", color: "black" }}
        onClick={() => setIsFlipped((prev) => !prev)}
      >
        <Card.Section>
          <h1>{id + " " + name.toUpperCase().slice(0, 1) + name.slice(1)}</h1>{" "}
          <Center>
            <Image src={image.front_shiny} width={200} fit="contain" />
          </Center>
          <Text style={{ textDecoration: "underline", fontWeight: "bold" }}>
            Shiny Form
          </Text>
        </Card.Section>
        <Card.Section withBorder inheritPadding="xs">
          <Text style={{ textDecoration: "underline", fontWeight: "bold" }}>
            Base Stats
          </Text>
          <NavigationProgress />
          HP: {stats[0].base_stat} Atk: {stats[1].base_stat} Def:{" "}
          {stats[2].base_stat}
          <br />
          Sp. Atk: {stats[3].base_stat} Sp. Def: {stats[4].base_stat} Spd:{" "}
          {stats[5].base_stat}
          <br />
        </Card.Section>
      </Card>
    </ReactCardFlip>
  );
};

export default PokemonCardData;
