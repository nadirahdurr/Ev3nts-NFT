import React, { useState } from "react";

import HeroImage from "../images/0xNumbers.jpeg";

function HeroHome() {

  return (
    <section className="relative" id="0xsocialclub">
      <div
        className="absolute saturate-150 
        inset-0 bg-black pointer-events-none -z-10 [clip-path:polygon(0_0,_5760px_0,_5760px_calc(100%_-_352px),_0_100%)]"
        aria-hidden="true"
      ></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 ">
        <div className="pt-32 pb-20 md:pt-40 md:pb-44">
          {/* Hero content */}
          <div className=" pt-10  max-w-xl mx-auto md:max-w-none md:flex justify-center  md:items-center md:space-x-8 lg:space-x-16 xl:space-x-20 space-y-16 md:space-y-0">
            {/* Content */}
            <div className="text-center " data-aos="fade-right">
              <h1 className="md:ml-5 lg:text-5xl text-4xl font-bold text-[#f0d50a] mb-4 uppercase">
                {" "}
                Welcome to the
              </h1>
              <h1 className="lg:text-5xl text-4xl font-bold text-[#f0d50a] mb-4">
                {" "}
                0xSOCIALCLUB
              </h1>
              <p className="lg:text-xl text-md text-slate-100 mb-5 font-bold uppercase">
                Making NFTs fun again and creating <br /> opportunities for
                everyone to win.
              </p>

              <div>
                {/* <Link className="btn text-white bg-slate-700 hover:bg-slate-800 w-full" to="#0">Explore Product</Link> */}
              </div>
            </div>

            {/* Hero image */}
            <div data-aos="fade-left">
              {/* Image */}
              <div className="flex justify-center items-center">
                <div className="relative">
                  <div
                    className="absolute inset-0 pointer-events-none mt-3 ml-3 translate-x-4 translate-y-4"
                    aria-hidden="true"
                  ></div>
                  <img
                    className="saturate-100 md:mr-5 md:ml-5 shadow-lg shadow-yellow-500 border-2 border-black rounded-full  mx-auto md:mt-10 mb-10 md:max-w-none lg:w-[430px] md:w-[305px] lg:h-[430px] h-[305px]"
                    src={HeroImage}
                    alt="Hero"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroHome;
