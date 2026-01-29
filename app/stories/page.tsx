
import {
    AmpStoryPage, AmpHeader,
    AmpParagraph,
    AmpStory,
    AmpStoryGridLayer,
    AmpQuote, AmpSource, AmpStoryBookend, AmpVideo,
    AmpImg
} from "@/components/react-google-stories/google-stories-comp";

export default function MoralStory() {
  return (
    <AmpStory
      title="The Power of One Honest Choice"
      publisher="Human Talking"
      publisher-logo-src="/logo.png"
      poster-portrait-src="/poster.png"
      standalone="true"
    >

      {/* PAGE 1 — INTRO */}
      <AmpStoryPage id="page-1">
        <AmpStoryGridLayer template="vertical">
          <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-slate-900 to-slate-800 text-white absolute top-0 h-full -z-10">

            <h1 className="text-4xl font-bold text-center mb-6 animate-fade-in">
              One Choice
            </h1>

            <p className="text-lg text-center max-w-xl animate-slide-up">
              Every day, life quietly asks us a question.
              <br />
              Will you choose what is easy…
              <br />
              or what is right?
            </p>

          </div>
        </AmpStoryGridLayer>
      </AmpStoryPage>

      {/* PAGE 2 — STRUGGLE */}
      <AmpStoryPage id="page-2">
        <AmpStoryGridLayer   template="vertical">
          <div className="min-h-screen flex flex-col justify-center items-center  bg-gradient-to-b from-amber-100 to-amber-50 text-slate-900 absolute top-0 h-full -z-10">
          </div>

            <h2 className="text-3xl font-semibold mb-4 animate-fade-in">
              The Struggle
            </h2>

            <p className="text-base leading-relaxed animate-slide-left">
              A shortcut appeared.
              <br /><br />
              No one was watching.
              <br />
              No one would know.
              <br /><br />
              But deep inside, something felt heavy.
            </p>

            <q className="mt-10 italic text-xl text-slate-700 animate-slide-right">
              “Doing wrong is easy when silence protects you.”
            </q>

        </AmpStoryGridLayer>
      </AmpStoryPage>

      {/* PAGE 3 — DECISION */}
      <AmpStoryPage id="page-3">
        <AmpStoryGridLayer template="vertical">
          <div className="min-h-screen flex flex-col justify-center bg-gradient-to-b from-blue-900 to-blue-700 text-white absolute top-0 h-full -z-10">

            <h2 className="text-3xl font-semibold mb-6 animate-fade-in">
              The Moment of Truth
            </h2>

            <p className="text-base leading-relaxed animate-slide-up">
              Fear whispered:
              <br />
              “Take the easy way.”
              <br /><br />
              Conscience replied:
              <br />
              “Live with yourself tomorrow.”
            </p>

          </div>
        </AmpStoryGridLayer>
      </AmpStoryPage>

      {/* PAGE 4 — RESULT */}
      <AmpStoryPage id="page-4">
        <AmpStoryGridLayer template="vertical">
          <div className="min-h-screen flex flex-col justify-center bg-gradient-to-b from-emerald-100 to-emerald-50 text-slate-900 absolute top-0 h-full -z-10">

            <h2 className="text-3xl font-semibold mb-4 animate-fade-in">
              The Outcome
            </h2>

            <p className="text-base leading-relaxed animate-slide-left">
              The honest choice felt hard.
              <br /><br />
              It cost comfort.
              <br />
              It cost approval.
              <br /><br />
              But it gave peace.
            </p>

            <q className="mt-8 text-xl font-medium text-emerald-800 animate-slide-up">
              Integrity always pays — quietly.
            </q>

          </div>
        </AmpStoryGridLayer>
      </AmpStoryPage>

      {/* PAGE 5 — MORAL */}
      <AmpStoryPage id="page-5">
        <AmpStoryGridLayer template="vertical">
          <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black to-slate-900 text-white absolute top-0 h-full -z-10">

            <h2 className="text-4xl font-bold text-center mb-6 animate-fade-in">
              The Moral
            </h2>

            <p className="text-lg text-center max-w-xl animate-slide-up">
              Your life is built
              <br />
              not by big moments,
              <br />
              but by small honest decisions.
              <br /><br />
              Choose wisely.
            </p>

          </div>
        </AmpStoryGridLayer>
      </AmpStoryPage>

    </AmpStory>
  );
}

