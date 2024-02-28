import Image from "next/image";
import NavBar from "../components/NavBar";

type PersonProps = {
  name: string;
  email: string;
};

const Person = ({ name, email }: PersonProps) => (
  <div className="flex flex-col">
    <span className="text-base leading-4">{name}</span>
    <span className="text-[13px] text-graysubtitle">{email}</span>
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
      <div className="flex w-full flex-1 flex-row items-center justify-center flex-wrap">
        <div className="relative w-1/4 h-[500px]">
          <Image
            src="/img/illus-landing-page.svg"
            alt="Woman carrying a box"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="flex flex-col justify-start max-w-[650px] leading-[3rem] gap-5">
          <h1>
            Streamline your business operations with
            <span className="font-bold text-purple"> AIMS</span>.
          </h1>
          <div className="w-2/3">
            <h3>
              Keep track of products, know when to restock, know when to order
              more, and know when products will expire.
            </h3>
          </div>
        </div>
      </div>
      <footer className="bg-gray mt-auto flex flex-row min-h-24 w-full items-center justify-center gap-20 border-t">
        <span className="text-[23px] border-l-[6px] border-purple leading-6 pl-4">
          Contact us!
        </span>
        <div className="flex gap-9 flex-wrap">
          {people.map((person, index) => (
            <Person key={index} name={person.name} email={person.email} />
          ))}
        </div>
        <div className="w-[200px] leading-3 text-xs text-graysubtitle flex gap-2">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#6C63FF"
              className="w-5 h-5"
            >
              <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
              <path
                fill-rule="evenodd"
                d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.163 3.75A.75.75 0 0 1 10 12h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <p>This is a web app developed for CS 191/192.</p>
        </div>
      </footer>
    </>
  );
}
