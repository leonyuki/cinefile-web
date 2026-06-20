import { Link } from 'react-router';
import { MapPin } from 'lucide-react';
import { events } from '../data/events';

export function EventsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
      <h1 className="text-3xl sm:text-4xl mb-12 tracking-tight">Events</h1>

      <div className="space-y-20">
        {events.map((event) => (
          <Link
            key={event.id}
            to={`/events/${event.id}`}
            className="block group"
          >
            <div className="grid md:grid-cols-2 gap-10 items-start">
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-auto group-hover:opacity-90 transition-opacity duration-300"
                />
              </div>

              {/* Info */}
              <div className="space-y-4">
                {event.status === "Upcoming" && (
                  <span className="inline-block px-2 py-1 bg-gray-900 text-white text-xs">
                    Upcoming
                  </span>
                )}

                <div>
                  <h2 className="text-2xl mb-2 tracking-tight group-hover:text-gray-600 transition-colors">
                    {event.title}
                  </h2>
                  {event.subtitle && (
                    <p className="text-gray-500 mb-3">{event.subtitle}</p>
                  )}
                </div>

                <div className="text-sm text-gray-600 space-y-2">
                  <div>{event.date}</div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {event.description}
                </p>

                <div className="pt-2">
                  <span className="text-sm text-gray-900 group-hover:underline">
                    View details →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
