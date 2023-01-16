import Home from "components/home";

function HomePage() {
  // @ts-expect-error Server Component
  return <Home></Home>;
}

export default HomePage;
