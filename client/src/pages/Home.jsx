import BannerProduct from "../components/BannerProduct";
import CategoryList from "../components/CategoryList";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryList></CategoryList>
      <BannerProduct></BannerProduct>

      <HorizontalCardProduct
        category={"earphones"}
        heading={`Popular Earphones`}
      ></HorizontalCardProduct>
      <HorizontalCardProduct
        category={"watches"}
        heading={`Smart Watches`}
      ></HorizontalCardProduct>

      <VerticalCardProduct
        category={"mobiles"}
        heading={`Mobiles`}
      ></VerticalCardProduct>
      <VerticalCardProduct
        category={"Mouse"}
        heading={`Mouse`}
      ></VerticalCardProduct>
      <VerticalCardProduct
        category={"televisions"}
        heading={`Televisions`}
      ></VerticalCardProduct>
      <VerticalCardProduct
        category={"camera"}
        heading={`Camera and Photography`}
      ></VerticalCardProduct>
       <VerticalCardProduct
        category={"airpodes"}
        heading={`Airpodes`}
      ></VerticalCardProduct>
       <VerticalCardProduct
        category={"speakers"}
        heading={`Speakers`}
      ></VerticalCardProduct>
       <VerticalCardProduct
        category={"refrigerator"}
        heading={`Refrigerator`}
      ></VerticalCardProduct>
       <VerticalCardProduct
        category={"trimmers"}
        heading={`Trimmers`}
      ></VerticalCardProduct>
       <VerticalCardProduct
        category={"Mouse"}
        heading={`Mouse`}
      ></VerticalCardProduct>
    </div>
  );
};

export default Home;
