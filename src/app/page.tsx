"use client";

import Link from "next/link";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import "./style.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import dashboardScreenShot from "../images/dashboardScreenShot.png";
import Image from "next/image";

export default function LandingPage() {

  const steps = [
    {
      number: 1,
      title: "Entrez le numéro de téléphone de votre client",
      description: "Démarrez le processus en saisissant les informations du client pour l'inviter à donner son avis.",
      videoSrc: "/videos/step1.mp4",
    },
    {
      number: 2,
      title: "Votre client reçoit un lien sécurisé",
      description: "Un SMS personnalisé est envoyé directement au client, lui permettant de se rendre facilement sur le site.",
      videoSrc: "/videos/step2.mp4",
    },
    {
      number: 3,
      title: "Votre client donne son avis en quelques secondes",
      description: "Sur la page dédiée, le client peut évaluer sa prestation et laisser un commentaire, en toute simplicité.",
      videoSrc: "/videos/step3.mp4",
    },
    {
      number: 4,
      title: "Votre carte de visite est mise à jour",
      description: "La note est automatiquement ajoutée à votre carte de visite en ligne, prête à être partagée.",
      videoSrc: "/videos/step4.mp4",
    },
    {
      number: 5,
      title: "Partagez votre carte de visite et gagnez en visibilité",
      description: "Boostez votre visibilité en partageant votre carte de visite, incluant les avis, sur TikTok, Instagram, et bien plus encore.",
      videoSrc: "/videos/step5.mp4",
    },
  ];

  return (
    <div className="w-full min-h-screen ">
      <div className="w-full mx-auto flex flex-col items-center py-16 px-6 space-y-10">

        <div className="text-center ">
          <p className="text-5xl font-bold mb-2">
            Vos clients, vos avis, vos succès !
          </p>
          <p className="text-xl font-light ">
            Gérez et partagez vos avis clients en toute simplicité avec
            <span className="inline bg-gradient-to-r from-[#5b28ea] to-[#d6809e] bg-clip-text text-transparent"> PrestaBook !</span>
          </p>
        </div>
        <div className="">
          <Link href={'/register'} className="font-bold bg-[#5B29EA] text-white px-4 py-3 rounded inline-flex items-center">
            Démarrez gratuitement
            <ArrowRightIcon className="ml-2 w-5 h-5" />
          </Link>
        </div>

        <Image
          src={dashboardScreenShot}
          alt="dashboard"
          width={800}
          height={400}
          className="rounded-lg shadow-2xl hover:scale-110 transition-transform duration-250"
        />
      </div>

      {/* Carrousel des étapes */}
      <div className=" w-full bg-[#fAfAfA] flex flex-col items-center py-4">
        <h2 className="text-3xl font-bold text-gray-800 py-10 text-center">Comment ça marche ?</h2>
        <div className="w-[70%]   flex  items-center  ">
          <ChevronLeftIcon className="swiper-button-prev cursor-pointer " />
          <Swiper
            centeredSlides={true}
            speed={500}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            slidesPerView={3}
            pagination={{ clickable: true, bulletActiveClass: 'swiper-custom-bullet-active' }}
            modules={[Navigation, Pagination]}

            className="w-full h-[400px] "
          >
            {steps.map((step, index) => (
              <SwiperSlide key={index} className="flex flex-col items-center">
                <Step {...step} />
              </SwiperSlide>
            ))}
          </Swiper>
          <ChevronRightIcon className="swiper-button-next cursor-pointer " />

        </div>
      </div>

      {/* Section footer */}

      <div className="w-full my-10 flex">

        <Link href={'/register'} className="font-bold bg-[#5B29EA] text-white px-4 py-3 rounded inline-flex items-center mx-auto">
          Démarrez gratuitement
          <ArrowRightIcon className="ml-2 w-5 h-5" />
        </Link>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600">Rejoignez la communauté des professionnels qui utilisent PrestaBook !</p>
        <p className="text-gray-500 mt-2">© 2024 PrestaBook. Tous droits réservés.</p>
      </div>
    </div >
  );
}

// Composant pour chaque étape
function Step({ number, title, description, videoSrc }: { number: number, title: string, description: string, videoSrc: string }) {
  return (
    <div className="h-[350px] p-4 bg-transparent shadow-xl rounded-lg text-center  flex flex-col items-center space-y-4  ">
      <span className="text-4xl font-semibold text-[#5B29EA]">{number}.</span>
      <h3 className="text-2xl font-semibold text-gray-700">{title}</h3>
      {/** <video src={videoSrc} autoPlay loop muted className="rounded-lg shadow-md w-full h-36 object-cover" />
    */} </div>
  );
}
