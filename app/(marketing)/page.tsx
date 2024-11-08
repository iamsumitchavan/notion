import Footer from "./_component/footer";
import Heading from "./_component/heading";
import Heroes from "./_component/heroes";

const marketingPage = () => {
  return (
    <>
      <div className="flex flex-col items-center  min-h-full">
        <div className="flex flex-col items-center justify-center md:justify-start flex-1 text-center">
          <Heading />
          <Heroes />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default marketingPage;
