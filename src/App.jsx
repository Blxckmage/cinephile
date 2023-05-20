import {
  Box,
  Container,
  Text,
  Input,
  SimpleGrid,
  useColorMode,
  Switch,
  Badge,
  Image,
} from "@chakra-ui/react";
import { StarIcon, CalendarIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { getMoviesList, searchMovie } from "./services/api";
import { motion } from "framer-motion";

function App() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getMoviesList().then((result) => {
      setPopularMovies(result);
      setIsLoading(false);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/500x750?text=No+poster+available";
              }}
            />
            <Box p="6">
              <Box d="flex" alignItems="baseline">
                <Badge borderRadius="full" px="2" colorScheme="teal">
                  <StarIcon mr="1" /> {movie.vote_average}
                </Badge>
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  ml="2"
                  display="flex"
                  alignItems="center"
                >
                  <CalendarIcon mr="1" /> {movie.release_date}
                </Box>
              </Box>

              <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                {movie.title}
              </Box>
            </Box>
          </Box>
        </motion.div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 3) {
      setIsLoading(true);
      const query = await searchMovie(q);
      setPopularMovies(query.results);
      setIsLoading(false);
      console.log({ query: query });
    }
  };

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg={colorMode === "dark" ? "gray.900" : "gray.100"} minHeight="100vh">
      <Container
        maxW="container.lg"
        py={6}
        bg={colorMode === "dark" ? "gray.800" : "white"}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={6}
        >
          <Text
            fontSize="4xl"
            fontWeight="bold"
            color={colorMode === "dark" ? "white" : "purple.500"}
          >
            Cinephile
          </Text>
          <Switch isChecked={colorMode === "dark"} onChange={toggleColorMode} />
        </Box>
        <Input
          placeholder="Search movies..."
          size="lg"
          mb={6}
          color={colorMode === "dark" ? "white" : "gray.800"}
          bg={colorMode === "dark" ? "gray.700" : "white"}
          onChange={({ target }) => search(target.value)}
        />
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          <PopularMovieList />
        </SimpleGrid>
        <Box mt={10} textAlign="center">
          <Text
            fontSize="sm"
            color={colorMode === "dark" ? "gray.400" : "gray.600"}
          >
            &copy; Blxckmage 2023. All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
