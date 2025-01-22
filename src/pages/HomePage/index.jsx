import Header from "../../components/layout/Header";
import RestoMainContent from "../../components/RestoMainContent";

const HomePage = () => {
  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <Header>
        <h1 className="max-w-lg mx-auto text-3xl font-bold md:text-4xl">
          Selamat Datang di Resto Finder!
        </h1>
        <p className="max-w-md mx-auto md:text-lg text-slate-200">
          Website ini merupakan aplikasi pencarian restoran terbaik yang berada
          di Indonesia. Silahkan cari restoran favoritmu di sini!
        </p>
      </Header>

      <RestoMainContent />
    </div>
  );
};

export default HomePage;
