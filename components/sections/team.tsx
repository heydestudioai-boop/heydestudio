'use client';

import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

interface SocialLink {
  icon: string;
  href: string;
  label: string;
}

interface TeamMember {
  name: string;
  role: string;
  title: string;
  description: string;
  image: string;
  social?: SocialLink[];
}

interface TeamProps {
  heading: string;
  subheading: string;
  members: TeamMember[];
}

const SocialIcon = ({ href, label }: SocialLink) => {
  const Icon = ExternalLink;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      className="text-gray-600 hover:text-black transition-colors"
    >
      <Icon className="w-5 h-5" />
    </a>
  );
};

export function Team({ heading, subheading, members }: TeamProps) {
  return (
    <section id="team" className="bg-white px-8 py-16 md:px-12 md:py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">{heading}</h2>
        <p className="text-lg text-gray-600 text-center mb-16 max-w-2xl mx-auto">{subheading}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {members.map((member, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="flex-shrink-0 mb-6 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={192}
                  height={192}
                  unoptimized
                  className="w-48 h-48 rounded-full object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop';
                  }}
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1 group-hover:text-black transition-colors">{member.name}</h3>
                <p className="text-sm font-bold text-yellow-500 mb-2">{member.role}</p>
                <p className="text-sm font-medium text-gray-600 mb-4">{member.title}</p>
                <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed mb-6">
                  {member.description}
                </p>
                {member.social && member.social.length > 0 && (
                  <div className="flex gap-4 justify-center">
                    {member.social.map((social, j) => (
                      <SocialIcon key={j} {...social} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
