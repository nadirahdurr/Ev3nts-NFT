import React, { useState, useRef, useEffect,useContext } from "react";
import Transition from "../utils/Transition";
import { HashLink as Link } from "react-router-hash-link";
// import { TransactionContext } from "../context/TransactionContext";
// import MintErrorBanner from "../components/MintErrorBanner";

function HeaderMint({}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [top, setTop] = useState(true)
  // const { error } = useContext(TransactionContext);

  const trigger = useRef(null);
  const mobileNav = useRef(null);

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!mobileNav.current || !trigger.current) return;
      if (
        !mobileNavOpen ||
        mobileNav.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setMobileNavOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header className="absolute w-full z-30 md:fixed bg-[#02a346] ">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 ">
        <div className="flex items-center justify-between h-16 md:h-20 ">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            <Link
              to="/"
              className="font-kalam text-2xl font-bold text-black transition duration-150 ease-in-out"
              aria-label="0xSocialClub"
            >
              0xSocialClub
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow  ">
            {/* Desktop menu links */}

            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center text-sm uppercase font-josefin ">
              <li
                className="font-medium text-black  py-2 hover:text-zinc-700
            flex items-center transition duration-150 ease-in-out "
              >
                <a
                  href=""
                  target="_blank"
                >
                  Discord
                </a>
              </li>
              <li className="font-medium  text-black hover:text-zinc-700 px-3 py-2 transition duration-150 ease-in-out">
                <a href="" target="_blank">
                  Twitter
                </a>
              </li>
              <li className="font-medium  text-black hover:text-zinc-700  transition duration-150 ease-in-out">
                <a href="" target="_blank">
                  Smart Contract
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile menu */}
          <div className="flex md:hidden  ">
            {/* Hamburger button */}
            <button
              ref={trigger}
              className={`hamburger ${mobileNavOpen && "active"}`}
              aria-controls="mobile-nav"
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              <span className="sr-only">Menu</span>
              <svg
                className="w-6 h-6 fill-current text-black"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="4" width="24" height="2" />
                <rect y="11" width="24" height="2" />
                <rect y="18" width="24" height="2" />
              </svg>{" "}
            </button>

            {/*Mobile navigation */}
            <div ref={mobileNav}>
              <Transition
                show={mobileNavOpen}
                tag="nav"
                id="mobile-nav"
                className="absolute top-full z-20 left-0 w-full overflow-scroll bg-[#02a346] flex justify-center"
                enter="transition ease-out duration-200 transform"
                enterStart="opacity-0 -translate-y-2"
                enterEnd="opacity-100 translate-y-0"
                leave="transition ease-out duration-200"
                leaveStart="opacity-100"
                leaveEnd="opacity-0"
              >
                <ul className="px-5 py-2 font-josefin text-center uppercase ">
                  <li>
                    <a
                      href=""
                      target="_blank"
                    >
                      Discord
                    </a>
                  </li>
                  <li className="font-medium  text-black hover:text-zinc-700 px-3 py-2 transition duration-150 ease-in-out">
                    <a href="" target="_blank">
                      Twitter
                    </a>
                  </li>
                  <li className="font-medium  text-black hover:text-zinc-700  transition duration-150 ease-in-out">
                    <a href="" target="_blank">
                      Smart Contract
                    </a>
                  </li>
                </ul>
              </Transition>
            </div>
          </div>
        </div>
      </div>
      {/* {error ? <MintErrorBanner /> : ""} */}
    </header>
  );
}

export default HeaderMint;
