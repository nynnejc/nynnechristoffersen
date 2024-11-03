import React from "react";
import Navbar from "./components/Navbar";

export default function About() {
  return (
    <body className="flex flex-col sm:flex-row min-h-screen  bg-powder_kc selection:bg-pink-300">
      <div className="sm:order-2">
        <Navbar />
      </div>
      <main className="flex-grow sm:order-1">
        <div className="custom-font-dauphine leading-10 sm:mx-4 mx-6 sm:w-5/6 my-4">
          <p className="text-3xl sm:text-5xl">
            Hi I&apos;m Nynne Just Christoffersen and this is my blog. I am a
            software developer, teacher, writer and occasional podcaster with
            too many hobbies.
          </p>

          <p className="mt-6 text-3xl sm:text-5xl">
            I created this blog to share my writing. Happy to hear about the
            cool project you&apos;ve made or any ideas you want to share. You
            can{" "}
            <a
              href="mailto:nynnejc@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration font-mono text-red_kc hover:linkunderline"
            >
              email
            </a>{" "}
            me. I have a{" "}
            <a
              href="./"
              className="underline decoration font-mono text-red_kc hover:linkunderline"
            >
              newsletter
            </a>
            . Find me on{" "}
            <a
              href="https://github.com/nynnejc"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration font-mono text-red_kc hover:linkunderline"
            >
              Github
            </a>{" "}
            or see you in{" "}
            <a
              href="https://helvede.net/@nynne"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration font-mono text-red_kc hover:linkunderline"
            >
              hell
            </a>
            .
          </p>
          <p className="mt-6 text-3xl sm:text-5xl">
            I built this MD template blog myself with React, Next and Typescript
            and also made a CD pipeline for it on Github. Someday I&apos;ll
            write a post about how I did it! All the visual design was made by{" "}
            <a
              href="https://www.instagram.com/annekatrineraahede/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration font-mono text-red_kc hover:linkunderline"
            >AK</a>.
          </p>
        </div>
      </main>
    </body>
  );
}
