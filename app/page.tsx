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
  { name: "Gregorio, Herminio IV", email: "hlgregorio@up.edu.ph" },
  { name: "Libiran, Kyle David", email: "kglibiran@up.edu.ph" },
  { name: "Manguan, Ayen Unice", email: "ammanguan@up.edu.ph" },
];

export default async function Index() {
  return (
    <>
      <NavBar hasLogin={true} />
      <div className="flex w-full flex-1 flex-row items-center justify-center">
        <div className="flex w-1/3 flex-row justify-end">
          <Image
            src="/img/illus-landing-page.svg"
            alt="Woman carrying a box"
            width={300}
            height={500}
          />
        </div>
        <div className="flex w-2/3 flex-col items-center justify-start pr-16">
          <h1>Streamline your business operations with AIMS.</h1>
          <h3>
            Keep track of products, know when to restock, know when to order
            more, and know when products will expire.
          </h3>
        </div>
      </div>
      <footer className="mt-auto flex h-28 w-full items-center justify-evenly gap-5 border-t">
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
    </>
  );
}
