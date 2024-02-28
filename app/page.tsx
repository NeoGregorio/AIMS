import Image from "next/image";
import NavBar from "../components/NavBar";

type PersonProps = {
  name: string;
  email: string;
};

const Person = ({ name, email }: PersonProps) => (
  <div>
    <span className="text-lg">{name}</span>
    <br></br>
    <span className="text-[100]">{email}</span>
  </div>
);

const people = [
  { name: 'Gregorio, Herminio IV', email: 'hlgregorio@up.edu.ph' },
  { name: 'Libiran, Kyle David', email: 'kglibiran@up.edu.ph' },
  { name: 'Manguan, Ayen Unice', email: 'ammanguan@up.edu.ph' },
];

export default async function Index() {
  return (
    <>
    <NavBar hasLogin={true}/>
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <div className="flex px-60 gap-10">
        <Image
          src="/img/illus-landing-page.svg"
          alt="Woman carrying a box"
          width={300}
          height={500}
        />
        <div className="flex flex-col justify-center items-center">
          <h1>Streamline your business operations with AIMS.</h1>
          <h3>
            Keep track of products, know when to restock, know when to order more,
            and know when products will expire.
          </h3>
        </div>
      </div>
      <footer className="w-full h-28 flex justify-evenly items-center border-t mt-auto gap-5">
        <span>Contact us!</span>
        <div className="flex gap-10">
          {people.map((person, index) => (
            <Person key={index} name={person.name} email={person.email} />
          ))}
        </div>
        <div className="w-[200px]">
          <span>This is a web app developed for CS 192.</span>
        </div>
      </footer>
    </div>
    </>
  );
}
