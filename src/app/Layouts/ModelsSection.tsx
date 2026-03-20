import img1 from '../../../assets/icons/Zero STT.png'
import img2 from '../../../assets/icons/Zero Med.png'
import img3 from '../../../assets/icons/Zero TTS.png'
import img4 from '../../../assets/icons/Zero Mind.png'

export default function ModelsSection() {

  const models = [
    {
      title: "Foundation Models",
      subtitle: " ",
      badge: "Available now",
      badgeColor: "bg-green-500/20 text-green-300",
      description: "State-of-the-art speech models from multilingual transcription to medical-grade precision and ultra-natural synthesis.",
      img: img1,
      url: 'zero-stt'
    },
    {
      title: "Voice Agents",
      subtitle: " ",
      badge: "Available now",
      badgeColor: "bg-green-500/20 text-green-300",
      description:
        "Build intelligent conversational experiences with our orchestration API. Deploy production-ready agents at scale.",
      img: img2,
      url: 'zero-med'

    },
    {
      title: "Intelligence Layer",
      subtitle: " ",
      badge: "Coming soon",
      badgeColor: "bg-red-500/20 text-red-300",
      description:
        "Extract insights from every conversation. Intent recognition, entity extraction, sentiment analysis, and more.",
      img: img3,
      url: ''

    },
    {
      title: "Developer First",
      title2:"Enterprise Ready",
      subtitle: " ",
      badge: "Coming soon",
      badgeColor: "bg-red-500/20 text-red-300",
      description:
        "Start in minutes with tiny, friendly APIs. Scale seamlessly to cloud, edge, or on-premises when you're ready.",
      img: img4,
      url: ''

    },
  ];

  return (
    <section className="md:py-[5rem] py-10 text-white z-10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-4xl font-semibold mb-12 md:mb-20">
          A full-stack voice platform-low latency, modular APIs,
          and accuracy engineered for enterprise scale.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {models.map((model, index) => (
            <div
              key={index}
              className="group relative bg-black/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] h-full min-h-[430px]"
            >
              {/* Top Section */}
              <div className="flex flex-col items-center text-center flex-grow justify-center">
                {/* Badge */}
                {/* <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${model.badgeColor} mb-4`}
                >
                  {model.badge}
                </span> */}

                {/* Circle Placeholder */}
                <div className="w-16 h-16 rounded-full bg-white mb-6 flex justify-center items-center">
                  <img
                    src={typeof model.img === "string" ? model.img : model.img.src}
                    className="w-[35px]"
                    alt={model.title}
                    loading="lazy"
                  />
                </div>

                {/* Title (force single line & align across all cards) */}
                <h2 className="text-base md:text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                  {model.title}
                </h2>

                <h2 className="text-base md:text-lg font-semibold mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                  {model.title2}
                </h2>

                {/* Subtitle */}
                <h3 className="md:text-sm text-xs italic text-gray-400 mb-2 text-center">
                  {model.subtitle}
                </h3>

                {/* Description */}
                <p className="text-gray-400 md:text-base text-sm leading-relaxed mb-6">
                  {model.description}
                </p>
              </div>

              {/* {
                model?.url !=='' ?
                 <a
                    href={model.url}
                    className="px-6 cursor-pointer py-2 rounded-full text-sm font-medium border border-gray-500 text-white transition-all duration-300 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] mt-auto"
                  >
                    Learn More
                  </a>
                  :
                  null
              } */}
              {/* Button fixed at bottom */}
              {/* <a
                href={model.url}
                className="px-6 cursor-pointer py-2 rounded-full text-sm font-medium border border-gray-500 text-white transition-all duration-300 group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] mt-auto"
              >
                Learn More
              </a> */}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
