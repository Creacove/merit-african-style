const BrandStatement = () => {
  return (
    <section
      className="px-6 lg:px-12 py-12 lg:py-16 bg-[hsl(var(--bg-section))] relative overflow-hidden"
    >
      {/* Background pattern elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[hsl(var(--gold))] blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-[hsl(var(--gold))] blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-[hsl(var(--gold))] blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10">
        <div className="space-y-8 animate-in fade-in slide-in-from-left-6 duration-700 fill-mode-both">
          <div className="relative">
            {/* Decorative line above title */}
            <div className="decorative-line w-24 lg:w-32 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--gold))] to-transparent mb-8 mx-auto lg:mx-0 animate-in slide-in-from-left duration-1000"></div>

            <h2
              className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.02] text-[hsl(var(--ivory))] mb-6"
            >
              We create <span className="text-[hsl(var(--gold))] relative">
                clothes
                {/* Subtle underline effect */}
                <div className="absolute -bottom-[4px] left-0 w-full h-[1px] bg-[hsl(var(--gold))] opacity-70"></div>
              </span> for:
            </h2>
          </div>

          <p
            className="font-inter text-base lg:text-lg xl:text-xl text-[hsl(var(--muted-ivory))] leading-[1.6] max-w-lg"
          >
            Bright, strong personalities. For <span className="text-[hsl(var(--gold))] font-semibold">real men</span> who want to feel perfect. Our bespoke African tailoring combines traditional craftsmanship with modern elegance, creating pieces that celebrate your heritage while embracing contemporary style.
          </p>
        </div>

        <div className="relative animate-in fade-in slide-in-from-right-6 duration-700 delay-200 fill-mode-both">
          <div
            className="aspect-[4/5] bg-gradient-to-br from-[hsl(var(--card-bg))] to-[hsl(var(--deep-chocolate))] rounded-[2.5rem] shadow-2xl overflow-hidden border border-[hsl(var(--gold))]/20 relative"
            style={{
              boxShadow: `
                0 25px 50px rgba(0,0,0,0.4),
                0 0 0 1px rgba(184,134,11,0.1),
                inset 0 1px 0 rgba(255,255,255,0.1)
              `
            }}
          >
            {/* Founder portrait image */}
            <img
              src="https://i.ibb.co/wh44mJtW/Generated-Image-September-14-2025-12-46-PM.png"
              alt="Founder of Merit African Style"
              className="w-full h-full object-cover rounded-[1.5rem]"
              style={{ objectPosition: 'center' }}
            />

            {/* Elegant decorative frame effect */}
            <div className="absolute inset-4 border-2 border-[hsl(var(--gold))]/30 rounded-[1.5rem]"></div>

            {/* Subtle shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[hsl(var(--gold))]/5 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100 rounded-[1.5rem]"></div>
          </div>

          {/* Decorative corner elements */}
          <div className="absolute -top-4 -right-4 w-16 h-16 border-t-2 border-r-2 border-[hsl(var(--gold))]/50 rounded-tr-[1rem]"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b-2 border-l-2 border-[hsl(var(--gold))]/50 rounded-bl-[1rem]"></div>
        </div>
      </div>
    </section>
  );
};

export default BrandStatement;
