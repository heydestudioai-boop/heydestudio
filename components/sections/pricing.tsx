'use client';

interface Package {
  name: string;
  description: string;
  price: string;
  deliveryTime: string;
}

interface PricingProps {
  heading: string;
  note: string;
  packages: Package[];
}

export function Pricing({ heading, note, packages }: PricingProps) {
  return (
    <section className="min-h-screen bg-black text-white px-8 py-16 md:px-12 md:py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">{heading}</h2>
        <p className="text-center text-white/70 max-w-2xl mx-auto mb-16">{note}</p>

        <div className="overflow-x-auto mb-12">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/20">
                <th className="pb-4 pr-6 font-bold text-sm uppercase tracking-wider">Package</th>
                <th className="pb-4 pr-6 font-bold text-sm uppercase tracking-wider">Description</th>
                <th className="pb-4 pr-6 font-bold text-sm uppercase tracking-wider">Price</th>
                <th className="pb-4 font-bold text-sm uppercase tracking-wider">Timeline</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg, i) => (
                <tr key={i} className="border-b border-white/10 hover:bg-white/5 transition">
                  <td className="py-6 pr-6 font-bold text-white">{pkg.name}</td>
                  <td className="py-6 pr-6 text-sm text-white/70 max-w-xs">{pkg.description}</td>
                  <td className="py-6 pr-6 font-bold text-yellow-400">{pkg.price}</td>
                  <td className="py-6 text-sm text-white/70">{pkg.deliveryTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center">
          <a href="#contact" className="inline-block px-8 py-3 bg-magenta text-white font-bold rounded hover:bg-magenta-dark transition-colors">
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}
