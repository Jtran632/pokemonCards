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

import { IconPokeball, IconArrowLeft, IconArrowRight } from "@tabler/icons";
import PokemonTypes from "./pokemonTypes";
import axios from "axios";
import PokemonCardData from "./pokemonCard";

function App() {
  const [opened, setOpened] = useState(false);

  const [curPage, setCurPage] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
  );
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();

  const [pokemonURLS, setPokemonURLS] = useState([]);
  const [pokeData, setPokeData] = useState([]);

  function PageClick(data) {
    console.log(data);
    if (!data.length === 0) {
    } else {
      setPokeData([]);
      setCurPage(data);
    }
  }

  function setPokemonData(prop) {
    prop.map((item) =>
      axios.get(item).then((res) => {
        setPokeData((prevState) => [...prevState, res.data]);
      })
    );
  }

  useEffect(() => {
    axios.get(curPage).then((res) => {
      console.log(res.data);
      setNextPage(res.data.next);
      setPrevPage(res.data.previous);
      setPokemonURLS(res.data.results.map((item) => item.url));
    });
  }, [curPage]);

  useEffect(() => {
    setPokemonData(pokemonURLS);
  }, [pokemonURLS]);

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
              <br />
              {nextPage && (
                <Button
                  rightIcon={<IconArrowRight size={20} />}
                  className="navButton1"
                  variant="outline"
                  style={{ borderColor: "black", color: "black" }}
                  fullWidth
                  onClick={() => PageClick(nextPage)}
                >
                  Next
                </Button>
              )}
              <br />
              {prevPage && (
                <Button
                  leftIcon={<IconArrowLeft size={20} />}
                  className="navButton1"
                  variant="outline"
                  style={{ borderColor: "black", color: "black" }}
                  fullWidth
                  onClick={() => PageClick(prevPage)}
                >
                  Prev
                </Button>
              )}
            </Navbar.Section>
          </Navbar>
        }
        // header={
        //   <Header height={80} className="appShellHeader">
        //     <div
        //       style={{ display: "flex", alignItems: "center", height: "100%" }}
        //     >
        //       <MediaQuery>
        //         <Burger
        //           transitionDuration={500}
        //           size={30}
        //           opened={opened}
        //           onClick={() => setOpened((o) => !o)}
        //           color="white"
        //           mr="xs"
        //           aria-label="Open navigation"
        //         />
        //       </MediaQuery>
        //       <IconPokeball size={60} color="red" fill={"white"} />
        //     </div>
        //   </Header>
        // }
      >
        <ScrollArea.Autosize
          maxHeight={"100%"}
          style={{ paddingLeft: 120, paddingRight: 120 }}
        >
          <SimpleGrid cols={3} spacing="lg">
            {pokeData
              .sort((a, b) => a.id - b.id)
              .map((items, index) => (
                <PokemonCardData
                  key={index}
                  id={items.id}
                  name={items.name}
                  image={items.sprites}
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
