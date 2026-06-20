import { useParams, Link } from 'react-router';
import { MapPin, ArrowLeft, ExternalLink, Instagram } from 'lucide-react';
import { events } from '../data/events';

function getInstagramPostId(url: string): string {
  const match = url.match(/\/p\/([^\/]+)/);
  return match ? match[1] : '';
}

export function EventDetailPage() {
  const { id } = useParams();
  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-20 text-center">
        <h1 className="text-2xl mb-4">Event not found</h1>
        <Link to="/archive" className="text-sm text-gray-600 hover:text-gray-900">
          ← Back to Archive
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-12 py-12 sm:py-20">
      {/* Back Link */}
      <Link
        to="/archive"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-12 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Archive
      </Link>

      {/* Event Header */}
      <div className="mb-12">
        {event.status === "Upcoming" && (
          <span className="inline-block px-3 py-1 bg-gray-900 text-white text-xs mb-6">
            Upcoming
          </span>
        )}

        <h1 className="text-4xl sm:text-5xl mb-4 tracking-tight leading-tight">
          {event.title}
        </h1>
        {event.subtitle && (
          <p className="text-xl text-gray-500 mb-8">{event.subtitle}</p>
        )}

        <div className="flex flex-wrap gap-8 text-sm text-gray-600">
          <div>
            <div className="text-xs text-gray-400 mb-1">Date</div>
            <div>{event.date}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Location</div>
            <a
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-gray-900 transition-colors group"
            >
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="group-hover:underline">{event.location}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Event Image */}
      <div className="mb-12">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-auto"
        />
      </div>

      {/* Gallery */}
      {event.gallery && event.gallery.length > 0 && (
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {event.gallery.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${event.title} gallery ${index + 1}`}
                className="w-full h-auto"
              />
            ))}
          </div>
        </div>
      )}

      {/* Instagram Posts */}
      {event.instagramPosts && event.instagramPosts.length > 0 && (
        <div className="mb-16">
          <h3 className="text-xl mb-6 tracking-tight flex items-center gap-2">
            <Instagram className="w-5 h-5" />
            {event.city ? `Instagram — ${event.city}` : 'Instagram'}
          </h3>
          <div className="overflow-x-auto -mx-6 sm:-mx-12 px-6 sm:px-12 scrollbar-hide">
            <div className="flex gap-3 pb-4">
              {event.instagramPosts.map((postUrl, index) => {
                const postId = getInstagramPostId(postUrl);
                return (
                  <div key={index} className="flex-shrink-0" style={{ width: '280px' }}>
                    <iframe
                      src={`https://www.instagram.com/p/${postId}/embed/captioned`}
                      width="280"
                      height="420"
                      frameBorder="0"
                      scrolling="no"
                      allowTransparency={true}
                      className="border-0 rounded-sm shadow-sm"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </div>
      )}

      {/* Event Description */}
      <div className="mb-16">
        <div className="text-gray-600 leading-relaxed whitespace-pre-line mb-12">
          {event.fullDescription || event.description}
        </div>

        {/* Venue Information */}
        {event.venue && (
          <div className="border-t border-gray-200 pt-12 mb-12">
            <h3 className="text-xl mb-6 tracking-tight">Venue</h3>
            <div className="space-y-4">
              <div>
                <div className="font-medium mb-2">{event.venue.name}</div>
                <div className="text-sm text-gray-600">{event.venue.address}</div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {event.venue.description}
              </p>
              {event.venue.website && (
                <a
                  href={event.venue.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-gray-900 hover:underline"
                >
                  Visit website
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Contents */}
        {event.contents && event.contents.length > 0 && (
          <div className="border-t border-gray-200 pt-12">
            <h3 className="text-xl mb-8 tracking-tight">Contents</h3>
            <div className="space-y-10">
              {event.contents.map((content, index) => (
                <div key={index}>
                  <h4 className="text-base mb-3 tracking-tight">{content.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {content.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation to other events */}
      <div className="mt-20 pt-12 border-t border-gray-200">
        <h3 className="text-sm text-gray-400 mb-6">Other Events</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {events
            .filter((e) => e.id !== event.id)
            .slice(0, 4)
            .map((otherEvent) => (
              <Link
                key={otherEvent.id}
                to={`/archive/${otherEvent.id}`}
                className="group"
              >
                <div className="overflow-hidden mb-2">
                  <img
                    src={otherEvent.image}
                    alt={otherEvent.title}
                    className="w-full h-auto group-hover:opacity-80 transition-opacity"
                  />
                </div>
                <div className="text-xs">
                  <div className="text-gray-900 mb-1">{otherEvent.title}</div>
                  <div className="text-gray-500">{otherEvent.year}</div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
