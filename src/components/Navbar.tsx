import union from "../assets/images/Union.svg";
import icon from "../assets/images/Feather Icons.svg";
import custom from "../assets/images/Custom svg.svg";
import images from "../assets/images/image1.png";
const Navbar = () => {
  return (
    <div className=" mt-5 border-b-1 pb-3">
      <div className="container w-[95%] mx-auto flex justify-between">
        <div className="flex gap-2">
          <img src={union} alt="Avatar" className="w-[27px] h-[]27px" />
          <h1 className="text-2xl font-semibold">Noventer</h1>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search"
            className="border-1 py-1 px-4  rounded-2xl w-[400px] h-[32px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <img src={icon} alt="Icom" className="w-[20px] h-[20px]" />
          <img src={custom} alt="custom" className="w-[20px] h-[20px]" />
          <img
            src={images}
            alt="Avatar"
            className="rounded-4xl w-[40px] h-[40px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
