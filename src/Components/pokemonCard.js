import { Card, Image, Text } from "@mantine/core";
import "../index.css";

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
  return (
    <Card
      shadow="sm"
      className={`card-container ${types[0].type.name}`}
      style={{ textAlign: "center", color: "black" }}
    >
      <Card.Section>
        <h1>
          {id + " "}
          {name.toUpperCase().slice(0, 1) + name.slice(1)}
        </h1>{" "}
      </Card.Section>
      <Card.Section>
        <Image
          src={image.front_default}
          radius="md"
          height={200}
          fit="contain"
        ></Image>
      </Card.Section>
      <Card.Section withBorder inheritPadding="xs">
        <Text style={{ textDecoration: "underline", fontWeight: "bold" }}>
          Base Stats
        </Text>
        HP: {stats[0].base_stat} Atk: {stats[1].base_stat} Def:{" "}
        {stats[2].base_stat}
        <br />
        Sp. Atk: {stats[3].base_stat} Sp. Def: {stats[4].base_stat} Spd:{" "}
        {stats[5].base_stat}
        <br />
      </Card.Section>
      <Card.Section>
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
        <br />
        {/* Weight: {weight / 10} {"kg || "} {((weight / 10) * 2.205).toFixed(1)}{" "}
        {"lb"}
        <br />
        Height: {height / 10} {"m || "} {((weight / 10) * 3.281).toFixed(1)}{" "}
        {"ft"} */}
        <br />
      </Card.Section>
    </Card>
  );
};

export default PokemonCardData;
