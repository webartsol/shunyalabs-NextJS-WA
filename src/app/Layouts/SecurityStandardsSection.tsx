import img1 from "../../../assets/images/SecurityStandards1.png";
import img2 from "../../../assets/images/SecurityStandards2.png";
import img3 from "../../../assets/images/SecurityStandards3.png";
import img4 from "../../../assets/images/SecurityStandards4.png";

export default function SecurityStandardsSection() {
  const standards = [
    {
      title: "SOC 2 Type II",
      description:
        "Trusted where privacy matters most — SOC 2 Type II certified.",
      image: img4,
    },
    {
      title: "ISO 27001",
      description:
        "Privacy and compliance built in with our ISO/IEC 27001:2022 accreditation.",
      image: img1,
    },
    {
      title: "HIPAA",
      description:
        "Fully compliant with the health insurance portability and accountability act.",
      image: img3,
    },
    {
      title: "Two-Sided Encryption",
      description:
        "Data is encrypted in transit and at rest—TLS for every connection, AES-256 for storage, with keys managed in your cloud.",
      image: img2,
    },
  ];

  return (
    <section className="bg-white md:py-24 py-16 text-center relative overflow-hidden">
      {/* Decorative background lines */}
      <div className="absolute inset-0 opacity-[0.07]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 200"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,100 C300,180 900,20 1200,100"
            stroke="gray"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0,140 C300,200 900,60 1200,140"
            stroke="gray"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0,60 C300,140 900,0 1200,60"
            stroke="gray"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-2xl md:text-4xl font-semibold mb-12 md:mb-20 text-gray-700">
          Industry-leading standards for enterprise security
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:gap-8 gap-4">
          {standards.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col items-center text-center"
            >
              {/* Larger image container */}
              <div className="w-[285px] h-[150px] md:w-[240px] flex items-center justify-center bg-gray-50 rounded-lg md:mb-8 mb-4 overflow-hidden border border-gray-100">
                <img
                  src={
                    typeof item.image === "string" ? item.image : item.image.src
                  }
                  alt={item.title}
                  className="max-w-[40%] object-contain filter grayscale "
                  loading="lazy"
                />
              </div>

              {/* Title */}
              <h3 className="text-base md:text-lg font-semibold mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 md:text-base text-sm leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Button */}
              {/* <button className="font-semibold px-6 py-2 border border-gray-800 text-gray-800 text-sm rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300">
                Learn More
              </button> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
