interface CardProps {
  title: string;
  description: string;
  icon?: string;
  className?: string;
}

export function Card({ title, description, icon, className = '' }: CardProps) {
  return (
    <div className={`rounded-sm border border-gray-200 bg-white p-8 ${className}`}>
      {icon && <div className="text-4xl mb-4">{icon}</div>}
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
}
