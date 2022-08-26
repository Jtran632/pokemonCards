import "./App.css";
import { useState, useEffect } from "react";
import {
  AppShell,
  Navbar,
  Header,
  ScrollArea,
  MediaQuery,
  Burger,
  SimpleGrid,
  Button,
  Pagination,
} from "@mantine/core";

import { IconPokeball } from "@tabler/icons";
import PokemonTypes from "./pokemonTypes";
import axios from "axios";
import PokemonCardData from "./pokemonCard";

function App() {
  const [opened, setOpened] = useState(false);
  const [pkmPage, setPkmPage] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
  );
  const [pokeData, setPokeData] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);

  function nextPageClick() {
    if (nextPage === 0) {
      setPrevPage(nextPage + 1);
      setNextPage(prevPage + 1);
      return;
    } else {
      setPrevPage(prevPage + 1);
      setNextPage(nextPage + 1);
      console.log("Next Page URL", pkmPage);
      console.log("Next Page", nextPage);
      console.log("Prev Page", prevPage);
      setPokeData([]);
      setPkmPage(
        `https://pokeapi.co/api/v2/pokemon?offset=${20 * nextPage}&limit=20`
      );
    }
  }

  function prevPageClick() {
    if (prevPage === -1) {
      setPrevPage(nextPage + 1);
      setNextPage(prevPage + 1);
      return;
    } else {
      setNextPage(nextPage - 1);
      setPrevPage(prevPage - 1);
      console.log("Prev Page URL", pkmPage);
      console.log("Next Page", nextPage);
      console.log("Prev Page", prevPage);
      setPokeData([]);
      setPkmPage(
        `https://pokeapi.co/api/v2/pokemon?offset=${20 * prevPage}&limit=20`
      );
    }
  }

  function getPokemonData(prop) {
    prop.map(async (item) => {
      const res = await axios.get(item.url);
      setPokeData((prevState) => [...prevState, res.data]);
    });
  }

  useEffect(
    () => async () => {
      const res = await axios.get(pkmPage);
      console.log("Pokemon Page Fetch", res);
      console.log("Pokemon Data", res.data.results);

      getPokemonData(res.data.results);
    },
    [pkmPage]
  );

  return (
    <div className="appShellBody">
      <AppShell
        navbarOffsetBreakpoint="sm"
        navbar={
          <Navbar
            className="appShellBody"
            p={"md"}
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ base: 225 }}
          >
            <Navbar.Section>{<PokemonTypes />}</Navbar.Section>
            <Navbar.Section>
              <Button
                className="navButton1"
                variant="outline"
                style={{ borderColor: "black", color: "black" }}
                fullWidth
                onClick={() =>nextPageClick()}
              >
                Next
              </Button>

              <Button
                className="navButton1"
                variant="outline"
                style={{ borderColor: "black", color: "black" }}
                fullWidth
                onClick={() => prevPageClick()}
              >
                Prev
              </Button>
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Header height={80} className="appShellHeader">
            <div
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <MediaQuery>
                <Burger
                  transitionDuration={500}
                  size={30}
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  color="white"
                  mr="xs"
                  aria-label="Open navigation"
                />
              </MediaQuery>
              <IconPokeball size={60} color="red" fill={"white"} />
            </div>
          </Header>
        }
      >
        <ScrollArea.Autosize
          maxHeight={"100%"}
          style={{ paddingLeft: 120, paddingRight: 120 }}
        >
          <SimpleGrid cols={3} spacing="lg">
            {pokeData.map((items, index) => (
              <PokemonCardData
                key={index}
                id={items.id}
                name={items.name}
                image={items.sprites.other.dream_world.front_default}
                types={items.types}
                stats={items.stats}
                weight={items.weight}
                height={items.height}
                abilities={items.abilities}
              />
            ))}
          </SimpleGrid>
        </ScrollArea.Autosize>
      </AppShell>
    </div>
  );
}

export default App;
