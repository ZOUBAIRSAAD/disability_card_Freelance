import React from 'react';
import { Heart, Users, Shield, Award, Target, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  // Values list (unchanged)
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description:
        "We approach every interaction with empathy and understanding, recognizing the unique challenges faced by our community.",
    },
    {
      icon: Users,
      title: "Inclusion",
      description:
        "We believe in creating opportunities for everyone to participate fully in society, regardless of their abilities or circumstances.",
    },
    {
      icon: Shield,
      title: "Integrity",
      description:
        "We maintain the highest standards of honesty, transparency, and ethical conduct in all our operations.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for excellence in service delivery, continuously improving to meet and exceed expectations.",
    },
  ];

  // Milestones list (unchanged)
  const milestones = [
    {
      year: "2020",
      title: "Foundation",
      description:
        "National Disability Card Services was established with a mission to support the UAE's vision of inclusion.",
    },
    {
      year: "2021",
      title: "First 1,000 Cards",
      description:
        "Successfully issued our first 1,000 disability cards, establishing partnerships with major UAE retailers.",
    },
    {
      year: "2022",
      title: "Carers Program Launch",
      description:
        "Expanded services to include Carers Cards, recognizing the vital role of caregivers in our community.",
    },
    {
      year: "2023",
      title: "Customer Support Cards",
      description:
        "Introduced Customer Support Cards to assist individuals needing additional daily life support.",
    },
    {
      year: "2024",
      title: "150+ Partners",
      description:
        "Reached 150+ partner organizations across the UAE, providing comprehensive benefits to cardholders.",
    },
  ];

  return (
    <main>
      {/* Hero Section with skyline background and UAE flag accent */}
      <section className="relative">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Dubai_Skyline_mit_Burj_Khalifa_(cropped).jpg/960px-Dubai_Skyline_mit_Burj_Khalifa_(cropped).jpg"
          alt="Dubai skyline"
          className="absolute inset-0 w-full h-96 md:h-[28rem] object-cover"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-96 md:h-[28rem] text-center bg-black/50 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl">
            Empowering lives through comprehensive disability support services
            across the United Arab Emirates
          </p>
        </div>
        {/* UAE flag accent bar at the bottom of the hero */}
        <div className="absolute bottom-0 left-0 w-full h-1 flex">
          <div className="flex-1 bg-uae-red"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-uae-black"></div>
          <div className="flex-1 bg-uae-green"></div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-uae-black mb-6 text-center">
            Our Story
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Story text */}
            <div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                National Disability Card Services was born from a simple yet
                powerful vision: to create a more inclusive UAE where every
                individual, regardless of their abilities or circumstances, can
                access the support and opportunities they deserve. Founded in
                2020, we recognized the need for a comprehensive system that
                would not only provide identification for people with
                disabilities but also connect them to a network of benefits,
                discounts, and support services across the country.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, we proudly serve thousands of cardholders through our
                three specialized programs: Disabilities Cards, Carers Cards,
                and Customer Support Cards, each designed to address specific
                needs within our community.
              </p>
            </div>
            {/* Optional supporting image with subtle hover animation */}
            <div className="relative group">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Handshake_icon_black_circle.svg/590px-Handshake_icon_black_circle.svg.png"
                alt="Community support"
                className="w-full h-80 object-contain p-8 rounded-lg shadow-lg bg-white transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-lg group-hover:bg-uae-green/10 transition-colors"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-uae-black mb-6 text-center">
            Mission &amp; Vision
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission card */}
            <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition-shadow">
              <Target className="h-8 w-8 text-uae-red mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-gray-700">
                To provide comprehensive disability card services that enhance
                quality of life and promote independence.
              </p>
            </div>
            {/* Vision card */}
            <div className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg transition-shadow">
              <Globe className="h-8 w-8 text-uae-green mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
              <p className="text-gray-700">
                A UAE where everyone can participate fully in society with
                dignity and equal opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-uae-black mb-6 text-center">
            Our Values
          </h2>
          <p className="text-gray-700 max-w-xl mx-auto mb-8 text-center">
            The principles that guide everything we do
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="p-6 bg-white rounded-lg shadow hover:-translate-y-1 hover:shadow-lg transition-all"
                >
                  <Icon className="h-8 w-8 text-uae-green mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {value.title}
                  </h3>
                    <p className="text-gray-700">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Journey (Timeline) Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-uae-black mb-6 text-center">
            Our Journey
          </h2>
          <p className="text-gray-700 max-w-xl mx-auto mb-8 text-center">
            Key milestones in our mission to serve the UAE community
          </p>
          <div className="relative">
            {/* Vertical line down the centre */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-uae-green"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative md:flex items-center ${
                    index % 2 === 0
                      ? 'md:justify-start'
                      : 'md:justify-end'
                  } w-full`}
                >
                  <div className="w-full md:w-1/2 p-6">
                    <h3 className="text-xl font-semibold text-uae-black">
                      {milestone.year}
                    </h3>
                    <h4 className="text-lg font-semibold mt-1 mb-2 text-uae-green">
                      {milestone.title}
                    </h4>
                    <p className="text-gray-700">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact / Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-uae-black mb-6 text-center">
            Our Impact
          </h2>
          <p className="text-gray-700 max-w-xl mx-auto mb-8 text-center">
            Making a difference in the UAE community
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "10,000+", label: "Active Cardholders" },
              { number: "150+", label: "Partner Organizations" },
              { number: "500+", label: "Locations Nationwide" },
              { number: "24/7", label: "Customer Support" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <p className="text-3xl font-bold text-uae-green">
                  {stat.number}
                </p>
                <p className="mt-2 text-gray-700">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action (CTA) Section */}
      <section className="py-12 bg-uae-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="max-w-xl mx-auto mb-6">
            Discover how our services can support you or your loved ones
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/services"
              className="px-6 py-3 bg-white text-uae-green font-semibold rounded shadow hover:bg-gray-100 transition-colors"
            >
              Learn About Our Services
            </Link>
            <Link
              to="/apply"
              className="px-6 py-3 bg-white text-uae-red font-semibold rounded shadow hover:bg-gray-100 transition-colors"
            >
              Apply for a Card
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
