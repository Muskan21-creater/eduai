import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LearningPaths from "./components/LearningPaths";
import LearningPlanner from "./components/LearningPlanner";
import {
  HowItWorks,
  Features,
  WhyEduai,
  BuiltForFuture,
  CTASection,
  Footer,
} from "./components/Sections";
import SignInModal from "./components/SignInModal";

import { scrollToId } from "./lib/utils";

export default function App() {
  const [prefill, setPrefill] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);

  const pick = (p) => {
    setPrefill({
      goal: p.example,
      n: Date.now(),
    });

    scrollToId("planner");
  };

  return (
    <>
      <Navbar onSignIn={() => setShowSignIn(true)} />

      <main>
        <Hero />
        <HowItWorks />
        <LearningPaths onPick={pick} />
        <LearningPlanner prefill={prefill} />
        <Features />
        <WhyEduai />
        <BuiltForFuture />
        <CTASection />
      </main>

      <Footer />

      {showSignIn && (
        <SignInModal
          onClose={() => setShowSignIn(false)}
        />
      )}
    </>
  );
}