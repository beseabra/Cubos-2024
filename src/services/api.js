import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWUzOTJmYmU2OTBkZTE3ZjcxNDA1N2U1MWE5NWE0NiIsInN1YiI6IjY1MjhiYjA5ZmQ2MzAwNWQ3YjI4NzNlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TNaAIbcE57SuxaXNespxe4wUswhkfxMt-FPjrJNDHy0";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
