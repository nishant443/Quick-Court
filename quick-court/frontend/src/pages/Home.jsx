import { base } from "../helper";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Mock images as fallback or default images
const venueImg = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop";
const sportImg = "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop";
const heroImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Berliner_Olympiastadion_day.jpg/960px-Berliner_Olympiastadion_day.jpg";

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-4 h-4 text-amber-500"
    aria-hidden="true"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.03 3.155a1 1 0 00.95.69h3.316c.969 0 1.371 1.24.588 1.81l-2.683 1.95a1 1 0 00-.364 1.118l1.025 3.136c.3.919-.755 1.688-1.54 1.118l-2.69-1.956a1 1 0 00-1.176 0l-2.69 1.956c-.784.57-1.838-.199-1.539-1.118l1.024-3.136a1 1 0 00-.363-1.118L2.065 8.582c-.783-.57-.38-1.81.588-1.81h3.316a1 1 0 00.95-.69l1.03-3.155z" />
  </svg>
);

const SocialDot = ({ label, icon }) => (
  <div
    aria-label={label}
    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 cursor-pointer border border-white/20"
  >
    {icon}
  </div>
);

const EnhancedHome = () => {
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Dynamic venue fetching
  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get(`${base}/venues/`, {
          params: { status: "approved" },
        });
        const venuesData = Array.isArray(data.data) ? data.data : [];
        setVenues(venuesData.slice(0, 6));
      } catch (err) {
        setError("Failed to fetch venues");
        console.error(err);
        // Fallback to mock data on error
        const mockVenues = [
          {
            id: 1,
            name: "Elite Tennis Academy",
            address: "Mumbai, Maharashtra",
            sports: [{ name: "Tennis" }],
            averageRating: 4.8,
            amenities: ["AC Courts", "Coaching"],
            photos: ["https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=600&fit=crop"]
          },
          {
            id: 2,
            name: "Champions Cricket Ground", 
            address: "Delhi, NCR",
            sports: [{ name: "Cricket" }],
            averageRating: 4.6,
            amenities: ["Turf Wicket", "Pavilion"],
            photos: ["https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=600&fit=crop"]
          },
          {
            id: 3,
            name: "AquaFit Swimming Complex",
            address: "Bangalore, Karnataka", 
            sports: [{ name: "Swimming" }],
            averageRating: 4.9,
            amenities: ["Olympic Pool", "Spa"],
            photos: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop"]
          }
        ];
        setVenues(mockVenues);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const getVenuePrimaryImage = (venue) => {
    const photo = venue?.photos?.[0];
    if (photo) return photo;
    if (venue?.sports?.some((s) => s.name === "Tennis")) return sportImg;
    return venueImg;
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleVenueClick = (venueId) => {
    console.log(`Viewing venue: ${venueId}`);
    // Implement actual navigation or modal popup as needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.8)), url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 sm:py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-600/20 px-4 py-2 text-sm font-medium text-white border border-white/20 backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Trusted by 10,000+ athletes nationwide
            </div>

            <h1 className="mt-6 text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              Book Premium Sports
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                Venues
              </span>
            </h1>

            <p className="mt-6 text-xl text-slate-300 max-w-2xl leading-relaxed">
              Discover and reserve world-class sports facilities with real-time
              availability, premium amenities, and seamless booking experience.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
              <button
                onClick={() => handleNavigation("/venues")}
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-12 py-4 text-lg font-semibold text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 min-w-[220px]"
              >
                Explore Venues
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl">
              {[
                { label: "Premium Venues", value: "500+" },
                { label: "Major Cities", value: "25+" },
                { label: "Happy Members", value: "50K+" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-full blur-3xl" />
      </section>

      {/* Featured Venues Section - DYNAMIC */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                Featured Venues
              </h2>
              <p className="text-slate-600 text-lg">Handpicked premium sports facilities</p>
            </div>
            <button
              onClick={() => handleNavigation("/venues")}
              className="hidden sm:inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
            >
              View All Venues
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>

          {loading && (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-80 rounded-2xl bg-slate-200 animate-pulse"
                />
              ))}
            </div>
          )}

          {!loading && error && (
            <p className="text-center text-red-500">{error}</p>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {venues.map((venue) => {
                const firstSport = venue?.sports?.[0]?.name;
                const sportLabel = firstSport || (venue?.sports?.length > 1 ? "Multi-sport" : "Sport");
                const rating = Number(venue?.averageRating || 0).toFixed(1);
                const imageSrc = getVenuePrimaryImage(venue);
                const tags = Array.isArray(venue?.amenities) ? venue.amenities.slice(0, 2) : [];
                
                return (
                  <article
                    key={venue.id}
                    className="group overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
                    onClick={() => handleVenueClick(venue.id)}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={imageSrc}
                        alt={venue?.name || "Venue"}
                        className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-black/70 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                        <StarIcon />
                        <span>{rating}</span>
                      </div>
                      <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 backdrop-blur-sm">
                        {sportLabel}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-semibold text-xl text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {venue?.name}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-1">
                        {venue?.address}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-slate-500 font-medium mb-8">
            Trusted by leading sports communities across India
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {["SportElite", "PlayPro", "ActiveLife", "CourtMaster"].map(
              (brand) => (
                <div
                  key={brand}
                  className="flex items-center justify-center rounded-xl bg-gradient-to-br from-slate-50 to-white p-6 border border-slate-200 hover:border-slate-300 transition-colors"
                >
                  <span className="text-slate-400 font-bold text-lg">
                    {brand}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* HARDCODED Enhanced Visual Gallery Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-pink-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-600/20 px-6 py-3 text-sm font-medium text-slate-700 border border-blue-200 backdrop-blur-sm mb-4">
              <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              World-Class Facilities
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Experience Premium
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}Sports Infrastructure
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              From Olympic-standard pools to championship tennis courts, explore our collection of premium sports venues designed for athletes who demand excellence.
            </p>
          </div>

          {/* Enhanced Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
            {/* Main featured image */}
            <div className="md:col-span-8 group">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-slate-900 to-slate-800 h-96">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop"
                  alt="Olympic Swimming Pool"
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm border border-white/20 mb-3">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.03 3.155a1 1 0 00.95.69h3.316c.969 0 1.371 1.24.588 1.81l-2.683 1.95a1 1 0 00-.364 1.118l1.025 3.136c.3.919-.755 1.688-1.54 1.118l-2.69-1.956a1 1 0 00-1.176 0l-2.69 1.956c-.784.57-1.838-.199-1.539-1.118l1.024-3.136a1 1 0 00-.363-1.118L2.065 8.582c-.783-.57-.38-1.81.588-1.81h3.316a1 1 0 00.95-.69l1.03-3.155z"/>
                    </svg>
                    Featured Venue
                  </div>
                  <h3 className="text-2xl font-bold mb-2">AquaElite Swimming Complex</h3>
                  <p className="text-white/80 text-sm">Olympic-standard 50m pool with advanced filtration systems</p>
                </div>
              </div>
            </div>

            {/* Side images */}
            <div className="md:col-span-4 grid grid-rows-2 gap-6">
              <div className="group relative overflow-hidden rounded-3xl shadow-xl bg-gradient-to-br from-emerald-900 to-green-800">
                <img
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop"
                  alt="Tennis Courts"
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-semibold text-lg mb-1">Championship Courts</h4>
                  <p className="text-white/80 text-xs">Professional tennis facilities</p>
                </div>
              </div>
              
              <div className="group relative overflow-hidden rounded-3xl shadow-xl bg-gradient-to-br from-orange-900 to-red-800">
                <img
                  src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&h=400&fit=crop"
                  alt="Cricket Stadium"
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-semibold text-lg mb-1">Cricket Grounds</h4>
                  <p className="text-white/80 text-xs">International standard pitches</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom gallery row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-purple-900 to-indigo-800 h-48">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
                alt="Modern Gym"
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <p className="font-medium text-sm">Fitness Centers</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-teal-900 to-blue-800 h-48">
              <img
                src="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=300&fit=crop"
                alt="Football Field"
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <p className="font-medium text-sm">Football Fields</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-rose-900 to-pink-800 h-48">
              <img
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop"
                alt="Basketball Court"
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <p className="font-medium text-sm">Basketball Courts</p>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-amber-900 to-orange-800 h-48">
              <img
                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop"
                alt="Badminton Hall"
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <p className="font-medium text-sm">Badminton Halls</p>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center mt-12">
            <button
              onClick={() => handleNavigation("/venues")}
              className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Explore All Facilities
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Why Choose QuickCourt?
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Everything you need for the perfect sports experience, all in one platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-indigo-200 hover:shadow-xl transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Real-time Booking</h3>
              <p className="text-slate-600">Instant availability checks and seamless booking experience with immediate confirmation.</p>
            </div>
            
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-emerald-200 hover:shadow-xl transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Quality Assured</h3>
              <p className="text-slate-600">All venues are verified and maintain the highest standards of cleanliness and equipment quality.</p>
            </div>
            
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-orange-200 hover:shadow-xl transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Community Focus</h3>
              <p className="text-slate-600">Join a vibrant community of sports enthusiasts and connect with players who share your passion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 text-sm">
            <div>
              <h4 className="font-semibold text-white mb-4">Booking</h4>
              <ul className="space-y-3 text-slate-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Browse Sports
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    All Venues
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Find Location
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Community</h4>
              <ul className="space-y-3 text-slate-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Join Now
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Member Benefits
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Payments</h4>
              <ul className="space-y-3 text-slate-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing Plans
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Payment Methods
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    QuickPay
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3 text-slate-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Careers</h4>
              <ul className="space-y-3 text-slate-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Open Positions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Culture
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-3 text-slate-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Why QuickCourt
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sports Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Membership
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-slate-400 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    QuickCourt
                  </span>
                </div>
                <span className="hidden sm:block">•</span>
                <p className="text-center sm:text-left">
                  © 2025 QuickCourt. All rights reserved.
                </p>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4">
                  <SocialDot
                    label="Facebook"
                    icon={
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    }
                  />
                  <SocialDot
                    label="Twitter"
                    icon={
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    }
                  />
                  <SocialDot
                    label="Instagram"
                    icon={
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.987 11.988 11.987 6.62 0 11.987-5.366 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.291C3.897 14.81 3.29 13.549 3.29 12.017c0-1.533.606-2.794 1.836-3.681.875-.801 2.026-1.291 3.323-1.291 1.297 0 2.448.49 3.323 1.291 1.23.887 1.836 2.148 1.836 3.681 0 1.532-.606 2.793-1.836 3.68-.875.801-2.026 1.291-3.323 1.291zm7.83-4.985c0 .344-.277.621-.621.621-.344 0-.621-.277-.621-.621 0-.344.277-.621.621-.621.344 0 .621.277.621.621z" />
                      </svg>
                    }
                  />
                  <SocialDot
                    label="LinkedIn"
                    icon={
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.208 24 24 23.227 24 22.271V1.729C24 .774 23.208 0 22.225 0z" />
                      </svg>
                    }
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-700">
              <p className="text-slate-400 text-sm text-center max-w-4xl mx-auto leading-relaxed">
                By using QuickCourt, you agree to our{" "}
                <a href="#" className="text-white hover:text-slate-300 transition-colors">
                  terms of service
                </a>{" "}
                and{" "}
                <a href="#" className="text-white hover:text-slate-300 transition-colors">
                  privacy policy
                </a>
                . We're committed to protecting your data and providing exceptional service to India's sports community.{" "}
                <a href="#" className="text-white hover:text-slate-300 transition-colors">
                  Learn more about our mission
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EnhancedHome;