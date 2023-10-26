"use client";

import TypewriterComponent from "typewriter-effect";

type Props = {};
const TypewriterTitle = (props: Props) => {
  return (
    <TypewriterComponent
      options={{
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("Supercharge your productivity! 🚀")
          .pauseFor(1000)
          .deleteAll()
          .typeString("AI Powered Insights 🤖")
          .start();
      }}
    />
  );
};
export default TypewriterTitle;
