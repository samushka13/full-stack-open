import Homepage from "./homepage.mdx";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full bg-white p-10 mx-auto min-h-screen max-w-2xl justify-center">
        <div className="markdown">
          <Homepage />
        </div>
      </div>
    </div>
  );
};

export default Home;
