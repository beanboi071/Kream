import Image from "next/image";
import Link from 'next/link';
import Header from "./components/layout/Header";
import Hero from "./components/layout/Hero";
import HomeMenu from "./components/layout/HomeMenu";
import SectionHeader from "./components/layout/SectionHeader";
export default function Home() {
  return (
    <>
    <Hero/>
    <HomeMenu/>
    <section className="text-center flex flex-col items-center py-8">
<SectionHeader mainHeader="About us" subHeader="Our Story"/>
<div className="my-8 w-3/4">
  
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis consectetur esse ullam ut optio at, iure veritatis? Reiciendis dolores perspiciatis mollitia eum officia. Expedita officia laborum earum pariatur omnis quisquam! Voluptates dolore fugit architecto, quas provident dolorem eum quidem sequi, eaque fugiat voluptatem quaerat ex maiores quam cum aliquid deleniti?</p>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint et deleniti ullam, ipsam consequatur illo voluptatum! Sapiente quos consequatur provident officia minus totam similique, minima excepturi atque ullam. Ullam, aspernatur?</p>

</div>
    </section>
    <section className="text-center flex flex-col items-center py-8">
<SectionHeader mainHeader="Contact Us" subHeader="Don't Hesitate"/>
<div className="my-8 w-3/4">
 <a className="text-3xl underline text-gray-700" href="tel:+9779840515030">+977 9840515030</a>
</div>
    </section>
    
    </>
  );
}
