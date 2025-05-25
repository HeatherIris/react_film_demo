import { useParams } from "react-router-dom";

export default function ConcertCity() {
  const { city } = useParams();
  return <h2>Concerts in {city}</h2>;
}
