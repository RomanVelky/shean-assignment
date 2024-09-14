import { useState } from "react";
import { Helmet } from "react-helmet";
import "./MicroSite.css";
import title from "../assets/title.png";
import sheepImage from "../assets/sheep.png";
import { Mail } from "lucide-react";

const MicroSite = () => {
  const generateRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 7; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  const [email, setEmail] = useState("");
  const [code] = useState(generateRandomCode());
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!email) {
      alert("Email je povinný!");
      return;
    }
    setShowModal(true);
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: "Narozeniny",
            startDate: "2023-10-15",
            description: "Vyžádejte si svůj dárek zadáním vašeho e-mailu.",
            image: sheepImage,
            url: "https://shean-assignment.netlify.app/",
            location: {
              "@type": "Place",
              name: "Místo události",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Bezručova 2297/2",
                addressLocality: "Blansko 1",
                postalCode: "678 01",
                addressCountry: "CZ",
              },
            },
            organizer: {
              "@type": "Organization",
              name: "Shean",
              url: "https://www.shean.cz/",
            },
          })}
        </script>
      </Helmet>
      <div className="border-4 rounded-3xl">
        <div className="overflow-hidden rounded-3xl">
          <div className="app-background">
            <main className="flex xl:flex-row flex-col">
              <section className="form-container">
                <header className="title">
                  <h1 className="sr-only">Narozeniny</h1>
                  <img src={title} alt="Narozeniny" />
                </header>
                <div className="xl:pl-6 flex">
                  <div>
                    <article aria-labelledby="event-description">
                      <div
                        id="event-description"
                        className="text-slate-400 py-8 xl:pr-24 text-center xl:text-left">
                        <p>
                          <b>Slavíme 15. let!</b> Vyzvedněte si od nás dárek,
                          který vám vykouzlí úsměv na tváři. Po zadání e-mailu
                          se vám ozveme a domluvíme se společne, jak váš dárek
                          budete chtít využít.
                        </p>
                      </div>
                    </article>
                    <form
                      onSubmit={handleSubmit}
                      className="pt-4"
                      aria-labelledby="gift-form">
                      <fieldset>
                        <legend id="gift-form" className="sr-only">
                          Formulář pro získání dárku
                        </legend>
                        <div className="flex gap-2 items-center flex-col xl:flex-row text-center xl:text-left">
                          <label
                            className="text-slate-400 pb-2 w-36"
                            htmlFor="gift-code">
                            Váš dárkový kód je
                          </label>
                          <input
                            id="gift-code"
                            className="font-bold text-center rounded-none xl:w-80"
                            type="text"
                            value={code}
                            readOnly
                          />
                        </div>
                        <div className="flex gap-2 items-center flex-col xl:flex-row text-center xl:text-left">
                          <label
                            className="text-slate-400 pb-2 w-36"
                            htmlFor="email-input">
                            Vyplňte e-mail
                          </label>
                          <div className="email-input-container">
                            <Mail className="email-icon" />
                            <input
                              id="email-input"
                              className="xl:w-80"
                              type="email"
                              placeholder="vas@email.cz"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              aria-required="true"
                            />
                          </div>
                        </div>
                        <div className="flex pt-4 justify-center xl:justify-start">
                          <button className="px-8 rounded-full" type="submit">
                            ZÍSKAT DÁREK
                          </button>
                        </div>
                      </fieldset>
                    </form>
                    <footer className="text-slate-400 text-xs pt-6 text-center xl:text-left">
                      <p>Ochrana osobních údajů je pro nás prioritou.</p>
                      <p>
                        Více informací, jak zacházíme s vašimi daty, najdete v{" "}
                        <a
                          className="underline text-yellow-500"
                          href="https://www.shean.cz/zpracovani-osobnich-udaju/"
                          target="_blank"
                          rel="noopener noreferrer">
                          tomto dokumentu
                        </a>
                        .
                      </p>
                    </footer>
                  </div>
                  <div className="xl:hidden hidden lg:block absolute translate-x-[32rem] translate-y-[9rem]">
                    <img
                      src={sheepImage}
                      alt="Sheep"
                      className="sheep-image xl:w-fit w-60"
                    />
                  </div>
                </div>
                {showModal && (
                  <Modal
                    email={email}
                    code={code}
                    onClose={() => setShowModal(false)}
                  />
                )}
              </section>
              <section
                className="xl:flex xl:justify-end lg:hidden flex justify-center"
                aria-labelledby="sheep-image-container">
                <h2 id="sheep-image-container" className="sr-only">
                  Obrázek ovce pro oslavu 15 let
                </h2>
                <img
                  src={sheepImage}
                  alt="Sheep"
                  className={`sheep-image xl:w-fit w-60 ${
                    showModal ? "opacity-50" : ""
                  }`}
                />
              </section>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

// Modal component
interface ModalProps {
  email: string;
  code: string;
  onClose: () => void;
}

const Modal = ({ email, code, onClose }: ModalProps) => (
  <div
    className="modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title">
    <div className="modal-content">
      <p>Kód: {code}</p>
      <p>Email: {email}</p>
      <button onClick={onClose}>Zavřít</button>
    </div>
  </div>
);

export default MicroSite;
